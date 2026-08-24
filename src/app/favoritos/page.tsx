import type { Metadata } from "next";
import { ListaDeFavoritos } from "@/components/support/ListaDeFavoritos";
import { BRAND } from "@/config/brand";

export const metadata: Metadata = {
  title: `Favoritos — ${BRAND.name}`,
  description:
    "Tudo que você marcou para encontrar de novo: atividades, planos de aula e assuntos, reunidos num só lugar.",
};

export default function FavoritosPage() {
  return (
    <>
      <header className="border-b border-navy/10 bg-cream-hi">
        <div className="mx-auto max-w-[1400px] px-5 py-12">
          <span className="label-mono text-navy/65">Apoio</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.0] tracking-display">
            Favoritos
          </h1>
          <p className="mt-4 max-w-[54ch] font-sans text-[15px] leading-relaxed text-navy/70">
            Tudo que você marcou para encontrar de novo depois — atividades, planos de aula e
            assuntos das trilhas, reunidos num só lugar.
          </p>
        </div>
      </header>
      <section className="mx-auto max-w-[1400px] px-5 py-16">
        <ListaDeFavoritos />
      </section>
    </>
  );
}
