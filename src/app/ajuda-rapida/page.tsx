import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import {
  NOMES_DAS_AREAS_DE_AJUDA,
  QUICK_HELP,
  ajudaDaArea,
  type QuickArea,
} from "@/data/quickHelp";

export const metadata: Metadata = {
  title: `Ajuda rápida — ${BRAND.name}`,
  description:
    "O que fazer agora quando a aula trava: a placa que não conecta, o grupo que terminou antes, o material que faltou, o tempo que não fechou.",
};

const ORDEM: QuickArea[] = ["placa", "turma", "material", "tempo"];

export default function AjudaRapidaPage() {
  return (
    <>
      <header className="border-b border-navy/10 bg-cream-hi">
        <div className="mx-auto max-w-[1400px] px-5 py-12">
          <span className="label-mono text-navy/65">Apoio</span>
          <h1 className="mt-3 font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.0] tracking-display">
            Ajuda rápida
          </h1>
          <p className="mt-4 max-w-[58ch] font-sans text-[15px] leading-relaxed text-navy/70">
            {QUICK_HELP.length} problemas que travam uma aula, com o que fazer agora e o que mudar
            da próxima vez. Se você está de pé na frente da turma, leia só a primeira parte.
          </p>

          {/* Atalhos por área. A página inteira cabe numa rolagem, mas quem já
              sabe que o problema é a placa não deveria passar por mais nada. */}
          <nav aria-label="Ir para uma área" className="mt-6 flex flex-wrap gap-2">
            {ORDEM.map((area) => (
              <a
                key={area}
                href={`#${area}`}
                className="inline-flex min-h-[44px] items-center rounded-pill border border-navy/15 bg-cream-hi px-4 font-sans text-[12px] font-bold uppercase tracking-[0.06em] text-navy shadow-card transition-colors hover:bg-navy/5"
              >
                {NOMES_DAS_AREAS_DE_AJUDA[area]}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 py-16">
        {ORDEM.map((area) => (
          <section key={area} id={area} className="mt-14 scroll-mt-24 first:mt-0">
            <h2 className="font-display text-[clamp(1.4rem,2.8vw,2rem)] leading-tight tracking-display">
              {NOMES_DAS_AREAS_DE_AJUDA[area]}
            </h2>

            <div className="mt-6 grid gap-x-8 gap-y-9 lg:grid-cols-2">
              {ajudaDaArea(area).map((item) => (
                <article key={item.id}>
                  <span aria-hidden className="block h-[2px] w-full bg-navy/15" />
                  <h3 className="mt-3 max-w-[40ch] font-display text-[16px] font-extrabold leading-tight tracking-display">
                    {item.problem}
                  </h3>

                  <div className="mt-3 border-l-2 border-cyan pl-3">
                    <span className="label-mono text-navy/65">Agora</span>
                    <p className="mt-1 max-w-[46ch] font-sans text-[14px] leading-relaxed text-navy/85">
                      {item.now}
                    </p>
                  </div>

                  <div className="mt-3 border-l-2 border-amber pl-3">
                    <span className="label-mono text-navy/65">Da próxima vez</span>
                    <p className="mt-1 max-w-[46ch] font-sans text-[13px] leading-relaxed text-navy/70">
                      {item.later}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
