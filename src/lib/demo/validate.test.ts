import { describe, expect, it } from "vitest";
import type { DemoSpec } from "./types";
import { validarDemo } from "./validate";

const GRID_DEMO = {
  linhas: 4,
  colunas: 4,
  robo: { linha: 3, coluna: 0 },
  direcaoInicial: "norte" as const,
  chave: null,
  bau: { linha: 1, coluna: 1 },
  obstaculos: [],
};

const MATRIZ_CHEIA = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
];

describe("validarDemo", () => {
  it("aceita uma comparação de ordem bem formada", () => {
    const d: DemoSpec = {
      kind: "compare-order",
      correct: ["AVANCE", "VIRE_DIREITA", "AVANCE"],
      wrong: ["VIRE_DIREITA", "AVANCE", "AVANCE"],
      grid: GRID_DEMO,
      explain: "As mesmas três peças em ordens diferentes levam o robô a lugares diferentes.",
    };
    expect(validarDemo(d)).toEqual([]);
  });

  it("recusa comparação de ordem em que a errada é igual à certa", () => {
    const d: DemoSpec = {
      kind: "compare-order",
      correct: ["AVANCE", "VIRE_DIREITA"],
      wrong: ["AVANCE", "VIRE_DIREITA"],
      grid: GRID_DEMO,
      explain: "As duas filas levam a lugares diferentes.",
    };
    expect(validarDemo(d)).toContain("compare-order: a fila errada é igual à certa");
  });

  it("recusa decomposição com menos de duas partes", () => {
    const d: DemoSpec = {
      kind: "decompose",
      whole: "Arrumar a mochila",
      parts: ["Só uma parte"],
    };
    expect(validarDemo(d)).toContain("decompose: precisa de pelo menos 2 partes");
  });

  it("recusa padrão cujo índice aponta para fora da lista", () => {
    const d: DemoSpec = { kind: "pattern", items: ["a", "b", "c"], patternIndexes: [0, 3] };
    expect(validarDemo(d)).toContain("pattern: índice 3 não existe em items");
  });

  it("recusa matriz de LED que não seja 5x5", () => {
    const d: DemoSpec = {
      kind: "led-matrix",
      frames: [
        [
          [1, 0, 1],
          [0, 1, 0],
        ],
      ],
      caption: "Coração",
    };
    expect(validarDemo(d)).toContain("led-matrix: quadro 0 não é 5x5");
  });

  it("recusa matriz de LED com valor fora de 0 e 1", () => {
    const comIntruso = MATRIZ_CHEIA.map((linha) => [...linha]);
    comIntruso[2][2] = 2;
    const d: DemoSpec = { kind: "led-matrix", frames: [comIntruso], caption: "Coração" };
    expect(validarDemo(d)).toContain("led-matrix: quadro 0 tem valor fora de 0/1");
  });

  it("recusa fluxo de entrada-processamento-saída com campo vazio", () => {
    const d: DemoSpec = {
      kind: "io-flow",
      input: "",
      process: "conta",
      output: "luz",
      ledPattern: MATRIZ_CHEIA,
    };
    expect(validarDemo(d)).toContain("io-flow: input, process e output não podem ser vazios");
  });

  it("recusa imagem sem texto alternativo", () => {
    const d: DemoSpec = {
      kind: "image",
      slot: { src: "aprender/x.jpg", alt: "  " },
      caption: "Legenda",
    };
    expect(validarDemo(d)).toContain("image: alt é obrigatório");
  });
});

describe("validarDemo, compressão por repetição", () => {
  const VALIDA: DemoSpec = {
    kind: "loop-compress",
    longa: ["AVANCE", "AVANCE", "AVANCE", "AVANCE", "VIRE_DIREITA"],
    curta: ["REPITA_4X", "AVANCE", "VIRE_DIREITA"],
    explain: "Quatro avanços seguidos cabem em duas peças.",
  };

  it("aceita uma compressão honesta", () => {
    expect(validarDemo(VALIDA)).toEqual([]);
  });

  it("recusa quando as duas filas não executam a mesma coisa", () => {
    // O defeito que nenhum olho pega: as duas filas ficam paradas na tela, e a
    // afirmação de que são equivalentes só se confere executando.
    const mentirosa: DemoSpec = {
      ...VALIDA,
      curta: ["REPITA_3X", "AVANCE", "VIRE_DIREITA"],
    };
    expect(validarDemo(mentirosa)).toContain(
      "loop-compress: as duas filas não fazem a mesma coisa",
    );
  });

  it("recusa quando a repetição não encurta nada", () => {
    // É a confusão comum registrada no glossário: em trecho de um comando só,
    // REPITA aumenta a fila em vez de diminuir.
    const inchada: DemoSpec = {
      kind: "loop-compress",
      longa: ["AVANCE", "AVANCE"],
      curta: ["REPITA_2X", "AVANCE"],
      explain: "x",
    };
    expect(validarDemo(inchada)).toContain(
      "loop-compress: a fila curta não é menor que a longa",
    );
  });

  it("recusa uma fila curta que não usa repetição nenhuma", () => {
    const semRepita: DemoSpec = {
      kind: "loop-compress",
      longa: ["AVANCE", "AVANCE", "VIRE_DIREITA"],
      curta: ["AVANCE", "AVANCE"],
      explain: "x",
    };
    expect(validarDemo(semRepita)).toContain("loop-compress: a fila curta não usa repetição");
  });

  it("recusa fila que nem chega a expandir", () => {
    // REPITA sem comando depois é erro de montagem no kit de verdade.
    const quebrada: DemoSpec = { ...VALIDA, curta: ["AVANCE", "REPITA_4X"] };
    expect(validarDemo(quebrada)).toContain("loop-compress: a fila curta não expande");
  });
});
