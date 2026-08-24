"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";
import type { Realce } from "@/components/ui/Card";

/**
 * Bloco recolhível, fechado por padrão. É o que sustenta a divulgação
 * progressiva: a página abre com um parágrafo e uma demonstração, e todo o
 * resto só aparece quando o professor pede.
 *
 * Usa <button> + região controlada em vez de <details> porque precisamos do
 * `aria-expanded` explícito, e porque o <details> nativo se comporta de forma
 * inconsistente entre navegadores quando o conteúdo é alto.
 */

const FAIXA: Record<Realce, string> = {
  cyan: "bg-cyan",
  amber: "bg-amber",
  purple: "bg-purple",
  coral: "bg-coral",
  green: "bg-green",
};

export function DisclosureBloco({
  titulo,
  children,
  aberto: abertoInicial = false,
  ancora,
  realce = "cyan",
}: {
  titulo: string;
  children: ReactNode;
  aberto?: boolean;
  /**
   * Id estável para link direto. Diferente do id da região controlada, que vem
   * do `useId` e muda a cada build — esse não serviria para endereço.
   */
  ancora?: string;
  realce?: Realce;
}) {
  const [aberto, setAberto] = useState(abertoInicial);
  const idRegiao = useId();

  return (
    <div
      id={ancora}
      className="relative h-fit scroll-mt-24 overflow-hidden rounded-card bg-cream-hi shadow-card"
    >
      <span aria-hidden className={`absolute inset-y-0 left-0 w-[6px] ${FAIXA[realce]}`} />

      <button
        type="button"
        onClick={() => setAberto((a) => !a)}
        aria-expanded={aberto}
        aria-controls={idRegiao}
        className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 pl-8 pr-5 text-left font-sans text-[12px] font-bold uppercase tracking-[0.06em] text-navy"
      >
        {titulo}
        {/* O mesmo sinal gira 45° e vira um ×: um só elemento para os dois
            estados, então não há troca de ícone piscando no meio da transição. */}
        <span
          aria-hidden
          className={`shrink-0 text-xl leading-none transition-transform duration-300 ease-out ${
            aberto ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>

      {/*
        Abertura animada pela linha da grade indo de 0fr a 1fr — é o único
        jeito de animar "até a altura do conteúdo" sem medir nada no
        JavaScript. A visibilidade acompanha com atraso no fechamento, senão o
        texto sumiria de uma vez antes de o bloco terminar de recolher; e
        `invisible` (e não só altura zero) é o que tira o conteúdo fechado do
        leitor de tela e da ordem de tabulação.
      */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
          aberto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div
          id={idRegiao}
          className={`overflow-hidden transition-[visibility] ${
            aberto ? "visible delay-0" : "invisible delay-300"
          }`}
        >
          <div className="pb-6 pl-8 pr-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
