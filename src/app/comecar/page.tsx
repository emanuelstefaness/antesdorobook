import Link from "next/link";
import { Diagnostico } from "@/components/support/Diagnostico";
import { PageHeader } from "@/components/ui/PageHeader";
import { STAGES } from "@/lib/journey";
import { pageMetadata } from "@/lib/metadata";
import { ArrowUpRight } from "lucide-react";

export const metadata = pageMetadata(
  "comecar",
  "Três perguntas dizem por onde começar, e um mapa mostra o que existe em cada uma das sete áreas da formação.",
);

export default function ComecarPage() {
  return (
    <>
      <PageHeader stageId="comecar">
        <p className="mt-4 max-w-[54ch] font-sans text-[15px] leading-relaxed text-navy/70">
          Não existe uma ordem obrigatória, mas existe uma que faz mais sentido para o seu caso.
          Responda três perguntas e a formação diz por onde entrar.
        </p>
      </PageHeader>

      <section className="mx-auto max-w-[1180px] px-5 py-8 md:py-10">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div><p className="label-mono text-cyan">Diagnóstico rápido</p><h2 className="mt-1 font-display text-[clamp(1.4rem,3vw,2rem)] font-extrabold">Monte sua rota em menos de um minuto</h2></div>
          <span className="hidden rounded-pill bg-cyan/12 px-3 py-1.5 text-[11px] font-semibold text-navy sm:block">3 escolhas · resultado imediato</span>
        </div>
        <Diagnostico />
      </section>

      <section className="mx-auto max-w-[1180px] px-5 pb-16 pt-5">
        <h2 className="font-display text-[clamp(1.4rem,2.8vw,2rem)] leading-tight tracking-display">
          O que existe em cada área
        </h2>
        <p className="mt-2 max-w-[54ch] font-sans text-[14px] leading-relaxed text-navy/70">
          Se preferir escolher por conta própria, aqui está o mapa inteiro. Nada fica trancado.
        </p>

        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((etapa) => (
            <li key={etapa.id}>
              <Link href={etapa.href} className="group flex min-h-[118px] flex-col rounded-card bg-white p-4 shadow-card transition hover:-translate-y-1 hover:shadow-card-hover">
                <span className="flex items-start justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-navy font-mono text-[10px] font-bold text-cyan">
                    {String(etapa.order).padStart(2, "0")}
                  </span>
                  <ArrowUpRight size={15} className="text-navy/30 transition group-hover:text-cyan" />
                </span>
                <span className="mt-3 font-display text-[16px] font-extrabold leading-tight tracking-display group-hover:underline">
                    {etapa.label}
                </span>
                <span className="mt-1 block font-sans text-[11.5px] leading-snug text-navy/58">
                  {etapa.verb}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
