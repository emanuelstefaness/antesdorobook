import type { PassoDeBloco } from "@/data/microbitTechnicalGuides";

const COR: Record<PassoDeBloco["category"], string> = {
  Básico: "bg-[#2f68d8]",
  Entrada: "bg-[#8c4ab7]",
  Variáveis: "bg-[#ef7d22]",
  Lógica: "bg-[#25a6a6]",
  Matemática: "bg-[#7a55c5]",
  Música: "bg-[#d84f9a]",
  Rádio: "bg-[#e94f64]",
  Pinos: "bg-[#14799c]",
  Servo: "bg-[#1d8b70]",
  Texto: "bg-[#7a55c5]",
  Ciclos: "bg-[#2f68d8]",
  Jogo: "bg-[#1d8b70]",
  Matrizes: "bg-[#7a55c5]",
  Imagens: "bg-[#2f68d8]",
  Serial: "bg-[#14799c]",
  Controle: "bg-[#25a6a6]",
  "Data Logger": "bg-[#14799c]",
  Funções: "bg-[#7352d6]",
  Extensões: "bg-[#e94f64]",
  "IA gerada": "bg-[#7352d6]",
};

export function ProgramaEmBlocos({ blocks }: { blocks: PassoDeBloco[] }) {
  return (
    <ol className="mt-4 grid gap-2" aria-label="Ordem dos blocos MakeCode">
      {blocks.map((step) => (
        <li key={`${step.order}-${step.block}`} className="grid grid-cols-[28px_1fr] items-start gap-2" style={{ marginLeft: `${(step.indent ?? 0) * 18}px` }}>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-navy font-mono text-[11px] font-bold text-white">{step.order}</span>
          <div className={`${COR[step.category]} rounded-[8px] px-3 py-2 text-white shadow-sm`}>
            <span className="font-mono text-[9px] font-bold uppercase tracking-wide text-white/75">{step.category}</span>
            <p className="text-[13px] font-bold leading-snug">{step.block}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-white/80">{step.place}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
