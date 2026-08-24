export type LearningChapter = {
  title: string;
  simple: string;
  analogy: string;
  doNow: string;
  check: string;
};

export type FormationLesson = {
  moduleId: string;
  openingQuestion: string;
  openingAnswer: string;
  chapters: LearningChapter[];
  playfulLab: {
    title: string;
    mission: string;
    materials: string[];
    steps: string[];
    observe: string;
    conclusion: string;
  };
  selfCheck: Array<{ question: string; answer: string }>;
};

function aula(
  moduleId: string,
  openingQuestion: string,
  openingAnswer: string,
  chapters: LearningChapter[],
  playfulLab: FormationLesson["playfulLab"],
  selfCheck: FormationLesson["selfCheck"],
): FormationLesson {
  return { moduleId, openingQuestion, openingAnswer, chapters, playfulLab, selfCheck };
}

export const PREPARATION_LESSONS: FormationLesson[] = [
  aula(
    "pensamento-computacional",
    "É possível ensinar pensamento computacional sem computador?",
    "Sim. O pensamento vem antes da tecnologia: organizar passos, separar partes, encontrar padrões, escolher informações importantes e corrigir tentativas.",
    [
      { title: "Decomposição", simple: "Decompor é transformar um problema grande em perguntas menores que podem ser resolvidas separadamente. A divisão só ajuda quando cada parte tem uma função clara.", analogy: "Planejar uma festa parece enorme; separar convidados, local, comida e horário torna o começo possível.", doNow: "Escolha ‘preparar uma aula prática’ e divida em objetivo, materiais, organização, teste e avaliação.", check: "Se cada parte puder ser respondida ou executada isoladamente, a decomposição está útil." },
      { title: "Algoritmo e sequência", simple: "Algoritmo é uma sequência finita de instruções claras para alcançar um resultado. A ordem faz parte da solução: passos corretos fora de ordem também produzem erro.", analogy: "Calçar a meia depois do sapato usa duas ações corretas na ordem errada.", doNow: "Escreva cinco passos para abrir a sala e iniciar a aula. Peça a alguém que execute literalmente.", check: "Outra pessoa consegue executar sem completar informações por conta própria?" },
      { title: "Padrões e abstração", simple: "Padrão é uma regularidade que permite prever ou reutilizar uma solução. Abstrair é conservar o que importa para o objetivo e deixar detalhes irrelevantes de fora.", analogy: "Num mapa do metrô, as curvas reais das ruas somem; permanecem linhas, estações e conexões.", doNow: "Compare três rotinas de início de aula e circule os passos que sempre se repetem.", check: "Você consegue explicar por que um detalhe foi mantido e outro foi ignorado?" },
      { title: "Teste e depuração", simple: "Depurar é localizar onde a previsão e o resultado se separaram. Não significa apagar tudo: é observar, formular uma hipótese, testar uma mudança e comparar.", analogy: "Provar uma sopa antes de acrescentar sal evita corrigir no escuro.", doNow: "Introduza um passo ambíguo numa instrução e altere somente esse passo após o teste.", check: "Você sabe apontar a evidência que mostrou qual passo precisava mudar?" },
    ],
    { title: "O professor-robô", mission: "Faça um colega chegar a um objeto obedecendo apenas comandos escritos.", materials: ["6 cartões", "caneta", "um objeto-alvo"], steps: ["Escreva uma ação por cartão.", "Entregue os cartões sem explicar por gestos.", "O colega executa literalmente e para quando algo estiver impossível.", "Marque o primeiro cartão que falhou.", "Reescreva somente esse cartão e teste de novo."], observe: "Ambiguidade, falta de medida, referência como ‘ali’ e ordem incorreta.", conclusion: "Pensamento computacional aparece na forma de organizar e revisar a solução, não no equipamento usado." },
    [{ question: "Dividir tarefas entre pessoas é sempre decomposição?", answer: "Não. Só é decomposição quando o problema é dividido em partes compreensíveis, relacionadas e que juntas resolvem o todo." }, { question: "Erro significa que o aluno não aprendeu?", answer: "Não. Quando ele prevê, identifica o ponto da falha e melhora a tentativa, o erro se torna evidência de aprendizagem." }, { question: "O que vem primeiro: experiência ou nome técnico?", answer: "Para iniciantes, vivenciar primeiro cria significado; depois o professor nomeia e transfere o conceito." }],
  ),
  aula(
    "programacao-em-blocos",
    "Preciso decorar todos os blocos para ensinar?",
    "Não. Você precisa ler a estrutura: qual evento começa, quais comandos acontecem em ordem, o que se repete, qual decisão é tomada e quais valores são guardados.",
    [
      { title: "Sequência e eventos", simple: "Um evento é o acontecimento que dispara uma pilha: iniciar, apertar botão, agitar ou receber rádio. Dentro dela, os comandos são executados de cima para baixo.", analogy: "A campainha é o evento; levantar, abrir a porta e atender são a sequência.", doNow: "Desenhe duas pilhas: botão A mostra feliz; botão B mostra triste.", check: "Cada pilha começa com um evento e os blocos estão conectados a ele?" },
      { title: "Repetição", simple: "Repetição executa o mesmo trecho várias vezes ou continuamente. Só devem ficar dentro do laço as ações que realmente se repetem.", analogy: "No refrão, a estrofe muda, mas um trecho retorna na mesma ordem.", doNow: "Escreva PALMA–PASSO três vezes; depois substitua por REPITA 3 VEZES [PALMA–PASSO].", check: "As versões longa e compacta produzem exatamente o mesmo resultado?" },
      { title: "Condições", simple: "Uma condição faz uma pergunta que só pode resultar em verdadeiro ou falso e escolhe um caminho. As faixas precisam cobrir os valores sem buracos nem sobreposição indevida.", analogy: "Se estiver chovendo, levo guarda-chuva; senão, saio sem ele.", doNow: "Crie uma regra: se luz < 80, acender; senão, apagar. Teste valores 79, 80 e 81.", check: "Você consegue prever qual ramo será executado nos valores de fronteira?" },
      { title: "Variáveis e depuração", simple: "Variável é um espaço com nome que guarda um valor mutável. Depurar uma variável exige mostrar seu valor em momentos estratégicos para descobrir quando ele se afastou do esperado.", analogy: "Um placar mantém o total mesmo quando ninguém está olhando para ele.", doNow: "Comece em zero, some 1 com A, retire 1 com B e impeça números negativos.", check: "Você distingue ‘definir para 1’ de ‘alterar por 1’?" },
    ],
    { title: "Programa humano com cartas", mission: "Monte e execute um programa sem abrir o MakeCode.", materials: ["Cartões EVENTO, SE, SENÃO, REPITA e VARIÁVEL", "papel", "lápis"], steps: ["Escolha um aluno como controlador e outro como saída.", "Monte: AO OUVIR PALMA → REPITA 2 → mostre uma pose.", "Execute e preveja o resultado antes.", "Troque REPITA 2 por 3 e compare.", "Insira um cartão solto e discuta por que ele não executa."], observe: "Eventos iniciam; encaixe representa pertencimento; ordem e indentação mudam o comportamento.", conclusion: "A forma do bloco ajuda a ler a lógica, mas é a relação entre eles que precisa ser compreendida." },
    [{ question: "Um bloco solto é executado?", answer: "Não. Ele precisa pertencer a uma pilha iniciada por evento ou função." }, { question: "Qual a diferença entre ‘para sempre’ e ‘repetir 5’?", answer: "O primeiro não termina enquanto o programa roda; o segundo executa exatamente cinco vezes e segue adiante." }, { question: "Por que prever antes de executar?", answer: "A diferença entre previsão e resultado localiza a parte da lógica que não foi compreendida." }],
  ),
  aula(
    "conhecendo-o-microbit",
    "O micro:bit é um robô?",
    "Sozinho, ele é uma pequena placa controladora programável. Quando recebe entradas, aplica regras e comanda saídas ou mecanismos, pode ser o controlador de um sistema robótico.",
    [
      { title: "Entradas", simple: "Entradas são informações que chegam ao programa: botões, toque, movimento, luz, temperatura, bússola e, na V2, som e logotipo sensível ao toque.", analogy: "São os sentidos da placa; cada um percebe um tipo limitado de informação.", doNow: "Aponte A, B e a matriz. Diga qual pode receber informação e qual pode produzir saída.", check: "Você consegue nomear a grandeza medida, não apenas o nome da peça?" },
      { title: "Processamento e memória", simple: "O processador executa as instruções e guarda valores durante o programa. Ele não compreende intenção: responde apenas aos eventos e regras programados.", analogy: "É um cozinheiro literal que segue a receita disponível com os ingredientes recebidos.", doNow: "Explique o contador: botão é entrada, somar é processamento, número na matriz é saída.", check: "Você evita dizer que a placa ‘sabe’ ou ‘adivinha’?" },
      { title: "Saídas e comunicação", simple: "Matriz, alto-falante V2 e pinos podem produzir resposta; o rádio troca dados entre placas sem internet. Uma saída precisa ser perceptível e adequada ao objetivo.", analogy: "Luz é a expressão facial, som é a voz e rádio é a conversa com outra placa.", doNow: "Escolha a melhor saída para silêncio, alerta urgente e informação numérica.", check: "Você justifica a saída pela necessidade do usuário?" },
      { title: "Energia, pinos e versões", simple: "USB ou duas pilhas AAA alimentam a placa. Os anéis grandes P0, P1, P2, 3V e GND ligam componentes. Microfone e alto-falante internos são recursos da V2.", analogy: "3V entrega energia, GND completa a referência e os pinos numerados levam sinais.", doNow: "Com a placa desligada, localize P0, P1, P2, 3V, GND, USB e bateria.", check: "Antes de planejar som interno, você confirma se a placa é V2?" },
    ],
    { title: "Detetive da placa", mission: "Classifique as partes sem ligar o micro:bit.", materials: ["micro:bit desligado ou diagrama", "cartões Entrada, Processamento, Saída, Comunicação e Energia"], steps: ["Coloque um cartão de função na mesa.", "Escolha uma parte da placa que corresponda.", "Explique o que ela recebe ou produz.", "Dê um exemplo de projeto.", "Confirme no catálogo visual do portal."], observe: "Uma peça pode participar de mais de uma função: a matriz mostra LEDs e também mede luz.", conclusion: "Conhecer a função permite entender projetos novos sem decorar uma lista de peças." },
    [{ question: "O sensor de temperatura mede exatamente o ar?", answer: "Não. Ele mede o processador e aproxima a temperatura ambiente; mão e funcionamento influenciam." }, { question: "A matriz é apenas saída?", answer: "Não. Além de mostrar luz, ela também participa da medição de luminosidade." }, { question: "Rádio precisa de Wi‑Fi?", answer: "Não. A comunicação ocorre diretamente entre micro:bits próximos no mesmo grupo." }],
  ),
  aula(
    "makecode-na-pratica",
    "Como saber se o problema está no programa ou na placa?",
    "Teste primeiro no simulador. Se a lógica funciona ali e falha no equipamento, investigue transferência, cabo, energia, versão ou ligação física.",
    [
      { title: "Interface e blocos", simple: "O MakeCode possui simulador, categorias e espaço de montagem. A cor localiza a categoria; o formato indica onde o bloco pode encaixar.", analogy: "É uma bancada: gavetas guardam peças, a mesa recebe a montagem e o simulador é a área de teste.", doNow: "Abra Novo projeto, nomeie e localize Básico, Entrada, Lógica e Variáveis.", check: "Você encontra um bloco pelo que ele faz, sem decorar sua posição?" },
      { title: "Simular e prever", simple: "O simulador executa a lógica imediatamente e oferece entradas virtuais. Ele separa aprendizado de programação da disponibilidade de placas.", analogy: "É o ensaio antes da apresentação: permite errar sem custo físico.", doNow: "Mostre um coração, troque por triste e reinicie o simulador.", check: "Você prevê o resultado antes de olhar para a placa virtual?" },
      { title: "Transferir para a placa", simple: "Baixar gera um arquivo .hex. Ele precisa chegar à unidade MICROBIT por cabo de dados ou pareamento compatível; o LED traseiro pisca durante a transferência.", analogy: "O projeto no navegador é o documento; transferir é entregar a cópia para a placa executar.", doNow: "Copie o .hex, espere o LED parar e desconecte com segurança.", check: "Se MICROBIT não aparece, você testa outro cabo de dados antes de alterar o código?" },
      { title: "Salvar, compartilhar e recuperar", simple: "O nome identifica o projeto; o arquivo baixado guarda uma cópia; Compartilhar cria um link. Extensões adicionam blocos específicos e devem corresponder ao kit.", analogy: "Nome é etiqueta, arquivo é cópia de segurança e link é acesso para outra pessoa.", doNow: "Gere Snapshot dos blocos, baixe o projeto e teste o link em janela anônima.", check: "Outra pessoa consegue abrir e identificar a versão correta?" },
    ],
    { title: "Missão três evidências", mission: "Prove que o mesmo projeto existe em três formas.", materials: ["computador", "MakeCode", "micro:bit e cabo de dados, se disponíveis"], steps: ["Monte uma animação de dois ícones.", "Registre o resultado no simulador.", "Gere o Snapshot dos blocos.", "Transfira e fotografe a placa executando.", "Crie um link compartilhável e abra-o em outra janela."], observe: "Simulador comprova lógica; Snapshot comprova estrutura; placa comprova transferência e hardware.", conclusion: "Guardar evidências diferentes torna o diagnóstico e a avaliação muito mais claros." },
    [{ question: "Projetos ficam sempre salvos na conta?", answer: "Não necessariamente. Em muitos casos ficam no navegador; baixar o arquivo e criar um link evita perda." }, { question: "Cabo que acende a placa sempre transfere?", answer: "Não. Alguns cabos fornecem apenas energia; a unidade MICROBIT precisa aparecer para transferência por arquivo." }, { question: "Quando instalar extensão?", answer: "Somente quando o componente ou kit exige, escolhendo a extensão indicada para o modelo exato." }],
  ),
  aula(
    "eletricidade-e-seguranca",
    "Por que um código correto pode não funcionar?",
    "Porque o programa é apenas uma parte. Sem alimentação adequada, caminho elétrico completo, polaridade correta e contato firme, o comando não chega ao componente.",
    [
      { title: "Circuito aberto e fechado", simple: "Corrente precisa de um caminho completo. Um interruptor aberto, uma garra solta ou uma trilha errada interrompe esse caminho.", analogy: "Uma pista com ponte levantada não deixa o carro completar o percurso.", doNow: "Desenhe 3V → componente → GND e marque onde um interruptor poderia abrir.", check: "Você consegue seguir o caminho inteiro sem saltar nenhum ponto?" },
      { title: "3V, GND e sinal", simple: "3V fornece tensão, GND é a referência comum e o pino de sinal leva informação. Nem todo componente deve receber energia diretamente do micro:bit.", analogy: "Energia mantém a conversa possível; sinal carrega a mensagem; GND dá uma referência comum.", doNow: "Separe fios vermelhos para energia, pretos para GND e amarelos para sinal.", check: "Você lê o rótulo do pino em vez de confiar apenas na cor do cabo?" },
      { title: "Polaridade e curto-circuito", simple: "LEDs, baterias e alguns módulos têm direção definida. Curto ocorre quando energia encontra GND por caminho quase sem resistência, podendo aquecer e danificar.", analogy: "Polaridade é sentido de uma rua; curto é um atalho perigoso que ignora o destino.", doNow: "Com tudo desligado, encontre ânodo/cátodo do LED e posicione um resistor em série.", check: "Antes de energizar, 3V e GND estão separados por um componente adequado?" },
      { title: "Motores, servos e fonte externa", simple: "Motores exigem mais corrente e ruído elétrico. Motor DC usa driver; servo frequentemente precisa de fonte adequada. As referências GND devem ser comuns.", analogy: "O pino dá a ordem, mas não deve carregar o peso do trabalho do motor.", doNow: "Desenhe micro:bit → sinal do driver/servo e fonte externa → motor, unindo os GNDs.", check: "O motor está separado do pino de sinal por driver ou controle apropriado?" },
    ],
    { title: "Circuito de papel", mission: "Faça uma luz acender e descubra três falhas sem arriscar a placa.", materials: ["bateria moeda com suporte", "LED", "resistor adequado", "fita de cobre ou papel-alumínio"], steps: ["Monte o caminho com LED e resistor.", "Teste a orientação correta.", "Abra uma ligação e observe.", "Inverta o LED e observe.", "Repare uma falha por vez e registre o sintoma."], observe: "Circuito aberto e polaridade produzem o mesmo sintoma ‘não acende’, mas exigem verificações diferentes.", conclusion: "Sintoma não identifica sozinho a causa; a ordem de testes é o que evita adivinhação." },
    [{ question: "Posso ligar motor DC direto no P0?", answer: "Não. Use driver e alimentação compatíveis; o pino de sinal não fornece a corrente do motor." }, { question: "O que revisar primeiro numa ligação externa?", answer: "Placa desligada, tensão do componente, 3V/VCC, GND, sinal, polaridade e ausência de curto." }, { question: "Por que unir GNDs com fonte externa?", answer: "Para micro:bit e componente compartilharem a mesma referência elétrica do sinal." }],
  ),
  aula(
    "organizacao-da-aula-maker",
    "Como evitar que uma pessoa faça tudo enquanto o grupo assiste?",
    "Defina papéis com decisões reais, faça rodízio por etapa e organize estações. Participação não é estar perto da placa: é prever, montar, testar, registrar e explicar.",
    [
      { title: "Papéis rotativos", simple: "Papéis tornam ações visíveis: planejador, montador, programador, testador e relator. Eles mudam durante a aula para distribuir poder e experiência.", analogy: "Num time, posições organizam o jogo, mas todos precisam compreender o objetivo comum.", doNow: "Distribua quatro papéis e determine em qual minuto haverá troca.", check: "Cada papel toma ao menos uma decisão, ou algum apenas observa?" },
      { title: "Estações e poucos equipamentos", simple: "Estações permitem trabalho paralelo: planejamento em papel, simulador, montagem, teste físico e registro. O recurso raro circula; a aprendizagem não para.", analogy: "Uma cozinha organiza bancadas diferentes para preparo, forno e finalização.", doNow: "Desenhe quatro estações para 30 alunos e uma placa, com tempo e produto de cada uma.", check: "Quem aguarda a placa tem uma tarefa que influencia o teste?" },
      { title: "Mediação sem resposta pronta", simple: "Perguntas eficazes recuperam previsão e evidência: o que esperava, o que ocorreu, qual parte testar e o que mudará. Dar o bloco certo encerra o raciocínio.", analogy: "O professor segura a lanterna, mas o aluno percorre o caminho.", doNow: "Troque ‘use o bloco se’ por ‘qual pergunta o programa precisa fazer?’. ", check: "Sua pergunta ajuda a localizar a parte sem revelar a solução?" },
      { title: "Tempo e fechamento", simple: "Construção precisa dividir espaço com teste, depuração e explicação. Um protótipo incompleto bem investigado ensina mais que um produto pronto copiado.", analogy: "Sem provar e conversar, cozinhar termina no forno e ninguém aprende a ajustar a receita.", doNow: "Num plano de 50 minutos, reserve pelo menos dez para testar e compartilhar.", check: "A aula tem um encerramento mesmo se a montagem não terminar?" },
    ],
    { title: "Simulação de uma placa", mission: "Experimente uma rotação antes de aplicar com alunos.", materials: ["uma placa ou cartão representando-a", "cronômetro", "folhas de função"], steps: ["Monte quatro estações para grupos pequenos.", "Dê uma entrega clara para cada estação.", "Faça rodízios de quatro minutos.", "Observe fila, tempo ocioso e concentração de decisões.", "Ajuste a ordem e repita uma rodada."], observe: "O gargalo aparece onde a entrega não está clara ou onde uma pessoa controla o recurso.", conclusion: "Organização também é um protótipo: precisa ser testada e melhorada." },
    [{ question: "Papéis fixos ajudam?", answer: "Ajudam a organizar, mas concentram habilidades. Por isso devem rodar entre etapas ou aulas." }, { question: "O que faz quem está sem placa?", answer: "Prevê, desenha a lógica, monta no simulador, registra testes e prepara a próxima modificação." }, { question: "Quando intervir num erro?", answer: "Quando houver risco, bloqueio sem hipótese ou repetição improdutiva; antes disso, use perguntas de evidência." }],
  ),
  aula(
    "objetivos-e-curriculo",
    "‘Construir uma cancela’ é objetivo de aprendizagem?",
    "Não sozinho. É a atividade ou produto. O objetivo descreve a compreensão ou habilidade: por exemplo, relacionar distância, condição e movimento e justificar o limite escolhido.",
    [
      { title: "Objetivo, atividade e produto", simple: "Objetivo é a aprendizagem; atividade é o que a turma faz; produto é o que permanece. Eles precisam ser coerentes, mas não são sinônimos.", analogy: "A viagem é atividade, a foto é produto e aprender a usar o mapa é objetivo.", doNow: "Reescreva ‘fazer um semáforo’ como ‘classificar medidas em faixas e comunicar estados’. ", check: "O objetivo ainda faz sentido se o produto físico mudar?" },
      { title: "Evidência observável", simple: "Evidência é ação, fala, registro ou decisão que demonstra aprendizagem. ‘Entender’ precisa virar explicar, prever, comparar, testar ou justificar.", analogy: "Não vemos a aprendizagem diretamente; vemos pegadas que ela deixa.", doNow: "Complete: saberei que aprendeu quando o aluno…", check: "Duas pessoas conseguiriam observar a mesma evidência?" },
      { title: "Integração curricular", simple: "O projeto pode mobilizar medidas, texto, investigação e convivência sem virar uma lista artificial de matérias. O problema e as decisões conectam os conhecimentos.", analogy: "Uma ponte é um só objeto, embora envolva forma, força, medida, desenho e comunicação.", doNow: "Escolha uma pergunta real da escola e liste conhecimentos necessários para respondê-la.", check: "Cada conexão ajuda a resolver o problema ou foi adicionada apenas para citar uma disciplina?" },
      { title: "Reduzir sem perder o conceito", simple: "Quando falta tempo ou material, preserve a decisão intelectual e simplifique acabamento, quantidade de sensores ou tamanho da montagem.", analogy: "Uma maquete pequena ainda ensina estrutura; remover o teste, não.", doNow: "Transforme uma estufa completa em leitura de um sensor e decisão registrada no papel.", check: "A versão reduzida ainda produz a evidência do objetivo?" },
    ],
    { title: "Raio-X de um projeto", mission: "Descubra se uma atividade bonita realmente ensina o que promete.", materials: ["um projeto do portal", "três cartões: aprender, fazer, demonstrar"], steps: ["No cartão APRENDER, escreva a compreensão esperada.", "No FAZER, registre as ações da turma.", "No DEMONSTRAR, defina a evidência observável.", "Retire uma etapa decorativa e veja se a aprendizagem permanece.", "Troque o produto e confira se o objetivo continua válido."], observe: "Se o objetivo desaparece quando o produto muda, ele provavelmente descrevia a montagem, não a aprendizagem.", conclusion: "Tecnologia é escolhida porque torna uma aprendizagem investigável, não porque chama atenção." },
    [{ question: "‘Conhecer o micro:bit’ é objetivo suficiente?", answer: "É vago. Prefira ‘classificar partes da placa como entrada, saída, comunicação e energia usando exemplos’." }, { question: "Acabamento comprova aprendizagem?", answer: "Pode comprovar cuidado, mas não substitui evidências de previsão, lógica, teste e explicação." }, { question: "Como adaptar sem empobrecer?", answer: "Reduza materiais e escala, mantendo a pergunta, a decisão, o teste e a explicação central." }],
  ),
  aula(
    "diagnostico-de-falhas",
    "Por onde começar quando nada funciona?",
    "Comece pelo que mantém todo o sistema vivo e avance em ordem: energia → conexão → entrada → lógica → saída → mecanismo. Mude apenas uma coisa por teste.",
    [
      { title: "Sintoma e hipótese", simple: "Sintoma é o que se observa; hipótese é uma causa possível. ‘Não acende’ é sintoma. ‘LED invertido’ e ‘pino errado’ são hipóteses diferentes.", analogy: "Febre é sinal, não diagnóstico; várias causas precisam de testes.", doNow: "Para ‘servo não move’, escreva três causas sem corrigir nenhuma ainda.", check: "A frase descreve evidência ou já assume uma causa?" },
      { title: "Ordem de diagnóstico", simple: "Energia afeta tudo; conexão liga partes; entrada fornece dados; lógica decide; saída responde; mecanismo executa fisicamente. A ordem evita investigar código com placa desligada.", analogy: "Antes de consertar o canal da TV, confira se ela está ligada.", doNow: "Percorra a ordem num alarme de movimento e escreva um teste por etapa.", check: "Cada teste consegue confirmar ou eliminar uma hipótese?" },
      { title: "Isolar partes", simple: "Sensor, atuador e programa devem funcionar separadamente antes da integração. Um teste mínimo reduz variáveis e mostra qual subsistema falha.", analogy: "Ensaiar cada instrumento antes de reunir a banda.", doNow: "Mostre o valor bruto do sensor; depois mova o servo apenas com A/B; só então crie a condição.", check: "O teste usa o menor número possível de componentes e regras?" },
      { title: "Uma mudança por vez", simple: "Alterar fio, bloco e fonte simultaneamente pode fazer funcionar sem revelar a causa. Registro transforma tentativa em conhecimento reutilizável.", analogy: "Se mudar três ingredientes, você não sabe qual corrigiu a receita.", doNow: "Use tabela: sintoma, hipótese, teste, resultado, próxima ação.", check: "Depois de corrigir, você consegue explicar qual evidência confirmou a causa?" },
    ],
    { title: "Hospital de protótipos", mission: "Diagnostique três falhas preparadas sem receber a resposta.", materials: ["projeto simples", "cartões com falhas", "ficha de diagnóstico"], steps: ["Uma pessoa prepara uma falha: cabo, bloco solto ou ligação frouxa.", "Outra registra somente o sintoma.", "Escreve duas hipóteses.", "Escolhe o teste mais simples e altera uma coisa.", "Registra resultado e explica a causa confirmada."], observe: "A melhor equipe não é a mais rápida, mas a que consegue justificar por que testou naquela ordem.", conclusion: "Diagnóstico é um algoritmo de investigação que pode ser ensinado e praticado." },
    [{ question: "Quando apagar e refazer o programa?", answer: "Raramente. Primeiro localize o primeiro ponto de divergência e reduza o programa a um teste mínimo." }, { question: "Simulador funciona, placa não. Onde procurar?", answer: "Transferência, cabo de dados, energia, versão da placa, ligações e componentes físicos." }, { question: "Por que registrar tentativa que falhou?", answer: "Ela elimina hipóteses e impede que o grupo repita mudanças sem evidência." }],
  ),
  aula(
    "inclusao-e-avaliacao",
    "Como avaliar quando cada grupo chega a um produto diferente?",
    "Avalie o processo comum: compreender o desafio, prever, planejar, testar, melhorar, colaborar e explicar. Produtos diferentes podem demonstrar as mesmas aprendizagens.",
    [
      { title: "Participação real", simple: "Participar significa realizar ações e decisões relevantes. Segurar material ou assistir ao colega programar não garante aprendizagem.", analogy: "Estar no palco não significa ter fala na peça.", doNow: "Para cada papel do grupo, escreva uma decisão obrigatória.", check: "Você consegue apontar o que cada aluno decidiu, testou ou explicou?" },
      { title: "Múltiplas representações", simple: "A mesma lógica pode ser expressa por fala, desenho, cartões, gesto, blocos ou texto. Oferecer caminhos diferentes reduz barreiras sem reduzir o raciocínio.", analogy: "Uma rota pode ser explicada por mapa, palavras ou demonstração corporal.", doNow: "Permita representar um algoritmo com cartões ou áudio antes do MakeCode.", check: "A adaptação muda a forma de resposta, mas conserva a decisão intelectual?" },
      { title: "Rubrica de processo", simple: "Critérios como previsão, justificativa, teste controlado e melhoria são observáveis em qualquer projeto. Use níveis descritos por ações, não por adjetivos vagos.", analogy: "Uma boa régua mede o mesmo aspecto em objetos diferentes.", doNow: "Crie três níveis para ‘depura’: tenta ao acaso; testa uma parte; formula hipótese e registra.", check: "O aluno sabe o que fazer para avançar ao próximo nível?" },
      { title: "Erro como evidência", simple: "Uma correção explicada pode demonstrar mais aprendizagem que um produto que funcionou de primeira por cópia. Registre previsão inicial e mudança realizada.", analogy: "A cicatriz do conserto conta a história da solução.", doNow: "Inclua na apresentação: ‘esperávamos…, ocorreu…, mudamos…’. ", check: "A avaliação reconhece melhoria fundamentada, não apenas sucesso final?" },
    ],
    { title: "Galeria de estratégias", mission: "Compare processos sem eleger apenas o produto mais bonito.", materials: ["fichas de grupo", "três etiquetas: previsão, teste, melhoria"], steps: ["Cada grupo registra uma previsão.", "Durante o teste, fotografa ou desenha uma evidência.", "Registra uma melhoria e seu motivo.", "Na galeria, visitantes deixam comentário sobre estratégia.", "O professor avalia com a mesma rubrica."], observe: "Soluções diferentes tornam comparáveis as decisões, os testes e as explicações.", conclusion: "Avaliar processo torna a aula maker mais inclusiva e intelectualmente honesta." },
    [{ question: "Todos precisam programar ao mesmo tempo?", answer: "Não, mas todos precisam assumir o papel de programador e compreender a lógica em algum momento planejado." }, { question: "Adaptação reduz expectativa?", answer: "Não quando muda acesso, tempo ou representação e preserva o raciocínio central." }, { question: "Produto funcionando garante nota máxima?", answer: "Não. É necessário observar autoria, explicação, teste, colaboração e capacidade de melhorar." }],
  ),
  aula(
    "aula-de-certificacao",
    "Quando o professor está realmente pronto para aplicar?",
    "Quando consegue executar como aluno, explicar as decisões, antecipar falhas, adaptar à própria turma e conduzir o diagnóstico sem depender de um tutorial aberto.",
    [
      { title: "Escolha coerente", simple: "Comece pela aprendizagem e pelo nível da turma. Escolha a atividade mais simples que produz a evidência desejada, não a mais impressionante.", analogy: "A ferramenta correta é a que resolve o trabalho, não a maior da oficina.", doNow: "Escolha um objetivo e compare duas aulas do portal usando tempo, conceito e material.", check: "Você consegue justificar por que descartou a alternativa mais complexa?" },
      { title: "Ensaio completo", simple: "Execute materiais, fala, programa, transferência e teste no tempo real. O ensaio revela instruções vagas e etapas invisíveis no planejamento.", analogy: "Uma peça teatral não estreia apenas porque o roteiro foi escrito.", doNow: "Faça uma versão de 20 minutos com outro professor seguindo somente seu roteiro.", check: "Tudo o que ele perguntou precisa virar instrução, imagem ou decisão planejada?" },
      { title: "Plano alternativo", simple: "A aprendizagem não pode depender de internet, uma placa ou um sensor. Prepare simulador, cartões, revezamento e registro em papel mantendo o objetivo.", analogy: "A rota alternativa leva ao mesmo destino por outro caminho.", doNow: "Escreva versões: ideal, uma placa e sem placa.", check: "As três versões geram a mesma evidência principal?" },
      { title: "Condução e reflexão", simple: "Durante a aula, observe decisões; depois registre o que manter, mudar e investigar. Formação continua com evidências da turma real.", analogy: "Cada aula é uma versão do protótipo do professor.", doNow: "Prepare três colunas pós-aula: funcionou, confundiu, próxima mudança.", check: "Sua reflexão cita comportamentos e evidências, não apenas ‘gostaram’?" },
    ],
    { title: "Microaula de certificação", mission: "Conduza uma aula curta para colegas que agirão como alunos iniciantes.", materials: ["um plano do portal", "materiais necessários", "cronômetro", "ficha de observação"], steps: ["Declare objetivo e evidência em um minuto.", "Faça a abertura e uma investigação curta.", "Inclua um erro intencional.", "Medie o diagnóstico sem dar a resposta.", "Apresente adaptação para uma placa e receba devolutiva."], observe: "Clareza das instruções, tempo de fala, participação, perguntas de mediação e capacidade de adaptar.", conclusion: "Prontidão é tomar boas decisões diante do inesperado, não executar tudo sem erro." },
    [{ question: "Preciso dominar todos os projetos antes da primeira aula?", answer: "Não. Domine uma sequência inicial, os procedimentos de segurança e a rotina de diagnóstico." }, { question: "O que ensaiar além do código?", answer: "Materiais, falas, formação de grupos, transferência, tempo, falhas prováveis, avaliação e plano alternativo." }, { question: "Qual é a melhor evidência de prontidão?", answer: "Conduzir uma microaula, explicar as escolhas e adaptar quando uma condição muda." }],
  ),
];

export function lessonByModuleId(id: string): FormationLesson | undefined {
  return PREPARATION_LESSONS.find((lesson) => lesson.moduleId === id);
}
