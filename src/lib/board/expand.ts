import type { CommandType, ErroMontagem, Instrucao } from "./types";

const REPETICOES: Partial<Record<CommandType, number>> = {
  REPITA_2X: 2,
  REPITA_3X: 3,
  REPITA_4X: 4,
};

const MARCADORES: CommandType[] = ["INICIO", "FIM"];

export type ResultadoExpansao =
  | { ok: true; instrucoes: Instrucao[] }
  | { ok: false; erro: ErroMontagem };

/**
 * Expande a fila de peças em instruções de movimento.
 *
 * Regra do kit: REPITA_NX repete o comando imediatamente seguinte, e só ele.
 * É a regra mais simples de explicar para a turma e a que corresponde às peças
 * físicas — não há aninhamento, e tentar aninhar é erro de montagem.
 */
export function expandir(fila: CommandType[]): ResultadoExpansao {
  const instrucoes: Instrucao[] = [];

  for (let i = 0; i < fila.length; i++) {
    const peca = fila[i];

    if (MARCADORES.includes(peca)) continue;

    const vezes = REPETICOES[peca];
    if (vezes === undefined) {
      instrucoes.push(peca as Instrucao);
      continue;
    }

    const seguinte = fila[i + 1];

    if (seguinte === undefined) {
      return {
        ok: false,
        erro: { indice: i, mensagem: "Este REPITA precisa de um comando logo depois dele." },
      };
    }

    if (REPETICOES[seguinte] !== undefined) {
      return {
        ok: false,
        erro: {
          indice: i + 1,
          mensagem: "Aqui um REPITA não pode repetir outro REPITA. Repita um movimento.",
        },
      };
    }

    if (MARCADORES.includes(seguinte)) {
      return {
        ok: false,
        erro: {
          indice: i + 1,
          mensagem: "Este REPITA precisa de um comando logo depois dele, não de um marcador.",
        },
      };
    }

    for (let n = 0; n < vezes; n++) instrucoes.push(seguinte as Instrucao);
    i++; // o comando repetido já foi consumido
  }

  return { ok: true, instrucoes };
}

/** Conta as peças que o professor montou, ignorando INICIO e FIM. */
export function contarPecas(fila: CommandType[]): number {
  return fila.filter((p) => !MARCADORES.includes(p)).length;
}
