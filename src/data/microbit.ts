export type FuncaoNaPlaca = "entrada" | "processamento" | "saida" | "comunicacao" | "energia";

/**
 * A versão anterior deste tipo trazia um `hotspot` com coordenadas sobre uma
 * foto da placa. Saiu: marcadores sobre foto foram reprovados no tabuleiro
 * pelo mesmo motivo que valeria aqui — o professor precisa saber o que cada
 * peça FAZ, e isso se lê melhor em texto agrupado por função do que caçando
 * bolinhas numa imagem.
 */
export type MicrobitPart = {
  id: string;
  name: string;
  fn: string;
  example: string;
  miniTest: string;
  caution: string;
  io: FuncaoNaPlaca;
};

export type MakeCodeMission = {
  id: string;
  order: number;
  title: string;
  goal: string;
  steps: string[];
  blocksUsed: string[];
  expectedResult: string;
  troubleshooting: string[];
  classroomBridge: string;
};

export const NOMES_DAS_FUNCOES: Record<FuncaoNaPlaca, string> = {
  entrada: "Entrada — o que a placa recebe",
  processamento: "Processamento — o que ela faz por dentro",
  saida: "Saída — o que a gente vê e ouve",
  comunicacao: "Comunicação — como ela fala com outras",
  energia: "Energia — o que a mantém ligada",
};

export const MICROBIT_PARTS: MicrobitPart[] = [
  {
    id: "matriz-de-leds",
    name: "Matriz de LEDs",
    fn: "25 luzes vermelhas em 5 linhas por 5 colunas, que acendem individualmente e formam desenhos, letras e números.",
    example: "Mostrar um coração, escrever o nome da turma passando letra por letra.",
    miniTest: "Grave um programa que acenda só o LED do meio. Se ele acender sozinho, a matriz está sob controle.",
    caution:
      "Cinco por cinco é pouco: nomes longos precisam rolar na tela, e a turma acha que travou. Avise antes.",
    io: "saida",
  },
  {
    id: "botao-a",
    name: "Botão A",
    fn: "O botão da esquerda. Fecha um circuito quando pressionado e a placa consegue perguntar se isso aconteceu.",
    example: "Somar um ponto ao contador a cada toque.",
    miniTest: "Faça o botão A acender um ícone. Se acender só quando você aperta, a entrada funciona.",
    caution:
      "A turma aperta e segura. A placa registra um toque, não a duração — a menos que você programe para isso.",
    io: "entrada",
  },
  {
    id: "botao-b",
    name: "Botão B",
    fn: "O botão da direita, idêntico ao A. Ter dois permite ações opostas na mesma placa.",
    example: "A soma pontos, B zera o contador.",
    miniTest: "Programe respostas diferentes para A e B e confira se cada um faz o seu.",
    caution:
      "Trocar A com B no editor é o erro mais comum da aula, e é silencioso: o programa funciona, só que ao contrário.",
    io: "entrada",
  },
  {
    id: "botao-reset",
    name: "Botão de reset",
    fn: "Fica no verso da placa. Reinicia o programa do começo, sem apagar nada.",
    example: "Recomeçar um jogo sem precisar desligar a placa.",
    miniTest: "Deixe um contador subir, aperte o reset e veja o valor voltar ao início.",
    caution:
      "Alunos confundem reset com apagar o programa. Deixe claro que o programa continua lá.",
    io: "entrada",
  },
  {
    id: "acelerometro",
    name: "Acelerômetro",
    fn: "Percebe movimento e inclinação da placa, e reconhece gestos como chacoalhar.",
    example: "Um dado eletrônico que sorteia um número quando a placa é chacoalhada.",
    miniTest: "Programe um ícone para aparecer ao chacoalhar. Chacoalhe de leve — não precisa de força.",
    caution:
      "A turma chacoalha com força para 'funcionar melhor' e a placa cai. Combine o gesto antes de distribuir.",
    io: "entrada",
  },
  {
    id: "sensor-de-temperatura",
    name: "Sensor de temperatura",
    fn: "Mede a temperatura do processador, que se aproxima da temperatura do ambiente.",
    example: "Mostrar na matriz quantos graus estão fazendo na sala.",
    miniTest: "Mostre a temperatura, segure a placa na mão por um minuto e veja o número subir.",
    caution:
      "Ele mede o chip, não o ar. A leitura sobe com a placa na mão — e isso é uma ótima conversa sobre o que um sensor realmente mede.",
    io: "entrada",
  },
  {
    id: "sensor-de-luz",
    name: "Sensor de luz",
    fn: "Os próprios LEDs da matriz, usados ao contrário, medem a luz que chega até eles.",
    example: "Acender um ícone quando a sala escurece.",
    miniTest: "Mostre o valor da luz e cubra a placa com a mão. O número precisa cair.",
    caution:
      "É o sensor mais confiável para começar, mas a sombra da própria mão do aluno altera a leitura sem que ele perceba.",
    io: "entrada",
  },
  {
    id: "bussola",
    name: "Bússola",
    fn: "Detecta o campo magnético e informa para que direção a placa está apontada.",
    example: "Uma seta na matriz que sempre aponta para o norte.",
    miniTest: "Ao usar pela primeira vez, a placa pede para desenhar um círculo inclinando-a. Faça a calibração com a turma.",
    caution:
      "Perto de metal ou de outra placa a leitura desanda. Faça a calibração longe da mesa de ferro.",
    io: "entrada",
  },
  {
    id: "microfone",
    name: "Microfone",
    fn: "Mede o nível de som ao redor, disponível nas placas da versão 2.",
    example: "Um medidor de barulho da sala que acende conforme o volume sobe.",
    miniTest: "Mostre o nível de som e bata palma. O valor precisa saltar.",
    caution:
      "Só existe na versão 2 da placa. Confira a sua antes de planejar a aula em cima disso.",
    io: "entrada",
  },
  {
    id: "processador",
    name: "Processador",
    fn: "O chip que executa o programa, uma instrução por vez, na ordem em que foram enviadas.",
    example: "É ele que decide, a cada momento, o que acender e o que ler dos sensores.",
    miniTest: "Não há teste direto: o processador aparece no fato de o programa rodar.",
    caution:
      "É a parte que a turma não vê e por isso atribui mágica. Vale insistir que ele só faz o que foi enviado.",
    io: "processamento",
  },
  {
    id: "alto-falante",
    name: "Alto-falante",
    fn: "Emite sons e melodias, embutido nas placas da versão 2.",
    example: "Tocar um som curto quando a resposta está certa.",
    miniTest: "Toque uma nota e confira se sai som sem fone conectado.",
    caution:
      "Trinta placas tocando ao mesmo tempo inviabilizam a aula. Combine quando o som pode ser usado.",
    io: "saida",
  },
  {
    id: "radio",
    name: "Rádio",
    fn: "Envia e recebe mensagens curtas entre placas próximas, sem internet.",
    example: "Uma placa manda um número e a outra mostra na matriz.",
    miniTest: "Coloque duas placas no mesmo grupo de rádio e mande um número de uma para a outra.",
    caution:
      "Placas em grupos iguais se atrapalham. Dê um número de grupo diferente para cada dupla da sala.",
    io: "comunicacao",
  },
  {
    id: "pinos",
    name: "Pinos e conectores",
    fn: "Os contatos dourados na borda inferior, onde se ligam garras jacaré, fones e outros componentes.",
    example: "Ligar dois pinos com as mãos e fechar um circuito com o próprio corpo.",
    miniTest: "Segure o pino GND com uma mão e o pino 0 com a outra: a placa detecta o toque.",
    caution:
      "Garras jacaré soltam com facilidade e a turma acha que o programa quebrou. Confira a ligação antes do código.",
    io: "comunicacao",
  },
  {
    id: "alimentacao",
    name: "Alimentação",
    fn: "A placa liga pelo cabo USB ou por duas pilhas AAA no conector lateral.",
    example: "Levar a placa para medir a luz do pátio, sem computador por perto.",
    miniTest: "Desconecte o USB com o suporte de pilhas ligado. O programa precisa continuar rodando.",
    caution:
      "Pilhas fracas fazem a placa reiniciar sozinha no meio da atividade, e o sintoma parece erro de programa.",
    io: "energia",
  },
];

export const MAKECODE_MISSIONS: MakeCodeMission[] = [
  {
    id: "criar-projeto",
    order: 1,
    title: "Criar o primeiro projeto",
    goal: "Abrir o editor e criar um projeto vazio com nome, para não perder o trabalho.",
    steps: [
      "Abra makecode.microbit.org no navegador.",
      "Clique em Novo Projeto e dê um nome que identifique a turma e a data.",
      "Confira que a tela mostra a placa simulada à esquerda e a área de blocos à direita.",
    ],
    blocksUsed: [],
    expectedResult: "Um projeto vazio aberto, com a placa simulada visível e o nome salvo.",
    troubleshooting: [
      "Se o editor não abrir, tente outro navegador — o Chrome é o mais estável para esta ferramenta.",
      "Projetos ficam salvos no navegador daquela máquina. Num laboratório compartilhado, oriente a baixar o arquivo no fim da aula.",
    ],
    classroomBridge:
      "Combine o padrão de nome antes de a turma começar. Trinta projetos chamados 'Sem título' custam mais tempo do que a aula inteira.",
  },
  {
    id: "conhecer-a-interface",
    order: 2,
    title: "Conhecer a interface",
    goal: "Identificar as três áreas do editor: simulador, gavetas de blocos e área de montagem.",
    steps: [
      "Aponte o simulador à esquerda e mostre que ele reage ao que for montado.",
      "Abra duas gavetas de blocos e mostre que cada cor é uma categoria.",
      "Arraste um bloco qualquer para a área de montagem e depois arraste-o de volta para apagá-lo.",
    ],
    blocksUsed: ["mostrar ícone"],
    expectedResult: "O aluno sabe onde arrastar blocos e como apagá-los.",
    troubleshooting: [
      "Blocos que não encaixam quase sempre estão fora dos blocos 'ao iniciar' ou 'para sempre'.",
      "Se a área de montagem ficar bagunçada, o botão direito oferece organizar os blocos.",
    ],
    classroomBridge:
      "Deixe cinco minutos livres para a turma explorar antes de dar qualquer tarefa. A curiosidade satisfeita no começo economiza dispersão depois.",
  },
  {
    id: "usar-o-simulador",
    order: 3,
    title: "Usar o simulador",
    goal: "Testar um programa sem a placa física, para que a aula funcione mesmo com poucos equipamentos.",
    steps: [
      "Monte um programa simples que mostre um ícone.",
      "Observe o simulador reagindo imediatamente, sem precisar enviar nada.",
      "Clique nos botões A e B do simulador e veja a resposta.",
    ],
    blocksUsed: ["ao iniciar", "mostrar ícone"],
    expectedResult: "O ícone aparece na placa simulada assim que o bloco é encaixado.",
    troubleshooting: [
      "Se o simulador não atualizar, use o botão de reiniciar logo abaixo dele.",
      "Blocos soltos, fora de 'ao iniciar' ou 'para sempre', não são executados — e o simulador fica parado sem avisar por quê.",
    ],
    classroomBridge:
      "O simulador resolve o problema de ter três placas para trinta alunos: todos programam, e a placa física circula para o teste final.",
  },
  {
    id: "mostrar-um-icone",
    order: 4,
    title: "Mostrar um ícone",
    goal: "Produzir a primeira saída visível, acendendo um desenho na matriz.",
    steps: [
      "Arraste o bloco 'mostrar ícone' para dentro de 'ao iniciar'.",
      "Escolha um ícone na lista do próprio bloco.",
      "Troque para 'mostrar LEDs' e desenhe um ícone próprio, ponto a ponto.",
    ],
    blocksUsed: ["ao iniciar", "mostrar ícone", "mostrar LEDs"],
    expectedResult: "O desenho escolhido acende na matriz e permanece aceso.",
    troubleshooting: [
      "Ícone que aparece e some rápido demais costuma estar dentro de 'para sempre' junto com um 'limpar tela'.",
      "Desenho invertido quase sempre é a placa segurada de cabeça para baixo.",
    ],
    classroomBridge:
      "Peça que desenhem no papel quadriculado antes de ir para a tela. Projetar antes de executar é o mesmo hábito do tabuleiro.",
  },
  {
    id: "programar-os-botoes",
    order: 5,
    title: "Programar os botões",
    goal: "Fazer a placa responder de maneiras diferentes a A e a B.",
    steps: [
      "Arraste 'quando botão A for pressionado' e coloque um ícone dentro.",
      "Faça o mesmo para o botão B, com um ícone diferente.",
      "Teste os dois no simulador antes de enviar para a placa.",
    ],
    blocksUsed: ["quando botão A for pressionado", "quando botão B for pressionado", "mostrar ícone"],
    expectedResult: "Cada botão mostra o seu próprio ícone, e nada acontece sem apertar.",
    troubleshooting: [
      "Se os dois botões fizerem a mesma coisa, provavelmente o segundo bloco está configurado como A.",
      "Ícone que não apaga entre um toque e outro: acrescente 'limpar tela' antes de mostrar o novo.",
    ],
    classroomBridge:
      "É a primeira vez que o aluno define o que é entrada. Pergunte o que aconteceria se ninguém apertasse nada.",
  },
  {
    id: "criar-variavel",
    order: 6,
    title: "Criar uma variável",
    goal: "Guardar um valor que muda ao longo do programa.",
    steps: [
      "Na gaveta Variáveis, crie uma variável com nome claro, como pontos.",
      "Em 'ao iniciar', defina pontos como 0.",
      "No botão A, altere pontos em 1 e mostre o número.",
    ],
    blocksUsed: ["definir", "alterar por", "mostrar número"],
    expectedResult: "O número na matriz sobe de um em um a cada toque no botão A.",
    troubleshooting: [
      "Número que não sobe: a alteração provavelmente ficou fora do bloco do botão.",
      "Número que volta a zero sozinho: o 'definir como 0' está dentro de 'para sempre' em vez de 'ao iniciar'.",
    ],
    classroomBridge:
      "Desenhe uma caixa com o nome da variável no quadro. A turma precisa de uma imagem para 'lugar onde a placa guarda'.",
  },
  {
    id: "usar-condicao",
    order: 7,
    title: "Usar uma condição",
    goal: "Fazer a placa escolher entre dois caminhos conforme o valor de algo.",
    steps: [
      "Arraste um bloco 'se… então… senão' para dentro de 'para sempre'.",
      "Na condição, compare a variável com um número.",
      "Coloque uma saída diferente em cada ramo.",
    ],
    blocksUsed: ["se então senão", "comparação", "mostrar ícone"],
    expectedResult: "A placa mostra um ícone enquanto o valor é menor que o limite, e outro quando passa.",
    troubleshooting: [
      "Se um dos ramos nunca acontece, confira o sinal da comparação — maior e menor trocados é o erro mais comum.",
      "Condição dentro de 'ao iniciar' só é avaliada uma vez; para reagir a mudanças, ela precisa estar em 'para sempre'.",
    ],
    classroomBridge:
      "Antes do código, faça a turma dizer a regra em voz alta na forma 'se… então…'. Quem consegue dizer, consegue montar.",
  },
  {
    id: "usar-repeticao",
    order: 8,
    title: "Usar repetição",
    goal: "Repetir um trecho sem duplicar blocos.",
    steps: [
      "Monte uma sequência de dois ícones alternados sem repetição, e conte os blocos.",
      "Envolva os dois em um bloco 'repetir 4 vezes'.",
      "Compare o número de blocos das duas versões.",
    ],
    blocksUsed: ["repetir vezes", "mostrar ícone", "pausar"],
    expectedResult: "A mesma animação, com menos blocos na tela.",
    troubleshooting: [
      "Animação rápida demais para ver: falta um bloco 'pausar' entre os ícones.",
      "Se o programa parecer travado, verifique se há uma repetição sem pausa dentro de 'para sempre'.",
    ],
    classroomBridge:
      "É a mesma conversa da peça REPITA do tabuleiro. Coloque as duas versões lado a lado e conte os blocos com a turma.",
  },
  {
    id: "ler-sensores",
    order: 9,
    title: "Ler os sensores",
    goal: "Trazer um dado do mundo real para dentro do programa.",
    steps: [
      "Escolha um sensor — luz é o mais confiável para começar.",
      "Mostre o valor lido na matriz, dentro de 'para sempre'.",
      "Mude a condição do ambiente e observe o número acompanhar.",
    ],
    blocksUsed: ["para sempre", "nível de luz", "mostrar número"],
    expectedResult: "O número na matriz muda quando a luz sobre a placa muda.",
    troubleshooting: [
      "Valor congelado: a leitura provavelmente está em 'ao iniciar', que roda uma vez só.",
      "Números pulando muito: é normal. Vale discutir com a turma por que uma medição real oscila.",
    ],
    classroomBridge:
      "Pergunte o que exatamente o sensor está medindo, e o que ele deixa de fora. É abstração aparecendo num número.",
  },
  {
    id: "transferir-para-a-placa",
    order: 10,
    title: "Transferir para a placa",
    goal: "Enviar o programa do editor para o micro:bit físico.",
    steps: [
      "Conecte a placa ao computador pelo cabo USB de dados.",
      "Clique em Baixar e escolha a unidade MICROBIT quando o navegador pedir.",
      "Aguarde a luz amarela do verso parar de piscar antes de desconectar.",
    ],
    blocksUsed: [],
    expectedResult: "O programa roda na placa mesmo depois de desconectada do computador.",
    troubleshooting: [
      "A placa não aparece como unidade: quase sempre o cabo é só de carga, sem os fios de dados. Teste outro cabo antes de qualquer outra coisa.",
      "Desconectar durante a piscada amarela corrompe o envio. Refaça o processo até o fim.",
      "Em laboratórios com restrição de acesso, o download pode cair na pasta Downloads: arraste o arquivo para a unidade MICROBIT manualmente.",
    ],
    classroomBridge:
      "Reserve dez minutos só para esta etapa na primeira aula com placas. Ela sempre demora mais do que o previsto, e chegar apressado aqui estraga a aula inteira.",
  },
];

export function componentesPorFuncao(io: FuncaoNaPlaca): MicrobitPart[] {
  return MICROBIT_PARTS.filter((p) => p.io === io);
}
