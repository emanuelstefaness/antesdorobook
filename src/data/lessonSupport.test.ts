import { describe, expect, it } from "vitest";
import { LESSON_PLANS } from "./lessonPlans";
import { buildLessonSupport } from "./lessonSupport";
import { guiaTecnicoPorPlano } from "./microbitTechnicalGuides";

describe("modelo completo das 150 aulas", () => {
  it("entrega todas as etapas pedagógicas em cada aula", () => {
    for (const plan of LESSON_PLANS) {
      const support = buildLessonSupport(plan, guiaTecnicoPorPlano(plan.id));
      expect(support.concepts.length, `${plan.id}.concepts`).toBeGreaterThan(0);
      expect(support.readiness.length, `${plan.id}.readiness`).toBeGreaterThanOrEqual(4);
      expect(support.materials.length, `${plan.id}.materials`).toBeGreaterThan(0);
      expect(support.preparation.length, `${plan.id}.preparation`).toBeGreaterThanOrEqual(5);
      expect(support.rehearsal.length, `${plan.id}.rehearsal`).toBeGreaterThanOrEqual(5);
      expect(support.timeline.length, `${plan.id}.timeline`).toBe(8);
      expect(support.questions.length, `${plan.id}.questions`).toBeGreaterThanOrEqual(4);
      expect(support.adaptations.length, `${plan.id}.adaptations`).toBeGreaterThanOrEqual(4);
      expect(support.rubric.length, `${plan.id}.rubric`).toBeGreaterThanOrEqual(4);
      expect(support.studentSheet.length, `${plan.id}.studentSheet`).toBeGreaterThanOrEqual(5);
      expect(support.diagnostics.length, `${plan.id}.diagnostics`).toBeGreaterThanOrEqual(4);
    }
  });

  it("possui respostas, ações e evidências sem campos vazios", () => {
    for (const plan of LESSON_PLANS) {
      const support = buildLessonSupport(plan, guiaTecnicoPorPlano(plan.id));
      for (const item of [...support.readiness, ...support.questions]) {
        expect(item.question.trim().length, plan.id).toBeGreaterThan(0);
        expect(item.answer.trim().length, plan.id).toBeGreaterThan(0);
      }
      for (const row of support.timeline) {
        expect(row.teacher.trim().length, `${plan.id}.${row.title}.teacher`).toBeGreaterThan(0);
        expect(row.students.trim().length, `${plan.id}.${row.title}.students`).toBeGreaterThan(0);
        expect(row.evidence.trim().length, `${plan.id}.${row.title}.evidence`).toBeGreaterThan(0);
      }
    }
  });

  it("mantém o guia técnico obrigatório em toda aula que usa micro:bit", () => {
    for (const plan of LESSON_PLANS.filter((item) => item.needsMicrobit)) {
      const guide = guiaTecnicoPorPlano(plan.id);
      expect(guide, plan.id).toBeDefined();
      expect(guide!.blocks.length, `${plan.id}.blocks`).toBeGreaterThan(1);
      expect(guide!.code.trim().length, `${plan.id}.code`).toBeGreaterThan(20);
      expect(guide!.expected.length, `${plan.id}.expected`).toBeGreaterThan(1);
      expect(guide!.answers.length, `${plan.id}.answers`).toBeGreaterThan(1);
      expect(guide!.diagnostics.length, `${plan.id}.diagnostics`).toBeGreaterThan(2);
    }
  });

  it("explicita os itens que não existem dentro do micro:bit", () => {
    for (const plan of LESSON_PLANS) {
      const guide = guiaTecnicoPorPlano(plan.id);
      if (guide?.wiring.kind !== "externo") continue;

      const support = buildLessonSupport(plan, guide);
      const required = support.materials.find((item) =>
        item.name.startsWith("Componente externo obrigatório:"),
      );

      expect(required, plan.id).toBeDefined();
      expect(required!.name, plan.id).toContain(guide.wiring.component);
      expect(required!.quantity, plan.id).toContain("por grupo");
      expect(required!.use, plan.id).toContain("não existe dentro do micro:bit");
      expect(
        support.materials.some((item) => item.name === "Cabos e conectores compatíveis"),
        plan.id,
      ).toBe(true);
    }
  });
});
