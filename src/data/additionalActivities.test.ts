import { describe, expect, it } from "vitest";
import audit from "./generated/additionalActivityAudit.json";
import { ADDITIONAL_LESSON_PLANS, LESSON_PLANS } from "./lessonPlans";
import { ADDITIONAL_TECHNICAL_GUIDES } from "./microbitTechnicalGuides";

describe("100 atividades adicionais", () => {
  it("adiciona exatamente cem sem remover as cinquenta existentes", () => {
    expect(ADDITIONAL_LESSON_PLANS).toHaveLength(100);
    expect(LESSON_PLANS).toHaveLength(150);
    expect(new Set(LESSON_PLANS.map((plan) => plan.id)).size).toBe(150);
    expect(new Set(LESSON_PLANS.map((plan) => plan.title)).size).toBe(150);
  });

  it("transforma sobreposições em abordagens adicionais identificadas", () => {
    expect(audit.overlaps.length).toBeGreaterThan(10);
    for (const overlap of audit.overlaps) {
      expect(overlap.publishedTitle).not.toBe(overlap.sourceTitle);
      expect(overlap.matchedExisting.trim()).not.toBe("");
    }
  });

  it("cada nova aula tem guia técnico completo e pré-requisitos ligados", () => {
    expect(ADDITIONAL_TECHNICAL_GUIDES).toHaveLength(100);
    for (const plan of ADDITIONAL_LESSON_PLANS) {
      expect(plan.teacherPrerequisites?.length, plan.id).toBeGreaterThan(1);
      expect(plan.studentPrerequisites?.length, plan.id).toBeGreaterThan(2);
      expect(plan.whyApply?.length, plan.id).toBeGreaterThan(80);
      const guide = ADDITIONAL_TECHNICAL_GUIDES.find((item) => item.id === plan.id);
      expect(guide, plan.id).toBeDefined();
      expect(guide?.blocks.length, plan.id).toBeGreaterThan(1);
      expect(guide?.code.length, plan.id).toBeGreaterThan(20);
    }
  });
});
