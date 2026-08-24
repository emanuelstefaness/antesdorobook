"use client";

import { useState } from "react";
import { CommandRunner } from "@/components/engines/CommandRunner";
import { Button } from "@/components/ui/Button";
import { BOARD_CHALLENGES } from "@/data/boardChallenges";
import { mesmaPosicao } from "@/lib/board/simulate";
import type { GridSpec, Posicao } from "@/lib/board/types";

type Peca = "robo" | "chave" | "bau" | "obstaculo" | "apagar";

const PECAS: { id: Peca; rotulo: string; simbolo: string }[] = [
  { id: "robo", rotulo: "Robô", simbolo: "R" },
  { id: "chave", rotulo: "Chave", simbolo: "C" },
  { id: "bau", rotulo: "Baú", simbolo: "B" },
  { id: "obstaculo", rotulo: "Obstáculo", simbolo: "■" },
  { id: "apagar", rotulo: "Apagar", simbolo: "×" },
];

const INICIAL = BOARD_CHALLENGES.find((d) => d.id === "crie-seu-desafio")!.grid;

export function ChallengeEditor({ onVitoria }: { onVitoria?: () => void }) {
  const [grid, setGrid] = useState<GridSpec>(INICIAL);
  const [peca, setPeca] = useState<Peca>("obstaculo");
  const [jogando, setJogando] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  const colocar = (casa: Posicao) => {
    setGrid((g) => {
      const semObstaculo = g.obstaculos.filter((o) => !mesmaPosicao(o, casa));
      const semChaveAqui = g.chave && mesmaPosicao(g.chave, casa) ? null : g.chave;
      const semBauAqui = g.bau && mesmaPosicao(g.bau, casa) ? null : g.bau;

      if (peca === "apagar") {
        if (mesmaPosicao(g.robo, casa)) {
          setAviso(
            "O robô não pode ser apagado: todo percurso precisa de um ponto de partida. Escolha a peça Robô e clique em outra casa para movê-lo.",
          );
          return g;
        }
        setAviso(null);
        return { ...g, obstaculos: semObstaculo, chave: semChaveAqui, bau: semBauAqui };
      }

      if (peca === "robo") {
        // Mover o robô para a casa limpa o que estava nela: uma casa guarda
        // uma coisa só.
        setAviso(null);
        return { ...g, robo: casa, obstaculos: semObstaculo, chave: semChaveAqui, bau: semBauAqui };
      }

      // O robô sempre existe em algum lugar do tabuleiro — ao contrário de
      // chave/baú/obstáculo, não há como "esvaziar" a casa dele. Sem esta
      // guarda, colocar outra peça em cima do robô empilharia as duas ali: o
      // grid guardaria ambos, mas a grade só consegue desenhar (e o
      // aria-label só consegue anunciar) uma coisa por casa — a peça nova
      // ficaria escondida atrás do robô sem nenhum aviso.
      if (mesmaPosicao(g.robo, casa)) {
        setAviso(
          "O robô já está nesta casa. Mova o robô para outro lugar antes de colocar outra peça aqui.",
        );
        return g;
      }

      setAviso(null);
      const limpo: GridSpec = { ...g, obstaculos: semObstaculo, chave: semChaveAqui, bau: semBauAqui };

      if (peca === "chave") return { ...limpo, chave: casa };
      if (peca === "bau") return { ...limpo, bau: casa };
      return { ...limpo, obstaculos: [...limpo.obstaculos, casa] };
    });
  };

  const podeJogar = grid.bau !== null;

  if (jogando) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setJogando(false)} variant="secondary">
            Voltar a editar
          </Button>
          <p className="font-sans text-[13px] text-navy/70">
            Resolva o cenário que você criou. Se ficar impossível, volte e mude uma peça.
          </p>
        </div>
        <CommandRunner
          grid={grid}
          minimo={null}
          permitidos={["AVANCE", "VIRE_DIREITA", "VIRE_ESQUERDA", "REPITA_2X", "REPITA_3X", "REPITA_4X"]}
          onVitoria={onVitoria}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="label-mono text-navy/65">Peça na mão</h3>
        {/* Fica nativo de propósito: é um seletor de dois estados (selecionada
            = preenchimento navy, não selecionada = contorno fraco com
            bg-cream-hi), não uma ação momentânea. Nenhuma variante do Button
            cobre os dois estados ao mesmo tempo sem sobrescrever
            border-color/background-color já definidos pela variante — e o
            projeto não tem tailwind-merge para garantir que a sobrescrita
            vença de forma confiável. */}
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Peça a posicionar">
          {PECAS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPeca(p.id)}
              aria-pressed={peca === p.id}
              className={[
                "inline-flex min-h-[44px] items-center gap-2 rounded-block border-2 px-3 font-sans text-[12px] font-semibold",
                peca === p.id ? "border-navy bg-navy text-cream-hi" : "border-navy/20 bg-cream-hi text-navy",
              ].join(" ")}
            >
              <span aria-hidden>{p.simbolo}</span>
              {p.rotulo}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-block border-2 border-navy bg-cream-hi p-3">
        {/* As 36 casas ficam nativas de propósito: são células de um
            tabuleiro 6×6, não botões no sentido do design system.
            minmax(44px, …) mantém a casa em pelo menos 44px de toque mesmo em
            telas estreitas; se as seis não couberem lado a lado, o
            overflow-x-auto deixa rolar em vez de encolher abaixo do mínimo. */}
        <div className="overflow-x-auto">
          <div
            className="grid gap-1"
            style={{ gridTemplateColumns: "repeat(6, minmax(44px, 1fr))" }}
          >
            {Array.from({ length: 36 }, (_, i) => {
              const casa = { linha: Math.floor(i / 6), coluna: i % 6 };
              const temRobo = mesmaPosicao(grid.robo, casa);
              const temChave = grid.chave && mesmaPosicao(grid.chave, casa);
              const temBau = grid.bau && mesmaPosicao(grid.bau, casa);
              const temObstaculo = grid.obstaculos.some((o) => mesmaPosicao(o, casa));
              const conteudo = temRobo
                ? "Robô"
                : temChave
                  ? "Chave"
                  : temBau
                    ? "Baú"
                    : temObstaculo
                      ? "Obstáculo"
                      : "vazia";

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => colocar(casa)}
                  aria-label={`Linha ${casa.linha + 1}, coluna ${casa.coluna + 1}: ${conteudo}`}
                  className="relative aspect-square min-h-11 min-w-11 rounded-[2px] bg-navy/[0.06] font-mono text-[15px] font-bold text-navy transition-colors hover:bg-cyan/20"
                >
                  <span aria-hidden>
                    {temRobo ? "R" : temChave ? "C" : temBau ? "B" : temObstaculo ? "■" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div aria-live="polite">
        {aviso ? <p className="font-sans text-[13px] text-navy/70">{aviso}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={() => setJogando(true)} disabled={!podeJogar} variant="primary">
          Jogar meu desafio
        </Button>
        {!podeJogar ? (
          <p className="font-sans text-[13px] text-navy/70">
            Coloque pelo menos um baú: é ele que define onde o percurso termina.
          </p>
        ) : null}
      </div>
    </div>
  );
}
