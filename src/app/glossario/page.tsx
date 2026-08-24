import type { Metadata } from "next";
import { BuscaDoGlossario } from "@/components/support/BuscaDoGlossario";
import { BRAND } from "@/config/brand";

export const metadata: Metadata = {
  title: `Glossário — ${BRAND.name}`,
  description:
    "Os termos do pensamento computacional e do micro:bit, explicados em linguagem simples e organizados para busca rápida.",
};

export default function GlossarioPage() {
  return (
    <>
      <header className="border-b border-navy/10 bg-cream-hi">
        <div className="mx-auto max-w-[1400px] px-5 py-12">
          <span className="label-mono text-navy/65">Apoio</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.0] tracking-display">
            Glossário
          </h1>
          <p className="mt-4 max-w-[54ch] font-sans text-[15px] leading-relaxed text-navy/70">
            Os termos do pensamento computacional e do micro:bit explicados em linguagem simples,
            com busca para encontrar rápido o que você precisa.
          </p>
        </div>
      </header>
      <section className="mx-auto max-w-[1400px] px-5 py-16">
        <BuscaDoGlossario />
      </section>
    </>
  );
}
