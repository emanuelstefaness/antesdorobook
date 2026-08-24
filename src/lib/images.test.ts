import { describe, expect, it } from "vitest";
import { OBJETOS, caminhoImagem } from "./images";

describe("caminhoImagem", () => {
  it("prefixa o caminho curto usado nos arquivos de conteúdo", () => {
    expect(caminhoImagem("praticar/robo-humano.jpg")).toBe("/imagens/praticar/robo-humano.jpg");
  });

  it("não duplica o prefixo de um caminho já absoluto", () => {
    expect(caminhoImagem("/imagens/objetos/robo.png")).toBe("/imagens/objetos/robo.png");
  });

  it("tolera barra sobrando no começo", () => {
    expect(caminhoImagem("/praticar/robo-humano.jpg")).toBe("/imagens/praticar/robo-humano.jpg");
  });

  it("todos os objetos 3D resolvem para um caminho válido e único", () => {
    const caminhos = Object.values(OBJETOS).map((o) => caminhoImagem(o.src));
    expect(caminhos.every((c) => c.startsWith("/imagens/objetos/"))).toBe(true);
    expect(new Set(caminhos).size).toBe(caminhos.length);
  });
});
