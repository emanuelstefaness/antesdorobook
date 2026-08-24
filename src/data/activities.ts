import type { CommandType, GridSpec } from "@/lib/board/types";
import type { AlgoritmoComDefeito } from "@/lib/engines/bughunt";
import type { PassoOrdenavel } from "@/lib/engines/sequence";
import type { AgeBand, Duration, ImageSlot, Material, Ref } from "./types";

/**
 * Nenhuma atividade traz componente novo: cada uma é uma configuração de um
 * dos motores da Etapa 3. Se um dia uma atividade não couber em nenhuma
 * variante, isso é sinal de motor faltando — não de exceção a abrir aqui.
 */
export type EngineConfig =
  | {
      motor: "command-runner";
      grid: GridSpec;
      minimo: number | null;
      permitidos: CommandType[];
      solucaoMinima: CommandType[];
      rotulos?: Partial<Record<CommandType, string>>;
    }
  | {
      motor: "loop-optimizer";
      grid: GridSpec;
      minimo: number;
      permitidos: CommandType[];
      solucaoMinima: CommandType[];
      rotulos?: Partial<Record<CommandType, string>>;
    }
  | { motor: "sequence-builder"; passos: PassoOrdenavel[]; semente: number; tituloDoPalco: string }
  | { motor: "bug-hunt"; algoritmo: AlgoritmoComDefeito };

export type Activity = {
  id: string;
  level: 1 | 2 | 3 | 4;
  levelName: string;
  title: string;
  summary: string;
  engine: EngineConfig;
  objective: string;
  whyApply: string;
  duration: Duration;
  ageBands: AgeBand[];
  materials: Material[];
  preparation: string;
  opening: string;
  steps: string[];
  mediatingQuestions: string[];
  difficulties: string[];
  adaptations: string[];
  assessment: string[];
  continuity: Ref;
  image: ImageSlot | null;
  relatedConcept: Ref;
};

/** O nome que aparece na tela para cada nível. Um só lugar, para não divergir. */
export const NOMES_DOS_NIVEIS: Record<1 | 2 | 3 | 4, string> = {
  1: "Sequência",
  2: "Comandos",
  3: "Repetição",
  4: "Depuração",
};

const BASICOS: CommandType[] = ["AVANCE", "VIRE_DIREITA", "VIRE_ESQUERDA"];
const COM_REPETICAO: CommandType[] = [...BASICOS, "REPITA_2X", "REPITA_3X", "REPITA_4X"];

export const ACTIVITIES: Activity[] = [
  {
    id: "algoritmo-do-sanduiche",
    level: 1,
    levelName: NOMES_DOS_NIVEIS[1],
    title: "O algoritmo do sanduíche",
    summary:
      "A turma dita o passo a passo de fazer um sanduíche e você executa ao pé da letra, sem completar nada por conta própria. Onde o algoritmo falha, a sala descobre sozinha o que é uma instrução incompleta.",
    engine: {
      motor: "sequence-builder",
      // Seis passos, e não os quatro da bancada de motores: aqui entram lavar as
      // mãos e abrir o pote, que são justamente os passos que a turma pula. O
      // professor que já experimentou a bancada não reencontra o mesmo exercício.
      passos: [
        {
          id: "lavar-as-maos",
          texto: "Lavar as mãos e secar",
          porque:
            "Todo o resto envolve tocar na comida. Lavar depois de montar não desfaz o que já foi tocado.",
        },
        {
          id: "abrir-o-pacote",
          texto: "Abrir o pacote de pão",
          porque: "As fatias estão dentro do pacote fechado: sem abrir, não há o que pegar.",
        },
        {
          id: "separar-fatias",
          texto: "Separar duas fatias de pão no prato",
          porque:
            "É preciso ter as duas fatias fora do pacote antes de decidir o que fazer com o recheio.",
        },
        {
          id: "abrir-o-pote",
          texto: "Abrir o pote de recheio",
          porque:
            "A faca não entra no pote fechado. Este é o passo que quase toda turma esquece de ditar.",
        },
        {
          id: "passar-recheio",
          texto: "Passar o recheio numa das fatias",
          porque: "O recheio vai na fatia ainda aberta; depois de fechar, não dá mais.",
        },
        {
          id: "fechar",
          texto: "Fechar com a outra fatia",
          porque:
            "Fechar é o que transforma duas fatias soltas em sanduíche, e só faz sentido no fim.",
        },
      ],
      semente: 23,
      tituloDoPalco: "Coloque os seis passos na ordem que funciona",
    },
    objective:
      "Fazer a turma perceber que uma sequência de instruções só funciona se nenhum passo for pulado e nenhum for invertido — e que o que é óbvio para uma pessoa não é óbvio para quem só executa.",
    whyApply:
      "É a atividade de entrada da formação inteira: não exige nenhum conceito anterior, roda com o que já existe na cozinha da escola e produz, em cinco minutos, a cena que o professor vai citar o ano todo. Depois dela, a palavra 'algoritmo' já tem uma lembrança colada nela.",
    duration: 30,
    ageBands: ["2-3", "4-5", "6-7"],
    materials: ["cartoes", "papel-e-lapis"],
    preparation:
      "Leve 1 pacote de pão de forma lacrado, 1 pote de requeijão lacrado, 1 faca sem ponta, 1 prato, 1 rolo de papel toalha e 1 saco de lixo. Corte 6 cartões A5 em branco por dupla (turma de 30 alunos = 15 duplas = 90 cartões) e leve 15 canetinhas. Guarde tudo dentro de uma sacola fechada, embaixo da sua mesa: os itens não podem estar à vista antes da hora, senão a turma começa a resolver antes de ser desafiada.",
    opening:
      "Leia em voz alta: “Hoje vocês vão me programar. A partir de agora eu sou uma máquina: eu faço exatamente o que vocês mandarem, nem mais, nem menos, nem na ordem que eu achar melhor. Se vocês esquecerem de mandar eu abrir o pacote, eu não abro sozinha — e o sanduíche não sai. Quem me dá o primeiro comando?”",
    steps: [
      "Minutos 0 a 3: tire a sacola de baixo da mesa e disponha os itens ainda lacrados, em silêncio. Não explique o que é cada coisa. O lacre é o que vai gerar o erro produtivo — não abra nada por conta própria em nenhum momento da aula.",
      "Minutos 3 a 10: peça o primeiro comando e execute literalmente. Se alguém disser “pega o pão”, segure o pacote fechado com as duas mãos e pare, sem comentar. Continue aceitando comandos e executando ao pé da letra até a turma travar. Não corrija, não levante a sobrancelha: deixe o silêncio fazer o trabalho.",
      "Minutos 10 a 14: quando a sala perceber o problema, pare a execução e pergunte o que faltou. Anote no quadro, na ordem em que a turma ditou, a lista de comandos que ela deu. A lista errada precisa ficar visível — é dela que sai a comparação.",
      "Minutos 14 a 22: distribua 6 cartões e 1 canetinha por dupla. Cada dupla escreve um passo por cartão e organiza os seis na carteira, na ordem que faz o sanduíche sair. Circule pelas carteiras sem apontar erro; use as perguntas mediadoras.",
      "Minutos 22 a 27: escolha duas duplas com ordens diferentes e execute as duas, uma de cada vez, com o material de verdade. Pare no exato passo em que a ordem quebra e pergunte à autora o que ela mudaria.",
      "Minutos 27 a 30: monte no quadro a versão final combinada pela turma e faça o sanduíche seguindo só ela. Feche dizendo que essa lista tem um nome: algoritmo. Distribua o sanduíche cortado ou descarte no saco de lixo, conforme a regra da escola.",
    ],
    mediatingQuestions: [
      "Eu fiz exatamente o que você me mandou. Por que não deu certo?",
      "Se eu nunca tivesse visto um sanduíche na vida, este passo bastaria para eu saber o que fazer?",
      "Tem algum passo aqui que só funciona se outro tiver acontecido antes? Qual?",
      "Se eu trocar estes dois cartões de lugar, o que acontece com o sanduíche?",
      "Vocês conseguiriam fazer esse sanduíche com um cartão a menos? Qual dá para tirar sem quebrar tudo?",
    ],
    difficulties: [
      "A turma acha que você está brincando de ser boba e ri, em vez de investigar. Se isso acontecer, pare de atuar e apenas execute com cara séria: o humor some quando o erro custa tempo.",
      "Alguns alunos ditam vários comandos de uma vez (“abre, pega e passa”). Execute só o primeiro e fique parada: um comando por vez é a regra que faz a atividade funcionar.",
      "As duplas escrevem passos grandes demais num cartão só (“montar o sanduíche”). É o erro mais comum e o mais útil — peça para essa dupla executar o próprio cartão e ver quantas coisas diferentes ele esconde.",
      "O professor cede e abre o pacote sozinho para a aula andar. Assim que isso acontece, a atividade perde o sentido, porque a máquina passou a adivinhar.",
    ],
    adaptations: [
      "Turma muito nova (2º e 3º ano): substitua a escrita nos cartões por desenho. Cada dupla desenha o passo em vez de escrever, e você lê o desenho em voz alta antes de executar.",
      "Turma grande (mais de 30): forme trios em vez de duplas e faça a execução final com apenas três trios sorteados, não com todos. O resto compara a própria lista com a do trio sorteado e anota a diferença no verso do cartão.",
      "Sem material nenhum: use um objeto que já esteja na sala — apontar o lápis, amarrar o cadarço, guardar o material na mochila. A regra continua a mesma: você executa ao pé da letra e não completa nada. Os cartões viram linhas numeradas no caderno.",
    ],
    assessment: [
      "A dupla reordena os seis cartões sem ajuda e consegue dizer, apontando, qual passo depende de qual.",
      "O aluno interrompe um colega para acrescentar um passo que ficou faltando, antes de você executar.",
      "Ao final, alguém dá um exemplo próprio de sequência que quebraria se fosse invertida (vestir a meia depois do sapato, por exemplo), sem que você tenha pedido.",
    ],
    continuity: {
      label: "Sequência de movimentos",
      href: "/praticar/sequencia-de-movimentos",
    },
    image: {
      src: "praticar/algoritmo-do-sanduiche.jpg",
      alt: "Uma professora segura uma fatia de pão em cada mão, paradas no ar. Sobre a mesa, o pote de recheio ainda fechado e a faca sem uso: os passos que ninguém mandou executar.",
    },
    relatedConcept: {
      label: "O que é pensamento computacional",
      href: "/aprender/o-que-e-pensamento-computacional",
    },
  },
  {
    id: "sequencia-de-movimentos",
    level: 1,
    levelName: NOMES_DOS_NIVEIS[1],
    title: "Sequência de movimentos",
    summary:
      "Cinco cartões descrevem os movimentos de sair da carteira e apagar a luz da sala. A turma descobre que a ordem não é opinião: virar depois de andar leva o corpo para a parede.",
    engine: {
      motor: "sequence-builder",
      passos: [
        {
          id: "levantar",
          texto: "Levantar da cadeira",
          porque: "Nenhum passo seguinte acontece com o corpo ainda sentado.",
        },
        {
          id: "empurrar-cadeira",
          texto: "Empurrar a cadeira para debaixo da mesa",
          porque:
            "Com a cadeira no meio do corredor, o primeiro passo à frente esbarra nela — e o esbarrão é visível para a turma inteira.",
        },
        {
          id: "virar-para-a-porta",
          texto: "Virar o corpo de frente para a porta",
          porque:
            "Virar decide o rumo dos passos seguintes. Andar antes de virar leva o corpo para a parede lateral, não para a porta.",
        },
        {
          id: "andar-ate-a-porta",
          texto: "Dar passos até chegar ao lado da porta",
          porque: "Só depois de estar de frente é que os passos terminam na porta.",
        },
        {
          id: "apagar-a-luz",
          texto: "Apertar o interruptor ao lado da porta",
          porque:
            "O interruptor está na parede da porta: de longe, o braço não alcança. Chegar perto é pré-requisito de apertar.",
        },
      ],
      semente: 47,
      tituloDoPalco: "Ordene os cinco movimentos até o interruptor",
    },
    objective:
      "Mostrar que uma sequência de movimentos tem dependências físicas verificáveis: dá para provar que a ordem está errada olhando para onde o corpo parou, sem precisar da opinião do professor.",
    whyApply:
      "É a ponte entre o algoritmo escrito no papel e o corpo no espaço, que é o terreno das atividades de comando do nível 2. Aqui o erro deixa de ser abstrato: a turma vê o colega bater na cadeira e entende que a instrução, não a pessoa, estava errada.",
    duration: 30,
    ageBands: ["2-3", "4-5"],
    materials: ["cartoes", "fita-crepe"],
    preparation:
      "Escreva 5 cartões A5, um movimento por cartão, em 6 jogos diferentes (30 cartões no total) — assim seis grupos trabalham ao mesmo tempo. Leve 1 rolo de fita crepe e marque, antes da aula, uma linha de partida no chão perto da sua mesa e um X na frente do interruptor. Confira se o interruptor da sala está ao alcance da mão de uma criança; se não estiver, troque o destino por “tocar na maçaneta da porta” e reescreva o quinto cartão.",
    opening:
      "Leia em voz alta: “Vocês vão montar os movimentos que levam uma pessoa daqui até o interruptor. Parece fácil, mas tem uma pegadinha: eu vou executar exatamente a ordem que vocês montarem, e não vou desviar de nada. Se a ordem estiver errada, eu vou bater na cadeira. E não vai ser culpa minha — vai ser da ordem.”",
    steps: [
      "Minutos 0 a 4: coloque uma cadeira no meio do corredor central, entre a sua mesa e a porta, e deixe a turma ver. Explique a regra única: você anda só quando um cartão mandar, e para quando alguma coisa impede.",
      "Minutos 4 a 12: divida a turma em 6 grupos e entregue 1 jogo de 5 cartões para cada. Cada grupo monta a ordem sobre a carteira, sem levantar. Circule usando as perguntas mediadoras; não diga se está certo.",
      "Minutos 12 a 22: chame um grupo de cada vez para ler sua ordem enquanto você executa, começando na linha de fita. Quando a ordem estiver errada, execute mesmo assim até bater na cadeira ou parar de frente para a parede — e pare ali, sem corrigir. Pergunte ao grupo o que mudar e execute de novo com a correção.",
      "Minutos 22 a 27: escreva no quadro as duas ordens que mais apareceram e pergunte à turma qual das duas funciona. Peça que alguém justifique apontando o movimento que depende do anterior.",
      "Minutos 27 a 30: peça que cada aluno escreva no caderno uma sequência de 5 movimentos de casa (escovar os dentes, arrumar a cama, servir água) e sublinhe o passo que não pode mudar de lugar. Recolha na aula seguinte.",
    ],
    mediatingQuestions: [
      "Se eu andar primeiro e virar depois, onde eu vou parar?",
      "Qual desses cartões pode trocar de lugar sem estragar nada? Por que só esse?",
      "O que este cartão está supondo que já aconteceu?",
      "Eu bati na cadeira. O erro foi meu ou foi da ordem que vocês montaram?",
      "Se a porta estivesse do outro lado da sala, quais cartões mudariam de lugar?",
    ],
    difficulties: [
      "A turma acha que virar já anda uma casa e monta a ordem contando o giro como passo. É o mesmo mal-entendido que vai reaparecer no tabuleiro do nível 2 — nomeie agora: “virar não anda, virar só muda para onde eu olho”.",
      "Alguns grupos montam a ordem certa por sorte e não sabem explicar. Peça para eles trocarem dois cartões de propósito e preverem o que vai acontecer antes de você executar.",
      "Quando você bate na cadeira, a turma ri e o grupo autor fica constrangido. Antecipe isso na abertura dizendo que o erro é da ordem, não de quem montou — e repita a frase na primeira vez que acontecer.",
      "Sobra tempo morto para os grupos que já terminaram. Tenha um sexto cartão em branco na mão: peça que escrevam um movimento novo que caiba no meio da sequência.",
    ],
    adaptations: [
      "Turma muito nova (2º e 3º ano): reduza para 3 cartões (levantar, virar, andar) e execute você mesma todas as ordens, uma por grupo, sem a etapa de escrita no caderno.",
      "Turma grande (mais de 30): monte 10 grupos e, em vez de executar a ordem de todos, sorteie 4 para a execução ao vivo. Os demais conferem a própria ordem contra a que funcionou e escrevem no verso do cartão a diferença que encontraram.",
      "Sem material nenhum: dispense os cartões e faça a sequência oralmente, com cinco alunos em pé na frente da sala segurando um movimento cada um na cabeça. A turma pede que eles se reorganizem em fila até a ordem funcionar — os corpos viram os cartões.",
    ],
    assessment: [
      "O grupo prevê em voz alta onde o professor vai parar antes de a execução acontecer, e acerta.",
      "O aluno aponta o cartão “virar” como o que decide o rumo, e não apenas como mais um passo da lista.",
      "Na tarefa final, o aluno sublinha um passo com dependência real (por exemplo, molhar a escova antes de escovar) e escreve por que ele não pode mudar de lugar.",
    ],
    continuity: {
      label: "Desenho por comandos",
      href: "/praticar/desenho-por-comandos",
    },
    image: {
      src: "praticar/sequencia-de-movimentos.jpg",
      alt: "Cinco cartões brancos em fila sobre a mesa, com símbolos desenhados à mão: seta para cima, seta curva para a direita, quadrado, seta para cima e círculo. Uma mão levanta o cartão do meio para trocá-lo de lugar.",
    },
    relatedConcept: {
      label: "Sequência e instruções",
      href: "/aprender/sequencia-e-instrucoes",
    },
  },
  {
    id: "desenho-por-comandos",
    level: 1,
    levelName: NOMES_DOS_NIVEIS[1],
    title: "Desenho por comandos",
    summary:
      "As peças do tabuleiro mudam de nome e viram comandos de desenho: em vez de andar, o lápis risca. A turma escreve o algoritmo de uma figura e outra dupla desenha sem ver o original.",
    engine: {
      // Renomear as peças é o ponto da atividade: mostra que o mesmo motor de
      // sequência serve a qualquer domínio, e desarma o professor que acha que
      // "comando" é assunto de robô.
      motor: "command-runner",
      grid: {
        linhas: 5,
        colunas: 5,
        robo: { linha: 4, coluna: 0 },
        direcaoInicial: "leste",
        chave: null,
        bau: { linha: 0, coluna: 4 },
        obstaculos: [],
      },
      minimo: 9,
      permitidos: BASICOS,
      solucaoMinima: [
        "AVANCE",
        "AVANCE",
        "AVANCE",
        "AVANCE",
        "VIRE_ESQUERDA",
        "AVANCE",
        "AVANCE",
        "AVANCE",
        "AVANCE",
      ],
      rotulos: {
        AVANCE: "RISQUE UMA CASA",
        VIRE_DIREITA: "GIRE O LÁPIS À DIREITA",
        VIRE_ESQUERDA: "GIRE O LÁPIS À ESQUERDA",
      },
    },
    objective:
      "Fazer a turma escrever um algoritmo cujo resultado é visível no papel, e comparar o desenho previsto com o desenho obtido — a primeira experiência de conferir a própria previsão.",
    whyApply:
      "Desenho é a linguagem em que a turma de Fundamental I já é fluente, e ditar um desenho é a maneira mais rápida de descobrir que a própria descrição era vaga. Além disso, esta é a atividade que tira o pensamento computacional da aula de ciências e o coloca na de artes.",
    duration: 50,
    ageBands: ["4-5", "6-7"],
    materials: ["papel-e-lapis", "cartoes"],
    preparation:
      "Imprima ou desenhe à mão 15 folhas quadriculadas com uma malha 5 por 5 de quadrados grandes (2 cm de lado), uma por dupla. Prepare 3 figuras-modelo simples numa malha igual — um L, uma escada de três degraus e um retângulo — em 5 cópias cada, dobradas ao meio para não vazarem. Leve 15 lápis e 15 borrachas. Escreva no quadro, antes de a turma entrar, os três comandos disponíveis: RISQUE UMA CASA, GIRE O LÁPIS À DIREITA, GIRE O LÁPIS À ESQUERDA.",
    opening:
      "Leia em voz alta: “Vocês só têm três comandos hoje, e nenhum deles é ‘desenhe um quadrado’. Vocês têm ‘risque uma casa’, ‘gire à direita’ e ‘gire à esquerda’. Com esses três, dá para escrever qualquer figura que caiba nessa malha. A parte difícil não é desenhar: é escrever de um jeito que outra pessoa consiga desenhar igual sem ver o seu papel.”",
    steps: [
      "Minutos 0 a 6: mostre a malha no quadro e execute um exemplo curto com a turma dizendo os comandos em voz alta — três riscos, um giro à direita, dois riscos. Desenhe exatamente o que for dito, inclusive se der errado.",
      "Minutos 6 a 12: entregue 1 folha quadriculada e 1 lápis por dupla. Cada dupla recebe uma das três figuras-modelo, dobrada, e não pode mostrá-la a ninguém.",
      "Minutos 12 a 25: cada dupla escreve a lista de comandos que reproduz a figura recebida, numerando cada comando. Circule cobrando numeração; lista sem número é impossível de conferir depois.",
      "Minutos 25 a 38: as duplas trocam apenas as listas, nunca as figuras. Cada dupla desenha na sua folha o que a lista recebida mandar, sem interpretar e sem consertar nada que pareça estranho.",
      "Minutos 38 a 45: as duplas se reúnem em quartetos e comparam o desenho obtido com a figura original. Peça que apontem no papel o número do comando em que os dois desenhos começaram a divergir — não basta dizer “ficou diferente”.",
      "Minutos 45 a 50: recolha três casos de divergência e escreva no quadro o comando que causou cada um. Feche perguntando o que faltava naquele comando: um giro, um risco, ou clareza.",
    ],
    mediatingQuestions: [
      "Em qual número da lista os dois desenhos deixaram de ser iguais?",
      "Esse comando manda girar, mas para onde o lápis estava apontando na hora?",
      "Se eu ler a sua lista sem olhar a figura, eu consigo saber onde começar a desenhar? Está escrito em algum lugar?",
      "Vocês escreveram nove comandos e a outra dupla usou onze. As duas figuras ficaram iguais? Então o que sobrou na maior?",
      "O que aconteceria se você girasse duas vezes seguidas para o mesmo lado?",
    ],
    difficulties: [
      "Quase toda dupla esquece de dizer onde o lápis começa e para onde ele aponta. O desenho sai certo em formato e errado em posição — é o achado mais valioso da aula, então não avise antes.",
      "A turma confunde girar com riscar e desenha um traço a cada giro. Refaça o exemplo do quadro girando o lápis no ar, sem tocar no papel.",
      "Alguns alunos “consertam” a lista recebida porque perceberam a intenção do colega. Reforce que consertar em silêncio esconde o erro que precisamos ver.",
      "Duplas rápidas desenham figuras complicadas demais e não terminam a lista. Limite: no máximo doze comandos por figura.",
    ],
    adaptations: [
      "Turma muito nova (2º e 3º ano): reduza a malha para 3 por 3, use só a figura em L e faça a fase de escrita coletivamente no quadro antes de as duplas trocarem listas.",
      "Turma grande (mais de 30): trabalhe em trios e peça que cada trio produza uma única lista, mas com dois desenhistas na hora da troca — os dois desenham a mesma lista separadamente e comparam entre si. Isso dobra o número de conferências sem dobrar o número de folhas.",
      "Sem material nenhum: use o quadro e o caderno de linha comum, contando cada linha do caderno como uma casa. Se não houver nem caderno, faça a atividade oralmente: um aluno dita, outro desenha com o dedo no ar e o terceiro descreve o que viu.",
    ],
    assessment: [
      "A dupla numera a lista sem ser lembrada e usa o número para apontar onde a divergência começou.",
      "O aluno identifica que faltava declarar a posição e a direção iniciais, e acrescenta essa linha na própria lista.",
      "Ao comparar duas listas de tamanhos diferentes que produzem a mesma figura, o aluno explica qual comando da lista maior era desnecessário.",
    ],
    continuity: {
      label: "Programe o professor",
      href: "/praticar/programe-o-professor",
    },
    image: {
      src: "praticar/desenho-por-comandos.jpg",
      alt: "Folha quadriculada com uma figura de contorno em degraus traçada a lápis, e a mão de uma criança segurando o lápis. Ao lado, quatro cartões com setas para cima, direita, esquerda e baixo.",
    },
    relatedConcept: {
      label: "Algoritmos",
      href: "/aprender/algoritmos",
    },
  },
  {
    id: "programe-o-professor",
    level: 2,
    levelName: NOMES_DOS_NIVEIS[2],
    title: "Programe o professor",
    summary:
      "A turma escreve os comandos e você executa ao pé da letra, sem interpretar nada. É a atividade que mais rápido mostra a diferença entre o que se quis dizer e o que se disse.",
    engine: {
      motor: "command-runner",
      grid: {
        linhas: 6,
        colunas: 6,
        robo: { linha: 5, coluna: 0 },
        direcaoInicial: "leste",
        chave: null,
        bau: { linha: 5, coluna: 3 },
        obstaculos: [],
      },
      minimo: 3,
      permitidos: BASICOS,
      solucaoMinima: ["AVANCE", "AVANCE", "AVANCE"],
    },
    objective:
      "Fazer a turma perceber, na própria pele, que o executor não completa lacunas — e que toda ambiguidade da instrução vira um erro visível.",
    whyApply:
      "É a atividade com maior retorno por minuto investido do material inteiro: não exige nenhum material, cabe em 30 minutos e produz a cena que a turma cita pelo resto do ano. O professor virar o executor inverte a relação de autoridade da sala de um jeito que prende a atenção sozinho.",
    duration: 30,
    ageBands: ["2-3", "4-5", "6-7", "8-9"],
    materials: ["nenhum"],
    preparation:
      "Escolha antes um objetivo simples e visível para toda a sala: pegar o apagador na mesa e voltar ao quadro. Libere o caminho entre a sua mesa e o quadro. Combine com você mesmo a regra que não vai quebrar: você executa exatamente o que for dito, sem corrigir, sem adivinhar e sem fazer cara de que está errado.",
    opening:
      "Leia em voz alta: “A partir de agora eu sou um robô. Eu faço exatamente o que vocês mandarem — nem mais, nem menos. Se vocês mandarem eu andar e não disserem quantos passos, eu vou andar até alguém me mandar parar. O objetivo é: pegar o apagador e trazer até o quadro.”",
    steps: [
      "Minutos 0 a 3: leia a abertura e posicione-se no ponto de partida, parado, olhando para um lado combinado.",
      "Minutos 3 a 12: aceite comandos um por vez, levantados pela turma. Execute cada um ao pé da letra e pare. Se alguém disser “anda”, ande até esbarrar em algo ou até mandarem parar. Não avise, não corrija, não sorria de canto.",
      "Minutos 12 a 18: quando a turma conseguir (ou travar de vez), pare e pergunte quais comandos precisaram ser repetidos e por quê. Anote no quadro os três comandos que mais deram problema.",
      "Minutos 18 a 25: refaça do zero, agora com a turma podendo escrever a lista inteira antes de você começar. Execute a lista completa sem parar. Compare quantas correções foram necessárias das duas vezes.",
      "Minutos 25 a 30: feche perguntando o que mudou entre a primeira e a segunda rodada. A resposta que você quer ouvir é que na segunda eles pensaram antes — isso é planejamento.",
    ],
    mediatingQuestions: [
      "Você disse “vira”. Vira para que lado, e quanto?",
      "Eu andei e bati na parede. Eu desobedeci?",
      "Qual comando vocês deram que funcionou de primeira? O que ele tinha que os outros não tinham?",
      "Se outro professor entrasse agora e lesse a lista de vocês, ele faria a mesma coisa que eu fiz?",
      "Faltou algum comando no fim para eu saber que terminei?",
    ],
    difficulties: [
      "O professor completa a instrução sem perceber, porque sabe o que a turma quis dizer. É o erro mais comum da atividade e ele a esvazia por inteiro — quando você completa, o erro não acontece e não há o que aprender.",
      "A turma acha graça e passa a dar comandos absurdos de propósito. Aceite dois ou três, execute-os com seriedade, e depois combine que comandos precisam servir ao objetivo.",
      "Alunos tímidos não falam. Peça as instruções por fila ou por grupo, com rodízio obrigatório, em vez de aceitar quem gritar primeiro.",
      "A primeira rodada trava e a turma desanima. Isso é esperado: avise desde o começo que a primeira rodada é para descobrir o que falta, não para vencer.",
    ],
    adaptations: [
      "Turma muito nova (2º e 3º ano): reduza o objetivo para três passos no máximo — sair da cadeira, andar até a porta, tocar na porta — e aceite comandos com gestos, não só com palavras.",
      "Turma grande (mais de 30): divida em quatro grupos e dê a cada grupo o direito a um comando por vez, em rodízio. Grupos que repetirem um comando já dado perdem a vez, o que obriga todos a acompanharem a lista inteira.",
      "Sem espaço para andar na sala: faça a versão sentada. O objetivo passa a ser desenhar uma figura no quadro, e os comandos movem só a sua mão.",
    ],
    assessment: [
      "O aluno acrescenta a quantidade a um comando de movimento sem que você peça (“ande três passos”, e não “ande”).",
      "Ao ver o professor errar, o aluno aponta o comando responsável em vez de dizer que o professor errou.",
      "Na segunda rodada, a turma escreve a lista inteira antes de mandar executar, em vez de improvisar comando a comando.",
    ],
    continuity: { label: "Robô humano", href: "/praticar/robo-humano" },
    image: {
      src: "praticar/programe-o-professor.jpg",
      alt: "Vista do fundo da sala: a professora está de pé diante do quadro verde, de braços abertos e imóvel, esperando. Entre ela e quem olha, alunos sentados nas carteiras, todos vistos de costas e de cabeça baixa.",
    },
    relatedConcept: { label: "Sequência e instruções", href: "/aprender/sequencia-e-instrucoes" },
  },
  {
    id: "robo-humano",
    level: 2,
    levelName: NOMES_DOS_NIVEIS[2],
    title: "Robô humano",
    summary:
      "Agora quem executa é um aluno, com os olhos vendados por uma tarefa e não por uma venda: ele só pode obedecer. A dupla que programa descobre que virar não é andar.",
    engine: {
      motor: "command-runner",
      grid: {
        linhas: 6,
        colunas: 6,
        robo: { linha: 4, coluna: 1 },
        direcaoInicial: "norte",
        chave: null,
        bau: { linha: 1, coluna: 3 },
        obstaculos: [],
      },
      minimo: 6,
      permitidos: BASICOS,
      solucaoMinima: ["AVANCE", "AVANCE", "AVANCE", "VIRE_DIREITA", "AVANCE", "AVANCE"],
    },
    objective:
      "Separar, de forma que ninguém esqueça, o comando que muda a posição do comando que muda só a direção.",
    whyApply:
      "Confundir virar com andar é o erro mais persistente do tabuleiro inteiro, e ele resiste a explicação verbal. Só cede quando o aluno vê um colega girar o corpo sem sair do lugar. Trinta minutos aqui economizam três aulas depois.",
    duration: 50,
    ageBands: ["4-5", "6-7", "8-9"],
    materials: ["fita-crepe"],
    preparation:
      "Marque no chão, com fita-crepe, uma malha de 4 por 4 quadrados de aproximadamente 50 cm de lado — cabe no fundo da sala com as carteiras afastadas. Leve um objeto qualquer para servir de alvo. Escreva no quadro os três comandos permitidos: ANDE UMA CASA, VIRE À DIREITA, VIRE À ESQUERDA.",
    opening:
      "Leia em voz alta: “Um de vocês vai ser o robô. O robô só entende três comandos e não pensa: ele não sabe onde está o alvo, não olha em volta e não corrige nada. Quem programa também não pode empurrar, apontar nem dizer ‘por ali’. Só os três comandos do quadro.”",
    steps: [
      "Minutos 0 a 8: monte a malha com a turma e demonstre você mesmo os três comandos, exagerando o virar — gire o corpo sem tirar os pés da casa.",
      "Minutos 8 a 15: primeira rodada aberta. Um aluno é o robô, a turma inteira dá comandos, um por vez, para alcançar o alvo. Execute sem correção.",
      "Minutos 15 a 32: divida em trios — um robô, dois programadores. Cada trio escreve a lista completa no papel antes de executar, e só então o robô anda. Rodízio a cada rodada, para todos serem robô uma vez.",
      "Minutos 32 a 42: desafio da lista fechada. Os trios escrevem a lista inteira, entregam a você, e o robô executa sem poder receber nenhum comando novo. Quem não chegar, anota em que passo saiu do caminho.",
      "Minutos 42 a 50: rode uma conversa curta com as listas na mão. Pergunte quantos comandos cada trio usou e escreva os números no quadro.",
    ],
    mediatingQuestions: [
      "Quantas casas o robô andou quando vocês mandaram virar?",
      "O robô está olhando para onde agora? Se ele andar, ele vai para que lado?",
      "Vocês contaram as casas antes de escrever, ou foram mandando e vendo no que dava?",
      "A lista do trio ao lado tem menos comandos e chegou no mesmo lugar. O que eles fizeram diferente?",
      "Em que número da lista o robô saiu do caminho? O que estava escrito ali?",
    ],
    difficulties: [
      "A turma acha que VIRE também anda uma casa. É o motivo de a atividade existir; não corrija com palavras, deixe o robô girar no lugar e a contagem não bater.",
      "O aluno-robô adivinha e vai até o alvo por conta própria. Combine antes que robô que adivinha perde a vez — e cumpra na primeira ocorrência.",
      "Os programadores apontam com a mão sem perceber. Peça que fiquem de costas para a malha enquanto ditam.",
      "Trios discutem e a rodada não anda. Dê 3 minutos cronometrados para escrever a lista; discussão sem prazo vira impasse.",
    ],
    adaptations: [
      "Turma muito nova (2º e 3º ano): use malha 3 por 3, deixe o robô de frente para o alvo desde o início e trabalhe só com ANDE nas primeiras rodadas, introduzindo VIRE depois que a contagem estiver firme.",
      "Turma grande (mais de 30): monte duas malhas em cantos opostos e rode dois trios ao mesmo tempo, com o restante dividido como plateia responsável por conferir se o robô obedeceu — plateia com tarefa não dispersa.",
      "Sem fita-crepe: use as próprias carteiras como casas, ou marque a malha no pátio com giz. Sem espaço nenhum, a malha vira um tabuleiro de papel e o robô vira o dedo de um aluno de olhos fechados.",
    ],
    assessment: [
      "O aluno prevê em voz alta para onde o robô vai olhar depois de um VIRE, antes de o comando ser executado, e acerta.",
      "Ao escrever a lista, o trio conta as casas primeiro e só depois escreve, em vez de tentar e ver.",
      "Diante de um robô que saiu do caminho, o aluno aponta o número do comando defeituoso em vez de recomeçar a lista.",
    ],
    continuity: { label: "Caça ao tesouro", href: "/praticar/caca-ao-tesouro" },
    image: {
      src: "praticar/robo-humano.jpg",
      alt: "Vista do alto do chão da sala, com uma grade de quadrados grandes marcada em fita crepe. Uma criança de uniforme está parada dentro de uma das casas; o enquadramento mostra só as pernas e os pés.",
    },
    relatedConcept: { label: "Abstração", href: "/aprender/abstracao" },
  },
  {
    id: "caca-ao-tesouro",
    level: 2,
    levelName: NOMES_DOS_NIVEIS[2],
    title: "Caça ao tesouro",
    summary:
      "O tesouro está trancado e a chave está em outro lugar do percurso. Chegar ao destino certo na ordem errada não resolve — e é exatamente isso que a atividade ensina.",
    engine: {
      motor: "command-runner",
      grid: {
        linhas: 6,
        colunas: 6,
        robo: { linha: 5, coluna: 2 },
        direcaoInicial: "norte",
        chave: { linha: 2, coluna: 2 },
        bau: { linha: 2, coluna: 5 },
        obstaculos: [],
      },
      minimo: 7,
      permitidos: BASICOS,
      solucaoMinima: [
        "AVANCE",
        "AVANCE",
        "AVANCE",
        "VIRE_DIREITA",
        "AVANCE",
        "AVANCE",
        "AVANCE",
      ],
    },
    objective:
      "Mostrar que existe uma ordem obrigatória entre subtarefas: nem todo percurso que passa pelos lugares certos resolve o problema.",
    whyApply:
      "É a primeira atividade em que o objetivo tem duas partes com dependência entre elas. Sem isso, a turma acha que planejar é só escolher o caminho mais curto — e aqui o caminho mais curto até o baú é o que falha.",
    duration: 50,
    ageBands: ["4-5", "6-7", "8-9"],
    materials: ["fita-crepe", "cartoes"],
    preparation:
      "Use a mesma malha de fita-crepe da atividade anterior, ou monte uma de 4 por 4. Prepare dois objetos: um para ser a chave (pode ser uma chave de verdade, um clipe, qualquer coisa pequena) e uma caixa fechada para ser o baú, com algo dentro que faça barulho ao chacoalhar. Escreva num cartão a regra: A CAIXA SÓ ABRE COM A CHAVE NA MÃO.",
    opening:
      "Leia em voz alta: “Hoje tem uma regra nova. A caixa está trancada. Se o robô chegar na caixa sem estar com a chave, ele não consegue abrir — e a missão falhou, mesmo que ele tenha chegado no lugar certo. Onde está a chave vocês já sabem. O que vocês precisam decidir é a ordem.”",
    steps: [
      "Minutos 0 a 6: posicione a chave e a caixa na malha, à vista de todos, e leia a regra do cartão em voz alta.",
      "Minutos 6 a 14: peça que cada trio escreva a lista completa antes de qualquer execução. Circule perguntando “por onde ele passa primeiro?” sem dar a resposta.",
      "Minutos 14 a 30: execução dos trios, um por vez. Quem chegar à caixa sem a chave para ali mesmo — a missão falha e o trio volta a escrever, sem apagar a lista antiga.",
      "Minutos 30 a 40: peça a um trio que deu certo e a um que falhou para colocarem as duas listas lado a lado no quadro. Não diga qual é qual; pergunte à turma.",
      "Minutos 40 a 50: proponha a inversão — existe alguma posição da chave que faria a ordem não importar? Deixe a turma discutir e teste a proposta mais votada na malha.",
    ],
    mediatingQuestions: [
      "Onde o robô está quando chega na caixa? Ele passou pela chave até aqui?",
      "As duas listas têm o mesmo número de comandos. Por que uma funciona e a outra não?",
      "Se a chave estivesse dois passos mais adiante, a lista de vocês ainda serviria?",
      "Dá para chegar na caixa por um caminho mais curto? Esse caminho passa pela chave?",
      "O que essa regra da chave tem a ver com coisas que vocês fazem fora daqui?",
    ],
    difficulties: [
      "A turma otimiza o caminho até a caixa e ignora a chave, porque a caixa é o que chama atenção. É o erro que a atividade quer provocar — não avise.",
      "Alguns trios acham que passar perto da chave basta. Deixe executar e mostre a missão falhando; a regra fica clara em um segundo.",
      "Depois que um trio acerta, os outros copiam. Mude a posição da chave entre as rodadas para que a lista copiada não sirva.",
      "A discussão final vira disputa sobre quem estava certo. Reconduza para o objeto: pergunte da lista, nunca do trio.",
    ],
    adaptations: [
      "Turma muito nova (2º e 3º ano): coloque a chave no meio do caminho reto até a caixa, de modo que qualquer percurso direto já a recolha. Depois mude a chave de lugar e refaça — a comparação entre as duas rodadas é o aprendizado.",
      "Turma grande (mais de 30): trabalhe com listas em papel e faça a execução só de quatro listas sorteadas, com a turma inteira prevendo antes de cada execução se aquela lista vai funcionar. Prever em voz alta vale tanto quanto executar.",
      "Sem material: faça no papel quadriculado, com um X para a chave e um quadrado para a caixa. A regra da ordem não depende de nada físico.",
    ],
    assessment: [
      "O trio decide a ordem das duas subtarefas antes de escrever qualquer comando, e explica por quê.",
      "Diante de uma lista que falhou, o aluno identifica que o problema é de ordem e não de contagem de casas.",
      "O aluno dá um exemplo próprio, fora da atividade, de duas tarefas em que a ordem muda o resultado.",
    ],
    continuity: { label: "Comandos com palmas", href: "/praticar/comandos-com-palmas" },
    image: {
      src: "praticar/caca-ao-tesouro.jpg",
      alt: "Grade de fita crepe no chão da sala, com uma chave dourada largada numa casa e um baú de madeira fechado em outra, distante dela. Na borda da mesa, cinco cartões em fila: quatro em branco e o último com uma seta, que uma mão acaba de pousar.",
    },
    relatedConcept: { label: "Decomposição", href: "/aprender/decomposicao" },
  },
  {
    id: "comandos-com-palmas",
    level: 3,
    levelName: NOMES_DOS_NIVEIS[3],
    title: "Comandos com palmas",
    summary:
      "Uma sequência rítmica que a turma executa com o corpo, até alguém perceber que só existem três movimentos se repetindo. Repetição entra pelo ouvido antes de entrar pelo código.",
    engine: {
      motor: "sequence-builder",
      tituloDoPalco: "A sequência do ritmo, na ordem certa",
      semente: 7,
      passos: [
        {
          id: "combinar-o-pulso",
          texto: "Combinar o pulso batendo o pé quatro vezes",
          porque:
            "Sem um pulso comum, cada aluno executa na própria velocidade e a repetição não fica audível para ninguém.",
        },
        {
          id: "ensinar-o-bloco",
          texto: "Ensinar o bloco de três movimentos: palma, palma, batida na mesa",
          porque:
            "O bloco precisa existir inteiro na cabeça da turma antes de ser repetido, senão a repetição vira improviso.",
        },
        {
          id: "repetir-o-bloco",
          texto: "Repetir o mesmo bloco quatro vezes seguidas, sem parar",
          porque:
            "É a repetição que revela o padrão: um bloco executado uma vez só é um movimento, executado quatro vezes é uma estrutura.",
        },
        {
          id: "nomear-o-padrao",
          texto: "Parar e perguntar quantos movimentos diferentes existem na sequência inteira",
          porque:
            "A pergunta só faz sentido depois que a turma já executou; feita antes, ela entrega a resposta.",
        },
        {
          id: "escrever-encurtado",
          texto: "Escrever no quadro a versão curta: repita 4 vezes (palma, palma, mesa)",
          porque:
            "Ver doze movimentos virarem uma linha é o momento em que a economia da repetição fica concreta.",
        },
      ],
    },
    objective:
      "Fazer a turma sentir a repetição no corpo e só então escrevê-la, para que a peça REPITA chegue como um nome para algo que eles já conhecem.",
    whyApply:
      "Repetição ensinada direto no código vira decoreba. Ensinada pelo ritmo, ela já está compreendida quando o símbolo aparece — e a turma inteira participa, inclusive quem não se arrisca a falar.",
    duration: 30,
    ageBands: ["2-3", "4-5", "6-7"],
    materials: ["nenhum"],
    preparation:
      "Escolha e treine antes um bloco de três movimentos sonoros distintos e fáceis: palma, palma, batida na mesa funciona em qualquer sala. Garanta que todos tenham uma superfície para bater. Deixe o quadro livre para escrever a versão curta no fim.",
    opening:
      "Leia em voz alta: “Vamos fazer uma sequência de doze movimentos. Ninguém precisa decorar doze coisas — quando vocês descobrirem por quê, me contem.”",
    steps: [
      "Minutos 0 a 4: estabeleça o pulso batendo o pé, e faça a turma acompanhar até estar junto.",
      "Minutos 4 a 10: ensine o bloco de três movimentos e execute-o uma vez só, devagar, com a turma repetindo.",
      "Minutos 10 a 16: execute o bloco quatro vezes seguidas, sem avisar quantas. Repita a rodada inteira duas ou três vezes, até a turma pegar.",
      "Minutos 16 a 22: pare de repente e pergunte quantos movimentos diferentes existem na sequência. Espere a resposta “três” aparecer sozinha e peça que alguém explique.",
      "Minutos 22 a 30: escreva no quadro a versão longa (doze movimentos, um por um) e a versão curta (repita 4 vezes o bloco) lado a lado. Pergunte qual das duas é mais fácil de passar para outra turma por telefone.",
    ],
    mediatingQuestions: [
      "Quantos movimentos diferentes existem aqui? E quantas vezes cada um aparece?",
      "Se eu quisesse ensinar essa sequência para a turma do lado sem demonstrar, o que eu diria?",
      "Onde termina um bloco e começa o outro? Como vocês sabem?",
      "Se eu mudar só o último movimento do último bloco, ainda dá para dizer que é repetição?",
      "O que acontece com a versão curta se eu quiser oito repetições em vez de quatro?",
    ],
    difficulties: [
      "A turma acelera e o pulso se perde, e aí a repetição deixa de ser audível. Volte a bater o pé e recomece; sem pulso comum a atividade não funciona.",
      "Alguns alunos decoram os doze movimentos em vez de perceber o bloco, e conseguem executar sem ter entendido nada. A pergunta sobre quantos movimentos diferentes existem é o que revela isso.",
      "Turmas grandes fazem barulho demais e ninguém escuta o padrão. Divida em metades: uma executa, a outra escuta e conta.",
    ],
    adaptations: [
      "Turma muito nova (2º e 3º ano): reduza o bloco para dois movimentos e três repetições, e conte em voz alta junto com eles a cada bloco concluído.",
      "Turma grande (mais de 30): faça em cânone — a metade da sala começa e a outra entra depois de um bloco. A defasagem torna a estrutura ainda mais evidente para quem está ouvindo.",
      "Sem poder fazer barulho (sala vizinha em prova): troque os movimentos sonoros por gestos silenciosos — mão na cabeça, mão no ombro, braços abertos. A estrutura é idêntica.",
    ],
    assessment: [
      "O aluno responde quantos movimentos diferentes existem sem contar os doze um a um.",
      "Ao ser pedido para ensinar a sequência a outra pessoa, descreve o bloco e o número de repetições em vez de listar tudo.",
      "Percebe sozinho, quando você muda o número de repetições, que a única parte da descrição que muda é o número.",
    ],
    continuity: { label: "Sequências repetidas", href: "/praticar/sequencias-repetidas" },
    image: {
      src: "praticar/comandos-com-palmas.jpg",
      alt: "Duas mãos adultas batendo palma em primeiro plano, borradas pelo movimento. Ao fundo, crianças de uniforme em pé formando uma roda, vistas da cintura para baixo.",
    },
    relatedConcept: {
      label: "Reconhecimento de padrões",
      href: "/aprender/reconhecimento-de-padroes",
    },
  },
  {
    id: "sequencias-repetidas",
    level: 3,
    levelName: NOMES_DOS_NIVEIS[3],
    title: "Sequências repetidas",
    summary:
      "O mesmo percurso, agora com as peças REPITA disponíveis. Nove comandos viram cinco peças, e a turma vê a diferença lado a lado.",
    engine: {
      motor: "command-runner",
      grid: {
        linhas: 6,
        colunas: 6,
        robo: { linha: 5, coluna: 0 },
        direcaoInicial: "norte",
        chave: null,
        bau: { linha: 1, coluna: 3 },
        obstaculos: [],
      },
      minimo: 5,
      permitidos: COM_REPETICAO,
      solucaoMinima: ["REPITA_4X", "AVANCE", "VIRE_DIREITA", "REPITA_3X", "AVANCE"],
    },
    objective:
      "Ligar o padrão que a turma ouviu na atividade anterior ao símbolo que o representa, mostrando que repetir não é atalho de preguiça e sim a mesma solução escrita melhor.",
    whyApply:
      "É a atividade que dá sentido à peça REPITA. Sem comparar as duas versões do mesmo percurso, a peça vira uma regra a decorar; com a comparação, ela vira uma escolha que o aluno passa a fazer sozinho.",
    duration: 50,
    ageBands: ["6-7", "8-9"],
    materials: ["papel-e-lapis", "cartoes"],
    preparation:
      "Prepare cartões com os comandos, em duas cores: os três básicos numa cor e as peças REPITA 2X, REPITA 3X e REPITA 4X noutra. Faça um conjunto por trio. Deixe o quadro dividido em duas colunas, com os títulos SEM REPETIR e COM REPETIR.",
    opening:
      "Leia em voz alta: “Vocês já resolveram percursos assim. Hoje entram três peças novas, e elas não fazem o robô ir mais longe: fazem vocês escreverem menos. O desafio não é chegar no baú — é chegar com o menor número de peças na mesa.”",
    steps: [
      "Minutos 0 a 8: os trios resolvem o percurso usando só os comandos básicos e colam a solução na coluna SEM REPETIR do quadro. Conte as peças em voz alta com a turma.",
      "Minutos 8 a 16: apresente as peças REPITA e explique a única regra: elas repetem o comando que vem logo depois delas.",
      "Minutos 16 a 34: os trios refazem o mesmo percurso tentando usar menos peças. Circule perguntando onde há comandos iguais em seguida.",
      "Minutos 34 a 44: cole as soluções curtas na coluna COM REPETIR, ao lado das longas. Conte as peças das duas colunas e escreva os números.",
      "Minutos 44 a 50: pergunte se o robô fez algo diferente nas duas versões. A resposta é não — e é essa igualdade de resultado com desigualdade de tamanho que fecha a aula.",
    ],
    mediatingQuestions: [
      "Onde na sua lista aparecem dois ou mais comandos iguais em seguida?",
      "Essa peça REPITA repete o quê, exatamente? O que vem depois dela ou tudo?",
      "As duas versões fazem o robô andar o mesmo tanto?",
      "Se o baú estivesse uma casa mais longe, qual das duas listas seria mais fácil de mudar?",
      "Existe algum trecho aqui em que usar REPITA deixaria a lista maior em vez de menor?",
    ],
    difficulties: [
      "A turma acha que REPITA repete a lista inteira, e não só o comando seguinte. Execute uma vez a interpretação errada, devagar, para o robô ir parar longe do baú.",
      "Alguns trios usam REPITA em trechos de um comando só, e a lista fica maior. Não corrija na hora: peça que contem as peças das duas versões.",
      "Trios que já resolveram acham que terminaram. Proponha a eles a pergunta do trecho em que REPITA atrapalha — ela ocupa quem foi mais rápido sem entregar resposta a ninguém.",
    ],
    adaptations: [
      "Turma muito nova (2º e 3º ano): use só a peça REPITA 2X e um percurso reto de quatro casas. Duas peças contra quatro já mostra a economia sem exigir contas.",
      "Turma grande (mais de 30): faça a fase longa individualmente no papel e a fase curta em trios. A comparação fica entre a lista pessoal e a lista do grupo, o que aumenta o envolvimento na segunda parte.",
      "Sem cartões: escreva as duas versões no caderno, uma embaixo da outra, e conte as linhas. A comparação visual funciona igual.",
    ],
    assessment: [
      "O aluno localiza os trechos com comandos repetidos antes de tentar encaixar a peça REPITA.",
      "Explica que as duas versões produzem o mesmo movimento do robô, com palavras próprias.",
      "Reconhece um caso em que usar REPITA não compensa, e justifica pela contagem de peças.",
    ],
    continuity: { label: "Economize comandos", href: "/praticar/economize-comandos" },
    image: {
      src: "praticar/sequencias-repetidas.jpg",
      alt: "Duas filas de cartões sobre a mesa, lado a lado para comparar. Em cima, nove cartões iguais com a seta para cima. Embaixo, apenas cinco: quatro setas e um cartão amarelo com o símbolo de repetição. Um dedo aponta para a fila curta.",
    },
    relatedConcept: {
      label: "Reconhecimento de padrões",
      href: "/aprender/reconhecimento-de-padroes",
    },
  },
  {
    id: "economize-comandos",
    level: 3,
    levelName: NOMES_DOS_NIVEIS[3],
    title: "Economize comandos",
    summary:
      "Chegar não basta: aqui a meta é chegar com cinco peças. A turma para de perguntar se funciona e passa a perguntar se dá para ser menor.",
    engine: {
      motor: "loop-optimizer",
      grid: {
        linhas: 6,
        colunas: 6,
        robo: { linha: 5, coluna: 0 },
        direcaoInicial: "leste",
        chave: { linha: 5, coluna: 4 },
        bau: { linha: 1, coluna: 4 },
        obstaculos: [],
      },
      minimo: 5,
      permitidos: COM_REPETICAO,
      solucaoMinima: ["REPITA_4X", "AVANCE", "VIRE_ESQUERDA", "REPITA_4X", "AVANCE"],
    },
    objective:
      "Introduzir a ideia de que soluções corretas podem ser comparadas entre si, e que comparar é o começo de otimizar.",
    whyApply:
      "É a primeira vez que a turma trabalha com uma meta numérica em vez de um objetivo binário. Isso muda a conversa da sala de “deu certo?” para “dá para melhorar?”, que é a pergunta que sustenta todo o resto do percurso.",
    duration: 50,
    ageBands: ["6-7", "8-9"],
    materials: ["papel-e-lapis", "computador"],
    preparation:
      "Reserve o laboratório ou leve o próprio notebook ligado ao projetor. Escreva a meta no quadro antes de começar: CINCO PEÇAS. Prepare uma tabela no quadro com uma linha por dupla, para registrar o número de peças de cada tentativa — a tabela é o que transforma a atividade em conversa.",
    opening:
      "Leia em voz alta: “Este percurso tem chave e baú, e vocês já sabem resolver percursos assim. A diferença é que hoje existe um número na parede: cinco. Dá para chegar no baú com mais peças, e vai funcionar. Mas a pergunta de hoje não é se funciona.”",
    steps: [
      "Minutos 0 a 8: mostre o cenário no projetor, leia a meta e resolva junto com a turma uma versão qualquer, sem se preocupar com o tamanho. Anote na tabela quantas peças ela teve.",
      "Minutos 8 a 26: as duplas tentam reduzir. A cada tentativa que vencer, registram o número de peças na própria linha da tabela — inclusive as maiores, que também contam a história.",
      "Minutos 26 a 38: pare e compare a tabela. Chame duas duplas com números diferentes para explicarem onde uma economizou e a outra não.",
      "Minutos 38 a 46: rodada final, com a turma sabendo o que as outras duplas fizeram. Registre os números novos ao lado dos antigos.",
      "Minutos 46 a 50: feche perguntando se existe alguma solução com quatro peças. Deixe a pergunta em aberto — a turma volta a ela sozinha na aula seguinte.",
    ],
    mediatingQuestions: [
      "Quantas peças você tem agora? De onde daria para tirar uma?",
      "Você tem dois AVANCE seguidos em algum ponto? E quatro?",
      "A dupla ao lado chegou com uma peça a menos. Onde a lista deles é diferente da sua?",
      "Essa curva no meio é obrigatória, ou existe um caminho que não precisa dela?",
      "Se a meta fosse quatro peças em vez de cinco, o que precisaria mudar no percurso?",
    ],
    difficulties: [
      "A turma trata a meta como nota e desanima quando não alcança. Registre as tentativas maiores na tabela desde o começo, para que a redução apareça como progresso e não como fracasso.",
      "Duplas trocam a solução em silêncio e todas chegam ao mesmo número sem ter pensado. Torne a troca oficial na rodada final — copiar depois de explicar é aprendizado; copiar antes não é.",
      "Alguns alunos empilham peças REPITA achando que quanto mais melhor. Peça que contem: duas peças REPITA seguidas quase sempre custam mais do que economizam.",
    ],
    adaptations: [
      "Turma muito nova (2º e 3º ano): esta atividade pede contagem e comparação; para 2º e 3º ano, use um percurso reto com meta de duas peças e trabalhe só com REPITA 4X.",
      "Turma grande (mais de 30): dois alunos por máquina e a tabela no quadro por fileira, não por dupla. Fileiras competem entre si, o que mantém o registro pequeno e a conversa viva.",
      "Sem computador: recorte as peças em papel e faça a contagem na mesa. O simulador acelera a conferência, mas o raciocínio de economia acontece igual com peças de papel.",
    ],
    assessment: [
      "O aluno conta as peças da própria solução sem que você peça, e usa esse número para decidir se continua.",
      "Localiza um trecho com comandos repetidos e substitui por uma peça REPITA, explicando quantas peças economizou.",
      "Compara a própria solução com a de outra dupla apontando uma diferença estrutural, não apenas o número final.",
    ],
    continuity: { label: "Encontre o erro", href: "/praticar/encontre-o-erro" },
    image: {
      src: "praticar/economize-comandos.jpg",
      alt: "Caderno aberto sobre a carteira, com uma lista a lápis em que quase todas as linhas foram riscadas e sobraram três. Ao lado, uma borracha usada e um notebook com a tela em branco.",
    },
    relatedConcept: { label: "Algoritmos", href: "/aprender/algoritmos" },
  },
  {
    id: "encontre-o-erro",
    level: 4,
    levelName: NOMES_DOS_NIVEIS[4],
    title: "Encontre o erro",
    summary:
      "Um algoritmo pronto, com um defeito plantado. A turma precisa apontar o passo culpado antes de propor qualquer conserto.",
    engine: {
      motor: "bug-hunt",
      algoritmo: {
        id: "regar-a-planta",
        titulo: "Regar a planta da sala",
        enunciado:
          "Esta lista foi escrita por outra turma para regar a planta que fica na janela. Ela tem um defeito de ordem: um passo está no lugar errado. Ache o passo antes de pensar no conserto.",
        passos: [
          "Encher o regador na torneira",
          "Pegar o regador vazio no armário",
          "Levar o regador até a janela",
          "Despejar a água na terra, devagar",
          "Guardar o regador no armário",
        ],
        indiceDoDefeito: 0,
        tipo: "ordem",
        correcoes: [
          {
            texto: "Trocar os dois primeiros passos de lugar",
            certa: true,
            porque:
              "Não dá para encher um regador que ainda está no armário. Pegar precisa vir antes de encher, e é só isso que está fora do lugar.",
          },
          {
            texto: "Apagar o passo de encher o regador",
            certa: false,
            porque:
              "Sem encher, a planta não é regada. O passo não sobra — ele está no lugar errado, que é um problema diferente de estar sobrando.",
          },
          {
            texto: "Mover o passo de guardar o regador para o começo",
            certa: false,
            porque:
              "Guardar no começo deixaria a lista ainda mais impossível: o regador estaria no armário justamente quando é preciso usá-lo.",
          },
        ],
      },
    },
    objective:
      "Ensinar a separar duas etapas que a turma tende a fazer juntas: localizar o defeito e consertar o defeito.",
    whyApply:
      "O reflexo do aluno diante de um erro é refazer tudo. Uma atividade que só permite consertar depois de apontar quebra esse reflexo, e a habilidade se transfere para prova, redação e trabalho em grupo.",
    duration: 30,
    ageBands: ["4-5", "6-7", "8-9"],
    materials: ["papel-e-lapis"],
    preparation:
      "Escreva no quadro, antes da aula, uma lista de cinco passos com um defeito de ordem — pode ser a de regar a planta, ou outra do cotidiano da escola. Não numere: a numeração é a primeira coisa que você vai pedir à turma. Tenha uma segunda lista pronta, com defeito diferente, para quem terminar cedo.",
    opening:
      "Leia em voz alta: “Esta lista foi escrita por outra turma e tem um erro. Antes de qualquer um dizer como conserta, eu quero saber qual passo está errado. Quem falar o conserto antes de apontar o passo, eu não anoto.”",
    steps: [
      "Minutos 0 a 5: peça que a turma numere a lista do quadro no caderno. Numerar é o que permite falar do defeito sem descrevê-lo por inteiro.",
      "Minutos 5 a 12: cada aluno escreve sozinho, no caderno, só o número do passo que considera defeituoso — sem justificativa ainda.",
      "Minutos 12 a 20: colha os números em votação aberta e escreva a contagem no quadro. Só depois peça que quem votou em cada número justifique.",
      "Minutos 20 a 26: com o passo identificado, abra as propostas de conserto. Teste cada proposta lendo a lista corrigida em voz alta, do começo ao fim.",
      "Minutos 26 a 30: entregue a segunda lista e peça que apontem o defeito em duplas, agora em três minutos. A repetição rápida fixa o procedimento.",
    ],
    mediatingQuestions: [
      "Qual é o número do passo? Não me diga o que ele diz, me diga o número.",
      "O que precisaria estar pronto para esse passo poder acontecer?",
      "Se eu executar a lista até esse passo, o que eu tenho na mão?",
      "Esse passo está errado, ou está certo mas no lugar errado? Não é a mesma coisa.",
      "A correção de vocês resolve o defeito e não cria outro? Vamos ler a lista inteira de novo.",
    ],
    difficulties: [
      "A turma dispara o conserto antes de localizar o defeito. É o hábito que a atividade existe para quebrar; segure a regra mesmo quando o conserto proposto estiver certo.",
      "Alunos apontam passos que estão apenas mal escritos, não defeituosos. Pergunte se a lista funcionaria mesmo assim — funcionar mal é diferente de não funcionar.",
      "Quem descobre rápido conta em voz alta e encerra a investigação. A fase individual em silêncio existe para isso; não a pule.",
    ],
    adaptations: [
      "Turma muito nova (2º e 3º ano): use uma lista de três passos com um defeito grosseiro e faça tudo coletivamente, com a lista impressa em tiras que possam ser fisicamente trocadas de lugar.",
      "Turma grande (mais de 30): a votação por números funciona melhor com fichas — cada aluno levanta uma ficha com o número escolhido, e você conta de uma vez em vez de ouvir um a um.",
      "Sem papel: faça a lista com objetos ou com alunos em fila representando cada passo. Trocar de lugar fisicamente torna o defeito de ordem visível para a turma inteira.",
    ],
    assessment: [
      "O aluno aponta o número do passo defeituoso antes de propor qualquer correção.",
      "Justifica o defeito dizendo o que faltaria estar pronto naquele momento, não apenas que “está errado”.",
      "Ao avaliar uma correção proposta por um colega, relê a lista inteira para ver se ela não criou outro problema.",
    ],
    continuity: { label: "Corrija o caminho", href: "/praticar/corrija-o-caminho" },
    image: {
      src: "praticar/encontre-o-erro.jpg",
      alt: "Folha sobre a carteira com seis sequências de três figuras ligadas por setas, feitas só de quadrados e círculos. O dedo de uma criança aponta firme para a terceira linha. Ao lado, uma caneta vermelha fechada.",
    },
    relatedConcept: { label: "Teste e depuração", href: "/aprender/teste-e-depuracao" },
  },
  {
    id: "corrija-o-caminho",
    level: 4,
    levelName: NOMES_DOS_NIVEIS[4],
    title: "Corrija o caminho",
    summary:
      "Tem um obstáculo no caminho reto e o robô não atravessa. Contornar custa mais comandos — e descobrir isso sem se frustrar é parte da aula.",
    engine: {
      motor: "command-runner",
      grid: {
        linhas: 6,
        colunas: 6,
        robo: { linha: 5, coluna: 0 },
        direcaoInicial: "norte",
        chave: null,
        bau: { linha: 2, coluna: 0 },
        obstaculos: [{ linha: 3, coluna: 0 }],
      },
      minimo: 8,
      permitidos: BASICOS,
      solucaoMinima: [
        "VIRE_DIREITA",
        "AVANCE",
        "VIRE_ESQUERDA",
        "AVANCE",
        "AVANCE",
        "AVANCE",
        "VIRE_ESQUERDA",
        "AVANCE",
      ],
    },
    objective:
      "Exercitar a depuração num caso em que a primeira solução óbvia falha por um motivo físico, e o conserto exige replanejar o trecho e não a lista inteira.",
    whyApply:
      "Aqui o erro não vem de descuido: vem de o mundo ter uma restrição que o aluno não considerou. É a situação mais próxima do que acontece numa aula de robótica de verdade, e ensina a turma a olhar o cenário antes de escrever.",
    duration: 50,
    ageBands: ["6-7", "8-9"],
    materials: ["computador", "papel-e-lapis"],
    preparation:
      "Deixe o cenário aberto no projetor. Tenha papel para as duplas rascunharem antes de mexer no simulador — a regra de rascunhar antes é o que separa esta atividade de tentativa e erro. Escreva no quadro a pergunta que vai guiar a aula: EM QUE PASSO O ROBÔ PAROU?",
    opening:
      "Leia em voz alta: “O baú está bem ali, na mesma coluna do robô, três casas acima. Parece o desafio mais fácil que vocês já viram. Só que tem uma pedra no meio, e o robô não passa por cima. Antes de escrever qualquer coisa, olhem o tabuleiro inteiro.”",
    steps: [
      "Minutos 0 a 6: mostre o cenário e peça que a turma escreva no papel a solução óbvia — três AVANCE. Não avise que vai falhar.",
      "Minutos 6 a 12: execute a solução óbvia no projetor, em velocidade lenta, até o robô bater. Pergunte em que número da lista ele parou.",
      "Minutos 12 a 30: as duplas rascunham no papel o contorno e só depois montam no simulador. Circule cobrando o rascunho.",
      "Minutos 30 a 42: compare no quadro o número de comandos da solução que falhou (3) com o das que funcionaram (8 ou mais). Pergunte por que a certa é maior.",
      "Minutos 42 a 50: peça que cada dupla escreva uma frase respondendo o que o obstáculo mudou no problema. Recolha as frases.",
    ],
    mediatingQuestions: [
      "Em que número da lista o robô parou? O que estava escrito nesse número?",
      "O robô desobedeceu, ou ele fez exatamente o que estava escrito?",
      "Para sair da coluna, o que precisa acontecer antes de andar?",
      "Depois de contornar, o robô está olhando para onde? Ele consegue chegar ao baú andando assim?",
      "A solução certa tem mais comandos que a errada. Isso quer dizer que ela é pior?",
    ],
    difficulties: [
      "A turma tenta empurrar o robô contra o obstáculo várias vezes, esperando que ceda. Deixe acontecer duas vezes e então pergunte o que mudou entre uma tentativa e outra — nada mudou, e é esse o ponto.",
      "Alunos apagam a lista inteira ao primeiro erro. Combine a regra da aula: só se apaga a partir do passo em que o robô parou.",
      "Duplas resolvem por tentativa e erro no simulador sem raciocinar. O rascunho obrigatório no papel é a única coisa que impede isso; não abra exceção.",
      "Alguns acham que a solução maior está errada porque é maior. Vale explicitar: a solução mais curta é a mais curta entre as que funcionam.",
    ],
    adaptations: [
      "Turma muito nova (2º e 3º ano): coloque o obstáculo já ao lado do robô, de modo que o contorno seja de duas casas, e faça o rascunho coletivamente no quadro antes de qualquer dupla mexer no computador.",
      "Turma grande (mais de 30): faça a atividade inteira no projetor, com as duplas rascunhando no papel e quatro rascunhos sorteados sendo executados. Prever se um rascunho vai funcionar antes de executá-lo mantém a turma toda envolvida.",
      "Sem computador: desenhe o tabuleiro no quadro e mova um ímã ou um recorte de papel a cada comando lido. A execução lenta é justamente o que a atividade precisa.",
    ],
    assessment: [
      "O aluno identifica o passo em que a execução parou, e não apenas que “deu errado”.",
      "Reescreve somente o trecho a partir do defeito, mantendo o que já funcionava.",
      "Explica, com palavras próprias, por que a solução correta usa mais comandos que a solução que falhou.",
    ],
    continuity: { label: "Instruções ambíguas", href: "/praticar/instrucoes-ambiguas" },
    image: {
      src: "praticar/corrija-o-caminho.jpg",
      alt: "Vista do alto de uma grade de fita crepe no chão. Uma caixa de papelão fechada ocupa uma casa bem no meio do caminho, e uma tira de fita marca o desvio que contorna a caixa em S, partindo de uma seta na borda de baixo. A mão de uma criança acompanha o traçado.",
    },
    relatedConcept: { label: "Teste e depuração", href: "/aprender/teste-e-depuracao" },
  },
  {
    id: "instrucoes-ambiguas",
    level: 4,
    levelName: NOMES_DOS_NIVEIS[4],
    title: "Instruções ambíguas",
    summary:
      "Nem todo defeito é um passo faltando ou trocado. Às vezes o passo está lá, na ordem certa, e mesmo assim duas pessoas o executam de jeitos diferentes.",
    engine: {
      motor: "bug-hunt",
      algoritmo: {
        id: "arrumar-a-mochila",
        titulo: "Arrumar a mochila para a aula seguinte",
        enunciado:
          "Esta lista está na ordem certa e não falta nenhum passo. Ainda assim, duas pessoas seguindo ela terminam com mochilas diferentes. Um dos passos permite mais de uma interpretação — ache qual.",
        passos: [
          "Consultar o horário do dia seguinte",
          "Separar os materiais",
          "Colocar os cadernos das aulas do dia seguinte na mochila",
          "Fechar a mochila e deixá-la na porta",
        ],
        indiceDoDefeito: 1,
        tipo: "comando-ambiguo",
        correcoes: [
          {
            texto: "Trocar por: separar os cadernos, os lápis e o livro de leitura",
            certa: true,
            porque:
              "“Materiais” não diz quais nem quantos, e cada pessoa entende uma coisa. Nomear os itens elimina a interpretação sem mudar a ordem da lista.",
          },
          {
            texto: "Mover esse passo para depois de colocar os cadernos",
            certa: false,
            porque:
              "Mudar de lugar não resolve: o passo continuaria vago, e agora numa posição em que atrapalha. O defeito aqui é de clareza, não de ordem.",
          },
          {
            texto: "Apagar esse passo, já que os cadernos aparecem no passo seguinte",
            certa: false,
            porque:
              "Os cadernos são só uma parte dos materiais. Apagar o passo faz sumir tudo o que não é caderno — resolve a ambiguidade eliminando a tarefa.",
          },
        ],
      },
    },
    objective:
      "Mostrar que uma instrução pode estar completa e na ordem certa e ainda assim falhar, porque admite mais de uma leitura.",
    whyApply:
      "É o tipo de defeito mais difícil de enxergar e o mais comum na comunicação da vida real — em enunciado de prova, em combinado de trabalho em grupo, em recado para casa. Fecha o percurso mostrando que precisão é uma escolha de quem escreve.",
    duration: 30,
    ageBands: ["6-7", "8-9"],
    materials: ["papel-e-lapis"],
    preparation:
      "Escreva no quadro uma instrução ambígua curta e cotidiana da própria escola — “traga o material na segunda” serve bem. Prepare duas folhas em branco para o teste das duas execuções. Não avise que a instrução é ambígua; ela precisa parecer normal.",
    opening:
      "Leia em voz alta: “Hoje a lista não tem passo faltando nem passo fora de ordem. Ela está inteira e na ordem certa. Mesmo assim, se dois de vocês seguirem essa lista, vão terminar com resultados diferentes. Descubram qual passo permite isso.”",
    steps: [
      "Minutos 0 a 6: peça que dois alunos executem, separadamente e sem se ouvirem, a instrução do quadro — cada um escreve numa folha o que faria.",
      "Minutos 6 a 12: leia as duas folhas em voz alta. Sendo diferentes, pergunte qual dos dois desobedeceu. Nenhum desobedeceu, e é aí que o conceito entra.",
      "Minutos 12 a 20: apresente a lista da atividade e peça que cada dupla aponte o passo ambíguo, justificando com duas leituras possíveis dele.",
      "Minutos 20 a 26: discuta as correções propostas. Teste cada uma perguntando se ainda sobraria alguma leitura possível.",
      "Minutos 26 a 30: peça que cada dupla reescreva a instrução original do quadro de um jeito que não admita duas leituras. Recolha e leia duas em voz alta.",
    ],
    mediatingQuestions: [
      "Os dois seguiram a mesma instrução e chegaram a resultados diferentes. Algum deles desobedeceu?",
      "Quais são as duas maneiras diferentes de entender esse passo? Diga as duas.",
      "O que exatamente está faltando nesse passo: uma quantidade, um nome, ou um lugar?",
      "Depois da correção de vocês, ainda sobra alguma dúvida sobre o que fazer?",
      "Vocês conseguem lembrar de um recado da escola que dava para entender de dois jeitos?",
    ],
    difficulties: [
      "A turma classifica o passo ambíguo como “faltando”, porque parece incompleto. Insista na diferença: um passo que falta não está escrito; um passo ambíguo está escrito e admite duas leituras.",
      "Os alunos escolhidos para executar tentam adivinhar o que o professor quer. Escolha dois que estejam distraídos, ou faça a execução por escrito, sem plateia.",
      "Alguns propõem consertos que trocam uma ambiguidade por outra. Teste sempre perguntando se ainda sobra alguma leitura possível.",
    ],
    adaptations: [
      "Turma muito nova (2º e 3º ano): use uma instrução de duas palavras (“arrume a mesa”) e execute com dois alunos de verdade, na frente da turma. Ver duas mesas arrumadas de jeitos diferentes basta.",
      "Turma grande (mais de 30): peça que a turma inteira execute a instrução ambígua por escrito, e conte quantos resultados diferentes apareceram. O número é mais convincente que qualquer explicação.",
      "Sem papel: faça tudo oralmente, com dois alunos descrevendo o que fariam antes de ouvirem um ao outro.",
    ],
    assessment: [
      "O aluno distingue um passo ambíguo de um passo ausente, e explica a diferença com um exemplo.",
      "Apresenta duas leituras possíveis do mesmo passo, em vez de apenas dizer que está confuso.",
      "Reescreve uma instrução do cotidiano da escola de forma que ela admita uma única leitura.",
    ],
    continuity: { label: "Voltar ao tabuleiro", href: "/tabuleiro" },
    image: {
      src: "praticar/instrucoes-ambiguas.jpg",
      alt: "Duas crianças sentadas de frente uma para a outra seguram, cada uma, a sua folha. Os dois desenhos a lápis são visivelmente diferentes entre si, embora entre as folhas exista um único cartão com uma seta: a mesma instrução para as duas.",
    },
    relatedConcept: {
      label: "O erro como parte da aprendizagem",
      href: "/aprender/o-erro-como-parte-da-aprendizagem",
    },
  },
];

export function atividadePorId(id: string): Activity | undefined {
  return ACTIVITIES.find((a) => a.id === id);
}

export function atividadesDoNivel(level: 1 | 2 | 3 | 4): Activity[] {
  return ACTIVITIES.filter((a) => a.level === level);
}

// Reexportado para que a página do PRATICAR monte as listas de peças permitidas
// sem redeclarar as constantes e correr o risco de divergir dos dados.
export { BASICOS as COMANDOS_BASICOS, COM_REPETICAO as COMANDOS_COM_REPETICAO };
