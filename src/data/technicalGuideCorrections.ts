import type {
  CategoriaMakeCode,
  GuiaTecnicoMicrobit,
  PassoDeBloco,
} from "./microbitTechnicalGuides";

type GeneratedGuide = GuiaTecnicoMicrobit & {
  sourceNumber?: number;
};

const code = (...lines: string[]) => lines.join("\n");

const CODE_OVERRIDES: Record<number, string> = {
  14: code(
    "let segundos = 10",
    "input.onButtonPressed(Button.A, function () {",
    "  basic.showIcon(IconNames.Target)",
    "  basic.pause(segundos * 1000)",
    "  basic.showIcon(IconNames.Yes)",
    "  music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  segundos += 5",
    "  basic.showNumber(segundos)",
    "})",
    "input.onButtonPressed(Button.AB, function () {",
    "  segundos = 10",
    "  basic.showNumber(segundos)",
    "})",
  ),
  17: code(
    "input.onGesture(Gesture.Shake, function () {",
    "  basic.showIcon(IconNames.Surprised)",
    "  soundExpression.giggle.playUntilDone()",
    "  basic.pause(500)",
    "  basic.clearScreen()",
    "})",
  ),
  18: code(
    "let armado = false",
    "music.setVolume(180)",
    "input.onButtonPressed(Button.A, function () {",
    "  basic.showNumber(3)",
    "  basic.pause(1000)",
    "  basic.showNumber(2)",
    "  basic.pause(1000)",
    "  basic.showNumber(1)",
    "  basic.pause(1000)",
    "  armado = true",
    "  basic.showIcon(IconNames.Yes)",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  armado = false",
    "  music.stopAllSounds()",
    "  basic.showIcon(IconNames.No)",
    "})",
    "basic.forever(function () {",
    "  if (armado && input.acceleration(Dimension.Strength) > 1250) {",
    "    basic.showIcon(IconNames.Angry)",
    "    music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.OnceInBackground)",
    "    basic.pause(3000)",
    "  }",
    "})",
  ),
  19: code(
    "input.onGesture(Gesture.FreeFall, function () {",
    "  basic.showIcon(IconNames.Surprised)",
    "  music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)",
    "  basic.showString(\"QUEDA\")",
    "})",
  ),
  20: code(
    "basic.forever(function () {",
    "  led.plotBarGraph(input.acceleration(Dimension.Strength), 2000)",
    "  basic.pause(50)",
    "})",
  ),
  23: code(
    "let jogador = game.createSprite(0, 0)",
    "let alvo = game.createSprite(4, 4)",
    "let parede1 = game.createSprite(1, 0)",
    "let parede2 = game.createSprite(1, 1)",
    "let parede3 = game.createSprite(3, 2)",
    "let parede4 = game.createSprite(3, 3)",
    "alvo.set(LedSpriteProperty.Brightness, 80)",
    "parede1.set(LedSpriteProperty.Brightness, 30)",
    "parede2.set(LedSpriteProperty.Brightness, 30)",
    "parede3.set(LedSpriteProperty.Brightness, 30)",
    "parede4.set(LedSpriteProperty.Brightness, 30)",
    "basic.forever(function () {",
    "  let dx = 0",
    "  let dy = 0",
    "  if (input.rotation(Rotation.Roll) > 20 && jogador.get(LedSpriteProperty.X) < 4) {",
    "    dx = 1",
    "  } else if (input.rotation(Rotation.Roll) < -20 && jogador.get(LedSpriteProperty.X) > 0) {",
    "    dx = -1",
    "  }",
    "  if (input.rotation(Rotation.Pitch) > 20 && jogador.get(LedSpriteProperty.Y) < 4) {",
    "    dy = 1",
    "  } else if (input.rotation(Rotation.Pitch) < -20 && jogador.get(LedSpriteProperty.Y) > 0) {",
    "    dy = -1",
    "  }",
    "  jogador.change(LedSpriteProperty.X, dx)",
    "  jogador.change(LedSpriteProperty.Y, dy)",
    "  if (jogador.isTouching(parede1) || jogador.isTouching(parede2) || jogador.isTouching(parede3) || jogador.isTouching(parede4)) {",
    "    jogador.change(LedSpriteProperty.X, 0 - dx)",
    "    jogador.change(LedSpriteProperty.Y, 0 - dy)",
    "  }",
    "  if (jogador.isTouching(alvo)) {",
    "    game.addScore(1)",
    "    game.gameOver()",
    "  }",
    "  basic.pause(250)",
    "})",
  ),
  25: code(
    "let referencia = 0",
    "let diferenca = 0",
    "let armado = false",
    "input.onButtonPressed(Button.A, function () {",
    "  referencia = input.rotation(Rotation.Pitch)",
    "  armado = true",
    "  basic.showIcon(IconNames.Yes)",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  armado = false",
    "  basic.showIcon(IconNames.No)",
    "})",
    "basic.forever(function () {",
    "  diferenca = Math.abs(input.rotation(Rotation.Pitch) - referencia)",
    "  if (armado && diferenca > 15) {",
    "    basic.showIcon(IconNames.Angry)",
    "    music.playTone(music.noteFrequency(Note.C), music.beat(BeatFraction.Quarter))",
    "  }",
    "  basic.pause(100)",
    "})",
  ),
  29: code(
    "let armado = false",
    "music.setVolume(200)",
    "input.onButtonPressed(Button.A, function () {",
    "  basic.showNumber(3)",
    "  basic.pause(1000)",
    "  basic.showNumber(2)",
    "  basic.pause(1000)",
    "  basic.showNumber(1)",
    "  basic.pause(1000)",
    "  armado = true",
    "  basic.showIcon(IconNames.Yes)",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  armado = false",
    "  music.stopAllSounds()",
    "  basic.showIcon(IconNames.No)",
    "})",
    "basic.forever(function () {",
    "  if (armado && input.acceleration(Dimension.Strength) > 1300) {",
    "    music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.OnceInBackground)",
    "    basic.showIcon(IconNames.Angry)",
    "    basic.pause(3000)",
    "  }",
    "})",
  ),
  31: code(
    "let inicio = 0",
    "let tempo = 0",
    "let pronto = false",
    "input.onButtonPressed(Button.B, function () {",
    "  pronto = false",
    "  basic.showIcon(IconNames.Target)",
    "  basic.pause(randint(2000, 5000))",
    "  basic.clearScreen()",
    "  basic.showIcon(IconNames.Square)",
    "  inicio = input.runningTime()",
    "  pronto = true",
    "})",
    "input.onButtonPressed(Button.A, function () {",
    "  if (pronto) {",
    "    tempo = input.runningTime() - inicio",
    "    pronto = false",
    "    basic.showNumber(tempo)",
    "  } else {",
    "    basic.showString(\"CEDO\")",
    "  }",
    "})",
  ),
  32: code(
    "let liberado = false",
    "let vencedor = 0",
    "input.onGesture(Gesture.Shake, function () {",
    "  liberado = false",
    "  vencedor = 0",
    "  basic.clearScreen()",
    "  basic.pause(randint(2000, 5000))",
    "  basic.showIcon(IconNames.Square)",
    "  liberado = true",
    "})",
    "input.onButtonPressed(Button.A, function () {",
    "  if (liberado && vencedor == 0) {",
    "    vencedor = 1",
    "    basic.showString(\"A\")",
    "  }",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  if (liberado && vencedor == 0) {",
    "    vencedor = 2",
    "    basic.showString(\"B\")",
    "  }",
    "})",
  ),
  34: code(
    "let corretas: number[] = [1, 0, 1, 1, 0]",
    "let questao = 0",
    "let pontos = 0",
    "function verificar(resposta: number) {",
    "  if (resposta == corretas[questao]) {",
    "    pontos += 1",
    "    basic.showIcon(IconNames.Yes)",
    "  } else {",
    "    basic.showIcon(IconNames.No)",
    "  }",
    "  questao += 1",
    "  if (questao == corretas.length) {",
    "    basic.showString(\"PONTOS\")",
    "    basic.showNumber(pontos)",
    "    questao = 0",
    "    pontos = 0",
    "  } else {",
    "    basic.showNumber(questao + 1)",
    "  }",
    "}",
    "basic.showNumber(questao + 1)",
    "input.onButtonPressed(Button.A, function () {",
    "  verificar(1)",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  verificar(0)",
    "})",
  ),
  41: code(
    "let rodando = false",
    "input.onButtonPressed(Button.A, function () {",
    "  rodando = true",
    "  basic.showIcon(IconNames.Heart)",
    "  music.startMelody(music.builtInMelody(Melodies.Dadadadum), MelodyOptions.ForeverInBackground)",
    "  basic.pause(randint(5000, 15000))",
    "  music.stopAllSounds()",
    "  music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)",
    "  basic.showIcon(IconNames.Skull)",
    "  rodando = false",
    "})",
  ),
  43: code(
    "let corretas: number[] = [0, 1, 1, 0, 1]",
    "let questao = 0",
    "let pontos = 0",
    "function responder(resposta: number) {",
    "  if (resposta == corretas[questao]) {",
    "    pontos += 1",
    "    basic.showIcon(IconNames.Yes)",
    "  } else {",
    "    basic.showIcon(IconNames.No)",
    "  }",
    "  questao += 1",
    "  if (questao < corretas.length) {",
    "    basic.showNumber(questao + 1)",
    "  } else {",
    "    basic.showString(\"PONTOS\")",
    "    basic.showNumber(pontos)",
    "    questao = 0",
    "    pontos = 0",
    "  }",
    "}",
    "basic.showNumber(1)",
    "input.onButtonPressed(Button.A, function () {",
    "  responder(0)",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  responder(1)",
    "})",
  ),
  48: code(
    "let numero = 0",
    "radio.setGroup(23)",
    "input.onButtonPressed(Button.A, function () {",
    "  numero = randint(1, 9)",
    "  radio.sendNumber(numero)",
    "  basic.showNumber(numero)",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  radio.sendString(\"OK\")",
    "})",
    "input.onButtonPressed(Button.AB, function () {",
    "  radio.sendString(\"REPITA\")",
    "})",
    "radio.onReceivedNumber(function (recebido) {",
    "  basic.showNumber(recebido)",
    "})",
    "radio.onReceivedString(function (recebido) {",
    "  basic.showString(recebido)",
    "})",
  ),
  49: code(
    "let codigo: number[] = [1, 0, 1, 1, 0]",
    "let entrada: number[] = []",
    "basic.showString(\"INSIRA\")",
    "input.onButtonPressed(Button.A, function () {",
    "  entrada.push(0)",
    "  basic.showString(\"A\")",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  entrada.push(1)",
    "  basic.showString(\"B\")",
    "})",
    "input.onGesture(Gesture.Shake, function () {",
    "  if (entrada.length == 5 && entrada[0] == codigo[0] && entrada[1] == codigo[1] && entrada[2] == codigo[2] && entrada[3] == codigo[3] && entrada[4] == codigo[4]) {",
    "    music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)",
    "    basic.showString(\"CHAVE 731\")",
    "  } else {",
    "    music.startMelody(music.builtInMelody(Melodies.Wawawawaa), MelodyOptions.Once)",
    "    basic.showString(\"TENTE\")",
    "  }",
    "  entrada = []",
    "})",
  ),
  50: code(
    "let modoBuscador = false",
    "let sinal = -128",
    "let nivel = 0",
    "radio.setGroup(50)",
    "radio.setTransmitPower(3)",
    "basic.forever(function () {",
    "  if (!modoBuscador) {",
    "    radio.sendNumber(0)",
    "    basic.pause(200)",
    "  } else {",
    "    basic.pause(50)",
    "  }",
    "})",
    "radio.onReceivedNumber(function () {",
    "  if (modoBuscador) {",
    "    sinal = radio.receivedPacket(RadioPacketProperty.SignalStrength)",
    "    nivel = Math.map(sinal, -128, -28, 0, 100)",
    "    led.plotBarGraph(nivel, 100)",
    "  }",
    "})",
  ),
  55: code(
    "let resultado = 0",
    "let face1 = 0",
    "let face2 = 0",
    "let face3 = 0",
    "let face4 = 0",
    "let face5 = 0",
    "let face6 = 0",
    "input.onButtonPressed(Button.A, function () {",
    "  face1 = 0",
    "  face2 = 0",
    "  face3 = 0",
    "  face4 = 0",
    "  face5 = 0",
    "  face6 = 0",
    "  for (let i = 0; i < 600; i++) {",
    "    resultado = randint(1, 6)",
    "    if (resultado == 1) face1 += 1",
    "    else if (resultado == 2) face2 += 1",
    "    else if (resultado == 3) face3 += 1",
    "    else if (resultado == 4) face4 += 1",
    "    else if (resultado == 5) face5 += 1",
    "    else face6 += 1",
    "  }",
    "  serial.writeValue(\"face1\", face1)",
    "  serial.writeValue(\"face2\", face2)",
    "  serial.writeValue(\"face3\", face3)",
    "  serial.writeValue(\"face4\", face4)",
    "  serial.writeValue(\"face5\", face5)",
    "  serial.writeValue(\"face6\", face6)",
    "  basic.showIcon(IconNames.Yes)",
    "})",
  ),
  56: code(
    "let valor = 0",
    "input.onButtonPressed(Button.A, function () {",
    "  if (valor < 25) valor += 1",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  if (valor > 0) valor += -1",
    "})",
    "basic.forever(function () {",
    "  led.plotBarGraph(valor, 25)",
    "})",
  ),
  61: code(
    "let x = 0",
    "let y = 0",
    "input.onButtonPressed(Button.A, function () {",
    "  x = randint(0, 4)",
    "  y = randint(0, 4)",
    "  basic.showString(\"X\")",
    "  basic.showNumber(x)",
    "  basic.showString(\"Y\")",
    "  basic.showNumber(y)",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  basic.clearScreen()",
    "  led.plot(x, y)",
    "})",
  ),
  62: code(
    "let x = 0",
    "let y = 0",
    "led.plot(x, y)",
    "input.onButtonPressed(Button.A, function () {",
    "  led.unplot(x, y)",
    "  x = (x + 1) % 5",
    "  led.plot(x, y)",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  led.unplot(x, y)",
    "  y = (y + 1) % 5",
    "  led.plot(x, y)",
    "})",
    "input.onButtonPressed(Button.AB, function () {",
    "  basic.showString(\"X\")",
    "  basic.showNumber(x)",
    "  basic.showString(\"Y\")",
    "  basic.showNumber(y)",
    "  led.plot(x, y)",
    "})",
  ),
  67: code(
    "loops.everyInterval(60000, function () {",
    "  serial.writeValue(\"temperatura\", input.temperature())",
    "})",
  ),
  68: code(
    "basic.forever(function () {",
    "  if (input.temperature() > 28) {",
    "    basic.showLeds(\x60",
    "      # . # . #",
    "      . # # # .",
    "      # # # # #",
    "      . # # # .",
    "      # . # . #",
    "    \x60)",
    "    music.playTone(music.noteFrequency(Note.C5), music.beat(BeatFraction.Quarter))",
    "  } else {",
    "    basic.showIcon(IconNames.Happy)",
    "  }",
    "  basic.pause(2000)",
    "})",
  ),
  70: code(
    "basic.forever(function () {",
    "  led.plotBarGraph(input.lightLevel(), 255)",
    "  basic.pause(100)",
    "})",
  ),
  72: code(
    "let amostra = 0",
    "loops.everyInterval(60000, function () {",
    "  amostra += 1",
    "  serial.writeValue(\"amostra\", amostra)",
    "  serial.writeValue(\"temperatura\", input.temperature())",
    "})",
  ),
  73: code(
    "BME280.Address(BME280_I2C_ADDRESS.ADDR_0x76)",
    "BME280.PowerOn()",
    "input.onButtonPressed(Button.A, function () {",
    "  basic.showString(\"TEMP\")",
    "  basic.showNumber(BME280.temperature())",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  basic.showString(\"UMID\")",
    "  basic.showNumber(BME280.humidity())",
    "})",
    "input.onButtonPressed(Button.AB, function () {",
    "  basic.showString(\"PRESS\")",
    "  basic.showNumber(Math.round(BME280.pressure() / 100))",
    "})",
  ),
  77: code(
    "let nivel = 0",
    "basic.forever(function () {",
    "  nivel = pins.analogReadPin(AnalogPin.P0)",
    "  if (nivel < 300) {",
    "    basic.showIcon(IconNames.Happy)",
    "  } else if (nivel < 650) {",
    "    basic.showIcon(IconNames.Confused)",
    "    music.playTone(music.noteFrequency(Note.G), music.beat(BeatFraction.Quarter))",
    "  } else {",
    "    basic.showIcon(IconNames.Angry)",
    "    music.playTone(music.noteFrequency(Note.C5), music.beat(BeatFraction.Quarter))",
    "  }",
    "  basic.pause(500)",
    "})",
  ),
  78: code(
    "let leitura = 0",
    "let indice = 0",
    "basic.forever(function () {",
    "  leitura = pins.analogReadPin(AnalogPin.P0)",
    "  indice = Math.map(leitura, 0, 1023, 0, 100)",
    "  led.plotBarGraph(indice, 100)",
    "  basic.pause(500)",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  basic.showNumber(indice)",
    "})",
  ),
  79: code(
    "basic.forever(function () {",
    "  led.plotBarGraph(input.soundLevel(), 255)",
    "  basic.pause(100)",
    "})",
  ),
  81: code(
    "let amostra = 0",
    "loops.everyInterval(60000, function () {",
    "  amostra += 1",
    "  serial.writeValue(\"amostra\", amostra)",
    "  serial.writeValue(\"temperatura\", input.temperature())",
    "})",
  ),
  82: code(
    "let amostra = 0",
    "BME280.Address(BME280_I2C_ADDRESS.ADDR_0x76)",
    "BME280.PowerOn()",
    "loops.everyInterval(300000, function () {",
    "  amostra += 1",
    "  serial.writeValue(\"amostra\", amostra)",
    "  serial.writeValue(\"temperatura\", BME280.temperature())",
    "  serial.writeValue(\"umidade\", BME280.humidity())",
    "})",
  ),
  84: code(
    "let estado = 0",
    "pins.setPull(DigitalPin.P0, PinPullMode.PullUp)",
    "basic.forever(function () {",
    "  estado = pins.digitalReadPin(DigitalPin.P0)",
    "  if (estado == 0) {",
    "    basic.showIcon(IconNames.Yes)",
    "  } else {",
    "    basic.showIcon(IconNames.No)",
    "    basic.showString(\"ABERTA\")",
    "  }",
    "  basic.pause(500)",
    "})",
  ),
  85: code(
    "let amostra = 0",
    "input.onButtonPressed(Button.A, function () {",
    "  amostra += 1",
    "  serial.writeValue(\"amostra\", amostra)",
    "  serial.writeValue(\"luz\", input.lightLevel())",
    "  basic.showNumber(input.lightLevel())",
    "})",
  ),
  86: code(
    "music.setVolume(160)",
    "input.onButtonPressed(Button.A, function () {",
    "  music.playTone(music.noteFrequency(Note.C), music.beat(BeatFraction.Whole))",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  music.playTone(music.noteFrequency(Note.E), music.beat(BeatFraction.Whole))",
    "})",
    "input.onLogoEvent(TouchButtonEvent.Touched, function () {",
    "  music.playTone(music.noteFrequency(Note.G), music.beat(BeatFraction.Whole))",
    "})",
  ),
  87: code(
    "music.setVolume(160)",
    "music.setTempo(120)",
    "input.onButtonPressed(Button.A, function () {",
    "  for (let i = 0; i < 2; i++) {",
    "    music.playTone(music.noteFrequency(Note.C), music.beat(BeatFraction.Whole))",
    "    music.playTone(music.noteFrequency(Note.E), music.beat(BeatFraction.Whole))",
    "    music.playTone(music.noteFrequency(Note.G), music.beat(BeatFraction.Double))",
    "    music.rest(music.beat(BeatFraction.Half))",
    "  }",
    "  music.playTone(music.noteFrequency(Note.G), music.beat(BeatFraction.Whole))",
    "  music.playTone(music.noteFrequency(Note.E), music.beat(BeatFraction.Whole))",
    "  music.playTone(music.noteFrequency(Note.C), music.beat(BeatFraction.Double))",
    "})",
  ),
  88: code(
    "music.setVolume(170)",
    "input.onButtonPressed(Button.A, function () {",
    "  basic.showNumber(1)",
    "  music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.Once)",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  basic.showNumber(2)",
    "  music.startMelody(music.builtInMelody(Melodies.Ode), MelodyOptions.Once)",
    "})",
    "input.onButtonPressed(Button.AB, function () {",
    "  basic.showNumber(3)",
    "  music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once)",
    "})",
  ),
  89: code(
    "let bpm = 60",
    "let intervalo = 1000",
    "let ativo = false",
    "music.setVolume(120)",
    "input.onButtonPressed(Button.A, function () {",
    "  bpm += 10",
    "  if (bpm > 200) bpm = 40",
    "  basic.showNumber(bpm)",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  ativo = !ativo",
    "  if (ativo) {",
    "    basic.showIcon(IconNames.Yes)",
    "  } else {",
    "    basic.showIcon(IconNames.No)",
    "  }",
    "})",
    "basic.forever(function () {",
    "  if (ativo) {",
    "    intervalo = 60000 / bpm",
    "    music.playTone(music.noteFrequency(Note.C5), music.beat(BeatFraction.Sixteenth))",
    "    basic.pause(intervalo)",
    "  } else {",
    "    basic.pause(100)",
    "  }",
    "})",
  ),
  90: code(
    "music.setVolume(180)",
    "input.onGesture(Gesture.Shake, function () {",
    "  music.playTone(music.noteFrequency(Note.C3), music.beat(BeatFraction.Quarter))",
    "})",
    "input.onGesture(Gesture.TiltLeft, function () {",
    "  music.playTone(music.noteFrequency(Note.C), music.beat(BeatFraction.Quarter))",
    "})",
    "input.onGesture(Gesture.TiltRight, function () {",
    "  music.playTone(music.noteFrequency(Note.G), music.beat(BeatFraction.Quarter))",
    "})",
    "input.onGesture(Gesture.ScreenUp, function () {",
    "  soundExpression.twinkle.playUntilDone()",
    "})",
  ),
  91: code(
    "music.setVolume(170)",
    "input.onPinPressed(TouchPin.P0, function () {",
    "  music.playTone(music.noteFrequency(Note.C), music.beat(BeatFraction.Whole))",
    "})",
    "input.onPinPressed(TouchPin.P1, function () {",
    "  music.playTone(music.noteFrequency(Note.E), music.beat(BeatFraction.Whole))",
    "})",
    "input.onPinPressed(TouchPin.P2, function () {",
    "  music.playTone(music.noteFrequency(Note.G), music.beat(BeatFraction.Whole))",
    "})",
  ),
  96: code(
    "let fita = neopixel.create(DigitalPin.P0, 10, NeoPixelMode.RGB)",
    "let modo = 1",
    "fita.setBrightness(80)",
    "fita.showColor(NeoPixelColors.Red)",
    "fita.show()",
    "input.onButtonPressed(Button.A, function () {",
    "  modo += 1",
    "  if (modo > 3) modo = 1",
    "  if (modo == 1) {",
    "    fita.showColor(NeoPixelColors.Red)",
    "  } else if (modo == 2) {",
    "    fita.showColor(NeoPixelColors.Blue)",
    "  } else {",
    "    fita.showRainbow(1, 360)",
    "  }",
    "  fita.show()",
    "})",
    "input.onGesture(Gesture.Shake, function () {",
    "  for (let i = 0; i < 10; i++) {",
    "    fita.rotate(1)",
    "    fita.show()",
    "    basic.pause(100)",
    "  }",
    "})",
  ),
  97: code(
    "input.onPinPressed(TouchPin.P0, function () {",
    "  basic.showString(\"AGUA\")",
    "  music.playTone(music.noteFrequency(Note.C), music.beat(BeatFraction.Half))",
    "})",
    "input.onPinPressed(TouchPin.P1, function () {",
    "  basic.showString(\"SOL\")",
    "  soundExpression.twinkle.playUntilDone()",
    "})",
    "input.onPinPressed(TouchPin.P2, function () {",
    "  basic.showString(\"VENTO\")",
    "  music.playTone(music.noteFrequency(Note.G3), music.beat(BeatFraction.Whole))",
    "})",
  ),
  100: code(
    "motionbit.brakeMotor(MotionBitMotorChannel.M1)",
    "motionbit.brakeMotor(MotionBitMotorChannel.M2)",
    "input.onButtonPressed(Button.A, function () {",
    "  for (let i = 0; i < 4; i++) {",
    "    motionbit.runMotor(MotionBitMotorChannel.M1, MotionBitMotorDirection.Forward, 130)",
    "    motionbit.runMotor(MotionBitMotorChannel.M2, MotionBitMotorDirection.Forward, 130)",
    "    basic.pause(1200)",
    "    motionbit.brakeMotor(MotionBitMotorChannel.M1)",
    "    motionbit.brakeMotor(MotionBitMotorChannel.M2)",
    "    basic.pause(200)",
    "    motionbit.runMotor(MotionBitMotorChannel.M1, MotionBitMotorDirection.Forward, 130)",
    "    motionbit.runMotor(MotionBitMotorChannel.M2, MotionBitMotorDirection.Backward, 130)",
    "    basic.pause(450)",
    "    motionbit.brakeMotor(MotionBitMotorChannel.M1)",
    "    motionbit.brakeMotor(MotionBitMotorChannel.M2)",
    "    basic.pause(200)",
    "  }",
    "})",
    "input.onButtonPressed(Button.B, function () {",
    "  motionbit.brakeMotor(MotionBitMotorChannel.M1)",
    "  motionbit.brakeMotor(MotionBitMotorChannel.M2)",
    "})",
  ),
};

const BLOCK_OVERRIDES: Record<number, Array<[CategoriaMakeCode, string, string, number?]>> = {
  48: [
    ["Básico", "no iniciar", "inicie a primeira pilha", 0],
    ["Rádio", "rádio definir grupo 23", "encaixe dentro de “no iniciar”", 1],
    ["Entrada", "no botão A pressionado", "inicie uma segunda pilha", 0],
    ["Variáveis", "definir numero para 0", "encaixe dentro do evento A", 1],
    ["Matemática", "escolher aleatório de 1 até 9", "encaixe no valor 0 do bloco “definir numero”", 2],
    ["Rádio", "rádio enviar número numero", "encaixe abaixo de “definir numero”", 1],
    ["Básico", "mostrar número numero", "encaixe abaixo do envio", 1],
    ["Entrada", "no botão B pressionado", "inicie uma terceira pilha", 0],
    ["Rádio", "rádio enviar texto “OK”", "encaixe dentro do evento B", 1],
    ["Entrada", "no botão A+B pressionado", "inicie uma quarta pilha", 0],
    ["Rádio", "rádio enviar texto “REPITA”", "encaixe dentro do evento A+B", 1],
    ["Rádio", "ao rádio receber número recebido", "inicie uma quinta pilha", 0],
    ["Básico", "mostrar número recebido", "encaixe dentro do evento de número recebido", 1],
    ["Rádio", "ao rádio receber texto recebido", "inicie uma sexta pilha", 0],
    ["Básico", "mostrar texto recebido", "encaixe dentro do evento de texto recebido", 1],
  ],
  50: [
    ["Variáveis", "criar variável modoBuscador", "crie antes de montar as pilhas", 0],
    ["Variáveis", "criar variável sinal", "crie antes de montar as pilhas", 0],
    ["Variáveis", "criar variável nivel", "crie antes de montar as pilhas", 0],
    ["Básico", "no iniciar", "inicie a primeira pilha", 0],
    ["Variáveis", "definir modoBuscador para falso", "encaixe dentro de “no iniciar”; na placa buscadora troque falso por verdadeiro", 1],
    ["Rádio", "rádio definir grupo 50", "encaixe abaixo de modoBuscador", 1],
    ["Rádio", "rádio definir potência de transmissão 3", "encaixe abaixo do grupo", 1],
    ["Básico", "para sempre", "inicie uma segunda pilha", 0],
    ["Lógica", "se não modoBuscador então / senão", "encaixe dentro de “para sempre”", 1],
    ["Rádio", "rádio enviar número 0", "encaixe dentro do primeiro ramo", 2],
    ["Básico", "pausa 200 ms", "encaixe abaixo do envio", 2],
    ["Básico", "pausa 50 ms", "encaixe dentro do ramo senão", 2],
    ["Rádio", "ao rádio receber número recebido", "inicie uma terceira pilha", 0],
    ["Lógica", "se modoBuscador então", "encaixe dentro do evento de rádio", 1],
    ["Variáveis", "definir sinal para força do sinal do pacote recebido", "encaixe dentro da condição", 2],
    ["Variáveis", "definir nivel para 0", "encaixe abaixo de sinal", 2],
    ["Matemática", "mapear sinal de -128 até -28 para 0 até 100", "encaixe no valor 0 de “definir nivel”", 3],
    ["Básico", "plotar gráfico de barras de nivel até 100", "encaixe abaixo de “definir nivel”", 2],
  ],
  68: [
    ["Básico", "para sempre", "inicie a pilha principal", 0],
    ["Lógica", "se temperatura (°C) > 28 então / senão", "encaixe dentro de “para sempre”", 1],
    ["Básico", "mostrar LEDs no desenho de sol", "encaixe dentro do primeiro ramo", 2],
    ["Música", "tocar tom Dó Agudo por 1/4 de batida", "encaixe abaixo do desenho de sol", 2],
    ["Básico", "mostrar ícone feliz", "encaixe dentro do ramo senão", 2],
    ["Básico", "pausa 2000 ms", "encaixe depois da condição", 1],
  ],
};

function categoryFor(block: string, current: CategoriaMakeCode): CategoriaMakeCode {
  const value = block.toLocaleLowerCase("pt-BR");
  if (/^mostrar |^pausa |^limpar tela|^para sempre|^no iniciar|acender led|apagar led|plotar gráfico/.test(value)) return "Básico";
  if (/bme280|neopixel|motion:bit/.test(value)) return "Extensões";
  if (current === "Pinos" && /leitura (?:analógica|digital)|força de atração do pino|escrita digital/.test(value)) return "Pinos";
  if (/^rádio |^ao rádio|pacote recebido|força do sinal/.test(value)) return "Rádio";
  if (/tocar (?:tom|melodia|efeito)|iniciar melodia|parar todos os sons|definir (?:volume|andamento)/.test(value)) return "Música";
  if (/serial escrever/.test(value)) return "Serial";
  if (/^função |^chamar /.test(value)) return "Funções";
  if (/matriz |adicionar valor|comprimento de|obter valor no índice/.test(value)) return "Matrizes";
  if (/jogo |sprite/.test(value)) return "Jogo";
  if (/^repetir |^para cada /.test(value)) return "Ciclos";
  if (/^definir |^alterar /.test(value)) return "Variáveis";
  if (/^se |^senão|^enquanto |verdadeiro|falso| não /.test(" " + value + " ")) return "Lógica";
  if (/^no botão|^em agitar|^em gesto|^no pino|^no logotipo|temperatura|nível de luz|nível de som|aceleração|rotação|bússola/.test(value)) return "Entrada";
  if (/leitura (?:analógica|digital)|escrita digital|força de atração do pino/.test(value)) return "Pinos";
  if (/escolher aleatório|mapear|arredondar|valor absoluto|resto|%/.test(value)) return "Matemática";
  return current;
}

function normalizeBlocks(blocks: PassoDeBloco[], sourceNumber?: number): PassoDeBloco[] {
  const overridden = sourceNumber && BLOCK_OVERRIDES[sourceNumber]
    ? BLOCK_OVERRIDES[sourceNumber].map(([category, block, place, indent], index) => ({
        order: index + 1,
        category,
        block,
        place,
        indent,
      }))
    : blocks;
  return overridden
    .filter((item) => !/(?:PROGRAMA|PLACA) .+ PILHA/i.test(item.block))
    .map((item) => ({
      ...item,
      category: categoryFor(item.block, item.category),
    }))
    .map((item, index) => ({ ...item, order: index + 1 }));
}

const ICON_NAMES: Record<string, string> = {
  "ALVO": "Target",
  "BRAVO": "Angry",
  "CAVEIRA": "Skull",
  "CONFUSO": "Confused",
  "CORAÇÃO": "Heart",
  "DIAMANTE": "Diamond",
  "DIAMANTE PEQUENO": "SmallDiamond",
  "FELIZ": "Happy",
  "NÃO": "No",
  "QUADRADO": "Square",
  "QUADRADO PEQUENO": "SmallSquare",
  "SIM": "Yes",
  "SURPRESA": "Surprised",
  "TRISTE": "Sad",
};

/** Mantém a imagem selecionada nos blocos igual à chamada TypeScript correspondente. */
function alignIconsWithBlocks(source: string, blocks: PassoDeBloco[]) {
  const iconNames = blocks.flatMap((item) => {
    if (item.block.includes("/")) return [];
    const match = item.block.match(/^mostrar ícone\s+(.+)$/i);
    if (!match) return [];
    const apiName = ICON_NAMES[match[1].trim().toLocaleUpperCase("pt-BR")];
    return apiName ? [apiName] : [];
  });
  const calls = [...source.matchAll(/IconNames\.([A-Za-z]+)/g)];
  if (!iconNames.length || calls.length !== iconNames.length) return source;
  let index = 0;
  return source.replace(/IconNames\.[A-Za-z]+/g, () => `IconNames.${iconNames[index++]}`);
}

function declaredVariables(source: string) {
  return [...new Set(
    [...source.matchAll(/\blet\s+([A-Za-z_$][\w$]*)/g)]
      .map((match) => match[1])
      .filter((name) => name !== "i"),
  )];
}

function joinNatural(items: string[]) {
  if (items.length < 2) return items[0] ?? "";
  return items.slice(0, -1).join(", ") + " e " + items.at(-1);
}

function inputSummary(blocks: PassoDeBloco[]) {
  const value = blocks.map((item) => item.block).join(" · ");
  const inputs: string[] = [];
  if (/no botão A|no botão B/i.test(value)) inputs.push("os botões A, B ou A+B");
  if (/agitar|gesto|aceleração|rotação/i.test(value)) inputs.push("o acelerômetro e os gestos da placa");
  if (/temperatura/i.test(value)) inputs.push("a leitura de temperatura");
  if (/nível de luz/i.test(value)) inputs.push("a leitura de luminosidade da matriz");
  if (/nível de som/i.test(value)) inputs.push("o nível de som captado pelo microfone");
  if (/bússola/i.test(value)) inputs.push("a direção medida pela bússola");
  if (/no pino|leitura analógica|leitura digital/i.test(value)) inputs.push("o sinal recebido pelos pinos");
  if (/logotipo/i.test(value)) inputs.push("o toque no logotipo");
  if (/ao rádio receber/i.test(value)) inputs.push("a mensagem recebida por rádio");
  if (/a cada \d+ ms|para sempre/i.test(value)) inputs.push("a passagem do tempo que repete a leitura");
  return inputs.length ? joinNatural(inputs) : "o início do programa";
}

function processingSummary(blocks: PassoDeBloco[]) {
  const value = blocks.map((item) => item.block).join(" · ");
  const actions: string[] = [];
  if (/escolher aleatório/i.test(value)) actions.push("sorteia um valor dentro do intervalo definido");
  if (/se .+ então/i.test(value)) actions.push("compara os valores nas condições");
  if (/definir |alterar /i.test(value)) actions.push("guarda e atualiza os valores nas variáveis");
  if (/repetir |para sempre|a cada \d+ ms/i.test(value)) actions.push("repete as ações no momento indicado");
  if (/mapear|arredondar|valor absoluto|%/i.test(value)) actions.push("calcula ou ajusta a escala numérica");
  if (/rádio enviar|ao rádio receber/i.test(value)) actions.push("organiza a comunicação no grupo de rádio");
  return actions.length ? joinNatural(actions) : "executa as ações na ordem vertical das pilhas";
}

function outputSummary(blocks: PassoDeBloco[]) {
  const value = blocks.map((item) => item.block).join(" · ");
  const outputs: string[] = [];
  if (/mostrar (?:ícone|texto|número|leds|seta)|acender led|plotar gráfico/i.test(value)) outputs.push("mostra a resposta na matriz de LEDs");
  if (/tocar |melodia|som/i.test(value)) outputs.push("produz a resposta sonora programada");
  if (/rádio enviar/i.test(value)) outputs.push("transmite a mensagem por rádio");
  if (/serial escrever/i.test(value)) outputs.push("envia os dados ao console do computador");
  if (/escrita digital|servo|motor|neopixel|fita mostrar/i.test(value)) outputs.push("aciona o componente externo");
  return outputs.length ? joinNatural(outputs) : "produz a saída descrita no objetivo da aula";
}

function specificDiagnostics(
  guide: GeneratedGuide,
  inputs: string,
  outputs: string,
) {
  const blockText = guide.blocks.map((item) => item.block).join(" ");
  const diagnostics: GuiaTecnicoMicrobit["diagnostics"] = [
    {
      symptom: "Ao usar " + inputs + ", nada acontece",
      cause: "O bloco de resposta ficou fora do evento, o evento testado não é o mesmo do programa ou a pilha não foi executada.",
      check: "Identifique o primeiro bloco sem recuo da pilha e provoque exatamente esse botão, gesto, leitura ou intervalo.",
      fix: "Encaixe a ação dentro do evento correto, reinicie o simulador e teste somente essa pilha.",
    },
    {
      symptom: "A placa executa, mas não " + outputs,
      cause: "Uma variável, condição, valor máximo ou bloco de saída está diferente da receita.",
      check: "Compare de cima para baixo a primeira pilha que deveria " + outputs + "; confirme valores e recuos.",
      fix: "Corrija apenas a primeira diferença, reinicie e repita o mesmo caso de teste.",
    },
  ];

  if (/rádio/i.test(blockText)) {
    diagnostics.push({
      symptom: "Uma placa funciona, mas a outra não recebe a mensagem",
      cause: "As placas estão em grupos diferentes, somente uma recebeu o programa ou o teste está sendo feito com uma única placa.",
      check: "Confirme duas placas ligadas, o mesmo número em “rádio definir grupo” e o ícone/valor local antes do envio.",
      fix: "Transfira o programa correto para as duas placas, iguale o grupo e teste primeiro a menos de um metro.",
    });
  }
  if (/serial escrever/i.test(blockText)) {
    diagnostics.push({
      symptom: "Os dados não aparecem no console do MakeCode",
      cause: "A placa não está pareada por USB/WebUSB, o cabo só carrega ou o intervalo ainda não terminou.",
      check: "Mantenha o cabo conectado, clique em “Mostrar console do dispositivo” e use temporariamente um intervalo de 5 segundos.",
      fix: "Troque por cabo USB de dados, conecte/pareie a placa e restaure o intervalo real depois do teste.",
    });
  }
  if (/nível de som|soundExpression|tocar |melodia/i.test(blockText + " " + guide.code)) {
    const v2Only = /\bV2\b/.test(guide.board) && !/\bV1\b/.test(guide.board);
    diagnostics.push({
      symptom: "A imagem aparece, mas não há som",
      cause: v2Only
        ? "A placa não é V2, o volume está baixo ou o simulador/navegador bloqueou o áudio."
        : "Na V1 falta uma saída de áudio em P0/GND; na V2 o volume pode estar baixo.",
      check: "Confirme a versão da placa, aumente o volume e teste um único tom.",
      fix: v2Only
        ? "Use micro:bit V2, ajuste o volume e permita áudio no navegador."
        : "Na V2 use o alto-falante interno; na V1 conecte piezo/alto-falante compatível conforme o kit técnico.",
    });
  }
  if (/leitura analógica|nível de luz|temperatura|nível de som|bme280|qualidade|umidade/i.test(blockText + " " + guide.wiring.component)) {
    diagnostics.push({
      symptom: "A leitura fica parada, invertida ou muda muito sem motivo",
      cause: "O sensor não foi calibrado no ambiente real, o sinal está no pino errado ou o limite foi copiado de outro local.",
      check: "Mostre o valor bruto e registre três leituras em duas condições conhecidas antes de testar a condição.",
      fix: "Corrija sinal/GND quando externo e escolha o limite entre as médias observadas; não trate o valor de exemplo como universal.",
    });
  }
  diagnostics.push({
    symptom: "O programa responde uma vez, atrasa ou parece travado",
    cause: "Há uma pausa longa, texto rolando, melodia até terminar ou laço executando antes de aceitar a próxima entrada.",
    check: "Observe qual bloco permanece ativo imediatamente antes da demora e compare sua duração com a receita.",
    fix: "Aguarde a ação terminar no teste inicial; se a aula permitir, reduza somente a pausa de teste e restaure o valor antes da aplicação.",
  });
  if (guide.wiring.kind === "externo") {
    diagnostics.push({
      symptom: guide.wiring.component + " não responde fisicamente",
      cause: "Falta alimentação, GND comum, sinal no pino indicado, extensão correta ou compatibilidade com 3,3 V.",
      check: "Desligue tudo e confira cada linha do esquema do micro:bit até o terminal correspondente do componente.",
      fix: "Corrija uma ligação por vez, instale somente a extensão indicada e use fonte/driver externo quando o esquema exigir.",
    });
  } else {
    diagnostics.push({
      symptom: "Funciona no simulador, mas não na placa",
      cause: "O arquivo novo não foi transferido, o cabo só carrega, a placa está sem energia ou a versão não possui o recurso.",
      check: "Confirme a unidade MICROBIT, o piscar do LED traseiro durante a cópia e a versão indicada no guia.",
      fix: "Use cabo USB de dados, copie novamente o .hex mais recente e teste com a versão de placa exigida.",
    });
  }

  return diagnostics;
}

export function correctAdditionalTechnicalGuide(raw: GuiaTecnicoMicrobit): GuiaTecnicoMicrobit {
  const guide = raw as GeneratedGuide;
  const sourceNumber = guide.sourceNumber;
  const blocks = normalizeBlocks(guide.blocks, sourceNumber);
  const originalCode = sourceNumber ? CODE_OVERRIDES[sourceNumber] ?? guide.code : guide.code;
  const correctedCode = alignIconsWithBlocks(originalCode, blocks);
  const extensions = guide.extensions.map((item) => item.replaceAll("`", "").replace(/\.$/, "").trim());
  const variables = declaredVariables(correctedCode);
  const inputs = inputSummary(blocks);
  const processing = processingSummary(blocks);
  const outputs = outputSummary(blocks);
  const generatedByCreateAI = extensions.some((item) => /CreateAI/i.test(item));
  const requiresV2 = generatedByCreateAI || /input\.soundLevel|input\.onLogoEvent|soundExpression\./.test(correctedCode);
  const board = requiresV2 ? "BBC micro:bit V2" : guide.board.replace(/^BBC micro:bit V2$/, "BBC micro:bit V1 ou V2");
  const before = guide.before
    .filter((item) => !/^Crie somente estas variáveis:/i.test(item))
    .filter((item) => !/^Confirme que a placa é/i.test(item));
  before.splice(1, 0, variables.length
    ? "Crie somente estas variáveis antes de montar: " + variables.join(", ") + "."
    : "Esta atividade não exige variável criada pelo usuário.");
  if (requiresV2) before.splice(1, 0, "Confirme que a placa é micro:bit V2; este programa usa um recurso que não existe na V1.");
  if (/\bradio\./.test(correctedCode)) before.splice(1, 0, "Separe duas placas para o teste físico e transfira o programa para ambas.");
  if (sourceNumber === 50) before.splice(2, 0, "Use o mesmo código nas duas placas: deixe modoBuscador como falso na placa escondida e troque para verdadeiro na placa buscadora.");

  return {
    ...guide,
    board,
    extensions,
    before,
    blocks,
    code: correctedCode,
    codeNote: generatedByCreateAI
      ? guide.codeNote
      : extensions.length
      ? "Código completo. Antes de colar, instale no MakeCode: " + extensions.join(", ") + ". Depois volte para JavaScript, cole o código e confira se ele retorna aos blocos sem blocos cinza."
      : "Código completo e executável no JavaScript do MakeCode. Depois de colar, volte para Blocos e confirme a mesma ordem visual.",
    expected: [
      "Quando a entrada é " + inputs + ", o programa " + processing + "; ao final, a placa " + outputs + ".",
      ...guide.expected.slice(1).filter((item) => !/Entradas diferentes produzem|professor consegue explicar/i.test(item)),
      "O teste está correto quando a placa " + outputs + " em todos os casos previstos, inclusive no caso-limite indicado na aula.",
    ],
    answers: [
      { question: "Qual é a entrada usada neste programa?", answer: "A entrada é " + inputs + ". Ela inicia a pilha ou fornece o valor que será analisado." },
      { question: "O que o programa faz com essa informação?", answer: "O processamento " + processing + ". A ordem vertical e o recuo mostram quando cada ação acontece." },
      { question: "Qual saída deve ser observada?", answer: "A saída esperada: a placa " + outputs + ". O aluno deve relacioná-la à entrada que acabou de provocar." },
      { question: "Como provar que o projeto está correto?", answer: "Repita os casos normal, limite e alternativo descritos na aula e confirme que, em todos eles, a placa " + outputs + "." },
    ],
    diagnostics: specificDiagnostics({ ...guide, board, blocks, code: correctedCode }, inputs, outputs),
  };
}
