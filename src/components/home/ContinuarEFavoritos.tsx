"use client";

import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { resolverFavoritos } from "@/lib/favorites";
import { useFavorites, useHydrated, useLastPage } from "@/lib/useProgress";
import { Card } from "@/components/ui/Card";

/**
 * "Continue de onde parou" usa o único dado real que existe para isso — a
 * última página guardada, não um histórico (o site não guarda histórico).
 * Favoritos recentes reaproveita a mesma resolução usada em /favoritos. Se
 * não houver nem uma coisa nem outra, a seção inteira não aparece: melhor
 * um vazio silencioso do que um bloco de dashboard sem nada dentro.
 */
export function ContinuarEFavoritos() {
  const hidratado = useHydrated();
  const { last } = useLastPage();
  const { favorites } = useFavorites();

  if (!hidratado) return null;

  const favoritosRecentes = resolverFavoritos(favorites).slice(0, 3);
  if (!last && favoritosRecentes.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-10">
      <div className="grid gap-5 md:grid-cols-2">
        {last ? (
          <Card faixa realce="cyan">
            <span className="label-mono text-navy/50">Continue de onde parou</span>
            <Link
              href={last.href}
              className="group mt-2 flex items-center justify-between gap-3 rounded-card-sm"
            >
              <span className="font-display text-[16px] font-extrabold leading-tight tracking-display group-hover:underline">
                {last.label}
              </span>
              <ArrowRight
                size={18}
                className="shrink-0 text-navy/40 transition-transform group-hover:translate-x-1 group-hover:text-navy"
                aria-hidden
              />
            </Link>
          </Card>
        ) : null}

        {favoritosRecentes.length > 0 ? (
          <Card faixa realce="amber">
            <div className="flex items-center gap-2">
              <Star size={16} className="text-amber" aria-hidden />
              <span className="label-mono text-navy/50">Favoritos recentes</span>
            </div>
            <ul className="mt-2 flex flex-col gap-1.5">
              {favoritosRecentes.map((item) => (
                <li key={item.chave}>
                  <Link
                    href={item.href}
                    className="block rounded-card-sm py-1 font-sans text-[13.5px] font-semibold text-navy hover:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/favoritos"
              className="mt-3 inline-block font-sans text-[12px] font-bold uppercase tracking-[0.06em] text-navy underline underline-offset-4"
            >
              Ver todos
            </Link>
          </Card>
        ) : null}
      </div>
    </section>
  );
}
