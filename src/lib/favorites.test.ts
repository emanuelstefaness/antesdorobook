import { describe, expect, it } from "vitest";
import { ACTIVITIES } from "@/data/activities";
import { CONCEPTS } from "@/data/concepts";
import { LESSON_PLANS } from "@/data/lessonPlans";
import { TOPICS } from "@/data/trails";
import { chaveDoFavorito, resolverFavorito, resolverFavoritos } from "./favorites";
import type { FavoriteKind } from "./favorites";

describe("resolverFavorito", () => {
  it("resolve uma chave de cada tipo para o título e a rota certos", () => {
    const atividade = resolverFavorito(chaveDoFavorito("atividade", ACTIVITIES[0].id));
    expect(atividade).toEqual({
      chave: `atividade:${ACTIVITIES[0].id}`,
      kind: "atividade",
      label: ACTIVITIES[0].title,
      href: `/praticar/${ACTIVITIES[0].id}`,
    });

    const plano = resolverFavorito(chaveDoFavorito("plano", LESSON_PLANS[0].id));
    expect(plano?.href).toBe(`/planejar/${LESSON_PLANS[0].id}`);
  });

  it("leva o assunto para a trilha dele, não para uma rota própria", () => {
    // Assunto não tem página só dele: ele é uma âncora dentro da trilha.
    const assunto = TOPICS[3];
    const item = resolverFavorito(chaveDoFavorito("assunto", assunto.id));
    expect(item?.href).toBe(`/trilhas/${assunto.trailId}#${assunto.id}`);
  });

  it("devolve null para chave de conteúdo que não existe mais", () => {
    // O caso real: o professor salvou, a atividade foi renomeada, a chave
    // continua no localStorage dele para sempre.
    expect(resolverFavorito("atividade:atividade-que-foi-removida")).toBeNull();
  });

  it("devolve null para chave malformada", () => {
    expect(resolverFavorito("")).toBeNull();
    expect(resolverFavorito("sem-separador")).toBeNull();
    expect(resolverFavorito(":sem-tipo")).toBeNull();
    expect(resolverFavorito("atividade:")).toBeNull();
    expect(resolverFavorito("tipo-inventado:robo-humano")).toBeNull();
  });

  it("não confunde tipos quando o id existe em outra coleção", () => {
    // Prova que o prefixo é usado de verdade e não é enfeite: pedir um id de
    // atividade como se fosse plano não pode devolver a atividade.
    const idDeAtividade = ACTIVITIES[0].id;
    expect(resolverFavorito(`plano:${idDeAtividade}`)).toBeNull();
  });

  it("todo conteúdo publicado pode ser salvo e recuperado", () => {
    // Percorre o catálogo inteiro em vez de amostrar: um tipo que ficasse de
    // fora do resolvedor viraria um botão de salvar que não salva nada, e isso
    // não aparece testando só o primeiro item de cada lista.
    const tudo: Array<[FavoriteKind, string, string]> = [
      ...CONCEPTS.map((c) => ["conceito" as const, c.id, c.title] as [FavoriteKind, string, string]),
      ...ACTIVITIES.map((a) => ["atividade" as const, a.id, a.title] as [FavoriteKind, string, string]),
      ...LESSON_PLANS.map((p) => ["plano" as const, p.id, p.title] as [FavoriteKind, string, string]),
      ...TOPICS.map((t) => ["assunto" as const, t.id, t.title] as [FavoriteKind, string, string]),
    ];

    expect(tudo.length).toBeGreaterThan(50);
    for (const [kind, id, title] of tudo) {
      const item = resolverFavorito(chaveDoFavorito(kind, id));
      expect(item?.label, `${kind}:${id}`).toBe(title);
      expect(item?.href.startsWith("/"), `${kind}:${id}`).toBe(true);
    }
  });
});

describe("resolverFavoritos", () => {
  it("descarta as chaves mortas e mantém a ordem em que foram salvas", () => {
    const itens = resolverFavoritos([
      chaveDoFavorito("plano", LESSON_PLANS[1].id),
      "atividade:isto-nao-existe",
      chaveDoFavorito("atividade", ACTIVITIES[2].id),
    ]);

    expect(itens.map((i) => i.label)).toEqual([LESSON_PLANS[1].title, ACTIVITIES[2].title]);
  });

  it("devolve lista vazia sem favorito nenhum", () => {
    expect(resolverFavoritos([])).toEqual([]);
  });
});
