import { describe, expect, it } from "vitest";
import { LESSON_PLANS } from "./lessonPlans";
import { MICROBIT_STARTER_PATH } from "./microbitLearningPath";

describe("MICROBIT_STARTER_PATH", () => {
  it("organiza oito aulas iniciais válidas e com micro:bit", () => {
    expect(MICROBIT_STARTER_PATH).toHaveLength(8);
    expect(MICROBIT_STARTER_PATH.map((passo) => passo.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    for (const passo of MICROBIT_STARTER_PATH) {
      const plano = LESSON_PLANS.find((item) => item.id === passo.lessonId);
      expect(plano, passo.lessonId).toBeDefined();
      expect(plano?.needsMicrobit, passo.lessonId).toBe(true);
      expect(passo.teacherGoal.length, passo.lessonId).toBeGreaterThan(30);
    }
  });
});
