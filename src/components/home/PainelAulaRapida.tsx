"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { LESSON_PLANS } from "@/data/lessonPlans";
import type { AgeBand, Duration } from "@/data/types";
import { Card } from "@/components/ui/Card";

const ANOS: Array<{ valor: AgeBand | "qualquer"; rotulo: string }> = [
  { valor: "qualquer", rotulo: "Qualquer ano" },
  { valor: "2-3", rotulo: "2º e 3º ano" },
  { valor: "4-5", rotulo: "4º e 5º ano" },
  { valor: "6-7", rotulo: "6º e 7º ano" },
  { valor: "8-9", rotulo: "8º e 9º ano" },
];

const TEMPOS: Array<{ valor: Duration | "qualquer"; rotulo: string }> = [
  { valor: "qualquer", rotulo: "Qualquer tempo" },
  ...([...new Set(LESSON_PLANS.map((p) => p.duration))].sort((a, b) => a - b) as Duration[]).map(
    (t) => ({ valor: t, rotulo: `${t} minutos` }),
  ),
];

/**
 * Versão compacta do filtro de /planejar, para a home: só os dois critérios
 * que mais separam um plano do outro (tempo e ano), com resultado real
 * aparecendo na hora — sem botão "gerar" fingindo processar algo que já foi
 * calculado no clique anterior.
 */
export function PainelAulaRapida() {
  const [tempo, setTempo] = useState<Duration | "qualquer">("qualquer");
  const [ano, setAno] = useState<AgeBand | "qualquer">("qualquer");

  const resultados = useMemo(
    () =>
      LESSON_PLANS.filter((p) => {
        if (tempo !== "qualquer" && p.duration !== tempo) return false;
        if (ano !== "qualquer" && !p.ageBands.includes(ano)) return false;
        return true;
      }).slice(0, 2),
    [tempo, ano],
  );

  return (
    <Card className="h-fit bg-navy p-5 text-cream-hi">
      <div className="flex items-center gap-2">
        <Sparkles size={18} className="text-amber" aria-hidden />
        <h2 className="font-display text-[17px] font-extrabold tracking-display">
          Preciso de uma aula agora
        </h2>
      </div>
      <p className="mt-1.5 font-sans text-[12px] leading-snug text-cream-hi/65">
        Diga o tempo e o ano — a lista muda na hora com planos reais do banco.
      </p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="block">
          <span className="sr-only">Tempo disponível</span>
          <select
            value={tempo}
            onChange={(e) => setTempo(e.target.value === "qualquer" ? "qualquer" : (Number(e.target.value) as Duration))}
            className="min-h-[40px] w-full rounded-card-sm border border-white/15 bg-white/10 px-3 font-sans text-[12px] text-cream-hi"
          >
            {TEMPOS.map((t) => (
              <option key={t.valor} value={t.valor}>
                {t.rotulo}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="sr-only">Turma</span>
          <select
            value={ano}
            onChange={(e) => setAno(e.target.value as AgeBand | "qualquer")}
            className="min-h-[40px] w-full rounded-card-sm border border-white/15 bg-white/10 px-3 font-sans text-[12px] text-cream-hi"
          >
            {ANOS.map((a) => (
              <option key={a.valor} value={a.valor}>
                {a.rotulo}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p aria-live="polite" className="mt-3 label-mono text-cyan">
        {resultados.length === 0
          ? "Nenhum plano com esses filtros"
          : `${resultados.length} de ${LESSON_PLANS.length} planos`}
      </p>

      <ul className="mt-1.5 flex flex-col gap-0.5">
        {resultados.map((p) => (
          <li key={p.id}>
            <Link
              href={`/planejar/${p.id}`}
              className="block rounded-card-sm px-2 py-1.5 font-sans text-[12.5px] font-semibold text-cream-hi hover:bg-white/10 hover:underline"
            >
              {p.title} <span className="font-normal text-cream-hi/50">· {p.duration} min</span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/planejar"
        className="mt-3 inline-flex min-h-[40px] items-center rounded-full bg-amber px-5 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.05em] text-navy transition hover:-translate-y-0.5"
      >
        Ver todos os planos
      </Link>
    </Card>
  );
}
