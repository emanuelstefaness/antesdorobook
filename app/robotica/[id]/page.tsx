import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Eye, Lightbulb, Wrench } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MarcarLido } from "@/components/content/MarcarLido";
import { BRAND } from "@/config/brand";
import { ROBOTICS_CONCEPTS, roboticsConceptById } from "@/data/robotics";

export function generateStaticParams() { return ROBOTICS_CONCEPTS.map((concept) => ({ id: concept.id })); }
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> { const { id } = await params; const concept = roboticsConceptById(id); return concept ? { title: `${concept.title} — ${BRAND.name}`, description: concept.plain } : { title: `Aula não encontrada — ${BRAND.name}` }; }

export default async function RoboticsLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const concept = roboticsConceptById(id); if (!concept) notFound();
  const previous = ROBOTICS_CONCEPTS[concept.order - 2]; const next = ROBOTICS_CONCEPTS[concept.order];
  return <article className="mx-auto max-w-[1100px] px-5 py-12 md:px-8">
    <header><p className="label-mono text-cyan">Fundamentos de robótica · aula {concept.order} de {ROBOTICS_CONCEPTS.length}</p><h1 className="mt-3 max-w-[22ch] font-display text-[clamp(2.2rem,5vw,3.8rem)] leading-none tracking-display">{concept.title}</h1><p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-navy/72">{concept.plain}</p></header>
    <section className="mt-10 grid gap-4 md:grid-cols-2"><Card realce="cyan"><Lightbulb className="text-cyan"/><h2 className="mt-3 text-[20px]">Explicação simples</h2><p className="mt-2 text-[13.5px] leading-relaxed text-navy/70">{concept.howToExplain}</p></Card><Card realce="amber"><Eye className="text-amber"/><h2 className="mt-3 text-[20px]">Exemplo concreto</h2><p className="mt-2 text-[13.5px] leading-relaxed text-navy/70">{concept.example}</p></Card></section>
    <section className="mt-12"><p className="label-mono text-purple">Aprenda fazendo · 35 minutos</p><h2 className="mt-2 text-[28px]">Laboratório lúdico do professor</h2><ol className="mt-6 grid gap-3">{[
      ["0–5 min", "Observe antes de nomear", concept.howToExplain],
      ["5–12 min", "Desenhe o sistema", `No papel, represente o exemplo com três caixas: o que entra, qual regra decide e o que sai. Use setas e palavras comuns.`],
      ["12–22 min", "Execute a missão", concept.practice],
      ["22–28 min", "Crie um erro útil", "Mude uma parte do exemplo para que o resultado deixe de funcionar. Anote o sintoma, uma hipótese e um teste que altere somente uma coisa."],
      ["28–35 min", "Ensine de volta", `Explique em dois minutos: ${concept.teacherNeeds} Depois responda a uma pergunta sem usar jargão.`],
    ].map(([time, title, text]) => <li key={time} className="rounded-card-sm border border-navy/8 bg-white p-5 shadow-card"><div className="grid gap-2 sm:grid-cols-[90px_1fr]"><span className="label-mono text-cyan">{time}</span><div><h3 className="text-[16px]">{title}</h3><p className="mt-1 text-[13px] leading-relaxed text-navy/68">{text}</p></div></div></li>)}</ol></section>
    <section className="mt-12 rounded-card bg-navy p-6 text-white"><p className="label-mono text-cyan">Teste de compreensão</p><h2 className="mt-2 text-[24px] text-white">Você dominou quando consegue…</h2><ul className="mt-5 grid gap-3">{[concept.teacherNeeds, `Explicar sem ler: ${concept.plain}`, `Aplicar ao exemplo e prever o que muda quando uma parte falha.`].map((item) => <li key={item} className="flex gap-3 text-[13px] leading-relaxed text-white/75"><CheckCircle2 className="mt-0.5 shrink-0 text-green" size={16}/><span>{item}</span></li>)}</ul><div className="mt-6"><MarcarLido id={`robotica:${concept.id}`} rotulo="Aula de robótica concluída"/></div></section>
    <section className="mt-12"><p className="label-mono text-coral">Se ainda não ficou claro</p><div className="mt-4 grid gap-3 md:grid-cols-3"><Card><Wrench className="text-coral"/><h3 className="mt-3 text-[16px]">Confunde as partes</h3><p className="mt-2 text-[12.5px] text-navy/65">Volte às três caixas: entrada recebe, controlador aplica regra, saída age.</p></Card><Card><Wrench className="text-amber"/><h3 className="mt-3 text-[16px]">Decora sem transferir</h3><p className="mt-2 text-[12.5px] text-navy/65">Troque o objeto do exemplo e refaça o fluxo com palavras novas.</p></Card><Card><Wrench className="text-purple"/><h3 className="mt-3 text-[16px]">Quer montar cedo demais</h3><p className="mt-2 text-[12.5px] text-navy/65">Só escolha peças depois que entrada, regra e saída estiverem desenhadas.</p></Card></div></section>
    <nav className="mt-12 flex flex-wrap gap-3 border-t border-navy/10 pt-8">{previous ? <Button href={`/robotica/${previous.id}`} variant="secondary">Anterior: {previous.title}</Button> : null}{next ? <Button href={`/robotica/${next.id}`}>Próxima: {next.title} <ArrowRight size={14}/></Button> : <Button href="/microbit">Agora conheça o micro:bit</Button>}<Button href="/robotica" variant="secondary">Ver fundamentos</Button></nav>
  </article>;
}
