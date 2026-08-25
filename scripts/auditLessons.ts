import ts from "typescript";
import { LESSON_PLANS } from "../src/data/lessonPlans";
import { guiaTecnicoPorPlano, MICROBIT_TECHNICAL_GUIDES } from "../src/data/microbitTechnicalGuides";
import { guideProducesSound, guideUsesRadio, technicalRequirementsFor } from "../src/data/technicalRequirements";

const errors: string[] = [];
const warnings: string[] = [];
const microbitPlans = LESSON_PLANS.filter((plan) => plan.needsMicrobit);

function syntaxErrors(source: string) {
  const result = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2020 },
    reportDiagnostics: true,
  });
  return (result.diagnostics ?? [])
    .filter((item) => item.category === ts.DiagnosticCategory.Error)
    .map((item) => ts.flattenDiagnosticMessageText(item.messageText, " "));
}

for (const plan of LESSON_PLANS) {
  const guide = guiaTecnicoPorPlano(plan.id);
  if (plan.needsMicrobit !== Boolean(guide)) {
    errors.push(plan.id + ": declaração de micro:bit e existência de guia não coincidem.");
  }
  if (!plan.objective.trim() || !plan.explanation.trim() || !plan.test.trim() || !plan.debug.trim()) {
    errors.push(plan.id + ": roteiro pedagógico possui campo essencial vazio.");
  }
  if (!guide) continue;

  if (/\/\/\s*Bloco:/i.test(guide.code)) {
    errors.push(plan.id + ": código copiável ainda contém ação substituída por comentário.");
  }
  if (/^\s*\/\/(?:.|\n)*$/m.test(guide.code) && !guide.extensions.some((item) => /CreateAI/i.test(item))) {
    errors.push(plan.id + ": código não executa nenhuma ação.");
  }
  for (const issue of syntaxErrors(guide.code)) {
    errors.push(plan.id + ": TypeScript inválido — " + issue);
  }
  if (guide.blocks.some((item) => /(?:PROGRAMA|PLACA) .+ PILHA/i.test(item.block))) {
    errors.push(plan.id + ": marcador editorial aparece como se fosse bloco do MakeCode.");
  }
  if (guide.blocks.map((item) => item.order).some((order, index) => order !== index + 1)) {
    errors.push(plan.id + ": ordem numérica dos blocos está quebrada.");
  }
  if (guide.expected.some((item) => /^O projeto realiza/i.test(item))) {
    errors.push(plan.id + ": resultado esperado é genérico.");
  }
  if (guide.answers.length < 3 || guide.diagnostics.length < 4) {
    errors.push(plan.id + ": respostas ou diagnóstico insuficientes.");
  }
  if (/input\.soundLevel|input\.onLogoEvent|soundExpression\./.test(guide.code) && !/^BBC micro:bit V2$/.test(guide.board)) {
    errors.push(plan.id + ": usa recurso exclusivo da V2 sem exigir V2.");
  }

  const requirements = technicalRequirementsFor(guide);
  if (guideUsesRadio(guide) && !requirements.some((item) => item.kind === "placa" && /^2 placas/.test(item.quantity))) {
    errors.push(plan.id + ": rádio sem duas placas no kit.");
  }
  if (guideProducesSound(guide) && /\bV1\b/.test(guide.board)
    && !requirements.some((item) => item.kind === "condicional" && /alto-falante|piezo/i.test(item.item))) {
    errors.push(plan.id + ": som na V1 sem saída externa explicitada.");
  }
  if (guide.wiring.kind === "externo") {
    if (guide.wiring.connections.length < 2 || guide.wiring.notes.length < 2) {
      errors.push(plan.id + ": componente externo sem ligação ou segurança suficientes.");
    }
    if (!requirements.some((item) => item.kind === "componente" && item.item === guide.wiring.component)) {
      errors.push(plan.id + ": componente externo não aparece no kit.");
    }
  }

  const categories = guide.blocks.map((item) => item.category);
  if (/radio\./.test(guide.code) && !categories.includes("Rádio")) warnings.push(plan.id + ": código usa rádio sem bloco categorizado como Rádio.");
  if (/serial\./.test(guide.code) && !categories.includes("Serial")) warnings.push(plan.id + ": código usa Serial sem bloco categorizado como Serial.");
  if (/music\.|soundExpression\./.test(guide.code) && !categories.includes("Música")) warnings.push(plan.id + ": código usa som sem bloco categorizado como Música.");
  if (/pins\./.test(guide.code) && !categories.includes("Pinos")) warnings.push(plan.id + ": código usa pinos sem bloco categorizado como Pinos.");
}

if (LESSON_PLANS.length !== 150) errors.push("O catálogo não possui exatamente 150 aulas.");
if (microbitPlans.length !== MICROBIT_TECHNICAL_GUIDES.length) errors.push("Quantidade de guias diferente da quantidade de aulas com micro:bit.");

console.log(JSON.stringify({
  summary: {
    lessons: LESSON_PLANS.length,
    microbitLessons: microbitPlans.length,
    nonMicrobitLessons: LESSON_PLANS.length - microbitPlans.length,
    guides: MICROBIT_TECHNICAL_GUIDES.length,
    withoutPlaceholderComments: MICROBIT_TECHNICAL_GUIDES.filter((guide) => !/\/\/\s*Bloco:/i.test(guide.code)).length,
    modelGeneratedCode: MICROBIT_TECHNICAL_GUIDES.filter((guide) => guide.extensions.some((item) => /CreateAI/i.test(item))).length,
    externalHardware: MICROBIT_TECHNICAL_GUIDES.filter((guide) => guide.wiring.kind === "externo").length,
    radio: MICROBIT_TECHNICAL_GUIDES.filter(guideUsesRadio).length,
    v2Only: MICROBIT_TECHNICAL_GUIDES.filter((guide) => /^BBC micro:bit V2$/.test(guide.board)).length,
    errors: errors.length,
    warnings: warnings.length,
  },
  errors,
  warnings,
}, null, 2));

if (errors.length) process.exitCode = 1;
