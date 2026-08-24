"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Compass } from "lucide-react";

type Resposta = "nunca" | "ja-ouvi" | "ja-dei-aula";
type Material = "nada" | "tabuleiro" | "microbit";
type Tempo = "uma-aula" | "um-bimestre";

/**
 * Três perguntas, não cinco. O diagnóstico existe para tirar o professor da
 * paralisia inicial, e cada pergunta a mais é uma chance a mais de ele desistir
 * antes de chegar ao conteúdo. Nada aqui é gravado: a recomendação é uma função
 * pura das respostas, então recarregar a página não perde nada que importe.
 */
function recomendar(
  experiencia: Resposta,
  material: Material,
  tempo: Tempo,
): { titulo: string; porque: string; href: string; rotulo: string } {
  if (tempo === "uma-aula") {
    return {
      titulo: "Vá direto para um plano pronto",
      porque:
        "Com uma aula pela frente, percorrer a formação inteira não cabe. Os planos trazem preparação, fala de abertura e condução minuto a minuto — o suficiente para amanhã.",
      href: "/planejar",
      rotulo: "Ver os planos de aula",
    };
  }

  if (experiencia === "nunca") {
    return {
      titulo: "Comece pelos conceitos, sem equipamento",
      porque:
        "Você tem tempo e está começando. Os dez conceitos vêm com exemplo do cotidiano e roteiro de três minutos para explicar à turma — e nenhum deles precisa de computador.",
      href: "/aprender",
      rotulo: "Ir para os conceitos",
    };
  }

  if (material === "microbit") {
    return {
      titulo: "Entre pelo caminho recomendado",
      porque:
        "Você já tem alguma base e tem as placas em mãos. O caminho organiza as aulas do primeiro programa aos projetos integradores e mostra os pré-requisitos antes de cada etapa.",
      href: "/aulas/caminho",
      rotulo: "Seguir o caminho",
    };
  }

  if (material === "tabuleiro") {
    return {
      titulo: "Comece pelo tabuleiro",
      porque:
        "Com o kit em mãos e alguma base, o simulador é o caminho mais curto para você testar antes de levar para a turma — e o erro aparece em câmera lenta.",
      href: "/tabuleiro",
      rotulo: "Abrir o simulador",
    };
  }

  return {
    titulo: "Comece pelas atividades desplugadas",
    porque:
      "Você já tem alguma base e não depende de material nenhum. As atividades trazem a dinâmica pronta para a sala, com adaptações para turma grande e para falta de material.",
    href: "/praticar",
    rotulo: "Ver as atividades",
  };
}

function Pergunta<T extends string>({
  numero,
  titulo,
  opcoes,
  valor,
  aoEscolher,
}: {
  numero: number;
  titulo: string;
  opcoes: Array<{ valor: T; rotulo: string }>;
  valor: T | null;
  aoEscolher: (v: T) => void;
}) {
  return (
    <fieldset className="rounded-card bg-white p-4 shadow-card">
      <legend className="flex items-center gap-2 font-display text-[15px] font-extrabold tracking-display">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan/15 text-[11px] text-navy">{numero}</span>{titulo}
      </legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {opcoes.map((o) => {
          const ativo = valor === o.valor;
          return (
            <button
              key={o.valor}
              type="button"
              aria-pressed={ativo}
              onClick={() => aoEscolher(o.valor)}
              className={[
                "min-h-[38px] rounded-pill border px-3.5 font-sans text-[11px] font-semibold transition",
                ativo ? "border-navy bg-navy text-cream-hi" : "border-navy/12 bg-cream text-navy hover:border-cyan",
              ].join(" ")}
            >
              {o.rotulo}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Diagnostico() {
  const [experiencia, setExperiencia] = useState<Resposta | null>(null);
  const [material, setMaterial] = useState<Material | null>(null);
  const [tempo, setTempo] = useState<Tempo | null>(null);

  const completo = experiencia !== null && material !== null && tempo !== null;
  const recomendacao = completo ? recomendar(experiencia, material, tempo) : null;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="grid gap-3">
        <Pergunta
          numero={1}
          titulo="Você já trabalhou pensamento computacional com a sua turma?"
          opcoes={[
            { valor: "nunca", rotulo: "Nunca" },
            { valor: "ja-ouvi", rotulo: "Já ouvi falar" },
            { valor: "ja-dei-aula", rotulo: "Já dei aula assim" },
          ]}
          valor={experiencia}
          aoEscolher={setExperiencia}
        />

        <Pergunta
          numero={2}
          titulo="O que você tem em mãos?"
          opcoes={[
            { valor: "nada", rotulo: "Nada além de papel" },
            { valor: "tabuleiro", rotulo: "O kit do tabuleiro" },
            { valor: "microbit", rotulo: "Placas micro:bit" },
          ]}
          valor={material}
          aoEscolher={setMaterial}
        />

        <Pergunta
          numero={3}
          titulo="Quanto tempo você tem?"
          opcoes={[
            { valor: "uma-aula", rotulo: "Uma aula, é para já" },
            { valor: "um-bimestre", rotulo: "Um bimestre inteiro" },
          ]}
          valor={tempo}
          aoEscolher={setTempo}
        />
      </div>

      {/* Região viva montada sempre: se ela nascesse junto com a recomendação,
          quem usa leitor de tela não seria avisado de que a resposta chegou. */}
      <div aria-live="polite" className="min-h-[230px]">
        {recomendacao ? (
          <div className="flex h-full flex-col rounded-card bg-navy p-5 text-cream-hi shadow-panel">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan text-navy"><Check size={19} /></span>
            <span className="mt-5 label-mono text-cyan">Seu ponto de partida</span>
            <h3 className="mt-2 font-display text-[20px] font-extrabold leading-tight tracking-display">
              {recomendacao.titulo}
            </h3>
            <p className="mt-3 font-sans text-[13px] leading-relaxed text-white/68">
              {recomendacao.porque}
            </p>
            <Link
              href={recomendacao.href}
              className="mt-auto inline-flex min-h-[42px] items-center justify-between rounded-pill bg-cyan px-4 font-sans text-[10.5px] font-bold uppercase tracking-[0.05em] text-navy"
            >
              {recomendacao.rotulo}<ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-center rounded-card border border-dashed border-navy/18 bg-white/45 p-6 text-center">
            <Compass className="mx-auto text-cyan" size={30} />
            <p className="mt-3 font-display text-[18px] font-extrabold">Sua rota aparece aqui</p>
            <p className="mx-auto mt-2 max-w-[30ch] text-[12.5px] leading-relaxed text-navy/58">Responda três escolhas rápidas. Não precisa cadastro.</p>
          </div>
        )}
      </div>
    </div>
  );
}
