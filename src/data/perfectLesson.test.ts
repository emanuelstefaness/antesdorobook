import { describe, expect, it } from "vitest";
import { planoPorId } from "./lessonPlans";
import { guiaTecnicoPorPlano } from "./microbitTechnicalGuides";
import { PERFECT_LESSON, PERFECT_LESSON_ID } from "./perfectLesson";

describe("aula-modelo perfeita", () => {
  it("está ligada a uma aula e a um guia técnico existentes", () => {
    expect(planoPorId(PERFECT_LESSON_ID)?.title).toBe("Luz noturna automática");
    expect(guiaTecnicoPorPlano(PERFECT_LESSON_ID)).toBeDefined();
  });

  it("cobre aprendizagem, preparação, aplicação e avaliação", () => {
    expect(PERFECT_LESSON.concepts.length).toBeGreaterThanOrEqual(4);
    expect(PERFECT_LESSON.readiness.length).toBeGreaterThanOrEqual(3);
    expect(PERFECT_LESSON.materials.length).toBeGreaterThanOrEqual(4);
    expect(PERFECT_LESSON.preparation.length).toBeGreaterThanOrEqual(5);
    expect(PERFECT_LESSON.timeline.length).toBeGreaterThanOrEqual(7);
    expect(PERFECT_LESSON.questions.length).toBeGreaterThanOrEqual(4);
    expect(PERFECT_LESSON.adaptations.length).toBeGreaterThanOrEqual(4);
    expect(PERFECT_LESSON.rubric.length).toBeGreaterThanOrEqual(4);
  });

  it("possui resposta esperada para toda pergunta", () => {
    for (const item of [...PERFECT_LESSON.readiness, ...PERFECT_LESSON.questions]) {
      expect(item.question.trim().length).toBeGreaterThan(0);
      expect(item.answer.trim().length).toBeGreaterThan(0);
    }
  });
});
