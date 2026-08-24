"use client";

import { useState } from "react";
import { ROTULOS, SIMBOLOS } from "@/components/engines/CommandRunner/CommandTray";
import { contarPecas, expandir } from "@/lib/board/expand";
import type { CommandType } from "@/lib/board/types";
import type { DemoSpec } from "@/lib/demo/types";

type Spec = Extract<DemoSpec, { kind: "loop-compress" }>;

function Peca({ comando }: { comando: CommandType }) {
  const repete = comando.startsWith("REPITA");
  return (
    <li
      className={[
        "flex min-w-[54px] flex-col items-center gap-0.5 rounded-block border-2 border-navy px-2 py-1.5",
        repete ? "bg-amber" : "bg-cream-hi",
      ].join(" ")}
    >
      <span aria-hidden className="font-sans text-[15px] font-bold leading-none text-navy">
        {SIMBOLOS[comando]}
      </span>
      <span className="font-sans text-[9.5px] font-bold uppercase tracking-[0.04em] text-navy/75">
        {ROTULOS[comando]}
      </span>
    </li>
  );
}

function Fila({
  titulo,
  comandos,
  contagem,
}: {
  titulo: string;
  comandos: CommandType[];
  contagem: number;
}) {
  return (
    <div>
      <span className="label-mono text-navy/65">
        {titulo} · {contagem === 1 ? "1 peça" : `${contagem} peças`}
      </span>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {comandos.map((c, i) => (
          <Peca key={`${c}-${i}`} comando={c} />
        ))}
      </ul>
    </div>
  );
}

/**
 * As duas filas ficam sempre visíveis, uma sobre a outra. O botão expande a
 * fila curta de volta ao que ela executa — que é a prova, não um enfeite: o
 * professor vê a fila comprimida virar exatamente a de cima, e é isso que
 * responde a pergunta que a turma faz ("mas é a mesma coisa mesmo?").
 */
export function LoopCompress({ spec }: { spec: Spec }) {
  const [expandida, setExpandida] = useState(false);

  const resultado = expandir(spec.curta);
  // A conferência de conteúdo já garante que expande; se um dia não expandir,
  // mostrar a fila curta como está é melhor do que quebrar a página.
  const expansao: CommandType[] = resultado.ok ? resultado.instrucoes : spec.curta;

  return (
    <div className="rounded-block border-2 border-navy bg-cream p-5">
      <Fila
        titulo="Escrevendo comando por comando"
        comandos={spec.longa}
        contagem={contarPecas(spec.longa)}
      />

      <div className="mt-6">
        <Fila
          titulo={expandida ? "A mesma fila, expandida de volta" : "Dizendo uma vez só"}
          comandos={expandida ? expansao : spec.curta}
          contagem={expandida ? expansao.length : contarPecas(spec.curta)}
        />
      </div>

      <button
        type="button"
        aria-pressed={expandida}
        onClick={() => setExpandida((v) => !v)}
        className="mt-5 inline-flex min-h-[44px] items-center rounded-block border-2 border-navy bg-transparent px-4 font-sans text-[12px] font-bold uppercase tracking-[0.06em] text-navy"
      >
        {expandida ? "Voltar à fila curta" : "Expandir a fila curta"}
      </button>

      {/* Montada sempre: região viva criada junto com o texto não é anunciada. */}
      <p aria-live="polite" className="mt-4 max-w-[56ch] font-sans text-[13.5px] leading-relaxed text-navy/80">
        {expandida
          ? "Expandida, a fila curta é idêntica à de cima — mesma ordem, mesmos comandos. A repetição não muda o que o robô faz, muda o tamanho do que você precisa escrever."
          : spec.explain}
      </p>
    </div>
  );
}
