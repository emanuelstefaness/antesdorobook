import type { CommandType, GridSpec } from "@/lib/board/types";
import type { AlgoritmoComDefeito } from "@/lib/engines/bughunt";
import type { PassoOrdenavel } from "@/lib/engines/sequence";

/**
 * Um exemplo real de cada motor, para a página `/praticar/exemplos`.
 *
 * Os dados moram aqui, e não no JSX da página, pelo mesmo motivo dos oito
 * desafios do tabuleiro: conteúdo em arquivo de dados pode ser conferido por
 * teste. `demoMotores.test.ts` roda a solução mínima no motor de verdade e
 * passa o algoritmo com defeito pelo `validarAlgoritmo` — nenhum desses erros
 * apareceria na tela, eles só apareceriam como uma atividade insolúvel.
 */

/**
 * Sequência do sanduíche: o exemplo clássico de algoritmo do cotidiano, e o
 * primeiro que a maioria dos professores leva para a sala. Cada `porque`
 * explica a dependência entre os passos, que é o que a atividade ensina —
 * "está fora de ordem" sozinho não ensinaria nada.
 */
export const SANDUICHE: PassoOrdenavel[] = [
  {
    id: "pegar-pao",
    texto: "Pegar duas fatias de pão",
    porque: "Sem o pão não há onde passar nada.",
  },
  {
    id: "passar",
    texto: "Passar o recheio numa das fatias",
    porque: "O recheio vai na fatia aberta, antes de fechar.",
  },
  {
    id: "fechar",
    texto: "Fechar com a outra fatia",
    porque: "Fechar antes de rechear deixa o recheio de fora.",
  },
  {
    id: "cortar",
    texto: "Cortar ao meio",
    porque: "Cortar só faz sentido com o sanduíche já montado.",
  },
];

/**
 * A semente é fixa para que recarregar a página devolva o mesmo exercício: um
 * professor que voltar para conferir uma dúvida encontra a tela que deixou.
 */
export const SEMENTE_SANDUICHE = 11;

export const TITULO_SANDUICHE = "O algoritmo do sanduíche";

/**
 * Defeito de ordem: todos os passos existem e nenhum está errado sozinho — o
 * que está errado é o lugar de um deles. É o tipo de defeito mais difícil de
 * enxergar justamente porque cada linha, lida isolada, parece correta.
 */
export const DEFEITO_DEMO: AlgoritmoComDefeito = {
  id: "escovar-os-dentes",
  titulo: "Escovar os dentes",
  enunciado:
    "Este algoritmo parece razoável, mas alguém que o seguisse ao pé da letra faria algo estranho. Aponte o passo que está fora de lugar.",
  passos: ["Pegar a escova", "Escovar os dentes", "Colocar pasta na escova", "Enxaguar a boca"],
  indiceDoDefeito: 1,
  tipo: "ordem",
  correcoes: [
    {
      texto: "Trocar este passo de lugar com o próximo",
      certa: true,
      porque:
        "A pasta precisa estar na escova antes de escovar. Trocar os dois passos resolve sem tirar nem acrescentar nada.",
    },
    {
      texto: "Apagar este passo",
      certa: false,
      porque:
        "Sem escovar, o algoritmo não cumpre o objetivo. O passo é necessário — só está cedo demais.",
    },
    {
      texto: "Repetir este passo duas vezes",
      certa: false,
      porque:
        "Escovar duas vezes sem pasta continua sendo escovar sem pasta. Repetir não conserta uma ordem trocada.",
    },
  ],
};

/**
 * Dois trechos retos de quatro casas separados por uma curva: o percurso em que
 * a repetição compensa de verdade. Sem REPITA são nove peças; com REPITA, cinco.
 */
export const GRID_DEMO: GridSpec = {
  linhas: 6,
  colunas: 6,
  robo: { linha: 5, coluna: 0 },
  direcaoInicial: "norte",
  chave: { linha: 1, coluna: 0 },
  bau: { linha: 1, coluna: 4 },
  obstaculos: [],
};

export const PERMITIDOS_DEMO: CommandType[] = [
  "AVANCE",
  "VIRE_DIREITA",
  "VIRE_ESQUERDA",
  "REPITA_2X",
  "REPITA_3X",
  "REPITA_4X",
];

export const SOLUCAO_MINIMA_DEMO: CommandType[] = [
  "REPITA_4X",
  "AVANCE",
  "VIRE_DIREITA",
  "REPITA_4X",
  "AVANCE",
];

/** Declarado à parte porque o motor e o teste precisam do mesmo número. */
export const MINIMO_DEMO = 5;

/**
 * O que fazer com a turma depois de viver cada exemplo. A bancada é para o
 * professor experimentar, e experimentar sem saber o que fazer na segunda-feira
 * não muda aula nenhuma.
 */
export const PONTES_DEMO = {
  sequencia:
    "Peça para a turma ditar o algoritmo do sanduíche e execute ao pé da letra, sem completar nada por conta própria. Quando ninguém disser “abra o pote”, não abra: é assim que a classe descobre que um passo óbvio para uma pessoa não é óbvio para uma máquina.",
  defeito:
    "Escreva no quadro um algoritmo com um passo trocado e não diga qual é. Quem encontrar precisa explicar por que aquele passo não pode vir ali — depurar é justificar, não adivinhar.",
  otimizacao:
    "Depois que todo mundo chegar ao baú, compare os tamanhos das soluções no quadro. A pergunta que rende a aula não é “quem acertou”, é “por que a de cinco peças também chega”.",
} as const;
