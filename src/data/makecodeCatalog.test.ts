import { describe, expect, it } from "vitest";
import { MAKECODE_CATEGORIES, MAKECODE_FAMILY_COUNT, makeCodeCategoryById } from "./makecodeCatalog";

describe("MAKECODE_CATEGORIES", () => {
  it("cobre as 19 aulas em ordem e com ids únicos", () => {
    expect(MAKECODE_CATEGORIES).toHaveLength(19);
    expect(MAKECODE_CATEGORIES.map((item) => item.order)).toEqual(Array.from({ length: 19 }, (_, index) => index + 1));
    expect(new Set(MAKECODE_CATEGORIES.map((item) => item.id)).size).toBe(19);
  });

  it("explica toda família com uso, resultado e diagnóstico", () => {
    expect(MAKECODE_FAMILY_COUNT).toBeGreaterThan(100);
    for (const category of MAKECODE_CATEGORIES) {
      expect(category.families.length, category.id).toBeGreaterThan(0);
      expect(category.source.startsWith("https://makecode.microbit.org/"), category.id).toBe(true);
      for (const family of category.families) {
        expect(family.name.trim(), `${category.id}.name`).not.toBe("");
        expect(family.does.trim(), `${category.id}.does`).not.toBe("");
        expect(family.use.trim(), `${category.id}.use`).not.toBe("");
        expect(family.result.trim(), `${category.id}.result`).not.toBe("");
        expect(family.error.trim(), `${category.id}.error`).not.toBe("");
      }
    }
  });

  it("resolve cada rota do catálogo", () => {
    for (const category of MAKECODE_CATEGORIES) expect(makeCodeCategoryById(category.id)).toBe(category);
    expect(makeCodeCategoryById("nao-existe")).toBeUndefined();
  });
});
