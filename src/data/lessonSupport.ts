import { CONCEPTS } from "./concepts";
import type { LessonPlan } from "./lessonPlans";
import type { GuiaTecnicoMicrobit } from "./microbitTechnicalGuides";
import type { Duration, Material } from "./types";

export type QuestionAnswer = { question: string; answer: string };
export type MaterialDetail = { name: string; quantity: string; use: string; caution: string };
export type TimelineRow = { time: string; title: string; teacher: string; students: string; evidence: string };
export type Adaptation = { title: string; text: string };
export type RubricRow = { criterion: string; beginning: string; developing: string; achieved: string };
export type Diagnostic = { symptom: string; cause: string; check: string; fix: string };

const TIMES: Record<Duration, string[]> = {
  15: ["0–2", "2–3", "3–5", "5–7", "7–10", "10–12", "12–14", "14–15"],
  30: ["0–3", "3–6", "6–10", "10–15", "15–22", "22–25", "25–28", "28–30"],
  50: ["0–5", "5–8", "8–14", "14–22", "22–34", "34–40", "40–46", "46–50"],
  100: ["0–10", "10–15", "15–25", "25–40", "40–65", "65–78", "78–90", "90–100"],
};

const MATERIAL: Record<Material, Omit<MaterialDetail, "use">> = {
  nenhum: { name: "Nenhum material especial", quantity: "Use apenas o espaço da sala", caution: "Mantenha a área de circulação livre." },
  "papel-e-lapis": { name: "Papel e lápis", quantity: "1 conjunto por aluno ou dupla", caution: "Peça a previsão por escrito antes do teste." },
  cartoes: { name: "Cartões de comandos", quantity: "1 conjunto por grupo", caution: "Separe evento, ação, decisão e repetição em pilhas visíveis." },
  "fita-crepe": { name: "Fita-crepe", quantity: "1 rolo para marcar o espaço", caution: "Não aplique sobre piso delicado sem testar a remoção." },
  tabuleiro: { name: "Tabuleiro de programação", quantity: "1 por grupo ou 1 central para rodízio", caution: "Confirme a orientação inicial do robô antes de cada execução." },
  microbit: { name: "BBC micro:bit", quantity: "1 por grupo; com uma placa, use rodízio", caution: "Segure pelas bordas, desligue antes de mudar fios e nunca aplique 5 V nos pinos." },
  computador: { name: "Computador com MakeCode", quantity: "1 por grupo; ou 1 projetado para a turma", caution: "Use cabo USB de dados e mantenha o simulador como plano alternativo." },
  reciclaveis: { name: "Materiais recicláveis", quantity: "1 kit leve por grupo", caution: "Evite peças cortantes, úmidas ou que pressionem botões e conexões." },
};

const PHASES = [
  ["Abertura", "intro", "Observam o resultado ou situação e registram a primeira hipótese.", "Formula uma hipótese relacionada ao objetivo."],
  ["Pergunta disparadora", "triggerQuestion", "Respondem primeiro sem receber a solução e justificam a resposta.", "Expõe o que já sabe e o que ainda precisa investigar."],
  ["Explicação", "explanation", "Relacionam o conceito a um exemplo próprio e reformulam a explicação.", "Consegue explicar a ideia sem repetir apenas o nome do conceito."],
  ["Investigação", "investigation", "Preveem, observam e registram dados ou possíveis caminhos.", "Produz uma previsão verificável antes da construção."],
  ["Construção", "construction", "Constroem em etapas, explicando a função de cada parte antes de avançar.", "A montagem ou sequência corresponde ao planejamento do grupo."],
  ["Teste", "test", "Executam casos diferentes e comparam o resultado com a previsão.", "Registra o que deveria acontecer e o que realmente aconteceu."],
  ["Depuração", "debug", "Localizam a primeira diferença, mudam uma coisa e testam novamente.", "Explica causa, teste realizado e correção sem recomeçar tudo."],
  ["Compartilhamento", "sharing", "Apresentam solução, evidência e uma melhoria possível.", "Comunica o raciocínio, não apenas mostra o produto final."],
] as const;

function unique(items: string[]) {
  return [...new Set(items.map((item) => item.trim()).filter(Boolean))];
}

function materialDetails(plan: LessonPlan): MaterialDetail[] {
  return plan.materials.map((material) => ({
    ...MATERIAL[material],
    use: material === "nenhum"
      ? `Realizar ${plan.title.toLowerCase()} sem depender de equipamento específico.`
      : `Usado na investigação, construção ou registro da aula “${plan.title}”.`,
  }));
}

export function buildLessonSupport(plan: LessonPlan, guide?: GuiaTecnicoMicrobit) {
  const concepts = plan.concepts.map((id) => CONCEPTS.find((concept) => concept.id === id)).filter((item): item is NonNullable<typeof item> => Boolean(item));
  const readiness: QuestionAnswer[] = [
    { question: `O que os alunos devem compreender na aula “${plan.title}”?`, answer: plan.objective },
    { question: `Como você explicaria ${plan.theme.toLowerCase()} sem mostrar a solução pronta?`, answer: plan.explanation },
    guide
      ? { question: "Qual evento inicia o programa e qual saída deve aparecer?", answer: `O programa começa por ${guide.blocks.filter((block) => (block.indent ?? 0) === 0).map((block) => `“${block.block}”`).join(", ")}. O resultado esperado inclui: ${guide.expected[0]}` }
      : { question: "Como a turma comprovará que a solução funciona?", answer: plan.test },
    { question: "O que fazer primeiro quando o resultado não for o esperado?", answer: `Localize a primeira etapa diferente da previsão e altere uma coisa por vez. Nesta aula: ${plan.debug}` },
  ];

  const preparation = unique([
    ...plan.preparation,
    ...(guide?.before ?? []),
    "Realize a atividade inteira como participante e cronometre a etapa de construção.",
    "Prepare um exemplo funcionando e um erro intencional para a turma diagnosticar.",
    "Defina os papéis de quem prevê, constrói, testa e registra; troque os papéis durante a aula.",
  ]);

  const timeline: TimelineRow[] = PHASES.map(([title, field, students, evidence], index) => ({
    time: `${TIMES[plan.duration][index]} min`,
    title,
    teacher: plan[field],
    students,
    evidence,
  }));

  const questions: QuestionAnswer[] = unique([
    plan.triggerQuestion,
    ...(guide?.answers.map((item) => item.question) ?? []),
    "Como podemos provar que o resultado não aconteceu por acaso?",
    "O que mudaria se alterássemos uma regra ou uma etapa da solução?",
    "Qual alteração melhoraria o projeto sem mudar o objetivo da aula?",
  ]).map((question) => {
    if (question === plan.triggerQuestion) return { question, answer: plan.explanation };
    const technical = guide?.answers.find((item) => item.question === question);
    if (technical) return technical;
    if (question.startsWith("Como podemos provar")) return { question, answer: plan.test };
    if (question.startsWith("O que mudaria")) return { question, answer: `A turma deve prever a consequência, alterar somente uma regra ou etapa e repetir o teste. A depuração prevista é: ${plan.debug}` };
    return { question, answer: `A melhoria deve preservar o objetivo — ${plan.objective.toLowerCase()} — e ser comprovada com um novo teste.` };
  });

  const adaptations: Adaptation[] = plan.needsMicrobit
    ? [
        { title: "Somente uma placa", text: "Crie quatro estações: previsão em papel, montagem no simulador, teste físico curto e explicação. A placa circula; todos continuam raciocinando." },
        { title: "Sem placa física", text: `Use o simulador e represente a entrada com cartões ou controles da tela. Preserve o teste descrito: ${plan.test}` },
        { title: "Versão mais fácil", text: `Entregue o evento inicial pronto e peça que os alunos completem apenas a entrada, a regra e a saída necessárias para ${plan.title.toLowerCase()}.` },
        { title: "Desafio avançado", text: `Peça dois casos adicionais, um erro intencional e uma justificativa baseada em evidências para aperfeiçoar ${plan.title.toLowerCase()}.` },
      ]
    : [
        { title: "Turma grande", text: "Forme grupos de quatro com papéis definidos: leitor, executor, observador e registrador. Troque os papéis na segunda rodada." },
        { title: "Poucos materiais", text: "Demonstre uma rodada no centro e faça os demais grupos preverem e registrarem antes de executar." },
        { title: "Versão mais fácil", text: `Reduza a quantidade de etapas, mas preserve a decisão central: ${plan.objective}` },
        { title: "Desafio avançado", text: `Inclua uma restrição ou um erro intencional e peça que o grupo prove por que sua solução para ${plan.title.toLowerCase()} continua correta.` },
      ];

  const rubric: RubricRow[] = [
    { criterion: "Compreensão do conceito", beginning: "Nomeia o conteúdo, mas não explica o que acontece.", developing: "Explica com ajuda e reconhece o conceito no exemplo da aula.", achieved: `Explica ${plan.theme.toLowerCase()} com exemplo próprio e relaciona ao objetivo.` },
    { criterion: "Planejamento e construção", beginning: "Começa a montar sem prever nem organizar.", developing: "Segue a sequência com lembretes e explica algumas escolhas.", achieved: "Prevê, constrói em etapas e justifica a ordem das decisões." },
    { criterion: "Teste e depuração", beginning: "Recomeça ou troca várias partes ao mesmo tempo.", developing: "Localiza o erro com perguntas do professor.", achieved: "Isola, testa e corrige uma causa, registrando a evidência." },
    { criterion: "Comunicação", beginning: "Mostra o resultado sem explicar.", developing: "Descreve partes do processo.", achieved: "Apresenta objetivo, solução, teste, erro encontrado e melhoria." },
  ];

  const diagnostics: Diagnostic[] = guide ? [
    ...guide.diagnostics,
    {
      symptom: "O programa executa, mas não produz o resultado descrito na aula",
      cause: "Um valor, condição, evento ou saída está diferente da receita desta atividade.",
      check: `Compare uma pilha por vez com o resultado esperado: ${guide.expected[0]}`,
      fix: `Corrija somente a primeira diferença e teste novamente. Orientação desta aula: ${plan.debug}`,
    },
  ] : (plan.needsBoard
    ? [
        { symptom: "O robô termina na casa errada", cause: "Um avanço foi contado a mais, a menos ou após um giro incorreto.", check: "Numere as peças e execute uma por vez, marcando a última casa correta.", fix: plan.debug },
        { symptom: "O robô vira e anda ao mesmo tempo", cause: "O grupo interpretou VIRE como deslocamento.", check: "Peça a um aluno para girar o corpo mantendo os pés na mesma casa.", fix: "Separe VIRE de AVANCE e teste novamente desde a última posição confirmada." },
        { symptom: "O caminho parece impossível", cause: "Orientação inicial, obstáculo ou objetivo foi posicionado diferente do desenho.", check: "Compare coordenadas e direção inicial antes de alterar os comandos.", fix: "Corrija somente o cenário divergente ou prove que uma nova rota é necessária." },
        { symptom: "O grupo troca toda a sequência", cause: "Ainda não identificou o primeiro comando defeituoso.", check: "Cubra as peças posteriores e execute até a primeira diferença.", fix: "Troque uma única peça, execute de novo e registre o efeito." },
      ]
    : [
        { symptom: "As instruções produzem resultados diferentes", cause: "Há palavras ambíguas, medidas ausentes ou referências como aqui e ali.", check: "Peça a outro grupo para executar sem fazer perguntas e marque o primeiro ponto de interpretação dupla.", fix: plan.debug },
        { symptom: "A atividade termina, mas ninguém explica o conceito", cause: "A turma concentrou-se no produto e não registrou previsões e evidências.", check: `Pergunte como a ação realizada comprova: ${plan.objective}`, fix: "Retome previsão, resultado e diferença; peça uma frase ligando a evidência ao objetivo." },
        { symptom: "Um aluno faz tudo pelo grupo", cause: "Os papéis não foram definidos ou não houve rodízio.", check: "Observe quem decide, executa, testa e registra.", fix: "Distribua quatro papéis e troque-os antes da segunda rodada." },
        { symptom: "O grupo pede a resposta ao primeiro erro", cause: "Não possui uma sequência de depuração.", check: "Pergunte qual foi a última etapa que funcionou como previsto.", fix: "Isole a etapa seguinte, altere uma coisa e execute novamente." },
      ]);

  return {
    promise: plan.objective,
    everyday: plan.dailyLife ?? `A aula transforma ${plan.theme.toLowerCase()} em uma situação concreta de previsão, decisão, teste e explicação — habilidades usadas para organizar tarefas e resolver problemas reais.`,
    concepts,
    readiness,
    materials: materialDetails(plan),
    preparation,
    rehearsal: [
      `Consigo explicar o objetivo com palavras simples: ${plan.objective}`,
      `Executei a construção completa: ${plan.construction}`,
      guide ? `Confirmei o resultado principal: ${guide.expected[0]}` : `Testei a regra principal: ${plan.test}`,
      `Preparei como diagnosticar o erro mais provável: ${plan.debug}`,
      "Separei uma pergunta de abertura, uma evidência para observar e uma continuidade.",
    ],
    timeline,
    teacherTalk: plan.teacherTalk ?? ["O que vocês esperam que aconteça?", "Qual foi a última etapa que funcionou?", "O que podemos mudar sem refazer tudo?"],
    questions,
    adaptations,
    rubric,
    studentSheet: [
      `Escreva o que você prevê que acontecerá em “${plan.title}”.`,
      "Registre a sequência, os blocos ou as decisões utilizadas.",
      "Compare o resultado esperado com o resultado observado.",
      "Descreva um erro, como ele foi testado e qual correção funcionou.",
      `Explique com suas palavras o que aprendeu sobre ${plan.theme.toLowerCase()}.`,
    ],
    diagnostics,
  };
}
