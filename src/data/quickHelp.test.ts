import { describe, expect, it } from "vitest";
import { NOMES_DAS_AREAS_DE_AJUDA, QUICK_HELP, ajudaDaArea } from "./quickHelp";
import type { QuickArea } from "./quickHelp";

const AREAS = Object.keys(NOMES_DAS_AREAS_DE_AJUDA) as QuickArea[];

/**
 * Aberturas que denunciam explicação no lugar de instrução. Não é lista de
 * palavras proibidas por estilo: quem lê esta página está com a aula parada, e
 * um "agora" que começa contextualizando obriga o professor a ler a frase
 * inteira para descobrir o que fazer. A ação tem que estar na primeira palavra.
 */
const ABERTURAS_QUE_NAO_SAO_ACAO = [
  "se",
  "é",
  "quando",
  "todos",
  "todas",
  "isso",
  "esse",
  "essa",
  "você",
  "o",
  "a",
  "no",
  "na",
  "para",
];

function primeiraPalavra(texto: string): string {
  return texto.split(/\s+/)[0].replace(/[.,:;]$/, "").toLowerCase();
}

describe("QUICK_HELP", () => {
  it("tem ids únicos", () => {
    expect(new Set(QUICK_HELP.map((q) => q.id)).size).toBe(QUICK_HELP.length);
  });

  it("nenhuma área fica com menos de duas respostas", () => {
    // Uma seção com um item só parece página quebrada, não parece resposta.
    for (const area of AREAS) {
      expect(ajudaDaArea(area).length, `área ${area}`).toBeGreaterThanOrEqual(2);
    }
  });

  it("cobre todas as áreas sem sobrar item fora de área", () => {
    const somaDasAreas = AREAS.reduce((n, a) => n + ajudaDaArea(a).length, 0);
    expect(somaDasAreas).toBe(QUICK_HELP.length);
  });

  it("o 'agora' começa por uma ação, não por contexto", () => {
    for (const q of QUICK_HELP) {
      expect(ABERTURAS_QUE_NAO_SAO_ACAO, `${q.id}: "${q.now.slice(0, 40)}…"`).not.toContain(
        primeiraPalavra(q.now),
      );
    }
  });

  it("todo item traz o que fazer agora e o que mudar depois, e são coisas diferentes", () => {
    for (const q of QUICK_HELP) {
      expect(q.problem.trim().length, `${q.id}.problem`).toBeGreaterThan(0);
      expect(q.now.trim().length, `${q.id}.now`).toBeGreaterThan(0);
      expect(q.later.trim().length, `${q.id}.later`).toBeGreaterThan(0);
      expect(q.now, `${q.id}`).not.toBe(q.later);
    }
  });

  it("o problema está escrito na voz do professor, em primeira pessoa ou como queixa", () => {
    // O título de cada item é a frase que o professor diria. Um título nominal
    // ("Erro de transferência") obriga ele a traduzir o sintoma antes de achar.
    for (const q of QUICK_HELP) {
      expect(q.problem.endsWith("."), `${q.id}: "${q.problem}"`).toBe(true);
      expect(q.problem.split(/\s+/).length, `${q.id} curto demais`).toBeGreaterThan(3);
    }
  });
});
