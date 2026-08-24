import { ArrowRight, ListFilter, Route, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { CardLink } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { LESSON_PLANS } from "@/data/lessonPlans";
import { RECOMMENDED_LESSON_PATH } from "@/data/lessonPath";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("planejar", "Escolha entre seguir uma sequência pedagógica do básico ao avançado ou encontrar uma aula completa usando filtros.");

export default function AulasPage() {
  return <>
    <PageHeader stageId="planejar"><p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-navy/70">Aqui existe uma decisão simples: siga a ordem recomendada se estiver construindo uma sequência com a turma, ou use os filtros se já sabe o que precisa aplicar.</p></PageHeader>
    <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-8">
      <div className="rounded-card border border-cyan/20 bg-cyan/8 p-5"><div className="flex gap-4"><ShieldCheck className="mt-1 shrink-0 text-cyan"/><div><h2 className="text-[19px]">Ainda não se sente preparado?</h2><p className="mt-2 text-[13px] leading-relaxed text-navy/68">Faça primeiro a preparação do professor. Cada aula também mostra os pré-requisitos e leva diretamente para a página que ensina cada um.</p><Link href="/preparar" className="mt-3 inline-flex text-[12px] font-bold text-navy underline">Começar a preparação →</Link></div></div></div>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <CardLink href="/aulas/caminho" faixa realce="purple" className="min-h-[290px] p-6"><Route className="text-purple"/><p className="mt-5 label-mono text-purple">Opção 1</p><h2 className="mt-2 text-[26px]">Seguir o caminho recomendado</h2><p className="mt-3 text-[13.5px] leading-relaxed text-navy/68">Todas as {RECOMMENDED_LESSON_PATH.length} aulas organizadas em seis etapas, do pensamento computacional aos projetos integradores.</p><span className="mt-auto flex items-center gap-2 pt-6 text-[12px] font-bold">Começar pela ordem <ArrowRight size={14}/></span></CardLink>
        <CardLink href="/planejar" faixa realce="cyan" className="min-h-[290px] p-6"><ListFilter className="text-cyan"/><p className="mt-5 label-mono text-cyan">Opção 2</p><h2 className="mt-2 text-[26px]">Encontrar uma aula por filtros</h2><p className="mt-3 text-[13.5px] leading-relaxed text-navy/68">Consulte as {LESSON_PLANS.length} aulas por ano, duração, nível, recursos, conceito e necessidade de micro:bit.</p><span className="mt-auto flex items-center gap-2 pt-6 text-[12px] font-bold">Abrir catálogo completo <ArrowRight size={14}/></span></CardLink>
      </div>
    </section>
  </>;
}
