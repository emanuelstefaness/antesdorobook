import { BotaoFavorito } from "@/components/support/BotaoFavorito";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DisclosureBloco } from "@/components/content/DisclosureBloco";
import { MarcarLido } from "@/components/content/MarcarLido";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/config/brand";
import { TRAILS, assuntosDaTrilha, trilhaPorId } from "@/data/trails";
import type { Material } from "@/data/types";

const MATERIAL_NAMES: Record<Material, string> = {
  nenhum: "nenhum material especial",
  "papel-e-lapis": "papel e lápis",
  cartoes: "cartões impressos",
  "fita-crepe": "fita-crepe",
  tabuleiro: "tabuleiro Antes do Robô",
  microbit: "micro:bit (uma por dupla, se possível)",
  computador: "computador com MakeCode aberto",
  reciclaveis: "materiais recicláveis limpos",
};

export function generateStaticParams() {
  return TRAILS.map((t) => ({ id: t.id }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const trilha = trilhaPorId(params.id);
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

export default function TrilhaPage({ params }: { params: { id: string } }) {
  const trilha = trilhaPorId(params.id);
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

              <div className="mt-6 rounded-card-sm border border-cyan/25 bg-cyan/6 p-4">
                <p className="label-mono text-cyan">Antes dos alunos entrarem</p>
                <p className="mt-2 text-[13px] font-semibold text-navy">Separe: {assunto.materials.map((item) => MATERIAL_NAMES[item]).join(" · ")}</p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-navy/68">{assunto.preparation}</p>
                <p className="mt-3 text-[12px] leading-relaxed text-navy/60"><strong>Teste de prontidão:</strong> faça a atividade uma vez como aluno e deixe o primeiro resultado correto pronto para comparação.</p>
              </div>

              <h4 className="mt-6 label-mono text-purple">Roteiro minuto a minuto · 50 minutos</h4>
              <ol className="mt-3 grid gap-3">
                <li className="rounded-card-sm border border-navy/8 bg-white p-4"><div className="flex gap-3"><span className="label-mono shrink-0 text-cyan">0–7 min</span><div><strong className="text-[13.5px]">Abertura sem resposta pronta</strong><p className="mt-1 text-[12.5px] leading-relaxed text-navy/68">{assunto.howToExplain}</p><p className="mt-2 border-l-2 border-amber pl-3 text-[12px] italic text-navy/65">Diga: “Primeiro vamos prever. Ainda não vale mexer nem procurar a resposta.”</p></div></div></li>
                {assunto.steps.map((step, index) => {
                  const interval = Math.floor(33 / assunto.steps.length);
                  const start = 7 + index * interval;
                  const end = index === assunto.steps.length - 1 ? 40 : start + interval;
                  return <li key={step} className="rounded-card-sm border border-navy/8 bg-white p-4"><div className="flex gap-3"><span className="label-mono shrink-0 text-cyan">{start}–{end} min</span><div><strong className="text-[13.5px]">Etapa {index + 1}: professor faz</strong><p className="mt-1 text-[12.5px] leading-relaxed text-navy/72">{step}</p><p className="mt-2 text-[12px] leading-relaxed text-navy/60"><strong>Pergunte antes de ajudar:</strong> {assunto.questions[index % assunto.questions.length]}</p><p className="mt-1 text-[12px] leading-relaxed text-navy/60"><strong>Observe nos grupos:</strong> {assunto.assessment[index % assunto.assessment.length]}.</p></div></div></li>;
                })}
                <li className="rounded-card-sm border border-green/25 bg-green/6 p-4"><div className="flex gap-3"><span className="label-mono shrink-0 text-green">40–47 min</span><div><strong className="text-[13.5px]">Teste e depuração</strong><p className="mt-1 text-[12.5px] leading-relaxed text-navy/68">Cada dupla prevê um resultado, executa uma vez, registra o que ocorreu e muda somente uma parte. Quem terminou provoca um erro e explica como o encontrou.</p></div></div></li>
                <li className="rounded-card-sm border border-purple/25 bg-purple/6 p-4"><div className="flex gap-3"><span className="label-mono shrink-0 text-purple">47–50 min</span><div><strong className="text-[13.5px]">Fechamento e evidência</strong><p className="mt-1 text-[12.5px] leading-relaxed text-navy/68">Um grupo mostra o resultado e outro explica a lógica. Registre como evidência: {assunto.assessment.join("; ").toLowerCase()}.</p></div></div></li>
              </ol>

              <h4 className="mt-6 label-mono text-navy/65">Perguntas e respostas esperadas</h4>
              <ul className="mt-2 grid gap-3">{assunto.questions.map((question, index) => <li key={question} className="rounded-card-sm bg-navy/4 p-4"><p className="text-[13px] font-bold">Pergunte: {question}</p><p className="mt-2 text-[12.5px] leading-relaxed text-navy/65"><strong>A resposta não precisa ser idêntica, mas deve demonstrar:</strong> {assunto.assessment[index % assunto.assessment.length]}.</p></li>)}</ul>

              <h4 className="mt-6 label-mono text-coral">Diagnóstico específico</h4>
              <ul className="mt-2 grid gap-2">
                {assunto.difficulties.map((item) => (
                  <li
                    key={item}
                    className="rounded-card-sm border border-coral/18 bg-coral/5 p-4 font-sans text-[13px] leading-relaxed text-navy/80"
                  >
                    <strong>Sinal observado:</strong> {item}<br/><span className="text-navy/65"><strong>Faça nesta ordem:</strong> peça a previsão → localize a última etapa que funcionou → repita só a próxima etapa → compare com o exemplo correto → altere uma coisa e teste.</span>
                  </li>
                ))}
              </ul>

              <h4 className="mt-6 label-mono text-green">Como avaliar sem prova</h4>
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
