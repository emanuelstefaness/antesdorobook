import { describe, expect, it } from "vitest";
import {
  MAKECODE_MISSIONS,
  MICROBIT_PARTS,
  NOMES_DAS_FUNCOES,
  componentesPorFuncao,
  type FuncaoNaPlaca,
} from "./microbit";

const FUNCOES = Object.keys(NOMES_DAS_FUNCOES) as FuncaoNaPlaca[];

describe("MICROBIT_PARTS", () => {
  it("tem os 14 componentes da spec, com ids únicos", () => {
    expect(MICROBIT_PARTS).toHaveLength(14);
    expect(new Set(MICROBIT_PARTS.map((p) => p.id)).size).toBe(14);
  });

  it("nenhuma função fica sem componente", () => {
    // A página renderiza um cabeçalho por função. Uma função vazia viraria um
    // título seguido de nada, que é a definição de seção incompleta.
    for (const f of FUNCOES) {
      expect(componentesPorFuncao(f).length, `função ${f}`).toBeGreaterThan(0);
    }
  });

  it("todo componente soma o mesmo total quando agrupado por função", () => {
    const somaDosGrupos = FUNCOES.reduce((t, f) => t + componentesPorFuncao(f).length, 0);
    expect(somaDosGrupos).toBe(MICROBIT_PARTS.length);
  });

  it("todo componente traz teste rápido e cuidado preenchidos", () => {
    for (const p of MICROBIT_PARTS) {
      for (const campo of ["name", "fn", "example", "miniTest", "caution"] as const) {
        expect(p[campo].trim().length, `${p.id}.${campo} vazio`).toBeGreaterThan(0);
      }
    }
  });
});

describe("MAKECODE_MISSIONS", () => {
  it("tem as 10 missões, numeradas em sequência", () => {
    expect(MAKECODE_MISSIONS).toHaveLength(10);
    expect(MAKECODE_MISSIONS.map((m) => m.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  it("toda missão tem passos, resultado esperado e o que fazer quando dá errado", () => {
    for (const m of MAKECODE_MISSIONS) {
      expect(m.steps.length, `${m.id}.steps`).toBeGreaterThanOrEqual(3);
      expect(m.troubleshooting.length, `${m.id}.troubleshooting`).toBeGreaterThanOrEqual(2);
      for (const campo of ["title", "goal", "expectedResult", "classroomBridge"] as const) {
        expect(m[campo].trim().length, `${m.id}.${campo} vazio`).toBeGreaterThan(0);
      }
    }
  });

  it("a missão de transferir para a placa é a última", () => {
    // A ordem importa pedagogicamente: transferir antes de ter o que transferir
    // gasta o tempo mais escasso da aula com placas na etapa mais frustrante.
    expect(MAKECODE_MISSIONS[MAKECODE_MISSIONS.length - 1].id).toBe("transferir-para-a-placa");
  });
});
