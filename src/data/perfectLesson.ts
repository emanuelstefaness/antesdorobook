export const PERFECT_LESSON_ID = "luz-noturna-automatica";

export const PERFECT_LESSON = {
  promise: "Construir um sistema que percebe a luminosidade e decide sozinho quando acender ou apagar uma luz.",
  everyday: "Postes, luminárias de jardim, telas de celular e faróis automáticos usam a mesma ideia: medir o ambiente, comparar com um limite e produzir uma resposta.",
  concepts: [
    {
      name: "Entrada",
      explanation: "É a informação que chega ao sistema. Nesta aula, é o número produzido pelo sensor de luz.",
      analogy: "Funciona como os olhos do projeto: percebe o ambiente, mas ainda não decide nada.",
      href: "/aprender/entrada-processamento-e-saida",
    },
    {
      name: "Processamento",
      explanation: "É a regra que interpreta o valor: se a luz estiver abaixo do limite, o ambiente será considerado escuro.",
      analogy: "É o cérebro comparando o que percebeu com a regra combinada pela turma.",
      href: "/aprender/entrada-processamento-e-saida",
    },
    {
      name: "Saída",
      explanation: "É a resposta visível do sistema. A matriz acende no escuro e apaga no claro.",
      analogy: "É a ação realizada depois da decisão, como uma lâmpada que acende sozinha.",
      href: "/robotica/entrada-processamento-saida",
    },
    {
      name: "Condição e limite",
      explanation: "A condição compara o valor atual com um número escolhido. Esse número é o limite entre claro e escuro.",
      analogy: "É como decidir que, abaixo de certa temperatura, precisamos vestir um casaco.",
      href: "/makecode/logica",
    },
  ],
  readiness: [
    {
      question: "Se o sensor é a entrada, qual é a saída deste projeto?",
      answer: "A matriz de LEDs acendendo ou apagando. Na extensão opcional, a saída pode ser um LED externo.",
    },
    {
      question: "Por que o valor 80 não deve ser tratado como uma resposta universal?",
      answer: "Porque cada sala possui iluminação diferente. O limite precisa ser escolhido depois de observar os valores reais do ambiente.",
    },
    {
      question: "Por que a leitura precisa estar dentro de ‘para sempre’?",
      answer: "Porque a luminosidade muda. O programa precisa medir e decidir novamente durante todo o funcionamento.",
    },
  ],
  materials: [
    { name: "BBC micro:bit V1 ou V2", quantity: "1 por grupo ou 1 para demonstração", use: "Ler a luminosidade e mostrar a saída.", caution: "Segure pelas bordas e não force o conector USB." },
    { name: "Cabo USB de dados", quantity: "1 por placa", use: "Transferir o programa do computador para a placa.", caution: "Alguns cabos apenas carregam; confirme se a unidade MICROBIT aparece." },
    { name: "Computador com navegador", quantity: "1 por grupo, quando possível", use: "Criar e testar o programa no MakeCode.", caution: "Deixe o editor aberto antes da aula para reduzir o tempo de espera." },
    { name: "Papel e lápis", quantity: "1 ficha por grupo", use: "Registrar valores de claro, meia-luz e escuro.", caution: "A previsão deve ser registrada antes do teste." },
  ],
  preparation: [
    "Abra o projeto no MakeCode e monte o programa completo antes da turma chegar.",
    "Meça a luminosidade perto da janela, no centro da sala e sob uma mesa; anote três valores de cada local.",
    "Escolha um limite inicial entre um valor claro e um valor escuro. Use 80 apenas se ainda não houver uma medição local.",
    "Teste o cabo USB e transfira o programa para a placa que será usada na demonstração.",
    "Prepare grupos com quatro papéis: quem prevê, quem programa, quem testa e quem registra. Troque os papéis durante a aula.",
  ],
  rehearsal: [
    "O valor muda quando cubro e descubro a matriz?",
    "A matriz acende somente abaixo do limite?",
    "A comparação está usando ‘menor que’?",
    "O programa continua reagindo depois do primeiro teste?",
    "Consigo explicar entrada, regra e saída sem ler a tela?",
  ],
  timeline: [
    { time: "0–5 min", teacher: "Mostra uma luminária ou fotografia de poste automático e pergunta como ele sabe que anoiteceu.", students: "Levantam hipóteses sem ver o código.", evidence: "Mencionam alguma forma de perceber a luz." },
    { time: "5–10 min", teacher: "Apresenta entrada, processamento e saída usando a analogia olhos–cérebro–ação.", students: "Classificam exemplos cotidianos.", evidence: "Diferenciam perceber de agir." },
    { time: "10–16 min", teacher: "Mostra o valor bruto de luminosidade e cobre a placa lentamente.", students: "Preveem e registram valores de claro e escuro.", evidence: "Percebem que o sensor fornece números, não palavras." },
    { time: "16–28 min", teacher: "Conduz a montagem de um bloco por vez e faz pausas para conferência.", students: "Montam o programa e explicam a função de cada bloco.", evidence: "Blocos estão na ordem e no encaixe corretos." },
    { time: "28–38 min", teacher: "Pede três medições e orienta a escolha de um limite justificável.", students: "Testam, anotam e alteram somente o limite.", evidence: "Escolhem o limite a partir de dados coletados." },
    { time: "38–45 min", teacher: "Entrega um erro intencional ou pede troca do sinal da comparação.", students: "Diagnosticam e corrigem o comportamento invertido.", evidence: "Explicam como descobriram a causa." },
    { time: "45–50 min", teacher: "Retoma a pergunta inicial e pede uma aplicação fora da escola.", students: "Apresentam entrada, regra, saída e aplicação.", evidence: "Usam os quatro termos com sentido." },
  ],
  teacherTalk: [
    "O micro:bit não sabe o que é claro ou escuro. Ele recebe apenas um número. Que regra podemos criar para interpretar esse número?",
    "Antes de escolher o limite, precisamos observar o que acontece nesta sala.",
    "Qual é a última parte que funcionou corretamente? Vamos testar somente a próxima.",
    "Se mudarmos apenas o sinal da comparação, o que vocês preveem que acontecerá?",
  ],
  questions: [
    { question: "Por que não podemos copiar o limite de outra turma?", answer: "A iluminação muda conforme sala, horário, janelas, lâmpadas e posição da placa." },
    { question: "O que acontece se aumentarmos o limite?", answer: "Mais valores serão considerados escuros; a matriz poderá acender mesmo em um ambiente relativamente claro." },
    { question: "Sensor e decisão são a mesma coisa?", answer: "Não. O sensor mede; a condição interpreta a medição e escolhe a ação." },
    { question: "Como provar que o programa está funcionando?", answer: "Registrar valores acima e abaixo do limite e mostrar que a saída muda de maneira previsível nos dois casos." },
  ],
  adaptations: [
    { title: "Somente uma placa", text: "Use quatro estações: previsão em papel, programação no simulador, teste físico de três minutos e explicação. A placa circula; o raciocínio acontece o tempo todo." },
    { title: "Sem placa física", text: "Use o simulador. Arraste o controle de nível de luz e peça que cada grupo teste um valor abaixo, igual e acima do limite." },
    { title: "Versão mais fácil", text: "Entregue a estrutura ‘para sempre + se/senão’ pronta e peça somente que os alunos encaixem a leitura e as duas saídas." },
    { title: "Desafio avançado", text: "Crie três faixas: escuro, meia-luz e claro. Use um ícone diferente em cada faixa e justifique os dois limites." },
  ],
  rubric: [
    { criterion: "Compreensão do sistema", beginning: "Nomeia peças sem relacioná-las.", developing: "Identifica entrada e saída com ajuda.", achieved: "Explica entrada, processamento e saída com exemplo próprio." },
    { criterion: "Construção do programa", beginning: "Copia sem explicar a ordem.", developing: "Monta com apoio e reconhece alguns blocos.", achieved: "Monta, explica a ordem e prevê o efeito de uma alteração." },
    { criterion: "Uso de dados", beginning: "Escolhe o limite ao acaso.", developing: "Compara poucas medições.", achieved: "Registra medições e justifica o limite escolhido." },
    { criterion: "Depuração", beginning: "Recomeça sem investigar.", developing: "Localiza o problema com perguntas do professor.", achieved: "Isola, testa e corrige o erro explicando a causa." },
  ],
  studentSheet: [
    "Anote um valor em ambiente claro, um em meia-luz e um no escuro.",
    "Antes de executar, escreva qual valor você escolheria como limite e por quê.",
    "Desenhe o fluxo: sensor de luz → comparação → matriz acesa ou apagada.",
    "Registre um erro encontrado, como você o testou e qual foi a correção.",
    "Escreva uma aplicação cotidiana que poderia usar a mesma lógica.",
  ],
} as const;
