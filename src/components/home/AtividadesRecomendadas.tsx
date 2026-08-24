"use client";

import { ACTIVITIES, NOMES_DOS_NIVEIS } from "@/data/activities";
import { useHydrated, useJourney } from "@/lib/useProgress";
import { CardLink } from "@/components/ui/Card";
import Image from "next/image";
import sanduicheImage from "@/assets/generated/card-sanduiche.jpg?inline";
import tabuleiroImage from "@/assets/generated/card-sequencia.jpg?inline";
import microbitImage from "@/assets/generated/card-desenho.jpg?inline";

const IMAGENS = [
  sanduicheImage,
  tabuleiroImage,
  microbitImage,
];

/**
 * As três primeiras atividades que a professora ainda não concluiu — não uma
 * amostra aleatória fingindo ser "recomendação". Antes da hidratação não dá
 * para saber o que já foi feito, então a seção não renderiza nada (melhor
 * que mostrar uma lista que pode estar errada por meio segundo).
 */
export function AtividadesRecomendadas() {
  const hidratado = useHydrated();
  const { isDone } = useJourney();

  if (!hidratado) return null;

  const pendentes = ACTIVITIES.filter((a) => !isDone(`praticar:${a.id}`)).slice(0, 3);
  if (pendentes.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1480px] px-4 py-10 md:px-7">
      <span className="label-mono text-coral">Prontas para aplicar</span>
      <h2 className="mt-2 font-display text-[clamp(1.7rem,3vw,2.5rem)] font-extrabold tracking-display">Atividades que funcionam amanhã</h2>
      <p className="mt-1 font-sans text-[13.5px] text-navy/65">
        As próximas na fila, ainda não concluídas.
      </p>

      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pendentes.map((a, index) => (
          <li key={a.id}>
            <CardLink href={`/praticar/${a.id}`} className="p-0" realce="cyan">
              <span className="relative block aspect-[16/10] overflow-hidden bg-cyan/10">
                <Image unoptimized src={IMAGENS[index]} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              </span>
              <span className="flex flex-1 flex-col p-5">
              <span className="label-mono inline-flex w-fit rounded-pill bg-navy px-2.5 py-1 text-cream-hi">
                {NOMES_DOS_NIVEIS[a.level]}
              </span>
              <span className="mt-3 block font-display text-[16px] font-extrabold leading-tight tracking-display group-hover:underline">
                {a.title}
              </span>
              <span className="mt-2 block font-sans text-[13px] leading-snug text-navy/70">
                {a.summary}
              </span>
              <span className="mt-3 block font-mono text-[11px] font-bold uppercase tracking-label text-navy/50">
                {a.duration} min
              </span>
              </span>
            </CardLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
