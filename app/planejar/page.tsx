import { FiltroDePlanos } from "@/components/planner/FiltroDePlanos";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";
import { LESSON_PLANS } from "@/data/lessonPlans";

export const metadata = pageMetadata(
  "planejar",
  `${LESSON_PLANS.length} planos de aula prontos, filtráveis por ano, tempo disponível, recursos e conteúdo — com roteiro completo e versão para imprimir.`,
);

export default function PlanejarPage() {
  return (
    <>
      <PageHeader stageId="planejar">
        {/* Esta é a porta do professor com pressa: o botão laranja da home cai
            aqui. Por isso a página abre já com os filtros e a lista completa,
            sem etapa intermediária de explicação. */}
        <p className="mt-4 max-w-[56ch] font-sans text-[15px] leading-relaxed text-navy/70">
          {LESSON_PLANS.length} planos prontos, cada um com preparação, roteiro completo, avaliação e versão para
          imprimir. Diga o ano e o tempo que você tem, e a lista se ajusta. Se a aula é amanhã,
          comece por aqui.
        </p>
      </PageHeader>

      <section className="mx-auto max-w-[1400px] px-5 py-14">
        <FiltroDePlanos />
      </section>
    </>
  );
}
