import { describe, expect, it } from "vitest";
import {
  FIRST_CLASS_CHECKLIST,
  TEACHER_DOES_NOT_NEED,
  TEACHER_READINESS,
} from "./teacherReadiness";
import { PREPARATION_MODULES } from "./preparation";

describe("preparação do professor", () => {
  it("tem dez módulos em ordem e sem ids repetidos", () => {
    expect(PREPARATION_MODULES).toHaveLength(10);
    expect(PREPARATION_MODULES.map((modulo) => modulo.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(new Set(PREPARATION_MODULES.map((modulo) => modulo.id)).size).toBe(10);
  });

  it("oferece um mapa de prontidão prático e completo", () => {
    expect(TEACHER_READINESS.length).toBeGreaterThanOrEqual(9);
    expect(FIRST_CLASS_CHECKLIST.length).toBeGreaterThanOrEqual(8);
    expect(TEACHER_DOES_NOT_NEED.length).toBeGreaterThanOrEqual(4);
    for (const area of TEACHER_READINESS) {
      expect(area.essential.trim().length, area.id).toBeGreaterThan(40);
      expect(area.quickCheck.trim().endsWith("?"), area.id).toBe(true);
      expect(area.beforeClass.trim().length, area.id).toBeGreaterThan(30);
    }
  });
});
