import { KEYS, readJSON, writeJSON } from "@/lib/storage";
import { sha256Hex } from "./sha256";

/**
 * Senha única compartilhada, guardada como SHA-256 para não aparecer em texto
 * puro dentro do pacote JavaScript.
 *
 * O que isto é: um portão para material em preparação, que evita que o
 * endereço circule e o site seja lido por quem chegou nele por acaso.
 *
 * O que isto NÃO é: segurança. O site é estático e roda inteiro no navegador
 * do visitante — não existe servidor conferindo nada. Quem abrir as
 * ferramentas do navegador contorna o portão, e este hash pode ser quebrado
 * por tentativa e erro com uma lista de palavras. Nunca colocar aqui dado de
 * aluno, nota, ou qualquer coisa que precise mesmo ficar protegida: para isso
 * seria necessário um backend com autenticação de verdade.
 *
 * Hash de: pensamentocomputacional
 * Para trocar a senha: gere o SHA-256 da nova senha (minúscula, sem espaço
 * nas pontas) e substitua a constante abaixo — ex.: no Node,
 * `crypto.createHash("sha256").update("a nova senha").digest("hex")`.
 */
export const HASH_DA_SENHA = "855cce35b5187c7046cffeaa0245b29b1b74a48b8dda51716baf1a79f1a40954";

/**
 * O teclado do celular coloca maiúscula na primeira letra sozinho, e copiar e
 * colar arrasta espaço. Uma senha combinada por mensagem entre professores
 * seria recusada por causa disso — e a pessoa não teria como adivinhar o
 * motivo, porque a senha "está certa".
 */
export function normalizarSenha(digitada: string): string {
  return digitada.trim().toLowerCase();
}

export function senhaCorreta(digitada: string): boolean {
  const normalizada = normalizarSenha(digitada);
  if (normalizada.length === 0) return false;
  return sha256Hex(normalizada) === HASH_DA_SENHA;
}

/**
 * O que fica salvo é o hash da senha aceita, e não um `true`. Assim, quando a
 * senha for trocada, quem já tinha entrado volta a encontrar o portão — um
 * `true` deixaria todo mundo dentro para sempre, e trocar a senha não teria
 * efeito nenhum sobre quem já a conhecia.
 */
export function acessoLiberado(): boolean {
  return readJSON<string | null>(KEYS.acesso, null) === HASH_DA_SENHA;
}

export function liberarAcesso(): void {
  writeJSON(KEYS.acesso, HASH_DA_SENHA);
}

export function trancarAcesso(): void {
  writeJSON(KEYS.acesso, null);
}
