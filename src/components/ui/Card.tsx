import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Cartão do sistema visual premium: raio grande, sombra suave e difusa, sem
 * borda dura. Ao passar o mouse a sombra cresce e o cartão sobe alguns
 * pixels — elevação, não o gesto antigo de "botão pressionado" invertido.
 */
export type Realce = "cyan" | "amber" | "purple" | "coral" | "green";

const SOMBRA: Record<Realce, string> = {
  cyan: "hover:shadow-card-hover",
  amber: "hover:shadow-card-hover",
  purple: "hover:shadow-card-hover",
  coral: "hover:shadow-card-hover",
  green: "hover:shadow-card-hover",
};

const FAIXA: Record<Realce, string> = {
  cyan: "bg-cyan",
  amber: "bg-amber",
  purple: "bg-purple",
  coral: "bg-coral",
  green: "bg-green",
};

const BASE =
  "relative flex flex-col overflow-hidden rounded-card bg-cream-hi p-4 shadow-card transition-[transform,box-shadow] duration-200 ease-out sm:p-5";

const ELEVA = "hover:-translate-y-1";

export function Card({
  children,
  realce = "cyan",
  faixa = false,
  className = "",
  id,
}: {
  children: ReactNode;
  realce?: Realce;
  /** Fita colorida no topo, para diferenciar cartões dentro de uma mesma grade. */
  faixa?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <div id={id} className={`${BASE} ${className}`}>
      {faixa ? (
        <span aria-hidden className={`absolute inset-x-0 top-0 h-[6px] ${FAIXA[realce]}`} />
      ) : null}
      {children}
    </div>
  );
}

/**
 * Cartão inteiro clicável. O <Link> envolve tudo em vez de existir só no
 * título: um alvo de toque do tamanho do cartão é o que faz diferença no
 * celular, que é onde a professora abre isto entre uma aula e outra.
 */
export function CardLink({
  href,
  children,
  realce = "cyan",
  faixa = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  realce?: Realce;
  faixa?: boolean;
  className?: string;
}) {
  return (
    <Link href={href} className={`group ${BASE} ${ELEVA} ${SOMBRA[realce]} ${className}`}>
      {faixa ? (
        <span aria-hidden className={`absolute inset-x-0 top-0 h-[6px] ${FAIXA[realce]}`} />
      ) : null}
      {children}
    </Link>
  );
}
