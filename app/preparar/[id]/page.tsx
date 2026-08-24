import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Gamepad2, Lightbulb, MessageCircleQuestion, ShieldCheck } from "lucide-react";
import { DisclosureBloco } from "@/components/content/DisclosureBloco";
import { MarcarLido } from "@/components/content/MarcarLido";
import { Card } from "@/components/ui/Card";
import { BRAND } from "@/config/brand";
import { PREPARATION_MODULES, preparationModuleById } from "@/data/preparation";
import { PREPARATION_LESSONS, lessonByModuleId } from "@/data/preparationLessons";

export function generateStaticParams() {
  return PREPARATION_LESSONS.map((lesson) => ({ id: lesson.moduleId }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const formationModule = preparationModuleById(params.id);
  if (!formationModule) return { title: `Formação não encontrada — ${BRAND.name}` };
  return { title: `${formationModule.title} — formação do professor — ${BRAND.name}`, description: formationModule.promise };
}

export default function FormationModulePage({ params }: { params: { id: string } }) {
  const formationModule = preparationModuleById(params.id);
  const lesson = lessonByModuleId(params.id);
  if (!formationModule || !lesson) notFound();
  const next = PREPARATION_MODULES[formationModule.order] ?? null;

  return (
    <article>
      <header className="relative overflow-hidden border-b border-navy/8 bg-cream-hi">
        <span aria-hidden className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 font-display text-[13rem] font-extrabold text-navy/[0.04] lg:block">{String(formationModule.order).padStart(2, "0")}</span>
        <div className="relative mx-auto max-w-[1400px] px-5 py-10 md:px-8">
          <Link href="/preparar" className="inline-flex items-center gap-2 text-[12px] font-bold text-cyan"><ArrowLeft size={14} aria-hidden /> Formação do professor</Link>
          <p className="mt-7 label-mono text-purple">Módulo {formationModule.order} de {PREPARATION_MODULES.length} · cerca de {formationModule.duration} minutos</p>
          <h1 className="mt-3 max-w-[23ch] text-[clamp(2.2rem,4.7vw,4rem)] leading-[.98]">{formationModule.title}</h1>
          <p className="mt-5 max-w-[65ch] text-[16px] font-semibold leading-relaxed text-navy/75">{formationModule.promise}</p>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 py-10 md:px-8">
        <section className="grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <Card className="p-6" realce="cyan"><MessageCircleQuestion className="text-cyan" aria-hidden /><p className="mt-4 label-mono text-navy/50">Comece pensando</p><h2 className="mt-2 text-[25px]">{lesson.openingQuestion}</h2><p className="mt-4 text-[14px] leading-relaxed text-navy/72">Tente responder antes de abrir a explicação.</p><DisclosureBloco titulo="Ver a explicação" aberto realce="cyan"><p className="text-[14px] leading-relaxed text-navy/75">{lesson.openingAnswer}</p></DisclosureBloco></Card>
          <Card className="p-6" realce="amber"><Lightbulb className="text-amber" aria-hidden /><p className="mt-4 label-mono text-navy/50">Por que aprender isto</p><p className="mt-2 text-[14px] leading-relaxed text-navy/75">{formationModule.why}</p><p className="mt-4 border-l-2 border-amber pl-3 text-[13px] leading-relaxed text-navy/68"><strong>Na sala:</strong> {formationModule.classroom}</p></Card>
        </section>

        <section className="mt-14 max-w-[1050px]"><p className="label-mono text-cyan">Aprenda de verdade</p><h2 className="mt-2 text-[30px]">Quatro ideias, uma de cada vez</h2><p className="mt-3 max-w-[65ch] text-[14px] leading-relaxed text-navy/68">Leia a explicação simples, use a comparação, faça a ação curta e só então responda à verificação.</p><ol className="mt-7 grid gap-5">{lesson.chapters.map((chapter, index) => <li key={chapter.title} className="rounded-card border border-navy/8 bg-white p-5 shadow-card sm:p-7"><div className="flex items-start gap-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-[12px] font-bold text-white">{index + 1}</span><div><h3 className="text-[22px]">{chapter.title}</h3><p className="mt-3 text-[14px] leading-relaxed text-navy/75">{chapter.simple}</p></div></div><div className="mt-6 grid gap-3 md:grid-cols-3"><div className="rounded-card-sm bg-purple/8 p-4"><p className="label-mono text-purple">Pense assim</p><p className="mt-2 text-[12.5px] leading-relaxed text-navy/70">{chapter.analogy}</p></div><div className="rounded-card-sm bg-amber/10 p-4"><p className="label-mono text-amber">Faça agora</p><p className="mt-2 text-[12.5px] leading-relaxed text-navy/70">{chapter.doNow}</p></div><div className="rounded-card-sm bg-green/8 p-4"><p className="label-mono text-green">Confira se entendeu</p><p className="mt-2 text-[12.5px] leading-relaxed text-navy/70">{chapter.check}</p></div></div></li>)}</ol></section>

        <section className="mt-14 max-w-[1050px] rounded-card bg-navy p-6 text-white sm:p-8"><div className="flex items-center gap-3"><Gamepad2 className="text-cyan" aria-hidden /><p className="label-mono text-cyan">Laboratório lúdico do professor</p></div><h2 className="mt-3 text-[28px]">{lesson.playfulLab.title}</h2><p className="mt-3 max-w-[65ch] text-[14px] leading-relaxed text-white/75">{lesson.playfulLab.mission}</p><p className="mt-5 text-[12.5px] text-white/65"><strong className="text-white">Materiais:</strong> {lesson.playfulLab.materials.join(" · ")}</p><ol className="mt-6 grid gap-3 sm:grid-cols-2">{lesson.playfulLab.steps.map((step, index) => <li key={step} className="flex gap-3 rounded-card-sm bg-white/7 p-4 text-[13px] leading-relaxed"><span className="font-mono font-bold text-cyan">{index + 1}.</span>{step}</li>)}</ol><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-card-sm bg-amber/12 p-4"><p className="label-mono text-amber">Observe</p><p className="mt-2 text-[13px] leading-relaxed text-white/75">{lesson.playfulLab.observe}</p></div><div className="rounded-card-sm bg-green/12 p-4"><p className="label-mono text-green">Conclusão esperada</p><p className="mt-2 text-[13px] leading-relaxed text-white/75">{lesson.playfulLab.conclusion}</p></div></div></section>

        <section className="mt-14 max-w-[1050px]"><div className="flex items-center gap-3"><ShieldCheck className="text-green" aria-hidden /><div><p className="label-mono text-green">Teste de prontidão</p><h2 className="mt-1 text-[28px]">Responda antes de avançar</h2></div></div><div className="mt-6 grid gap-3">{lesson.selfCheck.map((item, index) => <DisclosureBloco key={item.question} titulo={`${index + 1}. ${item.question}`} realce={index === 0 ? "cyan" : index === 1 ? "purple" : "amber"}><p className="text-[13.5px] leading-relaxed text-navy/75"><strong>Resposta esperada:</strong> {item.answer}</p></DisclosureBloco>)}</div><div className="mt-7 rounded-card-sm border border-green/20 bg-green/8 p-5"><p className="font-bold">Você não precisa responder com as mesmas palavras.</p><p className="mt-2 text-[13px] leading-relaxed text-navy/68">Está pronto quando consegue explicar com exemplo próprio, executar a prática e justificar suas decisões sem apenas repetir a definição.</p><div className="mt-4"><MarcarLido id={`formacao:${formationModule.id}`} rotulo="Concluí esta formação" /></div></div></section>

        <nav className="mt-12 flex flex-wrap gap-3 border-t border-navy/10 pt-7"><Link href="/preparar" className="inline-flex min-h-[44px] items-center rounded-pill border border-navy/15 px-5 text-[12px] font-bold">Voltar à formação</Link>{next ? <Link href={`/preparar/${next.id}`} className="inline-flex min-h-[44px] items-center rounded-pill bg-navy px-5 text-[12px] font-bold text-white">Próximo: {next.title} →</Link> : <Link href="/robotica" className="inline-flex min-h-[44px] items-center rounded-pill bg-navy px-5 text-[12px] font-bold text-white">Avançar para robótica →</Link>}</nav>
      </div>
    </article>
  );
}
