import { describe, expect, it } from "vitest";
import { contarPecas } from "@/lib/board/expand";
import { avancarExecucao, criarExecucao } from "@/lib/board/runner";
import { BOARD_CHALLENGES } from "./boardChallenges";

const rodarAteOFim = (desafio: (typeof BOARD_CHALLENGES)[number]) => {
  let e = criarExecucao(desafio.grid, desafio.solucaoReferencia);
  let voltas = 0;
  while (e.estado !== "terminado" && voltas < 200) {
    e = avancarExecucao(e, desafio.minCommands);
    voltas++;
  }
  return e;
};

// Todo desafio "jogável" (tudo menos o editor livre, que não tem meta de
// otimização) declara um mínimo numérico — os testes de solvabilidade abaixo
// dependem disso. Esta guarda existe só para o TypeScript: em runtime nunca
// deveria disparar, já que `jogaveis` já exclui o único desafio com
// `minCommands: null`.
const minimoDeclarado = (desafio: (typeof BOARD_CHALLENGES)[number]): number => {
  if (desafio.minCommands === null) {
    throw new Error(`desafio ${desafio.id} não declara um mínimo`);
  }
  return desafio.minCommands;
};

const jogaveis = BOARD_CHALLENGES.filter((d) => d.id !== "crie-seu-desafio");

describe("BOARD_CHALLENGES", () => {
  it("traz os oito desafios na ordem da spec", () => {
    expect(BOARD_CHALLENGES.map((d) => d.id)).toEqual([
      "linha-reta",
      "primeira-curva",
      "desviar-do-obstaculo",
      "coletar-a-chave",
      "abrir-o-bau",
      "usar-repeticao",
      "menor-algoritmo",
      "crie-seu-desafio",
    ]);
    expect(BOARD_CHALLENGES.map((d) => d.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("todo desafio tem texto de apoio preenchido", () => {
    for (const d of BOARD_CHALLENGES) {
      expect(d.title.length).toBeGreaterThan(0);
      expect(d.brief.length).toBeGreaterThan(0);
      expect(d.hint.length).toBeGreaterThan(0);
      expect(d.classroomBridge.length).toBeGreaterThan(0);
    }
  });

  it("todo desafio usa um tabuleiro 6 por 6", () => {
    for (const d of BOARD_CHALLENGES) {
      expect(d.grid.linhas).toBe(6);
      expect(d.grid.colunas).toBe(6);
    }
  });

  it("a solução de referência de cada desafio vence", () => {
    for (const d of jogaveis) {
      const e = rodarAteOFim(d);
      expect(e.desfecho?.tipo, `desafio ${d.id}`).toBe("vitoria");
    }
  });

  it("a solução de referência usa exatamente o mínimo declarado", () => {
    for (const d of jogaveis) {
      expect(contarPecas(d.solucaoReferencia), `desafio ${d.id}`).toBe(minimoDeclarado(d));
    }
  });

  it("a solução de referência só usa comandos permitidos no desafio", () => {
    for (const d of jogaveis) {
      for (const c of d.solucaoReferencia) {
        expect(d.allowedCommands, `desafio ${d.id}`).toContain(c);
      }
    }
  });

  it("nenhuma peça do cenário cai em cima de um obstáculo", () => {
    for (const d of BOARD_CHALLENGES) {
      const ocupadas = d.grid.obstaculos;
      const mesma = (a: { linha: number; coluna: number }, b: { linha: number; coluna: number }) =>
        a.linha === b.linha && a.coluna === b.coluna;
      expect(ocupadas.some((o) => mesma(o, d.grid.robo)), `desafio ${d.id}`).toBe(false);
      if (d.grid.chave) expect(ocupadas.some((o) => mesma(o, d.grid.chave!)), d.id).toBe(false);
      if (d.grid.bau) expect(ocupadas.some((o) => mesma(o, d.grid.bau!)), d.id).toBe(false);
    }
  });
});
