import { describe, expect, it } from "vitest";
import { PREPARATION_MODULES } from "./preparation";
import { PREPARATION_LESSONS, lessonByModuleId } from "./preparationLessons";

describe("PREPARATION_LESSONS", () => {
  it("ensina cada módulo de preparação, sem apenas cobrar domínio", () => {
    expect(PREPARATION_LESSONS).toHaveLength(PREPARATION_MODULES.length);
    for (const formationModule of PREPARATION_MODULES) {
      const lesson = lessonByModuleId(formationModule.id);
      expect(lesson, formationModule.id).toBeDefined();
      expect(lesson?.chapters).toHaveLength(4);
      expect(lesson?.selfCheck.length).toBeGreaterThanOrEqual(3);
      expect(lesson?.playfulLab.steps.length).toBeGreaterThanOrEqual(4);
    }
  });
});
