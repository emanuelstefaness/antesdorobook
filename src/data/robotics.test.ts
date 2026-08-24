import { describe, expect, it } from "vitest";
import { ROBOTICS_CONCEPTS } from "./robotics";

describe("ROBOTICS_CONCEPTS", () => {
  it("apresenta oito fundamentos em ordem", () => {
    expect(ROBOTICS_CONCEPTS).toHaveLength(8);
    expect(ROBOTICS_CONCEPTS.map((conceito) => conceito.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(new Set(ROBOTICS_CONCEPTS.map((conceito) => conceito.id)).size).toBe(8);
  });

  it("todo fundamento explica, orienta e propõe prática", () => {
    for (const conceito of ROBOTICS_CONCEPTS) {
      expect(conceito.plain.length, conceito.id).toBeGreaterThan(50);
      expect(conceito.teacherNeeds.length, conceito.id).toBeGreaterThan(50);
      expect(conceito.howToExplain.length, conceito.id).toBeGreaterThan(40);
      expect(conceito.practice.length, conceito.id).toBeGreaterThan(35);
      expect(conceito.example.length, conceito.id).toBeGreaterThan(35);
    }
  });
});
