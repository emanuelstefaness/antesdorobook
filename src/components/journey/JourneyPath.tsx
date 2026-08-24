"use client";

import Link from "next/link";
import { BookOpen, Bot, Calendar, Check, ClipboardList, Cpu, Flag, FlaskConical, Grid3x3, Route, ShieldCheck } from "lucide-react";
import { useJourney } from "@/lib/useProgress";
import { CORE_STAGE_IDS, type StageId } from "@/lib/journey";

const ICONES: Record<StageId, typeof Flag> = {
  comecar: Flag,
  preparar: ShieldCheck,
  aprender: BookOpen,
  robotica: Bot,
  "aulas-microbit": ClipboardList,
  praticar: FlaskConical,
  tabuleiro: Grid3x3,
  microbit: Cpu,
  trilhas: Route,
  planejar: Calendar,
};

export function JourneyPath() {
  const { hydrated, stages, next } = useJourney();
  const etapasPrincipais = stages.filter((etapa) => CORE_STAGE_IDS.includes(etapa.id));

  return (
    <section className="journey-road h-fit rounded-card bg-cream-hi p-4 shadow-card md:px-5 md:py-4">
      <h2 className="font-display text-[17px] font-extrabold tracking-display">Siga esta ordem para chegar preparado à primeira aula</h2>
      <p className="mt-1 text-[11.5px] text-navy/58">O percurso principal vai até “Aulas com micro:bit”. As etapas seguintes ampliam as possibilidades.</p>
      <ol className="relative mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 xl:gap-2">
        {etapasPrincipais.map((etapa) => {
          const ehAtual = hydrated ? next?.id === etapa.id : false;
          const Icone = ICONES[etapa.id];
          return (
            <li key={etapa.id} className="relative text-center">
              <Link
                href={etapa.href}
                className="group relative z-[1] flex flex-col items-center rounded-[18px] px-1 transition hover:-translate-y-1"
              >
                <span className={`relative flex h-14 w-14 items-center justify-center rounded-full border bg-cream-hi text-navy shadow-card group-hover:border-cyan ${ehAtual ? "border-2 border-cyan" : "border-navy/10"}`}>
                  {etapa.complete ? <Check size={20}/> : <Icone size={20} />}
                  <span className="absolute -bottom-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-navy px-1 font-mono text-[9px] font-bold text-white">{etapa.order}</span>
                </span>
                <span className="mt-3.5 block font-display text-[12px] font-extrabold leading-tight tracking-display group-hover:text-cyan">{etapa.label}</span>
                <span className="mt-0.5 block font-sans text-[10px] leading-snug text-navy/55">{etapa.verb}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
