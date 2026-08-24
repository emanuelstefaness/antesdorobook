import { describe, expect, it } from "vitest";
import { STAGES, computeJourney, nextStage, overallPercent, stageOf } from "./journey";

describe("journey", () => {
  it("tem dez etapas na ordem da navbar", () => {
    expect(STAGES.map((e) => e.id)).toEqual([
      "comecar",
      "preparar",
      "aprender",
      "robotica",
      "microbit",
      "aulas-microbit",
      "praticar",
      "tabuleiro",
      "trilhas",
      "planejar",
    ]);
    expect(STAGES.map((e) => e.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("declara o total esperado de cada etapa", () => {
    const totais = Object.fromEntries(STAGES.map((e) => [e.id, e.total]));
    expect(totais).toEqual({
      comecar: 1,
      preparar: 10,
      aprender: 11,
      robotica: 8,
      "aulas-microbit": 1,
      praticar: 12,
      tabuleiro: 8,
      microbit: 10,
      trilhas: 24,
      planejar: 1,
    });
  });

  it("traz o rótulo curto de cada etapa, usado na navbar estreita", () => {
    expect(STAGES.map((e) => e.short)).toEqual([
      "Começar",
      "Preparar-se",
      "Pensamento",
      "Robótica",
      "micro:bit",
      "Aulas",
      "Atividades",
      "Tabuleiro",
      "Caminho",
      "Todas as aulas",
    ]);
  });

  it("stageOf extrai a etapa de um id namespaced", () => {
    expect(stageOf("aprender:algoritmos")).toBe("aprender");
    expect(stageOf("trilhas:contador-de-pontos")).toBe("trilhas");
  });

  it("stageOf devolve null para id sem prefixo ou com prefixo desconhecido", () => {
    expect(stageOf("algoritmos")).toBeNull();
    expect(stageOf("inventado:algo")).toBeNull();
    expect(stageOf("")).toBeNull();
    expect(stageOf(":sem-etapa")).toBeNull();
    expect(stageOf("trilhas:assunto:detalhe")).toBe("trilhas");
  });

  it("conta concluídos por etapa e ignora duplicados", () => {
    const progresso = computeJourney([
      "aprender:sequencia-e-instrucoes",
      "aprender:sequencia-e-instrucoes",
      "aprender:decomposicao",
      "praticar:robo-humano",
    ]);
    const aprender = progresso.find((e) => e.id === "aprender")!;
    expect(aprender.done).toBe(2);
    expect(aprender.complete).toBe(false);

    const praticar = progresso.find((e) => e.id === "praticar")!;
    expect(praticar.done).toBe(1);
  });

  it("a porcentagem vai de 0 a 100 conforme a etapa se completa", () => {
    // Sem número mágico ligado à quantidade de conceitos: este teste travava em
    // "20%" porque APRENDER tinha 10 itens, e quebrou ao virarem 11 — sendo que
    // o assunto dele nunca foi quantos conceitos existem.
    const tabuleiro = (feitos: string[]) =>
      computeJourney(feitos).find((e) => e.id === "tabuleiro")!;

    const vazio = tabuleiro([]);
    expect(vazio.percent).toBe(0);
    expect(vazio.complete).toBe(false);

    const todos = Array.from({ length: vazio.total }, (_, i) => `tabuleiro:desafio-${i}`);
    const cheio = tabuleiro(todos);
    expect(cheio.percent).toBe(100);
    expect(cheio.complete).toBe(true);

    const metade = tabuleiro(todos.slice(0, Math.floor(vazio.total / 2)));
    expect(metade.percent).toBeGreaterThan(0);
    expect(metade.percent).toBeLessThan(100);
  });

  it("nunca passa de 100% mesmo com ids a mais", () => {
    const excesso = Array.from({ length: 20 }, (_, i) => `aprender:conceito-${i}`);
    const aprender = computeJourney(excesso).find((e) => e.id === "aprender")!;
    expect(aprender.percent).toBe(100);
    expect(aprender.complete).toBe(true);
  });

  it("overallPercent pondera pelo total de itens, não pelo número de etapas", () => {
    expect(overallPercent([])).toBe(0);

    const tudo = STAGES.flatMap((e) =>
      Array.from({ length: e.total }, (_, i) => `${e.id}:item-${i}`),
    );
    expect(overallPercent(tudo)).toBe(100);

    // Dez itens de "aprender" devem ser ponderados pelo total real do percurso.
    // Uma média por etapa daria outro valor — é isso que este caso descarta.
    const soAprender = Array.from({ length: 10 }, (_, i) => `aprender:item-${i}`);
    const total = STAGES.reduce((sum, stage) => sum + stage.total, 0);
    expect(overallPercent(soAprender)).toBe(Math.round((10 / total) * 100));
  });

  it("nextStage devolve a primeira etapa incompleta", () => {
    expect(nextStage([])!.id).toBe("comecar");
    expect(nextStage(["comecar:diagnostico"])!.id).toBe("preparar");
  });

  it("nextStage devolve null quando tudo está concluído", () => {
    const tudo = STAGES.flatMap((e) =>
      Array.from({ length: e.total }, (_, i) => `${e.id}:item-${i}`),
    );
    expect(nextStage(tudo)).toBeNull();
  });
});
