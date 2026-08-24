"use client";

import { BRAND } from "@/config/brand";
import { Button } from "@/components/ui/Button";
import { useJourney } from "@/lib/useProgress";
import { CORE_STAGES } from "@/lib/journey";

// Hero deliberadamente estático: sem ScrollTrigger, sem pin, sem scrub.
// A única animação é a entrada ao montar — um fade com leve deslocamento
// no texto e na imagem. Movimento acompanhando o scroll fica para uma
// seção futura, não para o hero.
export function Hero() {
  const { hydrated, percent, next } = useJourney();

  // Antes da hidratação não sabemos se há progresso salvo — "Começar" é a
  // suposição mais honesta (quem nunca abriu o site também vê "Começar",
  // não "Continuar"). Depois de hidratar, o botão reflete o que a
  // professora já fez de verdade.
  const emProgresso = hydrated && percent > 0;
  const destino = emProgresso && next ? next.href : "/comecar";
  const rotuloCta = emProgresso ? "Continuar minha jornada" : "Começar minha jornada";

  return (
    <section className="mx-auto w-full max-w-[1480px] px-4 pt-4 md:px-6 md:pt-5">
      <div role="img" aria-label="Tabuleiro de programação com robô, chave, baú e micro:bit" className="relative overflow-hidden rounded-[24px] border border-white/60 bg-cover bg-center shadow-card" style={{backgroundImage:'url("/assets/antes-do-robo/hero-tabuleiro-robo-microbit.png")'}}>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#fffaf1_0%,rgba(255,250,241,.97)_30%,rgba(255,250,241,.58)_48%,transparent_72%)]" />
        <div data-hero="texto" className="relative z-10 flex min-h-[350px] max-w-[600px] flex-col justify-center px-5 py-8 sm:min-h-[380px] md:px-9 md:py-10 lg:min-h-[400px] lg:px-10">
          <span className="label-mono inline-flex w-fit rounded-pill bg-cyan/12 px-3 py-1.5 text-[#087d98]">
            Formação prática · {CORE_STAGES.length} etapas centrais
          </span>

          <h1 className="mt-4 max-w-[12ch] font-display text-[clamp(2.2rem,11vw,4rem)] font-extrabold leading-[.98] tracking-display sm:mt-5">
            Robótica começa <span className="text-cyan">antes do robô.</span>
          </h1>

          <p className="mt-4 max-w-[42ch] font-sans text-[14px] leading-relaxed text-navy/70 sm:mt-5 sm:text-[16px]">
            {BRAND.heroText}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button href={destino} variant="coral">
              {rotuloCta}
            </Button>
          </div>
          <p className="mt-4 label-mono text-navy/55">150 aulas completas · caminho recomendado · formação do professor</p>
        </div>
      </div>
    </section>
  );
}
