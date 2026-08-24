import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AulaCompletaGuiada } from "@/components/planner/AulaCompletaGuiada";
import { BRAND } from "@/config/brand";
import { LESSON_PLANS, planoPorId } from "@/data/lessonPlans";
import { RECOMMENDED_LESSON_PATH, recommendedNeighbors } from "@/data/lessonPath";
import { guiaTecnicoPorPlano } from "@/data/microbitTechnicalGuides";

export function generateStaticParams() {
  return LESSON_PLANS.map((plan) => ({ id: plan.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const plan = planoPorId(params.id);
  if (!plan) return { title: `Plano não encontrado — ${BRAND.name}` };

  return {
    title: `${plan.title} — ${BRAND.name}`,
    description: plan.objective,
  };
}

export default function PlanoPage({ params }: { params: { id: string } }) {
  const plan = planoPorId(params.id);
  if (!plan) notFound();

  const neighbors = recommendedNeighbors(plan.id);
  const path = neighbors
    ? {
        previous: neighbors.previous
          ? { id: neighbors.previous.id, title: neighbors.previous.title }
          : null,
        next: neighbors.next ? { id: neighbors.next.id, title: neighbors.next.title } : null,
        position: neighbors.position,
      }
    : null;

  return (
    <AulaCompletaGuiada
      plan={plan}
      guide={guiaTecnicoPorPlano(plan.id)}
      path={path}
      total={RECOMMENDED_LESSON_PATH.length}
    />
  );
}
