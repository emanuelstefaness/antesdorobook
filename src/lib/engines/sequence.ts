export type PassoOrdenavel = {
  id: string;
  texto: string;
  /** Por que este passo precisa vir onde vem. É o que o professor lê ao errar. */
  porque: string;
};

export type ConferenciaDeOrdem =
  | { ok: true }
  | { ok: false; posicao: number; idEsperado: string; motivo: string };

/**
 * Compara a ordem montada com o gabarito e aponta a PRIMEIRA posição errada.
 * Apontar só a primeira é deliberado: corrigir um passo costuma reacomodar os
 * seguintes, e listar quatro erros de uma vez desencoraja quem está aprendendo.
 */
export function conferirOrdem(
  ordemAtual: string[],
  passos: PassoOrdenavel[],
): ConferenciaDeOrdem {
  if (ordemAtual.length !== passos.length) {
    // O acesso é defensivo de propósito: o tipo promete um passo em qualquer
    // índice, mas com gabarito vazio o runtime devolve undefined.
    const esperado = passos[ordemAtual.length] ?? passos[passos.length - 1];
    return {
      ok: false,
      posicao: Math.min(ordemAtual.length, Math.max(passos.length - 1, 0)),
      idEsperado: esperado?.id ?? "",
      motivo: esperado?.porque ?? "A sequência está incompleta.",
    };
  }

  for (let i = 0; i < passos.length; i++) {
    if (ordemAtual[i] !== passos[i].id) {
      return { ok: false, posicao: i, idEsperado: passos[i].id, motivo: passos[i].porque };
    }
  }

  return { ok: true };
}

/** Gerador congruente linear: pequeno, determinístico e sem dependência. */
function proximo(semente: number): number {
  return (semente * 1664525 + 1013904223) % 4294967296;
}

/**
 * Embaralha os passos de forma determinística. A mesma semente sempre devolve
 * a mesma ordem, para que recarregar a página não troque o exercício — e nunca
 * devolve a ordem correta, que entregaria a resposta de graça.
 */
export function embaralhar(passos: PassoOrdenavel[], semente: number): string[] {
  const ids = passos.map((p) => p.id);
  if (ids.length < 2) return ids;

  let estado = proximo(semente + 1);
  const fora = [...ids];

  for (let i = fora.length - 1; i > 0; i--) {
    estado = proximo(estado);
    const j = estado % (i + 1);
    [fora[i], fora[j]] = [fora[j], fora[i]];
  }

  // Se o embaralhamento caiu na ordem correta, troca os dois primeiros:
  // com dois ou mais passos isso garante uma ordem diferente do gabarito.
  const igual = fora.every((id, i) => id === ids[i]);
  if (igual) [fora[0], fora[1]] = [fora[1], fora[0]];

  return fora;
}
