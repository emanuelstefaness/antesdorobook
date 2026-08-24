import { describe, expect, it } from "vitest";
import { ACTIVITIES } from "@/data/activities";
import { CONCEPTS } from "@/data/concepts";
import { GLOSSARY } from "@/data/glossary";
import { LESSON_PLANS } from "@/data/lessonPlans";
import { MICROBIT_PARTS } from "@/data/microbit";
import { QUICK_HELP } from "@/data/quickHelp";
import { PREPARATION_MODULES } from "@/data/preparation";
import { ROBOTICS_CONCEPTS } from "@/data/robotics";
import { ROBOTICS_COMPONENTS } from "@/data/roboticsComponents";
import { MINIMO_DA_CONSULTA, buscar, tamanhoDoIndice } from "./search";

describe("buscar", () => {
  it("não devolve nada abaixo do mínimo de caracteres", () => {
    expect(buscar("")).toEqual([]);
    expect(buscar("a")).toEqual([]);
    expect(buscar("   ")).toEqual([]);
    expect(buscar("x".repeat(MINIMO_DA_CONSULTA))).toEqual([]);
  });

  it("acha sem acento e sem caixa", () => {
    const comAcento = buscar("repetição");
    const semAcento = buscar("repeticao");
    expect(semAcento.length).toBeGreaterThan(0);
    expect(semAcento.map((r) => r.chave)).toEqual(comAcento.map((r) => r.chave));
    expect(buscar("REPETICAO").map((r) => r.chave)).toEqual(semAcento.map((r) => r.chave));
  });

  it("põe quem tem a palavra no título antes de quem só a menciona no corpo", () => {
    // Sem esse desempate, a página que É sobre o assunto aparece no meio da
    // lista e o professor conclui que a busca não achou.
    const resultados = buscar("depuracao");
    expect(resultados.length).toBeGreaterThan(1);

    const primeiroSemTitulo = resultados.findIndex(
      (r) => !r.title.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes("depuracao"),
    );
    const ultimoComTitulo = resultados.reduce(
      (ultimo, r, i) =>
        r.title.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").includes("depuracao")
          ? i
          : ultimo,
      -1,
    );

    if (primeiroSemTitulo !== -1 && ultimoComTitulo !== -1) {
      expect(ultimoComTitulo).toBeLessThan(primeiroSemTitulo);
    }
  });

  it("procura no corpo, não só no título", () => {
    // "cadarço" não é título de nada: é o exemplo do dia a dia do primeiro
    // conceito. Quem lembra do exemplo e esqueceu o nome precisa achar.
    const achados = buscar("cadarco");
    expect(achados.map((r) => r.chave)).toContain(
      "conceito:o-que-e-pensamento-computacional",
    );
  });

  it("devolve lista vazia quando nada casa", () => {
    expect(buscar("xilofone quantico")).toEqual([]);
  });

  it("alcança as nove coleções ativas do site", () => {
    // O risco real é uma coleção ficar de fora do índice: a busca funciona,
    // parece completa, e some com um sétimo do conteúdo em silêncio.
    const tipos = new Set([
      ...buscar(CONCEPTS[0].title).map((r) => r.kind),
      ...buscar(ACTIVITIES[0].title).map((r) => r.kind),
      ...buscar(LESSON_PLANS[0].title).map((r) => r.kind),
      ...buscar(MICROBIT_PARTS[0].name).map((r) => r.kind),
      ...buscar(GLOSSARY[0].term).map((r) => r.kind),
      ...buscar(QUICK_HELP[0].problem).map((r) => r.kind),
      ...buscar(PREPARATION_MODULES[0].title).map((r) => r.kind),
      ...buscar(ROBOTICS_CONCEPTS[0].title).map((r) => r.kind),
      ...buscar(ROBOTICS_COMPONENTS[0].name).map((r) => r.kind),
    ]);

    for (const esperado of [
      "conceito",
      "atividade",
      "plano",
      "peca",
      "termo",
      "ajuda",
      "formacao",
      "robotica",
      "componente",
    ]) {
      expect(tipos, `faltou ${esperado}`).toContain(esperado);
    }
  });

  it("indexa todo o conteúdo publicado, sem sobra nem falta", () => {
    const total =
      CONCEPTS.length +
      ACTIVITIES.length +
      LESSON_PLANS.length +
      MICROBIT_PARTS.length +
      GLOSSARY.length +
      QUICK_HELP.length +
      PREPARATION_MODULES.length +
      ROBOTICS_CONCEPTS.length +
      ROBOTICS_COMPONENTS.length;
    expect(tamanhoDoIndice()).toBe(total);
  });

  it("toda entrada tem título, trecho e rota interna", () => {
    // Varre o índice inteiro através de uma consulta que casa com tudo pelo
    // corpo seria frágil; em vez disso confere o que a busca devolve para
    // vários termos comuns.
    const amostra = [...buscar("aula"), ...buscar("placa"), ...buscar("comando")];
    expect(amostra.length).toBeGreaterThan(10);

    for (const r of amostra) {
      expect(r.title.trim().length, r.chave).toBeGreaterThan(0);
      expect(r.trecho.trim().length, r.chave).toBeGreaterThan(0);
      expect(r.href.startsWith("/"), `${r.chave} → ${r.href}`).toBe(true);
    }
  });

  it("não devolve a mesma chave duas vezes", () => {
    const r = buscar("aula");
    expect(new Set(r.map((x) => x.chave)).size).toBe(r.length);
  });
});
