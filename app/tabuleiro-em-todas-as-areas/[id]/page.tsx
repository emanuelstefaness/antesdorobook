import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BoardCurriculumLesson } from "@/components/board-curriculum/BoardCurriculumLesson";
import { BOARD_ACROSS_CURRICULUM_ACTIVITIES, boardCurriculumActivityById } from "@/data/boardAcrossCurriculum";

export function generateStaticParams() {
  return BOARD_ACROSS_CURRICULUM_ACTIVITIES.map((activity) => ({ id: activity.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const activity = boardCurriculumActivityById(id);
  if (!activity) return { title: "Atividade não encontrada — Antes do Robô" };
  return { title: `${activity.title} — Antes do Robô`, description: activity.summary };
}

export default async function BoardCurriculumLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const activity = boardCurriculumActivityById(id);
  if (!activity) notFound();
  return <BoardCurriculumLesson activity={activity}/>;
}
