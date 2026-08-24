import fs from "node:fs";
import path from "node:path";

const sourcePath = process.argv[2];
if (!sourcePath) throw new Error("Informe o arquivo Markdown com as 100 atividades.");
const root = process.cwd();
const markdown = fs.readFileSync(sourcePath, "utf8").replaceAll("\r\n", "\n");

const normalize = (value) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const slug = (value) => normalize(value).replaceAll(" ", "-");
const compact = (value) => value.replace(/\s+/g, " ").trim();

const sections = [...markdown.matchAll(/^# (\d+)\. (.+)$/gm)].map((match) => ({ index: match.index, title: match[2].trim() }));
const headings = [...markdown.matchAll(/^## (\d+)\. (.+)$/gm)];
const activities = headings.map((match, index) => {
  const start = match.index;
  const end = headings[index + 1]?.index ?? markdown.length;
  const body = markdown.slice(start + match[0].length, end).trim();
  const section = [...sections].reverse().find((item) => item.index < start)?.title ?? "Projetos";
  const variables = body.match(/\*\*Variáveis:\*\*\s*([^\n]+)/)?.[1]?.trim() ?? "nenhuma";
  const where = body.match(/\*\*Onde buscar:\*\*\s*([^\n]+)/)?.[1]?.trim() ?? "Básico";
  const extension = body.match(/\*\*Extensão adotada:\*\*\s*([^\n]+)/)?.[1]?.trim() ?? "";
  const hardware = body.match(/\*\*Hardware padronizado:\*\*\s*([^\n]+)/)?.[1]?.trim() ?? "";
  const code = body.match(/```\n([\s\S]*?)\n```/)?.[1]?.trim() ?? "";
  const afterCode = body.split("```").at(-1)?.replace(/^---$/gm, "").trim() ?? "";
  return { number: Number(match[1]), sourceTitle: match[2].trim(), body, section, variables, where, extension, hardware, blockCode: code, note: compact(afterCode) };
});

if (activities.length !== 100) throw new Error(`Esperava 100 atividades; encontrei ${activities.length}.`);

const currentSources = ["src/data/lessonPlans.ts", "src/data/expandedLessonPlans.ts"].map((file) => fs.readFileSync(path.join(root, file), "utf8")).join("\n");
const currentTitles = [...currentSources.matchAll(/\btitle:\s*"([^"]+)"/g)].map((match) => match[1]);
const tokenSet = (value) => new Set(normalize(value).split(" ").filter((token) => token.length > 2 && !["com", "para", "uma", "das", "dos", "por", "sem", "microbit", "placa"].includes(token)));
const similarity = (left, right) => {
  const a = tokenSet(left); const b = tokenSet(right);
  const intersection = [...a].filter((token) => b.has(token)).length;
  const union = new Set([...a, ...b]).size;
  return union ? intersection / union : 0;
};

const suffixBySection = {
  "Primeiros passos": "aplicação guiada",
  "Movimento e acelerômetro": "investigação corporal",
  "Jogos e desafios": "desafio de estratégias",
  "Matemática e dados": "investigação matemática",
  "Ciências e ambiente": "investigação científica",
  "Música, arte e expressão": "oficina criativa",
  Robótica: "projeto integrador",
};

// Similaridade textual não encontra equivalências como “pedômetro” e
// “contador de passos”. Este mapa impede que uma mudança de nome seja contada
// como atividade nova e dá a cada caso uma abordagem pedagógica realmente distinta.
const semanticOverlaps = {
  "Contador no botão A": ["Contador de pontos com variável", "registro de participação"],
  "Contador de passos": ["Pedômetro com acelerômetro", "investigação de movimento"],
  "Alarme de mochila": ["Alarme de movimento", "estudo de sensibilidade e falsos alarmes"],
  "Jogo da reação rápida": ["Jogo do reflexo", "laboratório de medição do tempo"],
  "Jogo cooperativo por rádio": ["Rede cooperativa por rádio", "missão com protocolo criado pela turma"],
  "Termômetro da sala": ["Mapa de temperatura da escola", "comparação de microclimas na mesma sala"],
  "Detector de ambiente escuro": ["Luz noturna automática", "calibração de limiar luminoso"],
  "Medidor de umidade do solo": ["Alerta de solo seco", "calibração científica do sensor"],
  "Semáforo do barulho": ["Semáforo de ruído", "acordos de autorregulação da turma"],
  "Crachá digital": ["Crachá animado com micro:bit", "identidade e comunicação visual"],
};

const categoryId = (where) => {
  const value = normalize(where);
  if (value.includes("radio")) return "radio";
  if (value.includes("musica")) return "musica";
  if (value.includes("pinos") || value.includes("servo")) return "pinos";
  if (value.includes("serial") || value.includes("data logger")) return "serial";
  if (value.includes("jogo")) return "jogos";
  if (value.includes("imagem")) return "imagens";
  if (value.includes("matriz")) return "listas";
  if (value.includes("texto")) return "texto";
  if (value.includes("func")) return "funcoes";
  if (value.includes("variav")) return "variaveis";
  if (value.includes("logica")) return "logica";
  if (value.includes("ciclo")) return "repeticoes";
  if (value.includes("matematica")) return "matematica";
  if (value.includes("entrada")) return "entrada";
  return "basico";
};

const conceptIds = (activity) => {
  const value = normalize(`${activity.where} ${activity.sourceTitle}`);
  const result = ["entrada-processamento-e-saida"];
  if (/ciclo|repet|sequencia|padrao/.test(value)) result.push(value.includes("padrao") ? "reconhecimento-de-padroes" : "repeticao");
  if (/algorit|comando|historia|sequencia/.test(value)) result.push("sequencia-e-instrucoes");
  if (/sensor|temperatura|luz|som|movimento|bussola|umidade|ambiente/.test(value)) result.push("abstracao");
  result.push("teste-e-depuracao");
  return [...new Set(result)].slice(0, 3);
};

const agesBySection = {
  "Primeiros passos": ["2-3", "4-5"],
  "Movimento e acelerômetro": ["4-5", "6-7"],
  "Jogos e desafios": ["4-5", "6-7", "8-9"],
  "Matemática e dados": ["4-5", "6-7", "8-9"],
  "Ciências e ambiente": ["6-7", "8-9"],
  "Música, arte e expressão": ["2-3", "4-5", "6-7"],
  Robótica: ["6-7", "8-9"],
};

const externalKeywords = /BME280|pluvi|umidade do solo|regador|enchente|qualidade do ar|composteira|animais|insetos|janela aberta|frutas|NeoPixel|cartaz interativo|maquete|robô que desenha/i;
const v2Keywords = /som|ruído|barulho|microfone|efeito sonoro|V2/i;

const componentFor = (activity) => {
  const title = activity.sourceTitle;
  if (/BME280|composteira/i.test(title)) return "sensor BME280 I²C";
  if (/pluvi/i.test(title)) return "pluviômetro basculante com pulso digital";
  if (/umidade do solo|regador/i.test(title)) return "sensor capacitivo de umidade do solo";
  if (/enchente/i.test(title)) return "sensor de nível de água compatível com 3,3 V";
  if (/qualidade do ar/i.test(title)) return "sensor de qualidade do ar com saída de até 3,3 V";
  if (/animais|insetos/i.test(title)) return "sensor de barreira infravermelha compatível com 3,3 V";
  if (/janela aberta/i.test(title)) return "reed switch e ímã";
  if (/frutas/i.test(title)) return "frutas, cabos jacaré e contato GND";
  if (/NeoPixel/i.test(title)) return "fita NeoPixel de 10 LEDs";
  if (/cartaz/i.test(title)) return "áreas condutivas em P0, P1 e P2";
  if (/maquete/i.test(title)) return "LEDs com resistores e estágio de acionamento";
  if (/robô que desenha/i.test(title)) return "Cytron MOTION:BIT, dois motores DC e alimentação externa";
  return "recursos internos do micro:bit";
};

const wiringFor = (activity) => {
  const title = activity.sourceTitle; const component = componentFor(activity);
  if (!externalKeywords.test(title)) return { kind: "interno", component, connections: [], notes: ["Este projeto usa sensores e saídas internos da placa; nenhum fio adicional é necessário.", "Transfira pelo cabo USB de dados e use pilhas apenas depois do teste no simulador."] };
  const c = [];
  if (/BME280|composteira/i.test(title)) c.push(["3V", "VIN/VCC", "vermelho", "alimentação 3,3 V"], ["GND", "GND", "preto", "referência comum"], ["P19/SCL", "SCL", "amarelo", "relógio I²C"], ["P20/SDA", "SDA", "azul", "dados I²C"]);
  else if (/frutas/i.test(title)) c.push(["GND", "mão/contato comum", "preto", "fecha o circuito de toque"], ["P0/P1/P2", "cada fruta", "amarelo", "entrada por toque"]);
  else if (/NeoPixel/i.test(title)) c.push(["3V ou fonte adequada", "+ da fita", "vermelho", "alimentação"], ["GND", "− da fita e da fonte", "preto", "referência comum"], ["P0", "DIN", "amarelo", "dados"]);
  else if (/robô que desenha/i.test(title)) c.push(["micro:bit", "slot da MOTION:BIT", "azul", "controlador"], ["M1/M2", "motores esquerdo/direito", "amarelo", "acionamento"], ["entrada de bateria", "suporte recomendado", "vermelho", "energia externa"]);
  else if (/maquete/i.test(title)) c.push(["P1", "resistor → entrada do transistor/LED", "amarelo", "sinal"], ["GND", "terra comum", "preto", "retorno"], ["fonte externa", "conjunto de LEDs", "vermelho", "energia quando houver vários LEDs"]);
  else if (/janela aberta/i.test(title)) c.push(["P0", "terminal do reed switch", "amarelo", "leitura digital"], ["GND", "outro terminal", "preto", "fecha quando o ímã se aproxima"]);
  else c.push(["3V", "VCC do módulo", "vermelho", "alimentação compatível"], ["GND", "GND do módulo", "preto", "referência comum"], ["P0", "SIG/AO/DO", "amarelo", "leitura do sensor"]);
  return { kind: "externo", component, connections: c.map(([from, to, color, purpose]) => ({ from, to, color, purpose })), notes: ["Monte e confira com a placa desligada.", "Nunca aplique sinal de 5 V diretamente a um pino do micro:bit.", "Se houver motor, bomba ou vários LEDs, use fonte e driver adequados com GND comum."] };
};

const classifyBlock = (line, where) => {
  const value = normalize(line);
  if (/radio/.test(value)) return "Rádio";
  if (/musica|tom |melodia|som/.test(value)) return "Música";
  if (/serial/.test(value)) return "Serial";
  if (/logger|registrar dados|datalogger/.test(value)) return "Data Logger";
  if (/pino|servo|motion|neopixel|bme280/.test(value)) return value.includes("neopixel") || value.includes("bme280") || value.includes("motion") ? "Extensões" : "Pinos";
  if (/sprite|pontuacao|vida|jogo/.test(value)) return "Jogo";
  if (/imagem/.test(value)) return "Imagens";
  if (/lista|matriz/.test(value)) return "Matrizes";
  if (/funcao/.test(value)) return "Funções";
  if (/texto|unir/.test(value)) return "Texto";
  if (/repetir|enquanto|para cada/.test(value)) return "Ciclos";
  if (/se |senao|verdadeiro|falso| e | ou | nao /.test(` ${value} `)) return "Lógica";
  if (/definir|alterar/.test(value)) return "Variáveis";
  if (/aleatorio|arredondar|mapear|absoluto|resto|soma|multiplic|divis/.test(value)) return "Matemática";
  if (/botao|agitar|gesto|aceler|rotacao|temperatura|nivel de luz|nivel de som|bussola|tempo de execucao|pulo|queda/.test(value)) return "Entrada";
  if (/mostrar|pausa|limpar|no iniciar|para sempre/.test(value)) return "Básico";
  return where.split(/,| e /)[0].replace("Avançado → ", "").trim() || "Básico";
};

const blocksFor = (activity) => {
  const rows = activity.blockCode.split("\n"); const result = [];
  for (let index = 0; index < rows.length; index++) {
    const raw = rows[index]; const trimmed = raw.trim();
    if (!trimmed || /^PILHA \d+/.test(trimmed)) continue;
    if (/^[.# ]{5,}$/.test(trimmed)) continue;
    let block = trimmed;
    if (/mostrar LEDs/i.test(trimmed)) {
      const grid = [];
      while (index + 1 < rows.length && /^[.# ]{5,}$/.test(rows[index + 1].trim())) grid.push(rows[++index].trim());
      if (grid.length) block += ` (${grid.join(" / ")})`;
    }
    const indent = Math.floor((raw.match(/^\s*/)?.[0].length ?? 0) / 2);
    result.push({ order: result.length + 1, category: classifyBlock(block, activity.where), block, place: indent ? `encaixe no nível ${indent}, dentro do bloco imediatamente acima` : "inicie uma pilha separada", indent });
  }
  return result;
};

const tsExpression = (input) => {
  let value = input.trim();
  value = value.replace(/matriz vazia \[\]/gi, "[]")
    .replace(/matriz \[([^\]]*)\]/gi, "[$1]")
    .replace(/escolher aleatório de (-?\d+) até (-?\d+)/gi, "randint($1, $2)")
    .replace(/tempo de execução \(ms\)/gi, "input.runningTime()")
    .replace(/tempo de execução/gi, "input.runningTime()")
    .replace(/temperatura \(°C\)/gi, "input.temperature()")
    .replace(/nível de luz/gi, "input.lightLevel()")
    .replace(/nível de som/gi, "input.soundLevel()")
    .replace(/direção da bússola/gi, "input.compassHeading()")
    .replace(/input\.compassHeading\(\)\s*\(°\)/gi, "input.compassHeading()")
    .replace(/aceleração \(mg\) força/gi, "input.acceleration(Dimension.Strength)")
    .replace(/rotação (?:inclinação para esquerda\/direita|roll)/gi, "input.rotation(Rotation.Roll)")
    .replace(/rotação (?:inclinação para frente\/trás|pitch)/gi, "input.rotation(Rotation.Pitch)")
    .replace(/leitura analógica pino P(\d+)/gi, "pins.analogReadPin(AnalogPin.P$1)")
    .replace(/leitura digital pino P(\d+)/gi, "pins.digitalReadPin(DigitalPin.P$1)")
    .replace(/criar sprite em x (-?\d+) y (-?\d+)/gi, "game.createSprite($1, $2)")
    .replace(/(\w+) obter propriedade x/gi, "$1.get(LedSpriteProperty.X)")
    .replace(/(\w+) obter propriedade y/gi, "$1.get(LedSpriteProperty.Y)")
    .replace(/(\w+) tocando (\w+)/gi, "$1.isTouching($2)")
    .replace(/comprimento de (\w+)/gi, "$1.length")
    .replace(/obter valor no índice \((.+?)\) de (\w+)/gi, "$2[$1]")
    .replace(/obter valor no índice ([\w+-]+) de (\w+)/gi, "$2[$1]")
    .replace(/(\w+) contém (\w+)/gi, "$1.indexOf($2) >= 0")
    .replace(/mapear (.+?) de (-?\d+) até (-?\d+) para (-?\d+) até (-?\d+)/gi, "Math.map($1, $2, $3, $4, $5)")
    .replace(/valor absoluto de \((.+)\)(?=\s*(?:[<>!=]|$))/gi, "Math.abs($1)")
    .replace(/valor absoluto de ([\w.()]+)/gi, "Math.abs($1)")
    .replace(/arredondar \((.+)\)/gi, "Math.round($1)")
    .replace(/arredondar ([\w.()]+)/gi, "Math.round($1)")
    .replace(/BME280 temperatura/gi, "BME280.temperature()")
    .replace(/BME280 umidade/gi, "BME280.humidity()")
    .replace(/BME280 pressão/gi, "BME280.pressure()")
    .replace(/rádio pacote recebido propriedade FORÇA DO SINAL/gi, "radio.receivedPacket(RadioPacketProperty.SignalStrength)")
    .replace(/NeoPixel criar em pino P(\d+) com (\d+) LEDs no modo RGB \(GRB\)/gi, "neopixel.create(DigitalPin.P$1, $2, NeoPixelMode.RGB)")
    .replace(/verdadeiro/gi, "true").replace(/falso/gi, "false")
    .replace(/\bnão\s+([A-Za-z_$][\w$]*)/gi, "!$1")
    .replace(/\be\b/gi, "&&").replace(/\bou\b/gi, "||")
    .replace(/(?<![<>!=])=(?!=)/g, "==");
  return value;
};

const iconName = (name) => ({ CORAÇÃO: "Heart", FELIZ: "Happy", TRISTE: "Sad", SIM: "Yes", NÃO: "No", NAO: "No", SURPRESA: "Surprised", CONFUSO: "Confused", BRAVO: "Angry", QUADRADO: "Square", "QUADRADO PEQUENO": "SmallSquare" }[name.toUpperCase()] ?? "Heart");

const cleanVariables = (value) => value.replace(/\.+$/, "").trim();
const tsIdentifier = (value) => value
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^A-Za-z0-9_$]/g, "_")
  .replace(/^([0-9])/, "v_$1");

const typescriptFor = (activity) => {
  const variableText = cleanVariables(activity.variables);
  const listedVariables = variableText.toLowerCase() === "nenhuma" ? [] : variableText.replaceAll("`", "").split(",").map((name) => name.trim()).filter(Boolean);
  const inferredVariables = [...activity.blockCode.matchAll(/^\s*definir ([\wÀ-ÿ]+) para /gim)]
    .map((match) => match[1])
    .filter((name) => !/^(?:volume|andamento)$/i.test(name));
  const variableNames = [...new Set([...listedVariables, ...inferredVariables])];
  const declarations = variableNames.map((name) => {
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp(`definir ${escaped} para matriz`, "i").test(activity.blockCode)) return `let ${tsIdentifier(name)}: number[] = []`;
    if (new RegExp(`definir ${escaped} para (?:verdadeiro|falso)`, "i").test(activity.blockCode)) return `let ${tsIdentifier(name)} = false`;
    if (new RegExp(`definir ${escaped} para criar sprite`, "i").test(activity.blockCode)) return `let ${tsIdentifier(name)}: game.LedSprite = null`;
    if (new RegExp(`definir ${escaped} para NeoPixel criar`, "i").test(activity.blockCode)) return `let ${tsIdentifier(name)}: neopixel.Strip = null`;
    return `let ${tsIdentifier(name)} = 0`;
  });
  const rows = activity.blockCode.split("\n"); const out = [...declarations]; const scopes = [];
  const closeTo = (indent) => {
    while (scopes.length && scopes.at(-1).indent >= indent) {
      const scope = scopes.pop();
      out.push(`${"  ".repeat(scopes.length)}${scope.brace ? "}" : "})"}`);
    }
  };
  for (let index = 0; index < rows.length; index++) {
    const raw = rows[index]; const text = raw.trim(); if (!text || /^PILHA \d+/.test(text) || /^[.# ]{5,}$/.test(text)) continue;
    const indent = Math.floor((raw.match(/^\s*/)?.[0].length ?? 0) / 2);
    closeTo(indent);
    const pad = "  ".repeat(scopes.length);
    let match;
    if (/^no iniciar$/i.test(text)) continue;
    if (/^para sempre$/i.test(text)) { out.push(`${pad}basic.forever(function () {`); scopes.push({ indent }); continue; }
    if ((match = text.match(/^no botão (A\+B|A|B) pressionado$/i))) { const button = match[1].toUpperCase() === "A+B" ? "AB" : match[1].toUpperCase(); out.push(`${pad}input.onButtonPressed(Button.${button}, function () {`); scopes.push({ indent }); continue; }
    if (/^em agitar$/i.test(text) || /^em gesto AGITAR$/i.test(text)) { out.push(`${pad}input.onGesture(Gesture.Shake, function () {`); scopes.push({ indent }); continue; }
    if ((match = text.match(/^em gesto (INCLINAR PARA ESQUERDA|INCLINAR PARA DIREITA|TELA PARA CIMA|TELA PARA BAIXO|QUEDA LIVRE)$/i))) { const gesture = ({ "INCLINAR PARA ESQUERDA": "TiltLeft", "INCLINAR PARA DIREITA": "TiltRight", "TELA PARA CIMA": "ScreenUp", "TELA PARA BAIXO": "ScreenDown", "QUEDA LIVRE": "FreeFall" })[match[1].toUpperCase()]; out.push(`${pad}input.onGesture(Gesture.${gesture}, function () {`); scopes.push({ indent }); continue; }
    if ((match = text.match(/^no pino P(\d+) pressionado$/i))) { out.push(`${pad}input.onPinPressed(TouchPin.P${match[1]}, function () {`); scopes.push({ indent }); continue; }
    if (/^no logotipo TOCADO$/i.test(text)) { out.push(`${pad}input.onLogoEvent(TouchButtonEvent.Touched, function () {`); scopes.push({ indent }); continue; }
    if ((match = text.match(/^a cada (\d+) ms$/i))) { out.push(`${pad}loops.everyInterval(${match[1]}, function () {`); scopes.push({ indent }); continue; }
    if ((match = text.match(/^ao rádio receber (número|texto) (\w+)$/i))) { const type = match[1].toLowerCase() === "número" ? "Number" : "String"; out.push(`${pad}radio.onReceived${type}(function (${tsIdentifier(match[2])}) {`); scopes.push({ indent }); continue; }
    if ((match = text.match(/^repetir (\d+) vezes$/i))) { out.push(`${pad}for (let i = 0; i < ${match[1]}; i++) {`); scopes.push({ indent, brace: true }); continue; }
    if ((match = text.match(/^para cada (\w+) em (\w+)$/i))) { out.push(`${pad}for (const ${tsIdentifier(match[1])} of ${tsIdentifier(match[2])}) {`); scopes.push({ indent, brace: true }); continue; }
    if ((match = text.match(/^enquanto (.+)$/i))) { out.push(`${pad}while (${tsExpression(match[1])}) {`); scopes.push({ indent, brace: true }); continue; }
    if ((match = text.match(/^se (.+) então$/i))) { out.push(`${pad}if (${tsExpression(match[1])}) {`); scopes.push({ indent, brace: true }); continue; }
    if ((match = text.match(/^senão se (.+) então$/i))) { out.push(`${pad}else if (${tsExpression(match[1])}) {`); scopes.push({ indent, brace: true }); continue; }
    if (/^senão$/i.test(text)) { out.push(`${pad}else {`); scopes.push({ indent, brace: true }); continue; }
    if ((match = text.match(/^definir volume para (\d+)$/i))) { out.push(`${pad}music.setVolume(${match[1]})`); continue; }
    if ((match = text.match(/^definir andamento para (\d+) bpm$/i))) { out.push(`${pad}music.setTempo(${match[1]})`); continue; }
    if ((match = text.match(/^definir ([\wÀ-ÿ]+) para (.+)$/i))) { out.push(`${pad}${tsIdentifier(match[1])} = ${tsExpression(match[2])}`); continue; }
    if ((match = text.match(/^alterar ([\wÀ-ÿ]+) por (.+)$/i))) { out.push(`${pad}${tsIdentifier(match[1])} += ${tsExpression(match[2])}`); continue; }
    if ((match = text.match(/^mostrar texto "([^"]*)"$/i))) { out.push(`${pad}basic.showString(${JSON.stringify(match[1])})`); continue; }
    if ((match = text.match(/^mostrar número (.+)$/i))) { out.push(`${pad}basic.showNumber(${tsExpression(match[1])})`); continue; }
    if ((match = text.match(/^mostrar ícone (.+)$/i))) { out.push(`${pad}basic.showIcon(IconNames.${iconName(match[1])})`); continue; }
    if ((match = text.match(/^pausa (\d+) ms$/i))) { out.push(`${pad}basic.pause(${match[1]})`); continue; }
    if (/^limpar tela$/i.test(text)) { out.push(`${pad}basic.clearScreen()`); continue; }
    if ((match = text.match(/^escrita digital pino P(\d+) para ([01])$/i))) { out.push(`${pad}pins.digitalWritePin(DigitalPin.P${match[1]}, ${match[2]})`); continue; }
    if ((match = text.match(/^adicionar valor (.+) ao final de (\w+)$/i))) { out.push(`${pad}${tsIdentifier(match[2])}.push(${tsExpression(match[1])})`); continue; }
    if ((match = text.match(/^(\w+) alterar ([xy]) por (.+)$/i))) { const property = match[2].toLowerCase() === "x" ? "X" : "Y"; out.push(`${pad}${tsIdentifier(match[1])}.change(LedSpriteProperty.${property}, ${tsExpression(match[3])})`); continue; }
    if ((match = text.match(/^(\w+) definir brilho para (\d+)$/i))) { out.push(`${pad}${tsIdentifier(match[1])}.set(LedSpriteProperty.Brightness, ${match[2]})`); continue; }
    if ((match = text.match(/^mostrar seta (NORTE|SUL|LESTE|OESTE)$/i))) { const arrow = ({ NORTE: "North", SUL: "South", LESTE: "East", OESTE: "West" })[match[1].toUpperCase()]; out.push(`${pad}basic.showArrow(ArrowNames.${arrow})`); continue; }
    if (/^parar todos os sons$/i.test(text)) { out.push(`${pad}music.stopAllSounds()`); continue; }
    if (/^calibrar bússola$/i.test(text)) { out.push(`${pad}input.calibrateCompass()`); continue; }
    if ((match = text.match(/^rádio definir grupo (\d+)$/i))) { out.push(`${pad}radio.setGroup(${match[1]})`); continue; }
    if ((match = text.match(/^rádio definir potência de transmissão (\d+)$/i))) { out.push(`${pad}radio.setTransmitPower(${match[1]})`); continue; }
    if ((match = text.match(/^rádio enviar número (.+)$/i))) { out.push(`${pad}radio.sendNumber(${tsExpression(match[1])})`); continue; }
    if ((match = text.match(/^rádio enviar texto "([^"]*)"$/i))) { out.push(`${pad}radio.sendString(${JSON.stringify(match[1])})`); continue; }
    if ((match = text.match(/^chamar (\w+) com resposta (.+)$/i))) { out.push(`${pad}${tsIdentifier(match[1])}(${tsExpression(match[2])})`); continue; }
    if (/^mostrar LEDs/i.test(text)) { const grid = []; while (index + 1 < rows.length && /^[.# ]{5,}$/.test(rows[index + 1].trim())) grid.push(rows[++index].trim().replaceAll(".", ".").replaceAll("#", "#")); out.push(`${pad}basic.showLeds(\`\n${grid.map((row) => `  ${row}`).join("\n")}\n\`)`); continue; }
    out.push(`${pad}// Bloco: ${text}`);
  }
  closeTo(-1);
  return out.join("\n") || "// Monte o programa seguindo os blocos acima.";
};

const prepared = activities.map((activity) => {
  const closest = currentTitles.map((title) => ({ title, score: similarity(activity.sourceTitle, title) })).sort((a, b) => b.score - a.score)[0];
  const semantic = semanticOverlaps[activity.sourceTitle];
  const overlap = semantic?.[0] ?? (closest && (closest.score >= 0.6 || normalize(closest.title) === normalize(activity.sourceTitle)) ? closest.title : null);
  const approach = semantic?.[1] ?? suffixBySection[activity.section] ?? "nova abordagem";
  const title = overlap ? `${activity.sourceTitle} — ${approach}` : activity.sourceTitle;
  return { ...activity, title, overlap, approach, id: `atividade-extra-${String(activity.number).padStart(3, "0")}-${slug(title)}` };
});

const lessonPlans = prepared.map((activity, index) => {
  const external = externalKeywords.test(activity.sourceTitle);
  const v2 = v2Keywords.test(`${activity.sourceTitle} ${activity.note}`);
  const level = activity.number <= 20 ? "iniciante" : activity.number <= 70 ? "intermediario" : "avancado";
  const duration = external || activity.number === 49 || activity.number === 100 ? 100 : 50;
  const concepts = conceptIds(activity);
  const mainMakeCode = categoryId(activity.where);
  const next = prepared[index + 1];
  const distinction = activity.overlap ? `Esta é uma proposta adicional, diferente de “${activity.overlap}”: aqui o foco é ${activity.approach}, com investigação, registro e explicação do raciocínio.` : "Esta atividade amplia o catálogo existente com uma aplicação que ainda não estava disponível.";
  return {
    id: activity.id, title: activity.title, theme: `${activity.section} · projeto ${activity.number} de 100`,
    objective: `Construir ${activity.sourceTitle.toLowerCase()} com o micro:bit, prever o comportamento dos blocos e explicar a relação entre entrada, processamento e saída.`,
    duration, ageBands: agesBySection[activity.section] ?? ["4-5", "6-7"], classSize: "16-30", level, concepts,
    materials: external ? ["microbit", "computador", "reciclaveis"] : ["microbit", "computador"], needsComputer: true, needsMicrobit: true, needsBoard: false,
    preparation: [`Faça primeiro o programa completo de “${activity.sourceTitle}” e teste cada pilha separadamente no simulador.`, `${v2 ? "Separe micro:bit V2 e confirme o recurso interno necessário." : "Teste cabo USB de dados, pilhas e a transferência do arquivo .hex."}`, external ? `Monte uma unidade de referência com ${componentFor(activity)} e fotografe cada conexão antes da aula.` : "Deixe o MakeCode aberto e prepare uma malha 5 × 5 em papel para previsões.", `Crie somente estas variáveis: ${cleanVariables(activity.variables)}. Categorias utilizadas: ${activity.where}.`],
    intro: `Mostre o resultado de “${activity.sourceTitle}” funcionando, sem revelar os blocos. ${distinction}`,
    triggerQuestion: `Qual informação o micro:bit precisa receber, qual regra deve executar e qual resultado deve produzir para realizar ${activity.sourceTitle.toLowerCase()}?`,
    explanation: `Retome entrada → processamento → saída. Mostre onde ficam as categorias ${activity.where} e explique apenas os blocos usados na primeira pilha; o restante será descoberto pela turma.`,
    investigation: `Antes de abrir o MakeCode, os grupos desenham as pilhas em cartões, preveem o resultado de cada evento e identificam quais valores podem precisar de calibração.`,
    construction: `No MakeCode, crie as variáveis indicadas e monte cada pilha exatamente na ordem do guia técnico. Teste uma pilha antes de começar a próxima.`,
    test: `Execute pelo menos três casos: funcionamento normal, valor próximo do limite e uma entrada diferente da esperada. Compare previsão, simulador e placa.`,
    debug: `Se falhar, não apague tudo: confirme energia e versão da placa; depois evento, valor, condição e saída. Localize a primeira pilha cujo resultado não corresponde à previsão e mude uma coisa por vez.`,
    sharing: `Cada grupo demonstra o projeto, explica um bloco decisivo, apresenta um erro encontrado e propõe uma utilização em situação real.`,
    assessment: [`Explica a função das categorias ${activity.where} sem apenas ler seus nomes`, "Monta as pilhas na ordem, testa uma parte por vez e registra uma correção", `Relaciona ${activity.sourceTitle.toLowerCase()} a uma necessidade ou investigação do cotidiano`],
    continuity: next ? { label: `Próxima atividade adicional: ${next.title}`, href: `/planejar/${next.id}` } : { label: "Voltar ao caminho recomendado", href: "/aulas/caminho" },
    relatedContent: [{ label: `Pré-requisito: ${mainMakeCode} no MakeCode`, href: `/makecode/${mainMakeCode}` }, { label: "Pré-requisito: entrada, processamento e saída", href: "/aprender/entrada-processamento-e-saida" }, ...(external ? [{ label: "Pré-requisito: sensores e componentes", href: "/componentes" }, { label: "Pré-requisito: energia e circuito", href: "/robotica/energia-e-circuito" }] : [])], image: null,
    whyApply: `${distinction} A proposta favorece previsão, teste, interpretação de dados e comunicação do raciocínio, e não apenas a reprodução do programa.`,
    dailyLife: `Conecte o projeto a situações reais em que pessoas medem, escolhem, comunicam, controlam ou representam informações usando tecnologia.`,
    teacherPrerequisites: [{ label: "Entrada, processamento e saída", href: "/aprender/entrada-processamento-e-saida" }, { label: `Categoria ${mainMakeCode} do MakeCode`, href: `/makecode/${mainMakeCode}` }, ...(external ? [{ label: "Eletricidade e segurança", href: "/preparar/eletricidade-e-seguranca" }] : [])],
    studentPrerequisites: ["Conseguir seguir uma sequência curta de instruções", "Distinguir o que entra no sistema do que aparece como resultado", level === "iniciante" ? "Nenhuma experiência anterior com programação" : "Já ter montado ao menos um programa simples no MakeCode"],
    teacherTalk: [`“Antes de montar, o que vocês esperam que aconteça?”`, `“Qual bloco recebe a informação e qual bloco produz a resposta?”`, `“O que podemos testar sem desmontar tudo?”`],
  };
});

const technicalGuides = prepared.map((activity) => {
  const external = externalKeywords.test(activity.sourceTitle); const v2 = v2Keywords.test(`${activity.sourceTitle} ${activity.note}`);
  return {
    id: activity.id, title: activity.title, board: v2 ? "BBC micro:bit V2" : "BBC micro:bit V1 ou V2", extensions: [activity.extension, activity.hardware].filter(Boolean),
    before: ["Abra makecode.microbit.org e crie um Novo Projeto.", `Crie somente estas variáveis: ${cleanVariables(activity.variables)}.`, "Monte cada PILHA separadamente; o recuo indica encaixe interno.", external ? `Confira a ligação de ${componentFor(activity)} com a placa desligada.` : "Teste no simulador antes de transferir."],
    blocks: blocksFor(activity), code: typescriptFor(activity), codeNote: activity.extension ? "Instale primeiro a extensão indicada. Linhas específicas da extensão aparecem como comentários descritivos quando não há equivalência nativa segura." : "O TypeScript foi organizado a partir das mesmas pilhas. Compare a estrutura com os blocos antes de transferir.",
    wiring: wiringFor(activity),
    expected: [`O projeto realiza “${activity.sourceTitle}” conforme as pilhas e valores apresentados.`, activity.note || "Entradas diferentes produzem respostas observáveis que podem ser previstas e testadas.", "O professor consegue explicar qual foi a entrada, qual regra processou o dado e qual saída apareceu."],
    answers: [{ question: "Qual é a entrada deste sistema?", answer: "É o evento, sensor, botão, gesto ou dado indicado no início de cada pilha; ela fornece a informação ao programa." }, { question: "Por que a ordem dos blocos importa?", answer: "A placa executa as ações de cima para baixo dentro de cada evento; trocar a ordem altera o momento em que valores são definidos, testados e mostrados." }, { question: "Como saber se o erro é do código ou da montagem?", answer: "Teste primeiro no simulador e mostre valores intermediários. Se a lógica funciona ali, confira energia, GND, sinal, versão da placa e componente." }],
    diagnostics: [{ symptom: "Nada acontece", cause: "A pilha não começa por um evento, o evento não foi provocado ou o simulador está parado.", check: "Reinicie e provoque exatamente o botão, gesto, tempo ou sensor descrito no topo da pilha.", fix: "Encaixe os blocos no evento correto e teste somente essa pilha." }, { symptom: "A saída aparece, mas o valor está errado", cause: "Variável, limite, unidade ou mapeamento não foi calibrado.", check: "Mostre primeiro o valor bruto e compare com os valores da ficha.", fix: "Altere apenas o limite ou escala, faça três medições e registre." }, { symptom: "Funciona no simulador, mas não na placa", cause: external ? "Transferência, alimentação, GND, sinal ou componente incompatível." : "Arquivo antigo, cabo sem dados, placa sem energia ou recurso V2 em placa V1.", check: external ? "Com a placa desligada, siga cada ligação do micro:bit até o terminal do componente." : "Veja se MICROBIT aparece e se o LED traseiro pisca durante a cópia.", fix: external ? "Corrija uma conexão, use fonte/driver adequado e mantenha GND comum." : "Use cabo de dados, transfira o .hex mais recente e confirme a versão da placa." }, { symptom: "O programa trava ou responde devagar", cause: "Pausa longa, laço sem saída ou envio/rolagem excessiva.", check: "Procure pausas e laços na pilha que estava executando.", fix: "Reduza a pausa, garanta que a condição muda e mostre textos mais curtos." }],
    sourceNumber: activity.number, sourceTitle: activity.sourceTitle, sourceSection: activity.section, overlapWithExisting: activity.overlap,
  };
});

const outDir = path.join(root, "src/data/generated");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "additionalLessonPlans.json"), `${JSON.stringify(lessonPlans, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, "additionalTechnicalGuides.json"), `${JSON.stringify(technicalGuides, null, 2)}\n`);
fs.writeFileSync(path.join(outDir, "additionalActivityAudit.json"), `${JSON.stringify({ generated: prepared.length, overlaps: prepared.filter((item) => item.overlap).map((item) => ({ number: item.number, sourceTitle: item.sourceTitle, publishedTitle: item.title, matchedExisting: item.overlap })) }, null, 2)}\n`);
console.log(JSON.stringify({ generated: prepared.length, overlaps: prepared.filter((item) => item.overlap).length, families: technicalGuides.reduce((sum, guide) => sum + guide.blocks.length, 0) }));
