"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { NOMES_DAS_AREAS, buscarTermos, type GlossaryArea } from "@/data/glossary";

const AREAS = Object.keys(NOMES_DAS_AREAS) as GlossaryArea[];

export function BuscaDoGlossario() {
  const [consulta, setConsulta] = useState("");
  const achados = useMemo(() => buscarTermos(consulta), [consulta]);

  return (
    <div>
      <label htmlFor="busca-glossario" className="label-mono block text-navy/65">
        Buscar termo
      </label>
      <input
        id="busca-glossario"
        type="search"
        value={consulta}
        onChange={(e) => setConsulta(e.target.value)}
        placeholder="algoritmo, vire, sensor…"
        className="mt-2 min-h-[44px] w-full max-w-[420px] rounded-pill border border-navy/15 bg-cream-hi px-4 font-sans text-[14px] text-navy shadow-card placeholder:text-navy/50"
      />

      {/* Montada o tempo todo: uma região viva criada junto com o resultado
          não é anunciada de forma confiável pelo leitor de tela. */}
      <p aria-live="polite" className="mt-3 label-mono text-navy/65">
        {achados.length === 1 ? "1 termo" : `${achados.length} termos`}
      </p>

      {achados.length === 0 ? (
        <p className="mt-6 max-w-[46ch] font-sans text-[14px] leading-relaxed text-navy/80">
          Nenhum termo com essa palavra. Tente pelo que ele faz em vez do nome — buscar por
          &ldquo;gira&rdquo; encontra o comando VIRE.
        </p>
      ) : (
        AREAS.map((area) => {
          const daArea = achados.filter((t) => t.area === area);
          if (daArea.length === 0) return null;

          return (
            <section key={area} className="mt-10">
              <h2 className="label-mono text-navy/65">{NOMES_DAS_AREAS[area]}</h2>
              <dl className="mt-4 grid gap-x-8 gap-y-6 md:grid-cols-2">
                {daArea.map((termo) => (
                  <div key={termo.id} id={termo.id} className="scroll-mt-24">
                    <span aria-hidden className="block h-[2px] w-full bg-navy/15" />
                    <dt className="mt-3 font-display text-[16px] font-extrabold leading-tight tracking-display">
                      {termo.term}
                    </dt>
                    <dd className="mt-2 max-w-[44ch] font-sans text-[13.5px] leading-relaxed text-navy/80">
                      {termo.plain}
                      <span className="mt-2 block border-l-2 border-amber pl-3 text-navy/80">
                        <strong className="font-bold text-navy">Confusão comum:</strong>{" "}
                        {termo.confusion}
                      </span>
                      {termo.seeAlso ? (
                        <Link
                          href={termo.seeAlso.href}
                          className="mt-2 inline-block font-sans text-[13px] text-navy underline"
                        >
                          {termo.seeAlso.label}
                        </Link>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })
      )}
    </div>
  );
}
