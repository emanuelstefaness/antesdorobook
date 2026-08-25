import generatedTechnicalGuides from "./generated/additionalTechnicalGuides.json";
import { correctAdditionalTechnicalGuide } from "./technicalGuideCorrections";

export type CategoriaMakeCode =
  | "Básico"
  | "Entrada"
  | "Variáveis"
  | "Lógica"
  | "Matemática"
  | "Música"
  | "Rádio"
  | "Pinos"
  | "Servo"
  | "IA gerada"
  | "Ciclos"
  | "Funções"
  | "Matrizes"
  | "Texto"
  | "Jogo"
  | "Imagens"
  | "Serial"
  | "Controle"
  | "Data Logger"
  | "Extensões";

export type PassoDeBloco = {
  order: number;
  category: CategoriaMakeCode;
  block: string;
  place: string;
  indent?: number;
};

export type Ligacao = { from: string; to: string; color: "vermelho" | "preto" | "amarelo" | "azul" | "verde"; purpose: string };

export type GuiaTecnicoMicrobit = {
  id: string;
  title: string;
  board: string;
  extensions: string[];
  before: string[];
  blocks: PassoDeBloco[];
  code: string;
  codeNote?: string;
  wiring: { kind: "interno" | "externo"; component: string; connections: Ligacao[]; notes: string[] };
  expected: string[];
  answers: Array<{ question: string; answer: string }>;
  diagnostics: Array<{ symptom: string; cause: string; check: string; fix: string }>;
};

type Receita = Omit<GuiaTecnicoMicrobit, "id">;

const interno = (component: string): Receita["wiring"] => ({
  kind: "interno",
  component,
  connections: [],
  notes: ["Este recurso já está dentro do micro:bit: não ligue fios nos pinos.", "Use apenas o cabo USB de dados para transferir o programa e, depois, o suporte de pilhas para usar sem computador."],
});

const diagnosticosBasicos: Receita["diagnostics"] = [
  { symptom: "Nada acontece no simulador", cause: "O bloco ficou solto ou o simulador está pausado.", check: "Veja se cada pilha começa em ‘ao iniciar’, ‘para sempre’ ou em um evento; clique em reiniciar no simulador.", fix: "Encaixe o bloco solto dentro do evento correto e reinicie o simulador." },
  { symptom: "Funciona no simulador, mas não na placa", cause: "O arquivo não foi transferido, o cabo só carrega ou a placa está sem energia.", check: "Confirme se a unidade MICROBIT aparece no computador e se o LED traseiro pisca durante a cópia.", fix: "Use um cabo USB de dados, baixe novamente o arquivo .hex e copie-o para MICROBIT." },
  { symptom: "O programa antigo continua na placa", cause: "O novo .hex não chegou à unidade MICROBIT.", check: "Compare o horário do arquivo baixado e aguarde o LED traseiro parar de piscar.", fix: "Apague a cópia antiga da pasta Downloads, baixe de novo e transfira o arquivo mais recente." },
];

function blocos(...items: Array<[CategoriaMakeCode, string, string, number?]>): PassoDeBloco[] {
  return items.map(([category, block, place, indent], index) => ({ order: index + 1, category, block, place, indent }));
}

function base(title: string, blocks: PassoDeBloco[], code: string, expected: string[], answers: Receita["answers"], extras: Partial<Receita> = {}): Receita {
  return {
    title,
    board: "BBC micro:bit V1 ou V2",
    extensions: [],
    before: ["Abra makecode.microbit.org e clique em ‘Novo projeto’.", "Dê ao projeto um nome com turma, atividade e data.", "Monte e teste primeiro no simulador; conecte a placa somente depois de o resultado estar correto."],
    blocks,
    code,
    wiring: interno("recursos internos da placa"),
    expected,
    answers,
    diagnostics: diagnosticosBasicos,
    ...extras,
  };
}

const RECEITAS = {
  icone: base(
    "Primeiro ícone",
    blocos(["Básico", "ao iniciar", "deixe como bloco externo principal"], ["Básico", "mostrar ícone ♥", "encaixe dentro de ‘ao iniciar’", 1]),
    "basic.showIcon(IconNames.Heart)",
    ["Ao iniciar, os 25 LEDs formam um coração e permanecem acesos.", "Ao trocar o desenho no bloco, o simulador e a placa mostram o novo ícone."],
    [{ question: "Qual é a entrada?", answer: "Neste primeiro programa não há entrada do usuário: o início do programa dispara a ação." }, { question: "Qual é a saída?", answer: "A imagem formada pela matriz 5 × 5 de LEDs." }],
  ),
  botoes: base(
    "Dois botões, duas respostas",
    blocos(["Entrada", "ao botão A pressionado", "crie a primeira pilha"], ["Básico", "mostrar ícone feliz", "dentro do evento A", 1], ["Entrada", "ao botão B pressionado", "crie uma segunda pilha separada"], ["Básico", "mostrar ícone triste", "dentro do evento B", 1]),
    "input.onButtonPressed(Button.A, function () {\n  basic.showIcon(IconNames.Happy)\n})\ninput.onButtonPressed(Button.B, function () {\n  basic.showIcon(IconNames.Sad)\n})",
    ["A mostra um rosto feliz; B mostra um rosto triste.", "Pressionar um botão não dispara a resposta do outro."],
    [{ question: "O que é entrada?", answer: "O toque físico no botão A ou B." }, { question: "O que é processamento?", answer: "A placa reconhece qual evento ocorreu e escolhe a pilha correspondente." }, { question: "O que é saída?", answer: "O ícone mostrado na matriz de LEDs." }],
  ),
  contador: base(
    "Contador com variável",
    blocos(["Variáveis", "criar variável pontos", "clique em ‘Criar uma variável’"], ["Básico", "ao iniciar", "primeira pilha"], ["Variáveis", "definir pontos para 0", "dentro de ‘ao iniciar’", 1], ["Entrada", "ao botão A pressionado", "segunda pilha"], ["Variáveis", "alterar pontos por 1", "dentro do evento A", 1], ["Básico", "mostrar número pontos", "abaixo de alterar", 1], ["Entrada", "ao botão B pressionado", "terceira pilha"], ["Lógica", "se pontos > 0 então", "dentro do evento B", 1], ["Variáveis", "alterar pontos por -1", "dentro do ‘se’", 2], ["Básico", "mostrar número pontos", "depois do ‘se’", 1]),
    "let pontos = 0\ninput.onButtonPressed(Button.A, function () {\n  pontos += 1\n  basic.showNumber(pontos)\n})\ninput.onButtonPressed(Button.B, function () {\n  if (pontos > 0) pontos += -1\n  basic.showNumber(pontos)\n})",
    ["A soma um ponto; B retira um ponto sem deixar o valor negativo.", "O número mostrado sempre corresponde ao valor guardado em ‘pontos’."],
    [{ question: "Onde o valor fica guardado?", answer: "Na variável chamada ‘pontos’, dentro da memória da placa." }, { question: "Por que usar ‘alterar’ e não ‘definir para 1’?", answer: "‘Alterar’ usa o valor anterior; ‘definir’ substituiria tudo por 1 em cada toque." }],
  ),
  cracha: base(
    "Crachá animado",
    blocos(["Básico", "ao iniciar", "pilha principal"], ["Básico", "mostrar cadeia ‘ANA’", "dentro de ‘ao iniciar’", 1], ["Básico", "pausa 500 ms", "abaixo do nome", 1], ["Básico", "mostrar ícone coração", "abaixo da pausa", 1]),
    "basic.showString(\"ANA\")\nbasic.pause(500)\nbasic.showIcon(IconNames.Heart)",
    ["O nome percorre a tela da direita para a esquerda; depois aparece o ícone.", "Trocar ANA pelo nome do estudante muda somente o texto."],
    [{ question: "Por que o nome se move?", answer: "A matriz tem apenas cinco colunas; o texto precisa rolar para mostrar todas as letras." }, { question: "O que vem primeiro?", answer: "O texto, depois a pausa e por último o ícone, exatamente na ordem vertical dos blocos." }],
  ),
  dado: base(
    "Dado ao agitar",
    blocos(["Entrada", "ao gesto agitado", "pilha de evento"], ["Básico", "mostrar número", "dentro do evento", 1], ["Matemática", "escolher aleatório de 1 até 6", "encaixe no espaço do número", 2]),
    "input.onGesture(Gesture.Shake, function () {\n  basic.showNumber(randint(1, 6))\n})",
    ["Cada agitada mostra um número inteiro entre 1 e 6.", "Em 20 testes nunca aparece 0 nem 7."],
    [{ question: "A placa prevê o resultado?", answer: "Não. Ela sorteia um inteiro no intervalo definido quando recebe o gesto." }, { question: "Por que usar 1 até 6?", answer: "São os seis resultados válidos de um dado comum." }],
  ),
  rps: base(
    "Pedra, papel e tesoura",
    blocos(["Variáveis", "criar variável escolha", "crie antes de montar"], ["Entrada", "ao gesto agitado", "pilha principal"], ["Variáveis", "definir escolha para aleatório 1 até 3", "dentro do evento", 1], ["Lógica", "se escolha = 1 / senão se = 2 / senão", "abaixo do sorteio", 1], ["Básico", "mostrar três desenhos diferentes", "um em cada ramo", 2]),
    "let escolha = 0\ninput.onGesture(Gesture.Shake, function () {\n  escolha = randint(1, 3)\n  if (escolha == 1) basic.showIcon(IconNames.SmallSquare)\n  else if (escolha == 2) basic.showIcon(IconNames.Square)\n  else basic.showIcon(IconNames.Scissors)\n})",
    ["Cada agitada sorteia exatamente um dos três símbolos.", "Os valores 1, 2 e 3 levam a pedra, papel e tesoura, respectivamente."],
    [{ question: "Por que guardar o sorteio?", answer: "Para testar o mesmo valor nas condições sem fazer um novo sorteio em cada ramo." }, { question: "Pode aparecer mais de um símbolo?", answer: "Não, porque os ramos se/senão se/senão são mutuamente exclusivos." }],
  ),
  reflexo: base(
    "Cronômetro de reflexo",
    blocos(["Variáveis", "criar inicio e liberado", "crie as duas variáveis"], ["Básico", "ao iniciar", "pilha de preparação"], ["Básico", "pausa aleatória 2000 até 5000 ms", "dentro de ‘ao iniciar’", 1], ["Variáveis", "definir inicio para tempo de execução", "depois da espera", 1], ["Variáveis", "definir liberado para verdadeiro", "abaixo do horário", 1], ["Básico", "mostrar ícone alvo", "abaixo de liberado", 1], ["Entrada", "ao botão A pressionado", "segunda pilha"], ["Lógica", "se liberado então", "dentro do evento A", 1], ["Básico", "mostrar número tempo de execução - inicio", "dentro do ‘se’", 2]),
    "let inicio = 0\nlet liberado = false\nbasic.pause(randint(2000, 5000))\ninicio = input.runningTime()\nliberado = true\nbasic.showIcon(IconNames.Target)\ninput.onButtonPressed(Button.A, function () {\n  if (liberado) basic.showNumber(input.runningTime() - inicio)\n  else basic.showIcon(IconNames.No)\n})",
    ["Depois de uma espera imprevisível aparece o alvo.", "A mostra o tempo de reação em milissegundos; toque antecipado mostra X."],
    [{ question: "Quando começa a medição?", answer: "Imediatamente antes de mostrar o alvo, depois da espera aleatória." }, { question: "Por que não iniciar antes da pausa?", answer: "Isso somaria o tempo de espera ao tempo de reação." }],
  ),
  musica: base(
    "Melodia com repetição",
    blocos(["Entrada", "ao botão A pressionado", "pilha principal"], ["Básico", "repetir 2 vezes", "dentro do evento", 1], ["Música", "tocar tom Dó médio por 1/4", "dentro da repetição", 2], ["Música", "tocar tom Sol médio por 1/4", "abaixo do primeiro tom", 2], ["Básico", "pausa 200 ms", "depois da repetição", 1]),
    "input.onButtonPressed(Button.A, function () {\n  for (let i = 0; i < 2; i++) {\n    music.playTone(262, music.beat(BeatFraction.Quarter))\n    music.playTone(392, music.beat(BeatFraction.Quarter))\n  }\n  basic.pause(200)\n})",
    ["A toca Dó–Sol duas vezes.", "Na V2 o som sai no alto-falante; na V1 conecte fone/buzzer adequado conforme o kit."],
    [{ question: "Qual trecho se repete?", answer: "As duas notas que estão dentro do bloco ‘repetir 2 vezes’." }, { question: "Mudar 2 para 3 altera o quê?", answer: "A mesma frase musical é executada uma vez a mais." }],
    { board: "BBC micro:bit V2 para som interno; V1 exige saída de áudio externa" },
  ),
  luz: base(
    "Leitura e decisão pela luz",
    blocos(["Básico", "para sempre", "pilha principal"], ["Lógica", "se nível de luz < 80 então / senão", "dentro de ‘para sempre’", 1], ["Básico", "mostrar LEDs todos acesos", "dentro de ‘então’", 2], ["Básico", "limpar tela", "dentro de ‘senão’", 2], ["Básico", "pausa 200 ms", "depois da condição", 1]),
    "basic.forever(function () {\n  if (input.lightLevel() < 80) basic.showLeds(`\n    # # # # #\n    # # # # #\n    # # # # #\n    # # # # #\n    # # # # #\n  `)\n  else basic.clearScreen()\n  basic.pause(200)\n})",
    ["No escuro (valor abaixo de 80), a matriz acende; no claro, apaga.", "O limite 80 é ponto inicial: a turma deve medir e ajustar ao ambiente."],
    [{ question: "O valor 80 serve para qualquer sala?", answer: "Não. É um limite inicial; a luz real deve ser medida e o valor calibrado." }, { question: "Por que usar ‘para sempre’?", answer: "Para medir novamente e atualizar a saída enquanto o ambiente muda." }],
  ),
  temperatura: base(
    "Termômetro por botão",
    blocos(["Entrada", "ao botão A pressionado", "pilha principal"], ["Básico", "mostrar número", "dentro do evento", 1], ["Entrada", "temperatura (°C)", "encaixe no espaço do número", 2]),
    "input.onButtonPressed(Button.A, function () {\n  basic.showNumber(input.temperature())\n})",
    ["A mostra a temperatura aproximada do chip em °C.", "Após segurar a placa, a leitura pode subir; espere estabilizar antes de comparar locais."],
    [{ question: "O micro:bit mede exatamente o ar?", answer: "Não. Mede a temperatura do processador, que aproxima a do ambiente e é influenciada pela mão e pelo próprio funcionamento." }, { question: "Como comparar locais?", answer: "Use o mesmo tempo de espera, posição e forma de segurar em todas as medições." }],
  ),
  som: base(
    "Semáforo de ruído",
    blocos(["Básico", "para sempre", "pilha principal"], ["Lógica", "se nível de som < 80 / senão se < 150 / senão", "dentro de ‘para sempre’", 1], ["Básico", "mostrar ícone feliz / atenção / X", "um ícone em cada ramo", 2], ["Básico", "pausa 200 ms", "depois da condição", 1]),
    "basic.forever(function () {\n  if (input.soundLevel() < 80) basic.showIcon(IconNames.Happy)\n  else if (input.soundLevel() < 150) basic.showIcon(IconNames.Surprised)\n  else basic.showIcon(IconNames.No)\n  basic.pause(200)\n})",
    ["Som baixo mostra feliz, médio mostra atenção e alto mostra X.", "Os limites devem ser calibrados com a turma e atualizados continuamente."],
    [{ question: "Por que três faixas?", answer: "Para transformar muitos valores do sensor em três mensagens fáceis de interpretar." }, { question: "Por que os limites variam?", answer: "Tamanho da sala, distância, conversa e posição da placa alteram a leitura." }],
    { board: "BBC micro:bit V2 (a V1 não tem microfone interno)" },
  ),
  radio: base(
    "Mensagem por rádio",
    blocos(["Básico", "ao iniciar", "primeira pilha"], ["Rádio", "definir grupo 7", "dentro de ‘ao iniciar’", 1], ["Entrada", "ao botão A pressionado", "segunda pilha"], ["Rádio", "enviar número 1", "dentro do evento A", 1], ["Rádio", "ao receber número recebido", "terceira pilha"], ["Básico", "mostrar número recebido", "dentro do recebimento", 1]),
    "radio.setGroup(7)\ninput.onButtonPressed(Button.A, function () {\n  radio.sendNumber(1)\n})\nradio.onReceivedNumber(function (receivedNumber) {\n  basic.showNumber(receivedNumber)\n})",
    ["Duas placas no grupo 7: A em uma envia 1, que aparece na outra.", "Placa em outro grupo não exibe a mensagem."],
    [{ question: "As placas precisam de internet?", answer: "Não. Usam o rádio interno e só precisam estar próximas e no mesmo grupo." }, { question: "O que causa mensagens de outro grupo?", answer: "Duas equipes usaram o mesmo número de grupo; atribua canais diferentes." }],
    { diagnostics: [...diagnosticosBasicos, { symptom: "Uma placa envia, mas a outra não recebe", cause: "Grupos diferentes, receptor sem evento ou placas distantes.", check: "Mostre o grupo no início das duas placas e aproxime-as.", fix: "Use exatamente o mesmo número de grupo e mantenha um único evento ‘ao receber número’." }] },
  ),
  movimento: base(
    "Alarme e contagem de movimento",
    blocos(["Variáveis", "criar variável movimentos", "crie antes de montar"], ["Entrada", "ao gesto agitado", "primeira pilha"], ["Variáveis", "alterar movimentos por 1", "dentro do gesto", 1], ["Básico", "mostrar ícone atenção", "abaixo do contador", 1], ["Entrada", "ao botão A pressionado", "segunda pilha"], ["Básico", "mostrar número movimentos", "dentro do evento A", 1]),
    "let movimentos = 0\ninput.onGesture(Gesture.Shake, function () {\n  movimentos += 1\n  basic.showIcon(IconNames.Surprised)\n})\ninput.onButtonPressed(Button.A, function () {\n  basic.showNumber(movimentos)\n})",
    ["Cada gesto reconhecido soma um e mostra alerta.", "A exibe o total; movimentos leves podem não contar e passos fortes podem contar mais de uma vez."],
    [{ question: "Sensor e passo são a mesma coisa?", answer: "Não. O sensor reconhece um padrão de aceleração; a turma precisa testar quanto ele coincide com passos reais." }, { question: "Como reduzir falso alarme?", answer: "Fixe a placa sempre do mesmo modo, repita o teste e ajuste o gesto ou o critério." }],
  ),
  bussola: base(
    "Bússola em quatro direções",
    blocos(["Variáveis", "criar variável angulo", "crie antes de montar"], ["Básico", "para sempre", "pilha principal"], ["Variáveis", "definir angulo para direção da bússola", "dentro de ‘para sempre’", 1], ["Lógica", "se angulo < 45 ou angulo >= 315 / senão se < 135 / < 225 / senão", "abaixo da leitura", 1], ["Básico", "mostrar N / L / S / O", "um texto curto em cada ramo", 2]),
    "let angulo = 0\nbasic.forever(function () {\n  angulo = input.compassHeading()\n  if (angulo < 45 || angulo >= 315) basic.showString(\"N\")\n  else if (angulo < 135) basic.showString(\"L\")\n  else if (angulo < 225) basic.showString(\"S\")\n  else basic.showString(\"O\")\n})",
    ["Após calibrar, a placa mostra N, L, S ou O conforme a direção.", "A faixa norte inclui os valores próximos de 0° e de 360°."],
    [{ question: "Por que o norte usa duas faixas?", answer: "Porque 0° e 360° representam a mesma direção; norte atravessa a borda da escala." }, { question: "Por que calibrar longe de metal?", answer: "Campos magnéticos próximos alteram a leitura da bússola." }],
  ),
  solo: base(
    "Sonda de umidade por leitura analógica",
    blocos(["Básico", "para sempre", "pilha principal"], ["Lógica", "se leitura analógica P0 < limite então / senão", "dentro de ‘para sempre’", 1], ["Básico", "mostrar ícone triste / feliz", "um em cada ramo", 2], ["Básico", "pausa 1000 ms", "depois da condição", 1]),
    "basic.forever(function () {\n  if (pins.analogReadPin(AnalogPin.P0) < 400) basic.showIcon(IconNames.Sad)\n  else basic.showIcon(IconNames.Happy)\n  basic.pause(1000)\n})",
    ["A sonda produz um valor de 0 a 1023; o ícone muda ao atravessar o limite calibrado.", "O número 400 é apenas exemplo: registre seco e úmido e escolha o meio para seu sensor."],
    [{ question: "O limite 400 é universal?", answer: "Não. Sensor, solo, distância entre sondas e umidade mudam a leitura; calibre no material real." }, { question: "Por que limpar a sonda?", answer: "Resíduos e corrosão alteram a condução e tornam as medições inconsistentes." }],
    { wiring: { kind: "externo", component: "sensor capacitivo de umidade compatível com 3 V", connections: [{ from: "3V", to: "VCC/+ do sensor", color: "vermelho", purpose: "alimentação de 3 V" }, { from: "GND", to: "GND/− do sensor", color: "preto", purpose: "referência comum" }, { from: "P0", to: "SIG/AO do sensor", color: "amarelo", purpose: "leitura analógica" }], notes: ["Confirme que o módulo aceita 3 V antes de ligar.", "Não use sensor com saída de 5 V diretamente nos pinos do micro:bit."] } },
  ),
  servo: base(
    "Movimento com microservo",
    blocos(["Entrada", "ao botão A pressionado", "primeira pilha"], ["Servo", "definir servo P1 para 20°", "dentro do evento A", 1], ["Entrada", "ao botão B pressionado", "segunda pilha"], ["Servo", "definir servo P1 para 100°", "dentro do evento B", 1]),
    "input.onButtonPressed(Button.A, function () { servos.P1.setAngle(20) })\ninput.onButtonPressed(Button.B, function () { servos.P1.setAngle(100) })",
    ["A move o eixo para aproximadamente 20°; B move para aproximadamente 100°.", "A haste não deve bater nem forçar a estrutura nos extremos."],
    [{ question: "O servo é sensor ou atuador?", answer: "Atuador: recebe um comando elétrico e produz movimento." }, { question: "Por que testar sem a haste primeiro?", answer: "Para conferir ângulos e sentido sem quebrar ou travar a maquete." }],
    { extensions: ["Servo (oficial do MakeCode)"], wiring: { kind: "externo", component: "microservo de 3 fios", connections: [{ from: "P1", to: "sinal do servo (amarelo/laranja)", color: "amarelo", purpose: "comando de posição" }, { from: "GND", to: "GND do servo e negativo da fonte", color: "preto", purpose: "terra comum" }, { from: "fonte externa adequada", to: "V+ do servo (vermelho)", color: "vermelho", purpose: "alimentação do motor" }], notes: ["Use fonte externa adequada ao servo; una apenas os GNDs.", "Nunca alimente motor DC pelo pino 3V.", "Teste o servo solto antes de prender a haste."] } },
  ),
  distancia: base(
    "Alerta por distância",
    blocos(
      ["Variáveis", "criar variável distancia", "crie antes de montar"],
      ["Básico", "para sempre", "pilha principal"],
      ["Pinos", "escrita digital P1 para 0", "dentro de ‘para sempre’", 1],
      ["Controle", "aguardar 2 microssegundos", "abaixo da escrita 0", 1],
      ["Pinos", "escrita digital P1 para 1", "abaixo da espera", 1],
      ["Controle", "aguardar 10 microssegundos", "abaixo da escrita 1", 1],
      ["Pinos", "escrita digital P1 para 0", "abaixo da segunda espera", 1],
      ["Variáveis", "definir distancia para duração do pulso alto em P2 ÷ 58", "abaixo do pulso de disparo", 1],
      ["Lógica", "se distancia < 10 / senão se distancia < 25 / senão", "abaixo da medição", 1],
      ["Básico", "mostrar X / atenção / feliz", "um ícone em cada ramo", 2],
      ["Básico", "pausa 100 ms", "depois da condição", 1],
    ),
    "let distancia = 0\nbasic.forever(function () {\n  pins.digitalWritePin(DigitalPin.P1, 0)\n  control.waitMicros(2)\n  pins.digitalWritePin(DigitalPin.P1, 1)\n  control.waitMicros(10)\n  pins.digitalWritePin(DigitalPin.P1, 0)\n  distancia = pins.pulseIn(DigitalPin.P2, PulseValue.High, 25000) / 58\n  if (distancia > 0 && distancia < 10) basic.showIcon(IconNames.No)\n  else if (distancia > 0 && distancia < 25) basic.showIcon(IconNames.Surprised)\n  else basic.showIcon(IconNames.Happy)\n  basic.pause(100)\n})",
    ["Objeto a menos de 10 cm mostra X; de 10 a 24 cm mostra atenção; a 25 cm ou mais mostra feliz.", "A leitura muda suavemente quando o objeto se aproxima de frente."],
    [{ question: "Por que o código divide a duração por 58?", answer: "O pulso mede o tempo de ida e volta do som. Para esse sensor, dividir o tempo em microssegundos por aproximadamente 58 converte a leitura em centímetros." }, { question: "Como escolher as faixas?", answer: "Meça a maquete real e defina limites sem sobreposição nem intervalo vazio." }],
    { codeNote: "Código completo para o modelo HC-SR04P alimentado em 3,3 V. Não substitua pelo HC-SR04 clássico de 5 V sem adaptação elétrica.", wiring: { kind: "externo", component: "sensor ultrassônico HC-SR04P compatível com alimentação de 3,3 V", connections: [{ from: "3V", to: "VCC do HC-SR04P", color: "vermelho", purpose: "alimentação em 3,3 V" }, { from: "GND", to: "GND do HC-SR04P", color: "preto", purpose: "referência comum" }, { from: "P1", to: "TRIG", color: "amarelo", purpose: "pulso de disparo" }, { from: "P2", to: "ECHO do modelo HC-SR04P 3,3 V", color: "azul", purpose: "retorno da medida" }], notes: ["Confirme que está escrito HC-SR04P e que o módulo aceita alimentação e lógica de 3,3 V.", "Não ligue o ECHO de um HC-SR04 clássico de 5 V diretamente ao micro:bit.", "Monte e confira todas as conexões com a placa desligada."] } },
  ),
  ia: base(
    "Classificador de gestos no micro:bit CreateAI",
    blocos(["IA gerada", "evento ‘gesto reconhecido: classe 1’", "gerado pelo CreateAI"], ["Básico", "mostrar ícone feliz", "dentro do primeiro evento", 1], ["IA gerada", "evento ‘gesto reconhecido: classe 2’", "segunda pilha gerada"], ["Básico", "mostrar ícone triste", "dentro do segundo evento", 1]),
    "// O CreateAI gera a extensão e os eventos do seu modelo.\n// Colete exemplos → treine → teste → abra no MakeCode.\n// Dentro de cada evento gerado, coloque a saída desejada.",
    ["Ao repetir um gesto parecido com os exemplos de treino, aparece o ícone associado.", "Gestos diferentes ou pessoas não incluídas podem ser classificados incorretamente; registre esses erros."],
    [{ question: "A máquina aprendeu o gesto verdadeiro?", answer: "Ela aprendeu padrões dos exemplos coletados; exemplos limitados produzem um modelo limitado." }, { question: "Como melhorar?", answer: "Adicionar exemplos variados, equilibrar quantidades por classe e testar com pessoas/velocidades não usadas no treino." }],
    { board: "BBC micro:bit V2", extensions: ["Extensão gerada pelo micro:bit CreateAI"], codeNote: "O código compartilhável nasce do modelo treinado pela turma; ele não pode ser substituído por um código genérico." },
  ),
} satisfies Record<string, Receita>;

const MAPA: Record<string, keyof typeof RECEITAS> = {
  "primeiro-icone-na-placa": "icone",
  "botoes-que-respondem": "botoes",
  "contador-de-pontos-com-variavel": "contador",
  "sensores-medindo-a-sala": "temperatura",
  "cracha-animado-com-microbit": "cracha",
  "dado-eletronico-para-jogos": "dado",
  "placar-portatil-com-variavel": "contador",
  "pedra-papel-tesoura-na-placa": "rps",
  "jogo-do-reflexo": "reflexo",
  "musica-com-repeticao": "musica",
  "luz-noturna-automatica": "luz",
  "mapa-de-temperatura": "temperatura",
  "semaforo-de-ruido": "som",
  "mensagens-por-radio": "radio",
  "alarme-de-movimento-na-mochila": "movimento",
  "alerta-de-solo-seco": "solo",
  "cancela-automatica-com-servo": "servo",
  "radar-de-garagem-em-maquete": "distancia",
  "mini-estufa-inteligente": "solo",
  "duas-verdades-e-checagem": "botoes",
  "classificador-de-gestos": "ia",
  "bussola-digital-e-orientacao": "bussola",
  "pedometro-com-acelerometro": "movimento",
  "mapa-de-luz-da-sala": "luz",
  "mascote-que-reage": "servo",
  "estacoes-com-uma-placa": "icone",
  "radio-cooperativo-em-sala": "radio",
};

export const ADDITIONAL_TECHNICAL_GUIDES = (generatedTechnicalGuides as unknown as GuiaTecnicoMicrobit[])
  .map(correctAdditionalTechnicalGuide);

export const MICROBIT_TECHNICAL_GUIDES: GuiaTecnicoMicrobit[] = [
  ...Object.entries(MAPA).map(([id, recipe]) => correctAdditionalTechnicalGuide({ id, ...RECEITAS[recipe] })),
  ...ADDITIONAL_TECHNICAL_GUIDES,
];

export function guiaTecnicoPorPlano(id: string): GuiaTecnicoMicrobit | undefined {
  return MICROBIT_TECHNICAL_GUIDES.find((guide) => guide.id === id);
}
