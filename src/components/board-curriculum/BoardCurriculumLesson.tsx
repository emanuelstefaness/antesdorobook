import Link from "next/link";
import {
  ArrowLeft,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Flag,
  GraduationCap,
  MessageCircleQuestion,
  PackageCheck,
  Printer,
  Route,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";
import { BotaoImprimir } from "@/components/planner/BotaoImprimir";
import { CurriculumBoardMap } from "./CurriculumBoardMap";
import type { BoardAcrossCurriculumActivity } from "@/data/boardAcrossCurriculum";

function SectionTitle({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return <div><p className="label-mono text-cyan">{eyebrow}</p><h2 className="mt-2 font-display text-[clamp(1.65rem,3vw,2.25rem)] font-extrabold leading-tight">{title}</h2>{text ? <p className="mt-3 max-w-[75ch] text-[13.5px] leading-relaxed text-navy/65">{text}</p> : null}</div>;
}

function NumberedList({ items, tone = "cyan" }: { items: string[]; tone?: "cyan" | "coral" | "amber" | "purple" }) {
  const colors = { cyan: "bg-cyan text-navy", coral: "bg-coral text-white", amber: "bg-amber text-navy", purple: "bg-purple text-white" };
  return <ol className="grid gap-3">{items.map((item, index) => <li key={`${index}-${item}`} className="grid grid-cols-[30px_1fr] gap-3 text-[13px] leading-relaxed text-navy/72"><span className={`flex h-7 w-7 items-center justify-center rounded-full font-mono text-[10px] font-bold ${colors[tone]}`}>{index + 1}</span><span className="pt-1">{item}</span></li>)}</ol>;
}

function StudentCard({ label, title, body, footer }: { label: string; title: string; body: string; footer: string }) {
  return <article className="break-inside-avoid rounded-card-sm border-2 border-dashed border-navy/25 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-3"><p className="label-mono text-cyan">{label}</p><span className="text-[9px] font-bold uppercase text-navy/35">Recortar</span></div>
    <h3 className="mt-5 font-display text-[21px] font-extrabold leading-tight">{title}</h3>
    <p className="mt-4 text-[13px] leading-relaxed text-navy/72">{body}</p>
    <p className="mt-6 border-t border-navy/10 pt-3 font-mono text-[9px] font-bold uppercase tracking-label text-navy/45">{footer}</p>
  </article>;
}

export function BoardCurriculumLesson({ activity }: { activity: BoardAcrossCurriculumActivity }) {
  return <>
    <header className="relative overflow-hidden border-b border-navy/8 bg-cream-hi">
      <div aria-hidden className="absolute -right-20 -top-28 h-80 w-80 rounded-full bg-cyan/10 blur-3xl"/>
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-8 px-5 py-8 md:px-8 md:py-12 lg:grid-cols-[1.08fr_.92fr]">
        <div>
          <Link href="/tabuleiro-em-todas-as-areas" className="no-print inline-flex items-center gap-2 text-[11px] font-bold text-navy/55 hover:text-navy"><ArrowLeft size={15}/> Voltar às atividades por área</Link>
          <p className="label-mono mt-7 text-cyan">{activity.subject} · aplicação completa</p>
          <h1 className="mt-3 max-w-[18ch] font-display text-[clamp(2.1rem,5vw,4rem)] font-extrabold leading-[.98] tracking-display">{activity.title}</h1>
          <p className="mt-5 max-w-[68ch] text-[15px] leading-relaxed text-navy/70">{activity.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2 text-[10.5px] font-bold">
            <span className="rounded-pill bg-navy px-3 py-2 text-white">{activity.gradeBands.join(", ")} anos</span>
            <span className="rounded-pill bg-cyan/15 px-3 py-2 text-navy">{activity.duration} minutos</span>
            <span className="rounded-pill bg-purple/12 px-3 py-2 text-purple">{activity.difficulty}</span>
            <span className="rounded-pill bg-amber/18 px-3 py-2 text-navy">Sem computador durante a execução</span>
          </div>
          <div className="no-print mt-6"><BotaoImprimir rotulo="Imprimir roteiro e cartas"/></div>
        </div>
        <div className="rounded-card bg-white p-4 shadow-card sm:p-6"><CurriculumBoardMap activity={activity}/></div>
      </div>
    </header>

    <div className="no-print sticky top-[72px] z-20 border-b border-navy/8 bg-cream/90 backdrop-blur-xl">
      <nav aria-label="Seções desta atividade" className="scrollbar-hidden mx-auto flex max-w-[1400px] gap-2 overflow-x-auto px-5 py-3 text-[10.5px] font-bold md:px-8">
        {[["objetivo","Entender"],["preparacao","Preparar"],["mapa","Montar"],["conducao","Conduzir"],["respostas","Respostas"],["erros","Corrigir erros"],["avaliacao","Avaliar"],["impressao","Cartas"]].map(([id,label]) => <a key={id} href={`#${id}`} className="shrink-0 rounded-pill border border-navy/12 bg-white px-3 py-2 text-navy/65 hover:border-cyan hover:text-navy">{label}</a>)}
      </nav>
    </div>

    <div className="mx-auto max-w-[1180px] space-y-16 px-5 py-12 md:px-8 md:py-16">
      <section id="objetivo" className="scroll-mt-36">
        <SectionTitle eyebrow="1 · Entenda antes de aplicar" title="O que os alunos realmente precisam aprender" text="Leia esta parte antes de separar materiais. Ela evita que a aula vire somente um percurso divertido sem aprendizagem curricular."/>
        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          <article className="rounded-card bg-white p-6 shadow-card lg:col-span-2"><div className="flex gap-3"><GraduationCap className="shrink-0 text-cyan"/><div><p className="label-mono text-navy/45">Objetivo curricular</p><p className="mt-3 text-[15px] font-semibold leading-relaxed">{activity.objective}</p><p className="mt-4 text-[12.5px] leading-relaxed text-navy/65"><strong>Conteúdo:</strong> {activity.curriculumTopic}</p></div></div></article>
          <article className="rounded-card bg-navy p-6 text-white shadow-card"><Flag className="text-amber"/><p className="label-mono mt-4 text-cyan">Resultado final</p><p className="mt-3 text-[14px] font-semibold leading-relaxed">{activity.finalProduct}</p></article>
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <article className="rounded-card bg-white p-6 shadow-card"><h3 className="font-display text-[19px] font-extrabold">Pensamento computacional dentro da matéria</h3><ul className="mt-4 grid gap-3">{activity.computationalThinking.map((item) => <li key={item} className="flex gap-2 text-[12.5px] leading-relaxed text-navy/68"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green"/>{item}</li>)}</ul></article>
          <article className="rounded-card border-2 border-amber/25 bg-amber/8 p-6"><h3 className="font-display text-[19px] font-extrabold">Como saber que houve aprendizagem</h3><p className="mt-4 text-[13.5px] leading-relaxed text-navy/72">{activity.evidenceOfLearning}</p><p className="mt-4 rounded-card-sm bg-white p-4 text-[12px] leading-relaxed text-navy/65"><strong>Não basta:</strong> o robô chegar ao final. O grupo precisa justificar as respostas e produzir o resultado curricular.</p></article>
        </div>
      </section>

      <section id="preparacao" className="scroll-mt-36">
        <SectionTitle eyebrow="2 · Preparação do professor" title="O que explicar e separar antes da aula" text="Se a turma ainda não domina os conhecimentos prévios, use a miniaula abaixo. O professor não precisa procurar outra página para descobrir como ensiná-los."/>
        <div className="mt-7 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <article className="rounded-card bg-white p-6 shadow-card"><div className="flex items-center gap-3"><BookOpenCheck className="text-purple"/><h3 className="font-display text-[20px] font-extrabold">Miniaula de pré-conhecimento</h3></div><div className="mt-5"><NumberedList items={activity.priorKnowledgeTeaching} tone="purple"/></div><div className="mt-5 rounded-card-sm bg-purple/8 p-4 text-[12.5px] leading-relaxed"><strong>Pronto para avançar quando:</strong> dois alunos conseguem explicar {activity.priorKnowledge.join(" e ")} usando exemplos diferentes.</div></article>
          <article className="rounded-card bg-white p-6 shadow-card"><div className="flex items-center gap-3"><PackageCheck className="text-coral"/><h3 className="font-display text-[20px] font-extrabold">Kit completo por grupo</h3></div><ul className="mt-5 grid gap-2.5">{activity.materials.map((item) => <li key={item} className="flex gap-2 text-[12.5px] leading-relaxed text-navy/70"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-green"/>{item}</li>)}</ul><div className="mt-5 flex gap-3 rounded-card-sm border border-coral/20 bg-coral/7 p-4"><Users className="shrink-0 text-coral"/><p className="text-[12px] leading-relaxed text-navy/68"><strong>Organização:</strong> {activity.classOrganization}</p></div></article>
        </div>
      </section>

      <section id="mapa" className="scroll-mt-36">
        <SectionTitle eyebrow="3 · Monte exatamente assim" title="Cartas, coordenadas, obstáculos e direção inicial" text="Monte o tabuleiro antes da turma entrar. A grade é lida com letras A–F da esquerda para a direita e números 1–6 de baixo para cima."/>
        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-card bg-white p-5 shadow-card"><CurriculumBoardMap activity={activity}/><div className="mt-5 rounded-card-sm bg-cyan/8 p-4 text-[12px] leading-relaxed"><strong>Posição inicial:</strong> {activity.start.coordinate}, olhando para o {activity.start.direction}. <strong>Destino:</strong> {activity.finish}.</div></div>
          <article className="rounded-card bg-white p-6 shadow-card"><h3 className="font-display text-[20px] font-extrabold">Passo a passo da montagem</h3><div className="mt-5"><NumberedList items={activity.preparation}/></div></article>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">{activity.stages.map((stage, index) => <article key={stage.coordinate} className="rounded-card bg-white p-5 shadow-card"><div className="flex items-center justify-between gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy font-mono text-[12px] font-bold text-white">{index + 1}</span><span className="label-mono text-cyan">Casa {stage.coordinate}</span></div><h3 className="mt-4 font-display text-[19px] font-extrabold">{stage.title}</h3><p className="mt-3 rounded-card-sm bg-cream p-4 text-[13px] font-bold">Na carta: “{stage.cardFront}”</p><p className="mt-3 text-[12.5px] leading-relaxed text-navy/68"><strong>Pergunte:</strong> {stage.question}</p><p className="mt-3 text-[11.5px] leading-relaxed text-cyan"><strong>Depois de acertar:</strong> {stage.nextClue}</p></article>)}</div>
        <div className="mt-6 rounded-card border-2 border-coral/25 bg-coral/7 p-6"><div className="flex gap-3"><ShieldAlert className="shrink-0 text-coral"/><div><h3 className="font-display text-[18px] font-extrabold">Casas que não podem ser atravessadas</h3><ul className="mt-3 grid gap-2 text-[12.5px] leading-relaxed text-navy/68">{activity.obstacles.map((obstacle) => <li key={obstacle.coordinate}><strong>{obstacle.coordinate} — {obstacle.label}:</strong> {obstacle.reason}</li>)}</ul></div></div></div>
      </section>

      <section id="conducao" className="scroll-mt-36">
        <SectionTitle eyebrow="4 · Condução completa" title="O que falar e fazer, minuto a minuto" text="O roteiro foi escrito para leitura direta. A fala inicial apresenta a missão sem revelar a solução."/>
        <div className="mt-7 rounded-card bg-navy p-6 text-white shadow-card"><div className="flex gap-3"><MessageCircleQuestion className="shrink-0 text-cyan"/><div><p className="label-mono text-cyan">Fala de abertura</p><p className="mt-3 text-[14px] leading-relaxed text-white/82">{activity.teacherOpening}</p></div></div></div>
        <ol className="mt-6 grid gap-4">{activity.lessonFlow.map((phase, index) => <li key={phase.minutes} className="rounded-card bg-white p-5 shadow-card md:grid md:grid-cols-[90px_1fr] md:gap-5"><div><span className="inline-flex items-center gap-1.5 rounded-pill bg-navy px-3 py-1.5 font-mono text-[10px] font-bold text-white"><Clock3 size={12}/>{phase.minutes}</span><p className="mt-3 font-display text-[17px] font-extrabold">{index + 1}. {phase.title}</p></div><div className="mt-4 grid gap-3 md:mt-0 md:grid-cols-3"><div className="rounded-card-sm bg-cyan/7 p-4"><p className="label-mono text-cyan">Professor faz</p><p className="mt-2 text-[12px] leading-relaxed text-navy/68">{phase.teacherAction}</p></div><div className="rounded-card-sm bg-purple/7 p-4"><p className="label-mono text-purple">Alunos fazem</p><p className="mt-2 text-[12px] leading-relaxed text-navy/68">{phase.studentAction}</p></div><div className="rounded-card-sm bg-green/7 p-4"><p className="label-mono text-green">Só avance quando</p><p className="mt-2 text-[12px] leading-relaxed text-navy/68">{phase.checkpoint}</p></div></div></li>)}</ol>

        <article className="mt-7 rounded-card bg-white p-6 shadow-card"><div className="flex items-center gap-3"><Route className="text-cyan"/><h3 className="font-display text-[21px] font-extrabold">Sequência de comandos de referência</h3></div><p className="mt-3 text-[12.5px] leading-relaxed text-navy/65"><strong>Regra física do kit:</strong> REPITA 2× ou REPITA 3× repete o comando colocado imediatamente depois. A peça REPITA não movimenta o robô sozinha.</p><ol className="mt-5 flex flex-wrap gap-2">{activity.commands.map((command, index) => <li key={`${index}-${command}`} className={`flex min-h-[44px] items-center gap-2 rounded-card-sm px-3 py-2 text-[10.5px] font-bold ${command === "INÍCIO" ? "bg-green/15 text-green" : command === "FIM" ? "bg-coral/15 text-coral" : command.startsWith("REPITA") ? "bg-purple/12 text-purple" : "bg-navy text-white"}`}><span className="font-mono text-[9px] opacity-60">{index + 1}</span>{command}</li>)}</ol><p className="mt-5 rounded-card-sm bg-amber/10 p-4 text-[12px] leading-relaxed text-navy/68"><strong>Não entregue esta sequência no começo.</strong> Use-a para conferir a montagem e orientar a depuração. Depois que a turma resolver, compare soluções e verifique se outra rota também respeita todas as etapas.</p></article>
      </section>

      <section id="respostas" className="scroll-mt-36">
        <SectionTitle eyebrow="5 · Perguntas e respostas esperadas" title="Como mediar sem entregar a solução" text="A resposta do aluno pode usar palavras diferentes, mas precisa conter a ideia indicada e uma justificativa compatível."/>
        <div className="mt-7 grid gap-4">{activity.mediatingQuestions.map((item, index) => <article key={`${index}-${item.question}`} className="rounded-card bg-white p-5 shadow-card md:grid md:grid-cols-[1fr_1.1fr] md:gap-6"><div><p className="label-mono text-cyan">Pergunta {index + 1}</p><h3 className="mt-2 font-display text-[17px] font-extrabold leading-snug">{item.question}</h3><p className="mt-3 text-[11.5px] leading-relaxed text-navy/50"><strong>Por que perguntar:</strong> {item.whyAsk}</p></div><div className="mt-4 rounded-card-sm border-l-4 border-green bg-green/7 p-4 md:mt-0"><p className="label-mono text-green">Resposta esperada</p><p className="mt-2 text-[12.5px] leading-relaxed text-navy/72">{item.expectedAnswer}</p></div></article>)}</div>
        <div className="mt-6 rounded-card bg-amber/12 p-6"><p className="label-mono text-amber">Pergunta final obrigatória</p><h3 className="mt-2 font-display text-[20px] font-extrabold">{activity.finalQuestion}</h3><p className="mt-4 text-[13.5px] leading-relaxed"><strong>Resposta:</strong> {activity.finalAnswer}</p></div>
      </section>

      <section id="erros" className="scroll-mt-36">
        <SectionTitle eyebrow="6 · Depuração pedagógica" title="Se isso acontecer, faça exatamente isto" text="O professor não precisa responder “está errado”. Identifique o sintoma, investigue a causa e devolva uma ação concreta ao grupo."/>
        <div className="mt-7 overflow-x-auto rounded-card bg-white p-3 shadow-card sm:p-5"><table className="w-full min-w-[760px] border-collapse text-left text-[12px]"><thead><tr className="border-b border-navy/15"><th className="p-3">O que você observa</th><th className="p-3">Causa provável</th><th className="p-3">Intervenção do professor</th></tr></thead><tbody>{activity.commonErrors.map((error) => <tr key={error.symptom} className="border-b border-navy/8 align-top"><td className="p-3 font-bold text-coral">{error.symptom}</td><td className="p-3 leading-relaxed text-navy/65">{error.probableCause}</td><td className="p-3 leading-relaxed text-navy/70">{error.intervention}</td></tr>)}</tbody></table></div>
      </section>

      <section id="avaliacao" className="scroll-mt-36">
        <SectionTitle eyebrow="7 · Avaliação e adaptações" title="Como observar, registrar e ajustar"/>
        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          <article className="rounded-card bg-white p-6 shadow-card"><div className="flex items-center gap-3"><ClipboardCheck className="text-green"/><h3 className="font-display text-[20px] font-extrabold">Checklist de aprendizagem</h3></div><ul className="mt-5 grid gap-3">{activity.assessment.map((item) => <li key={item} className="flex gap-2 text-[12.5px] leading-relaxed text-navy/68"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green"/>{item}</li>)}</ul></article>
          <div className="grid gap-4"><article className="rounded-card bg-cyan/8 p-5"><h3 className="font-display text-[18px] font-extrabold">Versão mais fácil</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-[12px] leading-relaxed text-navy/68">{activity.adaptations.easier.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="rounded-card bg-purple/8 p-5"><h3 className="font-display text-[18px] font-extrabold">Versão mais difícil</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-[12px] leading-relaxed text-navy/68">{activity.adaptations.harder.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="rounded-card bg-amber/10 p-5"><h3 className="font-display text-[18px] font-extrabold">Acessibilidade e participação</h3><ul className="mt-3 list-disc space-y-2 pl-5 text-[12px] leading-relaxed text-navy/68">{activity.adaptations.inclusion.map((item) => <li key={item}>{item}</li>)}</ul></article></div>
        </div>
        <article className="mt-6 rounded-card bg-navy p-6 text-white"><div className="flex gap-3"><Sparkles className="shrink-0 text-amber"/><div><p className="label-mono text-cyan">Fala de fechamento</p><p className="mt-3 text-[13.5px] leading-relaxed text-white/80">{activity.closure}</p></div></div></article>
      </section>

      <section id="impressao" className="scroll-mt-36">
        <SectionTitle eyebrow="8 · Material recortável" title="Cartas dos alunos prontas para copiar ou imprimir" text="Imprima esta seção. As respostas ficam apenas nas seções anteriores, destinadas ao professor."/>
        <div className="no-print mt-5 flex items-center gap-3 rounded-card-sm bg-white p-4 shadow-card"><Printer className="text-cyan"/><div><p className="text-[12px] font-bold">Use a impressão do navegador</p><p className="text-[11.5px] text-navy/55">Selecione orientação retrato e escala 100%. Recorte nas bordas tracejadas.</p></div><div className="ml-auto"><BotaoImprimir rotulo="Imprimir cartas"/></div></div>
        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <StudentCard label="Carta de missão" title={activity.title} body={activity.mission} footer={`Comece em ${activity.start.coordinate}, olhando para o ${activity.start.direction}`}/>
          {activity.stages.map((stage, index) => <StudentCard key={stage.coordinate} label={`Carta ${index + 1} · Casa ${stage.coordinate}`} title={stage.cardFront} body={stage.question} footer="Responda, justifique e aguarde a próxima pista"/>)}
          <StudentCard label={`Resultado final · Casa ${activity.finish}`} title="Missão concluída?" body={activity.finalQuestion} footer={`Entregue: ${activity.finalProduct}`}/>
          {activity.obstacles.map((obstacle) => <StudentCard key={obstacle.coordinate} label={`Obstáculo · Casa ${obstacle.coordinate}`} title={obstacle.label} body="Esta casa não pode ser atravessada. Volte ao último ponto correto e revise o menor trecho necessário." footer="Erro é informação: investigue antes de mudar"/>)}
        </div>
      </section>
    </div>
  </>;
}
