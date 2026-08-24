import { describe, expect, it } from "vitest";
import type { GridSpec } from "./types";
import { estadoInicial, passo, venceu } from "./simulate";

const grid: GridSpec = {
  linhas: 6,
  colunas: 6,
  robo: { linha: 5, coluna: 0 },
  direcaoInicial: "norte",
  chave: { linha: 3, coluna: 0 },
  bau: { linha: 3, coluna: 2 },
  obstaculos: [{ linha: 4, coluna: 1 }],
};

describe("simulate", () => {
  it("começa na posição e direção declaradas, sem a chave", () => {
    expect(estadoInicial(grid)).toEqual({
      posicao: { linha: 5, coluna: 0 },
      direcao: "norte",
      temChave: false,
    });
  });

  it("AVANCE andando para o norte diminui a linha", () => {
    const r = passo(grid, estadoInicial(grid), "AVANCE");
    expect(r.estado.posicao).toEqual({ linha: 4, coluna: 0 });
    expect(r.evento).toEqual({ tipo: "andou" });
  });

  it("VIRE_DIREITA gira no sentido horário sem sair do lugar", () => {
    const r = passo(grid, estadoInicial(grid), "VIRE_DIREITA");
    expect(r.estado.direcao).toBe("leste");
    expect(r.estado.posicao).toEqual({ linha: 5, coluna: 0 });
    expect(r.evento).toEqual({ tipo: "girou" });
  });

  it("VIRE_ESQUERDA gira no sentido anti-horário", () => {
    const r = passo(grid, estadoInicial(grid), "VIRE_ESQUERDA");
    expect(r.estado.direcao).toBe("oeste");
  });

  it("quatro giros à direita voltam à direção original", () => {
    let e = estadoInicial(grid);
    for (let i = 0; i < 4; i++) e = passo(grid, e, "VIRE_DIREITA").estado;
    expect(e.direcao).toBe("norte");
  });

  it("sair do tabuleiro não move o robô e avisa", () => {
    const e = { posicao: { linha: 0, coluna: 0 }, direcao: "norte" as const, temChave: false };
    const r = passo(grid, e, "AVANCE");
    expect(r.evento).toEqual({ tipo: "saiu-do-tabuleiro" });
    expect(r.estado.posicao).toEqual({ linha: 0, coluna: 0 });
  });

  it("bater num obstáculo não move o robô e avisa", () => {
    const e = { posicao: { linha: 4, coluna: 0 }, direcao: "leste" as const, temChave: false };
    const r = passo(grid, e, "AVANCE");
    expect(r.evento).toEqual({ tipo: "bateu-obstaculo" });
    expect(r.estado.posicao).toEqual({ linha: 4, coluna: 0 });
  });

  it("passar pela casa da chave pega a chave", () => {
    const e = { posicao: { linha: 4, coluna: 0 }, direcao: "norte" as const, temChave: false };
    const r = passo(grid, e, "AVANCE");
    expect(r.estado.temChave).toBe(true);
    expect(r.evento).toEqual({ tipo: "pegou-chave" });
  });

  it("chegar ao baú sem a chave move o robô mas não vence", () => {
    const e = { posicao: { linha: 3, coluna: 1 }, direcao: "leste" as const, temChave: false };
    const r = passo(grid, e, "AVANCE");
    expect(r.estado.posicao).toEqual({ linha: 3, coluna: 2 });
    expect(r.evento).toEqual({ tipo: "bau-trancado" });
    expect(venceu(grid, r.estado)).toBe(false);
  });

  it("chegar ao baú com a chave abre o baú e vence", () => {
    const e = { posicao: { linha: 3, coluna: 1 }, direcao: "leste" as const, temChave: true };
    const r = passo(grid, e, "AVANCE");
    expect(r.evento).toEqual({ tipo: "abriu-bau" });
    expect(venceu(grid, r.estado)).toBe(true);
  });

  it("num cenário sem chave o baú abre direto", () => {
    const semChave: GridSpec = { ...grid, chave: null, bau: { linha: 4, coluna: 0 } };
    const r = passo(semChave, estadoInicial(semChave), "AVANCE");
    expect(r.evento).toEqual({ tipo: "abriu-bau" });
    expect(venceu(semChave, r.estado)).toBe(true);
  });

  it("não muda o estado recebido — devolve um novo", () => {
    const antes = estadoInicial(grid);
    const copia = JSON.parse(JSON.stringify(antes));
    passo(grid, antes, "AVANCE");
    expect(antes).toEqual(copia);
  });
});
