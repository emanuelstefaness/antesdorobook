import { ArrowRight, BookOpen, Cpu, Layers3 } from "lucide-react";
import { MarcarLido } from "@/components/content/MarcarLido";
import { Card, CardLink } from "@/components/ui/Card";
import { CapaDaAula } from "@/components/planner/CapaDaAula";
import { PageHeader } from "@/components/ui/PageHeader";
import { LESSON_PLANS, NOMES_DOS_NIVEIS_DE_PLANO } from "@/data/lessonPlans";
import { MICROBIT_STARTER_PATH } from "@/data/microbitLearningPath";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "aulas-microbit",
  "Sequência recomendada e planos detalhados para o professor começar a ensinar com o BBC micro:bit.",
);

const INICIAIS = MICROBIT_STARTER_PATH.map((passo) => ({
  passo,
  plano: LESSON_PLANS.find((plano) => plano.id === passo.lessonId)!,
}));

const IDS_INICIAIS = new Set(MICROBIT_STARTER_PATH.map((passo) => passo.lessonId));
const DEMAIS = LESSON_PLANS.filter((plano) => plano.needsMicrobit && !IDS_INICIAIS.has(plano.id));

export default function AulasMicrobitPage() {
  return (
    <>
      <PageHeader stageId="aulas-microbit">
        <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-navy/70">
          Chegou aqui depois de pensamento computacional, robótica e micro:bit? Então aplique as
          oito primeiras aulas na ordem indicada. Cada plano informa preparação, materiais, fala
          inicial, investigação, construção, teste, depuração, avaliação e adaptação para uma placa.
        </p>
      </PageHeader>

      <section className="mx-auto max-w-[1400px] px-5 py-10 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-5" realce="cyan">
            <Layers3 size={21} className="text-cyan" aria-hidden />
            <p className="mt-3 label-mono text-navy/55">Sequência inicial</p>
            <p className="mt-1 font-display text-[24px] font-extrabold">8 aulas em ordem</p>
            <p className="mt-2 text-[13px] leading-relaxed text-navy/65">Da primeira imagem até comunicação por rádio.</p>
          </Card>
          <Card className="p-5" realce="purple">
            <Cpu size={21} className="text-purple" aria-hidden />
            <p className="mt-3 label-mono text-navy/55">Poucas placas</p>
            <p className="mt-1 font-display text-[24px] font-extrabold">Simulador + revezamento</p>
            <p className="mt-2 text-[13px] leading-relaxed text-navy/65">Planejamento em papel e teste físico por estações.</p>
          </Card>
          <Card className="p-5" realce="amber">
            <BookOpen size={21} className="text-amber" aria-hidden />
            <p className="mt-3 label-mono text-navy/55">Roteiros completos</p>
            <p className="mt-1 font-display text-[24px] font-extrabold">Passo a passo</p>
            <p className="mt-2 text-[13px] leading-relaxed text-navy/65">O que preparar, fazer, perguntar, testar e avaliar.</p>
          </Card>
        </div>

        <div className="mt-12">
          <p className="label-mono text-cyan">Comece por estas</p>
          <h2 className="mt-2 font-display text-[30px] font-extrabold tracking-display">As oito primeiras aulas</h2>
          <p className="mt-2 max-w-[62ch] text-[14px] leading-relaxed text-navy/68">Não pule direto para sensores externos ou robôs com motor. Esta sequência constrói uma ideia por vez e reutiliza o que já foi aprendido.</p>

          <ol className="mt-7 grid gap-4 lg:grid-cols-2">
            {INICIAIS.map(({ passo, plano }) => (
              <li key={passo.lessonId}>
                <CardLink href={`/planejar/${plano.id}`} faixa realce={passo.order <= 2 ? "cyan" : passo.order <= 5 ? "purple" : "amber"} className="p-0">
                  <CapaDaAula lesson={plano} />
                  <span className="flex flex-1 flex-col p-5">
                    <span className="flex items-center justify-between gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-mono text-[13px] font-bold text-white">{passo.order}</span>
                      <span className="label-mono text-navy/55">{plano.duration} min · {NOMES_DOS_NIVEIS_DE_PLANO[plano.level]}</span>
                    </span>
                    <span className="mt-4 font-display text-[20px] font-extrabold leading-tight">{plano.title}</span>
                    <span className="mt-1 label-mono text-cyan">{passo.focus}</span>
                    <span className="mt-3 text-[13px] leading-relaxed text-navy/68"><strong className="text-navy">Objetivo do professor:</strong> {passo.teacherGoal}</span>
                    <span className="mt-auto flex items-center gap-2 pt-4 text-[11px] font-bold text-navy">Abrir roteiro detalhado <ArrowRight size={14} aria-hidden /></span>
                  </span>
                </CardLink>
              </li>
            ))}
          </ol>
          <div className="mt-7">
            <MarcarLido id="aulas-microbit:sequencia" rotulo="Conheci a sequência inicial" />
          </div>
        </div>

        <div className="mt-16">
          <p className="label-mono text-purple">Depois da sequência inicial</p>
          <h2 className="mt-2 font-display text-[28px] font-extrabold tracking-display">Outras aulas detalhadas com micro:bit</h2>
          <p className="mt-2 max-w-[62ch] text-[14px] leading-relaxed text-navy/68">Escolha conforme a turma estiver pronta para variáveis, sensores, rádio, dados, inteligência artificial ou robótica física.</p>
          <ul className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {DEMAIS.map((plano) => (
              <li key={plano.id} className="grid">
                <CardLink href={`/planejar/${plano.id}`} className="p-0">
                  <CapaDaAula lesson={plano} />
                  <span className="flex flex-1 flex-col p-4">
                    <span className="label-mono text-purple">{NOMES_DOS_NIVEIS_DE_PLANO[plano.level]} · {plano.duration} min</span>
                    <span className="mt-3 font-display text-[17px] font-extrabold leading-tight">{plano.title}</span>
                    <span className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-navy/65">{plano.objective}</span>
                    <span className="mt-auto pt-4 text-[11px] font-bold text-navy">Ver aula completa →</span>
                  </span>
                </CardLink>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
