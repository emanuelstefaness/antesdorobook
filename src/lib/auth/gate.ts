import { KEYS, readJSON, writeJSON } from "@/lib/storage";
import { sha256Hex } from "./sha256";

/**
 * Login e senha únicos e compartilhados, guardados como SHA-256 para não
 * aparecerem em texto puro dentro do pacote JavaScript.
 *
 * O que isto é: um portão para material fechado a convidados. `proxy.ts`
 * confere o cookie de sessão (derivado destes dois hashes) contra cada
 * request, no servidor — então não basta abrir as ferramentas do navegador e
 * revelar o HTML para contornar (diferente do portão anterior, que era só
 * client-side).
 *
 * O que isto NÃO é: autenticação de verdade. É um par único de login e senha
 * para todo mundo, sem conta por pessoa, e cada hash pode ser quebrado por
 * tentativa e erro com uma lista de palavras. Nunca colocar aqui dado de
 * aluno, nota, ou qualquer coisa que precise mesmo ficar protegida: para isso
 * seria necessário login por usuário de verdade.
 *
 * Hash de login: turvo2026
 * Hash de senha: pensamentocomputacional
 * Para trocar: gere o SHA-256 do novo valor (minúsculo, sem espaço nas
 * pontas) e substitua a constante abaixo — ex.: no Node,
 * `crypto.createHash("sha256").update("o novo valor").digest("hex")`.
 */
export const HASH_DO_LOGIN = "a5e3359ce4f803133ae4450792576247b93becb974ddcf679bca94ece3c81426";
export const HASH_DA_SENHA = "855cce35b5187c7046cffeaa0245b29b1b74a48b8dda51716baf1a79f1a40954";

/**
 * O teclado do celular coloca maiúscula na primeira letra sozinho, e copiar e
 * colar arrasta espaço. Um login ou senha combinados por mensagem entre
 * professores seriam recusados por causa disso — e a pessoa não teria como
 * adivinhar o motivo, porque o valor digitado "está certo".
 */
export function normalizarSenha(digitada: string): string {
  return digitada.trim().toLowerCase();
}

export function loginCorreto(digitado: string): boolean {
  const normalizado = normalizarSenha(digitado);
  if (normalizado.length === 0) return false;
  return sha256Hex(normalizado) === HASH_DO_LOGIN;
}

export function senhaCorreta(digitada: string): boolean {
  const normalizada = normalizarSenha(digitada);
  if (normalizada.length === 0) return false;
  return sha256Hex(normalizada) === HASH_DA_SENHA;
}

/**
 * O que fica salvo é o hash do login+senha aceitos, e não um `true`. Assim,
 * quando um dos dois for trocado, quem já tinha entrado volta a encontrar o
 * portão — um `true` deixaria todo mundo dentro para sempre, e trocar a
 * credencial não teria efeito nenhum sobre quem já a conhecia.
 */
export const HASH_DA_SESSAO = `${HASH_DO_LOGIN}:${HASH_DA_SENHA}`;

export function acessoLiberado(): boolean {
  return readJSON<string | null>(KEYS.acesso, null) === HASH_DA_SESSAO;
}

export function liberarAcesso(): void {
  writeJSON(KEYS.acesso, HASH_DA_SESSAO);
}

export function trancarAcesso(): void {
  writeJSON(KEYS.acesso, null);
}
