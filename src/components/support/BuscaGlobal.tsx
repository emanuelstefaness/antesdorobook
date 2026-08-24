"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  MINIMO_DA_CONSULTA,
  NOMES_DOS_RESULTADOS,
  buscar,
  type SearchResult,
} from "@/lib/search";

const EXEMPLOS = ["repetição", "depuração", "micro:bit não conecta", "cadarço"];

function Resultado({ r }: { r: SearchResult }) {
  return (
    <li>
      <span aria-hidden className="block h-[2px] w-full bg-navy/15" />
      <span className="mt-3 block label-mono text-navy/65">{NOMES_DOS_RESULTADOS[r.kind]}</span>
      <Link
        href={r.href}
        className="mt-1 block max-w-[42ch] font-display text-[16px] font-extrabold leading-tight tracking-display underline-offset-4 hover:underline"
      >
        {r.title}
      </Link>
      <p className="mt-1 max-w-[52ch] font-sans text-[13px] leading-relaxed text-navy/70">
        {r.trecho}
      </p>
    </li>
  );
}

export function BuscaGlobal() {
  const [consulta, setConsulta] = useState("");
  const resultados = useMemo(() => buscar(consulta), [consulta]);

  const curta = consulta.trim().length > 0 && consulta.trim().length < MINIMO_DA_CONSULTA;

  return (
    <div>
      <label htmlFor="busca-global" className="label-mono block text-navy/65">
        Buscar em todo o site
      </label>
      <input
        id="busca-global"
        type="search"
        autoFocus
        value={consulta}
        onChange={(e) => setConsulta(e.target.value)}
        placeholder="repetição, cabo, avaliar…"
        className="mt-2 min-h-[44px] w-full max-w-[520px] rounded-pill border border-navy/15 bg-cream-hi px-4 font-sans text-[15px] text-navy shadow-card placeholder:text-navy/50"
      />

      {/* Sempre montada: uma região viva criada junto com o resultado não é
          anunciada de forma confiável por leitor de tela. */}
      <p aria-live="polite" className="mt-3 label-mono text-navy/65">
        {consulta.trim().length === 0
          ? "Digite para buscar"
          : curta
            ? `Escreva pelo menos ${MINIMO_DA_CONSULTA} letras`
            : resultados.length === 1
              ? "1 resultado"
              : `${resultados.length} resultados`}
      </p>

      {consulta.trim().length === 0 ? (
        <div className="mt-8 max-w-[52ch]">
          <p className="font-sans text-[14px] leading-relaxed text-navy/80">
            A busca cobre conceitos, atividades, aulas, trilhas, projetos, preparação do professor,
            peças da placa, glossário e ajuda rápida — tudo de uma vez, porque quem procura
            não precisa saber de antemão em qual área a resposta está.
          </p>
          <p className="mt-4 font-sans text-[13px] leading-relaxed text-navy/70">
            Experimente: {EXEMPLOS.map((e) => `“${e}”`).join(", ")}. Dá para procurar pelo exemplo
            que você lembra da aula, não só pelo nome do conceito.
          </p>
        </div>
      ) : resultados.length === 0 && !curta ? (
        <p className="mt-8 max-w-[52ch] font-sans text-[14px] leading-relaxed text-navy/80">
          Nada com essa palavra. Tente pelo que a coisa faz em vez do nome — buscar por
          &ldquo;gira&rdquo; encontra o comando VIRE, e &ldquo;cabo&rdquo; encontra o micro:bit que
          não conecta.
        </p>
      ) : (
        <ul className="mt-8 grid max-w-[1000px] gap-x-8 gap-y-6 md:grid-cols-2">
          {resultados.map((r) => (
            <Resultado key={r.chave} r={r} />
          ))}
        </ul>
      )}
    </div>
  );
}
