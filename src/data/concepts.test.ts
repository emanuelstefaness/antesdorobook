import { describe, expect, it } from "vitest";
import { validarDemo } from "@/lib/demo/validate";
import { STAGES } from "@/lib/journey";
import { CONCEPTS, conceitoPorId } from "./concepts";

const IDS_ESPERADOS = [
  "o-que-e-pensamento-computacional",
  "por-que-ensinar-pensamento-computacional",
  "sequencia-e-instrucoes",
  "entrada-processamento-e-saida",
  "decomposicao",
  "reconhecimento-de-padroes",
  "abstracao",
  "algoritmos",
  "repeticao",
  "teste-e-depuracao",
  "o-erro-como-parte-da-aprendizagem",
];

/** Os 12 ids de atividade da spec. Um `quickActivity` fora desta lista é 404. */
const IDS_DE_ATIVIDADE = [
  "algoritmo-do-sanduiche",
  "sequencia-de-movimentos",
  "desenho-por-comandos",
  "programe-o-professor",
  "robo-humano",
  "caca-ao-tesouro",
  "comandos-com-palmas",
  "sequencias-repetidas",
  "economize-comandos",
  "encontre-o-erro",
  "corrija-o-caminho",
  "instrucoes-ambiguas",
];

describe("CONCEPTS", () => {
  it("tem os 11 conceitos, na ordem", () => {
    expect(CONCEPTS.map((c) => c.id)).toEqual(IDS_ESPERADOS);
    expect(CONCEPTS.map((c) => c.order)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });

  it("o total declarado da etapa APRENDER acompanha a quantidade de conceitos", () => {
    // Duas fontes para o mesmo número: a lista aqui e o `total` da etapa, que
    // alimenta o anel de progresso da navbar. Acrescentar um conceito e
    // esquecer o total deixaria a jornada presa em 10 de 11 para sempre.
    const aprender = STAGES.find((e) => e.id === "aprender");
    expect(aprender?.total).toBe(CONCEPTS.length);
  });

  it("toda demonstração é estruturalmente válida", () => {
    for (const c of CONCEPTS) {
      expect({ id: c.id, erros: validarDemo(c.demo) }).toEqual({ id: c.id, erros: [] });
    }
  });

  it("todo pré-requisito aponta para um conceito que vem antes", () => {
    // Um pré-requisito que aponta para a frente cria um ciclo na jornada: o
    // professor é mandado para um conceito que exige o que ele ainda não viu.
    for (const c of CONCEPTS) {
      for (const p of c.prerequisites) {
        const alvo = conceitoPorId(p);
        expect(alvo, `${c.id} exige ${p}, que não existe`).toBeDefined();
        expect(alvo!.order, `${c.id} exige ${p}, que vem depois`).toBeLessThan(c.order);
      }
    }
  });

  it("todo campo de texto obrigatório está preenchido", () => {
    for (const c of CONCEPTS) {
      for (const campo of [
        "title",
        "willLearn",
        "summary",
        "whyTeacher",
        "whyStudents",
        "everydayExample",
        "howToExplain",
        "classQuestion",
      ] as const) {
        expect(c[campo].trim().length, `${c.id}.${campo} vazio`).toBeGreaterThan(0);
      }
      expect(c.assessment.length, `${c.id}.assessment`).toBe(3);
      expect(c.difficulties.length, `${c.id}.difficulties`).toBeGreaterThanOrEqual(2);
    }
  });

  it("nenhum resumo passa de três frases", () => {
    // Divulgação progressiva: o resumo é o único parágrafo visível de início.
    for (const c of CONCEPTS) {
      const frases = c.summary.split(/[.!?]+\s/).filter((f) => f.trim().length > 0);
      expect(frases.length, `${c.id}.summary tem ${frases.length} frases`).toBeLessThanOrEqual(3);
    }
  });

  it("toda atividade rápida aponta para uma das 12 atividades", () => {
    for (const c of CONCEPTS) {
      const id = c.quickActivity.href.replace("/praticar/", "");
      expect(IDS_DE_ATIVIDADE, `${c.id} aponta para ${c.quickActivity.href}`).toContain(id);
    }
  });

  it("o próximo passo de cada conceito leva ao seguinte, e o último sai da área", () => {
    CONCEPTS.forEach((c, i) => {
      const seguinte = CONCEPTS[i + 1];
      if (seguinte) {
        expect(c.next.href, `${c.id} deveria levar a ${seguinte.id}`).toBe(
          `/aprender/${seguinte.id}`,
        );
      } else {
        // O décimo fecha a área: mandar para si mesmo prenderia o professor.
        expect(c.next.href).toBe("/praticar");
      }
      expect(c.next.label.trim().length).toBeGreaterThan(0);
    });
  });
});
