import { Cable, CheckCircle2, Cpu, ShieldAlert } from "lucide-react";
import { ComponenteIlustracao } from "@/components/robotics/ComponenteIlustracao";
import { EsquemaDeLigacao } from "@/components/planner/EsquemaDeLigacao";
import { DisclosureBloco } from "@/components/content/DisclosureBloco";
import { Card } from "@/components/ui/Card";
import { ROBOTICS_COMPONENTS, NOMES_TIPOS } from "@/data/roboticsComponents";
import type { Metadata } from "next";
import { BRAND } from "@/config/brand";

export const metadata: Metadata = { title: `Sensores e componentes — ${BRAND.name}`, description: "Catálogo visual de sensores, atuadores, energia e conexões usados com BBC micro:bit." };

export default function ComponentesPage() {
  const internos = ROBOTICS_COMPONENTS.filter((item) => item.builtin);
  const externos = ROBOTICS_COMPONENTS.filter((item) => !item.builtin);
  const groups = [
    { id: "internos", title: "1. Recursos internos do micro:bit", intro: "Comece por estes: já estão na placa e reduzem muito a chance de erro técnico.", items: internos },
    { id: "sensores", title: "2. Sensores externos", intro: "Sensores percebem o ambiente e enviam valores ou estados para o programa.", items: externos.filter((item) => item.type === "sensor") },
    { id: "atuadores", title: "3. Atuadores externos", intro: "Atuadores transformam o comando do programa em luz, som ou movimento.", items: externos.filter((item) => item.type === "atuador") },
    { id: "montagem", title: "4. Controle, conexão e energia", intro: "Use estes itens para montar circuitos seguros e controlar componentes que exigem mais corrente.", items: externos.filter((item) => !["sensor", "atuador"].includes(item.type)) },
  ];
  return (
    <article className="mx-auto max-w-[1400px] px-5 py-12 md:px-8">
      <header className="max-w-[850px]"><p className="label-mono text-cyan">Antes de ligar qualquer fio</p><h1 className="mt-3 font-display text-[clamp(2.2rem,5vw,4rem)] leading-none tracking-display">Sensores, atuadores e componentes</h1><p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-navy/72">Use este catálogo para reconhecer cada peça, entender sua função, fazer o primeiro teste e conferir a ligação. Ele cobre os itens usados nas aulas e projetos do portal.</p></header>

      <section className="mt-10 grid gap-4 md:grid-cols-3"><Card realce="cyan"><Cpu className="text-cyan" aria-hidden /><h2 className="mt-3 text-[19px]">Está dentro da placa?</h2><p className="mt-2 text-[13px] leading-relaxed text-navy/65">Se estiver marcado “interno”, não precisa de fio. Programe e teste diretamente.</p></Card><Card realce="amber"><Cable className="text-amber" aria-hidden /><h2 className="mt-3 text-[19px]">Ligação externa</h2><p className="mt-2 text-[13px] leading-relaxed text-navy/65">Siga cada linha por nome do pino e função; não confie apenas na cor real do cabo.</p></Card><Card realce="coral"><ShieldAlert className="text-coral" aria-hidden /><h2 className="mt-3 text-[19px]">Regra de segurança</h2><p className="mt-2 text-[13px] leading-relaxed text-navy/65">Desligue antes de montar. Motores usam driver e fonte externa; sinais de 5 V não entram direto na placa.</p></Card></section>

      <nav aria-label="Categorias de componentes" className="mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">{groups.map((group) => <a key={group.id} href={`#${group.id}`} className="rounded-card-sm border border-navy/10 bg-white p-4 shadow-card transition hover:border-cyan"><span className="label-mono text-cyan">{group.items.length} itens</span><strong className="mt-2 block text-[14px] leading-tight">{group.title.replace(/^\d+\. /, "")}</strong><span className="mt-2 block text-[11.5px] leading-relaxed text-navy/55">{group.intro}</span></a>)}</nav>

      {groups.map((group) => <section id={group.id} key={group.title} className="scroll-mt-8 mt-14"><h2 className="font-display text-[30px] font-extrabold tracking-display">{group.title}</h2><p className="mt-2 max-w-[65ch] text-[14px] text-navy/65">{group.intro}</p><div className="mt-7 grid gap-4 lg:grid-cols-2">{group.items.map((item) => <DisclosureBloco key={item.id} ancora={item.id} titulo={`${item.name} · ${NOMES_TIPOS[item.type]}`} realce={item.builtin ? "cyan" : item.type === "sensor" ? "purple" : item.type === "atuador" ? "amber" : "green"}><div className="grid gap-5 sm:grid-cols-[220px_1fr]"><ComponenteIlustracao kind={item.illustration} name={item.name} /><div><p className="text-[14px] font-bold leading-relaxed">{item.what}</p><p className="mt-2 text-[13px] leading-relaxed text-navy/68"><strong>Para que serve:</strong> {item.purpose}</p>{item.version ? <p className="mt-3 inline-block rounded-pill bg-purple/10 px-3 py-1 text-[11px] font-bold text-purple">{item.version}</p> : null}<h3 className="mt-5 label-mono text-navy/55">Como reconhecer</h3><ul className="mt-2 grid gap-1">{item.recognize.map((line) => <li key={line} className="text-[12.5px] text-navy/68">• {line}</li>)}</ul></div></div><div className="mt-6"><h3 className="font-display text-[17px] font-extrabold">Esquema de ligação</h3><EsquemaDeLigacao wiring={{ kind: item.builtin ? "interno" : "externo", component: item.name, connections: item.connections, notes: item.safety }} /></div><div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-card-sm bg-green/8 p-4"><h3 className="label-mono text-green">Primeiro teste</h3><ol className="mt-2 grid gap-2">{item.firstTest.map((line, i) => <li key={line} className="flex gap-2 text-[12.5px] leading-relaxed"><span className="font-mono font-bold">{i + 1}.</span>{line}</li>)}</ol></div><div className="rounded-card-sm bg-navy/4 p-4"><h3 className="label-mono text-navy/55">Onde aparece</h3><ul className="mt-2 grid gap-2">{item.usedIn.map((line) => <li key={line} className="flex gap-2 text-[12.5px]"><CheckCircle2 size={14} className="shrink-0 text-cyan" aria-hidden />{line}</li>)}</ul></div></div></DisclosureBloco>)}</div></section>)}
    </article>
  );
}
