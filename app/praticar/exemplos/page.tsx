import type { Metadata } from "next";
import { BugHunt } from "@/components/engines/BugHunt";
import { LoopOptimizer } from "@/components/engines/LoopOptimizer";
import { SequenceBuilder } from "@/components/engines/SequenceBuilder";
import { BRAND } from "@/config/brand";
import {
  DEFEITO_DEMO,
  GRID_DEMO,
  MINIMO_DEMO,
  PERMITIDOS_DEMO,
  PONTES_DEMO,
  SANDUICHE,
  SEMENTE_SANDUICHE,
  SOLUCAO_MINIMA_DEMO,
  TITULO_SANDUICHE,
} from "@/data/demoMotores";

// O helper `pageMetadata` deriva o título de uma etapa da jornada, e esta rota
// não é uma etapa: usá-lo daria a esta página o mesmo título de `/praticar`.
// Por isso o Metadata é escrito à mão, como na página do simulador.
export const metadata: Metadata = {
  title: `Três exemplos para experimentar — ${BRAND.name}`,
  description:
    "Um exemplo trabalhado de cada formato de atividade: montar uma sequência, caçar um defeito plantado e resolver um percurso com o menor número de peças.",
};

/** Nota de transposição para a sala, com a mesma forma nas três seções. */
function NaSala({ texto }: { texto: string }) {
  return (
    <div className="mt-6 rounded-block border-2 border-navy/15 bg-cream-hi p-4">
      <span className="label-mono text-navy/65">Na sala de aula</span>
      <p className="mt-2 max-w-[70ch] font-sans text-[13.5px] leading-relaxed text-navy/70">
        {texto}
      </p>
    </div>
  );
}

export default function MotoresPage() {
  return (
    <>
      <header className="border-b border-navy/10 bg-cream-hi">
        <div className="mx-auto max-w-[1400px] px-5 py-12">
          <span className="label-mono text-navy/65">Praticar · Exemplos</span>
          <h1 className="mt-3 max-w-[20ch] font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.0] tracking-display">
            Três exemplos para experimentar
          </h1>
          <p className="mt-4 max-w-[58ch] font-sans text-[15px] leading-relaxed text-navy/70">
            As doze atividades usam três formatos, e aqui está um exemplo resolvido de cada um. Sirva-se
            antes de escolher: dá para sentir como cada formato se comporta em cinco minutos, sem
            precisar abrir uma atividade e decidir turma, tempo e material.
          </p>
          <p className="mt-3 max-w-[58ch] font-sans text-[13.5px] leading-relaxed text-navy/70">
            Os três exemplos aqui não têm ano nem duração de propósito — são para você, não para a
            turma. Cada um termina com o que fazer com a turma depois.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-[1400px] px-5 py-12">
        <span className="label-mono text-navy/65">Conceito · Sequência</span>
        <h2 className="mt-2 font-display text-[24px] font-extrabold tracking-display text-navy">
          Montar uma sequência
        </h2>
        <p className="mt-3 max-w-[62ch] font-sans text-[14px] leading-relaxed text-navy/70">
          Os passos chegam fora de ordem e você os reacomoda com as setas de cada linha. Ao conferir,
          o motor aponta a primeira posição errada e explica de que passo ela depende — porque o que
          se aprende aqui não é a resposta, é que trocar dois passos de lugar muda o resultado.
        </p>
        <div className="mt-6">
          <SequenceBuilder
            passos={SANDUICHE}
            semente={SEMENTE_SANDUICHE}
            tituloDoPalco={TITULO_SANDUICHE}
          />
        </div>
        <NaSala texto={PONTES_DEMO.sequencia} />
      </section>

      <section className="border-y-2 border-navy/10 bg-cream-hi">
        <div className="mx-auto max-w-[1400px] px-5 py-12">
          <span className="label-mono text-navy/65">Conceito · Depuração</span>
          <h2 className="mt-2 font-display text-[24px] font-extrabold tracking-display text-navy">
            Caçar o defeito
          </h2>
          <p className="mt-3 max-w-[62ch] font-sans text-[14px] leading-relaxed text-navy/70">
            Um algoritmo com um defeito plantado, em duas fases: primeiro achar o passo problemático,
            depois decidir o que fazer com ele. As opções de correção só aparecem depois que o passo
            certo é apontado — quem chuta não descobre por eliminação.
          </p>
          <div className="mt-6">
            <BugHunt algoritmo={DEFEITO_DEMO} />
          </div>
          <NaSala texto={PONTES_DEMO.defeito} />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 py-12">
        <span className="label-mono text-navy/65">Conceito · Repetição e eficiência</span>
        <h2 className="mt-2 font-display text-[24px] font-extrabold tracking-display text-navy">
          Resolver com o menor número de peças
        </h2>
        <p className="mt-3 max-w-[62ch] font-sans text-[14px] leading-relaxed text-navy/70">
          O mesmo tabuleiro do simulador, agora com uma meta declarada. Chegar ao baú já não basta:
          é preciso chegar com poucas peças, e para isso a repetição deixa de ser enfeite. Uma
          solução mínima fica disponível para comparação, mas só depois da sua primeira tentativa.
        </p>
        <div className="mt-6">
          <LoopOptimizer
            grid={GRID_DEMO}
            minimo={MINIMO_DEMO}
            permitidos={PERMITIDOS_DEMO}
            solucaoMinima={SOLUCAO_MINIMA_DEMO}
          />
        </div>
        <NaSala texto={PONTES_DEMO.otimizacao} />
      </section>
    </>
  );
}
