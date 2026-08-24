export type RoboticsConcept = {
  id: string;
  order: number;
  title: string;
  plain: string;
  teacherNeeds: string;
  howToExplain: string;
  practice: string;
  example: string;
};

export const ROBOTICS_CONCEPTS: RoboticsConcept[] = [
  {
    id: "o-que-e-um-robo",
    order: 1,
    title: "O que torna uma máquina um robô",
    plain: "Um robô é um sistema construído para perceber alguma condição, tomar uma decisão programada e produzir uma ação.",
    teacherNeeds: "Diferenciar robô, máquina automática e objeto apenas motorizado. Nem todo equipamento eletrônico é um robô.",
    howToExplain: "Pergunte se uma porta automática percebe, decide e age. Depois compare com um ventilador comum, que apenas liga e gira.",
    practice: "Classifique cinco objetos conhecidos e justifique quais têm entrada, decisão e ação.",
    example: "Porta automática: sensor percebe presença, controlador decide abrir e motor movimenta a porta.",
  },
  {
    id: "entrada-processamento-saida",
    order: 2,
    title: "Entrada, processamento e saída",
    plain: "Entrada é a informação recebida; processamento é a regra aplicada; saída é a resposta produzida.",
    teacherNeeds: "Conseguir desenhar esse fluxo para qualquer projeto antes de escolher peças ou escrever código.",
    howToExplain: "Use o corpo: olhos recebem, cérebro interpreta e mãos respondem. Depois transfira a mesma lógica para o robô.",
    practice: "Desenhe o fluxo de uma cancela automática e de um alarme de movimento.",
    example: "Botão pressionado → programa verifica o evento → matriz de LEDs mostra um ícone.",
  },
  {
    id: "sensores",
    order: 3,
    title: "Sensores: como o robô percebe",
    plain: "Sensores transformam luz, movimento, distância, som, temperatura ou contato em dados que o programa consegue utilizar.",
    teacherNeeds: "Entender que sensores fornecem medidas aproximadas e precisam ser testados e calibrados no ambiente real.",
    howToExplain: "Compare sensores aos sentidos, lembrando que cada um percebe apenas uma parte do ambiente e pode se enganar.",
    practice: "Escolha o sensor adequado para detectar escuridão, aproximação, inclinação e toque.",
    example: "Um sensor de distância pode indicar que existe algo a 12 cm, mas não sabe se é uma pessoa ou uma caixa.",
  },
  {
    id: "atuadores",
    order: 4,
    title: "Atuadores: como o robô age",
    plain: "Atuadores transformam comandos do programa em movimento, luz, som ou outra ação física.",
    teacherNeeds: "Diferenciar motor contínuo, servomotor, buzzer, LED e display e reconhecer o tipo de controle de cada um.",
    howToExplain: "Se o sensor é o sentido, o atuador é o músculo ou a voz do sistema.",
    practice: "Associe cada saída desejada — girar roda, mover cancela, emitir alerta, mostrar informação — ao atuador adequado.",
    example: "O servo recebe um ângulo e posiciona a haste; o motor comum gira enquanto recebe energia.",
  },
  {
    id: "controlador-e-programa",
    order: 5,
    title: "Controlador e programa",
    plain: "O controlador executa o programa que conecta as informações dos sensores às ações dos atuadores.",
    teacherNeeds: "Compreender eventos, condições, repetição e variáveis como regras de comportamento do sistema.",
    howToExplain: "O controlador não pensa como pessoa: ele executa as regras disponíveis com os dados que recebeu.",
    practice: "Escreva em cartões a regra: se a distância for menor que 10 cm, pare o motor e acenda o alerta.",
    example: "O micro:bit pode funcionar como controlador de uma maquete, lendo um sensor e comandando um servo.",
  },
  {
    id: "energia-e-circuito",
    order: 6,
    title: "Energia, circuito e conexões",
    plain: "Todo sistema físico precisa de alimentação adequada e de um caminho elétrico correto para funcionar.",
    teacherNeeds: "Reconhecer 3V, GND, polaridade, circuito aberto, conexão frouxa e risco de curto-circuito.",
    howToExplain: "Compare o circuito a um caminho completo: se houver uma interrupção, a energia não percorre o sistema.",
    practice: "Com a placa desligada, identifique alimentação, terra e sinal em três montagens de exemplo.",
    example: "Um servo pode receber o comando correto e ainda falhar se a alimentação não fornecer energia suficiente.",
  },
  {
    id: "estrutura-e-mecanismos",
    order: 7,
    title: "Estrutura e mecanismos",
    plain: "A programação só produz o resultado esperado quando estrutura, encaixes, eixos, alavancas e transmissão de movimento funcionam.",
    teacherNeeds: "Separar problema mecânico de problema eletrônico e testar o movimento sem carga antes da integração.",
    howToExplain: "Código é a instrução; mecanismo é o corpo que precisa conseguir executar essa instrução.",
    practice: "Construa uma alavanca de papelão e observe como a posição do apoio altera força e percurso.",
    example: "Uma cancela pode ter código correto, mas travar porque a haste encosta na estrutura.",
  },
  {
    id: "teste-seguranca-depuracao",
    order: 8,
    title: "Teste, segurança e depuração",
    plain: "Projetos robóticos devem ser montados, testados e corrigidos por partes antes de funcionar como sistema completo.",
    teacherNeeds: "Aplicar a ordem energia → conexão → entrada → lógica → saída → mecanismo, alterando uma coisa por vez.",
    howToExplain: "O erro informa em qual parte nossa previsão deixou de combinar com o comportamento observado.",
    practice: "Crie uma falha intencional, registre o sintoma, formule uma hipótese e escolha um único teste para confirmá-la.",
    example: "Primeiro teste o sensor, depois o servo e somente então programe a interação entre os dois.",
  },
];

export function roboticsConceptById(id: string): RoboticsConcept | undefined {
  return ROBOTICS_CONCEPTS.find((concept) => concept.id === id);
}
