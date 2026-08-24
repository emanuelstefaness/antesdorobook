import { Hero } from "@/components/home/Hero";
import { JourneyPath } from "@/components/journey/JourneyPath";
import { PainelAulaRapida } from "@/components/home/PainelAulaRapida";
import { AtividadesRecomendadas } from "@/components/home/AtividadesRecomendadas";
import { ContinuarEFavoritos } from "@/components/home/ContinuarEFavoritos";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="mx-auto grid max-w-[1400px] items-start gap-4 px-5 py-5 xl:grid-cols-[1fr_350px]">
        <JourneyPath />
        <PainelAulaRapida />
      </section>
      <AtividadesRecomendadas />
      <ContinuarEFavoritos />
    </>
  );
}
