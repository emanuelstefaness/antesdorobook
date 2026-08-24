"use client";

import { useId, useRef, useState } from "react";
import type { ReactNode } from "react";

export type AbaAtividade = { id: string; rotulo: string; conteudo: ReactNode };

/**
 * "Visão geral" vem primeiro e abre por padrão — é o que decide se a
 * atividade serve antes de a professora ler o roteiro inteiro. "Experimente"
 * (o simulador) fica por último: é meio, não fim, quem abre a atividade quer
 * saber o que fazer com a turma antes de mexer no simulador.
 *
 * Teclado segue o padrão APG: setas trocam de aba, Home e End vão às pontas, e
 * só a aba ativa fica na ordem de tabulação.
 */
export function AbasAtividade({ abas }: { abas: AbaAtividade[] }) {
  const [ativa, setAtiva] = useState(abas[0].id);
  const base = useId();
  const botoes = useRef(new Map<string, HTMLButtonElement | null>());

  const irPara = (id: string) => {
    setAtiva(id);
    botoes.current.get(id)?.focus();
  };

  const aoTeclar = (e: React.KeyboardEvent) => {
    const i = abas.findIndex((a) => a.id === ativa);
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      irPara(abas[(i + 1) % abas.length].id);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      irPara(abas[(i - 1 + abas.length) % abas.length].id);
    } else if (e.key === "Home") {
      e.preventDefault();
      irPara(abas[0].id);
    } else if (e.key === "End") {
      e.preventDefault();
      irPara(abas[abas.length - 1].id);
    }
  };

  const abaAtiva = abas.find((a) => a.id === ativa) ?? abas[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Seções desta atividade"
        className="no-print flex gap-1 overflow-x-auto border-b border-navy/10 pb-px [scrollbar-width:none]"
      >
        {abas.map((aba) => {
          const selecionada = aba.id === ativa;
          return (
            <button
              key={aba.id}
              ref={(el) => {
                botoes.current.set(aba.id, el);
              }}
              type="button"
              role="tab"
              id={`${base}-${aba.id}-aba`}
              aria-selected={selecionada}
              aria-controls={`${base}-${aba.id}-painel`}
              tabIndex={selecionada ? 0 : -1}
              onClick={() => setAtiva(aba.id)}
              onKeyDown={aoTeclar}
              className={[
                "min-h-[42px] -mb-px shrink-0 rounded-t-card-sm border-b-2 px-3 font-sans text-[11.5px] font-bold uppercase tracking-[0.04em] transition-colors sm:px-4 sm:text-[12.5px]",
                selecionada
                  ? "border-cyan text-navy"
                  : "border-transparent text-navy/50 hover:text-navy",
              ].join(" ")}
            >
              {aba.rotulo}
            </button>
          );
        })}
      </div>

      {/* O painel inativo é desmontado, não escondido: deixar o motor da aba
          "Experimente" montado em segundo plano manteria uma execução rodando
          invisível. */}
      <div
        role="tabpanel"
        id={`${base}-${abaAtiva.id}-painel`}
        aria-labelledby={`${base}-${abaAtiva.id}-aba`}
        tabIndex={0}
        className="pt-6 md:pt-8"
      >
        {abaAtiva.conteudo}
      </div>
    </div>
  );
}
