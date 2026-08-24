import { BookOpenCheck, Map, Zap } from "lucide-react";
import { CardLink } from "@/components/ui/Card";

const CAMINHOS = [
  {
    title: "Quero uma aula pronta",
    description: "Para aplicar imediatamente, com preparação, roteiro, teste, depuração e avaliação.",
    href: "/planejar",
    action: "Encontrar uma aula",
    icon: Zap,
    color: "coral" as const,
  },
  {
    title: "Quero seguir uma sequência",
    description: "Para desenvolver a turma ao longo de várias aulas, com pré-requisitos e progressão clara.",
    href: "/aulas/caminho",
    action: "Seguir o caminho",
    icon: Map,
    color: "cyan" as const,
  },
  {
    title: "Quero aprender MakeCode",
    description: "Para conhecer cada categoria, bloco e possibilidade antes de conduzir a turma.",
    href: "/makecode",
    action: "Abrir o curso MakeCode",
    icon: BookOpenCheck,
    color: "purple" as const,
  },
];

export function TresCaminhos() {
  return (
    <section className="mx-auto w-full max-w-[1480px] px-4 py-9 md:px-7">
      <span className="label-mono text-cyan">Comece pela sua necessidade</span>
      <h2 className="mt-2 max-w-[18ch] font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-extrabold leading-tight tracking-display">
        O portal se adapta ao tempo que você tem hoje.
      </h2>
      <ul className="mt-6 grid gap-4 lg:grid-cols-3">
        {CAMINHOS.map((item) => {
          const Icone = item.icon;
          return (
            <li key={item.href} className="grid">
              <CardLink href={item.href} realce={item.color} faixa className="min-h-[220px] p-5 md:p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy/6 text-navy"><Icone size={21} aria-hidden /></span>
                <span className="mt-5 font-display text-[20px] font-extrabold leading-tight tracking-display group-hover:underline">{item.title}</span>
                <span className="mt-2 max-w-[38ch] text-[13px] leading-relaxed text-navy/65">{item.description}</span>
                <span className="mt-auto pt-5 label-mono text-navy">{item.action} →</span>
              </CardLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
