import { ArrowRight, BookOpen, Bot, ClipboardList, Cpu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const ETAPAS = [
  { number: 1, label: "Pensamento computacional", note: "Algoritmo, decomposição, padrões e depuração", href: "/aprender", icon: BookOpen },
  { number: 2, label: "Fundamentos de robótica", note: "Sensores, controlador, atuadores e mecanismos", href: "/robotica", icon: Bot },
  { number: 3, label: "Conhecer o micro:bit", note: "Placa, componentes, MakeCode e simulador", href: "/microbit", icon: Cpu },
  { number: 4, label: "Aulas e projetos", note: "Escolha a sequência recomendada ou encontre por filtros", href: "/aulas", icon: ClipboardList },
];

export function PercursoPrincipal() {
  return (
    <section className="mx-auto w-full max-w-[1480px] px-4 py-9 md:px-7">
      <div className="rounded-card border border-cyan/20 bg-cream-hi p-5 shadow-card md:p-7">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="label-mono text-cyan">Comece por aqui · percurso recomendado</span>
            <h2 className="mt-2 max-w-[19ch] font-display text-[clamp(1.7rem,3.4vw,2.7rem)] font-extrabold leading-[1.03] tracking-display">Siga esta ordem. Não precisa escolher por onde entrar.</h2>
            <p className="mt-3 max-w-[62ch] text-[13.5px] leading-relaxed text-navy/65">Faça a preparação do professor e avance pelos quatro passos. O micro:bit aparece somente depois dos conceitos de pensamento computacional e robótica.</p>
          </div>
          <Button href="/comecar" variant="coral">Ver percurso completo</Button>
        </div>

        <ol className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {ETAPAS.map((etapa) => {
            const Icone = etapa.icon;
            return (
              <li key={etapa.number} className="relative rounded-card-sm border border-navy/8 bg-white p-4">
                <Link href={etapa.href} className="group block min-h-[165px]">
                  <span className="flex items-center justify-between">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy font-mono text-[11px] font-bold text-white">{etapa.number}</span>
                    <Icone size={19} className="text-cyan" aria-hidden />
                  </span>
                  <span className="mt-4 block font-display text-[17px] font-extrabold leading-tight group-hover:underline">{etapa.label}</span>
                  <span className="mt-2 block text-[12.5px] leading-relaxed text-navy/60">{etapa.note}</span>
                  <span className="mt-4 flex items-center gap-1.5 text-[10.5px] font-bold text-navy">Abrir etapa <ArrowRight size={13} aria-hidden /></span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
