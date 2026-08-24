export type StageId =
  | "comecar"
  | "preparar"
  | "aprender"
  | "robotica"
  | "aulas-microbit"
  | "praticar"
  | "tabuleiro"
  | "microbit"
  | "trilhas"
  | "planejar";

export type Stage = {
  id: StageId;
  order: number;
  label: string;
  short: string;
  href: string;
  verb: string;
  total: number;
};

export type StageProgress = Stage & {
  done: number;
  percent: number;
  complete: boolean;
};

export const STAGES: Stage[] = [
  { id: "comecar", order: 1, label: "Começar", short: "Começar", href: "/comecar", verb: "Descubra por onde começar", total: 1 },
  { id: "preparar", order: 2, label: "Preparação do professor", short: "Preparar-se", href: "/preparar", verb: "Construa sua base", total: 10 },
  { id: "aprender", order: 3, label: "Pensamento computacional", short: "Pensamento", href: "/aprender", verb: "Aprenda os conceitos-base", total: 11 },
  { id: "robotica", order: 4, label: "Fundamentos de robótica", short: "Robótica", href: "/robotica", verb: "Entenda sensores e atuadores", total: 8 },
  { id: "microbit", order: 5, label: "Conhecer o micro:bit", short: "micro:bit", href: "/microbit", verb: "Conheça a placa e o MakeCode", total: 10 },
  { id: "aulas-microbit", order: 6, label: "Aulas e projetos", short: "Aulas", href: "/aulas", verb: "Escolha sequência ou filtros", total: 1 },
  { id: "praticar", order: 7, label: "Atividades desplugadas", short: "Atividades", href: "/praticar", verb: "Experimente sem tecnologia", total: 12 },
  { id: "tabuleiro", order: 8, label: "Tabuleiro", short: "Tabuleiro", href: "/tabuleiro", verb: "Use o tabuleiro", total: 8 },
  { id: "trilhas", order: 9, label: "Caminho recomendado", short: "Caminho", href: "/aulas/caminho", verb: "Siga a ordem das aulas", total: 24 },
  { id: "planejar", order: 10, label: "Todas as aulas", short: "Todas as aulas", href: "/planejar", verb: "Consulte as 150 aulas", total: 1 },
];

export const CORE_STAGE_IDS: StageId[] = [
  "comecar",
  "preparar",
  "aprender",
  "robotica",
  "microbit",
  "aulas-microbit",
];

export const CORE_STAGES: Stage[] = CORE_STAGE_IDS.map((id) => STAGES.find((stage) => stage.id === id)!);

const POR_ID = new Map<string, Stage>(STAGES.map((e) => [e.id, e]));

export function stageOf(id: string): StageId | null {
  const separador = id.indexOf(":");
  if (separador <= 0) return null;
  const prefixo = id.slice(0, separador);
  return POR_ID.has(prefixo) ? (prefixo as StageId) : null;
}

export function computeJourney(doneIds: string[]): StageProgress[] {
  const unicos = new Set(doneIds);
  const contagem = new Map<StageId, number>();

  for (const id of unicos) {
    const etapa = stageOf(id);
    if (!etapa) continue;
    contagem.set(etapa, (contagem.get(etapa) ?? 0) + 1);
  }

  return STAGES.map((etapa) => {
    const done = Math.min(contagem.get(etapa.id) ?? 0, etapa.total);
    const percent = etapa.total === 0 ? 0 : Math.round((done / etapa.total) * 100);
    return { ...etapa, done, percent, complete: done >= etapa.total };
  });
}

export function overallPercent(doneIds: string[]): number {
  const progresso = computeJourney(doneIds);
  const feitos = progresso.reduce((soma, e) => soma + e.done, 0);
  const total = progresso.reduce((soma, e) => soma + e.total, 0);
  return total === 0 ? 0 : Math.round((feitos / total) * 100);
}

export function nextStage(doneIds: string[]): StageProgress | null {
  return computeJourney(doneIds).find((e) => !e.complete) ?? null;
}
