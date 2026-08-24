import { mesmaPosicao } from "./simulate";
import type { EstadoRobo, GridSpec, Posicao } from "./types";

/**
 * Norte, sul, leste e oeste são a linguagem do kit e das peças VIRE, mas num
 * tabuleiro na tela quem não enxerga não tem bússola: "norte" só quer dizer
 * alguma coisa depois de alguém combinar que norte é para cima. A descrição
 * fala em cima, baixo, esquerda e direita, que é o que o professor vai dizer
 * em voz alta para a turma de qualquer jeito.
 */
const PARA_ONDE: Record<EstadoRobo["direcao"], string> = {
  norte: "para cima",
  sul: "para baixo",
  leste: "para a direita",
  oeste: "para a esquerda",
};

/** Linha e coluna em base 1: ninguém conta casas a partir do zero em voz alta. */
function casa(p: Posicao): string {
  return `linha ${p.linha + 1}, coluna ${p.coluna + 1}`;
}

function listar(posicoes: Posicao[]): string {
  const partes = posicoes.map(casa);
  if (partes.length === 1) return partes[0];
  return `${partes.slice(0, -1).join("; ")} e ${partes[partes.length - 1]}`;
}

/**
 * Descrição completa do tabuleiro para leitor de tela.
 *
 * A versão anterior dizia só onde o robô estava e se tinha a chave. Isso não é
 * uma descrição insuficiente, é uma atividade impossível: sem saber onde estão
 * a chave, o baú e os obstáculos, não há como montar a fila de comandos. Quem
 * não enxerga não conseguia jogar.
 */
export function descreverTabuleiro(grid: GridSpec, robo: EstadoRobo): string {
  const partes: string[] = [
    `Tabuleiro de ${grid.linhas} por ${grid.colunas}, linhas contadas de cima e colunas da esquerda.`,
  ];

  const sobreOBau = grid.bau !== null && mesmaPosicao(robo.posicao, grid.bau);
  const abriu = sobreOBau && robo.temChave;

  partes.push(`Robô na ${casa(robo.posicao)}, virado ${PARA_ONDE[robo.direcao]}.`);

  if (grid.chave !== null && !robo.temChave) {
    partes.push(`Chave na ${casa(grid.chave)}.`);
  } else if (robo.temChave) {
    partes.push("O robô já pegou a chave.");
  }

  if (grid.bau !== null) {
    // Quando o baú abriu, dizer de novo onde ele está é ruído: o robô está em
    // cima dele, e a posição acabou de ser anunciada.
    partes.push(abriu ? "Baú aberto: o desafio foi resolvido." : `Baú na ${casa(grid.bau)}.`);
  }

  partes.push(
    grid.obstaculos.length === 0
      ? "Sem obstáculos."
      : grid.obstaculos.length === 1
        ? `Um obstáculo na ${listar(grid.obstaculos)}.`
        : `${grid.obstaculos.length} obstáculos: ${listar(grid.obstaculos)}.`,
  );

  return partes.join(" ");
}
