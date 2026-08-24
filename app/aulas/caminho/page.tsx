import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CapaDaAula } from "@/components/planner/CapaDaAula";
import { LESSON_PATH_STAGES, RECOMMENDED_LESSON_PATH } from "@/data/lessonPath";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("planejar", "Caminho recomendado com todas as aulas em ordem pedagógica, do pensamento computacional aos projetos integradores.");

export default function LessonPathPage() {
  return <article className="mx-auto max-w-[1300px] px-5 py-12 md:px-8">
    <header><p className="label-mono text-purple">Caminho recomendado</p><h1 className="mt-3 max-w-[22ch] font-display text-[clamp(2.2rem,5vw,4rem)] leading-none tracking-display">Do primeiro algoritmo ao projeto completo</h1><p className="mt-4 max-w-[70ch] text-[15px] leading-relaxed text-navy/70">Siga as {RECOMMENDED_LESSON_PATH.length} aulas na ordem. Cada uma informa o que o professor e os alunos precisam saber e leva aos pré-requisitos antes da aplicação.</p></header>
    <ol className="mt-12 grid gap-12">{LESSON_PATH_STAGES.map((stage) => <li key={stage.id} id={stage.id}><div className="grid gap-4 lg:grid-cols-[280px_1fr]"><div><span className="label-mono text-cyan">Etapa {stage.order} de {LESSON_PATH_STAGES.length}</span><h2 className="mt-2 text-[26px]">{stage.title}</h2><p className="mt-2 text-[13px] leading-relaxed text-navy/65">{stage.promise}</p><p className="mt-3 text-[11px] font-bold text-navy/50">{stage.lessons.length} aulas</p></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{stage.lessons.map((lesson) => { const position = RECOMMENDED_LESSON_PATH.findIndex((item) => item.id === lesson.id) + 1; return <Card key={lesson.id} className="group flex flex-col p-0"><CapaDaAula lesson={lesson}/><div className="flex flex-1 flex-col p-4"><div className="flex items-center justify-between gap-2"><span className="label-mono text-cyan">Aula {String(position).padStart(3, "0")}</span><span className="flex items-center gap-1 text-[10px] text-navy/50"><Clock3 size={11}/>{lesson.duration} min</span></div><h3 className="mt-3 text-[16px] leading-tight">{lesson.title}</h3><p className="mt-2 line-clamp-3 text-[11.5px] leading-relaxed text-navy/62">{lesson.objective}</p><Link href={`/planejar/${lesson.id}`} className="mt-auto flex items-center gap-1.5 pt-4 text-[11px] font-bold text-navy">Abrir aula completa <ArrowRight size={13}/></Link></div></Card>; })}</div></div></li>)}</ol>
  </article>;
}
