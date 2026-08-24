import type { Direcao, EstadoRobo, Evento, GridSpec, Instrucao, Posicao } from "./types";

const ORDEM: Direcao[] = ["norte", "leste", "sul", "oeste"];

const DESLOCAMENTO: Record<Direcao, Posicao> = {
  norte: { linha: -1, coluna: 0 },
  leste: { linha: 0, coluna: 1 },
  sul: { linha: 1, coluna: 0 },
  oeste: { linha: 0, coluna: -1 },
};

export function mesmaPosicao(a: Posicao, b: Posicao): boolean {
  return a.linha === b.linha && a.coluna === b.coluna;
}

export function estadoInicial(grid: GridSpec): EstadoRobo {
  return {
    posicao: { ...grid.robo },
    direcao: grid.direcaoInicial,
    temChave: false,
  };
}

function girar(direcao: Direcao, sentido: 1 | -1): Direcao {
  const i = ORDEM.indexOf(direcao);
  return ORDEM[(i + sentido + ORDEM.length) % ORDEM.length];
}

function dentro(grid: GridSpec, p: Posicao): boolean {
  return p.linha >= 0 && p.linha < grid.linhas && p.coluna >= 0 && p.coluna < grid.colunas;
}

/**
 * O robô venceu quando está sobre o baú podendo abri-lo.
 * Cenário sem chave (os primeiros desafios) tem o baú destrancado: exigir uma
 * chave que não existe no tabuleiro deixaria o desafio impossível de vencer.
 */
export function venceu(grid: GridSpec, estado: EstadoRobo): boolean {
  if (!grid.bau) return false;
  if (!mesmaPosicao(estado.posicao, grid.bau)) return false;
  return grid.chave === null || estado.temChave;
}

/**
 * Executa uma instrução. Função pura: nunca altera o estado recebido.
 * Movimentos inválidos (parede ou obstáculo) não mexem o robô — o robô erra
 * parado, que é o que deixa a depuração visível para a turma.
 */
export function passo(
  grid: GridSpec,
  estado: EstadoRobo,
  instrucao: Instrucao,
): { estado: EstadoRobo; evento: Evento } {
  if (instrucao === "VIRE_DIREITA" || instrucao === "VIRE_ESQUERDA") {
    const sentido = instrucao === "VIRE_DIREITA" ? 1 : -1;
    return {
      estado: { ...estado, posicao: { ...estado.posicao }, direcao: girar(estado.direcao, sentido) },
      evento: { tipo: "girou" },
    };
  }

  const d = DESLOCAMENTO[estado.direcao];
  const destino: Posicao = {
    linha: estado.posicao.linha + d.linha,
    coluna: estado.posicao.coluna + d.coluna,
  };

  if (!dentro(grid, destino)) {
    return { estado: { ...estado, posicao: { ...estado.posicao } }, evento: { tipo: "saiu-do-tabuleiro" } };
  }

  if (grid.obstaculos.some((o) => mesmaPosicao(o, destino))) {
    return { estado: { ...estado, posicao: { ...estado.posicao } }, evento: { tipo: "bateu-obstaculo" } };
  }

  const novo: EstadoRobo = { ...estado, posicao: destino };

  if (grid.chave && !estado.temChave && mesmaPosicao(destino, grid.chave)) {
    return { estado: { ...novo, temChave: true }, evento: { tipo: "pegou-chave" } };
  }

  if (grid.bau && mesmaPosicao(destino, grid.bau)) {
    const abre = grid.chave === null || novo.temChave;
    return { estado: novo, evento: abre ? { tipo: "abriu-bau" } : { tipo: "bau-trancado" } };
  }

  return { estado: novo, evento: { tipo: "andou" } };
}
