"use client";

import { useCallback, useMemo, useState } from "react";
import { CommandRunner } from "@/components/engines/CommandRunner";
import { ChallengeEditor } from "./ChallengeEditor";
import { Chip } from "@/components/ui/Chip";
import { SidePanel } from "@/components/ui/SidePanel";
import { BOARD_CHALLENGES } from "@/data/boardChallenges";
import { useHydrated, useJourney } from "@/lib/useProgress";

export function ChallengeRunner() {
  const [indice, setIndice] = useState(0);
  const [dicaAberta, setDicaAberta] = useState(false);
  const [salaAberta, setSalaAberta] = useState(false);
  const { markDone, isDone } = useJourney();
  const hydrated = useHydrated();

  const desafio = BOARD_CHALLENGES[indice];
  const editor = desafio.id === "crie-seu-desafio";

  const aoVencer = useCallback(() => {
    markDone(`tabuleiro:${desafio.id}`);
  }, [markDone, desafio.id]);

  const concluidos = useMemo(
    () => BOARD_CHALLENGES.filter((d) => isDone(`tabuleiro:${d.id}`)).length,
    [isDone],
  );

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="label-mono text-navy/65">Desafios progressivos</span>
          <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-navy/70">
            Comece pelo primeiro, mas entre em qualquer um: nada aqui fica trancado.
          </p>
        </div>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-navy/65">
          {hydrated ? `${concluidos} de ${BOARD_CHALLENGES.length} vencidos` : "Carregando seu progresso…"}
        </p>
      </div>

      {/* Ficam nativos de propósito: são abas de navegação (aria-current +
          numeração + selo de concluído), não uma ação nem um controle que
          abre painel — nem Button (pílula uppercase em maiúsculas) nem Chip
          (seta "↗" de "abre em outro lugar") descrevem essa função. */}
      <ol className="mt-5 flex flex-wrap gap-2">
        {BOARD_CHALLENGES.map((d, i) => {
          const vencido = hydrated && isDone(`tabuleiro:${d.id}`);
          const atual = i === indice;
          return (
            <li key={d.id}>
              <button
                type="button"
                onClick={() => setIndice(i)}
                aria-current={atual ? "step" : undefined}
                className={[
                  "inline-flex min-h-[44px] items-center gap-2 rounded-block border-2 px-3 font-sans text-[12px] font-semibold",
                  atual ? "border-navy bg-navy text-cream-hi" : "border-navy/20 bg-cream-hi text-navy",
                ].join(" ")}
              >
                <span className="font-mono text-[11px] font-bold">{d.order}</span>
                {d.title}
                {vencido ? (
                  <span className="text-green">
                    <span aria-hidden>✓</span>
                    <span className="sr-only"> vencido</span>
                  </span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 rounded-block border-2 border-navy/15 bg-cream-hi p-5">
        <h2 className="font-display text-[22px] font-extrabold tracking-display text-navy">
          {desafio.order}. {desafio.title}
        </h2>
        <p className="mt-2 max-w-[62ch] font-sans text-[13.5px] leading-relaxed text-navy/70">
          {desafio.brief}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Chip onClick={() => setDicaAberta(true)} ariaExpanded={dicaAberta} active={dicaAberta}>
            Ver uma dica
          </Chip>
          <Chip onClick={() => setSalaAberta(true)} ariaExpanded={salaAberta} active={salaAberta}>
            Levar para a sala
          </Chip>
        </div>
      </div>

      <div className="mt-8">
        {editor ? (
          <ChallengeEditor onVitoria={aoVencer} />
        ) : (
          <CommandRunner
            key={desafio.id}
            grid={desafio.grid}
            minimo={desafio.minCommands}
            permitidos={desafio.allowedCommands}
            onVitoria={aoVencer}
          />
        )}
      </div>

      <SidePanel open={dicaAberta} onClose={() => setDicaAberta(false)} title="Dica">
        <p className="font-sans text-[13.5px] leading-relaxed text-navy/70">{desafio.hint}</p>
      </SidePanel>

      <SidePanel open={salaAberta} onClose={() => setSalaAberta(false)} title="Levar para a sala">
        <p className="font-sans text-[13.5px] leading-relaxed text-navy/70">
          {desafio.classroomBridge}
        </p>
      </SidePanel>
    </section>
  );
}
