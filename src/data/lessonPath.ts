import { LESSON_PLANS, type LessonPlan } from "./lessonPlans";

export type LessonPathStage = {
  id: string;
  order: number;
  title: string;
  promise: string;
  lessons: LessonPlan[];
};

function isSensorOrData(plan: LessonPlan): boolean {
  return /sensor|temperatura|luz|luminos|som|ruído|barulho|bússola|umidade|ambiente|dados|gráfico|clima|chuva|enchente|composteira|ar\b/i.test(`${plan.title} ${plan.theme}`);
}

function isExternalOrIntegrator(plan: LessonPlan): boolean {
  return plan.level === "avancado" || /servo|motor|robô|maquete|neopixel|bme|regador|pino|circuito|estação|integrador/i.test(`${plan.title} ${plan.theme}`);
}

function stageId(plan: LessonPlan): string {
  if (!plan.needsMicrobit) return "pensar-antes-de-programar";
  if (plan.level === "iniciante") return "primeiros-programas";
  if (isExternalOrIntegrator(plan)) return "robotica-e-integracao";
  if (isSensorOrData(plan)) return "sensores-e-dados";
  if (/jogo|quiz|desafio|escape|bingo|sorte|reação|reflexo|memória/i.test(`${plan.title} ${plan.theme}`)) return "logica-e-jogos";
  return "programas-interativos";
}

const STAGES = [
  ["pensar-antes-de-programar", "Pensar antes de programar", "Construa algoritmo, sequência, repetição e depuração com corpo, papel e tabuleiro."],
  ["primeiros-programas", "Primeiros programas no micro:bit", "Domine matriz, botões, eventos, texto, números e o fluxo do MakeCode."],
  ["programas-interativos", "Programas interativos", "Combine variáveis, condições, repetições, música, movimento e comunicação."],
  ["logica-e-jogos", "Lógica e jogos", "Use regras, pontuação, aleatoriedade, tempo e colaboração para criar desafios."],
  ["sensores-e-dados", "Sensores, ciências e dados", "Meça o ambiente, calibre limites, registre dados e sustente conclusões."],
  ["robotica-e-integracao", "Robótica e projetos integradores", "Conecte componentes, atuadores, energia, estrutura e programação em sistemas completos."],
] as const;

export const LESSON_PATH_STAGES: LessonPathStage[] = STAGES.map(([id, title, promise], index) => ({
  id,
  order: index + 1,
  title,
  promise,
  lessons: LESSON_PLANS.filter((plan) => stageId(plan) === id),
}));

export const RECOMMENDED_LESSON_PATH = LESSON_PATH_STAGES.flatMap((stage) => stage.lessons);

export function recommendedNeighbors(id: string): { previous: LessonPlan | null; next: LessonPlan | null; position: number } | null {
  const index = RECOMMENDED_LESSON_PATH.findIndex((plan) => plan.id === id);
  if (index < 0) return null;
  return { previous: RECOMMENDED_LESSON_PATH[index - 1] ?? null, next: RECOMMENDED_LESSON_PATH[index + 1] ?? null, position: index + 1 };
}
