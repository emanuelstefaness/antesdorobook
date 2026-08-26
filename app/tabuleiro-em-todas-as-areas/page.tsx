import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Grid3x3, Layers3, Printer, Route } from "lucide-react";
import { BoardCurriculumCatalog } from "@/components/board-curriculum/BoardCurriculumCatalog";
import { BOARD_ACROSS_CURRICULUM_ACTIVITIES, BOARD_SUBJECTS } from "@/data/boardAcrossCurriculum";

export const metadata: Metadata = {
  title: "Tabuleiro em todas as áreas — Antes do Robô",
  description: `${BOARD_ACROSS_CURRICULUM_ACTIVITIES.length} atividades completas para aplicar o tabuleiro 6×6 em diferentes componentes curriculares do Ensino Fundamental.`,
};

export default function BoardAcrossCurriculumPage() {
  return <>
    <header className="creative-header relative overflow-hidden border-b border-navy/8 bg-cream-hi">
      <div aria-hidden className="absolute -right-24 -top-28 h-96 w-96 rounded-full bg-cyan/10 blur-3xl"/>
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-8 px-5 py-9 md:px-8 md:py-14 lg:grid-cols-[1.05fr_.95fr]">
        <div>
          <p className="label-mono text-cyan">Recursos para ensinar · nova categoria</p>
          <h1 className="mt-3 max-w-[19ch] font-display text-[clamp(2.2rem,5vw,4.35rem)] font-extrabold leading-[.98] tracking-display">O tabuleiro dentro de todas as áreas</h1>
          <p className="mt-5 max-w-[67ch] text-[15px] leading-relaxed text-navy/70">Português, Matemática, História, Geografia, Ciências e outras áreas transformadas em missões sequenciais. Escolha uma atividade, monte as cartas nas coordenadas indicadas e conduza a aula sem precisar inventar regras.</p>
          <div className="mt-6 flex flex-wrap gap-2"><span className="rounded-pill bg-navy px-3 py-2 text-[10.5px] font-bold text-white">{BOARD_ACROSS_CURRICULUM_ACTIVITIES.length} atividades completas</span><span className="rounded-pill bg-cyan/14 px-3 py-2 text-[10.5px] font-bold">{BOARD_SUBJECTS.length} áreas</span><span className="rounded-pill bg-amber/18 px-3 py-2 text-[10.5px] font-bold">2º ao 9º ano</span></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[{icon:Grid3x3,title:"Mapa 6×6",text:"Coordenadas e direção inicial exatas."},{icon:Layers3,title:"Cartas prontas",text:"Missão, conteúdo, pistas e obstáculos."},{icon:Route,title:"Comandos",text:"Sequência de referência conferida."},{icon:Printer,title:"Aplicação direta",text:"Roteiro, respostas e versão imprimível."}].map(({icon:Icon,title,text}) => <article key={title} className="rounded-card bg-white p-5 shadow-card"><Icon className="text-cyan"/><h2 className="mt-4 font-display text-[17px] font-extrabold">{title}</h2><p className="mt-2 text-[11.5px] leading-relaxed text-navy/58">{text}</p></article>)}
        </div>
      </div>
    </header>

    <section className="mx-auto max-w-[1400px] px-5 py-12 md:px-8 md:py-16">
      <div className="mb-10 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <article className="rounded-card bg-navy p-6 text-white shadow-card md:p-8"><p className="label-mono text-cyan">A lógica pedagógica</p><h2 className="mt-2 font-display text-[25px] font-extrabold">A resposta de uma etapa libera a próxima</h2><p className="mt-4 max-w-[70ch] text-[13.5px] leading-relaxed text-white/72">As cartas não ficam espalhadas apenas como decoração. Cada parada fornece uma informação necessária para a seguinte. O grupo precisa compreender o conteúdo, montar o algoritmo, executar, justificar e corrigir o primeiro erro encontrado.</p><div className="mt-5 flex flex-wrap items-center gap-2 text-[10px] font-bold"><span className="rounded-pill bg-white/10 px-3 py-2">MISSÃO</span><ArrowRight size={14} className="text-cyan"/><span className="rounded-pill bg-white/10 px-3 py-2">4 ETAPAS</span><ArrowRight size={14} className="text-cyan"/><span className="rounded-pill bg-white/10 px-3 py-2">DEPURAÇÃO</span><ArrowRight size={14} className="text-cyan"/><span className="rounded-pill bg-amber px-3 py-2 text-navy">PRODUTO FINAL</span></div></article>
        <article className="rounded-card border-2 border-cyan/20 bg-cyan/7 p-6 md:p-8"><BookOpenCheck className="text-cyan"/><h2 className="mt-4 font-display text-[21px] font-extrabold">Nunca usou o tabuleiro?</h2><p className="mt-3 text-[12.5px] leading-relaxed text-navy/65">Faça primeiro os desafios básicos para aprender como o robô vira, avança, pega a chave e abre o baú.</p><Link href="/tabuleiro" className="mt-5 inline-flex min-h-[40px] items-center gap-2 rounded-pill bg-navy px-4 text-[11px] font-bold text-white">Abrir simulador básico <ArrowRight size={14}/></Link></article>
      </div>
      <BoardCurriculumCatalog/>
    </section>
  </>;
}
