import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "coral" | "coral-outline";

// Ao ser pressionado, o botão desloca 2px para dentro da própria sombra de 5px —
// sobram 3px, então ele parece afundar, não perder a sombra. Por isso a transição
// precisa cobrir também box-shadow: animar só o transform faria a sombra saltar.
const BASE =
  "inline-flex min-h-[42px] items-center justify-center gap-2 rounded-block px-4 py-2.5 text-center font-sans text-[10.5px] font-bold uppercase leading-tight tracking-[0.05em] transition-[transform,box-shadow] duration-150 active:translate-x-[2px] active:translate-y-[2px] sm:min-h-[44px] sm:px-5 sm:py-3 disabled:pointer-events-none disabled:opacity-40";

// "coral" e "coral-outline" são o par primário/secundário do sistema visual
// novo: pílula, sombra suave, sem o gesto de "afundar" do botão antigo — só
// elevação. Convivem com as variantes antigas até a migração terminar.
const VARIANTS: Record<Variant, string> = {
  primary: "bg-navy text-cream-hi shadow-solid active:shadow-solid-pressed disabled:shadow-none",
  secondary: "border-2 border-navy bg-transparent text-navy",
  accent: "bg-orange text-navy shadow-accent active:shadow-accent-pressed disabled:shadow-none",
  coral:
    "rounded-pill bg-coral text-cream-hi shadow-card transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:shadow-card-hover active:translate-y-0",
  "coral-outline":
    "rounded-pill border border-navy/15 bg-cream-hi text-navy shadow-card transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-card-hover active:translate-y-0",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
  // Só se aplica ao ramo <button> (o ramo <Link> não tem um equivalente
  // semântico de "desabilitado"); nenhum chamador atual passa href e
  // disabled ao mesmo tempo.
  disabled?: boolean;
  className?: string;
};

export function Button({
  children,
  variant = "primary",
  href,
  onClick,
  type = "button",
  ariaLabel,
  disabled = false,
  className = "",
}: Props) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
