import { describe, expect, it } from "vitest";
import { CONCEPTS } from "./concepts";
import {
  NOMES_DAS_CATEGORIAS,
  NOMES_DOS_NIVEIS_DE_PROJETO,
  PROJECTS,
  type ProjectCategory,
  type ProjectLevel,
} from "./projects";
import type { AgeBand } from "./types";

const FAIXAS: AgeBand[] = ["2-3", "4-5", "6-7", "8-9"];
const CATEGORIAS = Object.keys(NOMES_DAS_CATEGORIAS) as ProjectCategory[];
const NIVEIS = Object.keys(NOMES_DOS_NIVEIS_DE_PROJETO) as ProjectLevel[];

describe("PROJECTS", () => {
  it("oferece muitas ideias com ids únicos", () => {
    expect(PROJECTS).toHaveLength(50);
    expect(new Set(PROJECTS.map((projeto) => projeto.id)).size).toBe(PROJECTS.length);
  });

  it("cobre todas as categorias, níveis e faixas escolares", () => {
    for (const categoria of CATEGORIAS) {
      expect(PROJECTS.some((projeto) => projeto.category === categoria), categoria).toBe(true);
    }
    for (const nivel of NIVEIS) {
      expect(PROJECTS.some((projeto) => projeto.level === nivel), nivel).toBe(true);
    }
    for (const faixa of FAIXAS) {
      expect(PROJECTS.filter((projeto) => projeto.ageBands.includes(faixa)).length, faixa)
        .toBeGreaterThanOrEqual(10);
    }
  });

  it("todo projeto tem roteiro, conceito válido e plano alternativo", () => {
    const conceitos = CONCEPTS.map((conceito) => conceito.id);
    for (const projeto of PROJECTS) {
      expect(projeto.steps).toHaveLength(4);
      expect(projeto.materials.length, projeto.id).toBeGreaterThan(0);
      expect(projeto.oneMicrobit.trim().length, projeto.id).toBeGreaterThan(30);
      expect(projeto.withoutHardware.trim().length, projeto.id).toBeGreaterThan(30);
      for (const conceito of projeto.concepts) {
        expect(conceitos, `${projeto.id} cita ${conceito}`).toContain(conceito);
      }
    }
  });
});
