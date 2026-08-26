import type { AgeBand, Duration, Material } from "./types";

export type ProjectCategory =
  | "desplugado"
  | "tabuleiro"
  | "microbit"
  | "sensores"
  | "robotica"
  | "dados-ia";

export type ProjectLevel = "iniciante" | "intermediario" | "avancado";

export type Project = {
  id: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  level: ProjectLevel;
  duration: Duration;
  ageBands: AgeBand[];
  materials: Material[];
  concepts: string[];
  component: string;
  outcome: string;
  challenge: string;
  steps: string[];
  oneMicrobit: string;
  withoutHardware: string;
};

export const NOMES_DAS_CATEGORIAS: Record<ProjectCategory, string> = {
  desplugado: "Sem computador",
  tabuleiro: "Tabuleiro",
  microbit: "micro:bit",
  sensores: "Sensores",
  robotica: "Robótica",
  "dados-ia": "Dados e IA",
};

export const NOMES_DOS_NIVEIS_DE_PROJETO: Record<ProjectLevel, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

type Seed = Omit<Project, "steps" | "oneMicrobit" | "withoutHardware"> & {
  investigate: string;
  build: string;
  test: string;
  oneMicrobit?: string;
  withoutHardware?: string;
};

function projeto(seed: Seed): Project {
  const usaPlaca = seed.materials.includes("microbit");
  const usaComputador = seed.materials.includes("computador");
  return {
    ...seed,
    steps: [
      `Investigar: ${seed.investigate}`,
      `Planejar: desenhar ou descrever a solução antes de montar.`,
      `Construir: ${seed.build}`,
      `Testar e melhorar: ${seed.test}`,
    ],
    oneMicrobit:
      seed.oneMicrobit ??
      (usaPlaca
        ? "Use a placa como estação de demonstração. Os grupos planejam e testam no simulador; depois se revezam por três minutos na placa física."
        : "A atividade já funciona com materiais compartilhados e não depende de placa física."),
    withoutHardware:
      seed.withoutHardware ??
      (usaPlaca || usaComputador
        ? "Faça a lógica com cartões de comandos e use o simulador do MakeCode para validar o comportamento antes da montagem."
        : "A proposta é totalmente desplugada e pode ser aplicada sem computador."),
  };
}

const TODOS: AgeBand[] = ["2-3", "4-5", "6-7", "8-9"];
const ANOS_FINAIS: AgeBand[] = ["6-7", "8-9"];

export const PROJECTS: Project[] = [
  projeto({
    id: "receita-do-monstro",
    title: "Receita para desenhar um monstro",
    summary: "Uma dupla escreve instruções geométricas e outra desenha sem ver o modelo.",
    category: "desplugado", level: "iniciante", duration: 30, ageBands: TODOS,
    materials: ["papel-e-lapis"], concepts: ["sequencia-e-instrucoes", "algoritmos"], component: "Algoritmo",
    outcome: "Dois desenhos para comparar com o mesmo algoritmo.", challenge: "Criar instruções que produzam desenhos parecidos em grupos diferentes.",
    investigate: "comparar instruções precisas e ambíguas em desenhos simples.", build: "escrever de seis a dez comandos de posição, forma e tamanho.", test: "trocar as instruções entre duplas e marcar onde surgiram interpretações diferentes.",
  }),
  projeto({
    id: "coreografia-algoritmica", title: "Coreografia algorítmica",
    summary: "A turma transforma movimentos corporais em uma sequência executável e repetível.",
    category: "desplugado", level: "iniciante", duration: 30, ageBands: TODOS,
    materials: ["cartoes"], concepts: ["sequencia-e-instrucoes", "repeticao"], component: "Sequência",
    outcome: "Uma coreografia curta codificada em cartões.", challenge: "Fazer outro grupo reproduzir a dança sem demonstração.",
    investigate: "quais palavras descrevem um movimento sem depender de imitação.", build: "organizar cartões de passo, giro, palma e pausa.", test: "executar em velocidades diferentes e substituir trechos repetidos por um laço.",
  }),
  projeto({
    id: "detetives-de-padroes", title: "Detetives de padrões",
    summary: "Os alunos procuram regularidades em objetos, horários, sons e rotinas da escola.",
    category: "desplugado", level: "iniciante", duration: 50, ageBands: TODOS,
    materials: ["papel-e-lapis"], concepts: ["reconhecimento-de-padroes", "abstracao"], component: "Padrões",
    outcome: "Um mapa de padrões encontrados na escola.", challenge: "Separar coincidência de padrão que realmente se repete.",
    investigate: "onde existem repetições previsíveis na rotina escolar.", build: "registrar exemplos, frequência e regra provável de cada padrão.", test: "usar a regra para prever o próximo acontecimento e conferir.",
  }),
  projeto({
    id: "fluxograma-da-mochila", title: "Fluxograma da mochila",
    summary: "Uma rotina cotidiana vira decisões com setas, perguntas e caminhos alternativos.",
    category: "desplugado", level: "intermediario", duration: 50, ageBands: TODOS,
    materials: ["papel-e-lapis", "cartoes"], concepts: ["decomposicao", "algoritmos"], component: "Fluxograma",
    outcome: "Um fluxograma testado para organizar a mochila.", challenge: "Prever o que muda quando há educação física, chuva ou tarefa especial.",
    investigate: "quais decisões fazem a rotina mudar de um dia para outro.", build: "ligar ações e perguntas com setas e alternativas sim/não.", test: "simular três dias diferentes e corrigir caminhos sem saída.",
  }),
  projeto({
    id: "rede-humana", title: "Rede humana de mensagens",
    summary: "A sala simula pacotes, endereço, perda de mensagem e confirmação de recebimento.",
    category: "desplugado", level: "intermediario", duration: 50, ageBands: ANOS_FINAIS,
    materials: ["cartoes"], concepts: ["decomposicao", "teste-e-depuracao"], component: "Comunicação",
    outcome: "Um protocolo criado pela turma para mensagens chegarem corretamente.", challenge: "Entregar uma mensagem mesmo quando um aluno da rede fica indisponível.",
    investigate: "como uma mensagem sabe para onde ir e como confirmar que chegou.", build: "definir endereços, rotas, confirmação e regra de reenvio.", test: "remover um nó da rede e observar se o protocolo encontra outra rota.",
  }),
  projeto({
    id: "compactador-de-instrucoes", title: "Compactador de instruções",
    summary: "Sequências longas são reduzidas com repetições sem alterar o resultado.",
    category: "desplugado", level: "intermediario", duration: 30, ageBands: ["4-5", "6-7", "8-9"],
    materials: ["cartoes"], concepts: ["repeticao", "abstracao"], component: "Laços",
    outcome: "Um algoritmo curto equivalente a uma sequência longa.", challenge: "Usar o menor número possível de cartões.",
    investigate: "quais trechos aparecem mais de uma vez.", build: "agrupar padrões e substituí-los por REPITA 2X, 3X ou 4X.", test: "executar as versões longa e curta e comparar o ponto final.",
  }),
  projeto({
    id: "quiz-de-depuracao", title: "Quiz de depuração",
    summary: "A turma encontra e corrige erros em algoritmos cotidianos preparados por outros grupos.",
    category: "desplugado", level: "intermediario", duration: 50, ageBands: TODOS,
    materials: ["papel-e-lapis"], concepts: ["teste-e-depuracao", "o-erro-como-parte-da-aprendizagem"], component: "Depuração",
    outcome: "Uma coleção de algoritmos com defeito e respectivas correções.", challenge: "Criar um erro difícil, mas diagnosticável.",
    investigate: "como diferenciar passo ausente, ordem errada e instrução ambígua.", build: "escrever um algoritmo correto e inserir deliberadamente um defeito.", test: "trocar com outro grupo e exigir que ele identifique o tipo e o local do erro.",
  }),
  projeto({
    id: "classificador-humano", title: "Classificador humano",
    summary: "Cartões com objetos são classificados por regras visíveis e depois por regras escondidas.",
    category: "dados-ia", level: "iniciante", duration: 50, ageBands: TODOS,
    materials: ["cartoes"], concepts: ["reconhecimento-de-padroes", "abstracao"], component: "Classificação",
    outcome: "Uma árvore de critérios criada pela turma.", challenge: "Descobrir a regra de classificação observando exemplos.",
    investigate: "quais características ajudam a separar exemplos sem usar o nome do objeto.", build: "organizar cartões por cor, forma, função ou material e registrar a regra.", test: "apresentar novos cartões e discutir casos ambíguos.",
  }),

  projeto({
    id: "rota-da-chave", title: "Rota da chave e do baú",
    summary: "O robô precisa buscar uma chave antes de chegar ao baú, respeitando a direção inicial.",
    category: "tabuleiro", level: "iniciante", duration: 50, ageBands: TODOS,
    materials: ["tabuleiro", "cartoes"], concepts: ["sequencia-e-instrucoes", "algoritmos"], component: "Tabuleiro 6×6",
    outcome: "Uma sequência testada que passa pela chave e termina no baú.", challenge: "Encontrar uma rota correta e explicar cada giro.",
    investigate: "a diferença entre virar e avançar e como a orientação muda a rota.", build: "montar uma fila de comandos antes de mover o robô.", test: "executar um cartão por vez e corrigir somente o primeiro erro encontrado.",
  }),
  projeto({
    id: "labirinto-com-cones", title: "Labirinto com cones",
    summary: "Obstáculos transformam um caminho direto em problema de planejamento.",
    category: "tabuleiro", level: "iniciante", duration: 50, ageBands: TODOS,
    materials: ["tabuleiro", "cartoes"], concepts: ["decomposicao", "algoritmos"], component: "Obstáculos",
    outcome: "Uma rota segura dividida em trechos.", challenge: "Chegar ao destino sem tocar nos cones.",
    investigate: "quais trechos independentes formam a rota completa.", build: "planejar trecho por trecho e unir os comandos no final.", test: "executar cada trecho e registrar onde a previsão não bateu.",
  }),
  projeto({
    id: "entregas-multiplas", title: "Robô de entregas",
    summary: "O robô visita três pontos em uma ordem eficiente e retorna à base.",
    category: "tabuleiro", level: "intermediario", duration: 50, ageBands: ["4-5", "6-7", "8-9"],
    materials: ["tabuleiro", "cartoes"], concepts: ["algoritmos", "abstracao"], component: "Otimização",
    outcome: "Uma rota completa com contagem de comandos.", challenge: "Visitar todos os pontos com menos comandos que os outros grupos.",
    investigate: "como a ordem das entregas altera o tamanho do caminho.", build: "comparar ao menos duas ordens antes de escolher a rota.", test: "contar cartões, validar o percurso e procurar uma solução menor.",
  }),
  projeto({
    id: "repeticao-no-tabuleiro", title: "Percurso com repetição",
    summary: "Trechos iguais do caminho são substituídos por blocos de repetição.",
    category: "tabuleiro", level: "intermediario", duration: 50, ageBands: TODOS,
    materials: ["tabuleiro", "cartoes"], concepts: ["repeticao", "reconhecimento-de-padroes"], component: "REPITA",
    outcome: "Duas soluções equivalentes: expandida e compactada.", challenge: "Reduzir a quantidade de peças sem mudar a rota.",
    investigate: "quais comandos consecutivos formam um padrão.", build: "montar a solução longa e depois compactá-la.", test: "executar as duas soluções e comparar posição e direção finais.",
  }),
  projeto({
    id: "crie-um-desafio", title: "Crie um desafio de tabuleiro",
    summary: "Os alunos deixam de resolver e passam a projetar desafios justos para outra equipe.",
    category: "tabuleiro", level: "avancado", duration: 100, ageBands: ANOS_FINAIS,
    materials: ["tabuleiro", "cartoes", "papel-e-lapis"], concepts: ["teste-e-depuracao", "abstracao"], component: "Design de desafios",
    outcome: "Um desafio documentado, solucionável e testado.", challenge: "Criar uma armadilha sem tornar o percurso impossível.",
    investigate: "o que diferencia dificuldade, ambiguidade e impossibilidade.", build: "definir início, destino, obstáculos, regra e solução mínima.", test: "entregar a outra equipe e revisar com base nas tentativas observadas.",
  }),
  projeto({
    id: "batalha-de-algoritmos", title: "Batalha de algoritmos",
    summary: "Duas soluções para o mesmo tabuleiro são comparadas por clareza e eficiência.",
    category: "tabuleiro", level: "avancado", duration: 50, ageBands: ANOS_FINAIS,
    materials: ["tabuleiro", "cartoes"], concepts: ["algoritmos", "teste-e-depuracao"], component: "Eficiência",
    outcome: "Uma rubrica criada pela turma para comparar soluções.", challenge: "Defender por que uma solução é melhor sem dizer apenas que é menor.",
    investigate: "quais critérios além do tamanho tornam um algoritmo melhor.", build: "resolver o mesmo cenário por duas estratégias diferentes.", test: "comparar previsibilidade, quantidade de peças e facilidade de correção.",
  }),

  projeto({
    id: "cracha-animado", title: "Crachá animado",
    summary: "O micro:bit mostra o nome do aluno e um ícone escolhido por ele.",
    category: "microbit", level: "iniciante", duration: 50, ageBands: TODOS,
    materials: ["microbit", "computador", "reciclaveis"], concepts: ["sequencia-e-instrucoes", "entrada-processamento-e-saida"], component: "Matriz de LEDs",
    outcome: "Um crachá programável preso a um suporte de papelão.", challenge: "Fazer nome e ícone aparecerem em uma ordem legível.",
    investigate: "como texto e imagens são exibidos na matriz 5×5.", build: "programar mostrar texto, pausa e mostrar ícone.", test: "pedir a um colega que leia à distância e ajustar velocidade e contraste.",
  }),
  projeto({
    id: "dado-eletronico", title: "Dado eletrônico",
    summary: "Ao agitar a placa, um número aleatório de 1 a 6 aparece.",
    category: "microbit", level: "iniciante", duration: 50, ageBands: TODOS,
    materials: ["microbit", "computador"], concepts: ["entrada-processamento-e-saida", "algoritmos"], component: "Acelerômetro",
    outcome: "Um dado utilizável em jogos da turma.", challenge: "Gerar somente valores válidos e acioná-los com movimento.",
    investigate: "como a placa percebe o gesto de agitar e como escolhe um número.", build: "combinar evento ao agitar, número aleatório e exibição.", test: "agitar vinte vezes e verificar se algum valor fica fora de 1 a 6.",
  }),
  projeto({
    id: "semaforo-de-humor", title: "Semáforo de humor",
    summary: "Botões registram como a turma chega e a matriz mostra um resumo visual.",
    category: "microbit", level: "iniciante", duration: 50, ageBands: TODOS,
    materials: ["microbit", "computador"], concepts: ["entrada-processamento-e-saida", "abstracao"], component: "Botões A e B",
    outcome: "Um painel simples de entrada da turma.", challenge: "Representar estados diferentes com poucos pixels.",
    investigate: "como símbolos pequenos podem comunicar sentimentos sem texto.", build: "atribuir um ícone a cada botão e um terceiro ao pressionar A+B.", test: "mostrar os ícones sem explicar e perguntar o que os colegas entenderam.",
  }),
  projeto({
    id: "pedra-papel-tesoura", title: "Pedra, papel e tesoura",
    summary: "Um gesto sorteia uma das três opções e transforma a placa em jogo portátil.",
    category: "microbit", level: "intermediario", duration: 50, ageBands: TODOS,
    materials: ["microbit", "computador"], concepts: ["algoritmos", "abstracao"], component: "Aleatoriedade",
    outcome: "Um jogo funcional para disputas em duplas.", challenge: "Mapear três números aleatórios para três símbolos claros.",
    investigate: "como o computador representa escolhas que parecem aleatórias.", build: "guardar o sorteio numa variável e usar condições para escolher o ícone.", test: "jogar várias rodadas e procurar casos sem resultado.",
  }),
  projeto({
    id: "cronometro-de-reflexo", title: "Cronômetro de reflexo",
    summary: "A placa espera um tempo aleatório e mede quem pressiona primeiro.",
    category: "microbit", level: "intermediario", duration: 100, ageBands: ["4-5", "6-7", "8-9"],
    materials: ["microbit", "computador"], concepts: ["teste-e-depuracao", "algoritmos"], component: "Tempo de execução",
    outcome: "Um jogo que mede tempo de reação.", challenge: "Impedir que o jogador aperte antes do sinal.",
    investigate: "como medir o intervalo entre um sinal e uma resposta.", build: "combinar pausa aleatória, registro de tempo e evento do botão.", test: "tentar trapacear e criar uma regra para detectar antecipação.",
  }),
  projeto({
    id: "contador-de-pontos", title: "Placar portátil",
    summary: "Botões aumentam e diminuem um placar guardado em variável.",
    category: "microbit", level: "intermediario", duration: 50, ageBands: TODOS,
    materials: ["microbit", "computador"], concepts: ["entrada-processamento-e-saida", "teste-e-depuracao"], component: "Variáveis",
    outcome: "Um placar reutilizável em jogos da sala.", challenge: "Atualizar o valor corretamente e impedir pontos negativos.",
    investigate: "o que precisa permanecer guardado entre um clique e outro.", build: "criar uma variável, alterar com A e B e mostrar com A+B.", test: "tentar diminuir abaixo de zero e corrigir com uma condição.",
  }),
  projeto({
    id: "musica-em-blocos", title: "Música em blocos",
    summary: "Notas, pausas e repetições formam uma pequena composição.",
    category: "microbit", level: "intermediario", duration: 100, ageBands: TODOS,
    materials: ["microbit", "computador"], concepts: ["sequencia-e-instrucoes", "repeticao"], component: "Alto-falante",
    outcome: "Uma música curta programada pela turma.", challenge: "Criar uma melodia reconhecível usando repetições.",
    investigate: "como altura e duração alteram uma nota.", build: "programar uma frase musical e agrupar o refrão numa repetição.", test: "tocar para outra dupla, recolher feedback e ajustar ritmo.",
  }),
  projeto({
    id: "mensagem-por-radio", title: "Mensagens por rádio",
    summary: "Duas placas enviam números ou palavras curtas sem fios.",
    category: "microbit", level: "intermediario", duration: 100, ageBands: ANOS_FINAIS,
    materials: ["microbit", "computador"], concepts: ["entrada-processamento-e-saida", "algoritmos"], component: "Rádio",
    outcome: "Um comunicador simples entre dois grupos.", challenge: "Evitar que mensagens de grupos diferentes se misturem.",
    investigate: "como canal, emissor e receptor organizam a comunicação.", build: "configurar grupo de rádio, enviar ao pressionar e mostrar ao receber.", test: "ligar vários pares na sala e identificar colisões de canal.",
  }),
  projeto({
    id: "quiz-sem-fio", title: "Quiz sem fio",
    summary: "Uma placa envia a pergunta e outras registram respostas A ou B por rádio.",
    category: "microbit", level: "avancado", duration: 100, ageBands: ANOS_FINAIS,
    materials: ["microbit", "computador"], concepts: ["decomposicao", "teste-e-depuracao"], component: "Rádio e variáveis",
    outcome: "Um sistema de votação instantânea.", challenge: "Contar uma resposta por placa e reiniciar cada rodada.",
    investigate: "quais mensagens o sistema precisa trocar para funcionar.", build: "separar emissor, receptores, confirmação e contagem.", test: "responder duas vezes e criar uma proteção contra duplicidade.",
  }),
  projeto({
    id: "animacao-pixelada", title: "Animação pixelada",
    summary: "Quadros sucessivos na matriz 5×5 criam a ilusão de movimento.",
    category: "microbit", level: "iniciante", duration: 50, ageBands: TODOS,
    materials: ["microbit", "computador", "papel-e-lapis"], concepts: ["sequencia-e-instrucoes", "abstracao"], component: "Matriz 5×5",
    outcome: "Uma animação autoral de três a seis quadros.", challenge: "Mostrar movimento com apenas 25 pontos por quadro.",
    investigate: "o que muda de um quadro para o seguinte para o olho perceber movimento.", build: "desenhar quadros no papel e programá-los com pausas curtas.", test: "variar o tempo entre quadros e escolher o mais legível.",
  }),

  projeto({
    id: "luz-noturna", title: "Luz noturna automática",
    summary: "A matriz acende somente quando o ambiente fica escuro.",
    category: "sensores", level: "intermediario", duration: 50, ageBands: TODOS,
    materials: ["microbit", "computador"], concepts: ["entrada-processamento-e-saida", "algoritmos"], component: "Sensor de luz",
    outcome: "Uma luminária automática em miniatura.", challenge: "Escolher um limite que não pisque indevidamente.",
    investigate: "medir valores de luz em locais claros e escuros.", build: "usar uma condição para acender ou apagar a matriz conforme o valor.", test: "mover entre sombra e luz e ajustar o limite.",
  }),
  projeto({
    id: "termometro-da-sala", title: "Mapa de temperatura da escola",
    summary: "Medições em diferentes espaços viram tabela e comparação.",
    category: "sensores", level: "intermediario", duration: 100, ageBands: ["4-5", "6-7", "8-9"],
    materials: ["microbit", "computador", "papel-e-lapis"], concepts: ["abstracao", "reconhecimento-de-padroes"], component: "Temperatura",
    outcome: "Um mapa com pontos mais quentes e mais frios.", challenge: "Coletar de forma comparável e explicar variações.",
    investigate: "como posição, horário e contato com a mão alteram a leitura.", build: "programar leitura e registrar local, horário e valor.", test: "repetir uma medição e discutir por que os valores não são idênticos.",
  }),
  projeto({
    id: "alarme-de-movimento", title: "Alarme de movimento",
    summary: "Uma mudança brusca de posição dispara luz ou som.",
    category: "sensores", level: "intermediario", duration: 50, ageBands: TODOS,
    materials: ["microbit", "computador"], concepts: ["entrada-processamento-e-saida", "teste-e-depuracao"], component: "Acelerômetro",
    outcome: "Um alarme para proteger uma caixa ou mochila.", challenge: "Distinguir toque acidental de movimento real.",
    investigate: "quais gestos a placa reconhece e com que sensibilidade.", build: "acionar sinal ao agitar ou alterar a aceleração acima do limite.", test: "produzir pequenos e grandes movimentos e calibrar o disparo.",
  }),
  projeto({
    id: "medidor-de-ruido", title: "Semáforo de ruído",
    summary: "O nível de som controla ícones de ambiente tranquilo, atenção e excesso.",
    category: "sensores", level: "intermediario", duration: 100, ageBands: TODOS,
    materials: ["microbit", "computador"], concepts: ["abstracao", "teste-e-depuracao"], component: "Microfone V2",
    outcome: "Um indicador visual de volume para a sala.", challenge: "Definir limites justos sem tratar silêncio absoluto como objetivo.",
    investigate: "medir conversa baixa, trabalho em grupo e palmas.", build: "criar três faixas e associar um ícone a cada uma.", test: "usar durante uma atividade real e revisar os limites com a turma.",
  }),
  projeto({
    id: "bussola-do-tesouro", title: "Bússola do tesouro",
    summary: "A seta na matriz aponta para uma direção combinada após calibração.",
    category: "sensores", level: "avancado", duration: 100, ageBands: ANOS_FINAIS,
    materials: ["microbit", "computador"], concepts: ["abstracao", "algoritmos"], component: "Magnetômetro",
    outcome: "Uma bússola digital usada em caça ao tesouro.", challenge: "Converter graus em direções compreensíveis.",
    investigate: "como 360 graus podem ser agrupados em norte, sul, leste e oeste.", build: "ler direção magnética e usar condições por intervalos.", test: "girar lentamente, observar fronteiras e calibrar longe de metal.",
  }),
  projeto({
    id: "umidade-do-solo", title: "Alerta de solo seco",
    summary: "Dois pregos ou sondas medem condutividade e indicam quando regar.",
    category: "sensores", level: "avancado", duration: 100, ageBands: ANOS_FINAIS,
    materials: ["microbit", "computador", "reciclaveis"], concepts: ["entrada-processamento-e-saida", "teste-e-depuracao"], component: "Pinos analógicos",
    outcome: "Um protótipo de monitoramento de planta.", challenge: "Calibrar valores para seco, adequado e muito úmido.",
    investigate: "comparar leituras em amostras com diferentes quantidades de água.", build: "conectar a sonda, ler o pino e classificar por faixas.", test: "repetir medições e verificar corrosão, contato e distância entre sondas.",
  }),

  projeto({
    id: "cancela-automatica", title: "Cancela automática",
    summary: "Um sensor de distância aciona um servomotor quando um veículo se aproxima.",
    category: "robotica", level: "avancado", duration: 100, ageBands: ANOS_FINAIS,
    materials: ["microbit", "computador", "reciclaveis"], concepts: ["entrada-processamento-e-saida", "decomposicao"], component: "Ultrassônico + servo",
    outcome: "Uma maquete funcional de estacionamento.", challenge: "Abrir no momento certo e fechar com segurança.",
    investigate: "como distância pode controlar posição de um mecanismo.", build: "separar leitura, decisão, movimento e estrutura física.", test: "aproximar objetos de tamanhos diferentes e ajustar distância e tempo.",
  }),
  projeto({
    id: "limpador-de-parabrisa", title: "Limpador de para-brisa",
    summary: "Um servo movimenta uma haste em ciclos e permite comparar velocidades.",
    category: "robotica", level: "intermediario", duration: 100, ageBands: ["4-5", "6-7", "8-9"],
    materials: ["microbit", "computador", "reciclaveis"], concepts: ["repeticao", "entrada-processamento-e-saida"], component: "Servomotor",
    outcome: "Um mecanismo de movimento alternado.", challenge: "Mover sem forçar o servo além do curso físico.",
    investigate: "como ângulo, pausa e comprimento da haste mudam o movimento.", build: "alternar dois ângulos dentro de uma repetição.", test: "experimentar velocidades e verificar se a estrutura resiste.",
  }),
  projeto({
    id: "radar-de-garagem", title: "Radar de garagem",
    summary: "Luz e som aumentam de intensidade conforme um objeto se aproxima.",
    category: "robotica", level: "avancado", duration: 100, ageBands: ANOS_FINAIS,
    materials: ["microbit", "computador", "reciclaveis"], concepts: ["abstracao", "algoritmos"], component: "Sensor ultrassônico",
    outcome: "Um assistente de estacionamento em maquete.", challenge: "Converter distância contínua em três níveis de alerta.",
    investigate: "quais faixas de distância seriam úteis para o usuário.", build: "medir, classificar e produzir feedback visual ou sonoro.", test: "aproximar em velocidades diferentes e observar atrasos de leitura.",
  }),
  projeto({
    id: "robo-que-desvia", title: "Robô que desvia de obstáculos",
    summary: "Dois motores e um sensor permitem avançar, detectar e escolher outra direção.",
    category: "robotica", level: "avancado", duration: 100, ageBands: ANOS_FINAIS,
    materials: ["microbit", "computador", "reciclaveis"], concepts: ["decomposicao", "teste-e-depuracao"], component: "Motores + distância",
    outcome: "Um veículo autônomo básico.", challenge: "Evitar que o robô fique preso repetindo a mesma manobra.",
    investigate: "quais comportamentos mínimos formam a navegação autônoma.", build: "programar avançar, parar, recuar e girar como funções separadas.", test: "montar cantos e corredores e registrar onde a estratégia falha.",
  }),
  projeto({
    id: "guindaste-de-papelao", title: "Guindaste de papelão",
    summary: "Um servo enrola linha e movimenta pequenas cargas com controle pelos botões.",
    category: "robotica", level: "intermediario", duration: 100, ageBands: TODOS,
    materials: ["microbit", "computador", "reciclaveis"], concepts: ["entrada-processamento-e-saida", "teste-e-depuracao"], component: "Servo + estrutura",
    outcome: "Um mecanismo capaz de levantar carga leve.", challenge: "Equilibrar força, curso e estabilidade da estrutura.",
    investigate: "como ponto de apoio e distância alteram o esforço.", build: "construir a torre, acoplar carretel e controlar subida e descida.", test: "aumentar a carga gradualmente sem ultrapassar o limite do mecanismo.",
  }),
  projeto({
    id: "estufa-inteligente", title: "Miniestufa inteligente",
    summary: "Luz, temperatura e umidade do solo são reunidas em um painel de cuidado.",
    category: "robotica", level: "avancado", duration: 100, ageBands: ANOS_FINAIS,
    materials: ["microbit", "computador", "reciclaveis"], concepts: ["decomposicao", "reconhecimento-de-padroes"], component: "Sistema de sensores",
    outcome: "Um protótipo integrado de monitoramento agrícola.", challenge: "Combinar três leituras sem confundir o usuário.",
    investigate: "quais condições são relevantes e quais podem ser medidas com o kit.", build: "programar cada sensor separadamente e depois integrar os alertas.", test: "simular mudanças de condição uma por vez e verificar o painel.",
  }),

  projeto({
    id: "pesquisa-da-turma", title: "Pesquisa da turma com dados",
    summary: "A classe cria uma pergunta, coleta respostas e decide a melhor representação.",
    category: "dados-ia", level: "iniciante", duration: 100, ageBands: TODOS,
    materials: ["papel-e-lapis"], concepts: ["abstracao", "reconhecimento-de-padroes"], component: "Coleta de dados",
    outcome: "Uma tabela e um gráfico construídos a partir de dados reais.", challenge: "Fazer uma pergunta que produza respostas comparáveis.",
    investigate: "quais perguntas geram categorias claras e respeitam privacidade.", build: "coletar, limpar, contar e representar os dados.", test: "verificar se o gráfico permite responder à pergunta inicial.",
  }),
  projeto({
    id: "cientista-do-ambiente", title: "Cientista do ambiente",
    summary: "Medições de luz, temperatura ou ruído são coletadas em horários diferentes.",
    category: "dados-ia", level: "intermediario", duration: 100, ageBands: ANOS_FINAIS,
    materials: ["microbit", "computador", "papel-e-lapis"], concepts: ["reconhecimento-de-padroes", "abstracao"], component: "Registro de dados",
    outcome: "Uma série temporal curta com conclusão sustentada pelos dados.", challenge: "Manter o método de medição consistente.",
    investigate: "qual variável observar e o que precisa permanecer igual em cada coleta.", build: "definir protocolo, registrar valores e representar a mudança no tempo.", test: "repetir um ponto e procurar medições incompatíveis.",
  }),
  projeto({
    id: "duas-verdades-uma-mentira", title: "Duas verdades e uma mentira",
    summary: "Um jogo de rádio introduz checagem de fatos e diferença entre fato e opinião.",
    category: "dados-ia", level: "intermediario", duration: 100, ageBands: ANOS_FINAIS,
    materials: ["microbit", "computador"], concepts: ["algoritmos", "teste-e-depuracao"], component: "Rádio e informação",
    outcome: "Um jogo eletrônico acompanhado de protocolo de verificação.", challenge: "Não confundir afirmação convincente com informação verificada.",
    investigate: "quais fontes permitem conferir cada afirmação.", build: "programar envio da escolha e criar ficha de checagem.", test: "jogar primeiro sem e depois com checagem e comparar acertos.",
  }),
  projeto({
    id: "maquina-de-classificar-gestos", title: "Máquina de classificar gestos",
    summary: "Exemplos de movimentos treinam um modelo simples para reconhecer gestos.",
    category: "dados-ia", level: "avancado", duration: 100, ageBands: ANOS_FINAIS,
    materials: ["microbit", "computador"], concepts: ["reconhecimento-de-padroes", "abstracao"], component: "Aprendizado de máquina",
    outcome: "Um classificador de três gestos com teste de precisão.", challenge: "Coletar exemplos variados sem misturar as classes.",
    investigate: "como quantidade e diversidade dos exemplos alteram o resultado.", build: "definir classes, coletar amostras, treinar e ligar cada saída a uma ação.", test: "testar com pessoas que não forneceram os exemplos e registrar erros.",
  }),
  projeto({
    id: "auditoria-de-vies", title: "Auditoria de viés",
    summary: "A turma testa um classificador com exemplos diferentes dos usados no treinamento.",
    category: "dados-ia", level: "avancado", duration: 100, ageBands: ANOS_FINAIS,
    materials: ["computador", "papel-e-lapis"], concepts: ["abstracao", "teste-e-depuracao"], component: "Ética em IA",
    outcome: "Um relatório curto de limites, erros e melhorias do modelo.", challenge: "Explicar por que um modelo funciona para alguns exemplos e falha em outros.",
    investigate: "quais grupos de exemplos estão pouco representados nos dados.", build: "criar uma matriz de testes e registrar acertos e erros por condição.", test: "adicionar exemplos ausentes, treinar novamente e comparar.",
  }),
  projeto({
    id: "painel-de-dados-da-escola", title: "Painel de dados da escola",
    summary: "Grupos transformam uma questão real da escola em indicadores claros e responsáveis.",
    category: "dados-ia", level: "avancado", duration: 100, ageBands: ANOS_FINAIS,
    materials: ["computador", "papel-e-lapis"], concepts: ["decomposicao", "abstracao"], component: "Visualização",
    outcome: "Um protótipo de painel com fonte, período e limite de cada indicador.", challenge: "Informar sem expor pessoas nem induzir uma conclusão enganosa.",
    investigate: "que decisão o painel precisa apoiar e quais dados são realmente necessários.", build: "selecionar indicadores, desenhar a hierarquia e escrever notas de contexto.", test: "pedir a outra equipe que interprete sem explicação e identificar leituras equivocadas.",
  }),
  projeto({
    id: "semaforo-de-decisoes", title: "Semáforo de decisões",
    summary: "Cartões verdes, amarelos e vermelhos representam condições, dúvidas e impedimentos em uma rotina.",
    category: "desplugado", level: "iniciante", duration: 30, ageBands: TODOS,
    materials: ["cartoes"], concepts: ["algoritmos", "abstracao"], component: "Condições",
    outcome: "Um algoritmo de decisões para uma situação cotidiana.", challenge: "Criar regras claras sem tentar prever casos irrelevantes.",
    investigate: "quais fatos realmente mudam a decisão numa rotina da escola.", build: "organizar perguntas e ações com cartões de três cores.", test: "simular casos esperados e um caso surpresa para localizar decisões ausentes.",
  }),
  projeto({
    id: "missao-coleta-seletiva", title: "Missão coleta seletiva",
    summary: "O robô percorre o tabuleiro, recolhe resíduos e entrega cada item no destino correto.",
    category: "tabuleiro", level: "intermediario", duration: 50, ageBands: TODOS,
    materials: ["tabuleiro", "cartoes"], concepts: ["decomposicao", "algoritmos"], component: "Rotas e classificação",
    outcome: "Uma rota que coleta, classifica e entrega três materiais.", challenge: "Cumprir a missão usando menos comandos e sem misturar destinos.",
    investigate: "como a ordem das coletas altera a distância total.", build: "planejar a classificação e montar uma rota por etapas.", test: "executar com outro grupo como robô e registrar o primeiro erro de rota ou categoria.",
  }),
  projeto({
    id: "bussola-de-trilha", title: "Bússola de trilha",
    summary: "A matriz indica pontos cardeais e ajuda a criar um percurso de orientação pela escola.",
    category: "microbit", level: "intermediario", duration: 100, ageBands: ["4-5", "6-7", "8-9"],
    materials: ["microbit", "computador", "papel-e-lapis"], concepts: ["entrada-processamento-e-saida", "abstracao"], component: "Bússola",
    outcome: "Uma bússola digital acompanhada de um pequeno mapa.", challenge: "Transformar ângulos em direções estáveis e compreensíveis.",
    investigate: "como o ângulo muda ao girar a placa e onde ficam as fronteiras entre direções.", build: "calibrar a bússola e associar faixas de ângulo a setas.", test: "seguir um percurso curto, afastado de estruturas metálicas, e revisar as faixas.",
  }),
  projeto({
    id: "contador-de-passos", title: "Contador de passos",
    summary: "Movimentos detectados pelo acelerômetro incrementam uma variável exibida sob comando.",
    category: "microbit", level: "intermediario", duration: 50, ageBands: TODOS,
    materials: ["microbit", "computador"], concepts: ["entrada-processamento-e-saida", "teste-e-depuracao"], component: "Acelerômetro + variável",
    outcome: "Um protótipo de pedômetro com botão para consultar o total.", challenge: "Reduzir contagens falsas causadas por movimentos que não são passos.",
    investigate: "quais gestos se parecem com um passo para o sensor.", build: "combinar evento de movimento, variável e exibição pelo botão.", test: "comparar contagem real e programada em três percursos e ajustar a regra.",
  }),
  projeto({
    id: "estacao-de-luz", title: "Estação de luz da sala",
    summary: "Medições ajudam a comparar pontos de leitura, projeção e trabalho em grupo.",
    category: "sensores", level: "iniciante", duration: 50, ageBands: TODOS,
    materials: ["microbit", "computador", "papel-e-lapis"], concepts: ["reconhecimento-de-padroes", "abstracao"], component: "Sensor de luz",
    outcome: "Um mapa de luminosidade com recomendação para cada atividade.", challenge: "Coletar valores comparáveis sem cobrir o sensor com a mão.",
    investigate: "quais pontos parecem claros ou escuros e como transformar impressão em medida.", build: "programar a leitura e registrar três medições por local.", test: "repetir em outro horário e discutir o que mudou e o que permaneceu.",
  }),
  projeto({
    id: "mascote-interativo", title: "Mascote interativo",
    summary: "Um personagem de material reciclável reage a botões, luz ou movimento com servo e ícones.",
    category: "robotica", level: "intermediario", duration: 100, ageBands: TODOS,
    materials: ["microbit", "computador", "reciclaveis"], concepts: ["entrada-processamento-e-saida", "decomposicao"], component: "Servo + interação",
    outcome: "Um personagem com pelo menos duas reações programadas.", challenge: "Integrar movimento e estrutura sem forçar o mecanismo.",
    investigate: "quais ações comunicam emoções usando pouco movimento.", build: "testar o servo separado, criar a estrutura e integrar duas entradas.", test: "observar se outra pessoa entende cada reação e reforçar diferenças.",
  }),
  projeto({
    id: "classificador-de-residuos", title: "Classificador de resíduos",
    summary: "Exemplos de objetos treinam a turma a construir critérios e avaliar decisões de um classificador.",
    category: "dados-ia", level: "intermediario", duration: 100, ageBands: ["4-5", "6-7", "8-9"],
    materials: ["computador", "cartoes"], concepts: ["reconhecimento-de-padroes", "abstracao"], component: "Classificação e dados",
    outcome: "Uma árvore de decisão e um conjunto de testes com casos ambíguos.", challenge: "Classificar materiais compostos sem esconder as limitações da regra.",
    investigate: "quais características observáveis ajudam a distinguir papel, plástico, metal e rejeito.", build: "criar perguntas sim/não e registrar exemplos para cada saída.", test: "aplicar itens novos, marcar erros e revisar somente a regra que falhou.",
  }),
  projeto({
    id: "diario-de-energia", title: "Diário de energia da escola",
    summary: "A turma observa hábitos de uso, registra dados e propõe mudanças mensuráveis sem identificar pessoas.",
    category: "dados-ia", level: "avancado", duration: 100, ageBands: ["6-7", "8-9"],
    materials: ["papel-e-lapis", "computador"], concepts: ["decomposicao", "reconhecimento-de-padroes"], component: "Investigação com dados",
    outcome: "Um diagnóstico de hábitos e uma proposta acompanhada de indicador.", challenge: "Separar evidência observada de suposição sobre desperdício.",
    investigate: "quais situações podem ser observadas com segurança e sem coletar dados pessoais.", build: "definir protocolo, registrar ocorrências e organizar padrões por local e horário.", test: "aplicar uma mudança pequena por uma semana e comparar usando o mesmo método.",
  }),
];

export function projetoPorId(id: string): Project | undefined {
  return PROJECTS.find((item) => item.id === id);
}
