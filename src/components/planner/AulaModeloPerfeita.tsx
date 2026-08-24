"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Cpu,
  ExternalLink,
  GraduationCap,
  Lightbulb,
  Printer,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { LessonPlan } from "@/data/lessonPlans";
import { NOMES_DAS_TURMAS, NOMES_DOS_NIVEIS_DE_PLANO } from "@/data/lessonPlans";
import type { GuiaTecnicoMicrobit } from "@/data/microbitTechnicalGuides";
import { PERFECT_LESSON } from "@/data/perfectLesson";
import { BotaoFavorito } from "@/components/support/BotaoFavorito";
import { MarcarLido } from "@/components/content/MarcarLido";
import { Button } from "@/components/ui/Button";
import { BotaoImprimir } from "./BotaoImprimir";
import { CopiarCodigo } from "./CopiarCodigo";
import { EsquemaDeLigacao } from "./EsquemaDeLigacao";
import { ProgramaEmBlocos } from "./ProgramaEmBlocos";

type StepId = "aprender" | "preparar" | "aplicar" | "avaliar";

const STEPS: Array<{ id: StepId; label: string; description: string; icon: typeof GraduationCap }> = [
  { id: "aprender", label: "Aprenda", description: "Entenda para explicar", icon: GraduationCap },
  { id: "preparar", label: "Prepare", description: "Monte e teste sozinho", icon: Wrench },
  { id: "aplicar", label: "Aplique", description: "Conduza a turma", icon: BookOpenCheck },
  { id: "avaliar", label: "Avalie", description: "Observe e resolva erros", icon: ClipboardCheck },
];

function ResultadoVisual() {
  return (
    <div className="grid gap-3 sm:grid-cols-2" aria-label="Comparação do resultado esperado no claro e no escuro">
      {[
        { label: "Ambiente escuro", value: "35", on: true, note: "35 < 80: a matriz acende" },
        { label: "Ambiente claro", value: "160", on: false, note: "160 < 80 é falso: a matriz apaga" },
      ].map((state) => (
        <div key={state.label} className="rounded-card-sm border border-navy/10 bg-white p-4">
          <div className="flex items-center justify-between gap-3"><p className="text-[12px] font-bold">{state.label}</p><span className="rounded-pill bg-cyan/10 px-2 py-1 font-mono text-[10px] font-bold text-cyan">leitura {state.value}</span></div>
          <div className="mx-auto mt-4 grid w-fit grid-cols-5 gap-1 rounded-[14px] bg-navy p-3" aria-hidden>
            {Array.from({ length: 25 }, (_, index) => <span key={index} className={`h-3 w-3 rounded-full ${state.on ? "bg-led shadow-[0_0_8px_rgba(255,87,87,.8)]" : "bg-white/12"}`}/>) }
          </div>
          <p className="mt-3 text-center text-[11.5px] leading-relaxed text-navy/65">{state.note}</p>
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <header><p className="label-mono text-cyan">{eyebrow}</p><h2 className="mt-2 font-display text-[clamp(1.7rem,3vw,2.3rem)] font-extrabold leading-tight tracking-display">{title}</h2>{description ? <p className="mt-3 max-w-[70ch] text-[13.5px] leading-relaxed text-navy/68">{description}</p> : null}</header>;
}

export function AulaModeloPerfeita({ plan, guide }: { plan: LessonPlan; guide: GuiaTecnicoMicrobit }) {
  const [active, setActive] = useState<StepId>("aprender");
  const [checked, setChecked] = useState<boolean[]>(PERFECT_LESSON.readiness.map(() => false));
  const activeIndex = STEPS.findIndex((step) => step.id === active);
  const ready = checked.every(Boolean);

  function goTo(step: StepId) {
    setActive(step);
    requestAnimationFrame(() => document.getElementById("etapas-da-aula")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <article className="mx-auto max-w-[1400px] px-5 py-12">
      <header>
        <div className="flex flex-wrap items-center gap-2"><span className="label-mono text-purple">Aula-modelo · padrão completo</span><span className="rounded-pill bg-amber/15 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-label text-navy">validação física pendente</span></div>
        <h1 className="mt-3 max-w-[24ch] font-display text-[clamp(2rem,4.6vw,3.2rem)] leading-none tracking-display">{plan.title}</h1>
        <p className="mt-4 max-w-[65ch] text-[15px] leading-relaxed text-navy/78">{PERFECT_LESSON.promise}</p>
        <div className="mt-5 flex flex-wrap gap-2 text-[11.5px] font-bold text-navy/65"><span className="rounded-pill border border-navy/10 bg-white px-3 py-2">{plan.duration} minutos</span><span className="rounded-pill border border-navy/10 bg-white px-3 py-2">{NOMES_DAS_TURMAS[plan.classSize]}</span><span className="rounded-pill border border-navy/10 bg-white px-3 py-2">{NOMES_DOS_NIVEIS_DE_PLANO[plan.level]}</span><span className="rounded-pill border border-navy/10 bg-white px-3 py-2">BBC micro:bit V1 ou V2</span></div>
        <div className="mt-6 flex flex-wrap items-center gap-3 no-print"><BotaoImprimir/><BotaoFavorito kind="plano" id={plan.id}/><MarcarLido id={`planejar:${plan.id}`} rotulo="Aula concluída"/><Button href="/planejar" variant="secondary">Encontrar outra aula</Button></div>
      </header>

      <section className="mt-10 grid gap-5 rounded-card border border-cyan/20 bg-cream-hi p-5 shadow-card lg:grid-cols-[1fr_370px] lg:p-7">
        <div><p className="label-mono text-cyan">Veja primeiro o que será construído</p><h2 className="mt-2 text-[24px]">Uma luz que toma decisões</h2><p className="mt-3 max-w-[62ch] text-[13.5px] leading-relaxed text-navy/68">{PERFECT_LESSON.everyday}</p><div className="mt-5 flex items-start gap-3 rounded-card-sm bg-cyan/8 p-4"><Lightbulb className="mt-0.5 shrink-0 text-cyan"/><p className="text-[13px] leading-relaxed text-navy/72"><strong>Fluxo do sistema:</strong> sensor de luz → valor numérico → comparação com o limite → matriz acesa ou apagada.</p></div></div>
        <ResultadoVisual/>
      </section>

      <section id="etapas-da-aula" className="scroll-mt-6 mt-10">
        <div className="rounded-card bg-navy p-3 text-white shadow-panel no-print">
          <div className="mb-3 flex items-center justify-between gap-3 px-2"><p className="label-mono text-cyan">Sua rota nesta aula</p><p className="font-mono text-[10px] text-white/55">Etapa {activeIndex + 1} de {STEPS.length}</p></div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan transition-all" style={{ width: `${((activeIndex + 1) / STEPS.length) * 100}%` }}/></div>
          <div role="tablist" aria-label="Etapas da aula" className="mt-3 grid gap-2 sm:grid-cols-4">{STEPS.map((step, index) => { const Icon = step.icon; const selected = step.id === active; return <button key={step.id} id={`tab-${step.id}`} role="tab" aria-selected={selected} aria-controls={`panel-${step.id}`} onClick={() => goTo(step.id)} className={`min-h-[72px] rounded-card-sm border p-3 text-left transition ${selected ? "border-cyan bg-cyan/15" : "border-white/10 bg-white/5 hover:bg-white/10"}`}><span className="flex items-center gap-2"><span className={`flex h-7 w-7 items-center justify-center rounded-full ${selected ? "bg-cyan text-navy" : "bg-white/10 text-white/65"}`}>{index < activeIndex ? <Check size={14}/> : <Icon size={14}/>}</span><strong className="text-[13px]">{step.label}</strong></span><span className="mt-1.5 block pl-9 text-[10.5px] text-white/55">{step.description}</span></button>; })}</div>
        </div>

        <section id="panel-aprender" role="tabpanel" aria-labelledby="tab-aprender" className={`mt-8 print:block ${active === "aprender" ? "block" : "hidden"}`}>
          <SectionTitle eyebrow="Etapa 1 · Aprenda" title="Entenda antes de explicar" description="Leia as quatro ideias, use as analogias e responda ao teste rápido. O professor não precisa decorar definições: precisa conseguir explicar com suas próprias palavras."/>
          <div className="mt-6 grid gap-4 md:grid-cols-2">{PERFECT_LESSON.concepts.map((concept) => <article key={concept.name} className="rounded-card-sm border border-navy/8 bg-white p-5 shadow-card"><div className="flex items-center justify-between gap-3"><h3 className="text-[18px]">{concept.name}</h3><Link href={concept.href} className="no-print text-[10.5px] font-bold text-navy underline">Aprender este conceito</Link></div><p className="mt-3 text-[13px] leading-relaxed text-navy/72">{concept.explanation}</p><p className="mt-3 border-l-2 border-purple pl-3 text-[12px] leading-relaxed text-navy/62"><strong>Analogia:</strong> {concept.analogy}</p></article>)}</div>
          <div className="mt-8 rounded-card border border-cyan/20 bg-cyan/7 p-5 sm:p-6"><h3 className="text-[20px]">Teste rápido de prontidão</h3><p className="mt-2 text-[12.5px] text-navy/65">Marque cada item depois de responder em voz alta. Abra a resposta somente para conferir.</p><div className="mt-5 grid gap-4">{PERFECT_LESSON.readiness.map((item, index) => <div key={item.question} className="rounded-card-sm bg-white p-4"><label className="flex cursor-pointer items-start gap-3"><input type="checkbox" checked={checked[index]} onChange={(event) => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.checked : value))} className="mt-1 h-4 w-4 accent-cyan"/><span className="text-[13px] font-bold leading-relaxed">{item.question}</span></label><details className="mt-3 pl-7"><summary className="cursor-pointer text-[11px] font-bold text-navy/60 underline">Conferir resposta esperada</summary><p className="mt-2 text-[12.5px] leading-relaxed text-navy/68">{item.answer}</p></details></div>)}</div><div className={`mt-5 flex items-center gap-3 rounded-card-sm p-4 ${ready ? "bg-green/12" : "bg-amber/12"}`}>{ready ? <CheckCircle2 className="shrink-0 text-green"/> : <ShieldCheck className="shrink-0 text-amber"/>}<p className="text-[12.5px] font-bold">{ready ? "Você conferiu os três pontos. Avance para montar e testar." : "Responda e marque os três pontos antes de avançar."}</p></div></div>
          <div className="mt-7 no-print"><button type="button" disabled={!ready} onClick={() => goTo("preparar")} className="inline-flex min-h-[44px] items-center gap-2 rounded-pill bg-coral px-5 text-[12px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Continuar para Prepare <ArrowRight size={15}/></button></div>
        </section>

        <section id="panel-preparar" role="tabpanel" aria-labelledby="tab-preparar" className={`mt-8 print:block ${active === "preparar" ? "block" : "hidden"}`}>
          <SectionTitle eyebrow="Etapa 2 · Prepare" title="Monte e teste antes da turma chegar" description="Faça a versão principal sem fios. A extensão com LED externo só deve ser tentada depois que o programa básico estiver funcionando."/>
          <div className="mt-6 grid gap-4 lg:grid-cols-2"><div className="rounded-card-sm bg-white p-5 shadow-card"><h3 className="text-[18px]">Materiais e cuidados</h3><div className="mt-4 grid gap-4">{PERFECT_LESSON.materials.map((item, index) => <div key={item.name} className="grid grid-cols-[46px_1fr] gap-3 border-b border-navy/8 pb-4 last:border-0 last:pb-0"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan/10 text-cyan">{index === 0 ? <Cpu size={20}/> : index === 3 ? <Printer size={20}/> : <Wrench size={20}/>}</span><div><p className="text-[13px] font-bold">{item.name}</p><p className="mt-1 text-[11.5px] text-navy/55">{item.quantity}</p><p className="mt-2 text-[12px] leading-relaxed text-navy/68">{item.use}</p><p className="mt-2 text-[11.5px] leading-relaxed text-coral"><strong>Cuidado:</strong> {item.caution}</p></div></div>)}</div></div><div className="rounded-card-sm border border-cyan/15 bg-cyan/7 p-5"><div className="flex items-start gap-4"><Image src="/imagens/objetos/microbit.png" alt="BBC micro:bit visto de frente" width={130} height={130} className="h-[110px] w-[110px] object-contain"/><div><p className="label-mono text-cyan">Versão principal</p><h3 className="mt-2 text-[18px]">Nenhum fio externo</h3><p className="mt-2 text-[12.5px] leading-relaxed text-navy/68">O sensor de luz e a matriz de LEDs já fazem parte da placa. Conecte apenas o cabo USB de dados para programar.</p></div></div><EsquemaDeLigacao wiring={guide.wiring}/></div></div>
          <div className="mt-7 rounded-card border border-navy/10 bg-white p-5 shadow-card sm:p-7"><p className="label-mono text-purple">MakeCode · monte exatamente nesta ordem</p><div className="mt-5 grid gap-6 lg:grid-cols-2"><div><h3 className="text-[18px]">Blocos e encaixes</h3><ProgramaEmBlocos blocks={guide.blocks}/></div><div><h3 className="text-[18px]">Instruções para quem nunca programou</h3><ol className="mt-4 grid gap-3">{guide.blocks.map((step) => <li key={step.order} className="grid grid-cols-[28px_1fr] gap-3 text-[12.5px] leading-relaxed"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy font-mono text-[10px] font-bold text-white">{step.order}</span><span>Abra <strong>{step.category}</strong>, arraste <strong>{step.block}</strong> e {step.place}.</span></li>)}</ol></div></div></div>
          <div className="mt-7 grid gap-5 lg:grid-cols-2"><div className="rounded-card-sm bg-navy p-5 text-white"><h3 className="text-[18px] text-white">Código TypeScript equivalente</h3><pre className="mt-4 max-h-[430px] overflow-auto rounded-card-sm bg-black/30 p-4 text-[11px] leading-relaxed text-cyan"><code>{guide.code}</code></pre><div className="mt-4 flex flex-wrap gap-3"><CopiarCodigo code={guide.code}/><a href="/downloads/luz-noturna-automatica.ts" download className="inline-flex min-h-[40px] items-center rounded-pill border border-white/20 px-4 text-[11px] font-bold text-white">Baixar código .ts</a><a href="https://makecode.microbit.org/#editor" target="_blank" rel="noreferrer" className="inline-flex min-h-[40px] items-center gap-2 rounded-pill border border-white/20 px-4 text-[11px] font-bold text-white">Abrir MakeCode <ExternalLink size={13}/></a></div></div><div className="rounded-card-sm border border-amber/20 bg-amber/8 p-5"><h3 className="text-[18px]">Ensaio obrigatório do professor</h3><ul className="mt-4 grid gap-3">{PERFECT_LESSON.rehearsal.map((item) => <li key={item} className="flex gap-2 text-[12.5px] leading-relaxed text-navy/70"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-amber"/>{item}</li>)}</ul><div className="mt-5 rounded-card-sm bg-white p-4"><p className="text-[12px] font-bold">Link público e arquivo .hex</p><p className="mt-2 text-[11.5px] leading-relaxed text-navy/62">Só devem receber o selo de disponíveis depois que esta montagem for testada fisicamente e o link for aberto em uma janela anônima. O portal não inventa um endereço ou um arquivo não validado.</p></div></div></div>
          <details className="mt-7 rounded-card-sm border border-purple/20 bg-purple/7 p-5"><summary className="cursor-pointer text-[14px] font-bold">Extensão opcional: acender um LED externo</summary><div className="mt-5 grid gap-5 lg:grid-cols-2"><div><p className="text-[12.5px] leading-relaxed text-navy/68">Com a placa desligada, ligue <strong>P0 → resistor de 220–330 Ω → perna longa do LED</strong>. Ligue a perna curta do LED ao <strong>GND</strong>. Nunca ligue o LED diretamente sem resistor.</p><div className="mt-4 grid gap-2 text-[12px]"><p className="rounded bg-white p-3"><strong className="text-coral">Fio de sinal:</strong> P0 até o resistor</p><p className="rounded bg-white p-3"><strong className="text-amber">Proteção:</strong> resistor até a perna longa</p><p className="rounded bg-white p-3"><strong>Retorno:</strong> perna curta até GND</p></div></div><pre className="overflow-auto rounded-card-sm bg-navy p-4 text-[11px] leading-relaxed text-cyan"><code>{`basic.forever(function () {\n  if (input.lightLevel() < 80) {\n    pins.digitalWritePin(DigitalPin.P0, 1)\n  } else {\n    pins.digitalWritePin(DigitalPin.P0, 0)\n  }\n  basic.pause(200)\n})`}</code></pre></div></details>
          <div className="mt-7 no-print"><button type="button" onClick={() => goTo("aplicar")} className="inline-flex min-h-[44px] items-center gap-2 rounded-pill bg-coral px-5 text-[12px] font-bold text-white">Continuar para Aplique <ArrowRight size={15}/></button></div>
        </section>

        <section id="panel-aplicar" role="tabpanel" aria-labelledby="tab-aplicar" className={`mt-8 print:block ${active === "aplicar" ? "block" : "hidden"}`}>
          <SectionTitle eyebrow="Etapa 3 · Aplique" title="Conduza a aula minuto a minuto" description="A coluna Evidência mostra o que observar para saber se a turma está compreendendo — não apenas copiando os blocos."/>
          <div className="mt-6 overflow-x-auto rounded-card-sm border border-navy/10 bg-white shadow-card"><table className="w-full min-w-[850px] border-collapse text-left text-[12px]"><thead className="bg-navy text-white"><tr><th className="p-3">Tempo</th><th className="p-3">O professor faz</th><th className="p-3">Os alunos fazem</th><th className="p-3">Evidência esperada</th></tr></thead><tbody>{PERFECT_LESSON.timeline.map((row) => <tr key={row.time} className="border-b border-navy/8 align-top"><td className="p-3 font-mono font-bold text-cyan">{row.time}</td><td className="p-3 leading-relaxed text-navy/70">{row.teacher}</td><td className="p-3 leading-relaxed text-navy/70">{row.students}</td><td className="p-3 leading-relaxed text-navy/70">{row.evidence}</td></tr>)}</tbody></table></div>
          <div className="mt-7 grid gap-5 lg:grid-cols-2"><div className="rounded-card-sm border border-amber/20 bg-amber/8 p-5"><h3 className="text-[18px]">Falas sugeridas</h3><ul className="mt-4 grid gap-3">{PERFECT_LESSON.teacherTalk.map((item) => <li key={item} className="border-l-2 border-amber pl-3 text-[12.5px] italic leading-relaxed text-navy/68">“{item.replace(/^“|”$/g, "")}”</li>)}</ul></div><div className="rounded-card-sm border border-cyan/20 bg-cyan/7 p-5"><h3 className="text-[18px]">Perguntas e respostas esperadas</h3><div className="mt-4 grid gap-4">{PERFECT_LESSON.questions.map((item) => <details key={item.question} className="rounded bg-white p-3"><summary className="cursor-pointer text-[12.5px] font-bold leading-relaxed">{item.question}</summary><p className="mt-2 text-[12px] leading-relaxed text-navy/65">{item.answer}</p></details>)}</div></div></div>
          <div className="mt-7"><h3 className="text-[20px]">Adaptações sem improviso</h3><div className="mt-4 grid gap-4 sm:grid-cols-2">{PERFECT_LESSON.adaptations.map((item) => <article key={item.title} className="rounded-card-sm border border-navy/8 bg-white p-4 shadow-card"><p className="text-[13px] font-bold">{item.title}</p><p className="mt-2 text-[12px] leading-relaxed text-navy/65">{item.text}</p></article>)}</div></div>
          <div className="mt-7 no-print"><button type="button" onClick={() => goTo("avaliar")} className="inline-flex min-h-[44px] items-center gap-2 rounded-pill bg-coral px-5 text-[12px] font-bold text-white">Continuar para Avalie <ArrowRight size={15}/></button></div>
        </section>

        <section id="panel-avaliar" role="tabpanel" aria-labelledby="tab-avaliar" className={`mt-8 print:block ${active === "avaliar" ? "block" : "hidden"}`}>
          <SectionTitle eyebrow="Etapa 4 · Avalie" title="Observe a aprendizagem e diagnostique cada erro" description="A aula termina quando o aluno consegue explicar e testar o sistema — não quando a matriz simplesmente acende."/>
          <div className="mt-6 rounded-card-sm border border-coral/20 bg-white p-5 shadow-card"><h3 className="text-[18px]">Diagnóstico técnico</h3><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[820px] border-collapse text-left text-[12px]"><thead><tr className="border-b border-navy/15"><th className="p-2">Problema</th><th className="p-2">Causa provável</th><th className="p-2">Como verificar</th><th className="p-2">Como corrigir</th></tr></thead><tbody>{[...guide.diagnostics, { symptom: "A matriz acende no claro e apaga no escuro", cause: "A comparação foi invertida.", check: "Mostre o valor atual e leia a condição em voz alta.", fix: "Use ‘nível de luz menor que limite’ para acender no escuro." }, { symptom: "A saída pisca perto do limite", cause: "Pequenas variações atravessam o mesmo limite repetidamente.", check: "Observe os valores por dez segundos sem mover a placa.", fix: "Ajuste o limite ou, no desafio avançado, use dois limites para criar uma faixa de estabilidade." }].map((item) => <tr key={item.symptom} className="border-b border-navy/8 align-top"><td className="p-2 font-bold">{item.symptom}</td><td className="p-2 leading-relaxed text-navy/65">{item.cause}</td><td className="p-2 leading-relaxed text-navy/65">{item.check}</td><td className="p-2 leading-relaxed text-navy/65">{item.fix}</td></tr>)}</tbody></table></div></div>
          <div className="mt-7 rounded-card-sm bg-navy p-5 text-white"><div className="flex items-center gap-3"><Sparkles className="text-cyan"/><h3 className="text-[20px] text-white">Rubrica de avaliação</h3></div><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[820px] border-collapse text-left text-[12px]"><thead><tr className="border-b border-white/15"><th className="p-2">Critério</th><th className="p-2">Iniciando</th><th className="p-2">Em desenvolvimento</th><th className="p-2">Alcançou</th></tr></thead><tbody>{PERFECT_LESSON.rubric.map((row) => <tr key={row.criterion} className="border-b border-white/10 align-top"><td className="p-2 font-bold text-cyan">{row.criterion}</td><td className="p-2 leading-relaxed text-white/60">{row.beginning}</td><td className="p-2 leading-relaxed text-white/70">{row.developing}</td><td className="p-2 leading-relaxed text-white/80">{row.achieved}</td></tr>)}</tbody></table></div></div>
          <div className="mt-7 grid gap-5 lg:grid-cols-2"><div className="rounded-card-sm border border-purple/20 bg-purple/7 p-5"><h3 className="text-[18px]">Ficha do aluno</h3><ol className="mt-4 grid gap-3">{PERFECT_LESSON.studentSheet.map((item, index) => <li key={item} className="grid grid-cols-[24px_1fr] gap-2 text-[12.5px] leading-relaxed"><span className="font-mono font-bold text-purple">{index + 1}.</span>{item}</li>)}</ol><p className="mt-4 text-[11.5px] text-navy/55">Use o botão Imprimir no topo. Todas as quatro etapas e esta ficha aparecem na versão de impressão.</p></div><div className="rounded-card-sm border border-green/20 bg-green/8 p-5"><h3 className="text-[18px]">Critério para o selo final</h3><ul className="mt-4 grid gap-3 text-[12.5px] leading-relaxed text-navy/68"><li className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-green"/>Código revisado e build do portal validado.</li><li className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-green"/>Comportamento esperado definido para valores acima e abaixo do limite.</li><li className="flex gap-2"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-amber"/>Teste físico, link público e arquivo .hex ainda devem ser confirmados antes do selo “Testada e pronta para aplicar”.</li></ul></div></div>
          <nav className="mt-8 flex flex-wrap gap-3 no-print"><Button href="/planejar/atividade-extra-070-medidor-de-luminosidade">Próxima aula: medir luminosidade</Button><Button href="/aulas/caminho" variant="secondary">Ver caminho completo</Button><Button href="/makecode/entrada" variant="secondary">Revisar sensores no MakeCode</Button></nav>
        </section>
      </section>
    </article>
  );
}
