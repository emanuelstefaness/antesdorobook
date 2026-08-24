import { describe, expect, it } from "vitest";
import { descreverTabuleiro } from "./describe";
import type { EstadoRobo, GridSpec } from "./types";

const GRID: GridSpec = {
  linhas: 6,
  colunas: 6,
  robo: { linha: 5, coluna: 0 },
  direcaoInicial: "norte",
  chave: { linha: 1, coluna: 0 },
  bau: { linha: 1, coluna: 4 },
  obstaculos: [],
};

const ROBO: EstadoRobo = {
  posicao: { linha: 5, coluna: 0 },
  direcao: "norte",
  temChave: false,
};

describe("descreverTabuleiro", () => {
  it("diz onde estão a chave, o baú e os obstáculos, não só o robô", () => {
    // É o defeito que motivou este módulo: sem essas três posições não dá para
    // montar a fila de comandos, e a atividade fica impossível sem enxergar.
    const t = descreverTabuleiro(
      { ...GRID, obstaculos: [{ linha: 3, coluna: 2 }] },
      ROBO,
    );

    expect(t).toContain("Chave na linha 2, coluna 1");
    expect(t).toContain("Baú na linha 2, coluna 5");
    expect(t).toContain("Um obstáculo na linha 4, coluna 3");
    expect(t).toContain("Robô na linha 6, coluna 1");
  });

  it("conta linhas e colunas a partir de 1", () => {
    const t = descreverTabuleiro(GRID, { ...ROBO, posicao: { linha: 0, coluna: 0 } });
    expect(t).toContain("linha 1, coluna 1");
    expect(t).not.toContain("linha 0");
    expect(t).not.toContain("coluna 0");
  });

  it("traduz a direção para cima, baixo, esquerda e direita", () => {
    // "Norte" não ajuda quem não vê o tabuleiro: não há bússola numa tela.
    const paraCada = {
      norte: "para cima",
      sul: "para baixo",
      leste: "para a direita",
      oeste: "para a esquerda",
    } as const;

    for (const [direcao, esperado] of Object.entries(paraCada)) {
      const t = descreverTabuleiro(GRID, {
        ...ROBO,
        direcao: direcao as EstadoRobo["direcao"],
      });
      expect(t, direcao).toContain(`virado ${esperado}`);
      expect(t, direcao).not.toContain(direcao);
    }
  });

  it("some com a chave do mapa quando o robô já a pegou", () => {
    const t = descreverTabuleiro(GRID, { ...ROBO, temChave: true });
    expect(t).toContain("já pegou a chave");
    expect(t).not.toContain("Chave na");
  });

  it("anuncia que o baú abriu, e não só que o robô está com a chave", () => {
    // A descrição antiga parava na chave: quem não enxerga sabia que o robô
    // tinha a chave e nunca ficava sabendo que tinha vencido.
    const vitoria = descreverTabuleiro(GRID, {
      posicao: { linha: 1, coluna: 4 },
      direcao: "norte",
      temChave: true,
    });
    expect(vitoria).toContain("Baú aberto");
    expect(vitoria).toContain("resolvido");
  });

  it("não diz que abriu quando o robô chega ao baú sem a chave", () => {
    const semChave = descreverTabuleiro(GRID, {
      posicao: { linha: 1, coluna: 4 },
      direcao: "norte",
      temChave: false,
    });
    expect(semChave).not.toContain("Baú aberto");
    expect(semChave).toContain("Baú na linha 2, coluna 5");
  });

  it("diz explicitamente quando não há obstáculo, em vez de omitir", () => {
    // Silêncio é ambíguo: quem não vê não sabe se não há obstáculo ou se a
    // descrição esqueceu de mencionar.
    expect(descreverTabuleiro(GRID, ROBO)).toContain("Sem obstáculos.");
  });

  it("enumera vários obstáculos com a contagem na frente", () => {
    const t = descreverTabuleiro(
      {
        ...GRID,
        obstaculos: [
          { linha: 0, coluna: 0 },
          { linha: 2, coluna: 3 },
          { linha: 4, coluna: 1 },
        ],
      },
      ROBO,
    );
    expect(t).toContain("3 obstáculos:");
    expect(t).toContain("linha 1, coluna 1; linha 3, coluna 4 e linha 5, coluna 2");
  });

  it("aguenta tabuleiro sem chave e sem baú", () => {
    const t = descreverTabuleiro({ ...GRID, chave: null, bau: null }, ROBO);
    expect(t).toContain("Robô na");
    expect(t).not.toContain("Chave");
    expect(t).not.toContain("Baú");
  });
});
