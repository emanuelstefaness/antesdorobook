import { describe, expect, it } from "vitest";
import { ACTIVITIES } from "./activities";
import { CONCEPTS } from "./concepts";
import { MAKECODE_CATEGORIES } from "./makecodeCatalog";
import { ROBOTICS_CONCEPTS } from "./robotics";
import { LESSON_PLANS, planoPorId } from "./lessonPlans";
import type { AgeBand } from "./types";

const IDS_DE_CONCEITO = CONCEPTS.map((c) => c.id);
const FAIXAS: AgeBand[] = ["2-3", "4-5", "6-7", "8-9"];

describe("LESSON_PLANS", () => {
  it("tem um catálogo amplo, com ids únicos", () => {
    expect(LESSON_PLANS).toHaveLength(150);
    expect(new Set(LESSON_PLANS.map((p) => p.id)).size).toBe(LESSON_PLANS.length);
  });

  it("cobre as quatro faixas com opções desplugadas, tabuleiro e micro:bit", () => {
    for (const faixa of FAIXAS) {
      const daFaixa = LESSON_PLANS.filter((p) => p.ageBands.includes(faixa));
      expect(daFaixa.length, `faixa ${faixa}`).toBeGreaterThanOrEqual(8);
      expect(
        daFaixa.filter((p) => !p.needsComputer && !p.needsBoard && !p.needsMicrobit).length,
        `faixa ${faixa} sem material especial`,
      ).toBeGreaterThan(0);
      expect(daFaixa.filter((p) => p.needsBoard).length, `faixa ${faixa} com tabuleiro`).toBeGreaterThan(0);
      expect(daFaixa.filter((p) => p.needsMicrobit).length, `faixa ${faixa} com micro:bit`).toBeGreaterThan(0);
    }
  });

  it("todo conceito citado por um plano existe", () => {
    for (const p of LESSON_PLANS) {
      expect(p.concepts.length, `${p.id} não cita nenhum conceito`).toBeGreaterThan(0);
      for (const c of p.concepts) {
        expect(IDS_DE_CONCEITO, `${p.id} cita ${c}`).toContain(c);
      }
    }
  });

  it("todo link de continuidade e de conteúdo relacionado aponta para rota existente", () => {
    const rotasFixas = ["/tabuleiro", "/microbit", "/praticar", "/aprender", "/planejar", "/componentes", "/aulas/caminho"];
    for (const p of LESSON_PLANS) {
      for (const ref of [p.continuity, ...p.relatedContent]) {
        if (ref.href.startsWith("/aprender/")) {
          expect(IDS_DE_CONCEITO, `${p.id} → ${ref.href}`).toContain(
            ref.href.replace("/aprender/", ""),
          );
        } else if (ref.href.startsWith("/praticar/")) {
          expect(
            ACTIVITIES.map((a) => a.id),
            `${p.id} → ${ref.href}`,
          ).toContain(ref.href.replace("/praticar/", ""));
        } else if (ref.href.startsWith("/planejar/")) {
          expect(
            LESSON_PLANS.map((plano) => plano.id),
            `${p.id} → ${ref.href}`,
          ).toContain(ref.href.replace("/planejar/", ""));
        } else if (ref.href.startsWith("/makecode/")) {
          expect(
            MAKECODE_CATEGORIES.map((categoria) => categoria.id),
            `${p.id} → ${ref.href}`,
          ).toContain(ref.href.replace("/makecode/", ""));
        } else if (ref.href.startsWith("/robotica/")) {
          expect(
            ROBOTICS_CONCEPTS.map((conceito) => conceito.id),
            `${p.id} → ${ref.href}`,
          ).toContain(ref.href.replace("/robotica/", ""));
        } else {
          expect(rotasFixas, `${p.id} → ${ref.href}`).toContain(ref.href);
        }
      }
    }
  });

  it("as necessidades de material batem com a lista de materiais", () => {
    // Um plano que declara `needsMicrobit` mas não lista o micro:bit deixaria a
    // professora chegar na aula sem o equipamento que a aula exige.
    for (const p of LESSON_PLANS) {
      if (p.needsMicrobit) expect(p.materials, `${p.id}`).toContain("microbit");
      if (p.needsComputer) expect(p.materials, `${p.id}`).toContain("computador");
      if (p.needsBoard) expect(p.materials, `${p.id}`).toContain("tabuleiro");
    }
  });

  it("todo campo do roteiro está preenchido", () => {
    for (const p of LESSON_PLANS) {
      for (const campo of [
        "title",
        "theme",
        "objective",
        "intro",
        "triggerQuestion",
        "explanation",
        "investigation",
        "construction",
        "test",
        "debug",
        "sharing",
      ] as const) {
        expect(p[campo].trim().length, `${p.id}.${campo} vazio`).toBeGreaterThan(0);
      }
      expect(p.preparation.length, `${p.id}.preparation`).toBeGreaterThanOrEqual(2);
      expect(p.assessment.length, `${p.id}.assessment`).toBeGreaterThanOrEqual(3);
    }
  });

  it("a pergunta disparadora é de fato uma pergunta", () => {
    for (const p of LESSON_PLANS) {
      expect(p.triggerQuestion.trim().endsWith("?"), `${p.id}`).toBe(true);
    }
  });

  it("planoPorId encontra todos e devolve indefinido para id inexistente", () => {
    for (const p of LESSON_PLANS) expect(planoPorId(p.id)?.id).toBe(p.id);
    expect(planoPorId("nao-existe")).toBeUndefined();
  });
});
