import { contarPecas, expandir } from "./expand";
import { ehFalha, type Desfecho } from "./feedback";
import { estadoInicial, passo, venceu } from "./simulate";
import type { CommandType, ErroMontagem, EstadoRobo, GridSpec, Instrucao, Posicao } from "./types";

export type Execucao = {
  grid: GridSpec;
  fila: CommandType[];
  instrucoes: Instrucao[];
  ponteiro: number;
  robo: EstadoRobo;
  rastro: Posicao[];
  estado: "montando" | "rodando" | "pausado" | "terminado";
  desfecho: Desfecho | null;
  erro: ErroMontagem | null;
};

/** Monta a execução a partir da fila de peças. Não roda nada ainda. */
export function criarExecucao(grid: GridSpec, fila: CommandType[]): Execucao {
  const inicial = estadoInicial(grid);
  const base: Execucao = {
    grid,
    fila,
    instrucoes: [],
    ponteiro: 0,
    robo: inicial,
    rastro: [{ ...inicial.posicao }],
    estado: "rodando",
    desfecho: null,
    erro: null,
  };

  const r = expandir(fila);
  if (!r.ok) {
    return { ...base, estado: "terminado", erro: r.erro };
  }

  if (r.instrucoes.length === 0) {
    return { ...base, estado: "terminado", desfecho: { tipo: "terminou-sem-chegar" } };
  }

  return { ...base, instrucoes: r.instrucoes };
}

/**
 * Executa a próxima instrução. Puro: devolve uma execução nova.
 * Quem chama decide o ritmo — este módulo não conhece tempo.
 */
export function avancarExecucao(exec: Execucao, minimo: number | null): Execucao {
  if (exec.estado === "terminado") return exec;

  const instrucao = exec.instrucoes[exec.ponteiro];
  if (instrucao === undefined) {
    return { ...exec, estado: "terminado", desfecho: { tipo: "terminou-sem-chegar" } };
  }

  const r = passo(exec.grid, exec.robo, instrucao);
  const ponteiro = exec.ponteiro + 1;
  const rastro = [...exec.rastro, { ...r.estado.posicao }];

  if (venceu(exec.grid, r.estado)) {
    return {
      ...exec,
      robo: r.estado,
      ponteiro,
      rastro,
      estado: "terminado",
      desfecho: { tipo: "vitoria", pecas: contarPecas(exec.fila), minimo },
    };
  }

  // `ehFalha` é um type guard: sem ele o TypeScript não estreita `r.evento` para
  // `EventoDeFalha`, e um booleano solto não serviria — `Desfecho` só aceita
  // eventos que de fato interrompem a execução.
  if (ehFalha(r.evento)) {
    return {
      ...exec,
      robo: r.estado,
      ponteiro,
      rastro,
      estado: "terminado",
      desfecho: { tipo: "falha", evento: r.evento },
    };
  }

  if (ponteiro >= exec.instrucoes.length) {
    return {
      ...exec,
      robo: r.estado,
      ponteiro,
      rastro,
      estado: "terminado",
      desfecho: { tipo: "terminou-sem-chegar" },
    };
  }

  return { ...exec, robo: r.estado, ponteiro, rastro };
}

/** Volta ao começo mantendo a fila montada — o professor testa de novo sem remontar. */
export function reiniciarExecucao(exec: Execucao): Execucao {
  const inicial = estadoInicial(exec.grid);
  return {
    ...exec,
    ponteiro: 0,
    robo: inicial,
    rastro: [{ ...inicial.posicao }],
    estado: exec.erro ? "terminado" : "rodando",
    desfecho: null,
  };
}
