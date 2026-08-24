import { DisclosureBloco } from "@/components/content/DisclosureBloco";
import Image from "next/image";
import Link from "next/link";
import { PlacaDiagrama } from "@/components/microbit/PlacaDiagrama";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  MAKECODE_MISSIONS,
  NOMES_DAS_FUNCOES,
  componentesPorFuncao,
  type FuncaoNaPlaca,
} from "@/data/microbit";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "microbit",
  "Os 14 componentes da placa agrupados por função, e dez missões no MakeCode do primeiro projeto até transferir o programa para o micro:bit.",
);

const ORDEM_DAS_FUNCOES: FuncaoNaPlaca[] = [
  "entrada",
  "processamento",
  "saida",
  "comunicacao",
  "energia",
];

export default function MicrobitPage() {
  return (
    <>
      <PageHeader stageId="microbit">
        <p className="mt-4 max-w-[56ch] font-sans text-[15px] leading-relaxed text-navy/70">
          A placa tem 14 partes, e elas se organizam em cinco funções — o mesmo entrada,
          processamento e saída que você já viu em APRENDER. Depois, dez missões levam do primeiro
          projeto até o programa rodando na placa.
        </p>
      </PageHeader>

      <section className="mx-auto grid max-w-[1400px] gap-4 px-5 pt-8 md:grid-cols-2 md:px-8">
        <Link href="/makecode" className="rounded-card border border-cyan/25 bg-cyan/8 p-5 shadow-card transition-transform hover:-translate-y-1">
          <p className="label-mono text-cyan">Faça primeiro</p>
          <h2 className="mt-2 text-[22px]">MakeCode sem medo</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-navy/68">Aprenda a tela, os blocos, o simulador, a transferência, a imagem do programa e o link compartilhável.</p>
        </Link>
        <Link href="/componentes" className="rounded-card border border-purple/25 bg-purple/8 p-5 shadow-card transition-transform hover:-translate-y-1">
          <p className="label-mono text-purple">Antes de ligar fios</p>
          <h2 className="mt-2 text-[22px]">Sensores e componentes</h2>
          <p className="mt-2 text-[13px] leading-relaxed text-navy/68">Reconheça cada item, entenda para que serve e confira ligação, primeiro teste e segurança.</p>
        </Link>
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pt-8 md:px-8"><div className="relative aspect-[1.35/1] overflow-hidden rounded-card border border-navy/8 bg-white shadow-card sm:aspect-[2.6/1]"><Image unoptimized fill priority src="/assets/antes-do-robo/microbit-recursos-visuais.png" alt="Recursos visuais do micro:bit" className="object-cover"/></div></section>

      <section className="mx-auto max-w-[1400px] px-5 pt-14">
        <h2 className="font-display text-[clamp(1.4rem,2.8vw,2rem)] leading-tight tracking-display">
          Onde fica cada coisa
        </h2>
        <p className="mt-2 max-w-[58ch] font-sans text-[14px] leading-relaxed text-navy/70">
          Desenho esquemático, não foto: a placa de verdade tem muito componente sem nome, e aqui
          só aparece o que você vai citar em aula. Metade das peças está no verso — inclusive o
          reset, que é a primeira que a turma procura.
        </p>
        <div className="mt-8 max-w-[980px]">
          <PlacaDiagrama />
        </div>
      </section>

      {/* Agrupado por função, não por posição física na placa. O diagrama acima
          já responde "onde fica"; aqui a pergunta é outra, "o que essa peça
          FAZ", e para essa a posição na placa não ajuda em nada. */}
      <section className="mx-auto max-w-[1400px] px-5 py-16">
        <h2 className="font-display text-[clamp(1.4rem,2.8vw,2rem)] leading-tight tracking-display">
          As 14 partes da placa
        </h2>

        {ORDEM_DAS_FUNCOES.map((funcao) => (
          <div key={funcao} className="mt-10">
            <h3 className="label-mono text-navy/65">{NOMES_DAS_FUNCOES[funcao]}</h3>
            <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {componentesPorFuncao(funcao).map((parte) => (
                <Card key={parte.id} id={parte.id} className="scroll-mt-24">
                  <h4 className="font-display text-[16px] font-extrabold leading-tight tracking-display">
                    {parte.name}
                  </h4>
                  <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-navy/80">
                    {parte.fn}
                  </p>
                  <p className="mt-3 font-sans text-[13px] leading-relaxed text-navy/70">
                    <strong className="font-bold text-navy">Teste rápido:</strong> {parte.miniTest}
                  </p>
                  <p className="mt-2 border-l-2 border-amber pl-3 font-sans text-[13px] leading-relaxed text-navy/80">
                    {parte.caution}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-[1400px] px-5 pb-20">
        <h2 className="font-display text-[clamp(1.4rem,2.8vw,2rem)] leading-tight tracking-display">
          Dez missões no MakeCode
        </h2>
        <p className="mt-2 max-w-[54ch] font-sans text-[14px] leading-relaxed text-navy/70">
          Na ordem. Cada missão abre com o que fazer, o resultado esperado, o que costuma dar
          errado e como levar aquilo para a turma.
        </p>

        <div className="mt-8 grid max-w-[900px] gap-3">
          {MAKECODE_MISSIONS.map((missao) => (
            <DisclosureBloco
              key={missao.id}
              titulo={`${String(missao.order).padStart(2, "0")} — ${missao.title}`}
            >
              <p className="max-w-[62ch] font-sans text-[14px] leading-relaxed text-navy/80">
                {missao.goal}
              </p>

              <h4 className="mt-5 label-mono text-navy/65">Passo a passo</h4>
              <ol className="mt-2 grid gap-2">
                {missao.steps.map((passo, i) => (
                  <li
                    key={passo}
                    className="flex gap-3 border-l-2 border-cyan pl-3 font-sans text-[14px] leading-relaxed text-navy/80"
                  >
                    <span className="label-mono shrink-0 text-navy/65">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{passo}</span>
                  </li>
                ))}
              </ol>

              {missao.blocksUsed.length > 0 ? (
                <p className="mt-4 font-sans text-[13px] leading-relaxed text-navy/70">
                  <strong className="font-bold text-navy">Blocos usados:</strong>{" "}
                  {missao.blocksUsed.join(" · ")}
                </p>
              ) : null}

              <p className="mt-4 max-w-[62ch] font-sans text-[13.5px] leading-relaxed text-navy/80">
                <strong className="font-bold text-navy">Resultado esperado:</strong>{" "}
                {missao.expectedResult}
              </p>

              <h4 className="mt-5 label-mono text-navy/65">Se der errado</h4>
              <ul className="mt-2 grid gap-2">
                {missao.troubleshooting.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-led pl-3 font-sans text-[13.5px] leading-relaxed text-navy/80"
                  >
                    {item}
                  </li>
                ))}
              </ul>

              <p className="mt-5 max-w-[62ch] border-l-2 border-purple pl-3 font-sans text-[13.5px] leading-relaxed text-navy/80">
                <strong className="font-bold text-navy">Na sala de aula:</strong>{" "}
                {missao.classroomBridge}
              </p>
            </DisclosureBloco>
          ))}
        </div>
      </section>
    </>
  );
}
