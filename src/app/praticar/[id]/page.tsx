import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AbasAtividade, type AbaAtividade } from "@/components/content/AbasAtividade";
import { DisclosureBloco } from "@/components/content/DisclosureBloco";
import { KitDaAula } from "@/components/content/KitDaAula";
import { MotorDaAtividade } from "@/components/content/MotorDaAtividade";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { BRAND } from "@/config/brand";
import { ACTIVITIES, atividadePorId } from "@/data/activities";

export function generateStaticParams() {
  return ACTIVITIES.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const atividade = atividadePorId(id);
  if (!atividade) return { title: `Atividade não encontrada — ${BRAND.name}` };
  return { title: `${atividade.title} — ${BRAND.name}`, description: atividade.summary };
}

function Paragrafo({ children }: { children: string }) {
  return (
    <p className="max-w-[62ch] font-sans text-[14px] leading-relaxed text-navy/80">{children}</p>
  );
}

function Lista({ itens, numerada = false }: { itens: string[]; numerada?: boolean }) {
  const Tag = numerada ? "ol" : "ul";
  return (
    <Tag className="grid gap-2.5">
      {itens.map((item, i) => (
        <li
          key={item}
          className="flex gap-3 border-l-2 border-cyan pl-3 font-sans text-[14px] leading-relaxed text-navy/80"
        >
          {numerada ? (
            <span className="label-mono shrink-0 text-navy/65">
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : null}
          <span>{item}</span>
        </li>
      ))}
    </Tag>
  );
}

export default async function AtividadePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const atividade = atividadePorId(id);
  if (!atividade) notFound();

  // As faixas são contíguas na spec, então a lista se lê melhor como intervalo:
  // "do 2º ao 9º ano" em vez de "2 e 3, 4 e 5, 6 e 7, 8 e 9".
  const primeiroAno = atividade.ageBands[0].split("-")[0];
  const ultimoAno = atividade.ageBands[atividade.ageBands.length - 1].split("-")[1];
  const anos =
    primeiroAno === ultimoAno ? `${primeiroAno}º ano` : `do ${primeiroAno}º ao ${ultimoAno}º ano`;

  const abas: AbaAtividade[] = [
    {
      id: "visao-geral",
      rotulo: "Visão geral",
      conteudo: (
        <div className="grid max-w-[820px] gap-8">
          <p className="font-sans text-[13px] leading-relaxed text-navy/70">
            <strong className="font-bold text-navy">{atividade.duration} minutos</strong> · {anos}
          </p>
          <ImageSlot slot={atividade.image} className="max-w-[560px]" />
          <div>
            <h2 className="label-mono mb-2 text-navy/65">Objetivo</h2>
            <Paragrafo>{atividade.objective}</Paragrafo>
          </div>
          <div>
            <h2 className="label-mono mb-2 text-navy/65">Por que aplicar isto</h2>
            <Paragrafo>{atividade.whyApply}</Paragrafo>
          </div>
          <DisclosureBloco titulo="O que costuma dar errado" realce="amber">
            <Lista itens={atividade.difficulties} />
          </DisclosureBloco>
        </div>
      ),
    },
    {
      id: "preparacao",
      rotulo: "Preparação",
      conteudo: (
        <div className="grid max-w-[820px] gap-8">
          <div>
            <h2 className="label-mono mb-2 text-navy/65">Antes da aula</h2>
            <Paragrafo>{atividade.preparation}</Paragrafo>
          </div>
          <div>
            <h2 className="label-mono mb-2 text-navy/65">Como abrir a aula</h2>
            <Paragrafo>{atividade.opening}</Paragrafo>
          </div>
        </div>
      ),
    },
    {
      id: "conducao",
      rotulo: "Condução",
      conteudo: (
        <div className="grid max-w-[820px] gap-8">
          <div>
            <h2 className="label-mono mb-2 text-navy/65">Passo a passo</h2>
            <Lista itens={atividade.steps} numerada />
          </div>
          <div>
            <h2 className="label-mono mb-2 text-navy/65">Perguntas para fazer durante</h2>
            <Lista itens={atividade.mediatingQuestions} />
          </div>
        </div>
      ),
    },
    {
      id: "adaptacoes",
      rotulo: "Adaptações",
      conteudo: (
        <div className="max-w-[820px]">
          <Lista itens={atividade.adaptations} />
        </div>
      ),
    },
    {
      id: "avaliacao",
      rotulo: "Avaliação",
      conteudo: (
        <div className="max-w-[820px]">
          <Lista itens={atividade.assessment} />
        </div>
      ),
    },
    {
      id: "experimente",
      rotulo: "Experimente",
      conteudo: <MotorDaAtividade id={atividade.id} engine={atividade.engine} />,
    },
  ];

  return (
    <>
      <header className="border-b border-navy/10 bg-cream-hi">
        <div className="mx-auto max-w-[1400px] px-5 py-8 md:py-12">
          <span className="label-mono text-navy/65">
            Nível {atividade.level} · {atividade.levelName}
          </span>
          <h1 className="mt-2.5 max-w-[24ch] font-display text-[clamp(1.85rem,4.6vw,3.2rem)] leading-[1.02] tracking-display">
            {atividade.title}
          </h1>
          <p className="mt-4 max-w-[62ch] font-sans text-[15px] leading-relaxed text-navy/70">
            {atividade.summary}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 py-7 md:py-10">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8">
          <AbasAtividade abas={abas} />
          <KitDaAula atividade={atividade} />
        </div>
      </div>
    </>
  );
}
