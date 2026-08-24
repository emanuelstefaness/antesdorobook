"use client";

import { useEffect, useRef, useState } from "react";
import type { DemoSpec } from "@/lib/demo/types";

type Spec = Extract<DemoSpec, { kind: "led-matrix" }>;

const MS_POR_QUADRO = 600;

/**
 * A animação avança por diferença de `Date.now()`, nunca por contagem de
 * quadros: o Chrome estrangula `requestAnimationFrame` em aba de segundo
 * plano, e contar quadros faria a animação atrasar sem ninguém perceber.
 *
 * Com animações reduzidas, a sequência não é suprimida — vira manual. O
 * professor continua vendo todos os quadros, um por clique, porque a
 * informação está justamente na mudança entre eles.
 */
export function LedMatrix({ spec }: { spec: Spec }) {
  const [quadro, setQuadro] = useState(0);
  const [manual, setManual] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    // Lido aqui e não no render: durante o render não existe `document`, e ler
    // ali quebraria a hidratação.
    const reduzidas = document.documentElement.dataset.animacoes === "reduzidas";
    if (reduzidas || spec.frames.length < 2) {
      const quadroManual = window.requestAnimationFrame(() => setManual(reduzidas));
      return () => window.cancelAnimationFrame(quadroManual);
    }

    let inicio = Date.now();
    const passo = () => {
      const decorrido = Date.now() - inicio;
      if (decorrido >= MS_POR_QUADRO) {
        inicio = Date.now();
        setQuadro((q) => (q + 1) % spec.frames.length);
      }
      timer.current = window.requestAnimationFrame(passo);
    };
    timer.current = window.requestAnimationFrame(passo);

    return () => {
      if (timer.current !== null) window.cancelAnimationFrame(timer.current);
    };
  }, [spec.frames.length]);

  const atual = spec.frames[quadro] ?? spec.frames[0];

  return (
    <figure className="rounded-block border-2 border-navy bg-cream-hi p-5 sm:p-7">
      <div
        className="mx-auto grid w-fit gap-1.5 rounded-block bg-navy p-4"
        style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}
        role="img"
        aria-label={`${spec.caption}. Quadro ${quadro + 1} de ${spec.frames.length}.`}
      >
        {atual.flatMap((linha, l) =>
          linha.map((aceso, c) => (
            <span
              key={`${l}-${c}`}
              aria-hidden
              className={[
                "h-4 w-4 rounded-[2px] sm:h-5 sm:w-5",
                aceso === 1 ? "bg-led" : "bg-cream/15",
              ].join(" ")}
            />
          )),
        )}
      </div>

      <figcaption className="mt-4 text-center font-sans text-[13px] leading-relaxed text-navy/70">
        {spec.caption}
      </figcaption>

      {manual && spec.frames.length > 1 ? (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setQuadro((q) => (q + 1) % spec.frames.length)}
            className="min-h-[44px] rounded-block border-2 border-navy px-4 font-sans text-[11px] font-bold uppercase tracking-[0.06em] text-navy"
          >
            Próximo quadro ({quadro + 1}/{spec.frames.length})
          </button>
        </div>
      ) : null}
    </figure>
  );
}
