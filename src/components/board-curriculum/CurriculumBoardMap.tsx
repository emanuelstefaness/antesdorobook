import { Bot, Flag, LockKeyhole, TriangleAlert } from "lucide-react";
import type { BoardAcrossCurriculumActivity } from "@/data/boardAcrossCurriculum";

const COLUNAS = ["A", "B", "C", "D", "E", "F"];
const LINHAS = [6, 5, 4, 3, 2, 1];
const DIRECAO = { norte: "↑", sul: "↓", leste: "→", oeste: "←" } as const;

export function CurriculumBoardMap({ activity, compact = false }: { activity: BoardAcrossCurriculumActivity; compact?: boolean }) {
  const stages = new Map(activity.stages.map((stage, index) => [stage.coordinate, { ...stage, index }]));
  const obstacles = new Set(activity.obstacles.map((obstacle) => obstacle.coordinate));

  return (
    <figure className="min-w-0">
      <div
        className={`mx-auto grid aspect-square w-full max-w-[620px] grid-cols-[28px_repeat(6,minmax(0,1fr))] grid-rows-[28px_repeat(6,minmax(0,1fr))] overflow-hidden rounded-card-sm border-2 border-navy/15 bg-wood shadow-card ${compact ? "max-w-[310px]" : ""}`}
        aria-label={`Mapa 6 por 6 da atividade ${activity.title}`}
      >
        <span className="bg-navy/8" aria-hidden />
        {COLUNAS.map((coluna) => <span key={coluna} className="flex items-center justify-center bg-navy font-mono text-[10px] font-bold text-white">{coluna}</span>)}
        {LINHAS.flatMap((linha) => [
          <span key={`linha-${linha}`} className="flex items-center justify-center bg-navy font-mono text-[10px] font-bold text-white">{linha}</span>,
          ...COLUNAS.map((coluna) => {
            const coordinate = `${coluna}${linha}`;
            const stage = stages.get(coordinate);
            const isStart = coordinate === activity.start.coordinate;
            const isFinish = coordinate === activity.finish;
            const isObstacle = obstacles.has(coordinate);
            const label = isStart
              ? `Início em ${coordinate}, olhando para ${activity.start.direction}`
              : isFinish
              ? `Resultado final em ${coordinate}`
              : stage
              ? `Etapa ${stage.index + 1}, ${stage.title}, em ${coordinate}`
              : isObstacle
              ? `Obstáculo em ${coordinate}`
              : `Casa ${coordinate}`;
            return (
              <span
                key={coordinate}
                title={label}
                aria-label={label}
                className={`relative flex min-w-0 items-center justify-center border-l border-t border-navy/12 p-0.5 text-center ${
                  isStart ? "bg-cyan/25" : isFinish ? "bg-amber/30" : stage ? "bg-white" : isObstacle ? "bg-coral/18" : "bg-cream-hi/70"
                }`}
              >
                {isStart ? <span className="flex flex-col items-center text-cyan"><Bot size={compact ? 15 : 22}/><strong className="font-mono text-[10px]">{DIRECAO[activity.start.direction]}</strong></span> : null}
                {isFinish ? <span className="flex flex-col items-center text-amber"><LockKeyhole size={compact ? 14 : 21}/>{compact ? null : <strong className="mt-0.5 text-[7px] uppercase">Final</strong>}</span> : null}
                {stage ? <span className="flex h-[70%] w-[70%] items-center justify-center rounded-lg bg-navy font-mono text-[10px] font-bold text-white shadow-sm sm:text-[13px]">{stage.index + 1}</span> : null}
                {isObstacle ? <TriangleAlert size={compact ? 12 : 18} className="text-coral"/> : null}
              </span>
            );
          }),
        ])}
      </div>
      {compact ? null : (
        <figcaption className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-navy/65">
          <span className="inline-flex items-center gap-1.5"><Bot size={14} className="text-cyan"/> Início e direção</span>
          <span className="inline-flex items-center gap-1.5"><span className="flex h-4 w-4 items-center justify-center rounded bg-navy font-mono text-[8px] text-white">1</span> Parada curricular</span>
          <span className="inline-flex items-center gap-1.5"><TriangleAlert size={14} className="text-coral"/> Obstáculo</span>
          <span className="inline-flex items-center gap-1.5"><Flag size={14} className="text-amber"/> Resultado final</span>
        </figcaption>
      )}
    </figure>
  );
}
