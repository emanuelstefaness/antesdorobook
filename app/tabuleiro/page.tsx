import type { Metadata } from "next";
import Image from "next/image";
import { ChallengeRunner } from "@/components/board/ChallengeRunner";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata(
  "tabuleiro",
  "Monte algoritmos num tabuleiro 6 por 6, execute passo a passo e resolva oito desafios progressivos.",
);

/**
 * Esta área é só o simulador. A versão anterior abria com uma foto do kit
 * cheia de marcadores e uma grade de nove cards antes de o professor chegar a
 * fazer qualquer coisa — muita cerimônia para o que é, no fim, uma ferramenta
 * de apoio. O conteúdo que importa está em APRENDER e PRATICAR.
 */
export default function TabuleiroPage() {
  return (
    <>
      <header className="border-b border-navy/10 bg-cream-hi">
        <div className="mx-auto grid max-w-[1400px] items-center gap-6 px-5 py-8 md:px-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
          <span className="label-mono text-navy/65">Etapa 4 · Tabuleiro</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.0] tracking-display">
            Simulador do tabuleiro
          </h1>
          <p className="mt-4 max-w-[58ch] font-sans text-[15px] leading-relaxed text-navy/70">
            Monte a sequência, execute e veja o robô fazer exatamente o que você mandou. Oito
            desafios, do percurso reto ao menor algoritmo possível.
          </p>
          </div>
          <div className="relative aspect-[2/1] overflow-hidden rounded-card shadow-card"><Image unoptimized fill priority src="/assets/antes-do-robo/kit-tabuleiro-completo.png" alt="Kit completo do tabuleiro" className="object-cover"/></div>
        </div>
      </header>
      <ChallengeRunner />
    </>
  );
}
