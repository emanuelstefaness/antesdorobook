import { describe, expect, it } from "vitest";
import { ehFalha, mensagemDe } from "./feedback";

describe("mensagemDe", () => {
  it("vitória no mínimo de peças elogia a otimização", () => {
    const m = mensagemDe({ tipo: "vitoria", pecas: 4, minimo: 4 });
    expect(m.tom).toBe("acerto");
    expect(m.conceito).toContain("Algoritmo");
    expect(m.texto).toContain("4");
  });

  it("vitória sem mínimo declarado (desafio livre) não sugere menos peças", () => {
    const m = mensagemDe({ tipo: "vitoria", pecas: 7, minimo: null });
    expect(m.tom).toBe("acerto");
    expect(m.conceito).toContain("Algoritmo");
    expect(m.texto).not.toContain("mínimo");
    // O título também não pode elogiar o caminho: sem `minimo` o motor não sabe
    // se existe um mais curto. No editor de desafios o professor resolve o
    // próprio cenário com folga e lia "e no menor caminho" — um elogio falso.
    expect(m.titulo).not.toContain("menor caminho");
  });

  it("vitória com peças sobrando aponta o caminho da repetição", () => {
    const m = mensagemDe({ tipo: "vitoria", pecas: 7, minimo: 4 });
    expect(m.tom).toBe("atencao");
    expect(m.conceito).toContain("Repetição");
    expect(m.texto).toContain("4");
  });

  it("bater em obstáculo fala de depuração, não de fracasso", () => {
    const m = mensagemDe({ tipo: "falha", evento: { tipo: "bateu-obstaculo" } });
    expect(m.tom).toBe("erro");
    expect(m.conceito).toContain("Depuração");
  });

  it("baú trancado nomeia a ordem dos passos", () => {
    const m = mensagemDe({ tipo: "falha", evento: { tipo: "bau-trancado" } });
    expect(m.conceito).toContain("Sequência");
    expect(m.texto).toContain("chave");
  });

  it("sair do tabuleiro fala de instrução precisa", () => {
    const m = mensagemDe({ tipo: "falha", evento: { tipo: "saiu-do-tabuleiro" } });
    expect(m.conceito).toContain("Instrução");
  });

  it("acabar a fila sem chegar convida a testar de novo", () => {
    const m = mensagemDe({ tipo: "terminou-sem-chegar" });
    expect(m.tom).toBe("atencao");
    expect(m.conceito).toContain("Teste");
  });

  it("toda mensagem tem título, texto e conceito preenchidos", () => {
    const casos = [
      mensagemDe({ tipo: "vitoria", pecas: 4, minimo: 4 }),
      mensagemDe({ tipo: "vitoria", pecas: 9, minimo: 4 }),
      mensagemDe({ tipo: "falha", evento: { tipo: "bateu-obstaculo" } }),
      mensagemDe({ tipo: "falha", evento: { tipo: "saiu-do-tabuleiro" } }),
      mensagemDe({ tipo: "falha", evento: { tipo: "bau-trancado" } }),
      mensagemDe({ tipo: "terminou-sem-chegar" }),
    ];
    for (const m of casos) {
      expect(m.titulo.length).toBeGreaterThan(0);
      expect(m.texto.length).toBeGreaterThan(0);
      expect(m.conceito.length).toBeGreaterThan(0);
    }
  });

  it("ehFalha separa os eventos que interrompem dos que são passo normal", () => {
    expect(ehFalha({ tipo: "bateu-obstaculo" })).toBe(true);
    expect(ehFalha({ tipo: "saiu-do-tabuleiro" })).toBe(true);
    expect(ehFalha({ tipo: "bau-trancado" })).toBe(true);
    expect(ehFalha({ tipo: "andou" })).toBe(false);
    expect(ehFalha({ tipo: "girou" })).toBe(false);
    expect(ehFalha({ tipo: "pegou-chave" })).toBe(false);
    expect(ehFalha({ tipo: "abriu-bau" })).toBe(false);
  });
});
