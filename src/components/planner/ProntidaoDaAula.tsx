"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import type { QuestionAnswer } from "@/data/lessonSupport";

export function ProntidaoDaAula({ items }: { items: QuestionAnswer[] }) {
  const [checked, setChecked] = useState(() => items.map(() => false));
  const ready = checked.every(Boolean);

  return (
    <div className="mt-8 rounded-card border border-cyan/20 bg-cyan/7 p-5 sm:p-6">
      <h3 className="font-display text-[20px] font-extrabold">Teste rápido de prontidão do professor</h3>
      <p className="mt-2 text-[12.5px] text-navy/65">Responda em voz alta antes de abrir a resposta. Marque somente quando conseguir explicar sem ler.</p>
      <div className="mt-5 grid gap-4">
        {items.map((item, index) => (
          <div key={item.question} className="rounded-card-sm bg-white p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input type="checkbox" checked={checked[index]} onChange={(event) => setChecked((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.checked : value))} className="mt-1 h-4 w-4 accent-cyan" />
              <span className="text-[13px] font-bold leading-relaxed">{item.question}</span>
            </label>
            <details className="mt-3 pl-7"><summary className="cursor-pointer text-[11px] font-bold text-navy/60 underline">Conferir resposta esperada</summary><p className="mt-2 text-[12.5px] leading-relaxed text-navy/68">{item.answer}</p></details>
          </div>
        ))}
      </div>
      <div className={`mt-5 flex items-center gap-3 rounded-card-sm p-4 ${ready ? "bg-green/12" : "bg-amber/12"}`}>
        {ready ? <CheckCircle2 className="shrink-0 text-green" /> : <ShieldCheck className="shrink-0 text-amber" />}
        <p className="text-[12.5px] font-bold">{ready ? "Pronto: você conferiu os pontos essenciais desta aula." : "Conclua os itens antes de preparar a montagem e os materiais."}</p>
      </div>
    </div>
  );
}
