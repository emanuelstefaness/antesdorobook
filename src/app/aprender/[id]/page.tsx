import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DisclosureBloco } from "@/components/content/DisclosureBloco";
import { MarcarLido } from "@/components/content/MarcarLido";
import { Demo } from "@/components/demo/Demo";
import { BotaoFavorito } from "@/components/support/BotaoFavorito";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { BRAND } from "@/config/brand";
import { CONCEPTS, conceitoPorId } from "@/data/concepts";

export function generateStaticParams() {
  return CONCEPTS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const conceito = conceitoPorId(id);
  if (!conceito) return { title: `Conceito não encontrado — ${BRAND.name}` };
  return { title: `${conceito.title} — ${BRAND.name}`, description: conceito.summary };
}

function Lista({ itens }: { itens: string[] }) {
  return (
    <ul className="grid gap-2">
      {itens.map((item) => (
        <li
          key={item}
          className="border-l-2 border-cyan pl-3 font-sans text-[14px] leading-relaxed text-navy/80"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Paragrafo({ children }: { children: string }) {
  return <p className="font-sans text-[14px] leading-relaxed text-navy/80">{children}</p>;
}

function TituloDaLateral({ children }: { children: string }) {
  return <h2 className="label-mono mb-3 text-navy/60">{children}</h2>;
}

export default async function ConceitoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const conceito = conceitoPorId(id);
  if (!conceito) notFound();

  const anteriores = conceito.prerequisites
    .map((id) => conceitoPorId(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <header className="relative overflow-hidden border-b border-navy/10 bg-cream-hi">
        {/* O número do conceito em corpo enorme, atrás do texto. Ocupa a
            metade direita do cabeçalho, que antes ficava vazia em tela larga,
            e dá à página a cara de capítulo de um livro. Fica escondido no
            celular, onde não sobra espaço para ele. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 select-none font-display text-[13rem] font-extrabold leading-none tracking-display text-navy/[0.05] lg:block"
        >
          {String(conceito.order).padStart(2, "0")}
        </span>

        <div className="relative mx-auto max-w-[1400px] px-5 py-12">
          <span className="label-mono text-navy/65">
            Conceito {conceito.order} de {CONCEPTS.length}
          </span>
          <h1 className="mt-3 max-w-[24ch] font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-[1.0] tracking-display">
            {conceito.title}
          </h1>
          <p className="mt-4 max-w-[58ch] font-sans text-[15px] font-bold leading-relaxed text-navy">
            {conceito.willLearn}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 py-12">
        {/* Duas colunas a partir de lg: o texto tem largura de leitura e a
            coluna da direita segura o que a professora precisa alcançar a
            qualquer momento. Antes, tudo ficava numa coluna encostada à
            esquerda e sobravam 400px de página vazia. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div>
            {/* Único parágrafo aberto de início. Todo o resto entra nos blocos
                abaixo — empilhar tudo de uma vez foi exatamente a versão que o
                cliente recusou por ser informação demais de uma vez. */}
            <p className="max-w-[62ch] font-sans text-[17px] leading-relaxed text-navy">
              {conceito.summary}
            </p>

            <Reveal className="mt-10">
              <Demo spec={conceito.demo} />
            </Reveal>

            <Reveal className="mt-12">
              <h2 className="label-mono text-navy/60">Para levar para a sala</h2>
              <div className="mt-4 grid items-start gap-3 md:grid-cols-2">
                <DisclosureBloco titulo="Por que isso importa para você">
                  <Paragrafo>{conceito.whyTeacher}</Paragrafo>
                </DisclosureBloco>
                <DisclosureBloco titulo="Por que ensinar isso aos alunos">
                  <Paragrafo>{conceito.whyStudents}</Paragrafo>
                </DisclosureBloco>
                <DisclosureBloco titulo="Um exemplo do dia a dia">
                  <Paragrafo>{conceito.everydayExample}</Paragrafo>
                </DisclosureBloco>
                <DisclosureBloco titulo="Como explicar em 3 minutos">
                  <Paragrafo>{conceito.howToExplain}</Paragrafo>
                </DisclosureBloco>
                <DisclosureBloco titulo="Pergunta para lançar à turma">
                  <Paragrafo>{conceito.classQuestion}</Paragrafo>
                </DisclosureBloco>
                {/* purple = chegada, amber = atenção. As cores seguem a mesma
                    convenção do resto do site, não a ordem dos blocos. */}
                <DisclosureBloco titulo="Como saber se aprenderam" realce="purple">
                  <Lista itens={conceito.assessment} />
                </DisclosureBloco>
                <DisclosureBloco titulo="O que costuma dar errado" realce="amber">
                  <Lista itens={conceito.difficulties} />
                </DisclosureBloco>
              </div>
            </Reveal>
          </div>

          <aside className="grid h-fit gap-4 lg:sticky lg:top-24 lg:self-start">
            <Card faixa realce="cyan" className="pt-7">
              <TituloDaLateral>Leve para a sala</TituloDaLateral>
              <p className="mb-4 font-sans text-[13px] leading-relaxed text-navy/70">
                A atividade que põe este conceito em prática com a turma.
              </p>
              <Button href={conceito.quickActivity.href} className="w-full">
                {conceito.quickActivity.label}
              </Button>
            </Card>

            {anteriores.length > 0 ? (
              <Card>
                <TituloDaLateral>Antes deste, veja</TituloDaLateral>
                <ul className="grid gap-2">
                  {anteriores.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/aprender/${c.id}`}
                        className="font-sans text-[14px] font-semibold text-navy underline underline-offset-4 hover:text-navy/70"
                      >
                        {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            ) : null}

            <Card>
              <TituloDaLateral>Quando terminar</TituloDaLateral>
              <div className="grid gap-3">
                <MarcarLido id={`aprender:${conceito.id}`} rotulo="Conceito lido" />
                <BotaoFavorito kind="conceito" id={conceito.id} />
                <Button href={conceito.next.href} variant="secondary" className="w-full">
                  {conceito.next.label}
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </>
  );
}
