import { describe, expect, it } from "vitest";
import { conferirOrdem, embaralhar, type PassoOrdenavel } from "./sequence";

const passos: PassoOrdenavel[] = [
  { id: "pegar-pao", texto: "Pegar duas fatias de pão", porque: "Sem o pão não há onde passar nada." },
  { id: "passar", texto: "Passar o recheio numa fatia", porque: "O recheio vai na fatia aberta, antes de fechar." },
  { id: "fechar", texto: "Fechar com a outra fatia", porque: "Fechar antes de rechear deixa o recheio de fora." },
  { id: "cortar", texto: "Cortar ao meio", porque: "Cortar só faz sentido com o sanduíche montado." },
];

const ids = passos.map((p) => p.id);

describe("conferirOrdem", () => {
  it("aceita a ordem correta", () => {
    expect(conferirOrdem(ids, passos)).toEqual({ ok: true });
  });

  it("aponta a primeira posição errada e explica com o porquê do passo esperado", () => {
    const r = conferirOrdem(["pegar-pao", "fechar", "passar", "cortar"], passos);
    expect(r).toEqual({
      ok: false,
      posicao: 1,
      idEsperado: "passar",
      motivo: "O recheio vai na fatia aberta, antes de fechar.",
    });
  });

  it("aponta a posição 0 quando o primeiro passo já está errado", () => {
    const r = conferirOrdem(["cortar", "pegar-pao", "passar", "fechar"], passos);
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.posicao).toBe(0);
      expect(r.idEsperado).toBe("pegar-pao");
    }
  });

  it("uma lista vazia está trivialmente em ordem", () => {
    expect(conferirOrdem([], [])).toEqual({ ok: true });
  });

  it("uma ordem de tamanho diferente do gabarito não é aceita", () => {
    expect(conferirOrdem(["pegar-pao", "passar"], passos).ok).toBe(false);

    // O caso longo é o que discrimina de verdade: os quatro passos batem com o
    // gabarito e só o excedente denuncia o erro, então sem conferir o tamanho
    // a sequência passaria por correta.
    const comSobra = conferirOrdem([...ids, "cortar"], passos);
    expect(comSobra.ok).toBe(false);
  });
});

describe("embaralhar", () => {
  it("devolve exatamente os mesmos ids, sem perder nem duplicar", () => {
    const fora = embaralhar(passos, 7);
    expect([...fora].sort()).toEqual([...ids].sort());
  });

  it("é determinístico: a mesma semente dá a mesma ordem", () => {
    expect(embaralhar(passos, 42)).toEqual(embaralhar(passos, 42));
  });

  it("nunca devolve a ordem já correta", () => {
    // varre muitas sementes: nenhuma pode entregar o exercício resolvido
    for (let s = 0; s < 60; s++) {
      expect(embaralhar(passos, s), `semente ${s}`).not.toEqual(ids);
    }
  });

  it("com um único passo, devolve esse passo em vez de travar procurando outra ordem", () => {
    const um = [passos[0]];
    expect(embaralhar(um, 3)).toEqual(["pegar-pao"]);
  });
});
