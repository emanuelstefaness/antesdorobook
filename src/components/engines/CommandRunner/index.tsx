"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { mensagemDe, type Desfecho, type Mensagem } from "@/lib/board/feedback";
import type { Execucao } from "@/lib/board/runner";
import { estadoInicial } from "@/lib/board/simulate";
import type { CommandType, EstadoRobo, GridSpec, Posicao } from "@/lib/board/types";
import { useCommandRunner } from "@/lib/board/useCommandRunner";
import { ActivityShell } from "../shared/ActivityShell";
import { FeedbackPanel } from "../shared/FeedbackPanel";
import { StepAnnouncer } from "../shared/StepAnnouncer";
import { Board } from "./Board";
import { CommandQueue } from "./CommandQueue";
import { CommandTray, ROTULOS } from "./CommandTray";
import { Controls } from "./Controls";

export function CommandRunner({
  grid,
  minimo,
  permitidos,
  onVitoria,
  mensagens = mensagemDe,
  rotulos,
  renderPalco,
  onEvento,
}: {
  grid: GridSpec;
  minimo: number | null;
  permitidos: CommandType[];
  onVitoria?: () => void;
  /** Troca o texto do desfecho. O tabuleiro usa `mensagemDe`; outra atividade
   *  tem outro cenário e não pode falar de chave e baú. */
  mensagens?: (d: Desfecho) => Mensagem;
  rotulos?: Partial<Record<CommandType, string>>;
  /** Troca o que aparece no palco. Sem isso, desenha o tabuleiro. */
  renderPalco?: (estado: { grid: GridSpec; robo: EstadoRobo; rastro: Posicao[] }) => ReactNode;
  /** Chamado a cada passo executado, com a execução já avançada — e uma vez
   *  com `ponteiro === 0` quando a execução acabou de ser montada, que é o
   *  sinal de que uma tentativa começou. */
  onEvento?: (exec: Execucao) => void;
}) {
  const r = useCommandRunner({ grid, minimo });
  const jaAvisou = useRef(false);
  // Último ponteiro já entregue a `onEvento`. -1 significa "nada entregue
  // ainda", inclusive para a execução recém-montada, cujo ponteiro é 0.
  const ultimoAnunciado = useRef(-1);

  const venceu = r.exec?.desfecho?.tipo === "vitoria";

  useEffect(() => {
    if (venceu && !jaAvisou.current) {
      jaAvisou.current = true;
      onVitoria?.();
    }
    if (!venceu) {
      jaAvisou.current = false;
      ultimoAnunciado.current = -1;
    }
  }, [venceu, onVitoria]);

  const ponteiro = r.exec?.ponteiro ?? 0;

  useEffect(() => {
    if (!r.exec || !onEvento) return;
    if (ponteiro === ultimoAnunciado.current) return;
    ultimoAnunciado.current = ponteiro;
    onEvento(r.exec);
    // `ponteiro` é a única grandeza que muda a cada passo; observar `r.exec`
    // inteiro dispararia também quando só a velocidade mudasse.
  }, [ponteiro, r.exec, onEvento]);

  const robo = r.exec?.robo ?? estadoInicial(grid);
  const rastro = r.exec?.rastro ?? [{ ...grid.robo }];
  const mensagem = r.exec?.desfecho ? mensagens(r.exec.desfecho) : null;
  const pecas = r.fila.filter((c) => c !== "INICIO" && c !== "FIM").length;

  // O ponteiro só avança depois que um passo já rodou (ver `avancarExecucao`),
  // então a instrução recém-executada é a de `ponteiro - 1`. Antes do
  // primeiro passo (`ponteiro === 0`, execução recém-montada) não há nada
  // para anunciar ainda.
  const passoExecutado =
    r.exec && r.exec.ponteiro > 0 ? r.exec.instrucoes[r.exec.ponteiro - 1] : undefined;
  // O anúncio usa o mesmo rótulo que a fila mostra: se a atividade renomeou a
  // peça, quem ouve precisa ouvir o nome que quem vê está lendo.
  const anuncioPasso =
    r.exec && passoExecutado
      ? `Passo ${r.exec.ponteiro} de ${r.exec.instrucoes.length}: ${(rotulos?.[passoExecutado] ?? ROTULOS[passoExecutado]).toLowerCase()}. Robô na linha ${r.exec.robo.posicao.linha + 1}, coluna ${r.exec.robo.posicao.coluna + 1}.`
      : null;

  return (
    <ActivityShell
      palco={
        <>
          {renderPalco ? (
            renderPalco({ grid, robo, rastro })
          ) : (
            <Board grid={grid} robo={robo} rastro={rastro} />
          )}

          {/* Anúncio por passo: quem usa leitor de tela acompanha "um comando
              de cada vez" pela região live, a mesma pedagogia que a fila
              visual ensina. */}
          <StepAnnouncer texto={anuncioPasso} />

          <Controls
            rodando={r.rodando}
            pecas={pecas}
            minimo={minimo}
            velocidade={r.velocidade}
            onExecutar={r.executar}
            onPasso={r.passoAPasso}
            onPausar={r.pausar}
            onReiniciar={r.reiniciar}
            onLimpar={r.limpar}
            onVelocidade={r.setVelocidade}
          />

          <FeedbackPanel mensagem={mensagem} erro={r.exec?.erro ?? null} />
        </>
      }
      montagem={
        <>
          <CommandTray
            permitidos={permitidos}
            onAdicionar={r.adicionar}
            desabilitado={r.rodando}
            rotulos={rotulos}
          />
          <div>
            <h3 className="label-mono text-navy/65">Seu algoritmo</h3>
            <div className="mt-3">
              <CommandQueue
                fila={r.fila}
                ponteiro={r.exec?.ponteiro ?? -1}
                erroNoIndice={r.exec?.erro?.indice ?? null}
                onRemover={r.remover}
                onMover={r.mover}
                desabilitado={r.rodando}
                rotulos={rotulos}
              />
            </div>
          </div>
        </>
      }
    />
  );
}
