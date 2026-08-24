"use client";

import { useState, type ReactNode } from "react";
import { ArrowRight, BookOpenCheck, Check, ClipboardCheck, GraduationCap, Wrench } from "lucide-react";

type StepId = "aprender" | "preparar" | "aplicar" | "avaliar";

const STEPS: Array<{ id: StepId; label: string; description: string; icon: typeof GraduationCap }> = [
  { id: "aprender", label: "Aprenda", description: "Entenda para explicar", icon: GraduationCap },
  { id: "preparar", label: "Prepare", description: "Organize e teste", icon: Wrench },
  { id: "aplicar", label: "Aplique", description: "Conduza a turma", icon: BookOpenCheck },
  { id: "avaliar", label: "Avalie", description: "Observe e continue", icon: ClipboardCheck },
];

export function EtapasGuiadas({ aprender, preparar, aplicar, avaliar }: Record<StepId, ReactNode>) {
  const [active, setActive] = useState<StepId>("aprender");
  const activeIndex = STEPS.findIndex((step) => step.id === active);
  const panels: Record<StepId, ReactNode> = { aprender, preparar, aplicar, avaliar };

  function goTo(step: StepId) {
    setActive(step);
    requestAnimationFrame(() => document.getElementById("etapas-da-aula")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <section id="etapas-da-aula" className="scroll-mt-6 mt-10">
      <div className="rounded-card bg-navy p-3 text-white shadow-panel no-print">
        <div className="mb-3 flex items-center justify-between gap-3 px-2"><p className="label-mono text-cyan">Siga uma etapa por vez</p><p className="font-mono text-[10px] text-white/55">Etapa {activeIndex + 1} de 4</p></div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan transition-all" style={{ width: `${((activeIndex + 1) / STEPS.length) * 100}%` }}/></div>
        <div role="tablist" aria-label="Etapas da aula" className="mt-3 grid gap-2 sm:grid-cols-4">
          {STEPS.map((step, index) => { const Icon = step.icon; const selected = active === step.id; return <button key={step.id} id={`tab-${step.id}`} role="tab" aria-selected={selected} aria-controls={`panel-${step.id}`} onClick={() => goTo(step.id)} className={`min-h-[72px] rounded-card-sm border p-3 text-left transition ${selected ? "border-cyan bg-cyan/15" : "border-white/10 bg-white/5 hover:bg-white/10"}`}><span className="flex items-center gap-2"><span className={`flex h-7 w-7 items-center justify-center rounded-full ${selected ? "bg-cyan text-navy" : "bg-white/10 text-white/65"}`}>{index < activeIndex ? <Check size={14}/> : <Icon size={14}/>}</span><strong className="text-[13px]">{step.label}</strong></span><span className="mt-1.5 block pl-9 text-[10.5px] text-white/55">{step.description}</span></button>; })}
        </div>
      </div>

      {STEPS.map((step, index) => (
        <section key={step.id} id={`panel-${step.id}`} role="tabpanel" aria-labelledby={`tab-${step.id}`} className={`mt-8 print:block ${active === step.id ? "block" : "hidden"}`}>
          {panels[step.id]}
          {index < STEPS.length - 1 ? <div className="mt-8 no-print"><button type="button" onClick={() => goTo(STEPS[index + 1].id)} className="inline-flex min-h-[44px] items-center gap-2 rounded-pill bg-coral px-5 text-[12px] font-bold text-white">Continuar para {STEPS[index + 1].label} <ArrowRight size={15}/></button></div> : null}
        </section>
      ))}
    </section>
  );
}
