"use client";

import { useCallback, useState } from "react";
import { CommandRunner } from "@/components/engines/CommandRunner";
import { ROTULOS } from "@/components/engines/CommandRunner/CommandTray";
import { Chip } from "@/components/ui/Chip";
import { SidePanel } from "@/components/ui/SidePanel";
import type { Execucao } from "@/lib/board/runner";
import type { CommandType, GridSpec } from "@/lib/board/types";

/**
 * `CommandRunner` com meta: mostra o número máximo de peças antes da tentativa
 * e libera uma solução mínima só depois que o professor rodou o próprio
 * algoritmo. A comparação numérica em si continua vindo de `mensagemDe` — este
 * componente não reimplementa nada da lógica do tabuleiro.
 */
export function LoopOptimizer({
  grid,
  minimo,
  permitidos,
  solucaoMinima,
  rotulos,
  onVitoria,
}: {
  grid: GridSpec;
  minimo: number;
  permitidos: CommandType[];
  solucaoMinima: CommandType[];
  rotulos?: Partial<Record<CommandType, string>>;
  onVitoria?: () => void;
}) {
  const [tentou, setTentou] = useState(false);
  const [solucaoAberta, setSolucaoAberta] = useState(false);

  // Só libera a solução depois que o professor executou pelo menos uma vez.
  // Antes disso a "meta" viraria gabarito e a atividade perderia o sentido.
  //
  // `estado === "terminado"` sozinho não basta: `onEvento` também dispara com
  // `ponteiro === 0` quando a execução acaba de ser montada, e uma execução
  // recém-montada já nasce terminada em dois casos — erro de montagem e fila
  // sem nenhum movimento. Nos dois, clicar em "Executar" com a bandeja vazia
  // abriria o gabarito sem que uma única instrução tivesse rodado. Exigir
  // `ponteiro > 0` é o que significa, de fato, "houve uma tentativa".
  const aoEvento = useCallback((exec: Execucao) => {
    if (exec.estado === "terminado" && exec.ponteiro > 0) setTentou(true);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-block border-2 border-navy/15 bg-cream-hi p-4">
        <span className="label-mono text-navy/65">Meta desta atividade</span>
        <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-navy/70">
          Chegue ao baú usando no máximo{" "}
          <strong className="font-bold text-navy">{minimo} peças</strong>. Vale tentar quantas vezes
          quiser: o contador fica visível o tempo todo.
        </p>
        {tentou ? (
          <div className="mt-3">
            <Chip onClick={() => setSolucaoAberta(true)} ariaExpanded={solucaoAberta}>
              Ver uma solução com {minimo} peças
            </Chip>
          </div>
        ) : (
          <p className="mt-3 font-sans text-[12.5px] text-navy/65">
            Depois da sua primeira tentativa, aparece aqui um botão para comparar com uma solução
            mínima.
          </p>
        )}
      </div>

      <CommandRunner
        grid={grid}
        minimo={minimo}
        permitidos={permitidos}
        rotulos={rotulos}
        onEvento={aoEvento}
        onVitoria={onVitoria}
      />

      <SidePanel
        open={solucaoAberta}
        onClose={() => setSolucaoAberta(false)}
        title={`Uma solução com ${minimo} peças`}
      >
        <p className="font-sans text-[13.5px] leading-relaxed text-navy/70">
          Esta é <em>uma</em> solução mínima, não a única. Se a sua tem o mesmo tamanho por um
          caminho diferente, ela é igualmente boa — e comparar as duas com a turma rende mais que
          acertar de primeira.
        </p>
        <ol className="mt-4 flex flex-col gap-2">
          {solucaoMinima.map((comando, i) => (
            <li
              key={`${comando}-${i}`}
              className="flex items-center gap-3 rounded-block border-2 border-navy/15 bg-cream-hi p-2.5"
            >
              <span className="w-6 shrink-0 text-center font-mono text-[11px] font-bold text-navy/65">
                {i + 1}
              </span>
              <span className="font-sans text-[12.5px] font-semibold text-navy">
                {rotulos?.[comando] ?? ROTULOS[comando]}
              </span>
            </li>
          ))}
        </ol>
      </SidePanel>
    </div>
  );
}
