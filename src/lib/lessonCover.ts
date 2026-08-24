import { LESSON_PLANS, type LessonPlan } from "@/data/lessonPlans";

export type LessonCover = { src: string; alt: string };

const COVERS = {
  sandwich: { src: "/assets/antes-do-robo/atividade-algoritmo-sanduiche.png", alt: "Pessoa demonstrando os passos para preparar um sanduíche" },
  ambiguous: { src: "/imagens/praticar/instrucoes-ambiguas.jpg", alt: "Dupla comparando instruções para realizar uma atividade" },
  drawing: { src: "/imagens/praticar/desenho-por-comandos.jpg", alt: "Atividade de desenho executada a partir de comandos" },
  repetition: { src: "/imagens/praticar/sequencias-repetidas.jpg", alt: "Sequência de comandos repetidos organizada visualmente" },
  claps: { src: "/imagens/praticar/comandos-com-palmas.jpg", alt: "Turma explorando comandos por meio de palmas e movimentos" },
  debugging: { src: "/imagens/praticar/encontre-o-erro.jpg", alt: "Atividade de investigação e correção de erros" },
  teacherRobot: { src: "/imagens/praticar/programe-o-professor.jpg", alt: "Professor sendo guiado por uma sequência de comandos" },
  humanRobot: { src: "/imagens/praticar/robo-humano.jpg", alt: "Dinâmica de robô humano seguindo instruções" },
  movement: { src: "/imagens/praticar/sequencia-de-movimentos.jpg", alt: "Sequência corporal utilizada para representar um algoritmo" },
  treasure: { src: "/imagens/praticar/caca-ao-tesouro.jpg", alt: "Desafio de percurso e caça ao tesouro" },
  board: { src: "/assets/antes-do-robo/atividade-primeiros-comandos-tabuleiro.png", alt: "Robô e comandos em um tabuleiro de programação" },
  boardDebug: { src: "/imagens/praticar/corrija-o-caminho.jpg", alt: "Percurso no tabuleiro sendo testado e corrigido" },
  boardRepeat: { src: "/imagens/praticar/economize-comandos.jpg", alt: "Percurso no tabuleiro resolvido com comandos de repetição" },
  microbit: { src: "/assets/antes-do-robo/atividade-microbit-coracao-led.png", alt: "BBC micro:bit exibindo uma imagem em sua matriz de LEDs" },
  sensors: { src: "/assets/antes-do-robo/trilha-05-sensores-mundo-fisico.png", alt: "micro:bit utilizando sensores para observar o mundo físico" },
  data: { src: "/assets/antes-do-robo/trilha-04-dados-decisoes.png", alt: "Dados coletados pelo micro:bit sendo analisados para tomar decisões" },
  games: { src: "/assets/antes-do-robo/trilha-03-logica-jogos.png", alt: "Jogo de lógica criado com programação e micro:bit" },
  creativity: { src: "/assets/antes-do-robo/trilha-02-criatividade-narrativas.png", alt: "Projeto criativo com imagens, música e narrativa digital" },
  prototyping: { src: "/assets/antes-do-robo/trilha-06-criacao-prototipagem.png", alt: "Protótipo construído com micro:bit e componentes de robótica" },
  firstSteps: { src: "/assets/antes-do-robo/trilha-01-primeiros-comandos.png", alt: "Primeiros comandos de programação sendo testados" },
} satisfies Record<string, LessonCover>;

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

/**
 * Escolhe uma fotografia ou ilustração do próprio portal a partir do assunto da
 * aula. Cada card recebe contexto visual sem usar uma imagem genérica que
 * contradiga o roteiro apresentado ao professor.
 */
export function lessonCover(lesson: Pick<LessonPlan, "id" | "title" | "theme" | "objective" | "needsBoard" | "needsMicrobit" | "image">): LessonCover {
  if (lesson.image) return lesson.image;

  const lessonIndex = LESSON_PLANS.findIndex((item) => item.id === lesson.id);
  if (lessonIndex >= 0) {
    return {
      src: `/imagens/aulas/${String(lessonIndex + 1).padStart(3, "0")}.webp`,
      alt: `Representação visual da aula ${lesson.title}`,
    };
  }

  const text = `${lesson.id} ${lesson.title} ${lesson.theme} ${lesson.objective}`.toLocaleLowerCase("pt-BR");

  if (text.includes("sanduíche") || text.includes("sanduiche")) return COVERS.sandwich;

  if (lesson.needsBoard) {
    if (includesAny(text, ["erro", "depura", "corrija", "armadilha"])) return COVERS.boardDebug;
    if (includesAny(text, ["repet", "econom", "efici", "otimiz"])) return COVERS.boardRepeat;
    if (includesAny(text, ["tesouro", "chave", "baú", "bau", "entrega"])) return COVERS.treasure;
    return COVERS.board;
  }

  if (lesson.needsMicrobit) {
    if (includesAny(text, ["temperatura", "luminos", "escuro", "sensor", "ambiente", "solo", "chuva", "qualidade do ar", "ruído", "ruido", "sombra", "composteira", "enchente"])) return COVERS.sensors;
    if (includesAny(text, ["dado", "gráfico", "grafico", "probabilidade", "pesquisa", "votação", "votacao", "matemática", "matematica", "coordenada", "cartesiano", "contador"])) return COVERS.data;
    if (includesAny(text, ["música", "musica", "melodia", "piano", "tambor", "metrônomo", "metronomo", "arte", "história", "historia", "emoç", "crachá", "cracha", "fantasia", "cartaz"])) return COVERS.creativity;
    if (includesAny(text, ["robô", "robo", "motor", "servo", "neopixel", "bme280", "maquete", "regador", "pluviômetro", "pluviometro"])) return COVERS.prototyping;
    if (includesAny(text, ["jogo", "quiz", "bingo", "batalha", "roleta", "escape", "caça", "caca", "reflexo", "reação", "reacao", "memória", "memoria", "dado eletrônico", "cara ou coroa"])) return COVERS.games;
    if (includesAny(text, ["movimento", "agitação", "agitacao", "queda", "equilíbrio", "equilibrio", "gesto", "vibração", "vibracao", "pulo", "postura", "mão firme", "mao firme", "passos"])) return COVERS.sensors;
    if (includesAny(text, ["nome", "mensagem", "ícone", "icone", "coração", "coracao", "carinha", "boas-vindas", "led"])) return COVERS.microbit;
    return COVERS.firstSteps;
  }

  if (includesAny(text, ["ambígu", "ambigu", "comunicação", "comunicacao", "dupla"])) return COVERS.ambiguous;
  if (includesAny(text, ["desenh", "monstro", "fluxograma"])) return COVERS.drawing;
  if (includesAny(text, ["repet", "laço", "laco", "coreografia"])) return COVERS.repetition;
  if (includesAny(text, ["palma", "som", "ritmo"])) return COVERS.claps;
  if (includesAny(text, ["erro", "depura", "debug", "defeito"])) return COVERS.debugging;
  if (includesAny(text, ["professor", "programe"])) return COVERS.teacherRobot;
  if (includesAny(text, ["movimento", "sequência", "sequencia", "corpo"])) return COVERS.movement;
  if (includesAny(text, ["tesouro", "pista", "caça", "caca"])) return COVERS.treasure;
  return COVERS.humanRobot;
}
