import { describe, expect, it } from "vitest";
import { ROBOTICS_COMPONENTS } from "./roboticsComponents";

describe("catálogo de componentes", () => {
  it("tem itens únicos e completos", () => {
    expect(new Set(ROBOTICS_COMPONENTS.map((item) => item.id)).size).toBe(ROBOTICS_COMPONENTS.length);
    for (const item of ROBOTICS_COMPONENTS) {
      expect(item.what.trim().length, item.id).toBeGreaterThan(20);
      expect(item.purpose.trim().length, item.id).toBeGreaterThan(20);
      expect(item.recognize.length, item.id).toBeGreaterThan(1);
      expect(item.firstTest.length, item.id).toBeGreaterThan(1);
      expect(item.safety.length, item.id).toBeGreaterThan(1);
      expect(item.usedIn.length, item.id).toBeGreaterThan(0);
      if (item.builtin) expect(item.connections, item.id).toHaveLength(0);
      else expect(item.connections.length, item.id).toBeGreaterThan(0);
    }
  });

  it("inclui sensores, atuadores, controle, conexão e energia", () => {
    expect(new Set(ROBOTICS_COMPONENTS.map((item) => item.type))).toEqual(new Set(["sensor", "atuador", "controle", "conexao", "energia"]));
  });
});
