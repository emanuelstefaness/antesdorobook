import Link from "next/link";
import { Camera, CheckCircle2, ExternalLink, PackageCheck, Share2, TriangleAlert } from "lucide-react";
import type { GuiaTecnicoMicrobit as Guia } from "@/data/microbitTechnicalGuides";
import { technicalRequirementsFor } from "@/data/technicalRequirements";
import { CopiarCodigo } from "./CopiarCodigo";
import { BaixarCodigo } from "./BaixarCodigo";
import { EsquemaDeLigacao } from "./EsquemaDeLigacao";
import { ProgramaEmBlocos } from "./ProgramaEmBlocos";

export function GuiaTecnicoMicrobit({ guide, part = "all" }: { guide: Guia; part?: "build" | "evaluate" | "all" }) {
  const showBuild = part === "build" || part === "all";
  const showEvaluate = part === "evaluate" || part === "all";
  const requirements = technicalRequirementsFor(guide);
  const modelGeneratedCode = guide.extensions.some((item) => /CreateAI/i.test(item));

  return (
    <section className="max-w-[1020px] rounded-card border-2 border-cyan/30 bg-cyan/5 p-5 sm:p-8">
      {showBuild ? <>
        <p className="label-mono text-cyan">Parte técnica · siga exatamente nesta ordem</p>
        <h2 className="mt-2 font-display text-[28px] font-extrabold">{guide.title}</h2>
        <p className="mt-2 text-[13.5px] leading-relaxed text-navy/70">Você não precisa saber programar de memória. Confira a placa, monte um bloco por vez e só avance quando o resultado da etapa anterior aparecer.</p>

        {guide.wiring.kind === "externo" ? (
          <div className="mt-6 rounded-card-sm border-2 border-coral/35 bg-coral/8 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <PackageCheck className="mt-0.5 shrink-0 text-coral" aria-hidden />
              <div>
                <p className="label-mono text-coral">Componente externo obrigatório</p>
                <h3 className="mt-1 font-display text-[19px] font-extrabold">Providencie antes da aula: {guide.wiring.component}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-navy/72">
                  Este item <strong>não está dentro do micro:bit e não acompanha a placa</strong>. Sem ele, a programação pode ser testada parcialmente no simulador, mas a montagem física desta aula não poderá ser concluída.
                </p>
                <ul className="mt-3 grid gap-1.5 text-[12.5px] leading-relaxed text-navy/70">
                  <li><strong>Quantidade:</strong> 1 unidade ou conjunto por grupo.</li>
                  <li><strong>Conexões:</strong> {guide.wiring.connections.length} ligações por montagem, detalhadas no esquema abaixo.</li>
                  <li><strong>Cuidados:</strong> {guide.wiring.notes[0] ?? "confira a tensão e a polaridade antes de energizar."}</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-card-sm border border-green/25 bg-green/8 p-4">
            <p className="label-mono text-green">Recurso principal interno à placa</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-navy/70">Esta aula usa {guide.wiring.component}. Confira abaixo a quantidade de placas e os itens condicionais, porque rádio, som na V1 e uso sem computador podem exigir equipamento adicional.</p>
          </div>
        )}

        <section className="mt-6 rounded-card-sm border border-navy/10 bg-white p-4 sm:p-5">
          <h3 className="font-display text-[18px] font-extrabold">Kit técnico completo desta aula</h3>
          <p className="mt-2 text-[12.5px] leading-relaxed text-navy/65">Separe todos os itens marcados como obrigatórios. Os condicionais dependem da versão da placa ou da forma de aplicação indicada.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {requirements.map((requirement) => (
              <article key={`${requirement.kind}-${requirement.item}`} className="rounded-card-sm border border-navy/8 bg-cream p-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-[13px] font-bold">{requirement.item}</p>
                  <span className={`rounded-pill px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-label ${requirement.kind === "componente" || requirement.kind === "alimentacao" ? "bg-coral/12 text-coral" : requirement.kind === "condicional" || requirement.kind === "opcional" ? "bg-amber/15 text-amber" : "bg-cyan/12 text-cyan"}`}>
                    {requirement.kind === "componente" || requirement.kind === "alimentacao" ? "obrigatório externo" : requirement.kind}
                  </span>
                </div>
                <p className="mt-2 text-[11.5px] font-bold text-navy/60">{requirement.quantity}</p>
                <p className="mt-2 text-[12px] leading-relaxed text-navy/68">{requirement.purpose}</p>
                <p className="mt-2 border-l-2 border-amber pl-2 text-[11.5px] leading-relaxed text-navy/60"><strong>Cuidado:</strong> {requirement.caution}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-card-sm bg-white p-4"><p className="label-mono text-navy/50">Placa necessária</p><p className="mt-1 text-[13px] font-bold">{guide.board}</p></div>
          <div className="rounded-card-sm bg-white p-4"><p className="label-mono text-navy/50">Extensões</p><p className="mt-1 text-[13px] font-bold">{guide.extensions.length ? guide.extensions.join(", ") : "Nenhuma"}</p></div>
        </div>

        <div className="mt-6 rounded-card-sm border border-amber/20 bg-amber/8 p-4"><h3 className="font-display text-[16px] font-extrabold">Antes de abrir o editor</h3><ol className="mt-3 grid gap-2">{guide.before.map((item, index) => <li key={item} className="grid grid-cols-[22px_1fr] gap-2 text-[12.5px] leading-relaxed text-navy/70"><span className="font-mono font-bold text-amber">{index + 1}.</span>{item}</li>)}</ol></div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-card-sm bg-white p-5"><h3 className="font-display text-[18px] font-extrabold">1. Blocos que você vai usar</h3><p className="mt-2 text-[12.5px] leading-relaxed text-navy/65">A cor mostra a categoria no menu do MakeCode. O texto menor diz onde encaixar.</p><ProgramaEmBlocos blocks={guide.blocks}/></div>
          <div className="rounded-card-sm bg-white p-5"><h3 className="font-display text-[18px] font-extrabold">2. Ordem e encaixe</h3><ol className="mt-4 grid gap-3">{guide.blocks.map((step) => <li key={step.order} className="grid grid-cols-[24px_1fr] gap-2 text-[13px] leading-relaxed"><span className="font-mono font-bold text-cyan">{step.order}.</span><span>Abra <strong>{step.category}</strong>, arraste <strong>{step.block}</strong> e {step.place}.</span></li>)}</ol></div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-card-sm bg-white p-5"><div className="flex items-start gap-3"><Camera className="mt-0.5 text-purple" aria-hidden/><div><h3 className="font-display text-[18px] font-extrabold">3. Imagem do programa pronto</h3><p className="mt-1 text-[12.5px] leading-relaxed text-navy/65">Esta representação mostra todas as pilhas, a ordem e os encaixes. Compare com sua tela. No MakeCode, use <strong>Snapshot / Instantâneo</strong> para salvar a imagem oficial do seu projeto.</p></div></div><div className="mt-4 rounded-card-sm border border-navy/8 bg-cream p-4"><ProgramaEmBlocos blocks={guide.blocks}/></div></div>
          <div className="rounded-card-sm bg-white p-5"><h3 className="font-display text-[18px] font-extrabold">4. Esquema de ligação</h3><EsquemaDeLigacao wiring={guide.wiring}/></div>
        </div>

        <div className="mt-6 rounded-card-sm bg-navy p-5 text-white"><h3 className="font-display text-[18px] font-extrabold">5. {modelGeneratedCode ? "Código gerado pelo seu modelo no CreateAI" : "Código copiável e compartilhável"}</h3><p className="mt-2 text-[12.5px] leading-relaxed text-white/70">{modelGeneratedCode ? "Nesta aula, cada turma coleta exemplos e treina um modelo diferente. O CreateAI cria a extensão e abre o projeto no MakeCode; complete os eventos gerados com os blocos de saída mostrados acima." : "No MakeCode, troque de Blocos para JavaScript, substitua o conteúdo por este código e volte para Blocos. Confira o mapa visual antes de transferir."}</p>{guide.codeNote ? <p className="mt-3 rounded bg-amber/15 p-3 text-[12px] leading-relaxed text-amber">{guide.codeNote}</p> : null}{modelGeneratedCode ? null : <pre className="mt-4 overflow-x-auto rounded-card-sm bg-black/35 p-4 text-[11.5px] leading-relaxed text-cyan"><code>{guide.code}</code></pre>}<div className="mt-4 flex flex-wrap gap-3">{modelGeneratedCode ? null : <><CopiarCodigo code={guide.code}/><BaixarCodigo code={guide.code} filename={guide.id}/></>}<a href={modelGeneratedCode ? "https://createai.microbit.org/" : "https://makecode.microbit.org/#editor"} target="_blank" rel="noreferrer" className="no-print inline-flex min-h-[40px] items-center gap-2 rounded-pill border border-white/25 px-4 text-[12px] font-bold text-white">Abrir {modelGeneratedCode ? "CreateAI" : "MakeCode"} <ExternalLink size={14}/></a></div><div className="mt-5 border-t border-white/15 pt-4"><div className="flex gap-3"><Share2 className="mt-0.5 shrink-0 text-cyan"/><p className="text-[12.5px] leading-relaxed text-white/75"><strong className="text-white">Criar o link da turma:</strong> {modelGeneratedCode ? "depois de treinar e abrir o projeto gerado no MakeCode, clique em Compartilhar, publique e teste o endereço em uma janela anônima." : "clique em Compartilhar, dê um título, publique o projeto e teste o endereço em uma janela anônima. O portal fornece o código correto, mas não inventa um link público que ainda não foi publicado no MakeCode."}</p></div></div></div>
        <p className="no-print mt-6 text-[12.5px] text-navy/65">Ainda não conhece a ferramenta? <Link href="/makecode" className="font-bold text-navy underline">Faça primeiro o guia MakeCode sem medo.</Link></p>
      </> : null}

      {showEvaluate ? <>
        <p className="label-mono text-cyan">Resultado, respostas e correção de erros</p>
        <div className="mt-5 grid gap-6 lg:grid-cols-2">
          <div className="rounded-card-sm bg-white p-5"><h3 className="font-display text-[18px] font-extrabold">Resultado esperado na placa</h3><ul className="mt-4 grid gap-3">{guide.expected.map((item) => <li key={item} className="flex gap-2 text-[13px] leading-relaxed"><CheckCircle2 size={16} className="mt-0.5 shrink-0 text-green"/>{item}</li>)}</ul></div>
          <div className="rounded-card-sm bg-white p-5"><h3 className="font-display text-[18px] font-extrabold">Respostas esperadas</h3><dl className="mt-4 grid gap-4">{guide.answers.map((item) => <div key={item.question}><dt className="text-[13px] font-bold">{item.question}</dt><dd className="mt-1 border-l-2 border-cyan pl-3 text-[12.5px] leading-relaxed text-navy/70">{item.answer}</dd></div>)}</dl></div>
        </div>
        <div className="mt-6 rounded-card-sm border border-coral/25 bg-white p-5"><div className="flex items-center gap-3"><TriangleAlert className="text-coral"/><h3 className="font-display text-[18px] font-extrabold">Diagnóstico específico</h3></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[720px] border-collapse text-left text-[12px]"><thead><tr className="border-b border-navy/15"><th className="p-2">Sintoma</th><th className="p-2">Causa provável</th><th className="p-2">Como conferir</th><th className="p-2">Como corrigir</th></tr></thead><tbody>{guide.diagnostics.map((item) => <tr key={item.symptom} className="border-b border-navy/8 align-top"><td className="p-2 font-bold">{item.symptom}</td><td className="p-2 text-navy/65">{item.cause}</td><td className="p-2 text-navy/65">{item.check}</td><td className="p-2 text-navy/65">{item.fix}</td></tr>)}</tbody></table></div></div>
      </> : null}
    </section>
  );
}
