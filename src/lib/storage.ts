export const KEYS = {
  etapa: "adr:etapa",
  concluidos: "adr:concluidos",
  ultimaPagina: "adr:ultima-pagina",
  favoritos: "adr:favoritos",
  atividades: "adr:atividades",
  planos: "adr:planos",
  diagnostico: "adr:diagnostico",
  animacoes: "adr:animacoes",
  acesso: "adr:acesso",
} as const;

const ouvintes = new Set<() => void>();

/** Assina mudanças de progresso. Devolve a função que cancela a assinatura. */
export function subscribe(ouvinte: () => void): () => void {
  ouvintes.add(ouvinte);
  return () => {
    ouvintes.delete(ouvinte);
  };
}

function notificar(): void {
  for (const ouvinte of ouvintes) ouvinte();
}

export function readJSON<T>(key: string, fallback: T): T {
  try {
    if (typeof window === "undefined" || !window.localStorage) return fallback;
    const bruto = window.localStorage.getItem(key);
    if (bruto === null) return fallback;
    return JSON.parse(bruto) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(key, JSON.stringify(value));
    notificar();
  } catch {
    // sem window, cota estourada, modo privado ou storage bloqueado pelo navegador:
    // o progresso é auxiliar e nunca pode impedir o professor de navegar
  }
}

export function addToList(key: string, id: string): string[] {
  const atual = readJSON<string[]>(key, []);
  if (atual.includes(id)) return atual;
  const proximo = [...atual, id];
  writeJSON(key, proximo);
  return proximo;
}

export function toggleInList(key: string, id: string): string[] {
  const atual = readJSON<string[]>(key, []);
  const proximo = atual.includes(id) ? atual.filter((x) => x !== id) : [...atual, id];
  writeJSON(key, proximo);
  return proximo;
}
