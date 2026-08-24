import type { Ref } from "./types";

export type GlossaryArea = "pensamento-computacional" | "tabuleiro" | "microbit" | "sala-de-aula";

export type GlossaryTerm = {
  id: string;
  term: string;
  area: GlossaryArea;
  /** Uma frase que um professor sem formação em computação entende de primeira. */
  plain: string;
  /** O erro de entendimento mais comum sobre este termo. */
  confusion: string;
  seeAlso: Ref | null;
};

export const NOMES_DAS_AREAS: Record<GlossaryArea, string> = {
  "pensamento-computacional": "Pensamento computacional",
  tabuleiro: "Tabuleiro e comandos",
  microbit: "micro:bit e MakeCode",
  "sala-de-aula": "Condução da aula",
};

/**
 * Cada verbete tem um campo `confusion` porque a definição sozinha não resolve
 * o problema do professor: ele quase sempre já tem uma ideia do termo, e ela é
 * ligeiramente errada. Nomear a confusão comum corrige mais rápido do que
 * repetir a definição correta.
 */
export const GLOSSARY: GlossaryTerm[] = [
  {
    id: "algoritmo",
    term: "Algoritmo",
    area: "pensamento-computacional",
    plain: "Uma sequência de passos que resolve um problema e termina.",
    confusion:
      "Nem toda lista é algoritmo. Uma lista de dicas não tem objetivo nem fim — e é isso que a desqualifica.",
    seeAlso: { label: "Conceito: algoritmos", href: "/aprender/algoritmos" },
  },
  {
    id: "pensamento-computacional",
    term: "Pensamento computacional",
    area: "pensamento-computacional",
    plain: "Organizar um problema de um jeito que dê para resolver passo a passo.",
    confusion:
      "Não é aula de informática, e não depende de computador. Acontece antes de qualquer máquina entrar na história.",
    seeAlso: {
      label: "Conceito: o que é pensamento computacional",
      href: "/aprender/o-que-e-pensamento-computacional",
    },
  },
  {
    id: "decomposicao",
    term: "Decomposição",
    area: "pensamento-computacional",
    plain: "Dividir um problema grande em partes pequenas o bastante para resolver uma de cada vez.",
    confusion:
      "Não é organizar por organizar. Se uma parte ainda trava o aluno, ela precisa ser dividida de novo.",
    seeAlso: { label: "Conceito: decomposição", href: "/aprender/decomposicao" },
  },
  {
    id: "abstracao",
    term: "Abstração",
    area: "pensamento-computacional",
    plain: "Deixar de fora tudo o que não importa para o problema que se está resolvendo.",
    confusion:
      "Não é resumir. Resumir encurta; abstrair escolhe pelo objetivo — e o que fica de fora muda quando o objetivo muda.",
    seeAlso: { label: "Conceito: abstração", href: "/aprender/abstracao" },
  },
  {
    id: "padrao",
    term: "Padrão",
    area: "pensamento-computacional",
    plain: "Algo que se repete, e que por isso permite resolver uma vez e reaproveitar.",
    confusion:
      "Parecido não é padrão. Sem apontar onde a repetição começa e termina, é só semelhança.",
    seeAlso: {
      label: "Conceito: reconhecimento de padrões",
      href: "/aprender/reconhecimento-de-padroes",
    },
  },
  {
    id: "depuracao",
    term: "Depuração",
    area: "pensamento-computacional",
    plain: "Usar o que deu errado para localizar onde está o defeito.",
    confusion:
      "Não é consertar. Depurar é achar; consertar vem depois — e apagar tudo para recomeçar pula a parte que ensina.",
    seeAlso: { label: "Conceito: teste e depuração", href: "/aprender/teste-e-depuracao" },
  },
  {
    id: "entrada-processamento-saida",
    term: "Entrada, processamento e saída",
    area: "pensamento-computacional",
    plain: "O que a máquina recebe, o que ela faz com isso e o que ela devolve.",
    confusion:
      "Serve para tarefas, não só para aparelhos. Um aluno resolvendo uma conta tem os três momentos.",
    seeAlso: {
      label: "Conceito: entrada, processamento e saída",
      href: "/aprender/entrada-processamento-e-saida",
    },
  },
  {
    id: "instrucao-ambigua",
    term: "Instrução ambígua",
    area: "pensamento-computacional",
    plain: "Uma instrução que está escrita e na ordem certa, mas admite mais de uma leitura.",
    confusion:
      "É diferente de instrução faltando. A ambígua está lá — o problema é que duas pessoas a executam de jeitos diferentes.",
    seeAlso: {
      label: "Atividade: instruções ambíguas",
      href: "/praticar/instrucoes-ambiguas",
    },
  },
  {
    id: "avance",
    term: "AVANCE",
    area: "tabuleiro",
    plain: "Move o robô uma casa na direção para a qual ele está olhando.",
    confusion:
      "Ele não sabe para onde é o baú. Avança sempre para a frente do robô, não para o objetivo.",
    seeAlso: { label: "Simulador do tabuleiro", href: "/tabuleiro" },
  },
  {
    id: "vire",
    term: "VIRE",
    area: "tabuleiro",
    plain: "Gira o robô 90 graus sem tirá-lo da casa em que ele está.",
    confusion:
      "Virar não anda. É o erro mais persistente do tabuleiro inteiro, e ele só cede quando um aluno gira o corpo sem sair do lugar.",
    seeAlso: { label: "Atividade: robô humano", href: "/praticar/robo-humano" },
  },
  {
    id: "repeticao",
    term: "Repetição",
    area: "pensamento-computacional",
    plain:
      "Dizer uma vez o que deve acontecer várias vezes. É o que transforma nove comandos iguais em dois: o que fazer, e quantas vezes.",
    confusion:
      "Repetição não é sobre economizar peça, é sobre nomear o que se repete. Encurtar é a consequência — quem persegue só o número menor acaba com uma fila curta que ninguém consegue ler.",
    seeAlso: { label: "Conceito: repetição", href: "/aprender/repeticao" },
  },
  {
    id: "repita",
    term: "REPITA",
    // A peça e o conceito são verbetes separados de propósito: a peça é do
    // tabuleiro e tem regra própria, o conceito vale igual no micro:bit e no
    // desplugado. Antes deste par, a palavra "repetição" não aparecia em
    // verbete nenhum e a busca não achava nada com ela.
    area: "tabuleiro",
    plain:
      "A peça do tabuleiro que realiza a repetição: executa várias vezes o comando que vem logo depois dela.",
    confusion:
      "Repete só o próximo comando, não a fila inteira. E em trechos de um comando só, ela aumenta a lista em vez de encurtar.",
    seeAlso: {
      label: "Atividade: sequências repetidas",
      href: "/praticar/sequencias-repetidas",
    },
  },
  {
    id: "minimo-de-pecas",
    term: "Mínimo de peças",
    area: "tabuleiro",
    plain: "O menor número de comandos com que aquele desafio pode ser resolvido.",
    confusion:
      "Resolver com mais peças não está errado. O mínimo é uma meta de eficiência, não um critério de acerto.",
    seeAlso: {
      label: "Atividade: economize comandos",
      href: "/praticar/economize-comandos",
    },
  },
  {
    id: "matriz-de-leds",
    term: "Matriz de LEDs",
    area: "microbit",
    plain: "As 25 luzes do micro:bit, em 5 linhas por 5 colunas.",
    confusion:
      "Cinco por cinco é pouco. Nomes e frases rolam pela tela, e a turma acha que a placa travou.",
    seeAlso: { label: "Área do BBC micro:bit", href: "/microbit" },
  },
  {
    id: "variavel",
    term: "Variável",
    area: "microbit",
    plain: "Um lugar com nome onde o programa guarda um valor que pode mudar.",
    confusion:
      "Definir o valor inicial dentro de 'para sempre' zera a variável continuamente — e nada parece funcionar.",
    seeAlso: {
      label: "Aulas de programas interativos",
      href: "/aulas/caminho#programas-interativos",
    },
  },
  {
    id: "condicao",
    term: "Condição",
    area: "microbit",
    plain: "Um teste que faz o programa seguir por um caminho ou por outro.",
    confusion:
      "Condição dentro de 'ao iniciar' é avaliada uma vez só. Para reagir a mudanças, ela precisa estar em 'para sempre'.",
    seeAlso: { label: "Aulas de lógica e jogos", href: "/aulas/caminho#logica-e-jogos" },
  },
  {
    id: "sensor",
    term: "Sensor",
    area: "microbit",
    plain: "A parte da placa que traduz algo do mundo — luz, movimento, som — em número.",
    confusion:
      "O sensor mede o que ele consegue alcançar, não o que você quer saber. O de temperatura mede o chip, não o ar da sala.",
    seeAlso: {
      label: "Aulas de sensores e dados",
      href: "/aulas/caminho#sensores-e-dados",
    },
  },
  {
    id: "simulador-makecode",
    term: "Simulador do MakeCode",
    area: "microbit",
    plain: "A placa desenhada na tela do editor, que executa o programa sem o equipamento físico.",
    confusion:
      "Ele resolve o problema de ter poucas placas: todos programam, e a placa física circula só para o teste final.",
    seeAlso: { label: "Área do BBC micro:bit", href: "/microbit" },
  },
  {
    id: "desplugado",
    term: "Desplugado",
    area: "sala-de-aula",
    plain: "Atividade de pensamento computacional feita sem nenhum equipamento eletrônico.",
    confusion:
      "Não é a versão pobre da aula com computador. Vários conceitos ficam mais claros sem tela nenhuma.",
    seeAlso: { label: "Atividades do PRATICAR", href: "/praticar" },
  },
  {
    id: "pergunta-mediadora",
    term: "Pergunta mediadora",
    area: "sala-de-aula",
    plain: "A pergunta que o professor faz durante a atividade para destravar sem entregar a resposta.",
    confusion:
      "Não é pergunta de verificação. Se ela tem uma resposta certa curta, provavelmente está entregando em vez de mediar.",
    seeAlso: { label: "Planos de aula", href: "/planejar" },
  },
  {
    id: "criterio-de-parada",
    term: "Critério de parada",
    area: "sala-de-aula",
    plain: "O que diz que a tarefa terminou.",
    confusion:
      "É o que mais falta nos algoritmos escritos pela turma, e o erro só aparece quando alguém tenta executar até o fim.",
    seeAlso: { label: "Conceito: algoritmos", href: "/aprender/algoritmos" },
  },
];

export function termosDaArea(area: GlossaryArea): GlossaryTerm[] {
  return GLOSSARY.filter((t) => t.area === area);
}

/**
 * Busca sem acento e sem diferenciar maiúsculas: o professor digita "algoritmo"
 * ou "Algoritmo" ou "abstracao", e as três precisam encontrar.
 */
// Intervalo dos sinais diacríticos combinantes. Construído por código de ponto
// e não com os caracteres literais: eles são invisíveis no editor e qualquer
// cópia descuidada os perde sem que nada acuse o erro.
const DIACRITICOS = new RegExp("[\\u0300-\\u036f]", "g");

export function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(DIACRITICOS, "").toLowerCase().trim();
}

export function buscarTermos(consulta: string): GlossaryTerm[] {
  const q = normalizar(consulta);
  if (q.length === 0) return GLOSSARY;
  return GLOSSARY.filter((t) =>
    [t.term, t.plain, t.confusion].some((campo) => normalizar(campo).includes(q)),
  );
}
