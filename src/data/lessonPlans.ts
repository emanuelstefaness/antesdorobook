import type { AgeBand, Duration, ImageSlot, Material, Ref } from "./types";
import { EXTRA_LESSON_PLANS } from "./expandedLessonPlans";
import generatedLessonPlans from "./generated/additionalLessonPlans.json";

export type ClassSize = "ate-15" | "16-30" | "mais-de-30";
export type PlanLevel = "iniciante" | "intermediario" | "avancado";

/**
 * O roteiro segue as fases de uma aula de pensamento computacional, na ordem
 * em que acontecem. Todos os campos são obrigatórios: um plano sem depuração
 * ou sem avaliação não é um plano de aula, é um resumo de atividade — e o
 * compilador é quem cobra isso, não a revisão humana.
 */
export type LessonPlan = {
  id: string;
  title: string;
  theme: string;
  objective: string;
  duration: Duration;
  ageBands: AgeBand[];
  classSize: ClassSize;
  level: PlanLevel;
  concepts: string[];
  materials: Material[];
  needsComputer: boolean;
  needsMicrobit: boolean;
  needsBoard: boolean;
  preparation: string[];
  intro: string;
  triggerQuestion: string;
  explanation: string;
  investigation: string;
  construction: string;
  test: string;
  debug: string;
  sharing: string;
  assessment: string[];
  continuity: Ref;
  relatedContent: Ref[];
  image: ImageSlot | null;
  /** Campos pedagógicos ampliados. Os planos antigos recebem uma explicação derivada na página. */
  whyApply?: string;
  dailyLife?: string;
  teacherPrerequisites?: Ref[];
  studentPrerequisites?: string[];
  teacherTalk?: string[];
};

export const NOMES_DAS_TURMAS: Record<ClassSize, string> = {
  "ate-15": "até 15 alunos",
  "16-30": "16 a 30 alunos",
  "mais-de-30": "mais de 30 alunos",
};

export const NOMES_DOS_NIVEIS_DE_PLANO: Record<PlanLevel, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

const CORE_LESSON_PLANS: LessonPlan[] = [
  {
    id: "algoritmo-do-sanduiche-na-pratica",
    title: "O algoritmo do sanduíche",
    theme: "Sequência sem computador",
    objective:
      "Levar a turma a perceber que instruções precisam ser completas e ordenadas, executando ao pé da letra o que os alunos ditarem.",
    duration: 50,
    ageBands: ["2-3"],
    classSize: "16-30",
    level: "iniciante",
    concepts: ["o-que-e-pensamento-computacional", "sequencia-e-instrucoes"],
    materials: ["papel-e-lapis", "cartoes"],
    needsComputer: false,
    needsMicrobit: false,
    needsBoard: false,
    preparation: [
      "Separe os ingredientes de mentira: dois pedaços de papel para as fatias de pão e um pote vazio com uma colher.",
      "Corte 30 tiras de papel em branco, uma por aluno, para escreverem um passo cada.",
      "Escreva no quadro, antes da aula, a frase que vai reger tudo: EU FAÇO EXATAMENTE O QUE ESTÁ ESCRITO.",
    ],
    intro:
      "Mostre os ingredientes na mesa e diga que hoje quem faz o sanduíche é você, mas quem manda é a turma — e que você não sabe fazer nada que não esteja escrito.",
    triggerQuestion:
      "Se eu nunca tivesse feito um sanduíche na vida, o que vocês precisariam me dizer para eu conseguir?",
    explanation:
      "Explique que uma lista de passos que resolve um problema tem nome: algoritmo. Diga que o difícil não é saber fazer, é escrever de um jeito que outra pessoa consiga seguir.",
    investigation:
      "Em duplas, os alunos listam no papel os passos do sanduíche. Circule sem corrigir nada — os passos vagos são o material da aula.",
    construction:
      "Recolha as listas e monte uma sequência única no quadro, com a turma votando a ordem dos passos que aparecerem repetidos.",
    test:
      "Execute a sequência do quadro ao pé da letra, na frente da turma, sem completar nada. Pare em cada passo e faça exatamente o que está escrito.",
    debug:
      "Quando algo der errado, pergunte qual número do passo causou aquilo e o que faltava nele. Reescreva só aquele passo e execute de novo daquele ponto.",
    sharing:
      "Cada dupla lê em voz alta o passo que precisou de mais conserto e conta o que aprendeu a acrescentar.",
    assessment: [
      "O aluno acrescenta quantidade ou objeto a um passo vago sem que você peça",
      "Aponta o número do passo defeituoso em vez de dizer apenas que deu errado",
      "Consegue, no fim, ditar um passo completo de primeira",
    ],
    continuity: { label: "Sequência de movimentos", href: "/praticar/sequencia-de-movimentos" },
    relatedContent: [
      { label: "Conceito: sequência e instruções", href: "/aprender/sequencia-e-instrucoes" },
      { label: "Atividade: algoritmo do sanduíche", href: "/praticar/algoritmo-do-sanduiche" },
    ],
    image: null,
  },
  {
    id: "primeiro-caminho-no-tabuleiro",
    title: "O primeiro caminho no tabuleiro",
    theme: "Comandos no tabuleiro",
    objective:
      "Fazer a turma montar e executar o primeiro percurso do robô, separando o comando que anda do comando que só gira.",
    duration: 50,
    ageBands: ["2-3"],
    classSize: "16-30",
    level: "iniciante",
    concepts: ["sequencia-e-instrucoes", "algoritmos"],
    materials: ["tabuleiro", "cartoes"],
    needsComputer: false,
    needsMicrobit: false,
    needsBoard: true,
    preparation: [
      "Monte o tabuleiro e posicione o robô num canto, virado para uma direção combinada.",
      "Separe as peças AVANCE e VIRE em duas pilhas visíveis, e deixe as peças de repetição guardadas — elas não entram hoje.",
      "Decida antes onde vai ficar o baú, e deixe o caminho livre de obstáculos.",
    ],
    intro:
      "Reúna a turma em volta do tabuleiro e mostre o robô parado. Diga que ele não sabe onde está o baú e não vai procurar sozinho.",
    triggerQuestion:
      "Quantas casas separam o robô do baú? E como a gente diz isso para ele de um jeito que ele entenda?",
    explanation:
      "Mostre as duas peças. Execute um AVANCE e um VIRE na frente de todos, exagerando o giro sem sair da casa.",
    investigation:
      "Em grupos, os alunos contam as casas e decidem quantas peças de cada tipo vão precisar, antes de encostar no tabuleiro.",
    construction:
      "Cada grupo monta sua fila de peças na mesa, em ordem, e a mostra para a turma antes de executar.",
    test:
      "Execute a fila de um grupo por vez, uma peça de cada vez, com a turma contando em voz alta as casas percorridas.",
    debug:
      "Se o robô parar no lugar errado, pergunte em que peça a contagem se perdeu. Troque só aquela peça e execute de novo desde o começo.",
    sharing:
      "Compare no quadro o número de peças que cada grupo usou e pergunte se todos chegaram ao mesmo lugar.",
    assessment: [
      "O aluno conta as casas antes de escolher as peças",
      "Diferencia AVANCE de VIRE ao explicar o que cada um faz com o robô",
      "Prevê onde o robô vai parar antes de a fila ser executada",
    ],
    continuity: { label: "Simulador do tabuleiro", href: "/tabuleiro" },
    relatedContent: [
      { label: "Conceito: algoritmos", href: "/aprender/algoritmos" },
      { label: "Simulador do tabuleiro", href: "/tabuleiro" },
    ],
    image: null,
  },
  {
    id: "primeiro-icone-na-placa",
    title: "O primeiro ícone na placa",
    theme: "Saída visível no micro:bit",
    objective:
      "Apresentar entrada, processamento e saída fazendo a turma acender um desenho na matriz de LEDs.",
    duration: 50,
    ageBands: ["2-3"],
    classSize: "ate-15",
    level: "iniciante",
    concepts: ["entrada-processamento-e-saida"],
    materials: ["microbit", "computador"],
    needsComputer: true,
    needsMicrobit: true,
    needsBoard: false,
    preparation: [
      "Teste antes o envio de um programa para a placa; deixe uma placa já com um ícone gravado, para mostrar funcionando logo no início.",
      "Abra o editor de blocos em todas as máquinas antes de a turma entrar — instalar e abrir come metade da aula.",
      "Desenhe no quadro uma malha 5 por 5 vazia, para a turma projetar o ícone no papel antes de ir à tela.",
    ],
    intro:
      "Mostre a placa com um ícone já aceso e pergunte quem está mandando ela fazer isso.",
    triggerQuestion:
      "O que a placa recebeu para acender esse desenho, e o que ela devolveu?",
    explanation:
      "Nomeie as três partes: entrada é o que chega, processamento é o que ela faz, saída é o que a gente vê. Aponte cada uma na placa.",
    investigation:
      "Na malha do quadro e no papel, cada dupla desenha o ícone que quer acender, marcando quais dos 25 pontos ficam acesos.",
    construction:
      "As duplas montam o ícone no editor de blocos, copiando ponto a ponto o desenho do papel.",
    test:
      "Cada dupla envia o programa para a placa e compara o que acendeu com o desenho do papel.",
    debug:
      "Quando o desenho sair diferente, peça que apontem no papel qual ponto está errado e contem a linha e a coluna dele antes de mexer na tela.",
    sharing:
      "Faça uma volta com as placas acesas na mão e peça que cada dupla diga qual foi a parte mais difícil de acertar.",
    assessment: [
      "O aluno aponta entrada, processamento e saída na própria placa",
      "Localiza um LED errado pela linha e coluna, em vez de apontar com o dedo na tela",
      "Explica que a placa só faz o que foi enviado a ela",
    ],
    continuity: { label: "Área do BBC micro:bit", href: "/microbit" },
    relatedContent: [
      {
        label: "Conceito: entrada, processamento e saída",
        href: "/aprender/entrada-processamento-e-saida",
      },
    ],
    image: null,
  },
  {
    id: "robo-humano-e-depuracao",
    title: "Robô humano e a primeira depuração",
    theme: "Instruções precisas sem computador",
    objective:
      "Fazer a turma escrever uma sequência completa para um colega executar, e localizar o passo defeituoso quando ele falhar.",
    duration: 50,
    ageBands: ["4-5"],
    classSize: "16-30",
    level: "iniciante",
    concepts: ["sequencia-e-instrucoes", "teste-e-depuracao"],
    materials: ["fita-crepe", "papel-e-lapis"],
    needsComputer: false,
    needsMicrobit: false,
    needsBoard: false,
    preparation: [
      "Marque no chão, com fita-crepe, uma malha de 4 por 4 quadrados de cerca de 50 cm.",
      "Escreva no quadro os três comandos permitidos: ANDE UMA CASA, VIRE À DIREITA, VIRE À ESQUERDA.",
      "Separe um objeto para servir de alvo e defina o ponto de partida do robô humano.",
    ],
    intro:
      "Explique que um aluno será o robô e que ele não pode pensar, olhar em volta nem corrigir nada — só obedecer aos três comandos do quadro.",
    triggerQuestion:
      "Se o robô não pode olhar para o alvo, o que precisa estar escrito para ele chegar lá?",
    explanation:
      "Demonstre você mesmo os três comandos, girando o corpo sem tirar os pés do lugar para deixar claro que VIRE não anda.",
    investigation:
      "Em trios, os alunos contam as casas e discutem o percurso antes de escrever qualquer coisa. Dê três minutos cronometrados.",
    construction:
      "Cada trio escreve a lista completa e numerada, e a entrega antes de o robô começar. Nada pode ser acrescentado depois.",
    test:
      "O robô executa a lista inteira, um comando por vez, com a turma acompanhando o número de cada passo em voz alta.",
    debug:
      "Se o robô sair do caminho, o trio anota em que número isso aconteceu e reescreve só a partir dali — apagar a lista inteira não é permitido.",
    sharing:
      "Compare no quadro o tamanho das listas dos trios que chegaram, e pergunte por que elas são diferentes.",
    assessment: [
      "O trio numera a lista sem ser lembrado",
      "O aluno aponta o número do comando defeituoso antes de propor conserto",
      "Prevê corretamente para onde o robô vai olhar depois de um VIRE",
    ],
    continuity: { label: "Atividade: robô humano", href: "/praticar/robo-humano" },
    relatedContent: [
      { label: "Conceito: teste e depuração", href: "/aprender/teste-e-depuracao" },
      { label: "Atividade: robô humano", href: "/praticar/robo-humano" },
    ],
    image: null,
  },
  {
    id: "desafio-da-chave-e-do-bau",
    title: "O desafio da chave e do baú",
    theme: "Ordem obrigatória no tabuleiro",
    objective:
      "Mostrar que chegar ao lugar certo não basta quando existe uma dependência entre as subtarefas.",
    duration: 50,
    ageBands: ["4-5"],
    classSize: "16-30",
    level: "intermediario",
    concepts: ["decomposicao", "algoritmos"],
    materials: ["tabuleiro", "papel-e-lapis"],
    needsComputer: false,
    needsMicrobit: false,
    needsBoard: true,
    preparation: [
      "Monte o tabuleiro com a chave fora do caminho reto até o baú — se ela estiver no meio do percurso, a aula perde o efeito.",
      "Escreva num cartaz a regra: O BAÚ SÓ ABRE COM A CHAVE.",
      "Prepare folhas em branco para os grupos rascunharem o percurso antes de montar as peças.",
    ],
    intro:
      "Mostre o tabuleiro montado e leia a regra do cartaz em voz alta, sem explicar por que ela existe.",
    triggerQuestion:
      "Qual é o caminho mais curto até o baú? E esse caminho resolve o problema?",
    explanation:
      "Explique que a missão tem duas partes e que uma depende da outra. Não diga qual vem antes: peça que a turma decida.",
    investigation:
      "Os grupos rascunham no papel os dois trechos separadamente — primeiro até a chave, depois da chave ao baú.",
    construction:
      "Cada grupo monta a fila completa de peças, juntando os dois trechos rascunhados.",
    test:
      "Execute grupo a grupo. Quem chegar ao baú sem a chave para ali: a missão falhou, mesmo tendo chegado ao lugar certo.",
    debug:
      "Peça que os grupos que falharam comparem a própria lista com uma que funcionou, e apontem em que ponto as duas divergem.",
    sharing:
      "Pergunte à turma se existe alguma posição da chave em que a ordem deixaria de importar, e teste a proposta mais votada.",
    assessment: [
      "O grupo decide a ordem das duas subtarefas antes de montar as peças",
      "O aluno identifica que uma falha foi de ordem e não de contagem de casas",
      "Dá um exemplo próprio de duas tarefas em que a ordem muda o resultado",
    ],
    continuity: { label: "Atividade: caça ao tesouro", href: "/praticar/caca-ao-tesouro" },
    relatedContent: [
      { label: "Conceito: decomposição", href: "/aprender/decomposicao" },
      { label: "Simulador do tabuleiro", href: "/tabuleiro" },
    ],
    image: null,
  },
  {
    id: "botoes-que-respondem",
    title: "Botões que respondem",
    theme: "Entrada e saída no micro:bit",
    objective:
      "Programar a placa para reagir de formas diferentes a dois botões, tornando visível a relação entre entrada e saída.",
    duration: 50,
    ageBands: ["4-5"],
    classSize: "ate-15",
    level: "intermediario",
    concepts: ["entrada-processamento-e-saida", "sequencia-e-instrucoes"],
    materials: ["microbit", "computador"],
    needsComputer: true,
    needsMicrobit: true,
    needsBoard: false,
    preparation: [
      "Deixe o editor aberto em todas as máquinas e uma placa de demonstração já gravada com uma resposta ao botão A.",
      "Escreva no quadro a estrutura da aula em três colunas: ENTRADA, PROCESSAMENTO, SAÍDA.",
      "Combine com a turma a regra de manuseio da placa antes de distribuí-la.",
    ],
    intro:
      "Aperte o botão A da placa de demonstração e mostre a resposta. Aperte de novo e mostre que a resposta é sempre a mesma.",
    triggerQuestion:
      "Por que a placa faz sempre a mesma coisa quando aperto o mesmo botão? E se eu quiser que ela faça outra coisa?",
    explanation:
      "Preencha as três colunas do quadro com o exemplo da demonstração, nomeando cada parte.",
    investigation:
      "As duplas decidem no papel o que cada um dos dois botões deve fazer, escrevendo a resposta nas três colunas.",
    construction:
      "As duplas montam no editor os dois comportamentos e enviam para a placa.",
    test:
      "Cada dupla testa os dois botões e confere se a saída bate com o que estava escrito no papel.",
    debug:
      "Quando a placa responder diferente do previsto, peça que confiram primeiro qual bloco está ligado a qual botão — a troca entre A e B é o erro mais comum.",
    sharing:
      "Duas duplas trocam de placa e tentam descobrir, só apertando, o que a outra programou.",
    assessment: [
      "O aluno preenche as três colunas antes de programar",
      "Relaciona uma saída inesperada ao bloco de entrada correspondente",
      "Explica por que a mesma entrada gera sempre a mesma saída",
    ],
    continuity: { label: "Área do BBC micro:bit", href: "/microbit" },
    relatedContent: [
      {
        label: "Conceito: entrada, processamento e saída",
        href: "/aprender/entrada-processamento-e-saida",
      },
    ],
    image: null,
  },
  {
    id: "instrucoes-ambiguas-em-duplas",
    title: "Instruções ambíguas em duplas",
    theme: "Precisão na comunicação",
    objective:
      "Mostrar que uma instrução completa e na ordem certa ainda pode falhar por admitir mais de uma leitura.",
    duration: 30,
    ageBands: ["6-7"],
    classSize: "mais-de-30",
    level: "intermediario",
    concepts: ["teste-e-depuracao", "abstracao"],
    materials: ["papel-e-lapis"],
    needsComputer: false,
    needsMicrobit: false,
    needsBoard: false,
    preparation: [
      "Escolha uma instrução ambígua real da própria escola e escreva no quadro antes da aula, sem comentar que é ambígua.",
      "Prepare folhas em branco suficientes para toda a turma executar a instrução por escrito.",
      "Tenha em mãos uma segunda instrução ambígua, para a rodada rápida do final.",
    ],
    intro:
      "Peça que todos leiam a instrução do quadro e façam, por escrito, exatamente o que ela manda — sem conversar.",
    triggerQuestion:
      "Todos seguiram a mesma instrução. Por que os resultados são diferentes?",
    explanation:
      "Explique a diferença entre passo ausente, passo fora de ordem e passo ambíguo — os três falham, por motivos distintos.",
    investigation:
      "Em duplas, os alunos apontam qual parte da instrução admite duas leituras e escrevem as duas.",
    construction:
      "Cada dupla reescreve a instrução de modo que admita uma única leitura.",
    test:
      "Troque as versões reescritas entre duplas e peça que executem por escrito a versão recebida.",
    debug:
      "Onde ainda houver divergência, a dupla autora reescreve de novo — a ambiguidade residual é o achado mais interessante da aula.",
    sharing:
      "Leia em voz alta duas versões reescritas e peça que a turma vote em qual delas não sobra dúvida.",
    assessment: [
      "O aluno apresenta duas leituras possíveis do mesmo trecho",
      "Distingue passo ambíguo de passo ausente com um exemplo",
      "Reescreve uma instrução do cotidiano escolar sem ambiguidade",
    ],
    continuity: { label: "Atividade: instruções ambíguas", href: "/praticar/instrucoes-ambiguas" },
    relatedContent: [
      { label: "Conceito: abstração", href: "/aprender/abstracao" },
      { label: "Atividade: instruções ambíguas", href: "/praticar/instrucoes-ambiguas" },
    ],
    image: null,
  },
  {
    id: "economize-comandos-com-repeticao",
    title: "Economize comandos com repetição",
    theme: "Repetição e eficiência no tabuleiro",
    objective:
      "Levar a turma a reescrever um percurso já resolvido usando menos peças, e a comparar as duas versões.",
    duration: 50,
    ageBands: ["6-7"],
    classSize: "16-30",
    level: "intermediario",
    concepts: ["reconhecimento-de-padroes", "algoritmos"],
    materials: ["tabuleiro", "papel-e-lapis"],
    needsComputer: false,
    needsMicrobit: false,
    needsBoard: true,
    preparation: [
      "Monte um percurso com dois trechos retos longos, de pelo menos três casas cada — sem trechos repetidos não há o que economizar.",
      "Deixe as peças de repetição guardadas até a segunda metade da aula.",
      "Divida o quadro em duas colunas: SEM REPETIR e COM REPETIR.",
    ],
    intro:
      "Proponha o percurso e peça que os grupos o resolvam com as peças que já conhecem, sem pressa de economizar.",
    triggerQuestion:
      "Quantas peças vocês usaram? Alguém consegue chegar no mesmo lugar com menos?",
    explanation:
      "Apresente as peças de repetição com uma única regra: elas repetem o comando que vem logo depois delas.",
    investigation:
      "Os grupos procuram na própria lista os trechos com comandos iguais em seguida e os marcam no papel.",
    construction:
      "Cada grupo remonta o percurso usando as peças de repetição onde marcou.",
    test:
      "Execute as duas versões de um mesmo grupo, uma depois da outra, e peça que a turma observe se o robô faz algo diferente.",
    debug:
      "Se a versão curta falhar, quase sempre é porque a peça de repetição foi lida como se repetisse a fila inteira. Execute devagar para mostrar.",
    sharing:
      "Preencha as duas colunas do quadro com os números de cada grupo e discuta qual versão é mais fácil de mudar se o baú se mover.",
    assessment: [
      "O aluno localiza trechos repetidos antes de encaixar a peça de repetição",
      "Explica que as duas versões produzem o mesmo movimento",
      "Reconhece um caso em que repetir não compensa",
    ],
    continuity: { label: "Atividade: economize comandos", href: "/praticar/economize-comandos" },
    relatedContent: [
      {
        label: "Conceito: reconhecimento de padrões",
        href: "/aprender/reconhecimento-de-padroes",
      },
      { label: "Atividade: sequências repetidas", href: "/praticar/sequencias-repetidas" },
    ],
    image: null,
  },
  {
    id: "contador-de-pontos-com-variavel",
    title: "Contador de pontos com variável",
    theme: "Guardar um valor no micro:bit",
    objective:
      "Introduzir a ideia de variável construindo um contador que soma pontos a cada toque no botão.",
    duration: 50,
    ageBands: ["6-7"],
    classSize: "ate-15",
    level: "avancado",
    concepts: ["entrada-processamento-e-saida", "abstracao"],
    materials: ["microbit", "computador"],
    needsComputer: true,
    needsMicrobit: true,
    needsBoard: false,
    preparation: [
      "Grave uma placa de demonstração com o contador já funcionando, para mostrar o objetivo antes de construir.",
      "Deixe o editor aberto nas máquinas e teste o envio em pelo menos duas delas.",
      "Prepare no quadro uma caixa desenhada com a palavra PONTOS dentro — a variável precisa de uma imagem.",
    ],
    intro:
      "Aperte o botão da placa de demonstração várias vezes e mostre o número subindo na matriz.",
    triggerQuestion:
      "A placa está lembrando de quantas vezes eu apertei. Onde é que ela guarda isso?",
    explanation:
      "Aponte a caixa do quadro: uma variável é um lugar com nome onde a placa guarda um valor que pode mudar.",
    investigation:
      "As duplas escrevem no papel o que precisa acontecer com o valor de PONTOS a cada toque, e o que a placa deve mostrar depois.",
    construction:
      "As duplas criam a variável no editor, somam 1 a cada botão apertado e mandam mostrar o valor.",
    test:
      "Cada dupla aperta o botão cinco vezes e confere se o número mostrado é cinco.",
    debug:
      "Quando o número não subir, peça que confiram se a soma está dentro do bloco do botão ou fora dele — é onde quase todo erro mora.",
    sharing:
      "Proponha um desafio rápido: fazer o segundo botão zerar o contador. Quem conseguir mostra para a turma.",
    assessment: [
      "O aluno explica com palavras próprias o que a variável guarda",
      "Prevê o valor que vai aparecer antes de apertar o botão",
      "Localiza o erro pela posição do bloco de soma",
    ],
    continuity: { label: "Área do BBC micro:bit", href: "/microbit" },
    relatedContent: [
      { label: "Conceito: abstração", href: "/aprender/abstracao" },
      {
        label: "Conceito: entrada, processamento e saída",
        href: "/aprender/entrada-processamento-e-saida",
      },
    ],
    image: null,
  },
  {
    id: "decompondo-um-problema-real",
    title: "Decompondo um problema real da escola",
    theme: "Decomposição aplicada",
    objective:
      "Fazer a turma quebrar um problema real e grande da própria escola em partes que caibam numa proposta viável.",
    duration: 100,
    ageBands: ["8-9"],
    classSize: "16-30",
    level: "avancado",
    concepts: ["decomposicao", "abstracao", "o-que-e-pensamento-computacional"],
    materials: ["papel-e-lapis"],
    needsComputer: false,
    needsMicrobit: false,
    needsBoard: false,
    preparation: [
      "Escolha antes dois ou três problemas reais e verificáveis da escola: fila do recreio, descarte de lixo, uso das quadras.",
      "Prepare cartolinas ou folhas grandes, uma por grupo, para o mapa de partes.",
      "Reserve os últimos 20 minutos para apresentação — sem isso a aula não fecha.",
    ],
    intro:
      "Apresente os problemas escolhidos e diga que ao final da aula a turma vai ter uma proposta, não uma reclamação.",
    triggerQuestion:
      "Esse problema é grande demais para resolver de uma vez. Qual é a primeira decisão que precisa ser tomada?",
    explanation:
      "Explique que decompor é dividir até cada parte caber na mão de alguém, e que uma parte que ninguém sabe resolver ainda está grande demais.",
    investigation:
      "Os grupos escolhem um problema e listam as partes na cartolina, numerando-as na ordem em que precisariam ser resolvidas.",
    construction:
      "Cada grupo escolhe uma única parte e desenvolve uma proposta concreta para ela, com responsável e prazo.",
    test:
      "Grupos trocam cartolinas e apontam, na proposta do outro, alguma parte que ainda está grande demais.",
    debug:
      "Com base nos apontamentos recebidos, cada grupo divide de novo as partes marcadas e ajusta a proposta.",
    sharing:
      "Cada grupo apresenta em três minutos: o problema, o mapa de partes e a parte que escolheu resolver.",
    assessment: [
      "O grupo divide o problema em ao menos quatro partes ordenadas",
      "O aluno reconhece quando uma parte precisa ser dividida de novo",
      "A proposta final trata de uma parte, e não do problema inteiro",
    ],
    continuity: { label: "Conceito: abstração", href: "/aprender/abstracao" },
    relatedContent: [
      { label: "Conceito: decomposição", href: "/aprender/decomposicao" },
      { label: "Atividade: caça ao tesouro", href: "/praticar/caca-ao-tesouro" },
    ],
    image: null,
  },
  {
    id: "crie-o-desafio-da-turma",
    title: "Crie o desafio da turma",
    theme: "Projetar em vez de resolver",
    objective:
      "Inverter o papel do aluno: em vez de resolver um desafio, projetar um que tenha solução clara e ao menos uma armadilha.",
    duration: 100,
    ageBands: ["8-9"],
    classSize: "16-30",
    level: "avancado",
    concepts: ["algoritmos", "teste-e-depuracao", "abstracao"],
    materials: ["tabuleiro", "papel-e-lapis"],
    needsComputer: false,
    needsMicrobit: false,
    needsBoard: true,
    preparation: [
      "Deixe o tabuleiro livre e as peças todas disponíveis, incluindo as de repetição.",
      "Prepare fichas onde cada grupo registre o próprio desafio: posições, número mínimo de peças e a armadilha pretendida.",
      "Combine que todo desafio criado precisa ser resolvido pelo próprio grupo antes de ser passado adiante.",
    ],
    intro:
      "Diga que hoje ninguém vai receber desafio pronto: cada grupo cria o seu, e o critério de qualidade é o desafio do outro grupo ser difícil sem ser impossível.",
    triggerQuestion:
      "O que faz um desafio ser bom? O que faria ele ser injusto?",
    explanation:
      "Explique os dois requisitos: precisa ter pelo menos uma solução, e precisa ter um caminho que pareça funcionar e não funcione.",
    investigation:
      "Os grupos testam posições no tabuleiro procurando um cenário que satisfaça os dois requisitos.",
    construction:
      "Cada grupo registra o desafio na ficha, resolve o próprio cenário e anota o número mínimo de peças que encontrou.",
    test:
      "Os desafios circulam. Cada grupo resolve o de outro e anota quantas peças usou.",
    debug:
      "Quando um desafio se mostrar impossível, o grupo autor precisa descobrir por quê e corrigir o cenário — não a ficha.",
    sharing:
      "Compare, para cada desafio, o mínimo declarado pelo autor e o mínimo encontrado por quem resolveu. Quando não baterem, investigue junto com a turma.",
    assessment: [
      "O grupo prova que o próprio desafio tem solução antes de passá-lo adiante",
      "A armadilha projetada de fato engana pelo menos um grupo",
      "O aluno explica por que um cenário ficou impossível",
    ],
    continuity: { label: "Simulador do tabuleiro", href: "/tabuleiro" },
    relatedContent: [
      { label: "Conceito: teste e depuração", href: "/aprender/teste-e-depuracao" },
      { label: "Simulador do tabuleiro", href: "/tabuleiro" },
    ],
    image: null,
  },
  {
    id: "sensores-medindo-a-sala",
    title: "Sensores medindo a sala",
    theme: "Dados do mundo real no micro:bit",
    objective:
      "Usar os sensores da placa para coletar dados reais da sala e discutir o que os números representam.",
    duration: 100,
    ageBands: ["8-9"],
    classSize: "ate-15",
    level: "avancado",
    concepts: ["entrada-processamento-e-saida", "abstracao", "reconhecimento-de-padroes"],
    materials: ["microbit", "computador", "papel-e-lapis"],
    needsComputer: true,
    needsMicrobit: true,
    needsBoard: false,
    preparation: [
      "Teste antes qual sensor responde melhor no ambiente da sua sala: luminosidade costuma ser o mais confiável.",
      "Prepare uma tabela impressa para o registro das medições, com colunas para local, valor e horário.",
      "Escolha antes três pontos da escola bem diferentes entre si para as medições.",
    ],
    intro:
      "Mostre a placa exibindo um valor que muda quando você tapa o sensor com a mão.",
    triggerQuestion:
      "Esse número está medindo o quê, exatamente? E o que ele deixa de fora?",
    explanation:
      "Explique que o sensor traduz uma parte do mundo em número, e que essa tradução sempre descarta informação — o que é abstração em ação.",
    investigation:
      "As duplas montam o programa de leitura e medem os três pontos escolhidos, registrando na tabela.",
    construction:
      "Cada dupla organiza os dados coletados num gráfico simples no papel.",
    test:
      "Refaçam uma das medições em outro horário e comparem com o valor anterior.",
    debug:
      "Quando dois grupos medirem o mesmo ponto com valores muito diferentes, investiguem juntos o que mudou: posição da placa, sombra, horário.",
    sharing:
      "Cada dupla apresenta uma conclusão que os dados sustentam — e você pergunta se os dados realmente sustentam aquilo.",
    assessment: [
      "O aluno diz o que o sensor mede e o que ele ignora",
      "Percebe que a mesma medição pode variar por causa das condições",
      "Formula uma conclusão que os dados coletados de fato sustentam",
    ],
    continuity: { label: "Área do BBC micro:bit", href: "/microbit" },
    relatedContent: [
      { label: "Conceito: abstração", href: "/aprender/abstracao" },
      {
        label: "Conceito: reconhecimento de padrões",
        href: "/aprender/reconhecimento-de-padroes",
      },
    ],
    image: null,
  },
];

export const ADDITIONAL_LESSON_PLANS = generatedLessonPlans as unknown as LessonPlan[];

export const LESSON_PLANS: LessonPlan[] = [
  ...CORE_LESSON_PLANS,
  ...EXTRA_LESSON_PLANS,
  ...ADDITIONAL_LESSON_PLANS,
];

export function planoPorId(id: string): LessonPlan | undefined {
  return LESSON_PLANS.find((p) => p.id === id);
}
