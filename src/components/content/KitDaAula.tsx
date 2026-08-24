"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BotaoFavorito } from "@/components/support/BotaoFavorito";
import { BotaoImprimir } from "@/components/planner/BotaoImprimir";
import { useHydrated, useJourney } from "@/lib/useProgress";
import type { Activity } from "@/data/activities";

const NOMES_DE_MATERIAL: Record<Activity["materials"][number], string> = {
  nenhum: "nenhum material",
  "papel-e-lapis": "papel e lápis",
  cartoes: "cartões",
  "fita-crepe": "fita-crepe",
  tabuleiro: "tabuleiro",
  microbit: "micro:bit",
  computador: "computador",
  reciclaveis: "recicláveis",
};

/**
 * A lista de materiais não precisa nem admite checklist quando a atividade
 * não usa nenhum. As marcações não são salvas entre visitas — persistir
 * "já separei os cartões" exigiria uma chave nova em storage.ts, e o ganho
 * (lembrar isso amanhã) não compensa a complexidade para uma marcação que só
 * importa nos minutos antes da aula de hoje.
 */
function ChecklistDeMateriais({ atividade }: { atividade: Activity }) {
  const [marcados, setMarcados] = useState<Set<string>>(new Set());
  const soNaoPrecisa = atividade.materials.length === 1 && atividade.materials[0] === "nenhum";

  if (soNaoPrecisa) {
    return (
      <p className="font-sans text-[13px] leading-relaxed text-navy/65">
        Não precisa de nenhum material.
      </p>
    );
  }

  return (
    <ul className="grid gap-2">
      {atividade.materials.map((m) => {
        const marcado = marcados.has(m);
        return (
          <li key={m}>
            <button
              type="button"
              onClick={() =>
                setMarcados((atual) => {
                  const proximo = new Set(atual);
                  if (proximo.has(m)) proximo.delete(m);
                  else proximo.add(m);
                  return proximo;
                })
              }
              aria-pressed={marcado}
              className="flex min-h-[36px] w-full items-center gap-2.5 rounded-card-sm text-left font-sans text-[13.5px] text-navy hover:bg-navy/5"
            >
              <span
                aria-hidden
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border-2 ${
                  marcado ? "border-cyan bg-cyan" : "border-navy/25"
                }`}
              >
                {marcado ? <Check size={12} strokeWidth={3} className="text-navy" aria-hidden /> : null}
              </span>
              <span className={marcado ? "text-navy/50 line-through" : ""}>
                {NOMES_DE_MATERIAL[m]}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function KitDaAula({ atividade }: { atividade: Activity }) {
  const hidratado = useHydrated();
  const { isDone } = useJourney();
  const concluida = hidratado && isDone(`praticar:${atividade.id}`);

  return (
    <aside className="grid h-fit gap-3 lg:sticky lg:top-24 lg:self-start">
      <Card faixa realce="cyan">
        <p className="label-mono mb-3 text-navy/50">Kit da aula</p>
        <ChecklistDeMateriais atividade={atividade} />
      </Card>

      {concluida ? (
        <Card className="bg-green/10">
          <div className="flex items-center gap-2">
            <Check size={16} className="shrink-0 text-green" aria-hidden />
            <span className="font-sans text-[13px] font-semibold text-navy">
              Você já concluiu esta atividade
            </span>
          </div>
        </Card>
      ) : null}

      <Card className="p-3.5 sm:p-4">
        <div className="grid gap-2">
          <BotaoFavorito kind="atividade" id={atividade.id} />
          <BotaoImprimir rotulo="Imprimir esta atividade" />
        </div>
      </Card>

      <Card className="p-3.5 sm:p-4">
        <p className="label-mono mb-3 text-navy/50">Continuar depois</p>
        <div className="grid gap-2">
          <Button href={atividade.continuity.href} className="w-full">
            {atividade.continuity.label}
          </Button>
          <Button href={atividade.relatedConcept.href} variant="secondary" className="w-full">
            Conceito: {atividade.relatedConcept.label}
          </Button>
        </div>
      </Card>
    </aside>
  );
}
