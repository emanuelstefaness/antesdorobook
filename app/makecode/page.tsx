import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Blocks, CheckCircle2, ExternalLink, Infinity as InfinityIcon, Variable } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { BRAND } from "@/config/brand";
import { MAKECODE_CATEGORIES, MAKECODE_FAMILY_COUNT } from "@/data/makecodeCatalog";

export const metadata: Metadata = { title: `Curso completo de MakeCode — ${BRAND.name}`, description: "Curso para professores iniciantes sobre todas as categorias nativas do MakeCode para micro:bit, com blocos, aulas, resultados e diagnóstico." };

const MAKECODE_GOALS = [
  ["Mostrar texto, número ou imagem", "basico"],
  ["Usar botões e sensores da placa", "entrada"],
  ["Repetir uma sequência", "repeticoes"],
  ["Criar decisões com se/senão", "logica"],
  ["Guardar pontos e medidas", "variaveis"],
  ["Comunicar dois micro:bits", "radio"],
  ["Ligar servo ou sensor externo", "pinos"],
] as const;

const MAKECODE_STAGES = [
  { title: "1. Primeiro contato", description: "Faça a placa mostrar, perceber, repetir e decidir.", ids: ["basico", "entrada", "musica", "repeticoes", "logica", "variaveis"] },
  { title: "2. Criar programas maiores", description: "Trabalhe números, funções, listas, texto, jogos e animações.", ids: ["led", "matematica", "funcoes", "listas", "texto", "jogos", "imagens"] },
  { title: "3. Conectar ao mundo", description: "Comunique placas, leia pinos, registre dados e controle execuções.", ids: ["radio", "pinos", "serial", "controle"] },
  { title: "4. Recursos avançados", description: "Use Bluetooth e extensões somente depois de dominar a base.", ids: ["bluetooth", "extensoes"] },
];

export default function MakeCodePage() {
  return <article className="mx-auto max-w-[1400px] px-5 py-12 md:px-8">
    <header className="max-w-[940px]"><p className="label-mono text-cyan">Comece aqui depois de conhecer o micro:bit</p><h1 className="mt-3 font-display text-[clamp(2.3rem,5vw,4.2rem)] leading-none tracking-display">MakeCode completo, sem medo</h1><p className="mt-4 max-w-[72ch] text-[15px] leading-relaxed text-navy/72">Um curso em ordem: cada página explica o que a categoria faz, todas as famílias de blocos, quando usar, o resultado, o erro mais comum e uma oficina pronta para o professor praticar.</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/makecode/basico" className="inline-flex min-h-[44px] items-center gap-2 rounded-pill bg-navy px-5 text-[13px] font-bold text-white">Começar pela aula 1 <ArrowRight size={15}/></Link><a href="https://makecode.microbit.org/" target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-navy/15 px-5 text-[13px] font-bold text-navy">Abrir editor oficial <ExternalLink size={15}/></a></div></header>

    <section className="mt-12 grid gap-4 md:grid-cols-3"><Card realce="cyan"><Blocks className="text-cyan"/><p className="mt-3 label-mono text-navy/50">Curso</p><p className="mt-1 font-display text-[28px] font-extrabold">{MAKECODE_CATEGORIES.length} aulas</p><p className="mt-2 text-[12.5px] text-navy/65">Das saídas básicas a Bluetooth e extensões.</p></Card><Card realce="purple"><CheckCircle2 className="text-purple"/><p className="mt-3 label-mono text-navy/50">Cobertura</p><p className="mt-1 font-display text-[28px] font-extrabold">{MAKECODE_FAMILY_COUNT} famílias</p><p className="mt-2 text-[12.5px] text-navy/65">Ações agrupadas como na referência oficial.</p></Card><Card realce="amber"><Variable className="text-amber"/><p className="mt-3 label-mono text-navy/50">Quantas variáveis?</p><p className="mt-1 font-display text-[28px] font-extrabold">Você cria</p><p className="mt-2 text-[12.5px] text-navy/65">Não há lista fixa: crie quantas o projeto exigir, com nomes claros.</p></Card></section>

    <section className="mt-12 rounded-card border border-amber/30 bg-amber/8 p-5 md:p-6"><div className="flex gap-4"><InfinityIcon className="mt-1 shrink-0 text-amber"/><div><h2 className="text-[20px]">O que “tudo” significa</h2><p className="mt-2 max-w-[78ch] text-[13.5px] leading-relaxed text-navy/70">O curso cobre as categorias nativas e os recursos oficiais documentados do MakeCode para micro:bit. Extensões de terceiros formam um catálogo aberto que muda por kit; a aula 19 ensina a escolher, validar e usar qualquer extensão com segurança.</p></div></div></section>

    <section className="mt-14"><p className="label-mono text-cyan">Encontre pelo que deseja criar</p><h2 className="mt-2 text-[30px]">O que você quer que o micro:bit faça?</h2><p className="mt-3 max-w-[68ch] text-[13.5px] leading-relaxed text-navy/65">Não precisa saber o nome da categoria. Escolha uma intenção e o portal leva você ao conjunto certo de blocos.</p><div className="mt-5 flex flex-wrap gap-2">{MAKECODE_GOALS.map(([label, id]) => <Link key={id} href={`/makecode/${id}`} className="inline-flex min-h-[40px] items-center gap-2 rounded-pill border border-navy/12 bg-white px-4 text-[11.5px] font-bold text-navy shadow-card transition hover:border-cyan hover:text-cyan">{label}<ArrowRight size={13}/></Link>)}</div></section>

    <section className="mt-14"><p className="label-mono text-purple">Siga nesta ordem</p><h2 className="mt-2 text-[30px]">Da primeira imagem ao sistema conectado</h2><div className="mt-8 grid gap-12">{MAKECODE_STAGES.map((stage) => { const categories = stage.ids.map((id) => MAKECODE_CATEGORIES.find((category) => category.id === id)).filter((category): category is NonNullable<typeof category> => Boolean(category)); return <section key={stage.title}><div className="flex flex-wrap items-end justify-between gap-3 border-b border-navy/10 pb-4"><div><h3 className="text-[22px]">{stage.title}</h3><p className="mt-1 text-[12.5px] text-navy/60">{stage.description}</p></div><span className="label-mono text-navy/45">{categories.length} aulas</span></div><ol className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{categories.map((category) => <li key={category.id} className="grid"><Link href={`/makecode/${category.id}`} className="group flex min-h-[205px] flex-col rounded-card border border-navy/8 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-cyan"><div className="flex items-center justify-between gap-3"><span className="label-mono text-cyan">Aula {String(category.order).padStart(2, "0")}</span><span className="rounded-pill bg-navy/5 px-2.5 py-1 text-[10px] font-bold text-navy/60">{category.level}</span></div><h4 className="mt-4 text-[19px] group-hover:underline">{category.title}</h4><p className="mt-2 line-clamp-3 text-[12.5px] leading-relaxed text-navy/65">{category.summary}</p><div className="mt-auto flex items-center justify-between gap-3 pt-5"><span className="text-[11px] font-bold text-navy/55">{category.families.length} famílias · {category.version}</span><ArrowRight size={16} className="text-cyan"/></div></Link></li>)}</ol></section>; })}</div></section>

    <section className="mt-14 rounded-card bg-navy p-6 text-white md:p-8"><p className="label-mono text-cyan">Método de estudo</p><h2 className="mt-2 text-[26px] text-white">Não tente decorar o menu</h2><ol className="mt-6 grid gap-3 md:grid-cols-4">{["Leia e preveja o resultado", "Monte a oficina na ordem", "Mude uma coisa e observe", "Aplique a aula relacionada"].map((step, index) => <li key={step} className="rounded-card-sm bg-white/8 p-4"><span className="font-mono text-[12px] font-bold text-cyan">{index + 1}</span><p className="mt-2 text-[12.5px] text-white/72">{step}</p></li>)}</ol></section>
  </article>;
}
