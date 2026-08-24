import { beforeEach, describe, expect, it } from "vitest";
import { KEYS, readJSON, writeJSON } from "@/lib/storage";
import {
  HASH_DA_SENHA,
  acessoLiberado,
  liberarAcesso,
  normalizarSenha,
  senhaCorreta,
  trancarAcesso,
} from "./gate";
import { sha256Hex } from "./sha256";

const SENHA = "antesdorobo2026";

describe("normalizarSenha", () => {
  it("perdoa o que o teclado do celular faz sozinho", () => {
    // Maiúscula automática na primeira letra e espaço arrastado pelo colar.
    expect(normalizarSenha("Antesdorobo2026")).toBe(SENHA);
    expect(normalizarSenha("  antesdorobo2026  ")).toBe(SENHA);
    expect(normalizarSenha("ANTESDOROBO2026")).toBe(SENHA);
    expect(normalizarSenha(" AntesDoRobo2026\n")).toBe(SENHA);
  });

  it("não mexe no meio da senha", () => {
    // Só as pontas e a caixa: tirar espaço interno faria "a b" e "ab"
    // valerem a mesma coisa, o que ninguém espera de um campo de senha.
    expect(normalizarSenha("duas palavras")).toBe("duas palavras");
  });
});

describe("senhaCorreta", () => {
  it("aceita a senha combinada, com ou sem os deslizes de digitação", () => {
    expect(senhaCorreta(SENHA)).toBe(true);
    expect(senhaCorreta("Antesdorobo2026")).toBe(true);
    expect(senhaCorreta("  ANTESDOROBO2026 ")).toBe(true);
  });

  it("recusa senha errada, vazia ou quase certa", () => {
    expect(senhaCorreta("")).toBe(false);
    expect(senhaCorreta("   ")).toBe(false);
    expect(senhaCorreta("antesdorobo")).toBe(false);
    expect(senhaCorreta("antesdorobo2025")).toBe(false);
    expect(senhaCorreta("antes do robo 2026")).toBe(false);
    expect(senhaCorreta(HASH_DA_SENHA)).toBe(false);
  });

  it("a constante publicada é mesmo o hash da senha", () => {
    // Se alguém trocar a senha e esquecer de gerar o hash de novo, o portão
    // trancaria para todo mundo, inclusive para quem sabe a senha.
    expect(HASH_DA_SENHA).toBe(sha256Hex(SENHA));
    expect(HASH_DA_SENHA).toMatch(/^[0-9a-f]{64}$/);
  });

  it("não guarda a senha em texto puro em lugar nenhum do módulo", () => {
    // O ganho do hash é justamente este: quem abrir o pacote JavaScript não
    // encontra a senha procurando por ela.
    expect(HASH_DA_SENHA.includes(SENHA)).toBe(false);
  });
});

describe("estado do acesso", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("começa trancado", () => {
    expect(acessoLiberado()).toBe(false);
  });

  it("libera e permanece liberado", () => {
    liberarAcesso();
    expect(acessoLiberado()).toBe(true);
    expect(readJSON<string | null>(KEYS.acesso, null)).toBe(HASH_DA_SENHA);
  });

  it("tranca de novo quando pedido", () => {
    liberarAcesso();
    trancarAcesso();
    expect(acessoLiberado()).toBe(false);
  });

  it("um acesso antigo perde a validade quando a senha muda", () => {
    // Simula quem entrou com a senha anterior: o valor guardado é o hash
    // daquela senha, não um "true", então ele deixa de bater.
    writeJSON(KEYS.acesso, sha256Hex("senha-antiga"));
    expect(acessoLiberado()).toBe(false);
  });

  it("lixo no armazenamento não abre o portão", () => {
    for (const valor of [true, 1, "sim", { hash: HASH_DA_SENHA }, [HASH_DA_SENHA]]) {
      writeJSON(KEYS.acesso, valor);
      expect(acessoLiberado(), `${JSON.stringify(valor)} abriu o portão`).toBe(false);
    }

    window.localStorage.setItem(KEYS.acesso, "{isto não é json");
    expect(acessoLiberado()).toBe(false);
  });
});
