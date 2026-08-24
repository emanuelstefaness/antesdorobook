"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { avancarExecucao, criarExecucao, reiniciarExecucao, type Execucao } from "./runner";
import type { CommandType, GridSpec } from "./types";

export type Velocidade = 1 | 2 | 4;

const INTERVALO_BASE_MS = 620;

export function useCommandRunner({ grid, minimo }: { grid: GridSpec; minimo: number | null }) {
  const [fila, setFila] = useState<CommandType[]>([]);
  const [exec, setExec] = useState<Execucao | null>(null);
  const [velocidade, setVelocidade] = useState<Velocidade>(1);
  const [rodando, setRodando] = useState(false);

  const quadro = useRef<number | null>(null);
  const ultimoPasso = useRef(0);
  const execRef = useRef<Execucao | null>(null);
  const velocidadeRef = useRef<Velocidade>(1);

  useEffect(() => {
    execRef.current = exec;
  }, [exec]);

  useEffect(() => {
    velocidadeRef.current = velocidade;
  }, [velocidade]);

  const pararLaco = useCallback(() => {
    if (quadro.current !== null) {
      cancelAnimationFrame(quadro.current);
      quadro.current = null;
    }
    setRodando(false);
  }, []);

  useEffect(() => pararLaco, [pararLaco]);

  // Mexer na fila invalida qualquer execução anterior: o professor mudou o algoritmo.
  const invalidarExecucao = useCallback(() => {
    pararLaco();
    setExec(null);
  }, [pararLaco]);

  // Derivar a próxima fila do estado anterior do próprio React (forma funcional
  // de setFila), nunca de filaRef: cliques rápidos em sequência podem disparar
  // vários destes handlers antes do primeiro re-render, e filaRef.current só é
  // reatribuída durante o render. Ler o ref aqui faria cada chamada partir da
  // mesma fila "velha" e todas menos a última se perderiam silenciosamente —
  // exatamente o tipo de comando descartado que este produto existe para evitar.
  const adicionar = useCallback(
    (comando: CommandType) => {
      invalidarExecucao();
      setFila((atual) => [...atual, comando]);
    },
    [invalidarExecucao],
  );

  const remover = useCallback(
    (indice: number) => {
      invalidarExecucao();
      setFila((atual) => atual.filter((_, i) => i !== indice));
    },
    [invalidarExecucao],
  );

  const mover = useCallback(
    (de: number, para: number) => {
      invalidarExecucao();
      setFila((atual) => {
        if (para < 0 || para >= atual.length) return atual;
        const copia = [...atual];
        const [peca] = copia.splice(de, 1);
        copia.splice(para, 0, peca);
        return copia;
      });
    },
    [invalidarExecucao],
  );

  const limpar = useCallback(() => {
    invalidarExecucao();
    setFila([]);
  }, [invalidarExecucao]);

  // Igual ao raciocínio de `adicionar`: nunca ler a fila de um ref, porque um
  // adicionar/remover/mover e este passoAPasso podem cair no mesmo lote de
  // atualizações do React, e um ref só reflete a fila do último render
  // concluído. Envolver em `setFila` (que devolve a própria fila, sem
  // alterá-la) é o jeito de alcançar a fila já resultante de qualquer
  // atualização pendente no mesmo lote: o React aplica os updaters de um
  // mesmo estado em ordem, então o nosso vê o resultado dos anteriores.
  const passoAPasso = useCallback(() => {
    pararLaco();
    setFila((filaAtual) => {
      setExec((atual) => {
        const base = atual ?? criarExecucao(grid, filaAtual);
        return avancarExecucao(base, minimo);
      });
      return filaAtual;
    });
  }, [grid, minimo, pararLaco]);

  const reiniciar = useCallback(() => {
    pararLaco();
    setExec((atual) => (atual ? reiniciarExecucao(atual) : null));
  }, [pararLaco]);

  const pausar = useCallback(() => {
    pararLaco();
    setExec((atual) => (atual && atual.estado === "rodando" ? { ...atual, estado: "pausado" } : atual));
  }, [pararLaco]);

  const executar = useCallback(() => {
    // Cancela qualquer laço já agendado antes de abrir outro — sem isto, um
    // segundo clique em "Executar" antes do primeiro re-render (o botão só
    // vira "Pausar" depois que `rodando` mudar) deixaria dois laços de
    // requestAnimationFrame avançando a mesma execução ao mesmo tempo.
    pararLaco();

    // A montagem da execução de partida depende da fila mais atual — mesmo
    // raciocínio de `passoAPasso` acima: ler `fila` (estado ou ref) fora de
    // um updater arriscaria pegar a fila de antes de um adicionar/remover/
    // mover que tenha caído no mesmo lote. Por isso todo o corpo do laço é
    // montado dentro do updater de `setFila`.
    //
    // O React (em modo Strict, só em desenvolvimento) chama updaters duas
    // vezes para checar pureza. `execRef.current = partida` e `setExec` são
    // idempotentes — computam o mesmo valor a cada chamada — então a
    // segunda chamada não muda nada de observável. Já agendar
    // requestAnimationFrame duas vezes abriria dois laços correndo em
    // paralelo; por isso cancela-se explicitamente qualquer quadro já
    // agendado por uma chamada anterior deste mesmo updater antes de
    // agendar o novo.
    setFila((filaAtual) => {
      // Retomar uma execução pausada (ou interrompida a meio de um passo a
      // passo manual) em vez de recomeçar do zero: é para isso que pausar()
      // preserva robô, rastro e ponteiro em vez de descartar tudo. Só quando
      // não há execução para retomar — nunca rodou, ou terminou — é que se
      // monta uma nova a partir da fila atual.
      const partida =
        execRef.current && execRef.current.estado !== "terminado"
          ? { ...execRef.current, estado: "rodando" as const }
          : criarExecucao(grid, filaAtual);

      execRef.current = partida;
      setExec(partida);

      if (partida.estado === "terminado") return filaAtual;

      setRodando(true);
      ultimoPasso.current = Date.now();

      // Este laço roda igual com animações reduzidas ou não: é o CSS
      // (html[data-animacoes="reduzidas"] em globals.css, atributo escrito
      // antes da hidratação em layout.tsx) que zera a duração da transição
      // do robô. Não reintroduza aqui um atalho síncrono para "pular" as
      // animações — o passo a passo (rastro, ponteiro, desfecho) precisa
      // continuar acontecendo estado a estado, só sem a interpolação visual.
      const laco = () => {
        const agora = Date.now();
        const intervalo = INTERVALO_BASE_MS / velocidadeRef.current;

        // Diferença de relógio, nunca contagem de quadros: aba em segundo plano
        // é throttled e contar ticks travaria a execução no meio.
        if (agora - ultimoPasso.current >= intervalo) {
          ultimoPasso.current = agora;
          const atual = execRef.current;
          if (!atual || atual.estado === "terminado") {
            pararLaco();
            return;
          }
          const proxima = avancarExecucao(atual, minimo);
          execRef.current = proxima;
          setExec(proxima);
          if (proxima.estado === "terminado") {
            pararLaco();
            return;
          }
        }
        quadro.current = requestAnimationFrame(laco);
      };

      if (quadro.current !== null) cancelAnimationFrame(quadro.current);
      quadro.current = requestAnimationFrame(laco);

      return filaAtual;
    });
  }, [grid, minimo, pararLaco]);

  return {
    fila,
    exec,
    velocidade,
    rodando,
    adicionar,
    remover,
    mover,
    limpar,
    executar,
    passoAPasso,
    pausar,
    reiniciar,
    setVelocidade,
  };
}
