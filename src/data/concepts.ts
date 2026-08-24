import type { DemoSpec } from "@/lib/demo/types";
import type { ImageSlot, Ref } from "./types";

/**
 * Os campos abaixo são as 13 perguntas obrigatórias do briefing, viradas em
 * tipo. São todos obrigatórios de propósito: um conceito que não responde
 * "como explico isso para a turma" não é publicável, e o compilador é quem
 * cobra isso — não a revisão humana.
 */
export type Concept = {
  id: string;
  order: number;
  title: string;
  willLearn: string;
  summary: string;
  whyTeacher: string;
  whyStudents: string;
  prerequisites: string[];
  everydayExample: string;
  howToExplain: string;
  demo: DemoSpec;
  classQuestion: string;
  quickActivity: Ref;
  assessment: string[];
  difficulties: string[];
  image: ImageSlot | null;
  next: Ref;
};

export const CONCEPTS: Concept[] = [
  {
    id: "o-que-e-pensamento-computacional",
    order: 1,
    title: "O que é pensamento computacional",
    willLearn: "Você vai entender por que pensamento computacional não é aula de informática.",
    summary:
      "Pensamento computacional é organizar um problema de um jeito que dê para resolver passo a passo. Ele acontece antes de qualquer máquina entrar na história — e é por isso que dá para ensinar sem computador nenhum.",
    whyTeacher:
      "Porque a maioria dos materiais de robótica começa pelo equipamento, e aí o professor que não tem kit acha que está fora. Você já ensina isso quando explica uma receita ou organiza uma fila: falta só nomear.",
    whyStudents:
      "Porque a habilidade que sobrevive à tecnologia não é apertar botão, é decompor um problema. O aluno que aprende a quebrar um problema em partes usa isso na prova de matemática, na redação e na vida.",
    prerequisites: [],
    everydayExample:
      "Você pede para um aluno buscar o apagador na sala ao lado. Ele precisa saber a ordem (sair, virar à direita, entrar), o que fazer se a porta estiver fechada, e como saber que terminou. Isso é um algoritmo com condição e critério de parada — sem nenhuma tela envolvida.",
    howToExplain:
      "Peça para a turma explicar como se amarra um cadarço, só com palavras, sem gestos. Alguém vai travar. Deixe travar: é justamente aí que fica claro que a gente sabe fazer sem saber descrever. Depois diga: 'transformar o que a gente sabe fazer em instruções que outra pessoa consegue seguir — isso é pensamento computacional'.",
    demo: {
      kind: "decompose",
      whole: "Amarrar o cadarço",
      parts: [
        "Segurar uma ponta em cada mão",
        "Cruzar as pontas e passar uma por baixo da outra",
        "Puxar as duas pontas para apertar",
        "Fazer uma alça com uma das pontas",
        "Enrolar a outra ponta em volta da alça",
        "Empurrar essa ponta pelo buraco e puxar",
      ],
    },
    classQuestion:
      "Se um robô seguisse ao pé da letra as instruções que vocês me deram, ele conseguiria amarrar o cadarço?",
    quickActivity: { label: "Algoritmo do sanduíche", href: "/praticar/algoritmo-do-sanduiche" },
    assessment: [
      "Consegue dividir uma tarefa do dia a dia em pelo menos quatro passos ordenados",
      "Percebe sozinho quando um passo que ele descreveu ficou vago demais para ser seguido",
      "Dá um exemplo próprio de algoritmo fora do computador, sem repetir o exemplo da aula",
    ],
    difficulties: [
      "A turma pula passos que considera óbvios — 'pega o pão' já assume abrir o pacote. É o erro mais comum e o mais produtivo.",
      "Alguns alunos acham que precisa de computador para valer, e desanimam quando a atividade é com papel.",
      "O professor tende a corrigir o passo vago em vez de deixar a consequência aparecer. A consequência ensina mais.",
    ],
    image: null,
    next: {
      label: "Por que ensinar pensamento computacional",
      href: "/aprender/por-que-ensinar-pensamento-computacional",
    },
  },

  {
    id: "por-que-ensinar-pensamento-computacional",
    order: 2,
    title: "Por que ensinar pensamento computacional",
    willLearn:
      "Você vai sair desta página com uma resposta pronta para quando perguntarem por que isso ocupa tempo de aula.",
    summary:
      "Pensamento computacional não é mais um conteúdo empilhado sobre os que já não cabem no ano. É o método que a turma já usa na divisão longa, na receita e no roteiro da redação, e que quase nunca é nomeado. Ensinar é dar nome e método ao que hoje o aluno acerta por sorte.",
    whyTeacher:
      "Porque em algum momento vão te perguntar — a coordenação, a família ou a própria turma — por que a aula de hoje foi com plaquinha de papel em vez de conteúdo. Ter a resposta pronta é o que evita que a atividade vire 'aula diferente' e depois suma do planejamento no bimestre seguinte.",
    whyStudents:
      "Porque o aluno que sabe que existe um método para atacar um problema desconhecido não trava na primeira leitura do enunciado. A distância entre 'não sei fazer' e 'ainda não separei as partes' aparece na prova, e é ela que separa quem tenta de quem entrega em branco.",
    prerequisites: ["o-que-e-pensamento-computacional"],
    everydayExample:
      "Na correção da divisão de 856 por 4, você repete a mesma cantilena em voz alta: divide, multiplica, subtrai, baixa o próximo. Repete de novo para o segundo algarismo, e de novo para o terceiro. Você acabou de ensinar um algoritmo com repetição — só não chamou assim, e por isso a turma não percebeu que aprendeu um método que serve para outras coisas.",
    howToExplain:
      "Escreva no quadro uma conta de dividir que a turma já sabe fazer e peça que ditem os passos enquanto você escreve, um por linha. Quando chegar no segundo algarismo, pare e pergunte: 'o que eu escrevo agora?'. Alguém vai dizer 'a mesma coisa'. Aí circule o bloco que se repete e feche: 'isso que vocês acabaram de reconhecer é o que a gente vai treinar o ano inteiro — achar a parte que se repete e não escrever ela de novo'.",
    demo: {
      kind: "pattern",
      // A divisão longa é o algoritmo com repetição que toda turma já executa
      // de cor. Usá-la aqui é o argumento inteiro do conceito virado em imagem.
      items: [
        "Quantos 4 cabem no 8?",
        "Multiplica 2 por 4 e escreve embaixo",
        "Subtrai e sobra 0",
        "Baixa o 5",
        "Quantos 4 cabem no 5?",
        "Multiplica 1 por 4 e escreve embaixo",
        "Subtrai e sobra 1",
        "Baixa o 6",
      ],
      patternIndexes: [4, 5, 6, 7],
    },
    classQuestion:
      "Se a divisão longa já é um algoritmo e vocês já sabem fazer, para que serve mais alguma aula sobre isso?",
    quickActivity: { label: "Programe o professor", href: "/praticar/programe-o-professor" },
    assessment: [
      "Aponta, num procedimento que a turma já sabe de cor, qual bloco de passos se repete",
      "Explica para um colega o que a conta de dividir e um caminho no tabuleiro têm em comum, sem usar a palavra 'robô'",
      "Dá um exemplo de outra matéria em que segue um método fixo, e diz qual passo se repete nele",
    ],
    difficulties: [
      "A turma responde 'é para aprender a mexer no computador' quando você pergunta para que serve. É a resposta que a propaganda ensinou, e ela volta o ano inteiro se você não confrontar na primeira aula.",
      "Colegas e coordenação pedem o produto visível — o robô andando — e não o raciocínio. Sem uma resposta pronta você cede, e a atividade vira demonstração de feira.",
      "O próprio professor duvida que valha o tempo enquanto não vê a transferência acontecer. Ela costuma aparecer primeiro em matemática, umas três semanas depois, e não na aula de robótica.",
    ],
    image: null,
    next: { label: "Sequência e instruções", href: "/aprender/sequencia-e-instrucoes" },
  },

  {
    id: "sequencia-e-instrucoes",
    order: 3,
    title: "Sequência e instruções",
    willLearn: "Você vai entender por que a ordem dos passos é conteúdo, e não detalhe de organização.",
    summary:
      "Uma instrução é um comando que não deixa margem para interpretação. Uma sequência é um conjunto de instruções em que a ordem faz parte do significado: trocar duas de lugar muda o resultado, mesmo que nenhuma delas esteja errada sozinha.",
    whyTeacher:
      "Porque 'está fora de ordem' é a correção mais comum e a menos útil que a gente dá. Quando você mostra para onde o robô foi parar por causa da troca, o aluno para de decorar a ordem certa e passa a raciocinar sobre a dependência entre os passos.",
    whyStudents:
      "Porque boa parte do erro de conta de dois algarismos, de experimento de ciências e de instrução de prova é erro de ordem, não de conhecimento. O aluno que aprende a perguntar 'este passo depende de qual?' revisa sozinho.",
    // Sequência é o primeiro conceito de mão na massa e não pressupõe nenhum
    // outro: dá para conduzir esta aula com uma turma que nunca ouviu o termo
    // pensamento computacional. Marcar um pré-requisito aqui seria só respeitar
    // a ordem da lista, e o teste de pré-requisitos existe justamente para
    // impedir que a ordem por acaso vire dependência declarada.
    prerequisites: [],
    everydayExample:
      "Você manda a turma guardar o material e sair para o intervalo. Um aluno sai antes de guardar, a mochila fica aberta na carteira e ele volta correndo no meio do lanche para arrumar. Ninguém errou nenhum dos dois passos: o que deu errado foi a ordem entre eles.",
    howToExplain:
      "Escolha três alunos e dê a cada um um cartão: 'ABRIR A PORTA', 'ANDAR ATÉ A PORTA', 'ATRAVESSAR A PORTA'. Peça que se coloquem em fila na ordem que acharem certa e execute exatamente o que a fila diz, sem consertar nada — se 'atravessar' vier antes de 'abrir', bata na porta fechada. Depois pergunte só isto: 'qual cartão precisa mudar de lugar?', e deixe que eles reordenem. Não diga a ordem certa em momento nenhum.",
    demo: {
      kind: "compare-order",
      // As duas filas têm exatamente as mesmas quatro peças. Só o lugar do VIRE
      // muda — e é o que faz o robô terminar em casas diferentes do tabuleiro.
      correct: ["AVANCE", "AVANCE", "VIRE_DIREITA", "AVANCE"],
      wrong: ["VIRE_DIREITA", "AVANCE", "AVANCE", "AVANCE"],
      grid: {
        linhas: 4,
        colunas: 4,
        robo: { linha: 3, coluna: 0 },
        direcaoInicial: "norte",
        chave: null,
        bau: { linha: 1, coluna: 1 },
        obstaculos: [],
      },
      explain:
        "São as mesmas quatro peças nas duas filas, nem uma a mais. Só o lugar do VIRE mudou, e o robô termina em dois cantos diferentes do tabuleiro.",
    },
    classQuestion:
      "Tem algum passo desta lista que poderia ir em mais de um lugar sem estragar o resultado?",
    quickActivity: { label: "Sequência de movimentos", href: "/praticar/sequencia-de-movimentos" },
    assessment: [
      "Reordena os cartões sem ajuda e explica por que aquele passo não podia vir antes",
      "Usa a palavra 'depende' ao justificar a ordem, em vez de 'é assim mesmo'",
      "Prevê em voz alta onde o robô vai parar antes de você rodar a fila errada, e acerta a previsão",
    ],
    difficulties: [
      "A turma acha que VIRE também anda uma casa. É o erro mais frequente do tabuleiro inteiro e ele resiste à explicação verbal: só cede quando um aluno vira o corpo sem sair do lugar.",
      "Quem já sabe a ordem certa responde antes dos outros e encerra a discussão. Combine que quem sabe só pode falar depois que a fila for executada.",
      "O professor conserta o passo vago no ar ('ele quis dizer abrir a porta'). Quando você completa, o erro não acontece — e a aula perde justamente a cena que ensina.",
    ],
    image: null,
    next: {
      label: "Entrada, processamento e saída",
      href: "/aprender/entrada-processamento-e-saida",
    },
  },
  {
    id: "entrada-processamento-e-saida",
    order: 4,
    title: "Entrada, processamento e saída",
    willLearn:
      "Você vai aprender a enxergar qualquer máquina — e qualquer tarefa — em três momentos.",
    summary:
      "Toda máquina recebe alguma coisa, faz alguma coisa com ela e devolve um resultado. Reconhecer esses três momentos é o que permite ao aluno entender um aparelho que ele nunca viu antes.",
    whyTeacher:
      "Porque é o modelo que explica sensor, botão e tela sem nenhum jargão. Quando a turma chegar ao micro:bit, você não vai precisar ensinar nada novo: vai só apontar onde está cada um dos três momentos.",
    whyStudents:
      "Porque tira a mágica da tecnologia. O aluno que enxerga entrada, processamento e saída para de achar que o aparelho adivinha, e passa a perguntar de onde veio a informação.",
    prerequisites: ["o-que-e-pensamento-computacional"],
    everydayExample:
      "A catraca do ônibus: o cartão encostado é a entrada, descontar a passagem é o processamento, e o bip com a luz verde é a saída. Se o cartão não tem saldo, o mesmo processamento produz outra saída — e é por isso que o bip é diferente.",
    howToExplain:
      "Escolha um aparelho que esteja na sala: o interruptor, o ventilador, o celular de vocês. Pergunte três coisas na ordem: 'o que ele recebe?', 'o que ele faz com isso?', 'o que ele devolve?'. Depois faça a mesma pergunta sobre um aluno resolvendo uma conta no caderno — as três respostas existem igual, e é aí que a turma percebe que o modelo não é sobre máquinas, é sobre tarefas.",
    demo: {
      kind: "io-flow",
      input: "Apertar o botão A",
      process: "Somar 1 ao número guardado",
      output: "Mostrar o número novo nos LEDs",
      ledPattern: [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
      ],
    },
    classQuestion:
      "Se a saída de um aparelho está errada, o problema está necessariamente nele — ou pode estar na entrada?",
    quickActivity: { label: "Programe o professor", href: "/praticar/programe-o-professor" },
    assessment: [
      "Aponta os três momentos em um aparelho que não foi usado como exemplo na aula",
      "Percebe que a mesma entrada pode gerar saídas diferentes quando o processamento muda",
      "Descreve uma tarefa da própria rotina nos três momentos, sem citar nenhuma máquina",
    ],
    difficulties: [
      "A turma confunde processamento com saída, porque os dois acontecem 'dentro' do aparelho aos olhos de quem está de fora. Ajuda perguntar o que dá para ver e o que não dá.",
      "Alguns alunos acham que o modelo só serve para eletrônicos. Insista num exemplo sem energia elétrica — um moedor de café, uma peneira — até a ficha cair.",
    ],
    image: null,
    next: { label: "Decomposição", href: "/aprender/decomposicao" },
  },
  {
    id: "decomposicao",
    order: 5,
    title: "Decomposição",
    willLearn: "Você vai aprender a quebrar um problema grande em partes que cabem na mão.",
    summary:
      "Decompor é dividir um problema em pedaços pequenos o bastante para resolver um de cada vez. Não é organizar por organizar: é o que transforma um problema que trava a turma em três problemas que ela sabe resolver.",
    whyTeacher:
      "Porque a maior parte do 'não consigo' da sala não é falta de conhecimento, é tamanho do problema. Quem aprende a dividir para de travar na primeira olhada.",
    whyStudents:
      "Porque é a habilidade que atravessa todas as matérias. Um problema de matemática, uma redação e um trabalho em grupo cedem ao mesmo movimento: separar em partes e atacar uma por vez.",
    prerequisites: ["o-que-e-pensamento-computacional"],
    everydayExample:
      "Organizar uma festa de aniversário parece impossível de pensar de uma vez. Mas 'quem convidar', 'o que comer' e 'onde vai ser' são três perguntas que qualquer criança responde separadamente — e juntas elas são a festa inteira.",
    howToExplain:
      "Peça para a turma planejar algo grande demais de propósito: uma viagem, uma feira de ciências. Deixe o silêncio acontecer. Depois pergunte 'qual é a primeira decisão que precisa ser tomada?' e vá anotando cada resposta como um item separado no quadro. Ao final, mostre a lista: o problema que ninguém sabia começar virou seis perguntas fáceis.",
    demo: {
      kind: "decompose",
      whole: "Fazer o robô sair da sala e voltar",
      parts: [
        "Sair da mesa até a porta",
        "Atravessar a porta sem bater no batente",
        "Ir até o ponto combinado no corredor",
        "Dar meia-volta",
        "Refazer o caminho de volta",
      ],
    },
    classQuestion:
      "Existe mais de um jeito certo de dividir este problema, ou só um? Como saberíamos?",
    quickActivity: { label: "Caça ao tesouro", href: "/praticar/caca-ao-tesouro" },
    assessment: [
      "Divide um problema novo em pelo menos três partes sem que você sugira os cortes",
      "Justifica por que uma parte precisa vir antes da outra, em vez de listar em ordem aleatória",
      "Percebe quando uma parte ainda está grande demais e a divide de novo, por conta própria",
    ],
    difficulties: [
      "A turma divide em partes desiguais: uma parte enorme e três minúsculas. Vale perguntar de cada item 'você conseguiria resolver isso agora?' — o que sobrar de 'não' precisa ser dividido.",
      "Alguns alunos dividem por assunto e não por ordem de execução, e depois não conseguem começar. Peça que numerem as partes: a numeração revela na hora se a divisão funciona.",
    ],
    image: null,
    next: { label: "Reconhecimento de padrões", href: "/aprender/reconhecimento-de-padroes" },
  },
  {
    id: "reconhecimento-de-padroes",
    order: 6,
    title: "Reconhecimento de padrões",
    willLearn: "Você vai aprender a enxergar o que se repete — e a economizar trabalho com isso.",
    summary:
      "Reconhecer padrões é perceber que partes diferentes de um problema são, na verdade, a mesma coisa aparecendo de novo. Quem enxerga isso resolve uma vez e reaproveita, em vez de recomeçar do zero a cada trecho.",
    whyTeacher:
      "Porque é a ponte natural para a repetição na programação. A peça REPITA não faz sentido para quem ainda não viu o que se repete — e faz todo sentido para quem viu.",
    whyStudents:
      "Porque padrão é o que permite prever. O aluno que reconhece a estrutura de um problema já resolvido gasta a energia no que é novo, não no que ele já sabe.",
    prerequisites: ["decomposicao"],
    everydayExample:
      "A rotina de sair de casa é a mesma toda manhã: calçar, mochila, chave, porta. Ninguém decide isso de novo todo dia — o padrão já está pronto, e é por isso que dá para fazer no automático enquanto se pensa em outra coisa.",
    howToExplain:
      "Escreva no quadro uma sequência com repetição clara: pula, pula, bate palma, pula, pula, bate palma. Peça para a turma continuar. Eles vão continuar certo, e aí você pergunta como sabiam — a resposta é o conceito. Depois pergunte quantas palavras seriam necessárias para explicar a sequência inteira a quem não a viu: 'repita duas vezes pular e bater palma' vence sempre.",
    demo: {
      kind: "pattern",
      items: [
        "Avance",
        "Avance",
        "Vire",
        "Avance",
        "Avance",
        "Vire",
        "Avance",
        "Avance",
        "Vire",
      ],
      patternIndexes: [0, 1, 2],
    },
    classQuestion:
      "Se um padrão se repete três vezes e na quarta muda um pouquinho, ainda é um padrão?",
    quickActivity: { label: "Sequências repetidas", href: "/praticar/sequencias-repetidas" },
    assessment: [
      "Aponta o trecho que se repete em uma sequência que ele está vendo pela primeira vez",
      "Descreve a sequência inteira usando menos palavras do que ela tem itens",
      "Percebe quando duas partes parecem iguais mas não são, e explica onde está a diferença",
    ],
    difficulties: [
      "A turma chama de padrão qualquer coisa parecida, mesmo quando não se repete de fato. Peça sempre que apontem onde começa e onde termina a repetição.",
      "Alguns alunos enxergam o padrão mas não confiam nele, e continuam conferindo item por item. Isso passa quando eles usam o padrão para prever e a previsão dá certo.",
    ],
    image: null,
    next: { label: "Abstração", href: "/aprender/abstracao" },
  },
  {
    id: "abstracao",
    order: 7,
    title: "Abstração",
    willLearn: "Você vai aprender a decidir o que ignorar — que é mais difícil do que parece.",
    summary:
      "Abstrair é deixar de fora tudo o que não importa para o problema que se está resolvendo. Nada se perde por acidente: cada detalhe descartado foi uma decisão.",
    whyTeacher:
      "Porque é o conceito que os alunos mais confundem com 'resumir'. Resumir encurta; abstrair escolhe o que é essencial para uma finalidade específica — e muda quando a finalidade muda.",
    whyStudents:
      "Porque é o que permite usar um mapa em vez de andar a cidade inteira. Saber o que ignorar é o que torna um problema grande pensável.",
    prerequisites: ["decomposicao", "reconhecimento-de-padroes"],
    everydayExample:
      "O mapa do metrô não mostra a distância real entre as estações, nem as curvas dos trilhos, nem as ruas por cima. Ele mente sobre a geografia de propósito — e é justamente por isso que funciona para quem só precisa saber onde baldear.",
    howToExplain:
      "Peça para dois alunos desenharem o caminho da escola até a padaria: um para alguém que vai a pé, outro para alguém que vai de bicicleta. Compare os dois desenhos. Vão ser diferentes, e nenhum está errado — cada um jogou fora o que não servia ao seu caso. Feche perguntando o que os dois jogaram fora igual.",
    demo: {
      kind: "pattern",
      items: [
        "Cor do robô",
        "Posição no tabuleiro",
        "Marca do adesivo",
        "Direção para onde olha",
        "Peso em gramas",
        "Se está com a chave",
      ],
      patternIndexes: [1, 3, 5],
    },
    classQuestion:
      "O que este tabuleiro deixou de fora do mundo real? E o que aconteceria se ele tentasse incluir tudo?",
    quickActivity: { label: "Robô humano", href: "/praticar/robo-humano" },
    assessment: [
      "Escolhe o que ignorar e explica a escolha pela finalidade, não por 'não é importante'",
      "Percebe que a mesma informação pode ser essencial num problema e descartável em outro",
      "Cria uma representação simplificada de algo da sala e defende o que ficou de fora",
    ],
    difficulties: [
      "A turma trata abstrair como resumir, e corta pelo tamanho em vez de cortar pela finalidade. Pergunte sempre 'para quem vai usar isso, essa informação muda alguma coisa?'.",
      "Alunos mais novos resistem a jogar informação fora, porque parece errado. Ajuda mostrar que o mapa do metrô mente e nem por isso engana ninguém.",
    ],
    image: null,
    next: { label: "Algoritmos", href: "/aprender/algoritmos" },
  },
  {
    id: "algoritmos",
    order: 8,
    title: "Algoritmos",
    willLearn:
      "Você vai aprender o que separa uma lista de passos qualquer de um algoritmo de verdade.",
    summary:
      "Um algoritmo é uma sequência de passos que resolve um problema e sempre termina. Todo algoritmo é uma sequência, mas nem toda sequência é um algoritmo — falta ter um objetivo e um fim.",
    whyTeacher:
      "Porque a palavra virou moda e perdeu o sentido. Ter uma definição firme evita que a turma chame qualquer lista de algoritmo, e é ela que sustenta a conversa sobre eficiência depois.",
    whyStudents:
      "Porque é o vocabulário com que eles vão falar de tecnologia pelo resto da vida. Saber o que a palavra significa é o que separa usar de entender.",
    prerequisites: ["sequencia-e-instrucoes", "decomposicao"],
    everydayExample:
      "Uma receita de bolo é um algoritmo: tem ingredientes de entrada, passos na ordem, e termina com o bolo pronto. Já 'dicas para cozinhar melhor' não é — é uma lista útil que não leva a lugar nenhum em particular.",
    howToExplain:
      "Escreva duas listas no quadro: os passos para trocar uma lâmpada e uma lista de conselhos sobre lâmpadas. Pergunte qual das duas um robô conseguiria seguir. A resposta vem rápido, e aí você fecha: algoritmo é a que tem ordem, objetivo e um momento em que acaba.",
    demo: {
      kind: "compare-order",
      correct: ["AVANCE", "AVANCE", "VIRE_DIREITA", "AVANCE", "AVANCE"],
      wrong: ["AVANCE", "AVANCE", "AVANCE", "AVANCE", "VIRE_DIREITA"],
      grid: {
        linhas: 5,
        colunas: 5,
        robo: { linha: 4, coluna: 0 },
        direcaoInicial: "norte",
        chave: null,
        bau: { linha: 2, coluna: 2 },
        obstaculos: [],
      },
      explain:
        "As duas filas têm as mesmas cinco peças. A de cima chega ao baú; a de baixo passa direto e para numa casa vazia — o mesmo conjunto de passos, e só uma delas é um algoritmo para este problema.",
    },
    classQuestion:
      "Se dois algoritmos diferentes resolvem o mesmo problema, dá para dizer que um é melhor que o outro?",
    quickActivity: { label: "Economize comandos", href: "/praticar/economize-comandos" },
    assessment: [
      "Distingue uma lista de passos de um algoritmo apontando o objetivo e o critério de parada",
      "Escreve um algoritmo próprio, para uma tarefa que ele escolheu, e outra pessoa consegue executá-lo",
      "Compara dois algoritmos que resolvem a mesma coisa e nomeia uma diferença concreta entre eles",
    ],
    difficulties: [
      "A turma esquece o critério de parada. Um algoritmo sem fim é o erro mais comum, e ele só aparece quando alguém tenta executar até o fim.",
      "Alguns alunos acham que existe um único algoritmo certo por problema. Mostrar duas soluções válidas com tamanhos diferentes resolve isso na hora.",
    ],
    image: null,
    next: { label: "Repetição", href: "/aprender/repeticao" },
  },

  {
    id: "repeticao",
    order: 9,
    title: "Repetição",
    willLearn:
      "Você vai entender por que dizer uma vez “faça isso quatro vezes” é diferente de escrever a mesma coisa quatro vezes.",
    summary:
      "Repetição é dizer uma única vez o que precisa acontecer várias. O que muda não é o que a máquina faz, é o tamanho do que você precisa escrever — e, junto com o tamanho, o que dá para enxergar.",
    whyTeacher:
      "Porque é onde o pensamento computacional deixa de ser organização e vira economia. Até aqui a turma aprendeu a escrever passos corretos; agora aprende que entre duas soluções corretas existe uma diferença que importa. E é o primeiro conceito que a turma reclama de aprender, porque a versão longa já funcionava.",
    whyStudents:
      "Porque o aluno que enxerga o que se repete escreve menos e erra menos: cada comando repetido à mão é uma chance a mais de errar um deles. Fora da tela, é a mesma habilidade de perceber que sete contas parecidas são uma conta com sete valores diferentes.",
    prerequisites: ["reconhecimento-de-padroes", "algoritmos"],
    everydayExample:
      "Uma receita não diz “mexa, mexa, mexa, mexa, mexa”. Diz “mexa por dois minutos”. Ninguém acha isso estranho na cozinha, e é exatamente a mesma compressão que a turma resiste a aceitar no algoritmo.",
    howToExplain:
      "Escreva no quadro oito vezes a palavra AVANCE, uma embaixo da outra, e pergunte se alguém quer copiar aquilo no caderno. Espere a reclamação — ela vem. Aí apague tudo e escreva “AVANCE ×8”. Diga: “o robô faz a mesma coisa nos dois casos; a diferença é o trabalho de quem escreve, e o de quem lê depois”.",
    demo: {
      kind: "loop-compress",
      longa: [
        "AVANCE",
        "AVANCE",
        "AVANCE",
        "AVANCE",
        "VIRE_DIREITA",
        "AVANCE",
        "AVANCE",
        "AVANCE",
        "AVANCE",
      ],
      curta: ["REPITA_4X", "AVANCE", "VIRE_DIREITA", "REPITA_4X", "AVANCE"],
      explain:
        "Nove peças viram cinco, e o robô percorre exatamente o mesmo caminho. A repetição não encurta o trajeto: encurta a descrição dele.",
    },
    classQuestion:
      "Se as duas filas levam o robô ao mesmo lugar, existe alguma razão para preferir a curta?",
    quickActivity: { label: "Sequências repetidas", href: "/praticar/sequencias-repetidas" },
    assessment: [
      "Identifica num algoritmo pronto qual trecho se repete e quantas vezes",
      "Reescreve uma sequência de comandos repetidos usando repetição, sem mudar o resultado",
      "Reconhece um caso em que usar repetição não vale a pena, e explica por quê",
    ],
    difficulties: [
      "A turma tenta repetir mais de um comando de uma vez. A peça REPITA do kit alcança só o comando seguinte, e descobrir isso executando ensina mais do que ouvir a regra antes.",
      "Alguém usa REPITA num trecho de um comando só e a fila fica maior. É o melhor momento da aula: mostra que a repetição é uma ferramenta, não uma obrigação.",
      "Depois de aprender, parte da turma passa a caçar o menor número de peças a qualquer custo e produz filas que ninguém consegue ler. Vale dizer em voz alta que menor nem sempre é melhor.",
    ],
    image: null,
    next: { label: "Teste e depuração", href: "/aprender/teste-e-depuracao" },
  },

  {
    id: "teste-e-depuracao",
    order: 10,
    title: "Teste e depuração",
    willLearn: "Você vai aprender a achar o erro em vez de recomeçar do zero.",
    summary:
      "Testar é executar para ver o que acontece; depurar é usar o que aconteceu para localizar onde está o defeito. As duas coisas juntas são o que transforma um erro em informação.",
    whyTeacher:
      "Porque a reação natural do aluno diante do erro é apagar tudo e começar de novo. Depurar é uma habilidade que se ensina, e ela economiza mais tempo de aula do que qualquer explicação.",
    whyStudents:
      "Porque errar é a parte normal do trabalho, não o fracasso dele. Quem sabe depurar para de ter medo de tentar.",
    prerequisites: ["algoritmos"],
    everydayExample:
      "Quando o controle remoto não funciona, ninguém compra outra televisão. Testa-se: aponta melhor, troca a pilha, tenta em outro cômodo. Cada tentativa elimina uma possibilidade — isso é depuração.",
    howToExplain:
      "Monte de propósito uma fila errada no simulador e execute na frente da turma, devagar. Pare no exato passo em que o robô sai do caminho e pergunte: 'o robô desobedeceu?'. A resposta é não — ele fez exatamente o que foi mandado. Feche dizendo que o erro está na instrução, e que por isso ele é achável.",
    demo: {
      kind: "compare-order",
      correct: ["AVANCE", "VIRE_DIREITA", "AVANCE", "AVANCE"],
      wrong: ["AVANCE", "AVANCE", "VIRE_DIREITA", "AVANCE"],
      grid: {
        linhas: 5,
        colunas: 5,
        robo: { linha: 4, coluna: 0 },
        direcaoInicial: "norte",
        chave: null,
        bau: { linha: 3, coluna: 2 },
        obstaculos: [{ linha: 2, coluna: 0 }],
      },
      explain:
        "A diferença entre as duas é um único passo de lugar. A de baixo bate no obstáculo — e o ponto exato em que ela bate é o que diz onde procurar o defeito.",
    },
    classQuestion:
      "Quando o robô faz algo errado, de quem é a culpa? Existe alguma situação em que a culpa é dele?",
    quickActivity: { label: "Encontre o erro", href: "/praticar/encontre-o-erro" },
    assessment: [
      "Executa passo a passo em vez de rodar tudo de uma vez quando alguma coisa deu errado",
      "Localiza o passo defeituoso antes de propor conserto, em vez de refazer a sequência inteira",
      "Explica o defeito dizendo o que o robô fez, não o que ele deveria ter feito",
    ],
    difficulties: [
      "A turma apaga tudo ao primeiro erro. Combine antes: quem apagar sem ter descoberto onde estava o problema precisa refazer o caminho todo de novo.",
      "Alunos culpam o robô ou o programa por 'estar bugado'. Executar em velocidade lenta, um passo por vez, desmonta essa explicação sozinho.",
    ],
    image: null,
    next: {
      label: "O erro como parte da aprendizagem",
      href: "/aprender/o-erro-como-parte-da-aprendizagem",
    },
  },
  {
    id: "o-erro-como-parte-da-aprendizagem",
    order: 11,
    title: "O erro como parte da aprendizagem",
    willLearn:
      "Você vai aprender a conduzir a aula de um jeito que o erro seja bem-vindo — e produtivo.",
    summary:
      "Em pensamento computacional o erro não é o oposto do acerto: é o caminho até ele. A diferença entre uma turma que trava e uma que avança está em como o professor reage ao primeiro erro da aula.",
    whyTeacher:
      "Porque é o único conceito desta lista que depende inteiramente de você. Os outros nove o aluno aprende fazendo; este ele aprende observando como você trata o erro dele.",
    whyStudents:
      "Porque o medo de errar é o que impede de tentar. Numa atividade em que errar é seguro, o aluno testa mais — e quem testa mais aprende mais rápido.",
    prerequisites: ["teste-e-depuracao"],
    everydayExample:
      "Ninguém aprendeu a andar de bicicleta sem cair. Os tombos não foram falhas do processo: foram o processo. Ninguém pensa em 'aprender a cair menos' — pensa em pedalar de novo.",
    howToExplain:
      "Erre de propósito na frente da turma, sem avisar, e reaja em voz alta: 'ó, deu errado. Que bom, agora dá para descobrir por quê'. Repita esse tom nos erros dos alunos durante a aula inteira. O conceito não se ensina falando dele — se ensina pelo que a turma vê você fazer quando algo dá errado.",
    demo: {
      kind: "led-matrix",
      frames: [
        [
          [0, 0, 0, 0, 0],
          [0, 1, 0, 1, 0],
          [0, 0, 0, 0, 0],
          [1, 0, 0, 0, 1],
          [0, 1, 1, 1, 0],
        ],
        [
          [0, 0, 0, 0, 0],
          [0, 1, 0, 1, 0],
          [0, 0, 0, 0, 0],
          [0, 1, 1, 1, 0],
          [0, 0, 0, 0, 0],
        ],
        [
          [0, 0, 0, 0, 0],
          [0, 1, 0, 1, 0],
          [0, 0, 0, 0, 0],
          [0, 1, 1, 1, 0],
          [1, 0, 0, 0, 1],
        ],
      ],
      caption:
        "A mesma carinha em três tentativas. Nenhuma delas é a versão final — a última só existe porque as duas anteriores foram testadas.",
    },
    classQuestion:
      "Qual foi o erro mais útil que aconteceu nesta aula? O que ele ensinou que o acerto não teria ensinado?",
    quickActivity: { label: "Instruções ambíguas", href: "/praticar/instrucoes-ambiguas" },
    assessment: [
      "Continua tentando depois de errar, sem pedir para você dar a resposta",
      "Conta o próprio erro para a turma sem constrangimento, quando você pergunta o que deu errado",
      "Aponta o erro de um colega descrevendo o passo, e não a pessoa",
    ],
    difficulties: [
      "A turma ri do erro de quem tentou. Corte na primeira vez, e nomeie o motivo: quem errou avançou a aula de todo mundo.",
      "O professor, sem perceber, celebra só o acerto rápido. Quando isso acontece, os alunos aprendem que o certo é acertar de primeira — e param de arriscar.",
      "Alunos que erram muito no começo se convencem de que não levam jeito. Vale mostrar a eles, no fim, quantas tentativas o resultado final custou.",
    ],
    image: null,
    next: { label: "Ir para as atividades", href: "/praticar" },
  },
];

/** Busca por id, usada pelas rotas dinâmicas e pelo teste de pré-requisitos. */
export function conceitoPorId(id: string): Concept | undefined {
  return CONCEPTS.find((c) => c.id === id);
}
