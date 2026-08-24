import { BotaoFavorito } from "@/components/support/BotaoFavorito";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BotaoImprimir } from "@/components/planner/BotaoImprimir";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/config/brand";
import {
  LESSON_PLANS,
  NOMES_DAS_TURMAS,
  NOMES_DOS_NIVEIS_DE_PLANO,
  planoPorId,
} from "@/data/lessonPlans";

export function generateStaticParams() {
  return LESSON_PLANS.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const plano = planoPorId(params.id);
  if (!plano) return { title: `Plano não encontrado — ${BRAND.name}` };
  return { title: `${plano.title} — ${BRAND.name}`, description: plano.objective };
}

/**
 * As oito fases do roteiro, na ordem em que acontecem na aula. O tipo do campo
 * é restrito aos campos de texto do plano: um nome errado aqui vira erro de
 * compilação em vez de uma fase em branco na folha impressa.
 */
type CampoDeFase =
  | "intro"
  | "triggerQuestion"
  | "explanation"
  | "investigation"
  | "construction"
  | "test"
  | "debug"
  | "sharing";

const FASES: Array<{ titulo: string; campo: CampoDeFase }> = [
  { titulo: "1. Abertura", campo: "intro" },
  { titulo: "2. Pergunta disparadora", campo: "triggerQuestion" },
  { titulo: "3. Explicação", campo: "explanation" },
  { titulo: "4. Investigação", campo: "investigation" },
  { titulo: "5. Construção", campo: "construction" },
  { titulo: "6. Teste", campo: "test" },
  { titulo: "7. Depuração", campo: "debug" },
  { titulo: "8. Compartilhamento", campo: "sharing" },
];

export default function PlanoPage({ params }: { params: { id: string } }) {
  const plano = planoPorId(params.id);
  if (!plano) notFound();

  const primeiroAno = plano.ageBands[0].split("-")[0];
  const ultimoAno = plano.ageBands[plano.ageBands.length - 1].split("-")[1];
  const anos =
    primeiroAno === ultimoAno ? `${primeiroAno}º ano` : `do ${primeiroAno}º ao ${ultimoAno}º ano`;

  return (
    <article className="mx-auto max-w-[1400px] px-5 py-12">
      <header>
        <span className="label-mono text-navy/65">Plano de aula · {plano.theme}</span>
        <h1 className="mt-3 max-w-[24ch] font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.0] tracking-display">
          {plano.title}
        </h1>
        <p className="mt-4 max-w-[62ch] font-sans text-[15px] leading-relaxed text-navy/80">
          {plano.objective}
        </p>
        <p className="mt-4 font-sans text-[13px] leading-relaxed text-navy/70">
          <strong className="font-bold text-navy">{plano.duration} minutos</strong> · {anos} ·{" "}
          {NOMES_DAS_TURMAS[plano.classSize]} · {NOMES_DOS_NIVEIS_DE_PLANO[plano.level]}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3 no-print">
          <BotaoImprimir />
          <BotaoFavorito kind="plano" id={plano.id} />
          <Button href="/planejar" variant="secondary">
            Ver outros planos
          </Button>
        </div>
      </header>

      <section className="mt-12 max-w-[820px]">
        <h2 className="label-mono text-navy/65">Antes da aula</h2>
        <ul className="mt-3 grid gap-2.5">
          {plano.preparation.map((item) => (
            <li
              key={item}
              className="border-l-2 border-amber pl-3 font-sans text-[14px] leading-relaxed text-navy/80"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-[820px]">
        <h2 className="label-mono text-navy/65">Roteiro da aula</h2>
        <ol className="mt-4 grid gap-6">
          {FASES.map((fase) => (
            <li key={fase.titulo}>
              <h3 className="font-display text-[16px] font-extrabold tracking-display">
                {fase.titulo}
              </h3>
              <p className="mt-1 max-w-[62ch] font-sans text-[14px] leading-relaxed text-navy/80">
                {plano[fase.campo]}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-12 max-w-[820px]">
        <h2 className="label-mono text-navy/65">Como avaliar</h2>
        <ul className="mt-3 grid gap-2.5">
          {plano.assessment.map((item) => (
            <li
              key={item}
              className="border-l-2 border-cyan pl-3 font-sans text-[14px] leading-relaxed text-navy/80"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-[820px] no-print">
        <h2 className="label-mono text-navy/65">Depois desta aula</h2>
        <ul className="mt-3 grid gap-2">
          {[plano.continuity, ...plano.relatedContent].map((ref) => (
            <li key={ref.href + ref.label}>
              <Link
                href={ref.href}
                className="font-sans text-[14px] leading-relaxed text-navy underline"
              >
                {ref.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
