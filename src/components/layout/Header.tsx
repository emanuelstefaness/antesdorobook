"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, Search } from "lucide-react";
import { buscar, MINIMO_DA_CONSULTA, NOMES_DOS_RESULTADOS } from "@/lib/search";
import { useJourney } from "@/lib/useProgress";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { JourneyPanel } from "@/components/journey/JourneyPanel";

/**
 * Não existe sino de notificações aqui de propósito: o site não tem nenhuma
 * fonte real de notificação (sem backend, sem conta por professor). Um sino
 * com contador fixo seria exatamente o tipo de botão decorativo que este
 * projeto proíbe — busca e progresso são reais, ficam; notificação fake, não.
 */
export function Header({ aoAbrirMenu }: { aoAbrirMenu: () => void }) {
  const { hydrated, percent } = useJourney();
  const [jornadaAberta, setJornadaAberta] = useState(false);
  const [consulta, setConsulta] = useState("");
  const [aberta, setAberta] = useState(false);
  const caixaRef = useRef<HTMLDivElement>(null);

  const resultados = buscar(consulta).slice(0, 6);
  const curta = consulta.trim().length > 0 && consulta.trim().length < MINIMO_DA_CONSULTA;

  useEffect(() => {
    if (!aberta) return;
    const aoClicarFora = (evento: MouseEvent) => {
      if (caixaRef.current && !caixaRef.current.contains(evento.target as Node)) {
        setAberta(false);
      }
    };
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") setAberta(false);
    };
    document.addEventListener("mousedown", aoClicarFora);
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("mousedown", aoClicarFora);
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberta]);

  return (
    <header className="no-print sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-navy/8 bg-cream-hi/92 px-3 backdrop-blur-xl md:h-[72px] md:gap-4 md:px-8">
      <button
        type="button"
        onClick={aoAbrirMenu}
        aria-label="Abrir menu"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-card-sm text-navy md:hidden"
      >
        <Menu size={20} aria-hidden />
      </button>

      <div ref={caixaRef} className="relative w-full max-w-[570px] md:mx-auto">
        <Search
          size={17}
          aria-hidden
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40"
        />
        <input
          type="search"
          value={consulta}
          onChange={(e) => {
            setConsulta(e.target.value);
            setAberta(true);
          }}
          onFocus={() => setAberta(true)}
          placeholder="Buscar no portal…"
          aria-label="Buscar em todo o site"
          className="min-h-[44px] w-full rounded-xl border border-navy/10 bg-white/92 py-2 pl-10 pr-3 font-sans text-[13px] text-navy shadow-[0_5px_18px_rgba(11,31,58,.06)] placeholder:text-navy/42 focus-visible:border-cyan md:min-h-[48px] md:pl-11 md:pr-4 md:text-[13.5px]"
        />

        {aberta && consulta.trim().length > 0 ? (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] max-h-[70vh] overflow-y-auto rounded-card border border-navy/10 bg-cream-hi p-2 shadow-panel">
            {curta ? (
              <p className="px-3 py-3 font-sans text-[13px] text-navy/60">
                Escreva pelo menos {MINIMO_DA_CONSULTA} letras.
              </p>
            ) : resultados.length === 0 ? (
              <p className="px-3 py-3 font-sans text-[13px] text-navy/60">
                Nada encontrado com essa palavra.
              </p>
            ) : (
              <ul>
                {resultados.map((r) => (
                  <li key={r.chave}>
                    <Link
                      href={r.href}
                      onClick={() => setAberta(false)}
                      className="flex flex-col gap-0.5 rounded-card-sm px-3 py-2.5 hover:bg-navy/5"
                    >
                      <span className="font-mono text-[10px] font-bold uppercase tracking-label text-navy/45">
                        {NOMES_DOS_RESULTADOS[r.kind]}
                      </span>
                      <span className="font-sans text-[13.5px] font-semibold text-navy">
                        {r.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => setJornadaAberta(true)}
        aria-label={hydrated ? `Sua jornada: ${percent}% concluída` : "Sua jornada"}
        className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-navy/5"
      >
        {hydrated ? (
          <ProgressRing percent={percent} size={34} />
        ) : (
          <span aria-hidden className="h-8 w-8 rounded-full border-[3px] border-navy/15" />
        )}
      </button>

      <JourneyPanel open={jornadaAberta} onClose={() => setJornadaAberta(false)} />

      <div className="hidden items-center gap-2 border-l border-navy/10 pl-3 lg:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-purple font-display text-[12px] font-extrabold text-white">PR</span>
        <span className="leading-tight"><b className="block text-[12px]">Professor(a)</b><span className="text-[10px] text-navy/50">Minha jornada</span></span>
      </div>
    </header>
  );
}
