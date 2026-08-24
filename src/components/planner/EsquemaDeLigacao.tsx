import { Cpu, Cable, CheckCircle2 } from "lucide-react";
import type { GuiaTecnicoMicrobit } from "@/data/microbitTechnicalGuides";

const LINHA = { vermelho: "bg-red-500", preto: "bg-slate-800", amarelo: "bg-amber-400", azul: "bg-blue-500", verde: "bg-green-500" } as const;

export function EsquemaDeLigacao({ wiring }: { wiring: GuiaTecnicoMicrobit["wiring"] }) {
  if (wiring.kind === "interno") {
    return (
      <div className="mt-4 rounded-card-sm border border-green/25 bg-green/8 p-4">
        <div className="flex items-center gap-3"><Cpu className="text-green" aria-hidden /><p className="font-bold">Sem fios: {wiring.component}</p></div>
        <p className="mt-2 text-[13px] leading-relaxed text-navy/70">O sensor ou atuador já faz parte da placa. Ligue somente o cabo USB para programar.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-card-sm border border-navy/10 bg-white">
      <div className="flex items-center gap-3 bg-navy px-4 py-3 text-white"><Cpu size={20} aria-hidden /><span className="font-bold">micro:bit</span><Cable size={18} className="ml-auto text-cyan" aria-hidden /><span className="max-w-[50%] text-right text-[12px] font-bold">{wiring.component}</span></div>
      <ol className="divide-y divide-navy/8">
        {wiring.connections.map((connection) => (
          <li key={`${connection.from}-${connection.to}`} className="grid gap-2 p-3 sm:grid-cols-[1fr_44px_1fr] sm:items-center">
            <span className="rounded bg-navy/5 px-2 py-1 text-[12px] font-bold">{connection.from}</span>
            <span className={`hidden h-1 rounded-full sm:block ${LINHA[connection.color]}`} />
            <span className="text-[12px]"><strong>{connection.to}</strong><br /><span className="text-navy/55">{connection.purpose}</span></span>
          </li>
        ))}
      </ol>
      <ul className="border-t border-navy/8 bg-amber/8 p-3">
        {wiring.notes.map((note) => <li key={note} className="flex gap-2 text-[12px] leading-relaxed text-navy/75"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-amber" aria-hidden />{note}</li>)}
      </ul>
    </div>
  );
}
