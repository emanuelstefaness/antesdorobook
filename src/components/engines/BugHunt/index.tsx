"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Mensagem } from "@/lib/board/feedback";
import {
  conceitoDoTipo,
  conferirApontamento,
  conferirCorrecao,
  type AlgoritmoComDefeito,
} from "@/lib/engines/bughunt";
import { ActivityShell } from "../shared/ActivityShell";
import { FeedbackPanel } from "../shared/FeedbackPanel";
import { StepAnnouncer } from "../shared/StepAnnouncer";

type Estado = {
  /** Passo apontado nesta tentativa; `null` enquanto nenhum foi apontado. */
  apontado: number | null;
  /** O passo apontado é o defeituoso — é o que libera a segunda fase. */
  achou: boolean;
  resolvido: boolean;
  /** Correções já recusadas, para o professor enxergar o que já eliminou. */
  erradas: number[];
  mensagem: Mensagem | null;
  anuncio: string | null;
};

const INICIAL: Estado = {
  apontado: null,
  achou: false,
  resolvido: false,
  erradas: [],
  mensagem: null,
  anuncio: null,
};

/**
 * Duas fases: primeiro apontar o passo defeituoso, depois escolher a correção.
 * As opções de correção só aparecem depois que o passo certo foi apontado —
 * oferecê-las antes deixaria acertar por eliminação sem ter lido o algoritmo.
 */
export function BugHunt({
  algoritmo,
  onAcerto,
}: {
  algoritmo: AlgoritmoComDefeito;
  onAcerto?: () => void;
}) {
  const [estado, setEstado] = useState<Estado>(INICIAL);

  // Se o consumidor trocar de algoritmo sem remontar o componente, o estado da
  // tentativa anterior passaria a apontar índices de outro algoritmo — um passo
  // marcado como defeituoso na lista errada. Reset por prop feito na render (e
  // não num efeito) para nunca exibir um quadro do estado velho sobre o texto
  // novo.
  const [idEmCurso, setIdEmCurso] = useState(algoritmo.id);
  if (idEmCurso !== algoritmo.id) {
    setIdEmCurso(algoritmo.id);
    setEstado(INICIAL);
  }

  // O desfecho é avisado ao consumidor uma única vez por tentativa: sem esta
  // trava, dois cliques seguidos na correção certa disparariam `onAcerto` duas
  // vezes e a jornada contaria a atividade em dobro.
  const jaAvisou = useRef(false);
  useEffect(() => {
    if (estado.resolvido && !jaAvisou.current) {
      jaAvisou.current = true;
      onAcerto?.();
    }
    if (!estado.resolvido) {
      jaAvisou.current = false;
    }
  }, [estado.resolvido, onAcerto]);

  // Nas duas viradas de fase o controle que tinha o foco some da árvore (a
  // lista de correções ao resolver, o "Tentar de novo" ao recomeçar). Sem
  // reconduzir o foco, quem navega por teclado é jogado de volta no <body> e
  // perde o lugar — mesma mecânica usada na fila do CommandRunner.
  const focoPendente = useRef<"recomecar" | "primeiro-passo" | null>(null);
  const caixaRecomecar = useRef<HTMLDivElement | null>(null);
  const primeiroPasso = useRef<HTMLButtonElement | null>(null);

  useLayoutEffect(() => {
    const alvo = focoPendente.current;
    if (!alvo) return;
    focoPendente.current = null;

    if (alvo === "primeiro-passo") {
      primeiroPasso.current?.focus();
      return;
    }
    // O componente Button não é forwardRef; anexar a ref direto nele exigiria
    // mudar a assinatura para todos os chamadores existentes. Buscar o único
    // <button> da caixa que o envolve resolve sem tocar no design system.
    caixaRecomecar.current?.querySelector("button")?.focus();
  }, [estado.resolvido]);

  const conceito = conceitoDoTipo(algoritmo.tipo);

  const apontar = useCallback(
    (indice: number) => {
      if (estado.resolvido) return;
      const r = conferirApontamento(algoritmo, indice);
      setEstado((e) => ({
        ...e,
        apontado: indice,
        achou: r.certo,
        mensagem: {
          titulo: r.certo ? "Achou o passo defeituoso." : "Ainda não é esse passo.",
          texto: r.dica,
          conceito,
          tom: r.certo ? "acerto" : "atencao",
        },
        // O anúncio nomeia só o que foi tocado; o veredito e o porquê vêm do
        // FeedbackPanel, que também é região live. Dois passos errados
        // diferentes rendem a mesma dica, e uma região live não reanuncia texto
        // idêntico — sem o número do passo aqui, o segundo clique seria silêncio.
        anuncio: `Passo ${indice + 1} de ${algoritmo.passos.length} apontado.`,
      }));
    },
    [algoritmo, conceito, estado.resolvido],
  );

  const corrigir = useCallback(
    (escolha: number) => {
      if (estado.resolvido) return;
      const r = conferirCorrecao(algoritmo, escolha);
      if (r.certo) focoPendente.current = "recomecar";
      setEstado((e) => ({
        ...e,
        resolvido: r.certo,
        erradas: r.certo || e.erradas.includes(escolha) ? e.erradas : [...e.erradas, escolha],
        mensagem: {
          titulo: r.certo ? "Defeito corrigido." : "Essa correção não resolve.",
          // O porquê é o daquela opção: é aí que está o ensino. Uma negativa
          // genérica devolveria o professor ao chute.
          texto: r.porque,
          conceito,
          tom: r.certo ? "acerto" : "erro",
        },
        anuncio: `Opção ${escolha + 1} de ${algoritmo.correcoes.length} escolhida.`,
      }));
    },
    [algoritmo, conceito, estado.resolvido],
  );

  const recomecar = useCallback(() => {
    focoPendente.current = "primeiro-passo";
    setEstado({ ...INICIAL, anuncio: "Atividade reiniciada." });
  }, []);

  const palco = (
    <>
      <div className="rounded-block border-2 border-navy/15 bg-cream-hi p-5">
        <span className="label-mono text-navy/65">Encontre o defeito</span>
        <h3 className="mt-2 font-display text-[20px] font-extrabold tracking-display text-navy">
          {algoritmo.titulo}
        </h3>
        <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-navy/70">
          {algoritmo.enunciado}
        </p>
      </div>
      <FeedbackPanel mensagem={estado.mensagem} erro={null} />
      <StepAnnouncer texto={estado.anuncio} />
    </>
  );

  const montagem = (
    <>
      <div>
        <h4 className="label-mono text-navy/65">O algoritmo</h4>
        <ol className="mt-3 flex flex-col gap-2">
          {algoritmo.passos.map((passo, i) => {
            const selecionado = i === estado.apontado;
            const defeituoso = selecionado && estado.achou;
            const errou = selecionado && !estado.achou;
            return (
              <li key={`${passo}-${i}`}>
                <button
                  type="button"
                  ref={i === 0 ? primeiroPasso : undefined}
                  onClick={() => apontar(i)}
                  disabled={estado.resolvido}
                  aria-pressed={selecionado}
                  className={[
                    "flex w-full min-h-[44px] items-center gap-2 rounded-block border-2 p-2.5 text-left",
                    // led = erro/depuração: o passo achado é o defeito do
                    // algoritmo, e é ele que a atividade ensina a enxergar. O
                    // verde do acerto fica no painel de feedback, que é onde a
                    // conquista do professor é comentada. O fundo continua
                    // cream-hi: sobre um `bg-led/10` o próprio ⚠ vermelho cai
                    // para 2,96:1, abaixo do piso de 3:1.
                    defeituoso
                      ? "border-led bg-cream-hi"
                      : errou
                        ? // Tracejado navy, não amber: o amber mede 1.68:1 sobre
                          // o cream e não alcança os 3:1 de gráfico com
                          // significado. O traço e o rótulo é que carregam o
                          // estado, nunca a cor sozinha.
                          "border-navy border-dashed bg-cream-hi"
                        : "border-navy/15 bg-cream-hi",
                  ].join(" ")}
                >
                  <span className="w-6 shrink-0 text-center font-mono text-[11px] font-bold text-navy/65">
                    {i + 1}
                  </span>
                  {defeituoso ? (
                    <span aria-hidden className="shrink-0 text-sm font-bold text-led">
                      ⚠
                    </span>
                  ) : null}
                  <span className="flex-1 font-sans text-[12.5px] font-semibold text-navy">
                    {passo}
                    {defeituoso ? <span className="sr-only"> — este é o passo defeituoso</span> : null}
                    {errou ? (
                      <span className="sr-only"> — você apontou aqui, e este passo está correto</span>
                    ) : null}
                  </span>
                  {/* O rótulo vai em navy, não em led: vermelho sobre cream-hi
                      mede 3,37:1 e não alcança os 4,5:1 de texto. A cor de
                      erro fica na borda e no ⚠, que são gráficos. */}
                  {defeituoso ? (
                    <span aria-hidden className="label-mono shrink-0 text-navy">
                      defeito
                    </span>
                  ) : null}
                  {errou ? (
                    <span aria-hidden className="label-mono shrink-0 text-navy/65">
                      aqui não
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ol>
        {/* Nada de opacidade sobre a lista resolvida: os passos e o defeito
            marcado são justamente o que o professor precisa reler depois de
            acertar — apagá-los troca o fecho da atividade por um borrão. */}
      </div>

      {estado.achou && !estado.resolvido ? (
        <div>
          <h4 className="label-mono text-navy/65">O que fazer com ele</h4>
          <ul className="mt-3 flex flex-col gap-2">
            {algoritmo.correcoes.map((c, i) => {
              const recusada = estado.erradas.includes(i);
              return (
                <li key={`${c.texto}-${i}`}>
                  {/* Botão à mão, não o `Button` do design system: ali o rótulo
                      é caixa-alta de 11px, e estas opções são frases inteiras
                      que precisam quebrar linha e continuar legíveis. */}
                  <button
                    type="button"
                    onClick={() => corrigir(i)}
                    className={[
                      "flex w-full min-h-[44px] items-center gap-2 rounded-block border-2 bg-cream-hi p-2.5 text-left",
                      recusada ? "border-led border-dashed" : "border-navy",
                    ].join(" ")}
                  >
                    <span className="flex-1 font-sans text-[12.5px] font-semibold text-navy">
                      {c.texto}
                      {recusada ? (
                        <span className="sr-only"> — você já tentou esta, e ela não resolve</span>
                      ) : null}
                    </span>
                    {recusada ? (
                      <span aria-hidden className="label-mono shrink-0 text-navy">
                        não resolve
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}

      {estado.resolvido ? (
        <div ref={caixaRecomecar}>
          <Button onClick={recomecar} variant="secondary">
            Tentar de novo
          </Button>
        </div>
      ) : null}
    </>
  );

  return <ActivityShell palco={palco} montagem={montagem} />;
}
