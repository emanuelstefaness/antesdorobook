import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
  active?: boolean;
  ariaExpanded?: boolean;
  // Sem chamadores existentes até agora, então isto é seguro de adicionar:
  // quando ausente, o nome acessível continua vindo só do texto visível.
  ariaLabel?: string;
};

export function Chip({ children, onClick, active = false, ariaExpanded, ariaLabel }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={ariaExpanded}
      aria-label={ariaLabel}
      className={`inline-flex min-h-[44px] items-center gap-2 rounded-block border-2 border-navy px-3.5 py-2.5 font-sans text-[11.5px] font-semibold transition-colors ${
        active ? "bg-navy text-cream-hi" : "bg-cream-hi text-navy hover:bg-navy/5"
      }`}
    >
      {children}
      <span aria-hidden className="font-mono text-[11px] font-bold text-cyan">
        ↗
      </span>
    </button>
  );
}
