import type { Material, Ref } from "./types";

export type Trail = {
  id: string;
  order: number;
  title: string;
  willLearn: string;
  whyItMatters: string;
  prerequisites: string[];
  estimatedMinutes: number;
  materials: Material[];
  outcome: string;
  next: Ref | null;
};

/**
 * O tipo do assunto é menor que o da spec: saíram `demo` (uma demonstração
 * visual própria por assunto seriam 24 componentes novos, e a trilha já é
 * sequência de projetos concretos) e os campos de navegação anterior/próximo,
 * que a página deriva da ordem em vez de repetir em cada registro — dois
 * lugares guardando a mesma verdade divergem na primeira edição.
 */
export type Topic = {
  id: string;
  order: number;
  title: string;
  trailId: string;
  summary: string;
  concepts: string[];
  objective: string;
  howToExplain: string;
  materials: Material[];
  preparation: string;
  steps: string[];
  questions: string[];
  difficulties: string[];
  assessment: string[];
};

export const TRAILS: Trail[] = [
  {
    id: "primeiros-comandos",
    order: 1,
    title: "Primeiros comandos",
    willLearn: "Ligar a placa, acender o que você desenhou e fazer os botões responderem.",
    whyItMatters:
      "É a trilha que tira o medo. Depois dela o professor sabe que consegue chegar ao fim de uma aula com placas sem nada travar.",
    prerequisites: [],
    estimatedMinutes: 200,
    materials: ["microbit", "computador", "papel-e-lapis"],
    outcome: "Uma animação curta, feita pela turma, rodando na placa sem o computador.",
    next: { label: "Criatividade e narrativas", href: "/trilhas/criatividade-e-narrativas" },
  },
  {
    id: "criatividade-e-narrativas",
    order: 2,
    title: "Criatividade e narrativas",
    willLearn: "Usar a placa para contar algo — uma história, um nome, um humor, um sorteio.",
    whyItMatters:
      "É onde o aluno percebe que programar não é só resolver problema de matemática. Turmas que resistem à tecnologia costumam entrar por aqui.",
    prerequisites: ["primeiros-comandos"],
    estimatedMinutes: 200,
    materials: ["microbit", "computador", "reciclaveis"],
    outcome: "Um crachá animado com o nome do aluno, para usar preso à roupa.",
    next: { label: "Lógica e jogos", href: "/trilhas/logica-e-jogos" },
  },
  {
    id: "logica-e-jogos",
    order: 3,
    title: "Lógica e jogos",
    willLearn: "Fazer a placa decidir entre caminhos e repetir trechos sem duplicar blocos.",
    whyItMatters:
      "Condição e repetição são o coração da programação, e jogo é o contexto em que a turma aceita repetir dez vezes até acertar.",
    prerequisites: ["primeiros-comandos"],
    estimatedMinutes: 200,
    materials: ["microbit", "computador"],
    outcome: "Um jogo de reflexo jogável em duplas, com placar.",
    next: { label: "Dados e decisões", href: "/trilhas/dados-e-decisoes" },
  },
  {
    id: "dados-e-decisoes",
    order: 4,
    title: "Dados e decisões",
    willLearn: "Guardar valores, compará-los e transformar números da turma em um gráfico.",
    whyItMatters:
      "É a trilha que conversa diretamente com matemática. O dado deixa de ser exercício e passa a vir da própria sala.",
    prerequisites: ["logica-e-jogos"],
    estimatedMinutes: 200,
    materials: ["microbit", "computador", "papel-e-lapis"],
    outcome: "Um gráfico de barras na matriz, montado com dados coletados da turma.",
    next: { label: "Sensores e mundo físico", href: "/trilhas/sensores-e-mundo-fisico" },
  },
  {
    id: "sensores-e-mundo-fisico",
    order: 5,
    title: "Sensores e mundo físico",
    willLearn: "Ler movimento, luz, temperatura e som, e discutir o que cada número significa.",
    whyItMatters:
      "É onde a placa deixa de ser brinquedo de tela e passa a medir a escola. Também é a trilha que mais rende conversa sobre o que um dado esconde.",
    prerequisites: ["dados-e-decisoes"],
    estimatedMinutes: 200,
    materials: ["microbit", "computador", "papel-e-lapis"],
    outcome: "Um levantamento das condições de luz e temperatura de três pontos da escola.",
    next: { label: "Criação e prototipagem", href: "/trilhas/criacao-e-prototipagem" },
  },
  {
    id: "criacao-e-prototipagem",
    order: 6,
    title: "Criação e prototipagem",
    willLearn: "Ligar placas entre si, usar os pinos e transformar um programa em objeto.",
    whyItMatters:
      "Fecha o percurso com o aluno projetando, não executando. É a trilha que produz o que se mostra para a escola inteira.",
    prerequisites: ["sensores-e-mundo-fisico"],
    estimatedMinutes: 240,
    materials: ["microbit", "computador", "reciclaveis"],
    outcome: "Um protótipo funcional apresentado numa feira de projetos da turma.",
    next: null,
  },
];

export const TOPICS: Topic[] = [
  // ── Trilha 1 ──────────────────────────────────────────────────────────────
  {
    id: "conhecendo-a-placa-sem-medo",
    order: 1,
    trailId: "primeiros-comandos",
    title: "Conhecendo a placa sem medo",
    summary:
      "Primeiro contato físico com o micro:bit: o que é cada parte, como segurar, como ligar e o que não fazer.",
    concepts: ["entrada-processamento-e-saida"],
    objective:
      "Fazer a turma manusear a placa com confiança e reconhecer entrada, processamento e saída nela.",
    howToExplain:
      "Distribua as placas desligadas e peça que encontrem, sem ajuda, as luzes, os dois botões e o conector. Só depois nomeie cada parte.",
    materials: ["microbit"],
    preparation:
      "Confira a versão das placas (a 2 tem microfone e alto-falante) e separe uma por dupla. Combine a regra de manuseio antes de distribuir.",
    steps: [
      "Distribua as placas desligadas e dê dois minutos de exploração livre.",
      "Peça que apontem as partes que acham que fazem alguma coisa, e anote no quadro os palpites.",
      "Nomeie cada parte e classifique com a turma entre entrada, processamento e saída.",
      "Ligue uma placa e mostre a diferença entre estar ligada e estar programada.",
    ],
    questions: [
      "Essa parte recebe alguma coisa ou mostra alguma coisa?",
      "A placa está ligada e não faz nada. Falta o quê?",
      "O que aconteceria se a gente desligasse no meio de um programa?",
    ],
    difficulties: [
      "A turma segura pelos pinos dourados e a leitura de toque dispara sozinha.",
      "Alunos esperam que a placa faça algo sozinha ao ligar, e concluem que veio quebrada.",
    ],
    assessment: [
      "Aponta uma entrada e uma saída na própria placa",
      "Manuseia sem puxar pelo conector",
      "Explica que a placa precisa de um programa para fazer algo",
    ],
  },
  {
    id: "primeiro-icone-na-matriz",
    order: 2,
    trailId: "primeiros-comandos",
    title: "Seu primeiro ícone na matriz",
    summary:
      "Desenhar na malha 5 por 5 e acender esse desenho na placa, ponto a ponto.",
    concepts: ["entrada-processamento-e-saida", "sequencia-e-instrucoes"],
    objective: "Produzir a primeira saída visível e ligar o desenho do papel ao código.",
    howToExplain:
      "Desenhe a malha 5 por 5 no quadro e preencha um ícone junto com a turma antes de qualquer computador ser ligado.",
    materials: ["microbit", "computador", "papel-e-lapis"],
    preparation:
      "Imprima folhas com a malha 5 por 5, uma por dupla. Deixe o editor aberto nas máquinas.",
    steps: [
      "Preencha um ícone na malha do quadro, ponto a ponto, com a turma ditando.",
      "Cada dupla desenha o próprio ícone na folha.",
      "As duplas reproduzem o desenho no bloco 'mostrar LEDs' do editor.",
      "Enviam para a placa e comparam o resultado com o papel.",
    ],
    questions: [
      "Quantos pontos você acendeu? E quantos existem no total?",
      "O desenho ficou igual ao do papel? Onde ele mudou?",
      "Cabe uma letra do seu nome nesta malha?",
    ],
    difficulties: [
      "Desenhos com detalhe demais não cabem em 25 pontos, e a frustração aparece antes do resultado.",
      "A placa segurada de cabeça para baixo faz o ícone parecer errado.",
    ],
    assessment: [
      "Transfere o desenho do papel para a tela sem erro de posição",
      "Localiza um ponto errado pela linha e coluna",
      "Reconhece o limite de 25 pontos ao planejar o desenho",
    ],
  },
  {
    id: "botoes-a-e-b",
    order: 3,
    trailId: "primeiros-comandos",
    title: "Botões A e B: a placa responde",
    summary: "Fazer cada botão disparar uma saída diferente, separando entrada de saída na prática.",
    concepts: ["entrada-processamento-e-saida"],
    objective: "Mostrar que a placa só reage quando recebe algo, e que a resposta é programada.",
    howToExplain:
      "Peça que apertem os botões de uma placa sem programa. Nada acontece — e é isso que abre a aula.",
    materials: ["microbit", "computador"],
    preparation: "Deixe uma placa sem programa e outra já programada, para a comparação inicial.",
    steps: [
      "Passe a placa sem programa e peça que apertem os botões à vontade.",
      "Passe a placa programada e repita. Pergunte o que mudou entre as duas.",
      "As duplas programam A e B com ícones diferentes.",
      "Testam no simulador antes de enviar.",
    ],
    questions: [
      "Por que a primeira placa não fazia nada?",
      "O que a placa recebeu quando você apertou?",
      "Se ninguém apertar nada, ela faz alguma coisa?",
    ],
    difficulties: [
      "Trocar A por B no editor produz um programa que funciona ao contrário, sem erro visível.",
      "Ícones que não se apagam entre toques dão a impressão de que o segundo botão falhou.",
    ],
    assessment: [
      "Programa duas respostas distintas sem trocar os botões",
      "Explica o que é a entrada nesse programa",
      "Corrige sozinho um ícone que não apaga",
    ],
  },
  {
    id: "sequencia-de-imagens",
    order: 4,
    trailId: "primeiros-comandos",
    title: "Sequência de imagens: animação simples",
    summary: "Encadear ícones com pausas para produzir a primeira animação.",
    concepts: ["sequencia-e-instrucoes", "algoritmos"],
    objective: "Mostrar que ordem e tempo, juntos, produzem movimento.",
    howToExplain:
      "Mostre dois ícones alternando sem pausa: não dá para ver. Acrescente a pausa na frente da turma.",
    materials: ["microbit", "computador", "papel-e-lapis"],
    preparation: "Prepare três folhas de malha por dupla, para os quadros da animação.",
    steps: [
      "Cada dupla desenha três quadros da animação no papel, em ordem.",
      "Monta a sequência no editor, com um 'mostrar LEDs' por quadro.",
      "Acrescenta pausas entre os quadros e ajusta o tempo até ficar visível.",
      "Envia para a placa e apresenta a animação para outra dupla.",
    ],
    questions: [
      "Qual é o primeiro quadro? E o último?",
      "A animação está rápida demais ou devagar demais? O que controla isso?",
      "O que acontece se dois quadros trocarem de lugar?",
    ],
    difficulties: [
      "Sem pausa, os quadros passam rápido demais e a turma acha que só um funcionou.",
      "Animação dentro de 'ao iniciar' roda uma vez só, e parece ter travado.",
    ],
    assessment: [
      "Ordena os quadros antes de programar",
      "Ajusta o tempo de pausa até a animação ficar legível",
      "Explica por que a sequência precisa estar em 'para sempre' para repetir",
    ],
  },

  // ── Trilha 2 ──────────────────────────────────────────────────────────────
  {
    id: "contando-uma-historia-com-icones",
    order: 1,
    trailId: "criatividade-e-narrativas",
    title: "Contando uma história com ícones",
    summary: "Uma narrativa curta contada só com os ícones da matriz, sem nenhuma palavra.",
    concepts: ["abstracao", "sequencia-e-instrucoes"],
    objective: "Exercitar abstração: escolher os poucos símbolos que sustentam a história.",
    howToExplain:
      "Conte uma história de três frases e peça que a turma escolha um ícone para cada frase. O que sobra é o que precisa ser abstraído.",
    materials: ["microbit", "computador", "papel-e-lapis"],
    preparation: "Escolha antes duas histórias curtas conhecidas da turma, como exemplos.",
    steps: [
      "Cada dupla escreve uma história em três frases.",
      "Escolhe um ícone para representar cada frase e justifica a escolha.",
      "Monta a sequência com pausas mais longas, para dar tempo de leitura.",
      "Apresenta para outra dupla, que tenta contar a história só vendo a placa.",
    ],
    questions: [
      "Esse ícone diz o quê da sua frase? E o que ele deixa de fora?",
      "A outra dupla entendeu a história? Onde ela se perdeu?",
      "Se você pudesse usar só dois ícones, quais manteria?",
    ],
    difficulties: [
      "A turma quer escrever palavras na matriz e desiste da abstração.",
      "Histórias longas demais não cabem, e a dupla trava em vez de cortar.",
    ],
    assessment: [
      "Justifica a escolha de cada ícone pela função na história",
      "Reconhece o que a representação deixou de fora",
      "Ajusta a história ao limite da placa em vez de abandoná-la",
    ],
  },
  {
    id: "cracha-animado",
    order: 2,
    trailId: "criatividade-e-narrativas",
    title: "Crachá animado com seu nome",
    summary: "O nome do aluno passando pela matriz, com a placa presa à roupa por um suporte.",
    concepts: ["sequencia-e-instrucoes"],
    objective: "Produzir algo que o aluno leva no corpo, e que funciona longe do computador.",
    howToExplain:
      "Mostre um crachá pronto funcionando com pilhas, desconectado. É o objetivo da aula visível em cinco segundos.",
    materials: ["microbit", "computador", "reciclaveis"],
    preparation:
      "Providencie suportes de pilha e material para o suporte físico. Teste antes um crachá completo.",
    steps: [
      "Cada aluno programa o próprio nome com o bloco de mostrar texto.",
      "Ajusta a velocidade até o nome ficar legível a um braço de distância.",
      "Monta o suporte físico com material reciclado.",
      "Testa com pilhas, desconectado do computador.",
    ],
    questions: [
      "Dá para ler o seu nome de longe? O que precisa mudar?",
      "O que acontece com o crachá quando as pilhas acabam?",
      "Por que o nome passa de lado em vez de aparecer inteiro?",
    ],
    difficulties: [
      "Nomes longos demoram a passar e a turma acha que travou.",
      "Pilhas fracas fazem a placa reiniciar sozinha, e o sintoma parece erro de programa.",
    ],
    assessment: [
      "Ajusta a velocidade com base em um teste real de leitura",
      "Monta o crachá funcionando sem o computador",
      "Explica por que o texto rola na matriz",
    ],
  },
  {
    id: "emoji-do-humor-da-turma",
    order: 3,
    trailId: "criatividade-e-narrativas",
    title: "Emoji do humor da turma",
    summary: "Cada aluno registra o próprio humor num ícone, e a turma observa o conjunto.",
    concepts: ["abstracao", "reconhecimento-de-padroes"],
    objective: "Usar a placa como instrumento de registro coletivo, e ler o padrão que aparece.",
    howToExplain:
      "Combine três ícones para três humores. A limitação é proposital: escolher entre três obriga a abstrair.",
    materials: ["microbit", "computador"],
    preparation: "Defina com a turma os três ícones antes de programar, para que sejam comparáveis.",
    steps: [
      "A turma decide coletivamente quais três ícones representam quais humores.",
      "Cada aluno programa os três nos botões e no gesto de chacoalhar.",
      "Todos mostram o próprio humor ao mesmo tempo, e a turma observa o conjunto.",
      "Registre no quadro a contagem de cada humor.",
    ],
    questions: [
      "Três opções bastam para descrever como você está?",
      "O que a contagem no quadro mostra sobre a turma hoje?",
      "Se fizéssemos isso amanhã, o resultado seria o mesmo?",
    ],
    difficulties: [
      "Alunos não querem expor o próprio humor. Deixe claro que mostrar é opcional.",
      "Três categorias parecem pouco, e alguns se recusam a escolher — o que é uma boa conversa sobre abstração.",
    ],
    assessment: [
      "Escolhe uma categoria e justifica a escolha",
      "Lê o padrão do conjunto, não só o próprio resultado",
      "Percebe o que a redução a três opções perdeu",
    ],
  },
  {
    id: "dado-eletronico",
    order: 4,
    trailId: "criatividade-e-narrativas",
    title: "Dado eletrônico para jogos",
    summary: "Chacoalhar a placa e receber um número de 1 a 6, como um dado.",
    concepts: ["entrada-processamento-e-saida", "algoritmos"],
    objective: "Usar o acelerômetro como entrada e introduzir sorteio de número.",
    howToExplain:
      "Mostre um dado de verdade e pergunte o que ele faz. Depois mostre a placa fazendo o mesmo.",
    materials: ["microbit", "computador"],
    preparation: "Combine o gesto de chacoalhar antes de distribuir — de leve, sem força.",
    steps: [
      "Programe o evento de chacoalhar com a turma acompanhando.",
      "Acrescente o sorteio de número entre 1 e 6.",
      "Mostre o resultado na matriz.",
      "Use o dado num jogo simples de tabuleiro, feito na hora.",
    ],
    questions: [
      "O número é sempre diferente? Já repetiu?",
      "O que a placa recebeu para saber que foi chacoalhada?",
      "Como faríamos um dado de 20 lados?",
    ],
    difficulties: [
      "A turma chacoalha com força e as placas caem.",
      "Números repetidos em sequência levam à conclusão de que está quebrado — é uma boa conversa sobre sorteio.",
    ],
    assessment: [
      "Identifica o acelerômetro como a entrada desse programa",
      "Altera o intervalo de sorteio por conta própria",
      "Explica por que repetir um número não significa defeito",
    ],
  },

  // ── Trilha 3 ──────────────────────────────────────────────────────────────
  {
    id: "pedra-papel-e-tesoura",
    order: 1,
    trailId: "logica-e-jogos",
    title: "Pedra, papel e tesoura na placa",
    summary: "Três ícones sorteados ao chacoalhar, para jogar contra um colega.",
    concepts: ["algoritmos", "entrada-processamento-e-saida"],
    objective: "Consolidar sorteio e saída antes de introduzir condição.",
    howToExplain:
      "Jogue uma partida com a turma usando as mãos, e depois pergunte o que a placa precisaria fazer para participar.",
    materials: ["microbit", "computador"],
    preparation: "Desenhe os três ícones na malha do quadro antes da aula.",
    steps: [
      "Desenhe os três ícones na malha, com a turma.",
      "Programe o sorteio entre três opções no evento de chacoalhar.",
      "Faça cada opção mostrar o ícone correspondente.",
      "Joguem em duplas, placa contra placa.",
    ],
    questions: [
      "Como a placa decide qual ícone mostrar?",
      "Dá para saber o que vai sair antes de chacoalhar?",
      "Quem ganhou? Quem decidiu isso, a placa ou vocês?",
    ],
    difficulties: [
      "Confundir os três ícones entre si atrapalha o jogo. Vale desenhar com contraste bem diferente.",
      "A placa não decide o vencedor — e a turma espera que ela decida. É a deixa para o próximo assunto.",
    ],
    assessment: [
      "Programa o sorteio entre três opções",
      "Associa cada valor sorteado ao ícone correto",
      "Percebe que falta uma regra para decidir o vencedor",
    ],
  },
  {
    id: "se-entao-primeira-condicao",
    order: 2,
    trailId: "logica-e-jogos",
    title: "Se… então: a primeira condição",
    summary: "A placa escolhe entre dois caminhos conforme o valor de alguma coisa.",
    concepts: ["algoritmos", "teste-e-depuracao"],
    objective: "Introduzir decisão programada, com um caminho para cada resultado.",
    howToExplain:
      "Peça que a turma diga uma regra da escola no formato 'se… então…'. A estrutura já existe na cabeça deles.",
    materials: ["microbit", "computador", "papel-e-lapis"],
    preparation: "Escreva no quadro três regras da escola no formato se… então, como aquecimento.",
    steps: [
      "A turma converte três regras da escola para o formato se… então.",
      "Cada dupla escolhe uma e escreve no papel qual é a condição e quais são os dois caminhos.",
      "Monta o bloco de condição no editor.",
      "Testa os dois caminhos, forçando cada resultado.",
    ],
    questions: [
      "Qual é a condição? O que ela compara?",
      "Você já testou o caminho do 'senão'? Como fez para ele acontecer?",
      "O que acontece se a condição nunca for verdadeira?",
    ],
    difficulties: [
      "Duplas testam só o caminho fácil e não percebem que o outro nunca funcionou.",
      "Maior e menor trocados produzem um programa que roda sempre pelo mesmo ramo.",
    ],
    assessment: [
      "Escreve a regra em se… então antes de programar",
      "Testa deliberadamente os dois caminhos",
      "Corrige o sinal da comparação ao ver um ramo nunca acontecer",
    ],
  },
  {
    id: "repeticao-mais-com-menos",
    order: 3,
    trailId: "logica-e-jogos",
    title: "Repetição: mais com menos comandos",
    summary: "O mesmo efeito com menos blocos, envolvendo o trecho repetido num laço.",
    concepts: ["reconhecimento-de-padroes", "algoritmos"],
    objective: "Ligar a repetição do MakeCode ao que a turma já viu na peça REPITA do tabuleiro.",
    howToExplain:
      "Monte a versão longa na frente da turma e conte os blocos em voz alta. Depois envolva no laço e conte de novo.",
    materials: ["microbit", "computador"],
    preparation: "Tenha as duas versões prontas no seu editor, para a comparação lado a lado.",
    steps: [
      "As duplas montam uma animação de dois ícones repetida quatro vezes, sem laço.",
      "Contam os blocos usados e anotam.",
      "Reescrevem usando o bloco de repetição.",
      "Contam de novo e comparam com a anotação.",
    ],
    questions: [
      "Quantos blocos você economizou?",
      "A animação ficou diferente?",
      "Se quisesse repetir dez vezes, qual das duas versões seria mais fácil de mudar?",
    ],
    difficulties: [
      "Sem pausa dentro do laço, a repetição fica rápida demais e parece não ter funcionado.",
      "Alguns alunos acham que menos blocos significa programa pior, por ter dado menos trabalho.",
    ],
    assessment: [
      "Identifica o trecho repetido antes de montar o laço",
      "Compara a contagem de blocos das duas versões",
      "Altera o número de repetições sem remontar o programa",
    ],
  },
  {
    id: "jogo-do-reflexo",
    order: 4,
    trailId: "logica-e-jogos",
    title: "Jogo do reflexo",
    summary: "Um ícone aparece em momento imprevisível e vence quem apertar primeiro.",
    concepts: ["algoritmos", "teste-e-depuracao"],
    objective: "Juntar sorteio, espera, condição e placar num projeto que a turma joga de verdade.",
    howToExplain:
      "Jogue uma rodada com a placa do professor antes de explicar qualquer bloco. O objetivo precisa ser desejado antes de ser construído.",
    materials: ["microbit", "computador"],
    preparation: "Tenha o jogo pronto e testado — é o projeto mais longo da trilha.",
    steps: [
      "Programe a espera de tempo aleatório antes de mostrar o ícone.",
      "Acrescente a leitura do botão e a marcação de ponto.",
      "Teste em duplas, uma placa por dupla.",
      "Ajuste a dificuldade mudando o intervalo de espera.",
    ],
    questions: [
      "O que a placa está esperando antes de mostrar o ícone?",
      "Dá para trapacear apertando antes? Como impedir isso?",
      "Como o programa sabe quem apertou primeiro?",
    ],
    difficulties: [
      "Apertar antes do ícone marca ponto se o programa não previr isso — e a turma descobre em dois minutos.",
      "Esperas longas demais dispersam a dupla.",
    ],
    assessment: [
      "Junta espera, condição e contagem num programa que funciona",
      "Identifica e corrige a trapaça de apertar antes",
      "Ajusta a dificuldade alterando um único valor",
    ],
  },

  // ── Trilha 4 ──────────────────────────────────────────────────────────────
  {
    id: "variaveis-guardando-um-numero",
    order: 1,
    trailId: "dados-e-decisoes",
    title: "Variáveis: guardando um número",
    summary: "Um lugar com nome onde a placa guarda um valor que muda.",
    concepts: ["abstracao", "entrada-processamento-e-saida"],
    objective: "Dar à turma uma imagem concreta do que é uma variável antes de usá-la.",
    howToExplain:
      "Desenhe uma caixa no quadro com o nome da variável escrito nela, e mude o número de dentro a cada exemplo.",
    materials: ["microbit", "computador", "papel-e-lapis"],
    preparation: "Leve uma caixa de verdade com papéis numerados dentro, se possível.",
    steps: [
      "Mostre a caixa e troque o papel de dentro algumas vezes, mantendo o nome.",
      "Crie a variável no editor com um nome que descreva o que ela guarda.",
      "Defina o valor inicial em 'ao iniciar'.",
      "Mostre o valor na matriz e altere-o com um botão.",
    ],
    questions: [
      "O que essa variável está guardando?",
      "O nome dela diz o que tem dentro?",
      "O que acontece com o valor quando a placa é reiniciada?",
    ],
    difficulties: [
      "Nomes como 'x' e 'a' fazem a turma perder o fio em dois minutos.",
      "Definir o valor inicial dentro de 'para sempre' zera a variável continuamente, e nada parece funcionar.",
    ],
    assessment: [
      "Dá à variável um nome que descreve o conteúdo",
      "Coloca o valor inicial no lugar certo",
      "Prevê o valor antes de apertar o botão",
    ],
  },
  {
    id: "contador-de-pontos",
    order: 2,
    trailId: "dados-e-decisoes",
    title: "Contador de pontos",
    summary: "Um placar que sobe com um botão e zera com o outro.",
    concepts: ["entrada-processamento-e-saida", "algoritmos"],
    objective: "Aplicar a variável num uso que a turma reconhece e quer usar.",
    howToExplain:
      "Pergunte quem já perdeu a conta de um placar de jogo. É o problema que a aula resolve.",
    materials: ["microbit", "computador"],
    preparation: "Nenhuma além do editor aberto; este assunto se apoia inteiramente no anterior.",
    steps: [
      "Cada dupla cria a variável do placar e define o valor inicial.",
      "Programa o botão A para somar um ponto.",
      "Programa o botão B para zerar.",
      "Usa o contador num jogo rápido em duplas.",
    ],
    questions: [
      "O que aconteceu com o valor quando você apertou B?",
      "Dá para fazer um botão que subtrai em vez de somar?",
      "Como você mostraria dois placares na mesma placa?",
    ],
    difficulties: [
      "A soma colocada fora do bloco do botão faz o número subir sozinho, sem parar.",
      "Números acima de 9 rolam na matriz e a turma acha que travou.",
    ],
    assessment: [
      "Constrói somar e zerar sem ajuda",
      "Localiza o erro de soma fora do bloco do botão",
      "Propõe uma variação própria do contador",
    ],
  },
  {
    id: "comparando-valores",
    order: 3,
    trailId: "dados-e-decisoes",
    title: "Comparando valores",
    summary: "A placa reage de forma diferente conforme o valor passa de um limite.",
    concepts: ["algoritmos", "teste-e-depuracao"],
    objective: "Juntar variável e condição, que até aqui foram vistas separadamente.",
    howToExplain:
      "Combine com a turma um limite — por exemplo, dez pontos — e pergunte o que deve acontecer ao chegar lá.",
    materials: ["microbit", "computador"],
    preparation: "Defina o limite com a turma antes de programar, para que todos testem o mesmo.",
    steps: [
      "Cada dupla acrescenta uma condição comparando o placar com o limite.",
      "Define o que acontece ao atingir o limite.",
      "Testa somando pontos até passar do limite.",
      "Testa também o caso de ficar abaixo dele.",
    ],
    questions: [
      "O que essa comparação está perguntando exatamente?",
      "E quando o valor é igual ao limite? O que acontece?",
      "Você testou os dois lados da comparação?",
    ],
    difficulties: [
      "O caso de igualdade costuma ficar de fora e ninguém percebe até acontecer.",
      "Condição fora de 'para sempre' é avaliada uma única vez e nunca dispara.",
    ],
    assessment: [
      "Testa valores acima, abaixo e igual ao limite",
      "Explica a diferença entre maior e maior ou igual",
      "Coloca a condição no bloco que a avalia continuamente",
    ],
  },
  {
    id: "grafico-de-barras",
    order: 4,
    trailId: "dados-e-decisoes",
    title: "Gráfico de barras com dados da turma",
    summary: "Uma pergunta feita à turma, as respostas contadas e o resultado desenhado na matriz.",
    concepts: ["reconhecimento-de-padroes", "abstracao"],
    objective: "Fechar a trilha transformando dado real da sala em representação visual.",
    howToExplain:
      "Escolha uma pergunta que interesse à turma e cuja resposta ninguém saiba de antemão.",
    materials: ["microbit", "computador", "papel-e-lapis"],
    preparation:
      "Escolha antes duas ou três perguntas possíveis, com três a cinco alternativas cada.",
    steps: [
      "A turma escolhe a pergunta e as alternativas.",
      "Cada dupla coleta as respostas de uma parte da sala e anota.",
      "Programa as barras na matriz, uma coluna por alternativa.",
      "Compara as barras das diferentes duplas e discute as diferenças.",
    ],
    questions: [
      "O que a barra mais alta está dizendo?",
      "Duas duplas contaram a mesma coisa e chegaram a números diferentes. Por quê?",
      "O que esse gráfico não mostra sobre a turma?",
    ],
    difficulties: [
      "Cinco colunas em cinco pontos de altura limitam muito a escala. Vale combinar antes o que cada ponto representa.",
      "Contagens diferentes entre duplas geram discussão sobre quem errou — reconduza para como a coleta foi feita.",
    ],
    assessment: [
      "Coleta e registra dados de forma que outra pessoa consiga conferir",
      "Lê o gráfico apontando o que ele mostra e o que omite",
      "Explica por que duas coletas podem divergir",
    ],
  },

  // ── Trilha 5 ──────────────────────────────────────────────────────────────
  {
    id: "acelerometro-movimento",
    order: 1,
    trailId: "sensores-e-mundo-fisico",
    title: "Acelerômetro: a placa sente movimento",
    summary: "Inclinar e chacoalhar como entradas, e o que a placa realmente percebe.",
    concepts: ["entrada-processamento-e-saida"],
    objective: "Mostrar que um sensor traduz movimento em número.",
    howToExplain:
      "Mostre o valor bruto do acelerômetro na tela e incline a placa devagar, para a turma ver o número acompanhar.",
    materials: ["microbit", "computador"],
    preparation: "Teste antes quais gestos funcionam bem com as suas placas.",
    steps: [
      "Mostre a leitura bruta e incline a placa lentamente.",
      "As duplas programam uma resposta ao gesto de inclinar.",
      "Acrescentam uma resposta diferente ao chacoalhar.",
      "Comparam qual gesto é mais confiável.",
    ],
    questions: [
      "O número muda sozinho com a placa parada? Por quê?",
      "Qual gesto a placa reconhece melhor?",
      "O que ela está medindo quando você inclina?",
    ],
    difficulties: [
      "Chacoalhar com força derruba a placa e não melhora a leitura.",
      "Valores oscilando com a placa parada assustam — é ruído normal do sensor.",
    ],
    assessment: [
      "Relaciona movimento físico à mudança do número",
      "Escolhe o gesto mais confiável com base em teste",
      "Reconhece a oscilação como normal, não como defeito",
    ],
  },
  {
    id: "sensor-de-luz-claro-ou-escuro",
    order: 2,
    trailId: "sensores-e-mundo-fisico",
    title: "Sensor de luz: claro ou escuro",
    summary: "A placa mede a luz que chega até ela e reage quando escurece.",
    concepts: ["entrada-processamento-e-saida", "algoritmos"],
    objective: "Juntar leitura de sensor e condição num caso concreto e verificável.",
    howToExplain:
      "Mostre o valor da luz e cubra a placa com a mão. O número cai na frente de todos.",
    materials: ["microbit", "computador"],
    preparation: "Meça antes o valor típico da sua sala, para escolher um limite que funcione.",
    steps: [
      "Mostre a leitura e cubra a placa, para a turma ver a variação.",
      "As duplas anotam o valor com luz e o valor no escuro.",
      "Escolhem um limite entre os dois e programam a condição.",
      "Testam cobrindo e descobrindo a placa.",
    ],
    questions: [
      "Qual valor você viu com luz? E no escuro?",
      "Por que escolheu esse limite?",
      "A sombra da sua mão conta como escuro?",
    ],
    difficulties: [
      "Limite escolhido sem medir antes quase nunca funciona.",
      "A sombra do próprio aluno altera a leitura sem que ele perceba.",
    ],
    assessment: [
      "Mede antes de escolher o limite",
      "Justifica o limite com os dois valores observados",
      "Percebe interferências do ambiente na leitura",
    ],
  },
  {
    id: "sensor-de-temperatura",
    order: 3,
    trailId: "sensores-e-mundo-fisico",
    title: "Sensor de temperatura: medindo a sala",
    summary: "A placa informa a temperatura do próprio chip — e o que isso quer dizer.",
    concepts: ["abstracao", "entrada-processamento-e-saida"],
    objective: "Discutir a diferença entre o que se quer medir e o que o sensor mede.",
    howToExplain:
      "Mostre a leitura, segure a placa na mão fechada por um minuto e mostre o número subindo.",
    materials: ["microbit", "computador", "papel-e-lapis"],
    preparation: "Tenha um termômetro comum à mão para a comparação, se houver.",
    steps: [
      "Mostre a leitura e aqueça a placa com a mão.",
      "As duplas medem três pontos da sala e anotam.",
      "Comparam os valores entre duplas e com o termômetro, se houver.",
      "Discutem por que os números divergem.",
    ],
    questions: [
      "Esse número é a temperatura do ar ou da placa?",
      "Por que a leitura sobe quando você segura?",
      "Como faríamos para medir o ar de verdade?",
    ],
    difficulties: [
      "A turma trata a leitura como verdade absoluta sobre o ambiente.",
      "Placas recém-desconectadas do USB estão mais quentes e distorcem a comparação.",
    ],
    assessment: [
      "Diz o que o sensor mede e o que ele não mede",
      "Explica uma causa de divergência entre duas medições",
      "Registra a medição com a condição em que foi feita",
    ],
  },
  {
    id: "som-e-microfone",
    order: 4,
    trailId: "sensores-e-mundo-fisico",
    title: "Som e microfone",
    summary: "Medir o barulho da sala e transformar isso em um indicador visível.",
    concepts: ["entrada-processamento-e-saida", "reconhecimento-de-padroes"],
    objective: "Fechar a trilha com um sensor cujo dado a própria turma produz.",
    howToExplain:
      "Peça silêncio, mostre o valor, e depois peça uma palma coletiva. O salto no número dispensa explicação.",
    materials: ["microbit", "computador"],
    preparation:
      "Confirme que as placas são da versão 2 — o microfone não existe na versão 1, e a aula inteira depende dele.",
    steps: [
      "Mostre o nível de som em silêncio e depois com palmas.",
      "As duplas escolhem um limite de barulho e programam um indicador.",
      "Testam durante uma atividade normal da sala.",
      "Discutem se o indicador ajudaria ou atrapalharia a aula.",
    ],
    questions: [
      "Qual valor aparece quando a sala está em silêncio?",
      "Esse limite é justo para uma atividade em grupo?",
      "Um medidor de barulho na parede mudaria o comportamento da turma?",
    ],
    difficulties: [
      "Placas da versão 1 não têm microfone, e a aula não acontece sem verificar isso antes.",
      "A turma faz barulho de propósito para testar, o que é esperado — combine um tempo para isso.",
    ],
    assessment: [
      "Estabelece um limite com base em medições reais",
      "Relaciona o número a uma situação concreta da sala",
      "Discute o efeito da medição sobre quem é medido",
    ],
  },

  // ── Trilha 6 ──────────────────────────────────────────────────────────────
  {
    id: "radio-duas-placas-conversando",
    order: 1,
    trailId: "criacao-e-prototipagem",
    title: "Rádio: duas placas conversando",
    summary: "Uma placa envia, a outra recebe — sem fio e sem internet.",
    concepts: ["entrada-processamento-e-saida", "sequencia-e-instrucoes"],
    objective: "Mostrar comunicação entre dispositivos com o mínimo de abstração possível.",
    howToExplain:
      "Programe duas placas na frente da turma e envie um número de uma para a outra. O efeito é imediato.",
    materials: ["microbit", "computador"],
    preparation:
      "Planeje os números de grupo antes: um por dupla. Placas no mesmo grupo interferem entre si.",
    steps: [
      "Distribua os números de grupo, um por dupla.",
      "Cada dupla programa o envio num botão e a exibição do recebido.",
      "Testa entre as duas placas da própria dupla.",
      "Troca mensagens com outra dupla, mudando o grupo de propósito.",
    ],
    questions: [
      "Por que a mensagem da outra dupla apareceu na sua placa?",
      "O que acontece se duas duplas usarem o mesmo grupo?",
      "A mensagem chega se a outra placa estiver desligada?",
    ],
    difficulties: [
      "Grupos repetidos na sala causam mensagens cruzadas e confusão generalizada.",
      "Alunos esperam que a mensagem chegue a qualquer distância.",
    ],
    assessment: [
      "Configura o grupo corretamente",
      "Explica por que placas de grupos diferentes não se ouvem",
      "Identifica a interferência quando ela acontece",
    ],
  },
  {
    id: "pinos-e-crocodilos",
    order: 2,
    trailId: "criacao-e-prototipagem",
    title: "Pinos e garras jacaré",
    summary: "Ligar a placa a objetos externos e fechar circuitos com o próprio corpo.",
    concepts: ["entrada-processamento-e-saida"],
    objective: "Estender a placa para além dela mesma, usando os pinos como entrada.",
    howToExplain:
      "Segure um pino em cada mão e feche o circuito com o corpo, na frente da turma. Sempre surpreende.",
    materials: ["microbit", "computador", "reciclaveis"],
    preparation:
      "Providencie garras jacaré e teste as ligações antes — contato solto é a causa da maioria dos problemas.",
    steps: [
      "Demonstre o circuito fechado pelo corpo.",
      "As duplas programam uma resposta ao toque no pino 0.",
      "Ligam a garra jacaré a um objeto condutor e testam.",
      "Montam um objeto simples que reaja ao toque.",
    ],
    questions: [
      "Por que precisa segurar os dois pinos ao mesmo tempo?",
      "Que objetos da sala funcionam? E quais não funcionam?",
      "O que aconteceu quando a garra soltou?",
    ],
    difficulties: [
      "Garras soltas fazem o programa parecer quebrado. Confira a ligação antes do código.",
      "Nem todo objeto conduz, e a turma conclui que o programa falhou.",
    ],
    assessment: [
      "Verifica a ligação física antes de suspeitar do programa",
      "Testa objetos diferentes e classifica o que funciona",
      "Explica a necessidade de fechar o circuito",
    ],
  },
  {
    id: "prototipo-com-reciclaveis",
    order: 3,
    trailId: "criacao-e-prototipagem",
    title: "Protótipo com material reciclado",
    summary: "Transformar um programa em objeto: caixa, suporte e uma função que alguém usaria.",
    concepts: ["decomposicao", "abstracao"],
    objective: "Levar o aluno a projetar um objeto completo, do problema à forma física.",
    howToExplain:
      "Peça que cada grupo nomeie um problema pequeno e real da escola antes de pensar em qualquer material.",
    materials: ["microbit", "reciclaveis", "papel-e-lapis"],
    preparation:
      "Peça o material reciclado com uma semana de antecedência e separe cola, tesoura e fita.",
    steps: [
      "Cada grupo escolhe um problema pequeno e real para resolver.",
      "Decompõe o projeto em partes: o que a placa faz, o que a caixa precisa ter, quem vai usar.",
      "Constrói o protótipo físico em volta da placa.",
      "Testa com alguém de fora do grupo usando o objeto.",
    ],
    questions: [
      "Que problema esse objeto resolve? Para quem?",
      "A pessoa que vai usar entende sozinha o que fazer?",
      "Qual parte quebrou primeiro no teste?",
    ],
    difficulties: [
      "Grupos começam pela caixa e só depois pensam na função, e a placa não cabe.",
      "Protótipos que só o autor sabe usar reprovam no teste com alguém de fora — que é justamente o valor do teste.",
    ],
    assessment: [
      "Define o problema e o usuário antes de construir",
      "Divide o projeto em partes antes de executá-lo",
      "Ajusta o protótipo com base no teste com outra pessoa",
    ],
  },
  {
    id: "feira-de-projetos",
    order: 4,
    trailId: "criacao-e-prototipagem",
    title: "Feira de projetos",
    summary: "Apresentar o protótipo para gente de fora da turma, e responder perguntas sobre ele.",
    concepts: ["o-erro-como-parte-da-aprendizagem", "teste-e-depuracao"],
    objective:
      "Fechar o percurso com o aluno explicando as próprias decisões, inclusive as que deram errado.",
    howToExplain:
      "Combine que a apresentação precisa contar uma coisa que não funcionou — é o que separa relato de propaganda.",
    materials: ["microbit", "reciclaveis", "papel-e-lapis"],
    preparation:
      "Reserve o espaço, convide outra turma e prepare uma ficha curta de roteiro de apresentação por grupo.",
    steps: [
      "Cada grupo prepara uma apresentação de três minutos: problema, solução e um erro do caminho.",
      "Monte os estandes e receba a turma visitante.",
      "Os grupos se revezam entre apresentar e visitar.",
      "Feche com uma roda em que cada grupo conta o que mudaria se recomeçasse.",
    ],
    questions: [
      "O que não funcionou de primeira? Como vocês descobriram?",
      "Se tivessem mais uma aula, o que mudariam?",
      "Alguém de fora conseguiu usar sem explicação?",
    ],
    difficulties: [
      "Grupos escondem os erros por acharem que perdem pontos. Diga na preparação que o erro é parte da nota.",
      "Protótipos param de funcionar na hora — quase sempre por pilha ou contato. Tenha pilhas reserva.",
    ],
    assessment: [
      "Relata um erro do processo e o que ele ensinou",
      "Explica uma decisão de projeto pelo motivo, não pelo gosto",
      "Responde a uma pergunta de alguém de fora sem recorrer ao professor",
    ],
  },
];

export function trilhaPorId(id: string): Trail | undefined {
  return TRAILS.find((t) => t.id === id);
}

export function assuntosDaTrilha(trailId: string): Topic[] {
  return TOPICS.filter((t) => t.trailId === trailId).sort((a, b) => a.order - b.order);
}
