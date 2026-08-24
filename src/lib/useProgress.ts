"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { KEYS, addToList, readJSON, subscribe, toggleInList, writeJSON } from "./storage";
import { computeJourney, nextStage, overallPercent } from "./journey";

const observarHidratacao = () => () => {};

export function useHydrated(): boolean {
  return useSyncExternalStore(observarHidratacao, () => true, () => false);
}

export function useJourney() {
  const hydrated = useHydrated();
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    const ler = () => setDone(readJSON<string[]>(KEYS.concluidos, []));
    ler();
    return subscribe(ler);
  }, []);

  const markDone = useCallback((id: string) => {
    addToList(KEYS.concluidos, id);
  }, []);

  const isDone = useCallback((id: string) => done.includes(id), [done]);

  return {
    hydrated,
    stages: computeJourney(done),
    percent: overallPercent(done),
    next: nextStage(done),
    markDone,
    isDone,
  };
}

export function useLastPage() {
  const [last, setLast] = useState<{ href: string; label: string } | null>(null);

  useEffect(() => {
    const ler = () =>
      setLast(readJSON<{ href: string; label: string } | null>(KEYS.ultimaPagina, null));
    ler();
    return subscribe(ler);
  }, []);

  const remember = useCallback((href: string, label: string) => {
    writeJSON(KEYS.ultimaPagina, { href, label });
  }, []);

  return { last, remember };
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const ler = () => setFavorites(readJSON<string[]>(KEYS.favoritos, []));
    ler();
    return subscribe(ler);
  }, []);

  const toggle = useCallback((id: string) => {
    toggleInList(KEYS.favoritos, id);
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggle, isFavorite };
}

export function useReducedAnimations() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // O atributo data-animacoes já chega resolvido (escolha salva vence a
    // preferência do sistema, que é só o padrão) via o script bloqueante do
    // layout ou via o próprio toggle abaixo — este efeito só espelha o
    // atributo no estado do React, do mesmo jeito que o toggle já lê para
    // decidir o próximo valor. Ler só aqui (nunca durante o render) mantém a
    // leitura do DOM segura para hidratação.
    const aplicar = () => {
      setReduced(document.documentElement.dataset.animacoes === "reduzidas");
    };

    aplicar();
    return subscribe(aplicar);
  }, []);

  const toggle = useCallback(() => {
    const aplicadoAgora = document.documentElement.dataset.animacoes === "reduzidas";
    const proximo = aplicadoAgora ? "completas" : "reduzidas";
    document.documentElement.dataset.animacoes = proximo;
    writeJSON(KEYS.animacoes, proximo);
  }, []);

  return { reduced, toggle };
}
