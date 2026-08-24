"use client";

import { useLayoutEffect, useRef } from "react";
import type { CommandType } from "@/lib/board/types";
import { ROTULOS, SIMBOLOS } from "./CommandTray";

export function CommandQueue({
  fila,
  ponteiro,
  erroNoIndice,
  onRemover,
  onMover,
  desabilitado,
  rotulos,
}: {
  fila: CommandType[];
  ponteiro: number;
  erroNoIndice: number | null;
  onRemover: (indice: number) => void;
  onMover: (de: number, para: number) => void;
  desabilitado: boolean;
  // Mesma troca de nome que a bandeja aceita — a fila precisa dela também,
  // senão a peça mudaria de nome ao sair da bandeja e entrar na sequência.
  rotulos?: Partial<Record<CommandType, string>>;
}) {
  // Botões de mover, indexados por `${indice}-cima` / `${indice}-baixo`, para
  // podermos devolver o foco a eles depois que a fila for reordenada (ver
  // useLayoutEffect abaixo).
  const botoes = useRef(new Map<string, HTMLButtonElement | null>());
  // Chave do botão que deve receber o foco assim que a próxima renderização
  // da fila (já reordenada) terminar. `null` quando não há reordenação pendente.
  const focoPendente = useRef<string | null>(null);

  useLayoutEffect(() => {
    const chave = focoPendente.current;
    if (!chave) return;
    focoPendente.current = null;

    const botaoAlvo = botoes.current.get(chave);
    if (botaoAlvo && !botaoAlvo.disabled) {
      botaoAlvo.focus();
      return;
    }

    // O botão alvo não existe mais ou ficou desabilitado (o item chegou a uma
    // ponta da fila) — foca o botão da direção oposta na mesma linha, para o
    // foco nunca cair de volta no <body>. Isto só se aplica às chaves de
    // mover ("N-cima"/"N-baixo"); chaves de remover ("N-remover") já apontam
    // para um índice válido calculado em removerItem, ou o foco fica de
    // propósito sem alvo quando a fila esvaziou (ver comentário lá).
    const [indiceStr, direcao] = chave.split("-");
    if (direcao !== "cima" && direcao !== "baixo") return;
    const direcaoOposta = direcao === "cima" ? "baixo" : "cima";
    const botaoAlternativo = botoes.current.get(`${indiceStr}-${direcaoOposta}`);
    if (botaoAlternativo && !botaoAlternativo.disabled) {
      botaoAlternativo.focus();
    }
  }, [fila]);

  function moverCima(i: number) {
    const alvo = i - 1;
    focoPendente.current = `${alvo}-cima`;
    onMover(i, alvo);
  }

  function moverBaixo(i: number) {
    const alvo = i + 1;
    focoPendente.current = `${alvo}-baixo`;
    onMover(i, alvo);
  }

  // Estende a mesma mecânica de foco usada por mover para remover: sem isto,
  // remover uma peça pelo teclado joga o foco de volta para o <body>, e um
  // professor limpando a fila com Tab+Enter perde o lugar a cada clique.
  function removerItem(i: number) {
    const tamanhoDepois = fila.length - 1;
    if (tamanhoDepois === 0) {
      // A fila fica vazia: a lista inteira é substituída pelo texto de
      // estado vazio, que não é focável. Não há para onde levar o foco —
      // isto é aceitável, é o único caso em que a invariante "nunca cai no
      // body" não se aplica, porque não sobra nenhum controle da lista.
      focoPendente.current = null;
    } else if (i < tamanhoDepois) {
      // Sobra um item na mesma posição i (o que vinha depois deslizou para cá).
      focoPendente.current = `${i}-remover`;
    } else {
      // O item removido era o último: foca o novo último item.
      focoPendente.current = `${i - 1}-remover`;
    }
    onRemover(i);
  }

  if (fila.length === 0) {
    return (
      <div className="rounded-block border-2 border-dashed border-navy/25 p-6 text-center">
        <p className="font-sans text-[13px] text-navy/65">
          Sua sequência está vazia. Toque numa peça acima para começar a montar o algoritmo.
        </p>
      </div>
    );
  }

  return (
    <ol className="flex flex-col gap-2">
      {fila.map((comando, i) => {
        const executando = i === ponteiro;
        const comErro = i === erroNoIndice;
        const rotulo = rotulos?.[comando] ?? ROTULOS[comando];
        return (
          <li
            key={`${comando}-${i}`}
            aria-current={executando ? "step" : undefined}
            className={[
              "flex items-center gap-2 rounded-block border-2 bg-cream-hi p-2",
              comErro
                ? "border-led border-dashed"
                : executando
                  ? "border-cyan"
                  : "border-navy/15",
            ].join(" ")}
          >
            {executando && (
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full bg-cyan ring-2 ring-navy"
                aria-hidden
              />
            )}
            {comErro && (
              <span className="shrink-0 text-sm font-bold text-led" aria-hidden>
                ⚠
              </span>
            )}
            <span className="w-6 shrink-0 text-center font-mono text-[11px] font-bold text-navy/65">
              {i + 1}
            </span>
            <span aria-hidden className="text-[15px] leading-none">
              {SIMBOLOS[comando]}
            </span>
            <span className="flex-1 font-sans text-[12.5px] font-semibold text-navy">
              {rotulo}
              {executando && <span className="sr-only"> — executando agora</span>}
              {comErro && (
                <span className="sr-only"> — esta peça tem um erro de montagem</span>
              )}
            </span>

            {/* Os três botões abaixo (mover para cima/baixo, remover) ficam
                nativos de propósito: são alvos quadrados de 44×44 só com
                ícone, e dependem de guardar uma ref por botão para devolver o
                foco depois de reordenar/remover (ver useLayoutEffect acima).
                O componente Button não é forwardRef — não tem como anexar
                essa ref através dele sem alterar sua assinatura para todos os
                chamadores existentes. */}
            <button
              type="button"
              ref={(el) => {
                botoes.current.set(`${i}-cima`, el);
              }}
              onClick={() => moverCima(i)}
              disabled={desabilitado || i === 0}
              aria-label={`Mover ${rotulo} para cima`}
              className="h-11 w-11 rounded-block font-mono text-[13px] text-navy disabled:opacity-30"
            >
              ↑
            </button>
            <button
              type="button"
              ref={(el) => {
                botoes.current.set(`${i}-baixo`, el);
              }}
              onClick={() => moverBaixo(i)}
              disabled={desabilitado || i === fila.length - 1}
              aria-label={`Mover ${rotulo} para baixo`}
              className="h-11 w-11 rounded-block font-mono text-[13px] text-navy disabled:opacity-30"
            >
              ↓
            </button>
            <button
              type="button"
              ref={(el) => {
                botoes.current.set(`${i}-remover`, el);
              }}
              onClick={() => removerItem(i)}
              disabled={desabilitado}
              aria-label={`Remover ${rotulo} da sequência`}
              className="h-11 w-11 rounded-block font-mono text-[13px] text-led disabled:opacity-30"
            >
              ×
            </button>
          </li>
        );
      })}
    </ol>
  );
}
