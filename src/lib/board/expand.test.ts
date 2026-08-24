import { describe, expect, it } from "vitest";
import { contarPecas, expandir } from "./expand";

describe("expandir", () => {
  it("ignora INICIO e FIM, que são marcadores e não movimento", () => {
    const r = expandir(["INICIO", "AVANCE", "FIM"]);
    expect(r).toEqual({ ok: true, instrucoes: ["AVANCE"] });
  });

  it("repete o comando imediatamente seguinte, e só ele", () => {
    const r = expandir(["INICIO", "REPITA_3X", "AVANCE", "VIRE_DIREITA", "FIM"]);
    expect(r).toEqual({
      ok: true,
      instrucoes: ["AVANCE", "AVANCE", "AVANCE", "VIRE_DIREITA"],
    });
  });

  it("aceita 2x, 3x e 4x", () => {
    expect(expandir(["REPITA_2X", "AVANCE"])).toEqual({ ok: true, instrucoes: ["AVANCE", "AVANCE"] });
    expect(expandir(["REPITA_4X", "VIRE_ESQUERDA"])).toEqual({
      ok: true,
      instrucoes: ["VIRE_ESQUERDA", "VIRE_ESQUERDA", "VIRE_ESQUERDA", "VIRE_ESQUERDA"],
    });
  });

  it("rejeita um REPITA sem comando depois dele", () => {
    const r = expandir(["INICIO", "AVANCE", "REPITA_2X"]);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.erro.indice).toBe(2);
      expect(r.erro.mensagem).toContain("precisa de um comando logo depois");
    }
  });

  it("rejeita dois REPITA seguidos em vez de aninhar", () => {
    const r = expandir(["REPITA_2X", "REPITA_3X", "AVANCE"]);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.erro.indice).toBe(1);
      expect(r.erro.mensagem).toContain("um REPITA não pode repetir outro REPITA");
    }
  });

  it("rejeita repetir o marcador FIM", () => {
    const r = expandir(["REPITA_2X", "FIM"]);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.erro.indice).toBe(1);
  });

  it("fila vazia expande para nenhuma instrução, sem erro", () => {
    expect(expandir([])).toEqual({ ok: true, instrucoes: [] });
  });

  it("contarPecas conta as peças montadas, não as instruções expandidas", () => {
    expect(contarPecas(["INICIO", "REPITA_3X", "AVANCE", "FIM"])).toBe(2);
    expect(contarPecas(["INICIO", "AVANCE", "AVANCE", "AVANCE", "FIM"])).toBe(3);
  });
});
