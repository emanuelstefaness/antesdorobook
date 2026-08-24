export type MicrobitPathStep = {
  order: number;
  lessonId: string;
  focus: string;
  teacherGoal: string;
};

export const MICROBIT_STARTER_PATH: MicrobitPathStep[] = [
  { order: 1, lessonId: "primeiro-icone-na-placa", focus: "Matriz de LEDs e primeira saída", teacherGoal: "Enviar um programa simples e explicar entrada, processamento e saída." },
  { order: 2, lessonId: "botoes-que-respondem", focus: "Eventos e botões", teacherGoal: "Relacionar cada entrada a uma resposta programada." },
  { order: 3, lessonId: "cracha-animado-com-microbit", focus: "Sequência, texto e ícones", teacherGoal: "Organizar comandos e ajustar velocidade para comunicar uma ideia." },
  { order: 4, lessonId: "dado-eletronico-para-jogos", focus: "Acelerômetro e aleatoriedade", teacherGoal: "Usar um gesto como entrada e validar o intervalo sorteado." },
  { order: 5, lessonId: "contador-de-pontos-com-variavel", focus: "Variáveis", teacherGoal: "Guardar e alterar um valor durante a execução." },
  { order: 6, lessonId: "luz-noturna-automatica", focus: "Sensor e condição", teacherGoal: "Medir o ambiente e criar uma decisão com limite." },
  { order: 7, lessonId: "musica-com-repeticao", focus: "Som e repetição", teacherGoal: "Reconhecer padrões e compactar uma sequência." },
  { order: 8, lessonId: "mensagens-por-radio", focus: "Comunicação entre placas", teacherGoal: "Separar emissão, recepção e configuração de canal." },
];

