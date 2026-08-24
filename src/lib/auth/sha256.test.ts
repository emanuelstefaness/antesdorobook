import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { bytesUtf8, sha256Hex } from "./sha256";

/** A mesma conta, feita pela biblioteca do Node. É o gabarito. */
function referencia(texto: string): string {
  return createHash("sha256").update(texto, "utf8").digest("hex");
}

describe("sha256Hex", () => {
  it("bate com os vetores oficiais do NIST", () => {
    // Escritos à mão de propósito: se um dia a comparação com o node:crypto
    // for removida por engano, estes três ainda seguram o algoritmo.
    expect(sha256Hex("")).toBe(
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    );
    expect(sha256Hex("abc")).toBe(
      "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
    );
    expect(sha256Hex("abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq")).toBe(
      "248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1",
    );
  });

  it("bate com o node:crypto em entradas de todo tipo", () => {
    const casos = [
      "",
      "a",
      "senha",
      "antesdorobo2026",
      "Robótica começa antes do robô",
      "acentuação, cedilha e til: ção ãõ ÊÎ",
      "espaços   no   meio",
      "🤖 emoji fora do plano básico 🧩",
      "x".repeat(55), // um byte antes de precisar de um segundo bloco
      "x".repeat(56), // o caso que força o bloco extra só para o comprimento
      "x".repeat(57),
      "x".repeat(64),
      "x".repeat(1000),
    ];

    for (const caso of casos) {
      expect(sha256Hex(caso), `divergiu em ${JSON.stringify(caso.slice(0, 24))}`).toBe(
        referencia(caso),
      );
    }
  });

  it("devolve sempre 64 caracteres hexadecimais", () => {
    // Um dígito perdido no zero à esquerda passaria despercebido na
    // comparação de igualdade de senha, mas quebraria o formato.
    for (const caso of ["", "a", "b", "c", "d", "e", "f", "g"]) {
      expect(sha256Hex(caso)).toMatch(/^[0-9a-f]{64}$/);
    }
  });

  it("bytesUtf8 codifica cada faixa de tamanho corretamente", () => {
    expect(bytesUtf8("A")).toEqual([0x41]);
    expect(bytesUtf8("ç")).toEqual([0xc3, 0xa7]);
    expect(bytesUtf8("€")).toEqual([0xe2, 0x82, 0xac]);
    expect(bytesUtf8("🤖")).toEqual([0xf0, 0x9f, 0xa4, 0x96]);
    // Um emoji ocupa duas posições na string: se o par substituto não for
    // consumido de uma vez, saem bytes a mais e o hash inteiro muda.
    expect(bytesUtf8("🤖").length).toBe(4);
  });
});
