import { describe, expect, it } from "vitest";
import { CONCEPTS } from "./concepts";
import { TOPICS, TRAILS, assuntosDaTrilha, trilhaPorId } from "./trails";

const IDS_DE_CONCEITO = CONCEPTS.map((c) => c.id);

describe("TRAILS", () => {
  it("tem as 6 trilhas da spec, numeradas em sequência", () => {
    expect(TRAILS).toHaveLength(6);
    expect(TRAILS.map((t) => t.order)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(new Set(TRAILS.map((t) => t.id)).size).toBe(6);
  });

  it("cada trilha tem exatamente 4 assuntos, numerados de 1 a 4", () => {
    for (const t of TRAILS) {
      const assuntos = assuntosDaTrilha(t.id);
      expect(assuntos.map((a) => a.order), `trilha ${t.id}`).toEqual([1, 2, 3, 4]);
    }
  });

  it("todo assunto pertence a uma trilha existente, e não sobra nenhum", () => {
    // Um assunto órfão não aparece em página nenhuma: existe nos dados e some
    // do site, que é o pior tipo de conteúdo perdido — ninguém percebe.
    for (const a of TOPICS) {
      expect(trilhaPorId(a.trailId), `${a.id} aponta para ${a.trailId}`).toBeDefined();
    }
    const somados = TRAILS.reduce((n, t) => n + assuntosDaTrilha(t.id).length, 0);
    expect(somados).toBe(TOPICS.length);
    expect(TOPICS).toHaveLength(24);
  });

  it("todo pré-requisito aponta para uma trilha anterior", () => {
    for (const t of TRAILS) {
      for (const p of t.prerequisites) {
        const alvo = trilhaPorId(p);
        expect(alvo, `${t.id} exige ${p}, que não existe`).toBeDefined();
        expect(alvo!.order, `${t.id} exige ${p}, que vem depois`).toBeLessThan(t.order);
      }
    }
  });

  it("o encadeamento de trilhas leva à seguinte, e a última encerra", () => {
    TRAILS.forEach((t, i) => {
      const seguinte = TRAILS[i + 1];
      if (seguinte) {
        expect(t.next?.href, `${t.id}`).toBe(`/trilhas/${seguinte.id}`);
      } else {
        expect(t.next, "a última trilha não aponta para lugar nenhum").toBeNull();
      }
    });
  });

  it("todo conceito citado por um assunto existe", () => {
    for (const a of TOPICS) {
      expect(a.concepts.length, `${a.id} não cita conceito`).toBeGreaterThan(0);
      for (const c of a.concepts) {
        expect(IDS_DE_CONCEITO, `${a.id} cita ${c}`).toContain(c);
      }
    }
  });

  it("todo assunto traz condução, perguntas, dificuldades e avaliação", () => {
    for (const a of TOPICS) {
      for (const campo of [
        "title",
        "summary",
        "objective",
        "howToExplain",
        "preparation",
      ] as const) {
        expect(a[campo].trim().length, `${a.id}.${campo} vazio`).toBeGreaterThan(0);
      }
      expect(a.steps.length, `${a.id}.steps`).toBeGreaterThanOrEqual(4);
      expect(a.questions.length, `${a.id}.questions`).toBeGreaterThanOrEqual(3);
      expect(a.difficulties.length, `${a.id}.difficulties`).toBeGreaterThanOrEqual(2);
      expect(a.assessment.length, `${a.id}.assessment`).toBeGreaterThanOrEqual(3);
      expect(a.materials.length, `${a.id}.materials`).toBeGreaterThan(0);
    }
  });

  it("todo id de assunto é único no conjunto inteiro", () => {
    expect(new Set(TOPICS.map((a) => a.id)).size).toBe(TOPICS.length);
  });
});
