import { descreverTabuleiro } from "@/lib/board/describe";
import { mesmaPosicao } from "@/lib/board/simulate";
import type { EstadoRobo, GridSpec, Posicao } from "@/lib/board/types";

const GIRO: Record<EstadoRobo["direcao"], string> = {
  norte: "rotate(0deg)",
  leste: "rotate(90deg)",
  sul: "rotate(180deg)",
  oeste: "rotate(270deg)",
};

/**
 * O tabuleiro era desenhado com as fotos 3D recortadas do kit, sobre uma
 * textura de madeira. Não funcionava: os recortes carregam um retângulo de
 * fundo visível, e a foto de um robô real num grid de tela mistura dois mundos
 * que não combinam. Aqui tudo é forma geométrica — é um simulador digital, e
 * parecer um simulador digital é o que o deixa limpo.
 *
 * O robô é a única forma com direção, então é a única que gira; a seta dentro
 * dele é o que diz para onde ele está virado sem depender de texto.
 */
export function Board({
  grid,
  robo,
  rastro,
}: {
  grid: GridSpec;
  robo: EstadoRobo;
  rastro: Posicao[];
}) {
  const casas = Array.from({ length: grid.linhas * grid.colunas }, (_, i) => ({
    linha: Math.floor(i / grid.colunas),
    coluna: i % grid.colunas,
  }));

  return (
    <div
      className="mx-auto w-full max-w-[420px] rounded-block border-2 border-navy bg-cream-hi p-2"
      role="img"
      aria-label={descreverTabuleiro(grid, robo)}
    >
      <div
        className="grid gap-[2px]"
        style={{ gridTemplateColumns: `repeat(${grid.colunas}, minmax(0, 1fr))` }}
      >
        {casas.map((casa) => {
          const chave = grid.chave && mesmaPosicao(grid.chave, casa) && !robo.temChave;
          const bau = grid.bau && mesmaPosicao(grid.bau, casa);
          const obstaculo = grid.obstaculos.some((o) => mesmaPosicao(o, casa));
          const pisou = rastro.some((p) => mesmaPosicao(p, casa));
          const aqui = mesmaPosicao(robo.posicao, casa);

          return (
            <div
              key={`${casa.linha}-${casa.coluna}`}
              aria-hidden
              className={[
                "relative aspect-square rounded-[2px]",
                pisou ? "bg-cyan/20" : "bg-navy/[0.06]",
              ].join(" ")}
            >
              {obstaculo ? (
                <span className="absolute inset-[18%] rounded-[2px] bg-navy" />
              ) : null}

              {/* A chave é um círculo âmbar: objeto a recolher, cor de meta. */}
              {chave ? (
                <span className="absolute inset-[28%] rounded-full border-2 border-navy bg-amber" />
              ) : null}

              {/* O baú é o destino, e destino é roxo em todo o produto. */}
              {bau ? (
                <span className="absolute inset-[20%] rounded-[3px] border-2 border-navy bg-purple" />
              ) : null}

              {aqui ? (
                <span
                  style={{ transform: GIRO[robo.direcao] }}
                  className="absolute inset-[14%] flex items-center justify-center rounded-[3px] border-2 border-navy bg-cyan transition-transform duration-200"
                >
                  <span
                    className="block h-0 w-0 border-x-[5px] border-b-[8px] border-x-transparent border-b-navy"
                  />
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
