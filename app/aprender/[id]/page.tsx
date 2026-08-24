import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const conceito = conceitoPorId(params.id);
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

function ponteParaRobotica(id: string): string {
  const pontes: Record<string, string> = {
    "o-que-e-pensamento-computacional": "Antes de montar um robô, o professor precisa transformar o problema em partes, regras e testes. A robótica torna esse raciocínio visível em sensores, programa e atuadores.",
    "por-que-ensinar-pensamento-computacional": "Na robótica, o aluno deixa de apenas montar peças e passa a justificar escolhas, prever comportamentos e corrigir o próprio sistema.",
    "sequencia-e-instrucoes": "Motores, LEDs e servos obedecem à ordem do programa. Uma instrução correta no lugar errado produz um comportamento incorreto.",
    "entrada-processamento-e-saida": "Esta é a estrutura central de qualquer robô: o sensor percebe, o controlador aplica a regra e o atuador age.",
    decomposicao: "Um robô completo é dividido em energia, estrutura, sensores, controlador, programa e atuadores. Testar cada parte reduz a dificuldade.",
    "reconhecimento-de-padroes": "Sensores produzem muitos valores. Reconhecer padrões permite definir limites, detectar mudanças e criar respostas estáveis.",
    abstracao: "O programa ignora detalhes que não importam e trabalha com dados úteis, como perto/longe, claro/escuro ou seguro/perigoso.",
    algoritmos: "O algoritmo conecta a leitura do sensor à ação do robô e define exatamente quando cada comportamento acontece.",
    repeticao: "Robôs monitoram sensores e controlam movimentos continuamente; laços evitam repetir manualmente os mesmos comandos.",
    "teste-e-depuracao": "Um sistema robótico pode falhar na energia, conexão, entrada, lógica, saída ou mecanismo. Depurar é isolar e testar uma parte por vez.",
    "o-erro-como-parte-da-aprendizagem": "Protótipos raramente funcionam de primeira. O erro fornece evidências para ajustar estrutura, circuito, programa e calibração.",
  };
  return pontes[id] ?? "Este conceito ajuda o aluno a planejar, prever, testar e explicar o comportamento de um sistema robótico.";
}

export default function ConceitoPage({ params }: { params: { id: string } }) {
  const conceito = conceitoPorId(params.id);
  if (!conceito) notFound();

  const anteriores = conceito.prerequisites
    .map((id) => conceitoPorId(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <>
      <header className="relative overflow-hidden border-b border-navy/8 bg-cream-hi">
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

        <div className="relative mx-auto max-w-[1400px] px-5 py-8 md:px-8">
          <nav className="text-[12px] text-cyan">Aprender <span className="px-2 text-navy/30">/</span> Conceito {String(conceito.order).padStart(2,"0")} de {CONCEPTS.length}</nav>
          <span className="sr-only">
            Conceito {conceito.order} de {CONCEPTS.length}
          </span>
          <h1 className="mt-4 max-w-[24ch] font-display text-[clamp(2.2rem,4.3vw,3.35rem)] font-extrabold leading-[1.0] tracking-display">
            {conceito.title}
          </h1>
          <p className="mt-4 max-w-[58ch] font-sans text-[15px] font-bold leading-relaxed text-navy">
            {conceito.willLearn}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 py-5 md:px-8">
        {/* Duas colunas a partir de lg: o texto tem largura de leitura e a
            coluna da direita segura o que a professora precisa alcançar a
            qualquer momento. Antes, tudo ficava numa coluna encostada à
            esquerda e sobravam 400px de página vazia. */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            {/* Único parágrafo aberto de início. Todo o resto entra nos blocos
                abaixo — empilhar tudo de uma vez foi exatamente a versão que o
                cliente recusou por ser informação demais de uma vez. */}
            <div className="overflow-hidden rounded-card border border-navy/8 bg-cream-hi p-4 shadow-card">
              <p className="font-sans text-[15px] font-bold leading-relaxed text-navy">{conceito.summary}</p>
              {conceito.order === 1 ? <div className="relative mt-4 aspect-[2/1] overflow-hidden rounded-card-sm bg-cream"><Image unoptimized fill src="/assets/antes-do-robo/conceito-problema-para-passos.png" alt="Do problema confuso à solução em passos claros" className="object-cover"/></div> : null}
            </div>

            <Reveal className="mt-4">
              <Demo spec={conceito.demo} />
            </Reveal>

            <Reveal className="mt-4">
              <div className="rounded-card border border-cyan/25 bg-cyan/8 p-5">
                <p className="label-mono text-cyan">Ponte para a robótica</p>
                <h2 className="mt-2 text-[20px]">Por que aprender isto antes de montar?</h2>
                <p className="mt-3 max-w-[68ch] text-[13.5px] leading-relaxed text-navy/72">{ponteParaRobotica(conceito.id)}</p>
                <Link href="/robotica" className="mt-4 inline-flex text-[12px] font-bold text-navy underline">Ver como isso aparece nos sistemas robóticos →</Link>
              </div>
            </Reveal>

            <Reveal className="mt-4">
              <h2 className="label-mono text-navy/60">Para levar para a sala</h2>
              <div className="mt-3 grid items-start gap-3 md:grid-cols-2 xl:grid-cols-3">
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
              {conceito.order === 1 ? <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl bg-amber/10"><Image unoptimized fill src="/assets/antes-do-robo/icone-algoritmo-sanduiche.png" alt="Sanduíche ilustrado" className="object-cover"/></div> : null}
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
