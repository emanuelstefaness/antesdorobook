import type { Metadata } from "next";
import { BuscaGlobal } from "@/components/support/BuscaGlobal";
import { BRAND } from "@/config/brand";

export const metadata: Metadata = {
  title: `Busca — ${BRAND.name}`,
  description:
    "Procure de uma vez na formação do professor, conceitos, atividades, aulas prontas, trilhas, projetos, peças da placa, glossário e ajuda rápida.",
};

export default function BuscaPage() {
  return (
    <>
      <header className="border-b border-navy/10 bg-cream-hi">
        <div className="mx-auto max-w-[1400px] px-5 py-12">
          <span className="label-mono text-navy/65">Apoio</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.0] tracking-display">
            Busca
          </h1>
        </div>
      </header>
      <section className="mx-auto max-w-[1400px] px-5 py-12">
        <BuscaGlobal />
      </section>
    </>
  );
}
