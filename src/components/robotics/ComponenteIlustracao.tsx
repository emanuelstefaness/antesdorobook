import type { IlustracaoComponente } from "@/data/roboticsComponents";

export function ComponenteIlustracao({ kind, name }: { kind: IlustracaoComponente; name: string }) {
  const common = { fill: "none", stroke: "#0C1D38", strokeWidth: 4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <figure className="rounded-card-sm bg-cream p-3">
      <svg viewBox="0 0 320 190" role="img" aria-label={`Ilustração técnica: ${name}`} className="h-auto w-full">
        {kind === "placa" ? <><rect x="78" y="20" width="164" height="140" rx="13" fill="#0C1D38" />{Array.from({ length: 25 }, (_, i) => <circle key={i} cx={128 + (i % 5) * 16} cy={49 + Math.floor(i / 5) * 16} r="4" fill={i % 3 ? "#A31D34" : "#EF465F"} />)}<circle cx="100" cy="90" r="12" fill="#F2B02A" /><circle cx="220" cy="90" r="12" fill="#F2B02A" /><path d="M86 160h148" stroke="#F2B02A" strokeWidth="12" /></> : null}
        {kind === "led" ? <><path d="M125 110V78a35 35 0 0 1 70 0v32z" fill="#EF465F" stroke="#0C1D38" strokeWidth="4" /><path d="M143 110v48m34-48v48" {...common} /><path d="M211 48l20-20m-9 34 25-4" stroke="#F2B02A" strokeWidth="4" strokeLinecap="round" /></> : null}
        {kind === "botao" ? <><rect x="90" y="82" width="140" height="58" rx="8" fill="#fff" stroke="#0C1D38" strokeWidth="4" /><rect x="126" y="45" width="68" height="50" rx="8" fill="#1FC4E6" stroke="#0C1D38" strokeWidth="4" /><path d="M105 140v28m110-28v28" {...common} /></> : null}
        {kind === "sensor" ? <><rect x="75" y="40" width="170" height="108" rx="12" fill="#167B65" stroke="#0C1D38" strokeWidth="4" /><circle cx="125" cy="90" r="28" fill="#D9E3E8" stroke="#0C1D38" strokeWidth="4" /><circle cx="195" cy="90" r="28" fill="#D9E3E8" stroke="#0C1D38" strokeWidth="4" /><path d="M112 148v24m32-24v24m32-24v24m32-24v24" {...common} /></> : null}
        {kind === "servo" ? <><rect x="92" y="58" width="136" height="86" rx="9" fill="#376DD5" stroke="#0C1D38" strokeWidth="4" /><circle cx="160" cy="58" r="25" fill="#fff" stroke="#0C1D38" strokeWidth="4" /><path d="M160 58h74" stroke="#F2B02A" strokeWidth="12" strokeLinecap="round" /><path d="M118 144v31m20-31v31m20-31v31" strokeWidth="5" strokeLinecap="round" stroke="#0C1D38" /></> : null}
        {kind === "motor" ? <><rect x="87" y="53" width="135" height="92" rx="44" fill="#C9D2DA" stroke="#0C1D38" strokeWidth="4" /><path d="M222 99h55" stroke="#0C1D38" strokeWidth="10" /><path d="M87 81H62m25 36H62" stroke="#EF465F" strokeWidth="5" /></> : null}
        {kind === "som" ? <><path d="M89 78h34l45-34v102l-45-34H89z" fill="#8E5AD7" stroke="#0C1D38" strokeWidth="4" /><path d="M194 70c18 16 18 34 0 50m25-72c35 31 35 63 0 94" {...common} /></> : null}
        {kind === "fio" ? <><path d="M40 128c55-92 94 18 145-43s61-8 95 31" fill="none" stroke="#1FC4E6" strokeWidth="12" strokeLinecap="round" /><rect x="24" y="118" width="42" height="20" rx="5" fill="#0C1D38" /><rect x="258" y="106" width="42" height="20" rx="5" fill="#0C1D38" /></> : null}
        {kind === "energia" ? <><rect x="78" y="35" width="164" height="120" rx="12" fill="#0C1D38" /><rect x="96" y="58" width="50" height="78" rx="20" fill="#F2B02A" /><rect x="174" y="58" width="50" height="78" rx="20" fill="#F2B02A" /><path d="M242 93h41v30" stroke="#EF465F" strokeWidth="7" fill="none" /></> : null}
        {kind === "base" ? <><rect x="48" y="42" width="224" height="112" rx="8" fill="#fff" stroke="#0C1D38" strokeWidth="4" />{Array.from({ length: 8 }, (_, row) => Array.from({ length: 18 }, (_, col) => <circle key={`${row}-${col}`} cx={67 + col * 11} cy={58 + row * 11} r="2" fill="#0C1D38" />))}</> : null}
      </svg>
      <figcaption className="mt-1 text-center font-mono text-[10px] font-bold uppercase tracking-label text-navy/55">Ilustração de reconhecimento · {name}</figcaption>
    </figure>
  );
}
