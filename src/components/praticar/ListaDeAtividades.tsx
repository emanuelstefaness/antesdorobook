"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { CardLink } from "@/components/ui/Card";
import { ACTIVITIES, NOMES_DOS_NIVEIS, atividadesDoNivel } from "@/data/activities";
import type { AgeBand, Material } from "@/data/types";

const ANOS: Array<{ valor: AgeBand | "qualquer"; rotulo: string }> = [
  { valor: "qualquer", rotulo: "Qualquer ano" },
  { valor: "2-3", rotulo: "2º e 3º" },
  { valor: "4-5", rotulo: "4º e 5º" },
  { valor: "6-7", rotulo: "6º e 7º" },
  { valor: "8-9", rotulo: "8º e 9º" },
];

type Recurso = "qualquer" | "sem-computador" | "tabuleiro" | "microbit";

const RECURSOS: Array<{ valor: Recurso; rotulo: string }> = [
  { valor: "qualquer", rotulo: "Qualquer material" },
  { valor: "sem-computador", rotulo: "Sem computador" },
  { valor: "tabuleiro", rotulo: "Com tabuleiro" },
  { valor: "microbit", rotulo: "Com micro:bit" },
];

const O_QUE_O_NIVEL_DESENVOLVE: Record<1 | 2 | 3 | 4, string> = {
  1: "Colocar passos na ordem certa e perceber que trocar a ordem troca o resultado.",
  2: "Escrever instruções que outra pessoa consegue executar sem completar nada.",
  3: "Enxergar o que se repete e resolver com menos instruções.",
  4: "Encontrar o defeito antes de consertar — e distinguir os tipos de defeito.",
};

function temMaterial(materiais: Material[], m: Material) {
  return materiais.includes(m);
}

export function ListaDeAtividades() {
  const [ano, setAno] = useState<AgeBand | "qualquer">("qualquer");
  const [recurso, setRecurso] = useState<Recurso>("qualquer");

  const passaNoFiltro = useMemo(
    () => (a: (typeof ACTIVITIES)[number]) => {
      if (ano !== "qualquer" && !a.ageBands.includes(ano)) return false;
      if (recurso === "sem-computador" && temMaterial(a.materials, "computador")) return false;
      if (recurso === "tabuleiro" && !temMaterial(a.materials, "tabuleiro")) return false;
      if (recurso === "microbit" && !temMaterial(a.materials, "microbit")) return false;
      return true;
    },
    [ano, recurso],
  );

  const niveis = ([1, 2, 3, 4] as const).map((nivel) => ({
    nivel,
    atividades: atividadesDoNivel(nivel).filter(passaNoFiltro),
  }));

  const totalVisivel = niveis.reduce((soma, n) => soma + n.atividades.length, 0);

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-8 md:px-8">
      <div className="rounded-card border border-navy/8 bg-white p-4 shadow-card"><div className="flex flex-wrap gap-2">
        <select
          value={ano}
          onChange={(e) => setAno(e.target.value as AgeBand | "qualquer")}
          className="min-h-[42px] rounded-pill border border-navy/15 bg-cream-hi px-4 font-sans text-[13px] text-navy"
        >
          {ANOS.map((a) => (
            <option key={a.valor} value={a.valor}>
              {a.rotulo}
            </option>
          ))}
        </select>
        <select
          value={recurso}
          onChange={(e) => setRecurso(e.target.value as Recurso)}
          className="min-h-[42px] rounded-pill border border-navy/15 bg-cream-hi px-4 font-sans text-[13px] text-navy"
        >
          {RECURSOS.map((r) => (
            <option key={r.valor} value={r.valor}>
              {r.rotulo}
            </option>
          ))}
        </select>
      </div></div>

      <p aria-live="polite" className="mt-4 label-mono text-navy/50">
        {totalVisivel === 1 ? "1 atividade" : `${totalVisivel} de ${ACTIVITIES.length} atividades`}
      </p>

      {niveis.map(({ nivel, atividades }) =>
        atividades.length === 0 ? null : (
          <div key={nivel} className="mb-10 mt-8 last:mb-0">
            <h2 className="font-display text-[clamp(1.3rem,2.6vw,1.8rem)] leading-tight tracking-display">
              Nível {nivel} — {NOMES_DOS_NIVEIS[nivel]}
            </h2>
            <p className="mt-2 max-w-[54ch] font-sans text-[13.5px] leading-relaxed text-navy/70">
              {O_QUE_O_NIVEL_DESENVOLVE[nivel]}
            </p>

            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {atividades.map((atividade) => (
                <li key={atividade.id} className="grid">
                  <CardLink href={`/praticar/${atividade.id}`} className="p-0">
                    <span className="relative block aspect-[16/7] overflow-hidden bg-navy/5"><Image unoptimized fill src={atividade.id === "algoritmo-do-sanduiche" ? "/assets/antes-do-robo/atividade-algoritmo-sanduiche.png" : `/imagens/praticar/${atividade.id}.jpg`} alt="" className="object-cover transition duration-500 group-hover:scale-105"/></span>
                    <span className="flex flex-1 flex-col p-4"><span className="label-mono inline-flex w-fit rounded-pill bg-navy px-2.5 py-1 text-cream-hi">
                      {atividade.duration} min
                    </span>
                    <span className="mt-3 block font-display text-[18px] font-extrabold leading-tight tracking-display group-hover:underline">
                      {atividade.title}
                    </span>
                    <span className="mt-2 block font-sans text-[13px] leading-snug text-navy/70">
                      {atividade.summary}
                    </span>
                    </span>
                  </CardLink>
                </li>
              ))}
            </ul>
          </div>
        ),
      )}

      {totalVisivel === 0 ? (
        <p className="mt-10 font-sans text-[14px] text-navy/65">
          Nenhuma atividade com esses filtros. Tire o filtro de material primeiro.
        </p>
      ) : null}
    </section>
  );
}
