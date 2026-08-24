export type QuickArea = "placa" | "turma" | "material" | "tempo";

/**
 * Cada item se parte em "agora" e "da próxima vez" de propósito.
 *
 * Quem abre esta página está de pé na frente de trinta alunos com alguma coisa
 * quebrada na mão. Nessa hora ele lê uma frase, no máximo duas — então "agora"
 * vem primeiro, começa por um verbo e cabe num olhar. "Da próxima vez" é para
 * depois da aula, quando dá para pensar em prevenção. Misturar os dois numa
 * explicação só faz o professor ter que garimpar a ação no meio do texto.
 */
export type QuickFix = {
  id: string;
  area: QuickArea;
  /** Como o professor descreveria o problema, não como um manual descreveria. */
  problem: string;
  now: string;
  later: string;
};

export const NOMES_DAS_AREAS_DE_AJUDA: Record<QuickArea, string> = {
  placa: "A placa não coopera",
  turma: "A turma desandou",
  material: "Faltou material",
  tempo: "O tempo não fechou",
};

export const QUICK_HELP: QuickFix[] = [
  {
    id: "computador-nao-reconhece",
    area: "placa",
    problem: "Liguei a placa no computador e ele não reconhece.",
    now: "Troque o cabo. Se a placa acende mas não aparece como um pendrive chamado MICROBIT, o problema é quase sempre um cabo que só leva energia e não leva dados — e eles são idênticos por fora.",
    later:
      "Teste os cabos em casa e marque com fita colorida os que transferem. Um cabo de carregador de celular velho tem grande chance de ser só de energia.",
  },
  {
    id: "transferencia-falha",
    area: "placa",
    problem: "O botão de transferir do MakeCode dá erro.",
    now: "Baixe o arquivo .hex e arraste ele para dentro da unidade MICROBIT, como se fosse um pendrive. O LED amarelo do verso pisca enquanto grava e para quando termina.",
    later:
      "Arrastar o arquivo funciona em qualquer navegador e sem permissão nenhuma. O botão de transferir depende de uma autorização que muita máquina de escola não dá.",
  },
  {
    id: "placa-nao-liga",
    area: "placa",
    problem: "A placa simplesmente não acende.",
    now: "Confira a fonte antes da placa. Na pilha: conector firme e pilhas na posição certa. No cabo: ligue em outra porta USB, porque porta de teclado e hub costumam não dar corrente suficiente.",
    later:
      "Leve um par de pilhas novas de reserva. Pilha fraca não apaga a placa de uma vez: ela deixa a matriz fraca e o comportamento estranho, o que confunde muito mais.",
  },
  {
    id: "programa-nao-roda",
    area: "placa",
    problem: "O programa foi gravado mas a placa não faz nada.",
    now: "Aperte o reset no verso. Se ainda assim nada acontece, o programa provavelmente está inteiro dentro de um bloco que espera um evento que ninguém disparou — como um botão que ninguém apertou.",
    later:
      "Peça para a turma sempre começar pelo bloco 'ao iniciar' com um ícone qualquer. Assim dá para saber em um segundo se o programa chegou na placa.",
  },
  {
    id: "texto-passa-rapido",
    area: "placa",
    problem: "O texto na matriz passa rápido demais e ninguém consegue ler.",
    now: "Diga à turma que é assim mesmo e mande rodar de novo. Cinco por cinco não mostra uma palavra inteira: as letras desfilam uma por uma, e o olho precisa de duas ou três passadas para pegar.",
    later:
      "Para número e resultado, prefira 'mostrar número' a 'mostrar texto'. E combine com a turma que nome de time tem no máximo quatro letras.",
  },
  {
    id: "bussola-calibracao",
    area: "placa",
    problem: "A placa pede para desenhar um círculo e a turma não consegue sair disso.",
    now: "Incline a placa devagar em círculo, como quem faz um prato girar — não gire no próprio eixo. É a calibração da bússola, e ela só termina quando todos os pontos da borda acenderem.",
    later:
      "Calibre longe de mesa de metal e de outras placas. Perto de metal a calibração não fecha nunca, e a turma acha que a placa quebrou.",
  },
  {
    id: "radio-misturado",
    area: "placa",
    problem: "As mensagens de rádio de um grupo estão aparecendo no outro.",
    now: "Dê um número diferente para cada dupla no bloco 'definir grupo de rádio'. Todas as placas saem de fábrica no grupo zero, então sem isso todo mundo escuta todo mundo.",
    later:
      "Distribua os números antes de começar, escritos na lousa. Deixar cada dupla escolher gera coincidência na hora errada.",
  },
  {
    id: "grupo-terminou-antes",
    area: "turma",
    problem: "Um grupo terminou e os outros nem na metade estão.",
    now: "Dê a mesma tarefa com uma restrição: resolver de novo usando menos comandos. Não é exercício extra, é o mesmo problema com uma pergunta melhor — e costuma ser mais difícil que o original.",
    later:
      "Deixe a versão com restrição escrita no plano desde o começo. Improvisar desafio extra no meio da aula é o que mais tira o professor do controle do tempo.",
  },
  {
    id: "turma-toda-travou",
    area: "turma",
    problem: "A turma inteira empacou no mesmo ponto.",
    now: "Pare tudo e resolva um caso junto na lousa, do começo ao fim, errando de propósito uma vez. Quando o travamento é geral, não é dificuldade individual: é enunciado que não ficou claro.",
    later:
      "Refaça a abertura da atividade. O ponto onde todos travaram indica exatamente qual frase da explicação não funcionou.",
  },
  {
    id: "aluno-domina-a-dupla",
    area: "turma",
    problem: "Numa dupla, um aluno faz tudo e o outro só assiste.",
    now: "Troque os papéis por tempo, não por tarefa: a cada três minutos quem executava passa a comandar. Trocar 'quando terminar' nunca chega a acontecer.",
    later:
      "Distribua os papéis por sorteio na largada, e anuncie desde o início que a troca vai acontecer no meio. Saber que vai trocar muda o comportamento de quem domina.",
  },
  {
    id: "turma-agitada",
    area: "turma",
    problem: "A atividade é de corpo e a turma virou bagunça.",
    now: "Congele: só quem está executando pode se mover, todos os outros ficam sentados. Um robô por vez, e o resto da turma vira quem confere se ele obedeceu certo.",
    later:
      "Combine o sinal de parada antes de qualquer um levantar. Palma dupla, luz apagada, o que for — mas combinado com a turma sentada, nunca no meio do movimento.",
  },
  {
    id: "ninguem-quer-ser-robo",
    area: "turma",
    problem: "Ninguém quer ser o robô na frente da turma.",
    now: "Seja você o robô na primeira rodada, e obedeça mal de propósito. Depois que a turma rir do professor batendo na mesa porque ninguém mandou parar, aparece voluntário.",
    later:
      "O papel de robô ficou parecendo o papel de quem erra. Deixe claro desde a abertura que o robô nunca erra: quem erra é quem programou.",
  },
  {
    id: "sem-fita-crepe",
    area: "material",
    problem: "Não tenho fita-crepe ou não posso marcar o chão.",
    now: "Use o que já é grade: piso de cerâmica, as próprias carteiras afastadas, ou folhas de sulfite soltas no chão. A grade só precisa ser visível, não permanente.",
    later:
      "Barbante amarrado em pés de carteira monta e desmonta em dois minutos e serve para o ano todo.",
  },
  {
    id: "sem-kit-tabuleiro",
    area: "material",
    problem: "Não tenho o kit do tabuleiro.",
    now: "Abra o simulador do site e projete. Ele faz o mesmo percurso, e a turma comanda em voz alta enquanto um aluno monta a fila na tela.",
    later:
      "As atividades desplugadas de PRATICAR não dependem do kit em nenhum momento. O kit acelera, mas não é pré-requisito de nada.",
  },
  {
    id: "poucas-placas",
    area: "material",
    problem: "Tenho menos placas do que grupos.",
    now: "Use o simulador do MakeCode para todos programarem ao mesmo tempo, e faça rodízio só na hora de gravar. Programar leva vinte minutos, gravar leva vinte segundos.",
    later:
      "Uma placa para cada quatro alunos já roda bem se o rodízio for só da gravação. Mais que isso, a fila come a aula.",
  },
  {
    id: "um-computador-so",
    area: "material",
    problem: "Só tem um computador na sala, o meu.",
    now: "Projete e conduza pela turma: eles ditam os blocos, você monta. É mais lento, mas todo mundo acompanha o mesmo raciocínio — e ninguém fica esperando a vez.",
    later:
      "Nesse formato, escolha atividades de sequência e de erro. Elas rendem discussão coletiva; as de otimização rendem mais quando cada dupla testa a sua.",
  },
  {
    id: "faltou-tempo",
    area: "tempo",
    problem: "Faltam dez minutos e a atividade não vai terminar.",
    now: "Pare agora e faça o fechamento. A conversa sobre o que aconteceu vale mais que chegar ao fim, e uma atividade interrompida no fechamento certo se retoma na aula seguinte sem perda nenhuma.",
    later:
      "Corte pela metade a quantidade de casos, não a discussão. Foi quase sempre o número de rodadas que estourou, não o assunto.",
  },
  {
    id: "sobrou-tempo",
    area: "tempo",
    problem: "Acabou em quinze minutos e sobrou meia aula.",
    now: "Peça para as duplas trocarem os algoritmos e executarem o do colega ao pé da letra. Executar o que o outro escreveu revela ambiguidade que nenhuma revisão do próprio texto revela.",
    later:
      "Essa troca funciona como encerramento de quase toda atividade daqui. Vale deixar no plano como parte fixa, não como plano B.",
  },
];

export function ajudaDaArea(area: QuickArea): QuickFix[] {
  return QUICK_HELP.filter((q) => q.area === area);
}
