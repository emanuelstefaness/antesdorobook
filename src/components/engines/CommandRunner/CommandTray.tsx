"use client";

import type { CommandType } from "@/lib/board/types";

export const ROTULOS: Record<CommandType, string> = {
  INICIO: "Início",
  AVANCE: "Avance",
  VIRE_DIREITA: "Vire à direita",
  VIRE_ESQUERDA: "Vire à esquerda",
  REPITA_2X: "Repita 2x",
  REPITA_3X: "Repita 3x",
  REPITA_4X: "Repita 4x",
  FIM: "Fim",
};

export const SIMBOLOS: Record<CommandType, string> = {
  INICIO: "▶",
  AVANCE: "↑",
  VIRE_DIREITA: "↻",
  VIRE_ESQUERDA: "↺",
  REPITA_2X: "2×",
  REPITA_3X: "3×",
  REPITA_4X: "4×",
  FIM: "■",
};

export function CommandTray({
  permitidos,
  onAdicionar,
  desabilitado,
  rotulos,
}: {
  permitidos: CommandType[];
  onAdicionar: (comando: CommandType) => void;
  desabilitado: boolean;
  // Uma atividade pode chamar a mesma peça de outro nome ("desenhe" em vez de
  // "avance") sem que a semântica do motor mude.
  rotulos?: Partial<Record<CommandType, string>>;
}) {
  return (
    <div>
      <h3 className="label-mono text-navy/65">Peças disponíveis</h3>
      {/* Estas peças ficam nativas de propósito: o Button mais próximo
          (secondary) usa padding, família de fonte e tracking diferentes
          (px-5 py-3.5 font-sans vs px-3 py-2 font-mono aqui), então
          sobrescrever tudo via className brigaria com o variant em vez de
          somar a ele. A textura de MDF saiu junto com as fotos do tabuleiro:
          num simulador de tela, imitar madeira só destoava do resto. */}
      <div className="mt-3 flex flex-wrap gap-2">
        {permitidos.map((comando) => (
          <button
            key={comando}
            type="button"
            onClick={() => onAdicionar(comando)}
            disabled={desabilitado}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-block border-2 border-navy bg-cream-hi px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.07em] text-navy transition-colors hover:bg-cyan/20 disabled:opacity-45"
          >
            <span aria-hidden className="text-[15px] leading-none">
              {SIMBOLOS[comando]}
            </span>
            {rotulos?.[comando] ?? ROTULOS[comando]}
          </button>
        ))}
      </div>
    </div>
  );
}
