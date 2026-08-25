import Link from "next/link";
import { ArrowRight, Blocks, Bot, BookOpen, Check, CheckCircle2, ClipboardCheck, Clock3, Cpu, GraduationCap, Layers3, X } from "lucide-react";
import { DisclosureBloco } from "@/components/content/DisclosureBloco";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { PREPARATION_MODULES } from "@/data/preparation";
import {
  FIRST_CLASS_CHECKLIST,
  TEACHER_DOES_NOT_NEED,
  TEACHER_READINESS,
} from "@/data/teacherReadiness";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "preparar",
  "Preparação completa para o professor dominar pensamento computacional, programação, micro:bit, MakeCode, segurança, diagnóstico e condução de aulas maker.",
);

export default function PrepararPage() {
  const minutos = PREPARATION_MODULES.reduce((total, modulo) => total + modulo.duration, 0);

  return (
    <>
      <PageHeader stageId="preparar">
        <p className="mt-4 max-w-[62ch] font-sans text-[15px] leading-relaxed text-navy/70">
          Você não precisa ser programador. Precisa entender a lógica, conhecer a placa, testar
          antes e saber conduzir a turma quando algo não funciona. Esta trilha constrói essa base
          antes das aulas dos livros e dos projetos.
        </p>
      </PageHeader>

      <section className="mx-auto max-w-[1400px] px-5 py-10 md:px-8">
        <div className="mb-12">
          <p className="label-mono text-cyan">Siga esta ordem</p>
          <h2 className="mt-2 max-w-[24ch] text-[30px]">Uma preparação, quatro etapas conectadas</h2>
          <p className="mt-3 max-w-[68ch] text-[14px] leading-relaxed text-navy/68">Você não precisa decidir entre várias áreas. Comece no pensamento computacional e avance quando conseguir explicar e praticar cada etapa.</p>
          <ol className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{[
            [BookOpen, "Pensamento computacional", "Aprenda os conceitos e as dinâmicas; veja por que cada um prepara a robótica.", "/aprender", "text-cyan"],
            [Bot, "Fundamentos de robótica", "Aprenda a ensinar sistemas, sensores, atuadores, eletricidade, mecanismos e segurança.", "/robotica", "text-purple"],
            [Cpu, "Conhecendo o micro:bit", "Entenda cada parte da placa, o que ela percebe, processa, mostra e comunica.", "/microbit", "text-amber"],
            [Blocks, "MakeCode completo", "Conheça cada categoria e bloco, pratique e descubra em quais aulas utilizar.", "/makecode", "text-green"],
          ].map(([Icon, title, text, href, color], index) => { const StageIcon = Icon as typeof BookOpen; return <li key={href as string} className="grid"><Link href={href as string} className="group flex min-h-[240px] flex-col rounded-card border border-navy/8 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-cyan"><div className="flex items-center justify-between"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy/6"><StageIcon size={20} className={color as string}/></span><span className="label-mono text-navy/45">Etapa {index + 1}</span></div><h3 className="mt-5 text-[19px] group-hover:underline">{title as string}</h3><p className="mt-2 text-[12.5px] leading-relaxed text-navy/65">{text as string}</p><span className="mt-auto flex items-center gap-2 pt-5 text-[11px] font-bold">Abrir etapa <ArrowRight size={13}/></span></Link></li>; })}</ol>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-card bg-navy p-5 text-white shadow-panel"><div><p className="label-mono text-cyan">Professor totalmente iniciante</p><h3 className="mt-2 text-[20px] text-white">Não escolha: comece pelo primeiro módulo.</h3><p className="mt-2 text-[12.5px] text-white/65">O portal conduz você da explicação simples até o ensaio de uma aula.</p></div><Link href={`/preparar/${PREPARATION_MODULES[0].id}`} className="inline-flex min-h-[44px] items-center gap-2 rounded-pill bg-coral px-5 text-[12px] font-bold text-white">Começar agora <ArrowRight size={14}/></Link></div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-5" realce="cyan">
            <GraduationCap size={22} className="text-cyan" aria-hidden />
            <p className="mt-3 label-mono text-navy/60">Formação completa</p>
            <p className="mt-1 font-display text-[24px] font-extrabold">{PREPARATION_MODULES.length} módulos</p>
            <p className="mt-2 text-[13px] leading-relaxed text-navy/65">Da base pedagógica ao ensaio de uma aula completa.</p>
          </Card>
          <Card className="p-5" realce="amber">
            <Clock3 size={22} className="text-amber" aria-hidden />
            <p className="mt-3 label-mono text-navy/60">Ritmo sugerido</p>
            <p className="mt-1 font-display text-[24px] font-extrabold">{minutos} minutos</p>
            <p className="mt-2 text-[13px] leading-relaxed text-navy/65">Faça em blocos curtos e teste cada aprendizagem na prática.</p>
          </Card>
          <Card className="p-5" realce="purple">
            <Layers3 size={22} className="text-purple" aria-hidden />
            <p className="mt-3 label-mono text-navy/60">Sequência pedagógica</p>
            <p className="mt-1 font-display text-[20px] font-extrabold">Vivenciar → refletir → nomear → aplicar</p>
            <p className="mt-2 text-[13px] leading-relaxed text-navy/65">A experiência vem antes do termo técnico.</p>
          </Card>
        </div>

        <details className="mt-12 rounded-card border border-navy/10 bg-white p-5 shadow-card md:p-6">
          <summary className="cursor-pointer list-none"><span className="label-mono text-cyan">Diagnóstico opcional</span><strong className="mt-2 block font-display text-[22px]">Já sabe alguma coisa? Confira sua prontidão</strong><span className="mt-2 block max-w-[68ch] text-[12.5px] leading-relaxed text-navy/60">Se você está começando do zero, pode ignorar este diagnóstico e seguir os módulos. Abra apenas para descobrir quais conteúdos precisa revisar.</span></summary>
        <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
          <div>
            <p className="label-mono text-cyan">Antes de começar a formação</p>
            <h2 className="mt-2 max-w-[22ch] font-display text-[clamp(26px,3vw,40px)] font-extrabold leading-[1.02] tracking-display">
              O que o professor realmente precisa saber
            </h2>
            <p className="mt-4 max-w-[68ch] text-[14px] leading-relaxed text-navy/70">
              Não é uma prova de programação. É um mapa de prontidão: os conhecimentos mínimos
              para explicar, organizar, testar e conduzir uma aula com segurança. Se algum ponto
              ainda não estiver claro, o módulo correspondente aparece logo abaixo.
            </p>

            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {TEACHER_READINESS.map((area, indice) => (
                <article key={area.id} className="rounded-card border border-navy/8 bg-white p-5 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan/14 font-mono text-[11px] font-bold text-cyan">
                      {String(indice + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-[17px] font-extrabold">{area.title}</h3>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-navy/70">{area.essential}</p>
                  <div className="mt-4 border-l-2 border-amber pl-3">
                    <p className="label-mono text-navy/50">Teste rápido</p>
                    <p className="mt-1 text-[12.5px] font-semibold leading-relaxed text-navy/75">{area.quickCheck}</p>
                  </div>
                  <details className="mt-4 border-t border-navy/8 pt-3">
                    <summary className="cursor-pointer text-[11px] font-bold text-cyan">O que preparar antes da aula</summary>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-navy/68">{area.beforeClass}</p>
                  </details>
                  <div className="mt-4">
                    <Button href={area.learnHref} variant="secondary">
                      Aprender isto passo a passo
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="grid content-start gap-4 xl:sticky xl:top-24">
            <Card className="p-5" realce="green">
              <ClipboardCheck size={22} className="text-green" aria-hidden />
              <h2 className="mt-3 font-display text-[20px] font-extrabold">Checklist da primeira aula</h2>
              <ul className="mt-4 grid gap-3">
                {FIRST_CLASS_CHECKLIST.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[12.5px] leading-relaxed text-navy/72">
                    <Check size={15} className="mt-0.5 shrink-0 text-green" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card className="p-5" realce="coral">
              <h2 className="font-display text-[18px] font-extrabold">O professor não precisa…</h2>
              <ul className="mt-4 grid gap-3">
                {TEACHER_DOES_NOT_NEED.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[12.5px] leading-relaxed text-navy/70">
                    <X size={15} className="mt-0.5 shrink-0 text-coral" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>
        </details>

        <div className="mt-14 grid max-w-[960px] gap-3">
          <div className="mb-3">
            <p className="label-mono text-purple">Formação passo a passo</p>
            <h2 className="mt-2 font-display text-[28px] font-extrabold tracking-display">Da base à aula certificada</h2>
          </div>
          {PREPARATION_MODULES.map((modulo) => (
            <DisclosureBloco
              key={modulo.id}
              ancora={modulo.id}
              titulo={`${String(modulo.order).padStart(2, "0")} — ${modulo.title}`}
            >
              <p className="max-w-[64ch] text-[14px] font-semibold leading-relaxed text-navy">
                {modulo.promise}
              </p>
              <p className="mt-3 max-w-[64ch] text-[13.5px] leading-relaxed text-navy/70">
                {modulo.why}
              </p>
              <p className="mt-4 label-mono text-cyan">{modulo.duration} minutos</p>

              <h3 className="mt-6 label-mono text-navy/60">O que esta aula vai ensinar</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {modulo.learn.map((item) => (
                  <li key={item} className="flex gap-2.5 text-[13.5px] leading-relaxed text-navy/75">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 label-mono text-navy/60">Prática do professor</h3>
              <p className="mt-2 max-w-[64ch] border-l-2 border-amber pl-3 text-[13.5px] leading-relaxed text-navy/75">
                {modulo.practice}
              </p>

              <h3 className="mt-6 label-mono text-navy/60">Você está pronto quando</h3>
              <ul className="mt-3 grid gap-2">
                {modulo.readyWhen.map((item) => (
                  <li key={item} className="border-l-2 border-cyan pl-3 text-[13.5px] leading-relaxed text-navy/75">
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="mt-6 label-mono text-navy/60">Na sala de aula</h3>
              <p className="mt-2 max-w-[64ch] text-[13.5px] leading-relaxed text-navy/75">
                {modulo.classroom}
              </p>

              <div className="mt-6">
                <Button href={`/preparar/${modulo.id}`}>Abrir aula completa do módulo</Button>
              </div>
            </DisclosureBloco>
          ))}
        </div>
      </section>
    </>
  );
}
