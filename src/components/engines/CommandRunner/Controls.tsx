"use client";

import type { Velocidade } from "@/lib/board/useCommandRunner";
import { Button } from "@/components/ui/Button";

const VELOCIDADES: Velocidade[] = [1, 2, 4];

export function Controls({
  rodando,
  pecas,
  minimo,
  velocidade,
  onExecutar,
  onPasso,
  onPausar,
  onReiniciar,
  onLimpar,
  onVelocidade,
}: {
  rodando: boolean;
  pecas: number;
  minimo: number | null;
  velocidade: Velocidade;
  onExecutar: () => void;
  onPasso: () => void;
  onPausar: () => void;
  onReiniciar: () => void;
  onLimpar: () => void;
  onVelocidade: (v: Velocidade) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button onClick={rodando ? onPausar : onExecutar} variant="primary">
        {rodando ? "Pausar" : "Executar"}
      </Button>

      <Button onClick={onPasso} disabled={rodando} variant="secondary">
        Passo a passo
      </Button>

      <Button onClick={onReiniciar} variant="secondary">
        Reiniciar
      </Button>

      {/* Fica nativo de propósito: "Limpar" precisa de um peso visual mais
          fraco que o secondary do Button (borda navy/30 e texto navy/70, em
          vez de navy cheio) para não competir com Reiniciar. O projeto não
          tem tailwind-merge, então sobrescrever border-navy/text-navy do
          variant via className não teria uma ordem de precedência garantida
          — mais seguro manter a string de classes explícita aqui. */}
      <button
        type="button"
        onClick={onLimpar}
        disabled={rodando}
        className="inline-flex min-h-[44px] items-center justify-center rounded-block border-2 border-navy/30 px-4 font-sans text-[11px] font-bold uppercase tracking-[0.06em] text-navy/70 disabled:opacity-40"
      >
        Limpar
      </button>

      {/* Fica nativo de propósito: é um grupo de alternância de dois estados
          (selecionado = preenchimento ciano, não selecionado = contorno
          fraco), não uma ação momentânea — não é o vocabulário visual de
          nenhuma variante do Button, e o quadrado fixo de 44×44 também não
          combina com o padding em pílula do Button. */}
      <div className="flex items-center gap-1" role="group" aria-label="Velocidade da execução">
        {VELOCIDADES.map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => onVelocidade(v)}
            aria-pressed={velocidade === v}
            className={[
              "h-11 w-11 rounded-block font-mono text-[11px] font-bold",
              velocidade === v ? "bg-cyan text-navy" : "border-2 border-navy/25 text-navy/70",
            ].join(" ")}
          >
            {v}×
          </button>
        ))}
      </div>

      {/* O texto visível é abreviado para caber na barra; o texto só-para-leitor
          diz a mesma coisa por extenso. Não usar aria-label num <p>: o nome
          acessível de elementos sem papel interativo não é anunciado de forma
          confiável em todos os leitores de tela. */}
      <p className="ml-auto font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-navy/65">
        <span aria-hidden>
          {pecas} {pecas === 1 ? "peça" : "peças"}
          {minimo !== null ? ` · mínimo ${minimo}` : ""}
        </span>
        <span className="sr-only">
          {pecas} {pecas === 1 ? "peça montada" : "peças montadas"}.
          {minimo !== null ? ` O mínimo deste desafio é ${minimo}.` : ""}
        </span>
      </p>
    </div>
  );
}
