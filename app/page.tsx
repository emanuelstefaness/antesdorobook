import { Hero } from "@/components/home/Hero";
import { JourneyPath } from "@/components/journey/JourneyPath";
import { PainelAulaRapida } from "@/components/home/PainelAulaRapida";
import { AtividadesRecomendadas } from "@/components/home/AtividadesRecomendadas";
import { ContinuarEFavoritos } from "@/components/home/ContinuarEFavoritos";
import { PercursoPrincipal } from "@/components/home/PercursoPrincipal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PercursoPrincipal />
      <section className="mx-auto grid w-full max-w-[1480px] items-start gap-4 px-4 py-5 md:px-7 xl:grid-cols-[1fr_350px]">
        <JourneyPath />
        <PainelAulaRapida />
      </section>
      <AtividadesRecomendadas />
      <ContinuarEFavoritos />
    </>
  );
}
