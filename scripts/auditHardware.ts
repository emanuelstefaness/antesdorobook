import { LESSON_PLANS } from "../src/data/lessonPlans";
import { buildLessonSupport } from "../src/data/lessonSupport";
import {
  MICROBIT_TECHNICAL_GUIDES,
  guiaTecnicoPorPlano,
} from "../src/data/microbitTechnicalGuides";
import {
  guideProducesSound,
  guideUsesRadio,
  technicalRequirementsFor,
} from "../src/data/technicalRequirements";

const EXTERNAL_HARDWARE_SIGNALS = [
  /\b(?:micro)?servo\b/i,
  /\bmotor(?:es)?\s*(?:dc|de corrente|elétrico)/i,
  /\bmotion:?bit\b/i,
  /\bponte h\b/i,
  /\bdriver de motor/i,
  /\bneo\s?pixel\b/i,
  /\bfita de leds?\b/i,
  /\bleds? (?:externos?|com resistores?)/i,
  /\bbomba (?:d[’']?água|de água)/i,
  /\bbme\s?280\b/i,
  /\bpluviômetro\b/i,
  /\bsensor (?:ultrassônico|capacitivo|infravermelho|de nível|de qualidade do ar|de barreira|de umidade do solo|externo)/i,
  /\breed switch\b/i,
  /\bpotenciômetro\b/i,
  /\bjoystick\b/i,
  /\brelé\b/i,
  /\bsolenoide\b/i,
  /\bcabos? jacaré\b/i,
  /\báreas? condutivas?\b/i,
  /\bestágio de acionamento\b/i,
];

function textForAudit(plan: (typeof LESSON_PLANS)[number]) {
  const guide = guiaTecnicoPorPlano(plan.id);
  return [
    plan.title,
    plan.theme,
    plan.objective,
    ...plan.preparation,
    plan.explanation,
    plan.investigation,
    plan.construction,
    plan.test,
    guide?.title,
    guide?.board,
    ...(guide?.extensions ?? []),
    ...(guide?.blocks.flatMap((block) => [block.category, block.block, block.place]) ?? []),
    guide?.code,
  ]
    .filter(Boolean)
    .join(" ");
}

const errors: string[] = [];
const warnings: string[] = [];
const microbitPlans = LESSON_PLANS.filter((plan) => plan.needsMicrobit);
const radioPlans = microbitPlans.filter((plan) => {
  const guide = guiaTecnicoPorPlano(plan.id);
  return guide ? guideUsesRadio(guide) : false;
});
const v1SoundPlans = microbitPlans.filter((plan) => {
  const guide = guiaTecnicoPorPlano(plan.id);
  return guide ? guideProducesSound(guide) && /\bV1\b/i.test(guide.board) : false;
});
const externalPlans: Array<{
  id: string;
  title: string;
  board: string;
  component: string;
  extensions: string[];
  connections: number;
  safetyNotes: number;
}> = [];

if (LESSON_PLANS.length !== 150) errors.push(`Catálogo possui ${LESSON_PLANS.length} aulas, não 150.`);
if (new Set(LESSON_PLANS.map((plan) => plan.id)).size !== 150) errors.push("Há IDs de aula repetidos.");
if (new Set(MICROBIT_TECHNICAL_GUIDES.map((guide) => guide.id)).size !== MICROBIT_TECHNICAL_GUIDES.length) {
  errors.push("Há IDs de guia técnico repetidos.");
}

for (const plan of LESSON_PLANS) {
  const guide = guiaTecnicoPorPlano(plan.id);

  if (plan.needsMicrobit && !guide) {
    errors.push(`${plan.id}: usa micro:bit, mas não possui guia técnico.`);
    continue;
  }
  if (!plan.needsMicrobit && guide) errors.push(`${plan.id}: possui guia técnico, mas o plano não declara micro:bit.`);
  if (!guide) continue;

  const text = textForAudit(plan);
  const signals = EXTERNAL_HARDWARE_SIGNALS.filter((pattern) => pattern.test(text));
  if (signals.length > 0 && guide.wiring.kind !== "externo") {
    errors.push(`${plan.id}: menciona hardware externo, mas está marcado como recurso interno.`);
  }

  if (!guide.board.trim()) errors.push(`${plan.id}: versão/placa necessária não informada.`);
  if (guide.blocks.length < 2) errors.push(`${plan.id}: sequência de blocos incompleta.`);
  if (guide.expected.length < 2) errors.push(`${plan.id}: resultado esperado incompleto.`);
  if (guide.answers.length < 2) errors.push(`${plan.id}: respostas esperadas incompletas.`);
  if (guide.diagnostics.length < 3) errors.push(`${plan.id}: diagnóstico técnico incompleto.`);

  const requirements = technicalRequirementsFor(guide);
  const boardRequirement = requirements.find((item) => item.kind === "placa");
  if (!boardRequirement) errors.push(`${plan.id}: placa não aparece no kit técnico.`);
  if (!requirements.some((item) => item.item === "Cabo USB de dados")) {
    errors.push(`${plan.id}: cabo USB de dados não aparece no kit técnico.`);
  }
  if (guideUsesRadio(guide) && !boardRequirement?.quantity.startsWith("2 placas")) {
    errors.push(`${plan.id}: usa rádio, mas não exige duas placas para o teste físico.`);
  }
  if (guideProducesSound(guide) && /\bV1\b/i.test(guide.board)
    && !requirements.some((item) => item.kind === "condicional" && /alto-falante|piezo/i.test(item.item))) {
    errors.push(`${plan.id}: produz som na V1, mas não informa a saída de áudio externa.`);
  }

  const expectedText = guide.expected.join(" ");
  const componentText = guide.wiring.component;
  for (const [label, signal] of [
    ["bomba", /\bbomba\b/i],
    ["MOSFET/driver", /\b(?:mosfet|driver)\b/i],
    ["servo", /\bservo\b/i],
    ["motor DC", /\bmotor(?:es)?\s+dc\b/i],
    ["NeoPixel", /\bneo\s?pixel\b/i],
  ] as const) {
    if (signal.test(expectedText) && !signal.test(componentText)) {
      errors.push(`${plan.id}: o resultado esperado menciona ${label}, mas o item não aparece no componente obrigatório.`);
    }
  }

  if (guide.wiring.kind === "interno") {
    if (guide.wiring.connections.length !== 0) errors.push(`${plan.id}: recurso interno possui ligações externas.`);
    continue;
  }

  externalPlans.push({
    id: plan.id,
    title: plan.title,
    board: guide.board,
    component: guide.wiring.component,
    extensions: guide.extensions,
    connections: guide.wiring.connections.length,
    safetyNotes: guide.wiring.notes.length,
  });
  if (!guide.wiring.component.trim()) errors.push(`${plan.id}: componente externo sem nome.`);
  if (guide.wiring.connections.length < 2) errors.push(`${plan.id}: esquema externo possui menos de duas ligações.`);
  if (guide.wiring.notes.length < 1) errors.push(`${plan.id}: componente externo sem cuidado de segurança.`);
  if (new Set(guide.wiring.connections.map((item) => `${item.from}->${item.to}`)).size !== guide.wiring.connections.length) {
    errors.push(`${plan.id}: esquema possui ligação repetida.`);
  }

  const support = buildLessonSupport(plan, guide);
  const componentMaterial = support.materials.find((item) => item.name.startsWith("Componente externo obrigatório:"));
  if (!componentMaterial?.name.includes(guide.wiring.component)) {
    errors.push(`${plan.id}: checklist não informa o componente externo exato.`);
  }
  if (!support.materials.some((item) => item.name === "Cabos e conectores compatíveis")) {
    errors.push(`${plan.id}: checklist não informa cabos e conectores.`);
  }

  const electricalText = [
    guide.wiring.component,
    ...guide.wiring.connections.flatMap((item) => [item.from, item.to, item.purpose]),
    ...guide.wiring.notes,
  ].join(" ");
  if (/fonte externa|alimentação externa/i.test(electricalText)
    && !support.materials.some((item) => item.name === "Fonte de alimentação externa compatível")) {
    errors.push(`${plan.id}: exige alimentação externa, mas ela não aparece no checklist.`);
  }
  if (/\b(?:servo|motor|bomba)\b/i.test(electricalText)
    && guide.wiring.connections.some((item) => item.from === "3V" && /motor|servo|bomba|V\+/i.test(item.to))) {
    errors.push(`${plan.id}: possível alimentação insegura de atuador pelo pino 3V.`);
  }
  if (/\b5\s?v\b/i.test(electricalText) && !/não|nunca|apenas se|compatível/i.test(electricalText)) {
    warnings.push(`${plan.id}: há referência a 5 V; revisar a proteção dos pinos.`);
  }
}

if (MICROBIT_TECHNICAL_GUIDES.length !== microbitPlans.length) {
  errors.push(`Há ${MICROBIT_TECHNICAL_GUIDES.length} guias para ${microbitPlans.length} aulas com micro:bit.`);
}

console.log(JSON.stringify({
  summary: {
    lessons: LESSON_PLANS.length,
    withoutMicrobit: LESSON_PLANS.length - microbitPlans.length,
    withMicrobit: microbitPlans.length,
    internalMicrobit: microbitPlans.length - externalPlans.length,
    externalHardware: externalPlans.length,
    radioNeedsTwoBoards: radioPlans.length,
    v1SoundNeedsExternalAudio: v1SoundPlans.length,
    errors: errors.length,
    warnings: warnings.length,
  },
  externalLessons: externalPlans,
  warnings,
  errors,
}, null, 2));

if (errors.length > 0) process.exitCode = 1;
