import { BotaoFavorito } from "@/components/support/BotaoFavorito";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DisclosureBloco } from "@/components/content/DisclosureBloco";
import { MarcarLido } from "@/components/content/MarcarLido";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/config/brand";
import { TRAILS, assuntosDaTrilha, trilhaPorId } from "@/data/trails";

export function generateStaticParams() {
  return TRAILS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const trilha = trilhaPorId(id);
  if (!trilha) return { title: `Trilha não encontrada — ${BRAND.name}` };
  return { title: `${trilha.title} — ${BRAND.name}`, description: trilha.willLearn };
}

function Lista({ itens, numerada = false }: { itens: string[]; numerada?: boolean }) {
  const Tag = numerada ? "ol" : "ul";
  return (
    <Tag className="grid gap-2">
      {itens.map((item, i) => (
        <li
          key={item}
          className="flex gap-3 border-l-2 border-cyan pl-3 font-sans text-[13.5px] leading-relaxed text-navy/80"
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

export default async function TrilhaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const trilha = trilhaPorId(id);
  if (!trilha) notFound();

  const assuntos = assuntosDaTrilha(trilha.id);

  return (
    <>
      <header className="border-b border-navy/10 bg-cream-hi">
        <div className="mx-auto max-w-[1400px] px-5 py-12">
          <span className="label-mono text-navy/65">
            Trilha {String(trilha.order).padStart(2, "0")} de {TRAILS.length}
          </span>
          <h1 className="mt-3 max-w-[24ch] font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.0] tracking-display">
            {trilha.title}
          </h1>
          <p className="mt-4 max-w-[58ch] font-sans text-[15px] font-bold leading-relaxed text-navy">
            {trilha.willLearn}
          </p>
          <p className="mt-3 max-w-[58ch] font-sans text-[14px] leading-relaxed text-navy/70">
            {trilha.whyItMatters}
          </p>
          <p className="mt-4 font-sans text-[13px] leading-relaxed text-navy/70">
            <strong className="font-bold text-navy">{trilha.estimatedMinutes} minutos</strong> ·{" "}
            {assuntos.length} assuntos · no fim: {trilha.outcome}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 py-12">
        <div className="grid max-w-[900px] gap-3">
          {assuntos.map((assunto) => (
            <DisclosureBloco
              key={assunto.id}
              ancora={assunto.id}
              titulo={`${String(assunto.order).padStart(2, "0")} — ${assunto.title}`}
            >
              <p className="max-w-[62ch] font-sans text-[14px] leading-relaxed text-navy/80">
                {assunto.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <BotaoFavorito kind="assunto" id={assunto.id} />
                <MarcarLido id={`trilhas:${assunto.id}`} rotulo="Assunto concluído" />
              </div>

              <h4 className="mt-5 label-mono text-navy/65">Objetivo</h4>
              <p className="mt-1 max-w-[62ch] font-sans text-[13.5px] leading-relaxed text-navy/80">
                {assunto.objective}
              </p>

              <h4 className="mt-5 label-mono text-navy/65">Como explicar</h4>
              <p className="mt-1 max-w-[62ch] font-sans text-[13.5px] leading-relaxed text-navy/80">
                {assunto.howToExplain}
              </p>

              <h4 className="mt-5 label-mono text-navy/65">Preparação</h4>
              <p className="mt-1 max-w-[62ch] font-sans text-[13.5px] leading-relaxed text-navy/80">
                {assunto.preparation}
              </p>

              <h4 className="mt-5 label-mono text-navy/65">Condução</h4>
              <div className="mt-2">
                <Lista itens={assunto.steps} numerada />
              </div>

              <h4 className="mt-5 label-mono text-navy/65">Perguntas para fazer</h4>
              <div className="mt-2">
                <Lista itens={assunto.questions} />
              </div>

              <h4 className="mt-5 label-mono text-navy/65">O que costuma dar errado</h4>
              <ul className="mt-2 grid gap-2">
                {assunto.difficulties.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-led pl-3 font-sans text-[13.5px] leading-relaxed text-navy/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <h4 className="mt-5 label-mono text-navy/65">Como avaliar</h4>
              <div className="mt-2">
                <Lista itens={assunto.assessment} />
              </div>
            </DisclosureBloco>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {trilha.next ? (
            <Button href={trilha.next.href}>Próxima trilha: {trilha.next.label}</Button>
          ) : (
            <Button href="/planejar">Montar uma aula com isto</Button>
          )}
          <Button href="/trilhas" variant="secondary">
            Ver todas as trilhas
          </Button>
        </div>
      </div>
    </>
  );
}
