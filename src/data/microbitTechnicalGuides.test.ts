import { describe, expect, it } from "vitest";
import ts from "typescript";
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

  it("não publica pseudocódigo como se fosse código copiável", () => {
    for (const guide of MICROBIT_TECHNICAL_GUIDES) {
      expect(guide.code, guide.id).not.toMatch(/\/\/\s*Bloco:/i);
      const generatedByModel = guide.extensions.some((item) => /CreateAI/i.test(item));
      if (!generatedByModel) expect(guide.code, guide.id).toMatch(/\b(?:basic|input|pins|radio|music|led|game|serial|control|neopixel|BME280|motionbit|servos)\./);
    }
  });

  it("mantém o TypeScript de todas as aulas sintaticamente válido", () => {
    for (const guide of MICROBIT_TECHNICAL_GUIDES) {
      const result = ts.transpileModule(guide.code, {
        compilerOptions: { target: ts.ScriptTarget.ES2020 },
        reportDiagnostics: true,
      });
      const errors = (result.diagnostics ?? []).filter((item) => item.category === ts.DiagnosticCategory.Error);
      expect(errors, guide.id).toEqual([]);
    }
  });

  it("exige V2 sempre que o código usa um recurso exclusivo da placa V2", () => {
    for (const guide of MICROBIT_TECHNICAL_GUIDES) {
      if (/input\.soundLevel|input\.onLogoEvent|soundExpression\./.test(guide.code)) {
        expect(guide.board, guide.id).toBe("BBC micro:bit V2");
      }
    }
  });

  it("oferece resultado específico, respostas e diagnóstico utilizáveis", () => {
    for (const guide of MICROBIT_TECHNICAL_GUIDES) {
      expect(guide.expected.join(" "), guide.id).not.toMatch(/^O projeto realiza/i);
      expect(guide.answers.length, guide.id).toBeGreaterThanOrEqual(3);
      expect(guide.diagnostics.length, guide.id).toBeGreaterThanOrEqual(4);
      expect(guide.diagnostics.every((item) => item.symptom && item.cause && item.check && item.fix), guide.id).toBe(true);
    }
  });
});
