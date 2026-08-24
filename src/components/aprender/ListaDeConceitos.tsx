"use client";

import { useMemo, useState } from "react";
import { Check, Clock3, LockKeyhole, ArrowRight } from "lucide-react";
import { CardLink } from "@/components/ui/Card";
import { useHydrated, useJourney } from "@/lib/useProgress";
import { CONCEPTS, type Concept } from "@/data/concepts";
import { CONCEPT_ICONS, CORES_DE_FUNDO } from "@/lib/conceptIcons";

type Filtro = "todos" | "concluidos" | "nao-iniciados";

const ABAS: Array<{ valor: Filtro; rotulo: string }> = [
  { valor: "todos", rotulo: "Todos" },
  { valor: "nao-iniciados", rotulo: "Não iniciados" },
  { valor: "concluidos", rotulo: "Concluídos" },
];

/**
 * Os filtros do mockup eram por categoria (Fundamentos/Estratégias/
 * Aplicação), mas os 11 conceitos não têm esse campo no modelo de dados —
 * inventar uma categoria por conceito seria dado fabricado. Em vez disso,
 * filtra pelo que já é real: o estado de conclusão salvo em localStorage.
 */
export function ListaDeConceitos() {
  const hidratado = useHydrated();
  const { stages, isDone } = useJourney();
  const [filtro, setFiltro] = useState<Filtro>("todos");

  const etapa = stages.find((e) => e.id === "aprender");
  const primeiroNaoFeito = hidratado ? CONCEPTS.find((c) => !isDone(`aprender:${c.id}`)) : null;
  const algumFeito = hidratado && (etapa?.done ?? 0) > 0;

  const visiveis = useMemo(() => {
    if (!hidratado || filtro === "todos") return CONCEPTS;
    return CONCEPTS.filter((c) =>
      filtro === "concluidos" ? isDone(`aprender:${c.id}`) : !isDone(`aprender:${c.id}`),
    );
  }, [filtro, hidratado, isDone]);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_265px]">
        <div>
          {primeiroNaoFeito ? (
            <CardLink
              href={`/aprender/${primeiroNaoFeito.id}`}
              faixa
              realce="cyan"
              className="mb-5 overflow-hidden border-cyan/25 bg-gradient-to-r from-[#eefaff] to-white sm:flex-row sm:items-center sm:gap-5"
            >
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[22px] bg-cyan/10 text-cyan shadow-inner">
                {(() => { const I = CONCEPT_ICONS[primeiroNaoFeito.id]?.icon; return I ? <I size={42}/> : null; })()}
              </span>
              <span className="min-w-0 flex-1">
              <span className="label-mono text-cyan">
                {algumFeito ? "Continue de onde parou" : "Comece por aqui"}
              </span>
              <span className="mt-2 block font-display text-[20px] font-extrabold leading-tight tracking-display">
                {String(primeiroNaoFeito.order).padStart(2,"0")} · {primeiroNaoFeito.title}
              </span>
              <span className="mt-2 block text-[12px] text-navy/60">Entenda o conceito e leve uma aplicação pronta para a sala.</span>
              </span>
              <span className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-cyan px-5 text-[12px] font-bold text-white">Continuar <ArrowRight size={15}/></span>
            </CardLink>
          ) : null}

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar conceitos">
            {ABAS.map((aba) => (
              <button
                key={aba.valor}
                type="button"
                role="tab"
                aria-selected={filtro === aba.valor}
                onClick={() => setFiltro(aba.valor)}
                className={[
                  "min-h-[38px] rounded-pill px-4 font-sans text-[12.5px] font-semibold transition-colors",
                  filtro === aba.valor
                    ? "bg-navy text-cream-hi"
                    : "border border-navy/15 bg-cream-hi text-navy/70 hover:bg-navy/5",
                ].join(" ")}
              >
                {aba.rotulo}
              </button>
            ))}
          </div>

          <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visiveis.map((conceito) => (
              <li key={conceito.id} className="grid">
                <ConceitoCard conceito={conceito} feito={hidratado && isDone(`aprender:${conceito.id}`)} />
              </li>
            ))}
          </ol>

          {visiveis.length === 0 ? (
            <p className="mt-6 font-sans text-[14px] text-navy/65">
              Nenhum conceito nesse filtro ainda.
            </p>
          ) : null}
        </div>

        <aside className="hidden h-fit rounded-card border border-navy/8 bg-cream-hi p-5 shadow-card lg:sticky lg:top-24 lg:block">
          <p className="font-display text-[18px] font-extrabold">Seu progresso</p>
          <div className="mx-auto mt-5 flex h-28 w-28 items-center justify-center rounded-full border-[11px] border-navy/5 shadow-inner">
          <p className="font-display text-[30px] font-extrabold leading-none tracking-display">
            {hidratado ? (etapa?.percent ?? 0) : 0}%
          </p>
          </div>
          <p className="mt-1 font-sans text-[13px] text-navy/65">
            {hidratado ? etapa?.done ?? 0 : 0} de {CONCEPTS.length} conceitos
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-pill bg-navy/10">
            <div
              className="h-full rounded-pill bg-cyan transition-[width] duration-300"
              style={{ width: `${hidratado ? etapa?.percent ?? 0 : 0}%` }}
            />
          </div>

          <p className="mt-6 font-sans text-[12.5px] leading-relaxed text-navy/60">
            Cada conceito tem um roteiro de cerca de três minutos para explicar à turma — dá para
            ler um por dia, sem pressa.
          </p>
        </aside>
      </div>
    </section>
  );
}

function ConceitoCard({ conceito, feito }: { conceito: Concept; feito: boolean }) {
  const visual = CONCEPT_ICONS[conceito.id];
  const Icone = visual?.icon;
  return (
    <CardLink href={`/aprender/${conceito.id}`} className="min-h-[138px] p-4" faixa>
      <div className="flex items-start gap-3">
        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${visual ? CORES_DE_FUNDO[visual.cor] : "bg-navy/5"}`}>
          {Icone ? <Icone size={23}/> : null}
        </span>
        <span className="min-w-0 flex-1"><span className="block font-display text-[15px] font-extrabold leading-none tracking-display text-cyan">
          {String(conceito.order).padStart(2, "0")}
        </span><span className="mt-1 block font-display text-[15px] font-extrabold leading-tight tracking-display group-hover:underline">{conceito.title}</span></span>
        {feito ? (
          <span
            aria-label="Concluído"
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green text-cream-hi"
          >
            <Check size={13} strokeWidth={3} aria-hidden />
          </span>
        ) : null}
      </div>
      <span className="mt-3 block font-sans text-[11.5px] leading-snug text-navy/65">
        {conceito.willLearn}
      </span>
      <span className="mt-auto flex items-center justify-between pt-3 text-[10.5px] text-navy/50"><span className="flex items-center gap-1"><Clock3 size={12}/> 3 min</span>{feito ? <span className="text-green">Concluído</span> : <LockKeyhole size={13}/>}</span>
    </CardLink>
  );
}
