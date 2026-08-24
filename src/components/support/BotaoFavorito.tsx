"use client";

import { useFavorites, useHydrated } from "@/lib/useProgress";
import { chaveDoFavorito, type FavoriteKind } from "@/lib/favorites";

/**
 * O rótulo muda entre "Salvar" e "Salvo", e é justamente por isso que ele não
 * pode ser desenhado antes da hidratação: o servidor não sabe o que tem no
 * localStorage deste professor, e renderizar "Salvar" para depois virar
 * "Salvo" sozinho é troca de conteúdo debaixo do olho de quem lê.
 */
export function BotaoFavorito({ kind, id }: { kind: FavoriteKind; id: string }) {
  const hidratado = useHydrated();
  const { toggle, isFavorite } = useFavorites();
  const chave = chaveDoFavorito(kind, id);
  const salvo = isFavorite(chave);

  // Espaço reservado com a mesma altura: sem isso a página pula quando o botão
  // aparece, e ele fica logo abaixo do título.
  if (!hidratado) return <div className="h-[44px]" />;

  return (
    <button
      type="button"
      aria-pressed={salvo}
      onClick={() => toggle(chave)}
      className={[
        "inline-flex min-h-[44px] items-center gap-2 rounded-block border-2 border-navy px-4 font-sans text-[12px] font-bold uppercase tracking-[0.06em]",
        salvo ? "bg-navy text-cream-hi" : "bg-transparent text-navy",
      ].join(" ")}
    >
      <span aria-hidden>{salvo ? "★" : "☆"}</span>
      {salvo ? "Salvo nos favoritos" : "Salvar nos favoritos"}
    </button>
  );
}
