"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animacoesReduzidas } from "@/lib/animacoes";

/**
 * Entrada suave quando o bloco chega à área visível.
 *
 * Feito com IntersectionObserver e uma transição de CSS, e não com GSAP de
 * propósito. A biblioteca de animação avança quadro a quadro pelo
 * requestAnimationFrame; numa aba em segundo plano esses quadros não
 * acontecem, e uma animação que começa escondendo o elemento pode deixá-lo
 * invisível enquanto isso. Transição de CSS não depende disso.
 *
 * A rede de segurança abaixo existe pelo mesmo motivo: um efeito de entrada
 * nunca pode ser a razão de um parágrafo não existir na tela. Se o observador
 * não disparar — navegador antigo, elemento dentro de algo escondido, erro
 * qualquer — o conteúdo aparece assim mesmo, com atraso e sem animação.
 */
const ESPERA_MAXIMA = 1500;

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const alvo = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const elemento = alvo.current;

    if (!elemento || animacoesReduzidas() || typeof IntersectionObserver === "undefined") {
      setVisivel(true);
      return;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        if (!entradas.some((e) => e.isIntersecting)) return;
        setVisivel(true);
        observador.disconnect();
      },
      // A margem negativa embaixo atrasa um pouco o disparo: sem ela, o bloco
      // termina de aparecer antes de o professor chegar a olhar para ele.
      { rootMargin: "0px 0px -10% 0px" },
    );

    observador.observe(elemento);

    const rede = window.setTimeout(() => {
      setVisivel(true);
      observador.disconnect();
    }, ESPERA_MAXIMA);

    return () => {
      observador.disconnect();
      window.clearTimeout(rede);
    };
  }, []);

  return (
    <div
      ref={alvo}
      // O estado inicial escondido está aqui, e não numa classe do CSS global,
      // para que o React o controle inteiro: nada some sem que este mesmo
      // componente tenha decidido esconder.
      className={`transition-[opacity,transform] duration-500 ease-out ${
        visivel ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}
