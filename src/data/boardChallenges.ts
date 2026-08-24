import type { CommandType, GridSpec } from "@/lib/board/types";

export type BoardChallenge = {
  id: string;
  order: number;
  title: string;
  brief: string;
  grid: GridSpec;
  /** `null` quando a atividade não tem uma meta de otimização (o editor de desafios do professor). */
  minCommands: number | null;
  allowedCommands: CommandType[];
  hint: string;
  /** Usada nos testes para provar que o desafio é resolvível no mínimo declarado. */
  solucaoReferencia: CommandType[];
  classroomBridge: string;
};

const BASICOS: CommandType[] = ["AVANCE", "VIRE_DIREITA", "VIRE_ESQUERDA"];
const COM_REPETICAO: CommandType[] = [...BASICOS, "REPITA_2X", "REPITA_3X", "REPITA_4X"];

export const BOARD_CHALLENGES: BoardChallenge[] = [
  {
    id: "linha-reta",
    order: 1,
    title: "Percurso em linha reta",
    brief: "O robô está virado para o baú e o caminho está livre. Quantos AVANCE são necessários?",
    grid: {
      linhas: 6,
      colunas: 6,
      robo: { linha: 5, coluna: 0 },
      direcaoInicial: "norte",
      chave: null,
      bau: { linha: 2, coluna: 0 },
      obstaculos: [],
    },
    minCommands: 3,
    allowedCommands: ["AVANCE"],
    hint: "Conte as casas entre o robô e o baú. Cada casa é um AVANCE.",
    solucaoReferencia: ["AVANCE", "AVANCE", "AVANCE"],
    classroomBridge:
      "Na sala, peça para um aluno contar as casas em voz alta antes de montar. Contar antes de executar é o começo do planejamento.",
  },
  {
    id: "primeira-curva",
    order: 2,
    title: "A primeira curva",
    brief: "Agora o baú não está mais na mesma coluna. O robô precisa virar no meio do caminho.",
    grid: {
      linhas: 6,
      colunas: 6,
      robo: { linha: 5, coluna: 0 },
      direcaoInicial: "norte",
      chave: null,
      bau: { linha: 3, coluna: 2 },
      obstaculos: [],
    },
    minCommands: 5,
    allowedCommands: BASICOS,
    hint: "VIRE não anda: só muda para onde o robô está olhando. Depois de virar, ainda falta avançar.",
    solucaoReferencia: ["AVANCE", "AVANCE", "VIRE_DIREITA", "AVANCE", "AVANCE"],
    classroomBridge:
      "A confusão mais comum da turma é achar que VIRE também anda uma casa. Faça um aluno ser o robô e girar sem sair do lugar.",
  },
  {
    id: "desviar-do-obstaculo",
    order: 3,
    title: "Desviar de um obstáculo",
    brief: "Tem uma pedra no caminho reto. O robô não atravessa: precisa contornar.",
    grid: {
      linhas: 6,
      colunas: 6,
      robo: { linha: 5, coluna: 0 },
      direcaoInicial: "norte",
      chave: null,
      bau: { linha: 3, coluna: 0 },
      obstaculos: [{ linha: 4, coluna: 0 }],
    },
    minCommands: 7,
    allowedCommands: BASICOS,
    hint: "Saia da coluna, suba por fora e volte. Contornar custa mais comandos do que ir reto — e tudo bem.",
    solucaoReferencia: [
      "VIRE_DIREITA",
      "AVANCE",
      "VIRE_ESQUERDA",
      "AVANCE",
      "AVANCE",
      "VIRE_ESQUERDA",
      "AVANCE",
    ],
    classroomBridge:
      "Pergunte à turma quantos caminhos diferentes resolvem este desafio. Existe mais de um, e comparar os tamanhos já é otimização.",
  },
  {
    id: "coletar-a-chave",
    order: 4,
    title: "Coletar a chave",
    brief: "O baú está trancado. Passe pela chave antes de chegar nele.",
    grid: {
      linhas: 6,
      colunas: 6,
      robo: { linha: 5, coluna: 0 },
      direcaoInicial: "norte",
      chave: { linha: 3, coluna: 0 },
      bau: { linha: 3, coluna: 2 },
      obstaculos: [],
    },
    minCommands: 5,
    allowedCommands: BASICOS,
    hint: "A chave está no caminho, não fora dele. Basta passar por cima da casa dela.",
    solucaoReferencia: ["AVANCE", "AVANCE", "VIRE_DIREITA", "AVANCE", "AVANCE"],
    classroomBridge:
      "Este é o desafio que ensina sequência. Peça para a turma montar de propósito um caminho que chegue ao baú sem passar pela chave: avance uma casa, vire à direita, avance duas, vire à esquerda e avance. O robô chega — e o baú aparece trancado. É a diferença entre chegar ao lugar certo e chegar na ordem certa.",
  },
  {
    id: "abrir-o-bau",
    order: 5,
    title: "Abrir o baú",
    brief: "A chave ficou longe do baú. O percurso tem três trechos e duas curvas.",
    grid: {
      linhas: 6,
      colunas: 6,
      robo: { linha: 5, coluna: 0 },
      direcaoInicial: "leste",
      chave: { linha: 5, coluna: 3 },
      bau: { linha: 1, coluna: 1 },
      obstaculos: [],
    },
    minCommands: 11,
    allowedCommands: BASICOS,
    hint: "Divida o problema: primeiro chegue à chave, depois pense no baú. Um trecho de cada vez.",
    solucaoReferencia: [
      "AVANCE",
      "AVANCE",
      "AVANCE",
      "VIRE_ESQUERDA",
      "AVANCE",
      "AVANCE",
      "AVANCE",
      "AVANCE",
      "VIRE_ESQUERDA",
      "AVANCE",
      "AVANCE",
    ],
    classroomBridge:
      "Onze comandos é muita coisa para montar de uma vez. Peça para a turma resolver primeiro só até a chave — é decomposição na prática.",
  },
  {
    id: "usar-repeticao",
    order: 6,
    title: "Usar repetição",
    brief: "Mesmo percurso do desafio anterior. Agora você tem as peças REPITA — e onze viram oito.",
    grid: {
      linhas: 6,
      colunas: 6,
      robo: { linha: 5, coluna: 0 },
      direcaoInicial: "leste",
      chave: { linha: 5, coluna: 3 },
      bau: { linha: 1, coluna: 1 },
      obstaculos: [],
    },
    minCommands: 8,
    allowedCommands: COM_REPETICAO,
    hint: "REPITA repete o comando logo depois dele. Procure os trechos com AVANCE seguidos.",
    solucaoReferencia: [
      "REPITA_3X",
      "AVANCE",
      "VIRE_ESQUERDA",
      "REPITA_4X",
      "AVANCE",
      "VIRE_ESQUERDA",
      "REPITA_2X",
      "AVANCE",
    ],
    classroomBridge:
      "Coloque as duas soluções lado a lado no quadro, a de onze e a de oito. A turma vê que repetição não é atalho de preguiça: é o mesmo resultado com menos instruções.",
  },
  {
    id: "menor-algoritmo",
    order: 7,
    title: "Criar o menor algoritmo",
    brief: "Chegue ao baú com o menor número de peças possível. Cinco bastam.",
    grid: {
      linhas: 6,
      colunas: 6,
      robo: { linha: 5, coluna: 0 },
      direcaoInicial: "norte",
      chave: { linha: 1, coluna: 0 },
      bau: { linha: 1, coluna: 4 },
      obstaculos: [],
    },
    minCommands: 5,
    allowedCommands: COM_REPETICAO,
    hint: "São dois trechos retos de quatro casas, separados por uma curva. Duas peças resolvem cada trecho.",
    solucaoReferencia: ["REPITA_4X", "AVANCE", "VIRE_DIREITA", "REPITA_4X", "AVANCE"],
    classroomBridge:
      "Proponha como competição: qual dupla chega ao baú com menos peças? Comparar soluções é o que transforma o exercício em conversa sobre eficiência.",
  },
  {
    id: "crie-seu-desafio",
    order: 8,
    title: "Crie o seu desafio",
    brief:
      "Monte o cenário: escolha onde ficam o robô, a chave, o baú e os obstáculos. Depois resolva o que você mesmo criou — e leve o cenário para a turma.",
    grid: {
      linhas: 6,
      colunas: 6,
      robo: { linha: 5, coluna: 0 },
      direcaoInicial: "norte",
      chave: { linha: 3, coluna: 2 },
      bau: { linha: 1, coluna: 4 },
      obstaculos: [{ linha: 4, coluna: 2 }],
    },
    minCommands: null,
    allowedCommands: COM_REPETICAO,
    hint: "Um bom desafio tem uma solução clara e pelo menos uma armadilha. Tente fazer o baú parecer perto por um caminho que não funciona.",
    solucaoReferencia: [],
    classroomBridge:
      "Quando o aluno cria o desafio em vez de só resolver, ele precisa antecipar o erro do colega. É o passo em que ele deixa de executar e passa a projetar.",
  },
];
