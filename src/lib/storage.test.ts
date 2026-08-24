import { beforeEach, describe, expect, it, vi } from "vitest";
import { KEYS, addToList, readJSON, subscribe, toggleInList, writeJSON } from "./storage";

describe("storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("expõe as nove chaves com o prefixo adr:", () => {
    expect(Object.values(KEYS)).toEqual([
      "adr:etapa",
      "adr:concluidos",
      "adr:ultima-pagina",
      "adr:favoritos",
      "adr:atividades",
      "adr:planos",
      "adr:diagnostico",
      "adr:animacoes",
      "adr:acesso",
    ]);
  });

  it("devolve o fallback quando a chave não existe", () => {
    expect(readJSON(KEYS.favoritos, [])).toEqual([]);
  });

  it("devolve o fallback quando o JSON está corrompido", () => {
    window.localStorage.setItem(KEYS.favoritos, "{isso não é json");
    expect(readJSON(KEYS.favoritos, ["padrao"])).toEqual(["padrao"]);
  });

  it("grava e lê de volta", () => {
    writeJSON(KEYS.concluidos, ["aprender:algoritmos"]);
    expect(readJSON<string[]>(KEYS.concluidos, [])).toEqual(["aprender:algoritmos"]);
  });

  it("addToList não duplica", () => {
    addToList(KEYS.concluidos, "aprender:abstracao");
    const lista = addToList(KEYS.concluidos, "aprender:abstracao");
    expect(lista).toEqual(["aprender:abstracao"]);
  });

  it("toggleInList adiciona e remove", () => {
    expect(toggleInList(KEYS.favoritos, "praticar:robo-humano")).toEqual([
      "praticar:robo-humano",
    ]);
    expect(toggleInList(KEYS.favoritos, "praticar:robo-humano")).toEqual([]);
  });

  it("devolve o fallback e não escreve quando não há window (render no servidor)", () => {
    vi.stubGlobal("window", undefined);
    expect(readJSON(KEYS.favoritos, ["padrao"])).toEqual(["padrao"]);
    expect(() => writeJSON(KEYS.favoritos, ["novo"])).not.toThrow();
    vi.unstubAllGlobals();
  });

  it("não lança quando o navegador bloqueia a escrita", () => {
    const espiao = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("QuotaExceededError");
    });
    expect(() => writeJSON(KEYS.favoritos, ["novo"])).not.toThrow();
    espiao.mockRestore();
  });

  it("devolve o fallback quando o navegador bloqueia a leitura", () => {
    const espiao = vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new DOMException("SecurityError");
    });
    expect(readJSON(KEYS.favoritos, ["padrao"])).toEqual(["padrao"]);
    espiao.mockRestore();
  });

  it("avisa os inscritos a cada gravação, e para depois de cancelar", () => {
    let chamadas = 0;
    const cancelar = subscribe(() => {
      chamadas += 1;
    });

    writeJSON(KEYS.favoritos, ["a"]);
    expect(chamadas).toBe(1);

    addToList(KEYS.concluidos, "aprender:decomposicao");
    expect(chamadas).toBe(2);

    cancelar();
    writeJSON(KEYS.favoritos, ["b"]);
    expect(chamadas).toBe(2);
  });
});
