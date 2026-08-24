"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock3, Layers3 } from "lucide-react";
import { useHydrated, useJourney } from "@/lib/useProgress";
import { TRAILS, assuntosDaTrilha } from "@/data/trails";

const VISUAIS = [
  "/assets/antes-do-robo/trilha-01-primeiros-comandos.png",
  "/assets/antes-do-robo/atividade-microbit-coracao-led.png",
  "/assets/antes-do-robo/trilha-03-logica-jogos.png",
  "/assets/antes-do-robo/conceito-problema-para-passos.png",
  "/assets/antes-do-robo/trilha-05-sensores-mundo-fisico.png",
  "/assets/antes-do-robo/kit-tabuleiro-completo.png",
];

const CORES = ["bg-cyan", "bg-coral", "bg-purple", "bg-amber", "bg-green", "bg-navy"];

function progresso(id: string, isDone: (id: string) => boolean) {
  const assuntos = assuntosDaTrilha(id);
  const feitos = assuntos.filter((a) => isDone(`trilhas:${a.id}`)).length;
  return { feitos, total: assuntos.length, percent: assuntos.length ? Math.round((feitos / assuntos.length) * 100) : 0 };
}

export function ListaDeTrilhas() {
  const hidratado = useHydrated();
  const { isDone } = useJourney();

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-7 md:px-8 md:py-9">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-pill bg-white px-3 py-1.5 text-[11.5px] shadow-sm">6 trilhas</span>
          <span className="rounded-pill bg-white px-3 py-1.5 text-[11.5px] shadow-sm">24 projetos guiados</span>
        </div>
        <p className="text-[12px] text-navy/55">Escolha uma trilha ou siga a ordem sugerida.</p>
      </div>

      <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {TRAILS.map((trilha, indice) => {
          const p = hidratado ? progresso(trilha.id, isDone) : { feitos: 0, total: assuntosDaTrilha(trilha.id).length, percent: 0 };
          return (
            <li key={trilha.id} className="grid">
              <article className="group relative flex min-h-0 flex-col overflow-hidden rounded-card bg-cream-hi shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-card-hover">
                <Link href={`/trilhas/${trilha.id}`} className="relative block aspect-[16/7] overflow-hidden bg-navy/5">
                  <Image unoptimized fill src={VISUAIS[indice]} alt="" className="object-cover transition duration-500 group-hover:scale-[1.04]" />
                  <span className={`absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full ${CORES[indice]} font-display text-[13px] font-extrabold text-white shadow-card`}>
                    {indice + 1}
                  </span>
                  <span className="absolute right-3 top-3 rounded-pill bg-cream-hi/92 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-label text-navy backdrop-blur">
                    {p.percent === 100 ? "Concluída" : p.percent > 0 ? `${p.percent}% concluída` : "Disponível"}
                  </span>
                </Link>

                <div className="flex flex-1 flex-col p-4">
                  <p className="label-mono text-navy/45">Trilha {String(trilha.order).padStart(2, "0")}</p>
                  <h2 className="mt-1.5 font-display text-[20px] font-extrabold leading-tight tracking-display">
                    <Link href={`/trilhas/${trilha.id}`} className="hover:underline">{trilha.title}</Link>
                  </h2>
                  <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-navy/68">{trilha.willLearn}</p>

                  <div className="mt-3 flex flex-wrap gap-3 border-t border-navy/8 pt-3 text-[10.5px] text-navy/52">
                    <span className="flex items-center gap-1"><Clock3 size={12} /> {Math.round(trilha.estimatedMinutes / 50)} aulas</span>
                    <span className="flex items-center gap-1"><Layers3 size={12} /> {p.total} assuntos</span>
                    {p.percent === 100 ? <span className="flex items-center gap-1 text-green"><Check size={12} /> Concluída</span> : null}
                  </div>

                  <div className="mt-3 h-1 overflow-hidden rounded-pill bg-navy/8">
                    <div className={`h-full rounded-pill ${CORES[indice]}`} style={{ width: `${p.percent}%` }} />
                  </div>

                  <Link href={`/trilhas/${trilha.id}`} className="mt-3 inline-flex items-center gap-1.5 self-start text-[11px] font-bold uppercase tracking-[.05em] text-navy">
                    {p.percent > 0 ? "Continuar" : "Explorar trilha"} <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
