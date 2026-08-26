"use client";

import { useMemo, useState } from "react";
import { BookOpenCheck, Filter, GraduationCap } from "lucide-react";
import { CardLink } from "@/components/ui/Card";
import { CurriculumBoardMap } from "./CurriculumBoardMap";
import {
  BOARD_ACROSS_CURRICULUM_ACTIVITIES,
  BOARD_CURRICULUM_COUNTS,
  BOARD_SUBJECTS,
  boardSubjectColor,
  type BoardSubject,
} from "@/data/boardAcrossCurriculum";

const YEARS = ["2º", "3º", "4º", "5º", "6º", "7º", "8º", "9º"];
const DIFFICULTIES = ["Inicial", "Intermediária", "Avançada"] as const;
const SUBJECT_SHORT: Record<BoardSubject, string> = {
  "Língua Portuguesa": "Português",
  Matemática: "Matemática",
  História: "História",
  Geografia: "Geografia",
  Ciências: "Ciências",
  "Língua Inglesa": "Inglês",
  Arte: "Arte",
  "Educação Física": "Ed. Física",
  Interdisciplinar: "Interdisciplinar",
};

export function BoardCurriculumCatalog() {
  const [subject, setSubject] = useState<BoardSubject | null>(null);
  const [year, setYear] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<(typeof DIFFICULTIES)[number] | null>(null);
  const activities = useMemo(() => BOARD_ACROSS_CURRICULUM_ACTIVITIES.filter((activity) => {
    if (subject && activity.subject !== subject) return false;
    if (year && !activity.gradeBands.includes(year)) return false;
    if (difficulty && activity.difficulty !== difficulty) return false;
    return true;
  }), [subject, year, difficulty]);

  const toggle = <T,>(value: T, current: T | null, setter: (next: T | null) => void) => setter(current === value ? null : value);

  return (
    <div>
      <section className="rounded-card bg-white p-5 shadow-card md:p-7">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card-sm bg-cyan/12 text-cyan"><Filter size={19}/></span>
          <div><p className="label-mono text-cyan">Encontre pelo conteúdo que você ensina</p><h2 className="mt-1 font-display text-[23px] font-extrabold">Escolha a área, o ano e o nível</h2></div>
        </div>
        <div className="mt-6 grid gap-6">
          <fieldset><legend className="label-mono text-navy/55">Componente curricular</legend><div className="mt-3 flex flex-wrap gap-2">
            {BOARD_SUBJECTS.map((item) => { const active = subject === item; const count = BOARD_CURRICULUM_COUNTS.find((entry) => entry.subject === item)?.count; return <button key={item} type="button" aria-pressed={active} onClick={() => toggle(item, subject, setSubject)} className={`min-h-[38px] rounded-pill px-3.5 text-[11.5px] font-bold transition ${active ? "bg-navy text-white" : "border border-navy/12 bg-cream-hi text-navy/70 hover:border-cyan"}`}>{SUBJECT_SHORT[item]} · {count}</button>; })}
          </div></fieldset>
          <div className="grid gap-5 md:grid-cols-2">
            <fieldset><legend className="label-mono text-navy/55">Ano escolar</legend><div className="mt-3 flex flex-wrap gap-2">{YEARS.map((item) => <button key={item} type="button" aria-pressed={year === item} onClick={() => toggle(item, year, setYear)} className={`min-h-[36px] rounded-pill px-3 text-[11px] font-bold ${year === item ? "bg-cyan text-navy" : "border border-navy/12 bg-cream-hi text-navy/65"}`}>{item} ano</button>)}</div></fieldset>
            <fieldset><legend className="label-mono text-navy/55">Complexidade</legend><div className="mt-3 flex flex-wrap gap-2">{DIFFICULTIES.map((item) => <button key={item} type="button" aria-pressed={difficulty === item} onClick={() => toggle(item, difficulty, setDifficulty)} className={`min-h-[36px] rounded-pill px-3 text-[11px] font-bold ${difficulty === item ? "bg-purple text-white" : "border border-navy/12 bg-cream-hi text-navy/65"}`}>{item}</button>)}</div></fieldset>
          </div>
        </div>
        {subject || year || difficulty ? <button type="button" onClick={() => { setSubject(null); setYear(null); setDifficulty(null); }} className="mt-5 text-[11px] font-bold text-navy underline">Limpar filtros</button> : null}
      </section>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
        <div><p className="label-mono text-navy/55">{activities.length} atividades encontradas</p><h2 className="mt-1 font-display text-[25px] font-extrabold">Prontas para montar no tabuleiro</h2></div>
        <p className="max-w-[45ch] text-[12px] leading-relaxed text-navy/60">Cada card abre mapa 6×6, cartas, respostas, roteiro de fala, sequência exata, erros e avaliação.</p>
      </div>

      {activities.length ? <ul className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{activities.map((activity) => (
        <li key={activity.id} className="grid">
          <CardLink href={`/tabuleiro-em-todas-as-areas/${activity.id}`} realce={boardSubjectColor(activity.subject) as "cyan" | "amber" | "purple" | "coral" | "green"} className="p-0">
            <div className="soft-grid grid min-h-[190px] place-items-center bg-navy/[.025] p-5"><CurriculumBoardMap activity={activity} compact/></div>
            <span className="flex flex-1 flex-col p-5">
              <span className="flex flex-wrap items-center gap-2"><span className="label-mono rounded-pill bg-navy px-2.5 py-1 text-white">{SUBJECT_SHORT[activity.subject]}</span><span className="text-[10.5px] font-bold text-navy/50">{activity.duration} min · {activity.difficulty}</span></span>
              <span className="mt-3 font-display text-[19px] font-extrabold leading-tight group-hover:underline">{activity.title}</span>
              <span className="mt-2 line-clamp-3 text-[12px] leading-relaxed text-navy/65">{activity.summary}</span>
              <span className="mt-4 flex items-center gap-2 text-[11px] font-bold text-cyan"><BookOpenCheck size={15}/> Abrir aplicação completa</span>
            </span>
          </CardLink>
        </li>
      ))}</ul> : <div className="mt-6 rounded-card bg-white p-8 text-center shadow-card"><GraduationCap className="mx-auto text-cyan"/><p className="mt-3 font-display text-[18px] font-bold">Nenhuma combinação encontrada</p><p className="mt-2 text-[12px] text-navy/60">Retire primeiro o filtro de ano para ampliar as possibilidades.</p></div>}
    </div>
  );
}
