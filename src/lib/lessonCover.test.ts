import { describe, expect, it } from "vitest";
import { LESSON_PLANS } from "@/data/lessonPlans";
import { lessonCover } from "./lessonCover";

describe("lessonCover", () => {
  it("fornece uma imagem local e exclusiva para cada aula", () => {
    const paths = LESSON_PLANS.map((lesson, index) => {
      const cover = lessonCover(lesson);
      expect(cover.src, lesson.id).toBe(`/imagens/aulas/${String(index + 1).padStart(3, "0")}.webp`);
      expect(cover.alt.trim().length, lesson.id).toBeGreaterThan(12);
      return cover.src;
    });

    expect(new Set(paths).size).toBe(LESSON_PLANS.length);
  });

  it("mantém a ordem do catálogo no caminho das imagens", () => {
    expect(lessonCover(LESSON_PLANS[0]).src).toBe("/imagens/aulas/001.webp");
    expect(lessonCover(LESSON_PLANS[87]).src).toBe("/imagens/aulas/088.webp");
    expect(lessonCover(LESSON_PLANS[149]).src).toBe("/imagens/aulas/150.webp");
  });
});
