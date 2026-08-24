"use client";

import Link from "next/link";
import {
  NOMES_DOS_TIPOS,
  favoritosDoTipo,
  resolverFavoritos,
  type FavoriteKind,
} from "@/lib/favorites";
import { useFavorites, useHydrated } from "@/lib/useProgress";

const ORDEM: FavoriteKind[] = ["conceito", "atividade", "plano", "assunto"];

export function ListaDeFavoritos() {
  const hidratado = useHydrated();
  const { favorites, toggle } = useFavorites();

  // Antes da hidratação não dá para saber se a lista está vazia ou cheia.
  // Afirmar "você ainda não salvou nada" nessa hora seria mentir para quem
  // salvou trinta coisas.
  if (!hidratado) {
    return (
      <p className="font-sans text-[14px] leading-relaxed text-navy/65">Carregando seus favoritos…</p>
    );
  }

  const itens = resolverFavoritos(favorites);

  if (itens.length === 0) {
    return (
      <div className="max-w-[52ch]">
        <p className="font-sans text-[14px] leading-relaxed text-navy/80">
          Você ainda não salvou nada. Em qualquer conceito, atividade, plano de aula ou assunto de
          trilha existe um botão <strong className="font-bold text-navy">Salvar nos favoritos</strong>
          , e o que você marcar aparece aqui.
        </p>
        <p className="mt-4 font-sans text-[13px] leading-relaxed text-navy/70">
          A lista fica guardada só neste navegador, sem cadastro. Trocar de computador ou limpar os
          dados do navegador apaga.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p aria-live="polite" className="label-mono text-navy/65">
        {itens.length === 1 ? "1 item salvo" : `${itens.length} itens salvos`}
      </p>

      {ORDEM.map((kind) => {
        const doTipo = favoritosDoTipo(itens, kind);
        if (doTipo.length === 0) return null;

        return (
          <section key={kind} className="mt-10">
            <h2 className="label-mono text-navy/65">{NOMES_DOS_TIPOS[kind]}</h2>
            <ul className="mt-4 grid gap-x-8 gap-y-5 md:grid-cols-2">
              {doTipo.map((item) => (
                <li key={item.chave}>
                  <span aria-hidden className="block h-[2px] w-full bg-navy/15" />
                  <div className="mt-3 flex items-start justify-between gap-4">
                    <Link
                      href={item.href}
                      className="font-display text-[16px] font-extrabold leading-tight tracking-display underline-offset-4 hover:underline"
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => toggle(item.chave)}
                      className="min-h-[44px] shrink-0 font-sans text-[12px] font-bold uppercase tracking-[0.06em] text-navy underline"
                    >
                      Remover
                      <span className="sr-only"> {item.label} dos favoritos</span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
