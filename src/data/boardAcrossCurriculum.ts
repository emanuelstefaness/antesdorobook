export type BoardSubject =
  | "Língua Portuguesa"
  | "Matemática"
  | "História"
  | "Geografia"
  | "Ciências"
  | "Língua Inglesa"
  | "Arte"
  | "Educação Física"
  | "Interdisciplinar";

export type BoardDirection = "norte" | "sul" | "leste" | "oeste";
export type BoardCommand =
  | "INÍCIO"
  | "AVANCE"
  | "VIRE À DIREITA"
  | "VIRE À ESQUERDA"
  | "REPITA 2×"
  | "REPITA 3×"
  | "FIM";

export type CurriculumStage = {
  coordinate: string;
  title: string;
  cardFront: string;
  question: string;
  expectedAnswer: string;
  teacherExplanation: string;
  nextClue: string;
};

export type BoardAcrossCurriculumActivity = {
  id: string;
  subject: BoardSubject;
  title: string;
  summary: string;
  gradeBands: string[];
  duration: 50 | 100;
  difficulty: "Inicial" | "Intermediária" | "Avançada";
  curriculumTopic: string;
  objective: string;
  computationalThinking: string[];
  priorKnowledge: string[];
  priorKnowledgeTeaching: string[];
  mission: string;
  finalProduct: string;
  finalQuestion: string;
  finalAnswer: string;
  evidenceOfLearning: string;
  classOrganization: string;
  start: { coordinate: string; direction: BoardDirection };
  finish: string;
  obstacles: Array<{ coordinate: string; label: string; reason: string }>;
  stages: CurriculumStage[];
  commands: BoardCommand[];
  materials: string[];
  preparation: string[];
  teacherOpening: string;
  lessonFlow: Array<{ minutes: string; title: string; teacherAction: string; studentAction: string; checkpoint: string }>;
  mediatingQuestions: Array<{ question: string; expectedAnswer: string; whyAsk: string }>;
  commonErrors: Array<{ symptom: string; probableCause: string; intervention: string }>;
  assessment: string[];
  adaptations: { easier: string[]; harder: string[]; inclusion: string[] };
  closure: string;
};

type StageSeed = readonly [title: string, cardFront: string, question: string, expectedAnswer: string, explanation: string];
type ActivitySeed = {
  id: string;
  subject: BoardSubject;
  title: string;
  summary: string;
  gradeBands: string[];
  difficulty: BoardAcrossCurriculumActivity["difficulty"];
  topic: string;
  objective: string;
  prior: string[];
  mission: string;
  finalProduct: string;
  finalQuestion: string;
  finalAnswer: string;
  evidence: string;
  stages: readonly [StageSeed, StageSeed, StageSeed, StageSeed];
};

type RouteTemplate = {
  start: BoardAcrossCurriculumActivity["start"];
  stops: [string, string, string, string];
  finish: string;
  obstacles: string[];
  commands: BoardCommand[];
};

const ROUTES: RouteTemplate[] = [
  {
    start: { coordinate: "A1", direction: "norte" },
    stops: ["A3", "C3", "C5", "F5"],
    finish: "F6",
    obstacles: ["B2", "D4", "E2"],
    commands: ["INÍCIO", "REPITA 2×", "AVANCE", "VIRE À DIREITA", "REPITA 2×", "AVANCE", "VIRE À ESQUERDA", "REPITA 2×", "AVANCE", "VIRE À DIREITA", "REPITA 3×", "AVANCE", "VIRE À ESQUERDA", "AVANCE", "FIM"],
  },
  {
    start: { coordinate: "F1", direction: "oeste" },
    stops: ["D1", "D3", "B3", "B5"],
    finish: "A6",
    obstacles: ["E2", "C2", "C5"],
    commands: ["INÍCIO", "REPITA 2×", "AVANCE", "VIRE À DIREITA", "REPITA 2×", "AVANCE", "VIRE À ESQUERDA", "REPITA 2×", "AVANCE", "VIRE À DIREITA", "REPITA 2×", "AVANCE", "VIRE À ESQUERDA", "AVANCE", "VIRE À DIREITA", "AVANCE", "FIM"],
  },
  {
    start: { coordinate: "B1", direction: "norte" },
    stops: ["B3", "D3", "D5", "F5"],
    finish: "F6",
    obstacles: ["C1", "C2", "C4", "C5", "C6"],
    commands: ["INÍCIO", "REPITA 2×", "AVANCE", "VIRE À DIREITA", "REPITA 2×", "AVANCE", "VIRE À ESQUERDA", "REPITA 2×", "AVANCE", "VIRE À DIREITA", "REPITA 2×", "AVANCE", "VIRE À ESQUERDA", "AVANCE", "FIM"],
  },
  {
    start: { coordinate: "A6", direction: "sul" },
    stops: ["A4", "C4", "C2", "E2"],
    finish: "F1",
    obstacles: ["B5", "B3", "D3", "F3"],
    commands: ["INÍCIO", "REPITA 2×", "AVANCE", "VIRE À ESQUERDA", "REPITA 2×", "AVANCE", "VIRE À DIREITA", "REPITA 2×", "AVANCE", "VIRE À ESQUERDA", "REPITA 2×", "AVANCE", "VIRE À DIREITA", "AVANCE", "VIRE À ESQUERDA", "AVANCE", "FIM"],
  },
  {
    start: { coordinate: "C6", direction: "sul" },
    stops: ["C4", "A4", "A2", "E2"],
    finish: "F1",
    obstacles: ["B5", "B3", "C3", "D3", "E4"],
    commands: ["INÍCIO", "REPITA 2×", "AVANCE", "VIRE À DIREITA", "REPITA 2×", "AVANCE", "VIRE À ESQUERDA", "REPITA 2×", "AVANCE", "VIRE À ESQUERDA", "REPITA 2×", "AVANCE", "REPITA 2×", "AVANCE", "VIRE À DIREITA", "AVANCE", "VIRE À ESQUERDA", "AVANCE", "FIM"],
  },
];

const SUBJECT_COLORS: Record<BoardSubject, string> = {
  "Língua Portuguesa": "coral",
  Matemática: "cyan",
  História: "amber",
  Geografia: "green",
  Ciências: "purple",
  "Língua Inglesa": "cyan",
  Arte: "coral",
  "Educação Física": "green",
  Interdisciplinar: "amber",
};

export function boardSubjectColor(subject: BoardSubject) {
  return SUBJECT_COLORS[subject];
}

function buildActivity(seed: ActivitySeed, index: number): BoardAcrossCurriculumActivity {
  const route = ROUTES[index % ROUTES.length];
  const stages = seed.stages.map((stage, stageIndex): CurriculumStage => ({
    coordinate: route.stops[stageIndex],
    title: stage[0],
    cardFront: stage[1],
    question: stage[2],
    expectedAnswer: stage[3],
    teacherExplanation: stage[4],
    nextClue: stageIndex < 3
      ? `Depois da resposta correta, entregue a pista: “Siga até ${route.stops[stageIndex + 1]}”.`
      : `Depois da resposta correta, entregue a pista final: “Siga até ${route.finish} e conclua a missão”.`,
  }));
  const first = stages[0];
  const last = stages[3];
  return {
    id: seed.id,
    subject: seed.subject,
    title: seed.title,
    summary: seed.summary,
    gradeBands: seed.gradeBands,
    duration: seed.difficulty === "Avançada" ? 100 : 50,
    difficulty: seed.difficulty,
    curriculumTopic: seed.topic,
    objective: seed.objective,
    computationalThinking: [
      "Decomposição: separar a missão nas quatro paradas obrigatórias.",
      "Algoritmo: ordenar comandos e conteúdos antes de mover o robô.",
      "Abstração: selecionar somente as informações necessárias para decidir o próximo destino.",
      "Depuração: localizar a primeira resposta ou instrução incorreta e corrigi-la sem recomeçar tudo.",
    ],
    priorKnowledge: seed.prior,
    priorKnowledgeTeaching: seed.prior.map((item, priorIndex) =>
      priorIndex === 0
        ? `Antes do tabuleiro, explique “${item}” com um exemplo no quadro e peça dois exemplos produzidos pela turma. Só avance quando os alunos conseguirem justificar a resposta.`
        : `Retome “${item}” mostrando um exemplo correto e um exemplo incorreto. Peça que os alunos apontem a diferença com suas próprias palavras.`,
    ),
    mission: seed.mission,
    finalProduct: seed.finalProduct,
    finalQuestion: seed.finalQuestion,
    finalAnswer: seed.finalAnswer,
    evidenceOfLearning: seed.evidence,
    classOrganization: "Forme grupos de 4. Distribua os papéis de programador, executor, leitor das cartas e verificador. Troque os papéis depois da segunda parada para que ninguém fique apenas observando.",
    start: route.start,
    finish: route.finish,
    obstacles: route.obstacles.map((coordinate, obstacleIndex) => ({
      coordinate,
      label: obstacleIndex % 2 === 0 ? "Caminho bloqueado" : "Resposta intrusa",
      reason: obstacleIndex % 2 === 0
        ? "Esta casa não pode ser atravessada. O grupo precisa planejar uma rota que respeite a restrição."
        : "Esta casa apresenta uma alternativa plausível, mas incompatível com a ordem do conteúdo.",
    })),
    stages,
    commands: route.commands,
    materials: [
      "1 tabuleiro Antes do Robô 6×6 por grupo.",
      "1 robô ou peão com a frente claramente marcada.",
      "Peças INÍCIO, FIM, AVANCE, VIRE À DIREITA, VIRE À ESQUERDA, REPITA 2× e REPITA 3×.",
      `1 carta de missão: “${seed.mission}”`,
      `4 cartas de conteúdo: ${stages.map((item) => `“${item.title}”`).join(", ")}.`,
      `1 carta de resultado final: “${seed.finalProduct}”`,
      `${route.obstacles.length} marcadores de obstáculo ou resposta intrusa.`,
      "1 folha de registro e 1 lápis por grupo.",
    ],
    preparation: [
      `Imprima ou copie a carta de missão e as quatro cartas de conteúdo. Não escreva as respostas esperadas no lado que ficará visível aos alunos.`,
      `Oriente o tabuleiro com A–F da esquerda para a direita e 1–6 de baixo para cima. Marque ${route.start.coordinate} como INÍCIO e ${route.finish} como RESULTADO FINAL.`,
      `Coloque as cartas, nesta ordem de progressão: ${stages.map((item) => `${item.coordinate} — ${item.title}`).join("; ")}.`,
      `Posicione obstáculos em ${route.obstacles.join(", ")}. Confira se nenhuma carta importante ficou coberta e se a rota de referência permanece livre.`,
      `Coloque o robô em ${route.start.coordinate}, olhando para o ${route.start.direction}. Esta direção precisa ser anunciada; sem ela, virar à direita ou à esquerda fica ambíguo.`,
      "Separe as peças de comando fora do tabuleiro. Os alunos devem montar toda a primeira tentativa antes de tocar no robô.",
      `Mantenha esta folha do professor aberta nas respostas. A primeira pergunta esperada é “${first.question}” e a última é “${last.question}”.`,
    ],
    teacherOpening: `Leia sem completar: “${seed.mission} Vocês só podem mover o robô depois de montar uma sequência. Em cada parada haverá uma pergunta de ${seed.subject}. Uma resposta correta libera a pista seguinte. Se o robô bater numa casa bloqueada ou visitar as cartas fora da ordem, vamos encontrar o primeiro erro e corrigir somente essa parte.”`,
    lessonFlow: [
      { minutes: "0–5", title: "Apresentar a missão", teacherAction: "Leia a carta de missão, mostre o resultado final e confirme a orientação do tabuleiro. Não mostre o caminho correto.", studentAction: "Recontar a missão com suas palavras e apontar início, destino e obstáculos.", checkpoint: "O grupo sabe o que precisa produzir, não apenas onde precisa chegar." },
      { minutes: "5–12", title: "Ativar o conteúdo", teacherAction: `Retome ${seed.prior.join(" e ")} usando um exemplo correto e um incorreto.`, studentAction: "Comparar os exemplos e explicar a regra que será necessária na primeira parada.", checkpoint: `Os alunos conseguem responder oralmente a uma pergunta parecida com “${first.question}”.` },
      { minutes: "12–20", title: "Planejar antes de executar", teacherAction: "Entregue as peças de comando e exija que o grupo aponte cada trecho do percurso antes de movimentar o peão.", studentAction: "Dividir a rota em trechos, montar os comandos e prever onde o robô deve parar.", checkpoint: "A sequência possui INÍCIO e FIM e diferencia virar de avançar." },
      { minutes: "20–35", title: "Executar e resolver", teacherAction: "Libere uma pista por vez. Em cada parada, peça resposta, justificativa e registro antes de entregar a próxima coordenada.", studentAction: "Executar literalmente, responder às quatro cartas e registrar as evidências recolhidas.", checkpoint: "As cartas foram visitadas na ordem e cada resposta tem justificativa curricular." },
      { minutes: "35–43", title: "Depurar", teacherAction: "Se houver erro, volte ao último ponto comprovadamente correto e compare a partir dali, sem desmontar toda a sequência.", studentAction: "Nomear se o erro foi de conteúdo, direção, quantidade de avanços ou ordem das etapas; alterar apenas o necessário.", checkpoint: "O grupo consegue explicar o erro e a correção, não apenas mostrar uma nova sequência." },
      { minutes: "43–50", title: "Concluir e relacionar", teacherAction: `Faça a pergunta final: “${seed.finalQuestion}” e peça que dois grupos comparem caminhos e respostas.`, studentAction: `Produzir ${seed.finalProduct} e responder à pergunta final.`, checkpoint: seed.evidence },
    ],
    mediatingQuestions: [
      { question: first.question, expectedAnswer: first.expectedAnswer, whyAsk: "Confirma o conceito inicial que sustenta todas as etapas seguintes." },
      { question: stages[1].question, expectedAnswer: stages[1].expectedAnswer, whyAsk: "Obriga o grupo a conectar a segunda informação à primeira, em vez de apenas colecionar cartas." },
      { question: stages[2].question, expectedAnswer: stages[2].expectedAnswer, whyAsk: "Verifica se os alunos compreendem a regra e não estão seguindo o colega por imitação." },
      { question: last.question, expectedAnswer: last.expectedAnswer, whyAsk: "Prepara a síntese necessária para abrir a etapa final." },
      { question: seed.finalQuestion, expectedAnswer: seed.finalAnswer, whyAsk: "Mostra se a sequência produziu aprendizagem curricular, e não apenas movimentação no tabuleiro." },
      { question: "Em qual ponto um erro mudaria todo o resultado seguinte?", expectedAnswer: "Na primeira resposta ou comando incorreto; tudo que depende dele precisa ser conferido a partir desse ponto.", whyAsk: "Explicita a relação entre dependência, algoritmo e depuração." },
    ],
    commonErrors: [
      { symptom: "O grupo chega a uma carta correta, mas fora da ordem.", probableCause: "Planejou apenas a distância e ignorou a dependência entre os conteúdos.", intervention: `Peça que leiam missão e títulos das cartas. Pergunte qual informação precisa existir antes de “${stages[1].title}”. Reposicione o robô no último estágio correto.` },
      { symptom: "O robô vira e anda ao mesmo tempo.", probableCause: "Os alunos entendem VIRE como deslocamento diagonal.", intervention: "Faça o executor girar o peão sem sair da casa e diga: virar muda a direção; somente AVANCE muda a coordenada." },
      { symptom: "A resposta está correta, mas o grupo não consegue justificá-la.", probableCause: "A escolha foi feita por sorte, leitura de pista ou repetição do colega.", intervention: "Não entregue a próxima pista. Mostre uma alternativa errada e peça que expliquem por que ela não atende ao conceito." },
      { symptom: "A sequência atravessa um obstáculo.", probableCause: "Os comandos foram montados sem simulação mental por trechos.", intervention: "Use o dedo como robô e execute somente até a casa anterior ao obstáculo. O grupo deve substituir o menor trecho possível." },
      { symptom: "O resultado final não combina com as quatro respostas.", probableCause: "Alguma evidência foi copiada incorretamente ou não foi relacionada às demais.", intervention: `Disponha as respostas na ordem e compare uma por uma com o modelo: ${stages.map((item) => item.expectedAnswer).join(" → ")}.` },
    ],
    assessment: [
      `O grupo percorre ${stages.map((item) => item.coordinate).join(" → ")} e chega a ${route.finish} sem atravessar obstáculos.`,
      "O aluno consegue explicar por que cada carta vem antes da seguinte usando o conteúdo da disciplina.",
      "O grupo registra as quatro respostas esperadas e produz o resultado final solicitado.",
      "Durante um erro, os alunos identificam se o problema é conceitual ou de movimento e corrigem apenas o trecho necessário.",
      seed.evidence,
    ],
    adaptations: {
      easier: [
        "Retire os obstáculos e deixe uma seta discreta apontando a direção da próxima carta.",
        "Entregue os comandos de cada trecho em pequenos montes; o grupo precisa ordenar apenas um trecho por vez.",
        `Transforme as perguntas em escolha entre duas alternativas, mantendo “${first.expectedAnswer}” como resposta correta da primeira etapa.`,
      ],
      harder: [
        "Retire as coordenadas das pistas e descreva o destino por posição relativa: duas casas ao norte, uma a oeste.",
        "Peça dois algoritmos válidos e compare quantidade de peças, clareza e possibilidade de usar REPITA.",
        `Inclua uma quinta carta intrusa com uma resposta plausível e exija uma justificativa para descartá-la.`,
      ],
      inclusion: [
        "Use letras ampliadas, alto contraste e símbolos junto aos textos das cartas.",
        "Permita que um aluno indique a resposta apontando ou organizando imagens, enquanto outro registra por escrito.",
        "Para dificuldade motora, mantenha o aluno no papel de programador ou verificador e peça que um colega mova o peão sob suas instruções.",
      ],
    },
    closure: `Feche dizendo: “Hoje o tabuleiro não serviu apenas para levar um robô de ${route.start.coordinate} até ${route.finish}. A ordem dos comandos representou a ordem necessária para compreender ${seed.topic.toLowerCase()}. Quando encontramos um erro, voltamos ao primeiro ponto que não fazia sentido, investigamos e corrigimos. É assim que o pensamento computacional ajuda a aprender ${seed.subject}.”`,
  };
}

const SEEDS: ActivitySeed[] = [
  {
    id: "portugues-misterio-da-frase-perdida", subject: "Língua Portuguesa", title: "O mistério da frase perdida",
    summary: "A turma recupera quatro fragmentos e descobre que uma frase compreensível depende de sujeito, ação, complemento e circunstância em uma ordem coerente.",
    gradeBands: ["2º", "3º", "4º"], difficulty: "Inicial", topic: "Estrutura e organização da frase",
    objective: "Reconhecer as partes que tornam uma frase completa e organizá-las para comunicar uma ideia sem ambiguidade.",
    prior: ["frase completa", "quem realiza a ação e o que acontece"],
    mission: "Uma mensagem foi desmontada. Visitem os quatro fragmentos na ordem que permite reconstruir a frase e abrir o baú da biblioteca.",
    finalProduct: "a frase completa escrita e ilustrada na folha do grupo",
    finalQuestion: "Qual ordem transforma os quatro fragmentos em uma mensagem compreensível?",
    finalAnswer: "O menino encontrou um mapa na biblioteca.",
    evidence: "O aluno lê “O menino encontrou um mapa na biblioteca” e explica a função de cada fragmento.",
    stages: [
      ["Quem?", "O MENINO", "Quem realiza a ação na frase?", "O menino.", "O sujeito informa de quem ou do que se fala."],
      ["Fez o quê?", "ENCONTROU", "Qual palavra apresenta a ação?", "Encontrou.", "O verbo organiza o que aconteceu e orienta os complementos."],
      ["Encontrou o quê?", "UM MAPA", "O que completa o sentido de “encontrou”?", "Um mapa.", "O complemento responde o que foi encontrado."],
      ["Onde?", "NA BIBLIOTECA", "Qual fragmento informa o lugar?", "Na biblioteca.", "A expressão acrescenta a circunstância de lugar."],
    ],
  },
  {
    id: "portugues-trilha-da-narrativa", subject: "Língua Portuguesa", title: "Trilha da narrativa: do personagem ao desfecho",
    summary: "Cada parada libera uma parte da história; fora da ordem, o problema aparece antes do personagem ou a solução surge sem conflito.",
    gradeBands: ["3º", "4º", "5º"], difficulty: "Inicial", topic: "Elementos e sequência narrativa",
    objective: "Produzir uma narrativa curta com situação inicial, conflito, tentativa de solução e desfecho articulados.",
    prior: ["personagem e cenário", "início, problema e final"],
    mission: "A história da ponte desaparecida ficou embaralhada. Recolham as quatro partes na ordem narrativa e contem o que realmente aconteceu.",
    finalProduct: "uma narrativa oral e um parágrafo com começo, conflito, ação e desfecho",
    finalQuestion: "Por que a tentativa precisa aparecer depois do problema e antes do desfecho?",
    finalAnswer: "Porque a tentativa responde ao conflito e produz a mudança que permite concluir a história.",
    evidence: "O grupo conta a história sem saltos e usa conectivos para mostrar a passagem entre as etapas.",
    stages: [
      ["Situação inicial", "LIA MORAVA PERTO DO RIO", "Quem é a personagem e onde ela está?", "Lia, perto do rio.", "A situação inicial apresenta quem participa e o cenário."],
      ["Conflito", "A CHUVA LEVOU A PONTE", "Qual fato quebra a rotina da personagem?", "A chuva levou a ponte.", "O conflito cria o problema que movimenta a narrativa."],
      ["Tentativa", "LIA PEDIU AJUDA À COMUNIDADE", "O que a personagem faz diante do problema?", "Pede ajuda à comunidade.", "A ação precisa responder ao conflito apresentado."],
      ["Desfecho", "TODOS CONSTRUÍRAM UMA PASSAGEM SEGURA", "Como o problema é resolvido?", "A comunidade constrói uma passagem segura.", "O desfecho mostra a consequência das ações."],
    ],
  },
  {
    id: "portugues-resgate-da-pontuacao", subject: "Língua Portuguesa", title: "Resgate da pontuação",
    summary: "O robô percorre uma mensagem sem sinais e recolhe as marcas que transformam pergunta, surpresa, enumeração e encerramento em sentidos diferentes.",
    gradeBands: ["3º", "4º", "5º"], difficulty: "Intermediária", topic: "Pontuação e efeitos de sentido",
    objective: "Escolher sinais de pontuação de acordo com a intenção comunicativa e justificar a mudança de sentido.",
    prior: ["frase declarativa e interrogativa", "ponto-final, interrogação, exclamação e vírgula"],
    mission: "O jornal da escola perdeu todos os sinais. Encontrem o sinal adequado para cada trecho antes que as notícias sejam publicadas com outro sentido.",
    finalProduct: "as quatro frases pontuadas e lidas com entonação coerente",
    finalQuestion: "Como a pontuação altera a leitura mesmo quando as palavras permanecem iguais?",
    finalAnswer: "Ela indica pausa, encerramento e intenção, como perguntar, afirmar ou demonstrar emoção.",
    evidence: "O aluno escolhe o sinal e lê cada frase com a entonação correspondente.",
    stages: [
      ["Pergunta", "VOCÊ TROUXE O LIVRO", "Qual sinal mostra que alguém está perguntando?", "Ponto de interrogação: Você trouxe o livro?", "A interrogação transforma a afirmação em pergunta."],
      ["Surpresa", "QUE DESCOBERTA INCRÍVEL", "Qual sinal destaca admiração?", "Ponto de exclamação: Que descoberta incrível!", "A exclamação marca emoção ou intensidade."],
      ["Enumeração", "LEVAMOS PAPEL TINTA PINCÉIS", "Onde entram as pausas entre os itens?", "Levamos papel, tinta, pincéis.", "A vírgula separa elementos de uma enumeração."],
      ["Encerramento", "A EXPOSIÇÃO COMEÇA AMANHÃ", "Como indicar que a informação terminou?", "Com ponto-final.", "O ponto-final encerra uma declaração completa."],
    ],
  },
  {
    id: "portugues-fabrica-de-palavras", subject: "Língua Portuguesa", title: "Fábrica de palavras por sílabas",
    summary: "Os alunos coletam sílabas compatíveis, evitam intrusas e montam uma palavra que só funciona quando todas as partes aparecem na sequência adequada.",
    gradeBands: ["2º", "3º"], difficulty: "Inicial", topic: "Consciência silábica e formação de palavras",
    objective: "Segmentar e combinar sílabas para formar palavras, conferindo escrita e sonoridade.",
    prior: ["separação oral em sílabas", "leitura de sílabas simples"],
    mission: "A máquina de palavras precisa fabricar “computador”. Recolham somente as sílabas certas e montem a palavra antes de chegar à saída.",
    finalProduct: "a palavra COMPUTADOR montada com cartões e separada em sílabas",
    finalQuestion: "Quais sílabas formam a palavra e em que ordem devem aparecer?",
    finalAnswer: "COM – PU – TA – DOR, nessa ordem, formando quatro sílabas.",
    evidence: "O aluno lê a palavra, bate quatro palmas e relaciona uma palma a cada sílaba.",
    stages: [
      ["Primeira sílaba", "COM", "Qual som inicia “computador”?", "COM.", "A primeira sílaba determina o início sonoro e escrito."],
      ["Segunda sílaba", "PU", "Qual sílaba vem depois de COM?", "PU.", "A leitura parcial COM-PU ajuda a prever a continuação."],
      ["Terceira sílaba", "TA", "Qual parte completa COM-PU-...?", "TA.", "A segmentação permite conferir cada pedaço da palavra."],
      ["Última sílaba", "DOR", "Qual sílaba encerra a palavra?", "DOR.", "A última sílaba fecha a palavra sem deixar som faltando."],
    ],
  },
  {
    id: "portugues-maquina-do-tempo-verbal", subject: "Língua Portuguesa", title: "Máquina do tempo verbal",
    summary: "O robô visita passado, presente e futuro para reconstruir uma rotina e descobrir como os verbos localizam acontecimentos no tempo.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Intermediária", topic: "Tempos verbais",
    objective: "Identificar marcas de passado, presente e futuro e adequar a forma verbal ao marcador temporal.",
    prior: ["verbo como palavra de ação ou estado", "marcadores ontem, hoje e amanhã"],
    mission: "A máquina do tempo misturou o diário de Ana. Ajustem cada verbo ao marcador temporal e restaurem a sequência dos acontecimentos.",
    finalProduct: "três frases no passado, presente e futuro mais uma explicação da mudança verbal",
    finalQuestion: "Que elementos mostram quando cada ação aconteceu?",
    finalAnswer: "Os marcadores ontem, hoje e amanhã e as formas verbais estudou, estuda e estudará.",
    evidence: "O aluno reescreve uma mesma ação nos três tempos sem trocar o sujeito.",
    stages: [
      ["Ontem", "ANA ESTUDOU", "Qual forma verbal combina com uma ação já concluída?", "Estudou.", "O pretérito situa a ação antes do momento da fala."],
      ["Hoje", "ANA ESTUDA", "Como fica o verbo para uma ação atual ou habitual?", "Estuda.", "O presente relaciona a ação ao agora ou à rotina."],
      ["Amanhã", "ANA ESTUDARÁ", "Qual forma indica uma ação que ainda acontecerá?", "Estudará.", "O futuro projeta a ação para depois do momento da fala."],
      ["Conferência", "ONTEM / HOJE / AMANHÃ", "Os verbos e marcadores estão combinando?", "Sim: estudou, estuda e estudará.", "Conferir a concordância temporal evita contradições."],
    ],
  },
  {
    id: "portugues-carteiro-dos-generos", subject: "Língua Portuguesa", title: "O carteiro dos gêneros textuais",
    summary: "Cada destinatário precisa receber um texto com finalidade e estrutura adequadas; o caminho errado entrega receita onde deveria haver convite.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Intermediária", topic: "Gêneros textuais e finalidade comunicativa",
    objective: "Relacionar gênero, finalidade, público e elementos de composição.",
    prior: ["finalidade de um texto", "características de convite, notícia, receita e bilhete"],
    mission: "A bolsa do carteiro foi trocada. Identifiquem a finalidade de cada texto e façam as quatro entregas corretas.",
    finalProduct: "um quadro relacionando gênero, destinatário, finalidade e característica",
    finalQuestion: "Por que não basta olhar apenas para o tamanho do texto para identificar seu gênero?",
    finalAnswer: "Porque o gênero depende principalmente da finalidade, do público, da situação de uso e de sua organização.",
    evidence: "O grupo identifica os quatro gêneros por características concretas, não apenas pelo título.",
    stages: [
      ["Convite", "DATA · HORÁRIO · LOCAL", "Que gênero chama alguém para um evento?", "Convite.", "Data, horário, local e chamado ao público orientam a participação."],
      ["Receita", "INGREDIENTES · MODO DE FAZER", "Que gênero ensina a preparar algo em etapas?", "Receita.", "Lista e sequência de ações caracterizam a instrução culinária."],
      ["Notícia", "TÍTULO · FATO · QUANDO · ONDE", "Que gênero informa um acontecimento verificável?", "Notícia.", "A notícia apresenta fato, contexto e informações básicas."],
      ["Bilhete", "RECADO CURTO · DESTINATÁRIO", "Que gênero comunica um recado direto e breve?", "Bilhete.", "O bilhete é situado, curto e dirigido a alguém."],
    ],
  },
  {
    id: "portugues-detetives-da-inferencia", subject: "Língua Portuguesa", title: "Detetives da inferência",
    summary: "A solução não está escrita numa única carta: os alunos combinam quatro pistas para concluir quem entrou na sala e o que procurava.",
    gradeBands: ["5º", "6º", "7º"], difficulty: "Avançada", topic: "Inferência e leitura de pistas",
    objective: "Produzir uma conclusão apoiada em evidências explícitas e distinguir inferência de adivinhação.",
    prior: ["informação explícita", "pista e conclusão"],
    mission: "Um objeto desapareceu da sala de leitura. Recolham as pistas na ordem e construam uma conclusão que possa ser provada pelo texto.",
    finalProduct: "um parágrafo de conclusão citando ao menos três evidências",
    finalQuestion: "Qual conclusão é sustentada pelas quatro pistas e quais evidências a comprovam?",
    finalAnswer: "Uma pessoa entrou para procurar um livro durante a chuva; a conclusão deve citar pegadas molhadas, estante aberta, marcador caído e ausência de sinais de arrombamento.",
    evidence: "O aluno usa “concluímos isso porque...” e cita evidências, sem inventar informação ausente.",
    stages: [
      ["Pista do chão", "PEGADAS MOLHADAS", "O que as pegadas permitem concluir com segurança?", "Alguém entrou com os calçados molhados.", "A pista indica entrada recente em condição de chuva, mas não identifica a pessoa."],
      ["Pista da estante", "ESTANTE ABERTA", "Que ação provavelmente ocorreu perto da estante?", "Alguém procurou ou retirou um livro.", "A inferência deve permanecer compatível com o que é observável."],
      ["Pista do objeto", "MARCADOR CAÍDO", "Como o marcador se relaciona à busca?", "Pode ter caído durante o manuseio de um livro.", "A palavra “pode” evita transformar hipótese em certeza."],
      ["Pista da porta", "SEM SINAIS DE ARROMBAMENTO", "O que não podemos afirmar?", "Não podemos afirmar que houve invasão forçada.", "Uma boa inferência também reconhece limites da evidência."],
    ],
  },
  {
    id: "portugues-oficina-de-revisao", subject: "Língua Portuguesa", title: "Oficina de revisão: salve o cartaz",
    summary: "Os alunos revisam um cartaz em quatro camadas — sentido, ortografia, pontuação e clareza — para perceber que revisar não é apenas procurar acentos.",
    gradeBands: ["5º", "6º", "7º"], difficulty: "Avançada", topic: "Revisão e reescrita textual",
    objective: "Aplicar critérios de revisão em ordem, preservando a intenção e melhorando correção e clareza.",
    prior: ["finalidade e público do texto", "ortografia e pontuação básicas"],
    mission: "O cartaz da feira está confuso e será impresso hoje. Percorram as quatro mesas de revisão e entreguem uma versão pronta para o público.",
    finalProduct: "o cartaz reescrito, com as alterações marcadas e justificadas",
    finalQuestion: "Por que verificar o sentido antes de corrigir detalhes de escrita?",
    finalAnswer: "Porque um texto pode estar ortograficamente correto e ainda não cumprir sua finalidade ou ser compreensível para o público.",
    evidence: "O grupo justifica ao menos uma alteração de conteúdo e uma de forma.",
    stages: [
      ["Sentido", "O LEITOR ENTENDE O EVENTO?", "O cartaz informa o que acontecerá?", "Precisa apresentar a feira de ciências.", "A revisão começa pela mensagem e pela finalidade."],
      ["Informações", "DATA · HORÁRIO · LOCAL", "Quais dados indispensáveis estão faltando?", "Data, horário e local.", "Informação ausente não é resolvida apenas corrigindo palavras."],
      ["Escrita", "ORTOGRAFIA E PONTUAÇÃO", "Quais palavras e sinais precisam ser corrigidos?", "As ocorrências destacadas no texto-modelo do professor.", "A correção formal vem depois de confirmar o conteúdo."],
      ["Clareza", "LEIA COMO SE FOSSE O VISITANTE", "O texto permite saber o que fazer e onde ir?", "Sim, após reorganizar título, informações e convite.", "A leitura pelo ponto de vista do público encerra a revisão."],
    ],
  },
  {
    id: "matematica-missao-numero-24", subject: "Matemática", title: "A missão do número 24",
    summary: "O resultado de cada operação vira a entrada da próxima, fazendo a turma experimentar uma cadeia de cálculo em que um erro inicial altera tudo.",
    gradeBands: ["3º", "4º", "5º"], difficulty: "Inicial", topic: "Operações e cálculo encadeado",
    objective: "Resolver operações em sequência, registrar resultados intermediários e verificar a origem de um erro.",
    prior: ["adição e multiplicação", "resultado intermediário"],
    mission: "O cofre abre com 24. Comecem com 2 e executem as quatro operações na ordem das estações.",
    finalProduct: "a cadeia 2 → 6 → 10 → 20 → 24 registrada na folha",
    finalQuestion: "Qual sequência transforma 2 em 24?",
    finalAnswer: "Multiplicar por 3, somar 4, multiplicar por 2 e somar 4.",
    evidence: "O aluno encontra e corrige a primeira operação incorreta sem recalcular às cegas.",
    stages: [
      ["Operação 1", "COMECE COM 2 · ×3", "Quanto é 2 × 3?", "6.", "O resultado 6 será a entrada da próxima operação."],
      ["Operação 2", "RESULTADO ANTERIOR · +4", "Quanto é 6 + 4?", "10.", "Registrar 10 evita perder o estado atual do cálculo."],
      ["Operação 3", "RESULTADO ANTERIOR · ×2", "Quanto é 10 × 2?", "20.", "A multiplicação dobra o valor intermediário."],
      ["Operação 4", "RESULTADO ANTERIOR · +4", "Quanto é 20 + 4?", "24.", "O último resultado deve coincidir com a senha do cofre."],
    ],
  },
  {
    id: "matematica-tesouro-das-fracoes", subject: "Matemática", title: "O tesouro das frações equivalentes",
    summary: "O caminho só continua quando o grupo encontra representações diferentes da mesma quantidade e descarta frações visualmente parecidas, mas não equivalentes.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Intermediária", topic: "Frações equivalentes",
    objective: "Relacionar fração, representação visual e equivalência por ampliação ou simplificação.",
    prior: ["numerador e denominador", "parte de um todo dividido igualmente"],
    mission: "A chave do tesouro representa metade. Encontrem quatro maneiras equivalentes de mostrar a mesma quantidade.",
    finalProduct: "uma faixa com 1/2 = 2/4 = 3/6 = 18/36 e desenhos correspondentes",
    finalQuestion: "Por que as quatro frações representam a mesma quantidade?",
    finalAnswer: "Porque numerador e denominador foram multiplicados pelo mesmo número e as partes pintadas ocupam metade do todo.",
    evidence: "O aluno prova a equivalência com desenho e relação numérica.",
    stages: [
      ["Metade", "1/2", "Que parte do inteiro está representada?", "Uma de duas partes iguais.", "A referência inicial é metade do todo."],
      ["Quartos", "2/4", "Dois quartos ocupam quanto do inteiro?", "Metade, equivalente a 1/2.", "Dobrar numerador e denominador preserva a proporção."],
      ["Sextos", "3/6", "Três de seis partes equivalem a qual fração inicial?", "1/2.", "Três é metade de seis."],
      ["Tabuleiro", "18/36", "Quantas casas são metade das 36 casas?", "18 casas.", "A própria grade 6×6 materializa a fração."],
    ],
  },
  {
    id: "matematica-fabrica-da-tabuada", subject: "Matemática", title: "Fábrica da tabuada do 6",
    summary: "Em vez de recitar produtos isolados, os alunos percorrem múltiplos em ordem e investigam o padrão de somar seis a cada nova parada.",
    gradeBands: ["3º", "4º"], difficulty: "Inicial", topic: "Multiplicação e regularidades",
    objective: "Compreender multiplicação como adição de parcelas iguais e reconhecer padrões nos múltiplos de 6.",
    prior: ["adição repetida", "dobro e triplo"],
    mission: "A fábrica produz caixas com 6 peças. Calcule a produção acumulada após 1, 2, 3 e 4 caixas para liberar a entrega.",
    finalProduct: "a sequência 6, 12, 18, 24 representada com grupos de seis",
    finalQuestion: "Que padrão permite descobrir o próximo resultado sem recomeçar a contagem?",
    finalAnswer: "Somar 6 ao resultado anterior.",
    evidence: "O aluno explica 4 × 6 como quatro grupos de seis e também como 6 + 6 + 6 + 6.",
    stages: [
      ["Uma caixa", "1 × 6", "Quantas peças há em uma caixa?", "6.", "Uma vez seis estabelece o tamanho de cada grupo."],
      ["Duas caixas", "2 × 6", "Quantas peças há em dois grupos de seis?", "12.", "Dois grupos podem ser calculados como 6 + 6."],
      ["Três caixas", "3 × 6", "Quanto é 12 + mais um grupo de 6?", "18.", "O próximo múltiplo surge ao acrescentar um grupo igual."],
      ["Quatro caixas", "4 × 6", "Quanto é 18 + 6?", "24.", "A regularidade conecta multiplicação e adição repetida."],
    ],
  },
  {
    id: "matematica-resgate-nas-coordenadas", subject: "Matemática", title: "Resgate nas coordenadas",
    summary: "A própria grade vira sistema de localização: cada resposta fornece uma coordenada e os alunos precisam distinguir coluna, linha e deslocamento.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Inicial", topic: "Localização, linhas, colunas e coordenadas",
    objective: "Ler e registrar posições em uma grade usando pares formados por letra e número.",
    prior: ["linhas e colunas", "direita, esquerda, acima e abaixo"],
    mission: "Quatro animais estão perdidos. Localizem cada coordenada na ordem das pistas e levem o robô até o ponto de resgate.",
    finalProduct: "um mapa com as quatro coordenadas e o percurso destacado",
    finalQuestion: "O que significam a letra e o número em uma coordenada como C5?",
    finalAnswer: "A letra identifica a coluna e o número identifica a linha.",
    evidence: "O aluno localiza uma coordenada nova sem percorrer casa por casa.",
    stages: [
      ["Coordenada 1", "COLUNA A · LINHA 3", "Qual coordenada junta coluna A e linha 3?", "A3.", "A leitura sempre combina primeiro a letra e depois o número."],
      ["Coordenada 2", "DUAS COLUNAS À DIREITA", "Saindo de A3, em qual coluna chegamos após duas colunas?", "C3.", "O número permanece porque não houve mudança de linha."],
      ["Coordenada 3", "DUAS LINHAS ACIMA", "Saindo de C3, qual é a nova coordenada?", "C5.", "A letra permanece porque o movimento foi vertical."],
      ["Coordenada 4", "TRÊS COLUNAS À DIREITA", "Saindo de C5, onde chegamos?", "F5.", "O deslocamento horizontal altera somente a coluna."],
    ],
  },
  {
    id: "matematica-arquiteto-do-perimetro", subject: "Matemática", title: "Arquiteto do perímetro",
    summary: "O robô contorna uma construção e cada trecho precisa ser medido para calcular o perímetro sem contar os cantos duas vezes.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Intermediária", topic: "Perímetro e unidades de comprimento",
    objective: "Compreender perímetro como medida do contorno e calcular a soma dos lados de uma figura.",
    prior: ["lado de uma figura", "adição de medidas"],
    mission: "Uma praça precisa receber cerca. Percorram os quatro lados do projeto e calculem quantas unidades de cerca serão necessárias.",
    finalProduct: "o desenho da praça com lados medidos e cálculo do perímetro",
    finalQuestion: "Como calcular o perímetro sem contar a área interna?",
    finalAnswer: "Somando as medidas de todos os lados do contorno.",
    evidence: "O aluno diferencia quantidade de casas internas de comprimento da borda.",
    stages: [
      ["Lado 1", "3 UNIDADES", "Qual é a medida do primeiro lado?", "3 unidades.", "Cada avanço ao longo da borda corresponde a uma unidade."],
      ["Lado 2", "2 UNIDADES", "Qual total acumulado após 3 + 2?", "5 unidades.", "O registro acumulado evita esquecer lados já medidos."],
      ["Lado 3", "3 UNIDADES", "Qual total após acrescentar o lado oposto?", "8 unidades.", "Lados opostos podem ter a mesma medida num retângulo."],
      ["Lado 4", "2 UNIDADES", "Qual é o perímetro completo?", "10 unidades.", "O último lado fecha o contorno e completa a soma."],
    ],
  },
  {
    id: "matematica-codigo-das-sequencias", subject: "Matemática", title: "O código das sequências",
    summary: "As casas apresentam termos de uma sequência e os alunos precisam descobrir a regra antes de prever os próximos valores e escolher o caminho.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Intermediária", topic: "Sequências numéricas e regularidades",
    objective: "Identificar uma regra de formação, prever termos e explicar como cada valor deriva do anterior.",
    prior: ["comparação entre números", "adição e subtração"],
    mission: "Um cadeado aceita quatro números de uma sequência. Descubram a regra e completem o código sem escolher valores apenas por aparência.",
    finalProduct: "a sequência 5, 8, 11, 14, 17, 20 com a regra escrita",
    finalQuestion: "Qual regra gera todos os termos e quais são os dois próximos?",
    finalAnswer: "Somar 3; os próximos termos são 17 e 20.",
    evidence: "O aluno aplica a mesma regra a todos os intervalos e rejeita uma regra que funciona apenas uma vez.",
    stages: [
      ["Primeiro intervalo", "5 → 8", "Quanto foi acrescentado?", "3.", "A diferença sugere uma possível regra."],
      ["Segundo intervalo", "8 → 11", "A diferença continua igual?", "Sim, também é 3.", "A repetição fortalece a hipótese."],
      ["Terceiro intervalo", "11 → 14", "Qual regra serve para todos os pares?", "Somar 3.", "Uma regra válida explica todos os termos conhecidos."],
      ["Previsão", "14 → ? → ?", "Quais são os próximos dois termos?", "17 e 20.", "Prever termos testa se a regra foi compreendida."],
    ],
  },
  {
    id: "matematica-mercado-do-troco", subject: "Matemática", title: "Mercado do troco exato",
    summary: "O grupo compra itens, atualiza o saldo em cada parada e precisa escolher cédulas e moedas que produzam o troco correto.",
    gradeBands: ["3º", "4º", "5º"], difficulty: "Intermediária", topic: "Sistema monetário e cálculo de troco",
    objective: "Resolver situações de compra, subtração e composição de valores monetários.",
    prior: ["reais e centavos", "adição e subtração decimal simples"],
    mission: "A turma recebeu R$ 30,00 para comprar quatro materiais. Registrem cada gasto e descubram o troco final.",
    finalProduct: "uma tabela de compras, saldo após cada parada e composição do troco",
    finalQuestion: "Quanto sobrou e como representar esse valor de duas maneiras?",
    finalAnswer: "Sobrou R$ 7,00; por exemplo, uma nota de R$ 5 e uma de R$ 2, ou sete moedas de R$ 1.",
    evidence: "O aluno atualiza o saldo a cada compra e confere somando compras mais troco.",
    stages: [
      ["Compra 1", "CARTOLINA · R$ 6,00", "Quanto resta de R$ 30,00?", "R$ 24,00.", "O saldo novo vira o valor disponível para a próxima compra."],
      ["Compra 2", "TINTA · R$ 8,00", "Quanto resta de R$ 24,00?", "R$ 16,00.", "Registrar o saldo evita subtrair todos os itens novamente."],
      ["Compra 3", "PINCEL · R$ 5,00", "Qual é o novo saldo?", "R$ 11,00.", "A operação representa a retirada do preço pago."],
      ["Compra 4", "COLA · R$ 4,00", "Quanto deve voltar de troco?", "R$ 7,00.", "Compras mais troco precisam recompor os R$ 30,00 iniciais."],
    ],
  },
  {
    id: "matematica-ponte-das-medidas", subject: "Matemática", title: "A ponte das medidas",
    summary: "Os alunos escolhem a unidade adequada antes de comparar comprimentos; usar centímetro para uma estrada ou metro para um lápis leva a respostas sem sentido.",
    gradeBands: ["3º", "4º", "5º"], difficulty: "Intermediária", topic: "Grandezas e unidades de comprimento",
    objective: "Selecionar unidades adequadas e converter medidas simples entre centímetro e metro.",
    prior: ["centímetro e metro", "comparação de comprimentos"],
    mission: "Uma ponte de maquete precisa de peças nas medidas certas. Escolham unidade, façam a conversão e liberem cada parte da construção.",
    finalProduct: "uma lista de quatro objetos com medida, unidade e justificativa",
    finalQuestion: "Como decidir se uma medida deve ser registrada em centímetros ou metros?",
    finalAnswer: "Considerando o tamanho do objeto e escolhendo uma unidade que torne a medida prática e compreensível.",
    evidence: "O aluno percebe uma medida incompatível e explica o problema de escala.",
    stages: [
      ["Lápis", "18 ?", "Qual unidade é adequada para um lápis de 18?", "Centímetros.", "Objetos pequenos são descritos de modo prático em centímetros."],
      ["Sala", "7 ?", "Qual unidade é adequada para o comprimento de uma sala?", "Metros.", "Usar metros evita números excessivamente grandes."],
      ["Conversão", "2 m = ? cm", "Quantos centímetros há em 2 metros?", "200 centímetros.", "Cada metro corresponde a 100 centímetros."],
      ["Comparação", "150 cm OU 2 m", "Qual comprimento é maior?", "2 m, porque equivale a 200 cm.", "Converter para a mesma unidade permite comparar corretamente."],
    ],
  },
  {
    id: "historia-conserte-a-maquina-do-tempo", subject: "História", title: "Conserte a máquina do tempo",
    summary: "A turma reorganiza acontecimentos do Brasil em ordem cronológica e percebe que datas localizam processos, mas não explicam sozinhas suas causas e consequências.",
    gradeBands: ["5º", "6º", "7º"], difficulty: "Intermediária", topic: "Cronologia e transformações políticas no Brasil",
    objective: "Ordenar acontecimentos históricos e relacionar cada marco às mudanças produzidas no período seguinte.",
    prior: ["antes, durante e depois", "linha do tempo e século"],
    mission: "A máquina do tempo misturou cinco momentos da história do Brasil. Reorganizem os marcos para recuperar a sequência histórica.",
    finalProduct: "uma linha do tempo comentada com data, acontecimento e mudança relacionada",
    finalQuestion: "Qual é a ordem dos acontecimentos e por que uma linha do tempo não substitui a explicação histórica?",
    finalAnswer: "1500, 1808, 1822, 1888 e 1889; a linha organiza o tempo, mas causas, sujeitos e consequências precisam ser investigados.",
    evidence: "O aluno ordena os marcos e acrescenta ao menos uma relação de mudança sem dizer que um evento isolado explica tudo.",
    stages: [
      ["1500", "CHEGADA DOS PORTUGUESES", "Qual marco inicia esta linha do tempo?", "A chegada dos portugueses em 1500.", "O marco deve ser estudado considerando povos indígenas que já viviam no território."],
      ["1808", "CHEGADA DA CORTE PORTUGUESA", "O que mudou com a transferência da Corte?", "O centro do governo português foi transferido e instituições foram criadas no Brasil.", "A mudança ajuda a compreender o contexto anterior à Independência."],
      ["1822", "INDEPENDÊNCIA DO BRASIL", "Qual mudança política é associada a 1822?", "A separação política de Portugal.", "Independência não significou igualdade imediata para toda a população."],
      ["1888–1889", "ABOLIÇÃO · REPÚBLICA", "Qual ocorreu primeiro: Abolição ou República?", "A Abolição em 1888; a República em 1889.", "A proximidade das datas não torna os processos idênticos."],
    ],
  },
  {
    id: "historia-detetives-das-fontes", subject: "História", title: "Detetives das fontes históricas",
    summary: "Os grupos combinam fotografia, carta, objeto e relato oral para responder a uma pergunta sem tratar uma única fonte como verdade completa.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Intermediária", topic: "Fontes históricas e produção do conhecimento",
    objective: "Identificar diferentes tipos de fonte, formular perguntas e comparar evidências.",
    prior: ["vestígio do passado", "diferença entre observar e interpretar"],
    mission: "O museu quer descobrir como era a escola do bairro décadas atrás. Recolham quatro fontes e montem uma explicação baseada em evidências.",
    finalProduct: "um painel com o que cada fonte mostra, o que não mostra e uma conclusão provisória",
    finalQuestion: "Por que precisamos comparar fontes diferentes para investigar o passado?",
    finalAnswer: "Porque cada fonte foi produzida por alguém, em um contexto, e revela apenas parte da experiência histórica.",
    evidence: "O aluno distingue informação observável de interpretação e reconhece limites da fonte.",
    stages: [
      ["Fotografia", "FOTO DA SALA DE 1970", "O que podemos observar diretamente?", "Organização da sala, objetos, roupas e pessoas visíveis.", "A imagem não conta sozinha o que as pessoas pensavam ou sentiam."],
      ["Carta", "CARTA DE UMA PROFESSORA", "Que perspectiva esta carta apresenta?", "A perspectiva de quem escreveu, situada naquele momento.", "Autoria e intenção influenciam o registro."],
      ["Objeto", "CARTEIRA ESCOLAR ANTIGA", "O que o objeto permite investigar?", "Materiais, formato e modos possíveis de uso.", "O objeto é evidência material, mas precisa de contexto."],
      ["Relato oral", "MEMÓRIA DE UMA EX-ALUNA", "Memória é fonte mesmo podendo mudar com o tempo?", "Sim; ela registra experiência e interpretação e deve ser comparada.", "A memória não é descartada por ser subjetiva; é analisada criticamente."],
    ],
  },
  {
    id: "historia-domino-causa-consequencia", subject: "História", title: "Dominó de causas e consequências",
    summary: "Cada parada exige conectar uma condição, uma decisão, uma reação e uma consequência, evitando a explicação simplista de que um processo histórico teve uma única causa.",
    gradeBands: ["6º", "7º", "8º"], difficulty: "Avançada", topic: "Causalidade histórica",
    objective: "Relacionar múltiplas causas, ações de diferentes sujeitos e consequências de um processo histórico.",
    prior: ["causa e consequência", "processo histórico e acontecimento"],
    mission: "O arquivo perdeu as ligações entre acontecimentos. Reconstruam o encadeamento e identifiquem onde existem múltiplas causas ou consequências.",
    finalProduct: "um diagrama com causas, acontecimento, sujeitos e consequências",
    finalQuestion: "Por que é inadequado explicar um processo histórico com uma causa única?",
    finalAnswer: "Porque processos históricos resultam da interação de condições, interesses, decisões e ações de diferentes grupos ao longo do tempo.",
    evidence: "O grupo usa expressões como “contribuiu”, “favoreceu” e “teve entre suas consequências”, evitando causalidade automática.",
    stages: [
      ["Condição", "MUDANÇAS ECONÔMICAS E SOCIAIS", "Uma condição produz o resultado sozinha?", "Não; ela cria contexto e possibilidades.", "Contexto não deve ser confundido com causa única."],
      ["Sujeitos", "GRUPOS COM INTERESSES DIFERENTES", "Quem participa e o que cada grupo busca?", "A resposta deve identificar atores e interesses do conteúdo estudado.", "Pessoas e grupos fazem escolhas dentro de condições históricas."],
      ["Acontecimento", "DECISÃO OU CONFLITO", "Como as ações se relacionam ao acontecimento?", "Elas ajudam a produzir, acelerar, resistir ou transformar o processo.", "Acontecimentos são pontos visíveis de processos mais longos."],
      ["Consequências", "MUDANÇAS E PERMANÊNCIAS", "Tudo muda depois de um acontecimento?", "Não; algumas estruturas mudam e outras permanecem.", "Comparar mudança e permanência evita conclusões totais."],
    ],
  },
  {
    id: "historia-memoria-do-bairro", subject: "História", title: "Mapa da memória do bairro",
    summary: "O tabuleiro representa lugares do bairro e os alunos percorrem testemunhos, fotografias e mudanças para construir uma história local conectada ao presente.",
    gradeBands: ["3º", "4º", "5º"], difficulty: "Inicial", topic: "História local, memória e patrimônio",
    objective: "Reconhecer transformações e permanências no lugar onde se vive a partir de diferentes registros.",
    prior: ["bairro e comunidade", "passado e presente"],
    mission: "A praça antiga será reformada. Antes disso, a comunidade quer registrar como o lugar mudou e por que ele é importante.",
    finalProduct: "um antes-e-depois da praça com legenda e proposta de preservação",
    finalQuestion: "O que mudou, o que permaneceu e por que esse lugar tem valor para a comunidade?",
    finalAnswer: "A resposta deve comparar evidências e relacionar o valor do lugar às experiências e memórias da comunidade.",
    evidence: "O aluno usa uma evidência para apontar mudança e outra para apontar permanência.",
    stages: [
      ["Foto antiga", "PRAÇA HÁ 40 ANOS", "Quais elementos aparecem na imagem antiga?", "Os elementos observáveis na fotografia preparada pelo professor.", "Começar pela observação reduz julgamentos apressados."],
      ["Foto atual", "PRAÇA HOJE", "O que mudou e o que permaneceu?", "Comparação entre construções, vegetação, usos e circulação.", "Mudança e permanência podem coexistir."],
      ["Memória", "RELATO DE UM MORADOR", "Que uso do lugar aparece no relato?", "O uso descrito no testemunho selecionado.", "O relato acrescenta experiência que a fotografia pode não mostrar."],
      ["Patrimônio", "O QUE MERECE SER PRESERVADO?", "Qual elemento deve ser cuidado e por quê?", "Uma escolha justificada por valor histórico, cultural ou afetivo.", "Patrimônio envolve seleção, significado e responsabilidade coletiva."],
    ],
  },
  {
    id: "historia-povos-indigenas-presente", subject: "História", title: "Povos indígenas: passado e presente",
    summary: "A atividade combate a ideia de que povos indígenas pertencem apenas ao passado, conectando diversidade, território, conhecimentos e presença contemporânea.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Intermediária", topic: "Diversidade e contemporaneidade dos povos indígenas",
    objective: "Reconhecer a diversidade dos povos indígenas e sua presença histórica e atual sem generalizações.",
    prior: ["povo, cultura e território", "diferença entre diversidade e estereótipo"],
    mission: "Uma exposição apresenta apenas uma imagem genérica de “índio”. Reorganizem o percurso para mostrar povos, línguas, territórios e ações no presente.",
    finalProduct: "um painel com a frase “povos indígenas” e quatro evidências de diversidade e contemporaneidade",
    finalQuestion: "Por que usar o plural “povos indígenas” e falar também do presente?",
    finalAnswer: "Porque existem muitos povos, línguas, territórios e modos de vida, e suas comunidades continuam atuando na sociedade contemporânea.",
    evidence: "O aluno evita generalizações e cita ao menos duas dimensões da diversidade.",
    stages: [
      ["Diversidade", "MUITOS POVOS", "Existe um único povo indígena?", "Não; existem muitos povos com histórias próprias.", "O plural impede reduzir diferentes comunidades a uma identidade única."],
      ["Línguas", "MUITAS LÍNGUAS", "Todos falam a mesma língua?", "Não; há diversidade linguística.", "Língua é parte importante da história e da identidade."],
      ["Territórios", "RELAÇÕES COM DIFERENTES TERRITÓRIOS", "Todos vivem do mesmo modo e no mesmo ambiente?", "Não; modos de vida se relacionam a contextos diversos.", "Território não é cenário neutro; envolve vida, conhecimento e direitos."],
      ["Presente", "COMUNIDADES ATUAIS", "Povos indígenas existem somente no passado?", "Não; vivem, produzem conhecimento e defendem direitos hoje.", "A contemporaneidade corrige a representação congelada no passado."],
    ],
  },
  {
    id: "historia-rotas-africanas-brasil", subject: "História", title: "Rotas de culturas africanas no Brasil",
    summary: "Os alunos investigam contribuições linguísticas, alimentares, artísticas e tecnológicas sem reduzir a história africana apenas à escravização.",
    gradeBands: ["5º", "6º", "7º"], difficulty: "Intermediária", topic: "Histórias e culturas africanas e afro-brasileiras",
    objective: "Reconhecer diversidade cultural, protagonismo e permanências africanas e afro-brasileiras.",
    prior: ["continente e país", "cultura como produção histórica"],
    mission: "O mapa da exposição apagou as conexões entre África e Brasil. Reúnam quatro campos de contribuição e construam uma apresentação sem estereótipos.",
    finalProduct: "um mapa conceitual com contribuições, exemplos e continuidade no presente",
    finalQuestion: "Como apresentar contribuições africanas sem tratar a África como um país ou uma cultura única?",
    finalAnswer: "Reconhecendo que é um continente diverso, identificando povos e contextos quando possível e mostrando protagonismo histórico.",
    evidence: "O aluno usa “continente africano”, reconhece diversidade e explica uma contribuição com contexto.",
    stages: [
      ["Línguas", "PALAVRAS E FORMAS DE FALAR", "Como línguas africanas participam do português brasileiro?", "Por palavras, expressões, ritmos e formas de uso incorporadas historicamente.", "A língua registra encontros, resistências e transformações."],
      ["Alimentação", "TÉCNICAS E INGREDIENTES", "Por que comida também é fonte histórica?", "Porque preserva conhecimentos, adaptações e relações culturais.", "Práticas alimentares carregam memória e criatividade."],
      ["Arte", "MÚSICA · DANÇA · VISUALIDADES", "Essas expressões ficaram paradas no passado?", "Não; foram recriadas e continuam presentes.", "Cultura é dinâmica, não uma peça congelada."],
      ["Conhecimentos", "TECNOLOGIAS · CUIDADOS · ORGANIZAÇÃO", "Que erro ocorre ao falar apenas de folclore?", "Apagam-se conhecimentos, trabalho, política e protagonismo.", "A abordagem histórica deve incluir múltiplas dimensões sociais."],
    ],
  },
  {
    id: "historia-trilha-dos-direitos", subject: "História", title: "Trilha dos direitos conquistados",
    summary: "A turma percorre reivindicação, mobilização, conquista legal e efetivação, percebendo que um direito escrito ainda precisa existir na prática.",
    gradeBands: ["6º", "7º", "8º", "9º"], difficulty: "Avançada", topic: "Cidadania, participação e direitos",
    objective: "Analisar direitos como construções históricas relacionadas à mobilização social e à efetivação cotidiana.",
    prior: ["direito e dever", "participação social"],
    mission: "Um arquivo apresenta direitos como presentes entregues de uma vez. Reconstruam o processo que liga necessidade, reivindicação, conquista e efetivação.",
    finalProduct: "um fluxograma de conquista de um direito estudado pela turma",
    finalQuestion: "Por que a existência de uma lei não garante automaticamente a realização de um direito?",
    finalAnswer: "Porque são necessárias políticas, recursos, fiscalização, participação social e acesso real para que o direito seja efetivado.",
    evidence: "O grupo diferencia conquista legal de efetivação e identifica sujeitos coletivos envolvidos.",
    stages: [
      ["Necessidade", "PROBLEMA VIVIDO", "Qual desigualdade ou necessidade motivou a reivindicação?", "A situação concreta estudada na sequência didática.", "Direitos respondem a conflitos e necessidades históricas."],
      ["Mobilização", "PESSOAS SE ORGANIZAM", "Quem reivindicou e como se organizou?", "Os grupos e formas de participação estudados.", "A mobilização torna visíveis demandas e pressiona por mudança."],
      ["Conquista", "DIREITO RECONHECIDO", "O que mudou no plano legal ou institucional?", "O direito passou a ser reconhecido em norma ou política.", "O reconhecimento é uma etapa, não o fim do processo."],
      ["Efetivação", "DIREITO NA PRÁTICA", "O que ainda é necessário?", "Acesso, recursos, fiscalização e continuidade.", "A distância entre norma e realidade precisa ser investigada."],
    ],
  },
  {
    id: "geografia-entrega-na-comunidade", subject: "Geografia", title: "Entrega na comunidade isolada",
    summary: "O mapa possui rio, ponte, montanhas e pontos de serviço; a rota só funciona quando os estudantes leem legenda, orientação e restrições do território.",
    gradeBands: ["3º", "4º", "5º"], difficulty: "Inicial", topic: "Representação espacial, legenda e orientação",
    objective: "Interpretar símbolos de um mapa e planejar um deslocamento usando pontos cardeais e coordenadas.",
    prior: ["mapa e legenda", "norte, sul, leste e oeste"],
    mission: "Levem medicamentos do ponto de apoio até uma comunidade, atravessem o rio somente pela ponte e evitem as áreas de montanha.",
    finalProduct: "um mapa legendado com a rota segura e uma justificativa",
    finalQuestion: "Por que o caminho visualmente mais curto pode não ser o caminho possível?",
    finalAnswer: "Porque o território possui obstáculos, vias e pontos de passagem que restringem o deslocamento.",
    evidence: "O aluno usa legenda e direção para justificar cada trecho da rota.",
    stages: [
      ["Ponto de apoio", "RETIRE OS MEDICAMENTOS", "O que precisa ser coletado antes da entrega?", "Os medicamentos.", "Chegar ao destino sem o recurso necessário não cumpre a missão."],
      ["Ponte", "ÚNICA TRAVESSIA DO RIO", "Por que atravessar nesta coordenada?", "Porque a legenda indica a ponte como passagem segura.", "Símbolos do mapa orientam decisões reais de rota."],
      ["Orientação", "CONFIRA O NORTE", "Qual direção leva à comunidade neste trecho?", "Norte, conforme a orientação do mapa da atividade.", "Pontos cardeais tornam a descrição independente do ponto de vista do observador."],
      ["Comunidade", "ENTREGUE E REGISTRE A ROTA", "Quais elementos do território alteraram o caminho?", "Rio, ponte e montanhas.", "A rota resulta da relação entre objetivo e características do espaço."],
    ],
  },
  {
    id: "geografia-expedicao-regioes-brasil", subject: "Geografia", title: "Expedição pelas regiões do Brasil",
    summary: "Os alunos seguem pistas de localização e características sem transformar cada região em uma única paisagem ou estereótipo.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Intermediária", topic: "Regiões brasileiras e diversidade territorial",
    objective: "Localizar regiões do Brasil e relacionar paisagens, atividades e diversidade interna.",
    prior: ["mapa do Brasil", "região e estado"],
    mission: "Uma expedição precisa visitar Norte, Nordeste, Centro-Oeste e Sul antes de entregar o relatório no Sudeste.",
    finalProduct: "um mapa do Brasil com as cinco regiões e uma característica não estereotipada de cada",
    finalQuestion: "Por que uma característica não consegue representar toda uma região?",
    finalAnswer: "Porque cada região reúne muitos estados, paisagens, cidades, populações e atividades diferentes.",
    evidence: "O aluno localiza as regiões e usa exemplos acompanhados da expressão “em parte da região” quando necessário.",
    stages: [
      ["Norte", "MAIOR EXTENSÃO TERRITORIAL", "Qual região inclui grande parte da Amazônia brasileira?", "Região Norte.", "A Amazônia ultrapassa fronteiras regionais e nacionais; a resposta deve ser contextualizada."],
      ["Nordeste", "NOVE ESTADOS", "Qual região brasileira possui nove estados?", "Região Nordeste.", "Quantidade de estados é um dado de organização regional."],
      ["Centro-Oeste", "BRASÍLIA E PANTANAL", "Em qual região está o Distrito Federal?", "Centro-Oeste.", "A região reúne capital federal, áreas urbanas, Cerrado e Pantanal."],
      ["Sul", "TRÊS ESTADOS", "Quais estados formam a Região Sul?", "Paraná, Santa Catarina e Rio Grande do Sul.", "Nomear os estados confirma a localização sem depender de estereótipos."],
    ],
  },
  {
    id: "geografia-guardioes-dos-biomas", subject: "Geografia", title: "Guardiões dos biomas brasileiros",
    summary: "Clima, vegetação, fauna e impactos precisam combinar; uma pista isolada não basta para identificar um bioma diverso.",
    gradeBands: ["5º", "6º", "7º"], difficulty: "Intermediária", topic: "Biomas brasileiros e relações ambientais",
    objective: "Relacionar características ambientais e ações humanas em diferentes biomas.",
    prior: ["clima, vegetação e fauna", "bioma e ecossistema"],
    mission: "Um relatório misturou características dos biomas. Reconectem ambiente, seres vivos e ameaças para elaborar uma ficha de proteção.",
    finalProduct: "uma ficha de bioma com localização, características, ameaças e ação de conservação",
    finalQuestion: "Por que identificar um bioma exige combinar várias características?",
    finalAnswer: "Porque clima, vegetação, relevo, água, seres vivos e ação humana se relacionam; uma característica pode aparecer em mais de um lugar.",
    evidence: "O grupo justifica o bioma usando ao menos três evidências relacionadas.",
    stages: [
      ["Clima", "TEMPERATURA E CHUVAS", "Que padrão climático aparece no caso estudado?", "O padrão apresentado na carta-base do professor.", "Clima influencia disponibilidade de água e formação da vegetação."],
      ["Vegetação", "FORMAS DE ADAPTAÇÃO", "Como a vegetação se relaciona ao clima?", "Por características adaptadas à água, temperatura e solo.", "A relação é mais importante que decorar uma lista."],
      ["Fauna", "ANIMAIS E HABITATS", "Por que os animais dependem desse ambiente?", "Porque encontram alimento, abrigo e condições de reprodução.", "Habitat conecta seres vivos ao espaço."],
      ["Impactos", "AMEAÇA E CONSERVAÇÃO", "Qual ação humana ameaça e qual pode proteger?", "A dupla de impacto e ação escolhida para o bioma estudado.", "Compreender o problema deve orientar uma ação possível."],
    ],
  },
  {
    id: "geografia-caminho-do-rio", subject: "Geografia", title: "Do nascimento do rio até o mar",
    summary: "O trajeto segue nascente, curso, afluente e foz, mostrando que inverter as etapas produz um rio que corre contra a organização da bacia.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Inicial", topic: "Hidrografia e bacia hidrográfica",
    objective: "Reconhecer partes de um rio e relações entre relevo, curso da água e ocupação humana.",
    prior: ["água em movimento", "áreas mais altas e mais baixas"],
    mission: "A gota precisa percorrer o rio da nascente à foz, registrar encontros com afluentes e evitar áreas contaminadas.",
    finalProduct: "um esquema de rio com nascente, curso, afluente e foz",
    finalQuestion: "Qual é a ordem do percurso e o que faz a água se deslocar?",
    finalAnswer: "Nascente, curso, encontro com afluentes e foz; a água se desloca de áreas mais altas para mais baixas pela gravidade.",
    evidence: "O aluno usa os quatro termos em uma explicação contínua.",
    stages: [
      ["Nascente", "ONDE O RIO COMEÇA", "Como chamamos o local de origem do rio?", "Nascente.", "A nascente alimenta o início do curso d’água."],
      ["Curso", "CAMINHO DO RIO", "O que é o curso do rio?", "O trajeto percorrido pela água.", "O curso se relaciona ao relevo e à bacia."],
      ["Afluente", "RIO QUE ENTRA EM OUTRO", "O que acontece quando um afluente encontra o rio principal?", "Suas águas se juntam ao rio principal.", "A rede de cursos forma a bacia hidrográfica."],
      ["Foz", "ONDE O RIO TERMINA", "Como chamamos o local onde o rio deságua?", "Foz.", "A foz pode ocorrer em outro rio, lago ou oceano."],
    ],
  },
  {
    id: "geografia-conexoes-campo-cidade", subject: "Geografia", title: "Conexões entre campo e cidade",
    summary: "Um produto percorre produção, transporte, transformação e consumo para revelar dependências entre espaços rurais e urbanos.",
    gradeBands: ["3º", "4º", "5º"], difficulty: "Intermediária", topic: "Relações entre espaços rurais e urbanos",
    objective: "Identificar fluxos de produtos, trabalho, pessoas e serviços entre campo e cidade.",
    prior: ["produção e consumo", "campo e cidade sem oposição simplista"],
    mission: "Acompanhem o caminho do leite desde a produção até a mesa e descubram quantas pessoas e lugares participam desse percurso.",
    finalProduct: "uma cadeia ilustrada de produção, transporte, transformação e consumo",
    finalQuestion: "Por que campo e cidade dependem um do outro?",
    finalAnswer: "Porque trocam alimentos, matérias-primas, produtos, serviços, tecnologias, trabalho e pessoas.",
    evidence: "O aluno descreve o fluxo completo e evita dizer que todo alimento chega diretamente do produtor à casa.",
    stages: [
      ["Produção", "PROPRIEDADE RURAL", "Onde começa o percurso do leite deste exemplo?", "Na produção realizada na propriedade rural.", "A origem envolve trabalho, animais, recursos e técnicas."],
      ["Transporte", "VEÍCULO REFRIGERADO", "Por que o transporte precisa de cuidado?", "Para conservar o produto e manter segurança.", "Infraestrutura conecta os espaços produtivos."],
      ["Transformação", "LATICÍNIO", "O que pode acontecer antes da venda?", "Tratamento, análise, embalagem e transformação.", "Produtos passam por etapas e diferentes trabalhos."],
      ["Consumo", "COMÉRCIO E MORADIAS", "O percurso termina sem gerar novos fluxos?", "Não; há resíduos, pagamentos, informações e demanda.", "O consumo também influencia a produção e a circulação."],
    ],
  },
  {
    id: "geografia-estacao-tempo-clima", subject: "Geografia", title: "Estação: tempo ou clima?",
    summary: "As cartas apresentam observações diárias e padrões de muitos anos para que os alunos não chamem um dia frio de mudança no clima.",
    gradeBands: ["5º", "6º", "7º"], difficulty: "Intermediária", topic: "Tempo atmosférico e clima",
    objective: "Distinguir condições atmosféricas momentâneas de padrões climáticos observados por longos períodos.",
    prior: ["chuva, temperatura e vento", "observação e média"],
    mission: "O boletim misturou tempo e clima. Classifiquem as informações e produzam uma explicação que não use um único dia como prova de um padrão longo.",
    finalProduct: "duas colunas — tempo e clima — com exemplos justificados",
    finalQuestion: "Por que um dia muito frio não define sozinho o clima de um lugar?",
    finalAnswer: "Porque tempo descreve condições momentâneas; clima é estudado por padrões e médias de longos períodos.",
    evidence: "O aluno classifica exemplos e justifica com a escala de tempo observada.",
    stages: [
      ["Hoje", "CHUVA À TARDE", "Isso descreve tempo ou clima?", "Tempo atmosférico.", "É uma condição prevista para um momento específico."],
      ["Esta semana", "FRENTE FRIA", "Uma sequência de dias ainda é observação do tempo?", "Sim, continua sendo uma condição de curto prazo.", "Duração de alguns dias não basta para caracterizar clima."],
      ["Muitos anos", "VERÕES QUENTES E CHUVOSOS", "Que conceito aparece numa regularidade de muitos anos?", "Clima.", "Clima envolve padrões estatísticos de longo período."],
      ["Comparação", "EVENTO ≠ PADRÃO", "Qual erro devemos evitar?", "Usar um evento isolado para afirmar como é todo o clima.", "Distinguir evento e padrão melhora a interpretação de dados."],
    ],
  },
  {
    id: "geografia-projete-cidade-sustentavel", subject: "Geografia", title: "Projete uma cidade sustentável",
    summary: "O grupo precisa posicionar moradia, escola, área verde e serviços, equilibrando mobilidade, acesso, risco e ambiente em vez de buscar uma única resposta decorativa.",
    gradeBands: ["6º", "7º", "8º"], difficulty: "Avançada", topic: "Espaço urbano, planejamento e sustentabilidade",
    objective: "Analisar decisões de organização urbana considerando acesso, mobilidade, riscos e qualidade ambiental.",
    prior: ["serviços públicos", "mobilidade e uso do solo"],
    mission: "Uma nova área da cidade será planejada. Percorram quatro decisões e apresentem uma proposta que beneficie diferentes moradores.",
    finalProduct: "um mapa urbano anotado com quatro decisões e justificativas",
    finalQuestion: "Que critérios mostram que a proposta atende à coletividade e não apenas a um ponto do mapa?",
    finalAnswer: "Acesso a serviços, segurança, mobilidade, redução de riscos, áreas verdes e consideração de diferentes grupos.",
    evidence: "O grupo apresenta ao menos um conflito entre critérios e justifica sua escolha.",
    stages: [
      ["Moradia", "EVITE ÁREA DE RISCO", "Que condições precisam ser verificadas antes de construir?", "Risco ambiental, infraestrutura, acesso e segurança.", "O preço ou espaço disponível não é o único critério."],
      ["Serviços", "ESCOLA E SAÚDE ACESSÍVEIS", "Quem precisa conseguir chegar aos serviços?", "Pessoas de diferentes bairros, idades e condições de mobilidade.", "Acessibilidade territorial é parte do direito à cidade."],
      ["Mobilidade", "ROTAS A PÉ · BICICLETA · ÔNIBUS", "Por que oferecer modos diferentes?", "Para ampliar acesso e reduzir dependência, trânsito e poluição.", "Mobilidade conecta usos e grupos sociais."],
      ["Ambiente", "ÁRVORES · ÁGUA · RESÍDUOS", "Que benefícios a infraestrutura verde oferece?", "Sombra, infiltração, conforto térmico, biodiversidade e bem-estar.", "Sustentabilidade precisa aparecer em decisões concretas."],
    ],
  },
  {
    id: "ciencias-viagem-do-alimento", subject: "Ciências", title: "A viagem do alimento",
    summary: "O alimento percorre órgãos em uma ordem funcional; cada parada explica uma transformação e prepara o que acontece no órgão seguinte.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Inicial", topic: "Sistema digestório",
    objective: "Ordenar etapas básicas da digestão e relacionar órgãos às transformações do alimento.",
    prior: ["órgão e sistema", "alimento e nutrientes"],
    mission: "Representem o percurso de um alimento pelo corpo. Visitem os órgãos na ordem correta e descubram onde ocorrem transformações e absorção.",
    finalProduct: "um esquema com boca, esôfago, estômago, intestino delgado e intestino grosso",
    finalQuestion: "Qual é a ordem do percurso e qual é a função principal de cada etapa?",
    finalAnswer: "Boca inicia mastigação e mistura; esôfago conduz; estômago mistura e digere; intestino delgado realiza grande parte da digestão e absorção; intestino grosso absorve água e forma fezes.",
    evidence: "O aluno explica o percurso usando verbos funcionais, não apenas nomes de órgãos.",
    stages: [
      ["Boca", "MASTIGAR E MISTURAR", "O que começa a acontecer com o alimento?", "É triturado e misturado à saliva.", "A transformação mecânica e química começa na boca."],
      ["Esôfago", "CONDUZIR", "Qual é a principal função desse tubo?", "Conduzir o alimento ao estômago.", "O movimento do sistema não depende de o alimento simplesmente cair."],
      ["Estômago", "MISTURAR E DIGERIR", "O alimento apenas fica guardado?", "Não; é misturado e sofre digestão.", "O estômago transforma o conteúdo antes do intestino."],
      ["Intestinos", "ABSORVER NUTRIENTES E ÁGUA", "Onde ocorre grande parte da absorção de nutrientes?", "No intestino delgado; o grosso absorve água e participa da formação das fezes.", "Diferenciar os intestinos evita tratar todo o percurso como igual."],
    ],
  },
  {
    id: "ciencias-jornada-da-gota", subject: "Ciências", title: "A jornada da gota d’água",
    summary: "A gota muda de estado e lugar; a turma liga energia solar, evaporação, condensação e precipitação em um ciclo sem início absoluto.",
    gradeBands: ["3º", "4º", "5º"], difficulty: "Inicial", topic: "Ciclo da água e mudanças de estado",
    objective: "Relacionar etapas do ciclo da água às mudanças de estado e à energia.",
    prior: ["sólido, líquido e gasoso", "aquecimento e resfriamento"],
    mission: "Uma gota precisa sair da superfície, formar nuvem, voltar ao solo e alimentar novamente rios e reservatórios.",
    finalProduct: "um diagrama circular com setas, etapas e mudanças de estado",
    finalQuestion: "Por que chamamos esse processo de ciclo se percorremos as cartas numa ordem?",
    finalAnswer: "Porque após infiltração e escoamento a água volta a reservatórios e pode evaporar novamente; o processo continua.",
    evidence: "O aluno usa as palavras evaporação, condensação e precipitação em relações de causa.",
    stages: [
      ["Evaporação", "LÍQUIDO → VAPOR", "O que fornece energia para parte da água evaporar?", "Principalmente o calor do Sol.", "O aquecimento favorece a passagem para o estado gasoso."],
      ["Condensação", "VAPOR → GOTÍCULAS", "O que acontece quando o vapor esfria?", "Condensa em pequenas gotas.", "Muitas gotículas participam da formação de nuvens."],
      ["Precipitação", "ÁGUA VOLTA À SUPERFÍCIE", "Quando as gotas ficam grandes e pesadas, o que pode ocorrer?", "Precipitação, como chuva.", "A água retorna da atmosfera para a superfície."],
      ["Infiltração e escoamento", "SOLO · RIOS · RESERVATÓRIOS", "Para onde a água pode seguir?", "Pode infiltrar no solo ou escoar para rios e reservatórios.", "Esses caminhos alimentam novas etapas do ciclo."],
    ],
  },
  {
    id: "ciencias-equilibrio-da-teia-alimentar", subject: "Ciências", title: "Equilíbrio da teia alimentar",
    summary: "A sequência produtor–consumidores–decompositores é montada e depois perturbada para investigar como a retirada de uma população afeta outras.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Intermediária", topic: "Cadeias, teias alimentares e fluxo de energia",
    objective: "Relacionar produtores, consumidores e decompositores e prever efeitos de alterações numa teia alimentar.",
    prior: ["ser vivo e ambiente", "alimentação e energia"],
    mission: "O ecossistema perdeu uma ligação. Reconstruam o fluxo de energia e descubram o que pode acontecer quando um dos organismos diminui.",
    finalProduct: "uma cadeia alimentar com setas e uma previsão de desequilíbrio",
    finalQuestion: "O que as setas representam e por que retirar um organismo pode afetar vários outros?",
    finalAnswer: "As setas indicam transferência de matéria e energia do alimento para quem o consome; os organismos estão conectados por múltiplas relações.",
    evidence: "O aluno lê a seta no sentido correto e formula uma previsão como possibilidade, não certeza automática.",
    stages: [
      ["Produtor", "CAPIM", "Por que a cadeia começa com um produtor?", "Porque produz matéria orgânica usando energia, geralmente luminosa.", "A energia entra na cadeia por meio dos produtores."],
      ["Consumidor primário", "GAFANHOTO", "De onde esse consumidor obtém energia?", "Ao alimentar-se do produtor.", "A relação estabelece o primeiro nível de consumo."],
      ["Consumidores seguintes", "SAPO → SERPENTE", "O que a seta deve indicar?", "Do organismo consumido para o consumidor.", "O sentido da seta representa transferência de energia."],
      ["Decompositores", "FUNGOS E BACTÉRIAS", "Qual é o papel dos decompositores?", "Decompor matéria e devolver nutrientes ao ambiente.", "Eles atuam sobre organismos de diferentes níveis."],
    ],
  },
  {
    id: "ciencias-segredo-da-semente", subject: "Ciências", title: "O segredo da semente",
    summary: "Os alunos acompanham germinação, crescimento, floração e formação de novas sementes, relacionando cada etapa às condições necessárias.",
    gradeBands: ["2º", "3º", "4º"], difficulty: "Inicial", topic: "Ciclo de vida das plantas",
    objective: "Ordenar etapas do desenvolvimento vegetal e identificar necessidades básicas das plantas.",
    prior: ["ser vivo e ciclo de vida", "água, luz e solo"],
    mission: "A horta recebeu sementes, mas as instruções foram embaralhadas. Organizem o desenvolvimento e descubram o que a planta precisa em cada fase.",
    finalProduct: "uma sequência ilustrada do ciclo da planta com condições necessárias",
    finalQuestion: "Por que plantar a semente não garante sozinho o desenvolvimento da planta?",
    finalAnswer: "Porque germinação e crescimento dependem de condições como água, temperatura adequada, luz em etapas posteriores, nutrientes e cuidado.",
    evidence: "O aluno ordena as fases e relaciona pelo menos duas condições a funções concretas.",
    stages: [
      ["Semente", "INÍCIO DO CICLO", "O que existe dentro de uma semente viável?", "Uma estrutura embrionária e reservas que participam do início do desenvolvimento.", "A semente não é um objeto sem vida em miniatura."],
      ["Germinação", "RAIZ E BROTO EMERGEM", "Que condição é essencial para iniciar a germinação?", "Água, além de condições adequadas de temperatura e oxigênio.", "A água ativa processos da semente."],
      ["Crescimento", "FOLHAS E CAULE", "Por que a luz se torna importante?", "Porque participa da fotossíntese realizada pelas partes verdes.", "A planta passa a produzir matéria orgânica com energia luminosa."],
      ["Reprodução", "FLOR · FRUTO · NOVAS SEMENTES", "Como o ciclo pode continuar?", "Com formação e dispersão de novas sementes.", "A etapa reprodutiva conecta uma geração à seguinte."],
    ],
  },
  {
    id: "ciencias-laboratorio-estados-materia", subject: "Ciências", title: "Laboratório dos estados da matéria",
    summary: "O robô percorre aquecimento e resfriamento, e os alunos precisam nomear a transformação, não apenas o estado inicial ou final.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Intermediária", topic: "Estados físicos e transformações da matéria",
    objective: "Relacionar fusão, vaporização, condensação e solidificação a ganho ou perda de energia térmica.",
    prior: ["sólido, líquido e gasoso", "aquecimento e resfriamento"],
    mission: "O laboratório precisa transformar água sólida em vapor e fazê-la voltar ao estado sólido, registrando cada transformação.",
    finalProduct: "um ciclo com estados, setas, nomes das mudanças e indicação de aquecer ou resfriar",
    finalQuestion: "Que diferença existe entre dizer “líquido” e dizer “fusão”?",
    finalAnswer: "Líquido é um estado; fusão é a transformação do sólido para o líquido.",
    evidence: "O aluno nomeia transformação, estados envolvidos e sentido da troca de energia.",
    stages: [
      ["Fusão", "SÓLIDO → LÍQUIDO", "Que mudança ocorre quando o gelo derrete?", "Fusão.", "A matéria recebe energia térmica e muda de estado."],
      ["Vaporização", "LÍQUIDO → GASOSO", "Como se chama a passagem para o estado gasoso?", "Vaporização.", "Evaporação e ebulição são formas de vaporização."],
      ["Condensação", "GASOSO → LÍQUIDO", "O que ocorre quando o vapor perde energia?", "Condensação.", "O resfriamento favorece a formação de líquido."],
      ["Solidificação", "LÍQUIDO → SÓLIDO", "Como a água volta ao estado sólido?", "Por solidificação ao perder energia térmica.", "O ciclo permite comparar transformações opostas."],
    ],
  },
  {
    id: "ciencias-central-da-reciclagem", subject: "Ciências", title: "Central de separação de resíduos",
    summary: "Antes de levar o resíduo ao destino, os alunos observam material, contaminação, possibilidade de reaproveitamento e regra local de descarte.",
    gradeBands: ["3º", "4º", "5º"], difficulty: "Intermediária", topic: "Materiais, resíduos e consumo responsável",
    objective: "Classificar resíduos com critérios e reconhecer redução e reutilização antes da reciclagem.",
    prior: ["material de que um objeto é feito", "reduzir, reutilizar e reciclar"],
    mission: "A central recebeu resíduos misturados. Analisem quatro casos e escolham destinos responsáveis sem confiar apenas na cor da lixeira.",
    finalProduct: "uma tabela de objeto, material, condição, destino e ação para reduzir o resíduo",
    finalQuestion: "Por que dois objetos do mesmo material podem ter destinos diferentes?",
    finalAnswer: "Porque contaminação, composição mista, regras locais e possibilidade de reaproveitamento alteram o destino adequado.",
    evidence: "O aluno justifica a classificação por material e condição e propõe redução ou reutilização.",
    stages: [
      ["Identificar", "DE QUE MATERIAL É FEITO?", "Qual é o material predominante do objeto?", "O material indicado na carta escolhida pelo professor.", "Classificar começa por observar composição, não apenas formato."],
      ["Conferir", "ESTÁ LIMPO OU CONTAMINADO?", "A condição altera o descarte?", "Sim; resíduos contaminados podem exigir outro tratamento.", "A regra real depende do serviço disponível no município."],
      ["Evitar", "DÁ PARA REDUZIR OU REUTILIZAR?", "Existe uma ação anterior à reciclagem?", "Evitar o consumo ou reutilizar quando seguro e possível.", "Reciclagem não apaga os impactos de produzir e transportar."],
      ["Destinar", "CONSULTE A REGRA LOCAL", "Qual é o destino responsável?", "O destino previsto pela coleta e logística local para aquele material.", "A orientação local evita ensinar uma regra universal incorreta."],
    ],
  },
  {
    id: "ciencias-missao-sistema-solar", subject: "Ciências", title: "Missão pelo Sistema Solar",
    summary: "As pistas trabalham ordem, escala e características planetárias sem sugerir que as distâncias reais cabem proporcionalmente na pequena grade.",
    gradeBands: ["5º", "6º", "7º"], difficulty: "Avançada", topic: "Sistema Solar, ordem e escala",
    objective: "Reconhecer a organização básica do Sistema Solar e distinguir representação didática de escala real.",
    prior: ["estrela e planeta", "modelo e realidade"],
    mission: "Uma sonda precisa sair da região dos planetas rochosos, cruzar o cinturão de asteroides e investigar gigantes sem confundir o mapa com a escala real.",
    finalProduct: "um modelo anotado da ordem dos planetas e um alerta sobre escala",
    finalQuestion: "O que o tabuleiro representa corretamente e o que ele não representa em escala?",
    finalAnswer: "Representa ordem e relações selecionadas; não representa proporcionalmente tamanhos e distâncias reais.",
    evidence: "O aluno usa o modelo para explicar a ordem e declara explicitamente sua limitação de escala.",
    stages: [
      ["Sol", "ESTRELA CENTRAL", "O Sol é planeta?", "Não; é a estrela em torno da qual orbitam os planetas do Sistema Solar.", "A classificação organiza os corpos por características."],
      ["Rochosos", "MERCÚRIO · VÊNUS · TERRA · MARTE", "O que esses quatro têm em comum?", "São planetas internos com superfícies rochosas.", "Agrupar por características ajuda sem dizer que são idênticos."],
      ["Cinturão", "REGIÃO DE MUITOS CORPOS", "O cinturão é uma parede contínua?", "Não; é uma vasta região com muitos corpos separados por grandes distâncias.", "A imagem popular de barreira compacta é enganosa."],
      ["Gigantes", "JÚPITER · SATURNO · URANO · NETUNO", "Todos são iguais?", "Não; há diferenças de composição, tamanho, atmosfera, anéis e luas.", "A categoria ajuda a organizar, mas não elimina diversidade."],
    ],
  },
  {
    id: "ingles-treasure-hunt-school", subject: "Língua Inglesa", title: "Treasure hunt at school",
    summary: "Os comandos físicos ganham significado em inglês quando cada pista exige compreender lugar, direção e instrução antes de mover o robô.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Inicial", topic: "School places and directions",
    objective: "Compreender e usar vocabulário de lugares da escola e instruções de direção em contexto.",
    prior: ["left, right e forward", "classroom, library, cafeteria e playground"],
    mission: "Find the missing key. Visit the classroom, library, cafeteria and playground in the correct order before opening the treasure chest.",
    finalProduct: "um mapa da escola com quatro frases em inglês descrevendo a rota",
    finalQuestion: "How do you describe the complete route in English?",
    finalAnswer: "A resposta deve usar go forward, turn left/right e os quatro lugares na ordem do mapa.",
    evidence: "O aluno executa uma instrução nova em inglês sem depender da tradução palavra por palavra.",
    stages: [
      ["Classroom", "GO TO THE CLASSROOM", "Where do students usually have lessons?", "In the classroom.", "A pergunta associa a palavra a uma função conhecida."],
      ["Library", "TURN AND GO TO THE LIBRARY", "Where can you borrow books?", "At the library.", "O contexto permite inferir o vocabulário."],
      ["Cafeteria", "FIND THE CAFETERIA", "Where can students have a snack?", "At the cafeteria.", "A ação ancora o lugar em uma situação real."],
      ["Playground", "FINISH AT THE PLAYGROUND", "Where can students play outside?", "At the playground.", "A última resposta conclui a descrição da rota."],
    ],
  },
  {
    id: "ingles-daily-routine", subject: "Língua Inglesa", title: "My daily routine in order",
    summary: "Os alunos organizam ações do cotidiano, usam marcadores de sequência e percebem que first, then, next e finally funcionam como conectores de algoritmo.",
    gradeBands: ["5º", "6º", "7º"], difficulty: "Intermediária", topic: "Daily routine and sequence markers",
    objective: "Descrever uma rotina curta usando verbos e marcadores de ordem.",
    prior: ["verbos de rotina em inglês", "first, then, next e finally"],
    mission: "Sam’s routine cards are mixed. Put the morning actions in a logical order and describe the route using sequence words.",
    finalProduct: "uma apresentação oral de quatro frases sobre a rotina",
    finalQuestion: "Which words make the order clear?",
    finalAnswer: "First, then, next and finally.",
    evidence: "O aluno usa os marcadores para ordenar ações, mesmo quando mais de uma rotina seria possível.",
    stages: [
      ["First", "WAKE UP", "What does Sam do first?", "Sam wakes up.", "A primeira ação inicia a sequência."],
      ["Then", "BRUSH TEETH", "What does Sam do then?", "Sam brushes his teeth.", "Then conecta a segunda ação à primeira."],
      ["Next", "HAVE BREAKFAST", "What happens next?", "Sam has breakfast.", "Next mantém a progressão da rotina."],
      ["Finally", "GO TO SCHOOL", "What does Sam do finally?", "Sam goes to school.", "Finally sinaliza a última etapa escolhida."],
    ],
  },
  {
    id: "ingles-animals-and-habitats", subject: "Língua Inglesa", title: "Animals and habitats rescue",
    summary: "Os animais precisam chegar a habitats compatíveis, fazendo vocabulário e relações ambientais dirigirem o percurso.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Intermediária", topic: "Animals, habitats and simple descriptions",
    objective: "Relacionar animais a habitats e produzir frases simples com lives in, can e has.",
    prior: ["nomes de animais", "forest, ocean, desert e wetland"],
    mission: "The habitat signs are missing. Match each animal to a suitable habitat and explain one adaptation before moving on.",
    finalProduct: "quatro cartas animal–habitat acompanhadas de frases em inglês",
    finalQuestion: "How can you justify each match in one sentence?",
    finalAnswer: "Com frases como “The fish lives in the ocean because it has gills” adequadas aos animais escolhidos.",
    evidence: "O aluno não apenas nomeia o habitat; usa uma característica para justificar a relação.",
    stages: [
      ["Fish", "FISH", "Where does this fish live?", "It lives in the ocean or another appropriate aquatic habitat.", "A resposta deve considerar a espécie ilustrada."],
      ["Camel", "CAMEL", "Which habitat matches the camel?", "The desert.", "A relação pode ser justificada por adaptações ao ambiente seco."],
      ["Monkey", "MONKEY", "Does every monkey live in the same habitat?", "No; use the habitat appropriate to the species shown.", "A pergunta evita generalização excessiva."],
      ["Frog", "FROG", "Why is a wet habitat important?", "Because frogs depend on moisture and water during parts of their life cycle.", "A frase conecta vocabulário e ciência."],
    ],
  },
  {
    id: "arte-pixel-art-secreta", subject: "Arte", title: "Pixel art secreta no tabuleiro",
    summary: "Cada casa funciona como um pixel e a sequência de coordenadas revela uma imagem; um único ponto errado altera o contorno e inicia a depuração visual.",
    gradeBands: ["3º", "4º", "5º"], difficulty: "Inicial", topic: "Imagem, composição e pixel art",
    objective: "Compor uma imagem em grade, relacionando ponto, posição, repetição e leitura do todo.",
    prior: ["linha, forma e cor", "grade e coordenada"],
    mission: "Uma imagem foi transformada em coordenadas. Percorram as etapas, marquem as casas indicadas e descubram a figura escondida.",
    finalProduct: "uma pixel art 6×6 acompanhada da lista de coordenadas usadas",
    finalQuestion: "Como pequenos quadrados separados passam a ser percebidos como uma imagem?",
    finalAnswer: "Pela organização de posição, proximidade, contraste e padrão quando observamos o conjunto.",
    evidence: "O aluno localiza o ponto que altera o contorno e corrige apenas aquela coordenada.",
    stages: [
      ["Contorno", "MARQUE O LIMITE", "Que casas definem a borda principal?", "As coordenadas apresentadas na carta de contorno.", "O contorno organiza a forma antes dos detalhes."],
      ["Simetria", "COMPARE OS LADOS", "Os dois lados mantêm equilíbrio?", "Devem corresponder conforme o modelo proposto.", "A comparação ajuda a localizar um pixel deslocado."],
      ["Cor", "ESCOLHA O CONTRASTE", "Qual cor destaca a figura do fundo?", "Uma combinação com contraste visual suficiente.", "Contraste torna a forma legível."],
      ["Leitura", "AFASTE E OBSERVE", "Que imagem aparece no conjunto?", "A figura planejada na carta-modelo.", "A percepção do todo emerge da organização das partes."],
    ],
  },
  {
    id: "arte-espelho-da-simetria", subject: "Arte", title: "O espelho da simetria",
    summary: "Metade de uma composição já está pronta; o grupo calcula a posição refletida de cada elemento e completa a obra sem copiar por tentativa.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Intermediária", topic: "Simetria, equilíbrio e composição visual",
    objective: "Reconhecer eixo de simetria e produzir correspondências espaciais em uma composição.",
    prior: ["metade e eixo", "posição relativa"],
    mission: "Uma obra simétrica perdeu o lado direito. Recolham quatro elementos do lado esquerdo e descubram as casas refletidas.",
    finalProduct: "uma composição simétrica com eixo destacado e pares de coordenadas",
    finalQuestion: "O que precisa permanecer e o que muda quando um elemento é refletido?",
    finalAnswer: "Permanecem forma e distância ao eixo; muda o lado e a orientação horizontal do elemento.",
    evidence: "O aluno justifica a coordenada refletida contando a mesma distância até o eixo.",
    stages: [
      ["Eixo", "LINHA CENTRAL", "Onde está o eixo de simetria?", "Na linha vertical central definida no modelo.", "Sem identificar o eixo não há referência para refletir."],
      ["Distância", "CONTE ATÉ O EIXO", "A quantas casas o elemento está do eixo?", "A distância indicada pela posição da carta.", "O par deve manter a mesma distância do outro lado."],
      ["Reflexo", "MARQUE A CASA CORRESPONDENTE", "Qual coordenada ocupa a posição espelhada?", "A coordenada calculada pela turma.", "Refletir não é apenas deslocar; é inverter a posição em relação ao eixo."],
      ["Conferência", "DOBRE MENTALMENTE", "Os pares coincidem ao imaginar uma dobra?", "Sim, quando todas as distâncias correspondem.", "A dobra mental funciona como teste do algoritmo visual."],
    ],
  },
  {
    id: "arte-laboratorio-das-cores", subject: "Arte", title: "Laboratório das cores e sensações",
    summary: "O percurso parte de cores primárias, produz misturas, compara contrastes e termina numa composição justificada, não numa lista rígida de emoções universais.",
    gradeBands: ["3º", "4º", "5º"], difficulty: "Intermediária", topic: "Cor, mistura, contraste e expressão",
    objective: "Experimentar relações cromáticas e justificar escolhas expressivas sem tratar associações culturais como regras universais.",
    prior: ["cores primárias", "mistura e contraste"],
    mission: "A exposição precisa de uma paleta para representar uma tempestade que termina em calmaria. Criem as cores por etapas e expliquem as escolhas.",
    finalProduct: "uma paleta comentada e uma composição curta com transição de atmosfera",
    finalQuestion: "Como cor, contraste e quantidade ajudam a construir a atmosfera da imagem?",
    finalAnswer: "Pelas relações entre cores, luminosidade, saturação, contraste, área ocupada e contexto da composição.",
    evidence: "O aluno justifica uma escolha visual observável sem afirmar que uma cor possui significado único.",
    stages: [
      ["Primárias", "AZUL · AMARELO · VERMELHO", "Quais cores serão a base das misturas?", "Azul, amarelo e vermelho no sistema de tinta adotado.", "Definir o material e o sistema evita confundir luz com pigmento."],
      ["Misturas", "CRIE CORES SECUNDÁRIAS", "O que surge ao misturar pares das cores-base?", "Verde, laranja e violeta, com variações conforme os pigmentos.", "A experiência real pode produzir tons diferentes do modelo ideal."],
      ["Contraste", "CLARO · ESCURO · COMPLEMENTAR", "Que contraste destaca o ponto de maior tensão?", "Uma escolha justificada pela paleta e pela composição.", "Contraste dirige o olhar e cria hierarquia."],
      ["Composição", "DA TEMPESTADE À CALMARIA", "Como organizar a transição?", "Alterando relações de cor, contraste, forma e espaço ao longo da imagem.", "A intenção se constrói pelo conjunto, não por uma cor isolada."],
    ],
  },
  {
    id: "educacao-fisica-circuito-robo", subject: "Educação Física", title: "Circuito do aluno-robô",
    summary: "O corpo executa uma sequência de deslocamentos e habilidades; a turma planeja, observa segurança, executa literalmente e ajusta o circuito.",
    gradeBands: ["2º", "3º", "4º"], difficulty: "Inicial", topic: "Coordenação motora, orientação e sequência",
    objective: "Combinar deslocamento, equilíbrio, salto e giro em sequência segura e controlada.",
    prior: ["direita e esquerda", "regras de segurança no movimento"],
    mission: "Um aluno será o robô do circuito. Programem quatro movimentos, respeitem as zonas de segurança e levem a equipe ao final.",
    finalProduct: "uma sequência corporal executada e representada por cartões",
    finalQuestion: "Como a ordem dos movimentos alterou equilíbrio, segurança e resultado?",
    finalAnswer: "Cada movimento prepara uma posição corporal; trocar a ordem pode aumentar dificuldade, desequilíbrio ou risco.",
    evidence: "O aluno antecipa a posição final de um movimento antes de escolher o seguinte.",
    stages: [
      ["Deslocamento", "CAMINHE 4 PASSOS", "Como manter controle e espaço do colega?", "Andar no ritmo combinado e dentro do corredor marcado.", "Controle vem antes de velocidade."],
      ["Equilíbrio", "PARE EM UM PÉ", "Que partes do corpo ajudam a equilibrar?", "Base de apoio, braços, olhar e ajuste do tronco.", "A posição anterior influencia a estabilidade."],
      ["Salto", "SALTE E ATERRISSE", "Como realizar uma aterrissagem segura?", "Flexionar joelhos, controlar o corpo e usar espaço livre.", "O objetivo é qualidade do movimento, não altura."],
      ["Giro", "GIRO DE 90°", "Para que lado e quanto devemos girar?", "Para o lado indicado, um quarto de volta.", "A orientação final determina o próximo deslocamento."],
    ],
  },
  {
    id: "educacao-fisica-desafio-lateralidade", subject: "Educação Física", title: "Desafio da lateralidade em equipe",
    summary: "O grupo traduz esquerda e direita do próprio corpo para a direção do robô, superando a confusão causada quando observador e executor estão de frente um para o outro.",
    gradeBands: ["2º", "3º", "4º"], difficulty: "Intermediária", topic: "Lateralidade e orientação espacial",
    objective: "Reconhecer lados do próprio corpo e aplicar referências espaciais em diferentes orientações.",
    prior: ["lado direito e esquerdo do corpo", "frente, atrás e giro"],
    mission: "Os sinais do circuito mudam conforme a direção do executor. Leiam cada comando a partir do corpo de quem está no tabuleiro.",
    finalProduct: "um percurso executado sem espelhamento indevido e explicado pela equipe",
    finalQuestion: "Por que a direita do executor pode parecer esquerda para quem o observa de frente?",
    finalAnswer: "Porque observador e executor possuem orientações opostas; a referência deve ser o corpo de quem executa.",
    evidence: "O aluno aponta o lado do executor antes de dar a instrução.",
    stages: [
      ["Referência", "MOSTRE SUA MÃO DIREITA", "Direita de quem usaremos?", "Do aluno que está executando.", "Definir a referência elimina ambiguidade."],
      ["Giro", "VIRE À ESQUERDA", "O executor deve seguir o lado de quem?", "O próprio lado esquerdo.", "A visão do observador não substitui a referência definida."],
      ["Mudança de direção", "AGORA OLHE PARA O SUL", "A posição da direita no espaço mudou?", "Sim, mas o lado direito do corpo continua sendo o mesmo.", "Lateralidade corporal e direção geográfica são referências diferentes."],
      ["Comando oral", "GUIE SEM APONTAR", "A fala foi suficiente para o colega executar?", "Deve ser clara quanto a lado, giro e quantidade.", "Retirar gestos testa precisão da comunicação."],
    ],
  },
  {
    id: "educacao-fisica-estrategia-jogo-cooperativo", subject: "Educação Física", title: "Estratégia do jogo cooperativo",
    summary: "Os participantes precisam transportar quatro objetos sem perder nenhum, distribuindo papéis e revisando a estratégia quando o caminho ou a regra muda.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Avançada", topic: "Cooperação, estratégia e regras",
    objective: "Planejar ações coletivas, comunicar decisões e adaptar estratégia respeitando regras e segurança.",
    prior: ["regra e objetivo de jogo", "cooperação e função no grupo"],
    mission: "A equipe precisa levar quatro suprimentos ao destino. Cada pessoa pode carregar apenas um e ninguém pode entrar numa casa ocupada.",
    finalProduct: "um plano coletivo com papéis, ordem das ações e revisão após uma mudança de regra",
    finalQuestion: "O que tornou a estratégia coletiva eficiente e justa?",
    finalAnswer: "Distribuição clara de papéis, comunicação, respeito às restrições, participação de todos e possibilidade de ajuste.",
    evidence: "O grupo modifica a estratégia após uma nova restrição sem excluir participantes.",
    stages: [
      ["Planejamento", "QUEM FAZ O QUÊ?", "Como distribuir os quatro suprimentos?", "Com papéis claros e participação de todos.", "Planejar evita concentração de tarefas e colisões."],
      ["Comunicação", "AVISE ANTES DE MOVER", "Que informação precisa ser dita?", "Destino, caminho e momento do deslocamento.", "Comunicação antecipada permite coordenação."],
      ["Restrição", "UMA CASA FOI BLOQUEADA", "O plano inteiro precisa ser abandonado?", "Não; deve ser revisto a partir do trecho afetado.", "A adaptação é uma forma corporal de depuração."],
      ["Cooperação", "TODOS CHEGAM JUNTOS", "Como avaliar além da velocidade?", "Segurança, participação, comunicação e cumprimento da missão.", "Resultado coletivo não se resume a tempo."],
    ],
  },
  {
    id: "interdisciplinar-expedicao-brasil", subject: "Interdisciplinar", title: "Expedição pelo Brasil",
    summary: "A missão integra leitura de mapa, cálculo de distâncias, marcos históricos e produção de diário sem transformar as disciplinas em perguntas soltas.",
    gradeBands: ["5º", "6º", "7º"], difficulty: "Avançada", topic: "Território, história, medidas e produção textual",
    objective: "Integrar evidências geográficas, históricas, matemáticas e linguísticas na construção de um relato de expedição.",
    prior: ["mapa e legenda", "linha do tempo, distância e relato"],
    mission: "Uma equipe fará quatro paradas pelo Brasil. Em cada uma, deverá registrar localização, evidência histórica, distância percorrida e observação para o diário.",
    finalProduct: "um diário de expedição com mapa, cálculos, contexto histórico e relato",
    finalQuestion: "Como as quatro áreas contribuíram para compreender a expedição como um todo?",
    finalAnswer: "Geografia localizou, História contextualizou, Matemática mediu e Português organizou e comunicou as descobertas.",
    evidence: "O produto final relaciona as áreas numa explicação única em vez de apresentar quatro respostas desconectadas.",
    stages: [
      ["Localização", "LEIA O MAPA", "Em que região e direção está a primeira parada?", "A localização indicada pelo mapa preparado.", "A posição orienta todo o deslocamento."],
      ["Contexto", "INVESTIGUE UM MARCO", "Que processo histórico se relaciona ao lugar?", "O processo selecionado pelo professor para a região.", "O lugar é compreendido no tempo, não apenas no mapa."],
      ["Distância", "CALCULE O TRECHO", "Quantas unidades foram percorridas e qual escala usamos?", "O cálculo conforme o mapa e sua escala didática.", "A medida quantifica o deslocamento sem fingir escala real."],
      ["Diário", "REGISTRE A DESCOBERTA", "Como transformar dados em relato?", "Organizando observação, contexto e conclusão com clareza.", "A escrita sintetiza informações das outras áreas."],
    ],
  },
  {
    id: "interdisciplinar-missao-ambiental", subject: "Interdisciplinar", title: "Missão ambiental da escola",
    summary: "Os alunos investigam um problema real, coletam dados, localizam pontos críticos e criam uma campanha baseada em evidências.",
    gradeBands: ["4º", "5º", "6º"], difficulty: "Intermediária", topic: "Ambiente, dados, espaço e comunicação",
    objective: "Investigar um problema ambiental da escola e propor uma ação apoiada em observação e dados.",
    prior: ["problema e evidência", "tabela, mapa e mensagem de campanha"],
    mission: "A escola quer reduzir resíduos. Percorram observação, classificação, contagem e comunicação para criar uma solução possível.",
    finalProduct: "um mapa de pontos críticos, gráfico simples e cartaz de ação",
    finalQuestion: "Que evidências mostram qual ação deve ser priorizada?",
    finalAnswer: "Os locais, tipos e quantidades observados, associados à viabilidade e ao impacto da ação proposta.",
    evidence: "O grupo usa um dado coletado para justificar a mensagem da campanha.",
    stages: [
      ["Observar", "ONDE ESTÁ O PROBLEMA?", "Qual local apresenta a situação investigada?", "O ponto identificado pela observação da turma.", "Localizar evita falar do problema de modo genérico."],
      ["Classificar", "QUE RESÍDUOS APARECEM?", "Quais categorias ajudam a analisar?", "Categorias coerentes com os resíduos encontrados.", "Classificação transforma observações em dados comparáveis."],
      ["Contar", "QUANTO ENCONTRAMOS?", "Qual categoria aparece mais?", "A categoria com maior contagem na coleta.", "Quantidade ajuda a priorizar sem substituir a interpretação."],
      ["Comunicar", "QUAL AÇÃO PROPOMOS?", "A mensagem responde ao dado principal?", "Deve responder diretamente à evidência coletada.", "Campanha eficaz conecta problema, público e ação possível."],
    ],
  },
  {
    id: "interdisciplinar-feira-de-solucoes", subject: "Interdisciplinar", title: "Feira de soluções para a comunidade",
    summary: "A rota transforma um problema observado em proposta: compreender, levantar causas, criar solução e comunicar critérios de avaliação.",
    gradeBands: ["6º", "7º", "8º", "9º"], difficulty: "Avançada", topic: "Projeto, investigação, prototipagem e argumentação",
    objective: "Desenvolver uma solução escolar por etapas e justificar decisões com critérios e evidências.",
    prior: ["problema, causa e consequência", "proposta, evidência e argumento"],
    mission: "A feira aceita apenas soluções para problemas reais da comunidade escolar. Percorram as quatro etapas e preparem uma proposta testável.",
    finalProduct: "um cartaz de projeto com problema, evidências, proposta, teste e critérios",
    finalQuestion: "Como provar que a solução responde ao problema e não apenas parece interessante?",
    finalAnswer: "Definindo critérios antes do teste, coletando evidências e comparando o resultado com a situação inicial.",
    evidence: "O grupo apresenta um critério mensurável e reconhece uma limitação da proposta.",
    stages: [
      ["Problema", "QUEM É AFETADO E COMO?", "O problema está descrito de forma observável?", "Deve indicar situação, pessoas afetadas e evidência.", "Problema vago produz solução desconectada."],
      ["Causas", "POR QUE ACONTECE?", "Qual causa pode ser investigada pela turma?", "Uma hipótese apoiada em observação ou dado.", "Hipótese não deve ser apresentada como certeza antes do teste."],
      ["Solução", "O QUE PODEMOS MUDAR?", "A proposta age sobre alguma causa identificada?", "Sim, deve haver conexão explícita.", "A relação causa–ação dá coerência ao projeto."],
      ["Teste", "COMO SABER SE FUNCIONOU?", "Qual critério será observado?", "Um indicador comparável antes e depois da intervenção.", "Critério prévio evita declarar sucesso apenas por opinião."],
    ],
  },
  {
    id: "interdisciplinar-plano-de-emergencia", subject: "Interdisciplinar", title: "Plano de emergência da escola",
    summary: "O mapa 6×6 vira uma planta simplificada para combinar leitura espacial, segurança, comunicação e otimização de rota sem simular situações perigosas.",
    gradeBands: ["5º", "6º", "7º"], difficulty: "Avançada", topic: "Orientação, segurança, comunicação e planejamento",
    objective: "Planejar e comunicar uma rota segura em uma representação, reconhecendo limites da simulação e autoridade do plano oficial.",
    prior: ["mapa, legenda e rota", "instrução clara e regra de segurança"],
    mission: "Analisem uma planta fictícia, identifiquem bloqueios, escolham uma saída e produzam instruções claras. A atividade não substitui o plano oficial da escola.",
    finalProduct: "um mapa fictício com rota, legenda, ponto de encontro e instruções",
    finalQuestion: "O que torna uma instrução de rota clara, segura e verificável?",
    finalAnswer: "Referências visíveis, ordem, direção, distância, ausência de ambiguidade e compatibilidade com as regras oficiais de segurança.",
    evidence: "Outro grupo executa a instrução na maquete sem precisar perguntar o que o autor quis dizer.",
    stages: [
      ["Reconhecer", "LOCALIZE VOCÊ ESTÁ AQUI", "Qual é a posição inicial e para onde o robô olha?", "A coordenada e direção definidas no mapa.", "Sem referência inicial, direita e esquerda ficam ambíguas."],
      ["Verificar", "IDENTIFIQUE BLOQUEIOS", "Quais caminhos não podem ser usados?", "As casas marcadas como bloqueadas.", "Uma rota curta pode ser inviável por restrições."],
      ["Escolher", "SAÍDA E PONTO DE ENCONTRO", "Qual destino atende ao cenário fictício?", "A saída liberada e o ponto indicado no mapa.", "O objetivo deve respeitar a legenda e as regras fornecidas."],
      ["Comunicar", "ESCREVA SEM AMBIGUIDADE", "Outro grupo consegue executar literalmente?", "Sim, quando os comandos são completos e ordenados.", "Testar com outro grupo revela suposições escondidas."],
    ],
  },
];

export const BOARD_ACROSS_CURRICULUM_ACTIVITIES = SEEDS.map(buildActivity);

export const BOARD_SUBJECTS = [...new Set(BOARD_ACROSS_CURRICULUM_ACTIVITIES.map((activity) => activity.subject))] as BoardSubject[];

export function boardCurriculumActivityById(id: string) {
  return BOARD_ACROSS_CURRICULUM_ACTIVITIES.find((activity) => activity.id === id);
}

export const BOARD_CURRICULUM_COUNTS = BOARD_SUBJECTS.map((subject) => ({
  subject,
  count: BOARD_ACROSS_CURRICULUM_ACTIVITIES.filter((activity) => activity.subject === subject).length,
}));
