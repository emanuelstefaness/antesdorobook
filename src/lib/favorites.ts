import { ACTIVITIES } from "@/data/activities";
import { CONCEPTS } from "@/data/concepts";
import { LESSON_PLANS } from "@/data/lessonPlans";
import { TOPICS } from "@/data/trails";

export type FavoriteKind = "conceito" | "atividade" | "plano" | "assunto";

export type FavoriteItem = {
  chave: string;
  kind: FavoriteKind;
  label: string;
  href: string;
};

export const NOMES_DOS_TIPOS: Record<FavoriteKind, string> = {
  conceito: "Conceitos",
  atividade: "Atividades",
  plano: "Planos de aula",
  assunto: "Assuntos das trilhas",
};

/**
 * A chave salva carrega o tipo (`atividade:robo-humano`) porque os ids são
 * únicos só dentro de cada coleção — nada impede uma atividade e um plano de
 * se chamarem igual, e sem o prefixo o favorito apontaria para o lugar errado
 * no dia em que isso acontecesse.
 */
export function chaveDoFavorito(kind: FavoriteKind, id: string): string {
  return `${kind}:${id}`;
}

const CATALOGO: Record<FavoriteKind, { id: string; label: string; href: (id: string) => string }[]> =
  {
    conceito: CONCEPTS.map((c) => ({
      id: c.id,
      label: c.title,
      href: (id) => `/aprender/${id}`,
    })),
    atividade: ACTIVITIES.map((a) => ({
      id: a.id,
      label: a.title,
      href: (id) => `/praticar/${id}`,
    })),
    plano: LESSON_PLANS.map((p) => ({
      id: p.id,
      label: p.title,
      href: (id) => `/planejar/${id}`,
    })),
    assunto: TOPICS.map((t) => ({
      id: t.id,
      label: t.title,
      href: (id) => `/trilhas/${TOPICS.find((x) => x.id === id)?.trailId ?? ""}#${id}`,
    })),
  };

const TIPOS = Object.keys(CATALOGO) as FavoriteKind[];

/**
 * Devolve `null` para chave que não corresponde a nada.
 *
 * Isso não é defesa contra entrada maliciosa: os favoritos vivem no
 * localStorage do professor e sobrevivem a qualquer publicação. No dia em que
 * uma atividade for renomeada ou sair do ar, todo mundo que a tinha salva
 * carrega uma chave morta — e a página de favoritos precisa ignorá-la em
 * silêncio, não quebrar nem mostrar um link para lugar nenhum.
 */
export function resolverFavorito(chave: string): FavoriteItem | null {
  const separador = chave.indexOf(":");
  if (separador <= 0) return null;

  const kind = chave.slice(0, separador) as FavoriteKind;
  const id = chave.slice(separador + 1);
  if (!TIPOS.includes(kind) || id.length === 0) return null;

  const achado = CATALOGO[kind].find((x) => x.id === id);
  if (!achado) return null;

  return { chave, kind, label: achado.label, href: achado.href(id) };
}

/** Resolve a lista salva, descartando as chaves mortas e mantendo a ordem. */
export function resolverFavoritos(chaves: string[]): FavoriteItem[] {
  return chaves
    .map(resolverFavorito)
    .filter((item): item is FavoriteItem => item !== null);
}

export function favoritosDoTipo(itens: FavoriteItem[], kind: FavoriteKind): FavoriteItem[] {
  return itens.filter((i) => i.kind === kind);
}
