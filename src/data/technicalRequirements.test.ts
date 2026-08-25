import { describe, expect, it } from "vitest";
import { MICROBIT_TECHNICAL_GUIDES } from "./microbitTechnicalGuides";
import {
  guideProducesSound,
  guideUsesRadio,
  technicalRequirementsFor,
} from "./technicalRequirements";

describe("kit técnico de todas as aulas com micro:bit", () => {
  it("informa placa, quantidade e cabo em todos os guias", () => {
    for (const guide of MICROBIT_TECHNICAL_GUIDES) {
      const requirements = technicalRequirementsFor(guide);
      expect(requirements.some((item) => item.kind === "placa"), guide.id).toBe(true);
      expect(requirements.some((item) => item.item === "Cabo USB de dados"), guide.id).toBe(true);
      expect(requirements.every((item) => item.quantity.trim().length > 0), guide.id).toBe(true);
      expect(requirements.every((item) => item.caution.trim().length > 0), guide.id).toBe(true);
    }
  });

  it("exige duas placas em toda aula de rádio", () => {
    for (const guide of MICROBIT_TECHNICAL_GUIDES.filter(guideUsesRadio)) {
      const board = technicalRequirementsFor(guide).find((item) => item.kind === "placa");
      expect(board?.quantity, guide.id).toMatch(/^2 placas/);
    }
  });

  it("explica a saída externa de áudio quando uma aula sonora aceita V1", () => {
    for (const guide of MICROBIT_TECHNICAL_GUIDES.filter(
      (item) => guideProducesSound(item) && /\bV1\b/i.test(item.board),
    )) {
      const conditional = technicalRequirementsFor(guide).find(
        (item) => item.kind === "condicional" && /alto-falante|piezo/i.test(item.item),
      );
      expect(conditional, guide.id).toBeDefined();
      expect(conditional!.quantity, guide.id).toContain("somente se a placa for V1");
    }
  });

  it("lista componente, cabos e fonte nas montagens externas", () => {
    for (const guide of MICROBIT_TECHNICAL_GUIDES.filter((item) => item.wiring.kind === "externo")) {
      const requirements = technicalRequirementsFor(guide);
      expect(requirements.some((item) => item.kind === "componente" && item.item === guide.wiring.component), guide.id).toBe(true);
      expect(requirements.some((item) => item.item === "Cabos e conectores compatíveis"), guide.id).toBe(true);

      const text = [
        guide.wiring.component,
        ...guide.wiring.connections.flatMap((connection) => [connection.from, connection.to, connection.purpose]),
        ...guide.wiring.notes,
      ].join(" ");
      if (/fonte externa|alimentação externa/i.test(text)) {
        expect(requirements.some((item) => item.kind === "alimentacao"), guide.id).toBe(true);
      }
    }
  });
});
