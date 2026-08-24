import { describe, expect, it } from "vitest";
import { LESSON_PLANS } from "./lessonPlans";
import { MICROBIT_TECHNICAL_GUIDES, guiaTecnicoPorPlano } from "./microbitTechnicalGuides";

describe("guias técnicos do micro:bit", () => {
  it("cobre toda aula que exige micro:bit", () => {
    const aulas = LESSON_PLANS.filter((plan) => plan.needsMicrobit);
    expect(aulas.length).toBeGreaterThan(20);
    for (const plan of aulas) expect(guiaTecnicoPorPlano(plan.id), plan.id).toBeDefined();
    expect(MICROBIT_TECHNICAL_GUIDES).toHaveLength(aulas.length);
  });

  it("entrega as oito partes técnicas em cada guia", () => {
    for (const guide of MICROBIT_TECHNICAL_GUIDES) {
      expect(guide.blocks.length, guide.id).toBeGreaterThan(1);
      expect(guide.blocks.map((item) => item.order), guide.id).toEqual(guide.blocks.map((_, i) => i + 1));
      expect(guide.code.trim().length, guide.id).toBeGreaterThan(20);
      expect(guide.expected.length, guide.id).toBeGreaterThan(1);
      expect(guide.answers.length, guide.id).toBeGreaterThan(1);
      expect(guide.diagnostics.length, guide.id).toBeGreaterThan(2);
      expect(guide.wiring.notes.length, guide.id).toBeGreaterThan(0);
      if (guide.wiring.kind === "externo") expect(guide.wiring.connections.length, guide.id).toBeGreaterThan(1);
    }
  });
});
