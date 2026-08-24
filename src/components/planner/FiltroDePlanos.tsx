"use client";

import { useMemo, useState } from "react";
import { CardLink } from "@/components/ui/Card";
import { SlidersHorizontal } from "lucide-react";
import { CapaDaAula } from "@/components/planner/CapaDaAula";
import { CONCEPTS } from "@/data/concepts";
import {
  LESSON_PLANS,
  NOMES_DAS_TURMAS,
  NOMES_DOS_NIVEIS_DE_PLANO,
  type ClassSize,
  type PlanLevel,
} from "@/data/lessonPlans";
import type { AgeBand, Duration } from "@/data/types";
import { MICROBIT_TECHNICAL_GUIDES } from "@/data/microbitTechnicalGuides";

const ANOS: Array<{ valor: AgeBand; rotulo: string }> = [
  { valor: "2-3", rotulo: "2º e 3º" },
  { valor: "4-5", rotulo: "4º e 5º" },
  { valor: "6-7", rotulo: "6º e 7º" },
  { valor: "8-9", rotulo: "8º e 9º" },
];

/**
 * Derivado dos planos que existem, não fixado à mão. Oferecer uma duração sem
 * nenhum plano correspondente daria à professora com pressa exatamente o
 * clique que não leva a lugar nenhum — e ela é quem menos tem tempo a perder.
 */
const TEMPOS: Duration[] = [...new Set(LESSON_PLANS.map((p) => p.duration))].sort((a, b) => a - b);

type Recurso = "sem-computador" | "tabuleiro" | "microbit";

const RECURSOS: Array<{ valor: Recurso; rotulo: string }> = [
  { valor: "sem-computador", rotulo: "Sem computador" },
  { valor: "tabuleiro", rotulo: "Com tabuleiro" },
  { valor: "microbit", rotulo: "Com micro:bit" },
];

const MAKECODE_CATEGORIES = [...new Set(MICROBIT_TECHNICAL_GUIDES.flatMap((guide) => guide.blocks.map((block) => block.category)))].sort();
const GUIDE_BY_ID = new Map(MICROBIT_TECHNICAL_GUIDES.map((guide) => [guide.id, guide]));

/**
 * Um grupo de escolha única em que clicar de novo desmarca. É o comportamento
 * certo para quem está com pressa: não existe opção "todos" para caçar, basta
 * clicar de novo no que já está marcado.
 *
 * O número é o resquício do "assistente em etapas" do pedido original: em vez
 * de páginas separadas com "próximo"/"voltar" (que atrasa quem tem uma aula
 * amanhã), os mesmos passos aparecem numerados numa tela só, com o resultado
 * mudando na hora a cada escolha — instantâneo em vez de formulário longo.
 */
function Grupo<T extends string | number>({
  numero,
  titulo,
  opcoes,
  valor,
  aoEscolher,
}: {
  numero: number;
  titulo: string;
  opcoes: Array<{ valor: T; rotulo: string }>;
  valor: T | null;
  aoEscolher: (v: T | null) => void;
}) {
  return (
    <fieldset className="min-w-0">
      <legend className="flex items-center gap-2">
        <span
          aria-hidden
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-[10px] font-bold text-cream-hi"
        >
          {numero}
        </span>
        <span className="label-mono text-navy/65">{titulo}</span>
      </legend>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {opcoes.map((o) => {
          const ativo = valor === o.valor;
          return (
            <button
              key={String(o.valor)}
              type="button"
              aria-pressed={ativo}
              onClick={() => aoEscolher(ativo ? null : o.valor)}
              className={[
                "min-h-[34px] rounded-pill px-3 font-sans text-[11px] font-semibold transition-colors",
                ativo
                  ? "bg-navy text-cream-hi"
                  : "border border-navy/15 bg-cream-hi text-navy/70 hover:bg-navy/5",
              ].join(" ")}
            >
              {o.rotulo}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function FiltroDePlanos() {
  const [ano, setAno] = useState<AgeBand | null>(null);
  const [tempo, setTempo] = useState<Duration | null>(null);
  const [recurso, setRecurso] = useState<Recurso | null>(null);
  const [turma, setTurma] = useState<ClassSize | null>(null);
  const [nivel, setNivel] = useState<PlanLevel | null>(null);
  const [conceito, setConceito] = useState<string | null>(null);
  const [makecode, setMakecode] = useState<string | null>(null);
  const [montagem, setMontagem] = useState<"interno" | "externo" | null>(null);

  const resultados = useMemo(
    () =>
      LESSON_PLANS.filter((p) => {
        if (ano && !p.ageBands.includes(ano)) return false;
        if (tempo && p.duration !== tempo) return false;
        if (turma && p.classSize !== turma) return false;
        if (nivel && p.level !== nivel) return false;
        if (conceito && !p.concepts.includes(conceito)) return false;
        const guide = GUIDE_BY_ID.get(p.id);
        if (makecode && !guide?.blocks.some((block) => block.category === makecode)) return false;
        if (montagem && guide?.wiring.kind !== montagem) return false;
        if (recurso === "sem-computador" && p.needsComputer) return false;
        if (recurso === "tabuleiro" && !p.needsBoard) return false;
        if (recurso === "microbit" && !p.needsMicrobit) return false;
        return true;
      }),
    [ano, tempo, turma, nivel, conceito, recurso, makecode, montagem],
  );

  const algumFiltro = Boolean(ano || tempo || recurso || turma || nivel || conceito || makecode || montagem);

  return (
    <div>
      {/* Os filtros viram um painel próprio e acompanham a rolagem: com doze
          planos a lista passa da altura da tela, e quem estava filtrando
          perdia os controles de vista justamente ao comparar os resultados. */}
      <div className="rounded-card bg-white p-4 shadow-card md:p-5">
        <div className="mb-4 flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan/15 text-cyan"><SlidersHorizontal size={17}/></span><div><p className="font-display text-[17px] font-extrabold">Encontre uma aula pronta</p><p className="text-[11.5px] text-navy/55">Comece por ano, tempo e recurso. Os demais filtros são opcionais.</p></div></div>
        <div className="grid gap-4 md:grid-cols-3">
        <Grupo numero={1} titulo="Ano" opcoes={ANOS} valor={ano} aoEscolher={setAno} />
        <Grupo
          numero={2}
          titulo="Tempo que você tem"
          opcoes={TEMPOS.map((t) => ({ valor: t, rotulo: `${t} min` }))}
          valor={tempo}
          aoEscolher={setTempo}
        />
        <Grupo numero={3} titulo="Recursos" opcoes={RECURSOS} valor={recurso} aoEscolher={setRecurso} />
        </div>
        <details className="mt-4 border-t border-navy/8 pt-3">
          <summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[.05em] text-navy/60">Mais filtros</summary>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
        <Grupo
          numero={4}
          titulo="Tamanho da turma"
          opcoes={(Object.keys(NOMES_DAS_TURMAS) as ClassSize[]).map((c) => ({
            valor: c,
            rotulo: NOMES_DAS_TURMAS[c],
          }))}
          valor={turma}
          aoEscolher={setTurma}
        />
        <Grupo
          numero={5}
          titulo="Nível"
          opcoes={(Object.keys(NOMES_DOS_NIVEIS_DE_PLANO) as PlanLevel[]).map((n) => ({
            valor: n,
            rotulo: NOMES_DOS_NIVEIS_DE_PLANO[n],
          }))}
          valor={nivel}
          aoEscolher={setNivel}
        />
        <Grupo
          numero={6}
          titulo="Conteúdo"
          opcoes={CONCEPTS.map((c) => ({ valor: c.id, rotulo: c.title }))}
          valor={conceito}
          aoEscolher={setConceito}
        />
        <Grupo numero={7} titulo="Seção do MakeCode" opcoes={MAKECODE_CATEGORIES.map((category) => ({ valor: category, rotulo: category }))} valor={makecode} aoEscolher={setMakecode} />
        <Grupo numero={8} titulo="Montagem" opcoes={[{ valor: "interno" as const, rotulo: "Só recursos da placa" }, { valor: "externo" as const, rotulo: "Com sensor ou atuador externo" }]} valor={montagem} aoEscolher={setMontagem} />
        </div></details>

        {algumFiltro ? (
          <button
            type="button"
            onClick={() => {
              setAno(null);
              setTempo(null);
              setRecurso(null);
              setTurma(null);
              setNivel(null);
              setConceito(null);
              setMakecode(null);
              setMontagem(null);
            }}
            className="mt-4 min-h-[36px] font-sans text-[10.5px] font-bold uppercase tracking-[0.05em] text-navy underline"
          >
            Limpar filtros
          </button>
        ) : null}
      </div>

      <div className="mt-7">
        {/* Região viva montada o tempo todo: criada junto com o conteúdo, ela
            não seria anunciada de forma confiável a cada mudança de filtro. */}
        <p aria-live="polite" className="label-mono text-navy/65">
          {resultados.length === 1
            ? "1 plano encontrado"
            : `${resultados.length} planos encontrados`}
        </p>

        {resultados.length === 0 ? (
          <p className="mt-6 max-w-[46ch] font-sans text-[14px] leading-relaxed text-navy/80">
            Nenhum plano combina todos esses filtros ao mesmo tempo. Tire o filtro de tempo
            primeiro: é o que mais restringe, e quase toda aula aqui se adapta a mais de uma
            duração.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {resultados.map((plano) => (
              <li key={plano.id} className="grid">
                <CardLink href={`/planejar/${plano.id}`} className="p-0">
                  <CapaDaAula lesson={plano} />
                  <span className="flex flex-1 flex-col p-4">
                    <span className="label-mono inline-flex w-fit rounded-pill bg-navy px-2.5 py-1 text-cream-hi">
                      {plano.duration} min
                    </span>
                    <span className="mt-3 block font-display text-[17px] font-extrabold leading-tight tracking-display group-hover:underline">
                      {plano.title}
                    </span>
                    <span className="mt-1 block label-mono text-navy/65">{plano.theme}</span>
                    <span className="mt-2 line-clamp-3 block font-sans text-[12px] leading-relaxed text-navy/65">
                      {plano.objective}
                    </span>
                  </span>
                </CardLink>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
