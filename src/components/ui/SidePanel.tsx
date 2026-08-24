"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  variant?: "default" | "navigation";
};

// Seletor de elementos que participam da ordem de tabulação padrão.
// Elementos com tabindex="-1" ficam de fora de propósito (ex.: o botão de
// fundo, que só existe para clique de mouse).
const SELETOR_FOCAVEL =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function obterFocaveis(raiz: HTMLElement): HTMLElement[] {
  return Array.from(raiz.querySelectorAll<HTMLElement>(SELETOR_FOCAVEL)).filter(
    (el) => el.getClientRects().length > 0 && el.tabIndex >= 0
  );
}

export function SidePanel({ open, onClose, title, children, variant = "default" }: Props) {
  const painel = useRef<HTMLDivElement>(null);
  const anterior = useRef<HTMLElement | null>(null);
  const aoFechar = useRef(onClose);
  useEffect(() => {
    aoFechar.current = onClose;
  });

  useEffect(() => {
    if (!open) return;

    // Guarda quem tinha o foco antes de abrir, para devolvê-lo ao fechar.
    anterior.current = document.activeElement as HTMLElement | null;

    const raiz = painel.current;
    const focaveisIniciais = raiz ? obterFocaveis(raiz) : [];
    // Se existir algo focável dentro do painel (normalmente o botão
    // "Fechar" do cabeçalho), foca nele; senão foca o próprio contêiner,
    // que tem tabIndex=-1 e por isso aceita foco programático.
    (focaveisIniciais[0] ?? raiz)?.focus();

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") {
        aoFechar.current();
        return;
      }

      if (evento.key !== "Tab" || !raiz) return;

      // Trava de foco: Tab/Shift+Tab nunca saem do painel enquanto ele
      // estiver aberto, mesmo que o painel não tenha nenhum elemento
      // focável além do próprio contêiner.
      const focaveis = obterFocaveis(raiz);
      evento.preventDefault();

      if (focaveis.length === 0) {
        raiz.focus();
        return;
      }

      const indiceAtual = focaveis.indexOf(document.activeElement as HTMLElement);
      let proximoIndice: number;
      if (evento.shiftKey) {
        proximoIndice = indiceAtual <= 0 ? focaveis.length - 1 : indiceAtual - 1;
      } else {
        proximoIndice = indiceAtual === -1 || indiceAtual === focaveis.length - 1 ? 0 : indiceAtual + 1;
      }
      focaveis[proximoIndice].focus();
    };

    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = overflowAnterior;
      anterior.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-navy/40 animate-surgir"
      />
      <div
        ref={painel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={variant === "navigation"
          ? "scrollbar-hidden absolute inset-y-0 left-0 h-full w-[min(88vw,340px)] overflow-y-auto border-r border-white/10 bg-navy p-4 text-white shadow-panel animate-entrar-direita"
          : "absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto border-t-2 border-navy bg-cream-hi p-5 animate-entrar-baixo md:animate-entrar-direita md:bottom-auto md:left-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-[420px] md:border-l-2 md:border-t-0"}
      >
        <div className={`mb-5 flex items-center justify-between gap-4 ${variant === "navigation" ? "border-b border-white/10 pb-4" : ""}`}>
          <h2 className={`font-display tracking-display ${variant === "navigation" ? "text-lg text-white" : "text-2xl"}`}>{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-block border ${variant === "navigation" ? "border-white/25 text-white hover:bg-white/10" : "border-navy text-navy"}`}
          >
            <X size={18} aria-hidden />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
