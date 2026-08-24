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

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const plan = planoPorId(id);
  if (!plan) return { title: `Plano não encontrado — ${BRAND.name}` };
  return { title: `${plan.title} — ${BRAND.name}`, description: plan.objective };
}

export default async function LessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const plan = planoPorId(id);
  if (!plan) notFound();
  const guide = guiaTecnicoPorPlano(plan.id);

  return <AulaCompletaGuiada plan={plan} guide={guide} path={recommendedNeighbors(plan.id)} total={RECOMMENDED_LESSON_PATH.length}/>;
}
