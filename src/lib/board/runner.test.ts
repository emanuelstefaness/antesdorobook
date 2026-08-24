import { describe, expect, it } from "vitest";
import type { GridSpec } from "./types";
import { avancarExecucao, criarExecucao, reiniciarExecucao } from "./runner";

const grid: GridSpec = {
  linhas: 6,
  colunas: 6,
  robo: { linha: 5, coluna: 0 },
  direcaoInicial: "norte",
  chave: { linha: 3, coluna: 0 },
  bau: { linha: 3, coluna: 1 },
  obstaculos: [],
};

const ate = (exec: ReturnType<typeof criarExecucao>, minimo: number) => {
  let e = exec;
  let voltas = 0;
  while (e.estado !== "terminado" && voltas < 50) {
    e = avancarExecucao(e, minimo);
    voltas++;
  }
  return e;
};

describe("runner", () => {
  it("uma fila válida começa pronta para rodar, sem erro", () => {
    const e = criarExecucao(grid, ["INICIO", "AVANCE", "FIM"]);
    expect(e.erro).toBeNull();
    expect(e.instrucoes).toEqual(["AVANCE"]);
    expect(e.estado).toBe("rodando");
    expect(e.rastro).toEqual([{ linha: 5, coluna: 0 }]);
  });

  it("uma fila inválida termina de cara com o erro de montagem", () => {
    const e = criarExecucao(grid, ["REPITA_2X", "FIM"]);
    expect(e.erro).not.toBeNull();
    expect(e.estado).toBe("terminado");
    expect(e.desfecho).toBeNull();
  });

  it("cada avanço move o ponteiro e registra o rastro", () => {
    let e = criarExecucao(grid, ["AVANCE", "AVANCE"]);
    e = avancarExecucao(e, 4);
    expect(e.ponteiro).toBe(1);
    expect(e.robo.posicao).toEqual({ linha: 4, coluna: 0 });
    expect(e.rastro).toHaveLength(2);
  });

  it("vencer termina a execução com desfecho de vitória", () => {
    const fila = ["INICIO", "AVANCE", "AVANCE", "VIRE_DIREITA", "AVANCE", "FIM"] as const;
    const e = ate(criarExecucao(grid, [...fila]), 4);
    expect(e.estado).toBe("terminado");
    expect(e.desfecho).toEqual({ tipo: "vitoria", pecas: 4, minimo: 4 });
  });

  it("conta as peças montadas, não as instruções expandidas", () => {
    const reto = { ...grid, chave: null, bau: { linha: 2, coluna: 0 } };
    const e = ate(criarExecucao(reto, ["INICIO", "REPITA_3X", "AVANCE", "FIM"]), 2);
    // Três AVANCE são executados, mas o professor montou duas peças.
    expect(e.desfecho).toEqual({ tipo: "vitoria", pecas: 2, minimo: 2 });
  });

  it("bater num obstáculo termina a execução com falha", () => {
    const comObstaculo: GridSpec = { ...grid, obstaculos: [{ linha: 4, coluna: 0 }] };
    const e = ate(criarExecucao(comObstaculo, ["AVANCE"]), 4);
    expect(e.estado).toBe("terminado");
    expect(e.desfecho).toEqual({ tipo: "falha", evento: { tipo: "bateu-obstaculo" } });
  });

  it("acabar a fila longe do baú termina sem chegar", () => {
    const e = ate(criarExecucao(grid, ["AVANCE"]), 4);
    expect(e.desfecho).toEqual({ tipo: "terminou-sem-chegar" });
  });

  it("avançar uma execução terminada não muda nada", () => {
    const e = ate(criarExecucao(grid, ["AVANCE"]), 4);
    expect(avancarExecucao(e, 4)).toBe(e);
  });

  it("reiniciar devolve o robô ao início mantendo a fila", () => {
    const e = ate(criarExecucao(grid, ["AVANCE", "AVANCE"]), 4);
    const r = reiniciarExecucao(e);
    expect(r.robo.posicao).toEqual({ linha: 5, coluna: 0 });
    expect(r.ponteiro).toBe(0);
    expect(r.desfecho).toBeNull();
    expect(r.fila).toEqual(e.fila);
    expect(r.rastro).toEqual([{ linha: 5, coluna: 0 }]);
  });

  it("uma fila vazia termina imediatamente, sem travar", () => {
    const e = criarExecucao(grid, []);
    expect(e.estado).toBe("terminado");
    expect(e.desfecho).toEqual({ tipo: "terminou-sem-chegar" });
  });

  it("avançar não altera a execução recebida", () => {
    const antes = criarExecucao(grid, ["AVANCE", "AVANCE"]);
    const depois = avancarExecucao(antes, 4);

    expect(depois).not.toBe(antes);
    expect(antes.ponteiro).toBe(0);
    expect(antes.rastro).toHaveLength(1);
    expect(antes.robo.posicao).toEqual({ linha: 5, coluna: 0 });
  });

  it("reiniciar uma fila inválida continua terminada, com o erro preservado", () => {
    const e = criarExecucao(grid, ["REPITA_2X", "FIM"]);
    const r = reiniciarExecucao(e);

    expect(r.estado).toBe("terminado");
    expect(r.erro).not.toBeNull();
    expect(r.desfecho).toBeNull();
  });
});
