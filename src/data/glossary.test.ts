import { describe, expect, it } from "vitest";
import { GLOSSARY, NOMES_DAS_AREAS, buscarTermos, normalizar, termosDaArea } from "./glossary";
import type { GlossaryArea } from "./glossary";

const AREAS = Object.keys(NOMES_DAS_AREAS) as GlossaryArea[];

describe("normalizar", () => {
  it("ignora acento e caixa", () => {
    expect(normalizar("Abstração")).toBe("abstracao");
    expect(normalizar("DEPURAÇÃO")).toBe("depuracao");
    expect(normalizar("  Padrão  ")).toBe("padrao");
  });
});

describe("buscarTermos", () => {
  it("devolve tudo quando a consulta está vazia", () => {
    expect(buscarTermos("")).toHaveLength(GLOSSARY.length);
    expect(buscarTermos("   ")).toHaveLength(GLOSSARY.length);
  });

  it("encontra digitando sem acento", () => {
    // É o caso real: quem procura com pressa não põe acento.
    const comAcento = buscarTermos("abstração");
    const semAcento = buscarTermos("abstracao");
    expect(semAcento.map((t) => t.id)).toContain("abstracao");
    expect(semAcento.map((t) => t.id)).toEqual(comAcento.map((t) => t.id));
  });

  it("procura também no texto, não só no nome do termo", () => {
    // Quem não sabe o nome do conceito procura pelo sintoma. "girar" não é o
    // nome de nenhum verbete, mas descreve o que o VIRE faz.
    const achados = buscarTermos("gira");
    expect(achados.map((t) => t.id)).toContain("vire");
  });

  it("devolve lista vazia quando nada casa", () => {
    expect(buscarTermos("xilofone quântico")).toEqual([]);
  });
});

describe("GLOSSARY", () => {
  it("tem ids únicos e nenhuma área vazia", () => {
    expect(new Set(GLOSSARY.map((t) => t.id)).size).toBe(GLOSSARY.length);
    for (const a of AREAS) {
      expect(termosDaArea(a).length, `área ${a}`).toBeGreaterThan(0);
    }
  });

  it("todo verbete traz definição simples e a confusão comum", () => {
    for (const t of GLOSSARY) {
      expect(t.plain.trim().length, `${t.id}.plain`).toBeGreaterThan(0);
      expect(t.confusion.trim().length, `${t.id}.confusion`).toBeGreaterThan(0);
    }
  });

  it("todo 'veja também' aponta para uma rota interna", () => {
    for (const t of GLOSSARY) {
      if (!t.seeAlso) continue;
      expect(t.seeAlso.href.startsWith("/"), `${t.id} → ${t.seeAlso.href}`).toBe(true);
      expect(t.seeAlso.label.trim().length).toBeGreaterThan(0);
    }
  });
});
