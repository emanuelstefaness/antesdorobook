export type MakeCodeBlockFamily = {
  name: string;
  does: string;
  use: string;
  result: string;
  error: string;
};

export type MakeCodeCategory = {
  id: string;
  order: number;
  title: string;
  menu: string;
  level: "Começo" | "Intermediário" | "Avançado";
  version: string;
  summary: string;
  mentalModel: string;
  families: MakeCodeBlockFamily[];
  projects: string[];
  lessonIds: string[];
  source: string;
};

const f = (name: string, does: string, use: string, result: string, error: string): MakeCodeBlockFamily => ({ name, does, use, result, error });

export const MAKECODE_CATEGORIES: MakeCodeCategory[] = [
  {
    id: "basico", order: 1, title: "Básico: mostrar e esperar", menu: "Básico", level: "Começo", version: "V1 e V2",
    summary: "Controla a matriz 5 × 5 e o ritmo do programa. É a primeira categoria para qualquer iniciante.",
    mentalModel: "Pense na matriz como um painel de 25 lâmpadas: o programa decide o que aparece e por quanto tempo.",
    families: [
      f("ao iniciar", "Executa uma vez quando o programa começa.", "Preparar variáveis, mostrar uma saudação ou configurar rádio.", "A ação ocorre uma única vez após ligar ou reiniciar.", "Colocar aqui algo que deveria reagir muitas vezes; mova para um evento ou para sempre."),
      f("para sempre", "Repete os blocos internos sem parar.", "Monitorar luz, atualizar um sensor ou animar.", "A sequência recomeça continuamente.", "Usar pausas longas dentro dele torna a resposta lenta."),
      f("mostrar número", "Exibe um número; valores longos rolam.", "Contadores, temperatura, placar e medidas.", "O valor aparece na matriz.", "Esperar que mostre texto; confirme se o valor é realmente numérico."),
      f("mostrar LEDs", "Desenha diretamente os 25 pontos.", "Ícones próprios, letras e mapas simples.", "A matriz copia exatamente a malha do bloco.", "Desenho invertido porque a placa está de cabeça para baixo."),
      f("mostrar ícone", "Mostra um desenho pronto da galeria.", "Feedback rápido: feliz, triste, certo, errado.", "O ícone ocupa a matriz.", "Dois ícones consecutivos sem pausa parecem apenas o último."),
      f("mostrar cadeia de caracteres", "Rola texto pela matriz.", "Nome, aviso e mensagem curta.", "As letras atravessam a tela.", "Frases grandes demoram; use texto curto."),
      f("pausa (ms)", "Interrompe a sequência pelo número de milissegundos.", "Separar quadros, controlar ritmo e evitar leitura rápida demais.", "Nada novo ocorre durante a pausa.", "Confundir 1000 ms com 1000 s; 1000 ms = 1 segundo."),
      f("limpar tela", "Apaga todos os LEDs.", "Encerrar uma animação ou separar estados.", "A matriz fica apagada.", "A tela acende de novo porque um para sempre redesenha logo depois."),
      f("mostrar seta", "Mostra uma das direções prontas.", "Bússola, navegação e instruções.", "Uma seta aparece.", "Confundir a direção visual com a orientação física da placa."),
    ],
    projects: ["Crachá animado", "Semáforo visual", "História em três quadros"], lessonIds: ["primeiro-icone-na-placa", "cracha-animado-com-microbit"], source: "https://makecode.microbit.org/reference/basic",
  },
  {
    id: "entrada", order: 2, title: "Entrada: botões e sensores internos", menu: "Entrada", level: "Começo", version: "Alguns blocos exigem V2",
    summary: "Lê ações humanas e o ambiente: botões, gesto, toque, luz, temperatura, movimento, bússola, som e tempo.",
    mentalModel: "Entrada é tudo que informa algo à placa. Evento espera acontecer; leitura entrega um valor agora.",
    families: [
      f("quando o botão A/B/A+B for pressionado", "Dispara uma ação ao pressionar.", "Menus, votos e jogos.", "O código interno roda uma vez por pressão.", "A+B pode virar A ou B se os botões não forem pressionados juntos."),
      f("botão está pressionado", "Responde verdadeiro ou falso naquele instante.", "Manter uma ação enquanto o botão estiver segurado.", "Produz um valor lógico.", "Usar fora de condição e esperar que dispare sozinho."),
      f("quando agitado/gesto", "Detecta gestos do acelerômetro.", "Dado eletrônico, alarme e brincadeiras corporais.", "O evento escolhido dispara.", "Movimento fraco ou orientação errada não atinge o limiar."),
      f("aceleração (mg)", "Mede aceleração nos eixos X, Y, Z ou força total.", "Pedômetro e estudos de movimento.", "Retorna um número em mili-g.", "Tratar o valor bruto como distância percorrida."),
      f("rotação inclinação", "Estima inclinação da placa.", "Controle de personagem ou nível.", "Retorna ângulo/valor de inclinação.", "Movimentos bruscos deixam a leitura instável."),
      f("quando pino P0/P1/P2 pressionado", "Detecta toque elétrico nos pinos grandes.", "Instrumentos de frutas e controles de papel-alumínio.", "O evento roda quando o circuito de toque fecha.", "Não conectar GND ao corpo/objeto quando a montagem exige."),
      f("quando logotipo for tocado/pressionado", "Usa o logotipo capacitivo.", "Botão extra e interfaces táteis.", "O evento ocorre com toque ou pressão configurada.", "Disponível apenas na V2."),
      f("nível de luz", "Estima luz usando a matriz de LEDs.", "Luz noturna e mapa de iluminação.", "Retorna 0 a 255.", "Ler enquanto a matriz exibe algo pode alterar a medida."),
      f("temperatura (°C)", "Estima a temperatura do chip.", "Comparações ambientais e alertas.", "Retorna graus Celsius aproximados.", "Confundir temperatura do processador com termômetro clínico."),
      f("direção da bússola", "Mede rumo de 0° a 359°.", "Bússola e caça ao tesouro.", "0° indica aproximadamente norte após calibração.", "Não calibrar ou aproximar ímãs/metais."),
      f("força magnética", "Mede campo magnético nos eixos.", "Detector de ímã e investigações.", "Retorna microteslas.", "Usar sem linha de base do ambiente."),
      f("tempo de execução", "Informa tempo desde o início em ms ou µs.", "Cronômetro e tempo de reação.", "Retorna um número crescente.", "Não guardar o tempo inicial antes de subtrair."),
      f("nível de som", "Mede intensidade sonora de 0 a 255.", "Semáforo de ruído e palmas.", "Retorna nível relativo, não decibéis.", "Só existe na V2; na V1 pode ocorrer erro 927."),
      f("quando som alto/baixo", "Dispara ao cruzar o limiar de som.", "Palma para acionar e alarme.", "O evento ocorre ao mudar de faixa.", "Limiar inadequado dispara sempre ou nunca."),
      f("definir limiar de som", "Escolhe o ponto de alto/baixo.", "Calibrar para a sala.", "Muda a sensibilidade dos eventos.", "Copiar um valor de outra sala sem medir o ruído local."),
    ],
    projects: ["Dado ao agitar", "Pedômetro", "Semáforo de ruído", "Bússola"], lessonIds: ["botoes-que-respondem", "dado-eletronico-para-jogos", "semaforo-de-ruido", "pedometro-com-acelerometro"], source: "https://makecode.microbit.org/reference/input",
  },
  {
    id: "musica", order: 3, title: "Música e sons", menu: "Música", level: "Começo", version: "V1 com saída externa; V2 com alto-falante",
    summary: "Produz tons, melodias, efeitos sonoros e controla duração, andamento e volume.", mentalModel: "Nota diz a altura; batida diz a duração; andamento diz a velocidade; volume diz a intensidade.",
    families: [
      f("tocar tom por batida", "Toca uma frequência pelo tempo escolhido.", "Melodias e sinais.", "O som termina antes do próximo bloco.", "Volume zero ou alto-falante desabilitado."),
      f("iniciar tom", "Mantém um tom até outro comando.", "Sirene contínua.", "O som continua.", "Esquecer de parar o som."),
      f("parar todos os sons", "Interrompe som atual.", "Silenciar alarme.", "O alto-falante para.", "Um para sempre inicia o som novamente."),
      f("tocar melodia", "Executa sequência de notas no modo escolhido.", "Hinos curtos e vinhetas.", "A melodia toca uma vez ou repetidamente.", "Escolher 'em segundo plano' e supor que o código esperará."),
      f("melodia integrada", "Seleciona uma sequência pronta.", "Testes rápidos e feedback.", "Toca a melodia escolhida.", "Confundir nome da melodia com efeito sonoro V2."),
      f("tocar som/expressão sonora", "Sintetiza um efeito expressivo.", "Mascotes e narrativas.", "Produz o efeito na V2.", "Bloco V2 usado em V1."),
      f("tempo/batida", "Converte inteira, meia, quarto etc. em duração.", "Ritmo consistente.", "Retorna milissegundos conforme o andamento.", "Misturar batidas e ms sem perceber."),
      f("definir/alterar andamento", "Muda batidas por minuto.", "Acelerar ou desacelerar música.", "Próximas notas usam o novo BPM.", "Andamento não altera um tom que já começou."),
      f("definir volume", "Ajusta volume de 0 a 255.", "Som adequado à sala.", "Próximos sons mudam de intensidade.", "Esperar volume acima de 255."),
      f("alto-falante ligado/desligado", "Controla o alto-falante interno V2.", "Usar fone/saída externa ou silenciar.", "Ativa ou desativa a saída interna.", "Desligar e esquecer de religar."),
    ],
    projects: ["Piano de pinos", "Campainha", "Mascote sonoro"], lessonIds: ["musica-com-repeticao", "mascote-que-reage"], source: "https://makecode.microbit.org/reference/music",
  },
  {
    id: "led", order: 4, title: "LED: controlar cada ponto", menu: "LED", level: "Intermediário", version: "V1 e V2",
    summary: "Controla coordenadas, brilho, gráficos e o funcionamento da matriz.", mentalModel: "Cada ponto tem coordenadas x e y de 0 a 4; brilho vai de 0 a 255.",
    families: [
      f("plotar/desplotar x y", "Acende ou apaga uma coordenada.", "Desenho por algoritmo.", "Um LED muda de estado.", "Usar coordenada 5; a matriz vai apenas de 0 a 4."),
      f("alternar x y", "Inverte aceso/apagado.", "Pisca-pisca e jogos.", "O ponto troca de estado.", "Chamar rapidamente parece brilho fraco."),
      f("ponto x y", "Informa se o LED está aceso.", "Colisão e testes.", "Retorna verdadeiro/falso.", "Confundir leitura com comando de acender."),
      f("brilho/definir brilho", "Lê ou define brilho geral 0–255.", "Economia de energia e contraste.", "Muda intensidade dos próximos desenhos.", "Valor zero deixa tudo invisível."),
      f("plotar brilho", "Acende um ponto com intensidade específica.", "Escalas e tons visuais.", "Ponto aparece com brilho relativo.", "Diferenças pequenas são difíceis de ver."),
      f("plotar gráfico de barras", "Representa valor em relação ao máximo.", "Sensores e porcentagens.", "Mais LEDs acendem com valor maior.", "Máximo zero ou escala incoerente."),
      f("parar animação", "Interrompe rolagem/animação atual.", "Responder imediatamente a botão.", "A animação para.", "Outro laço reinicia a exibição."),
      f("modo de exibição/ativar matriz", "Controla modo e disponibilidade da matriz.", "Liberar pinos compartilhados e otimizar leitura.", "Muda como a matriz opera.", "Desativar e pensar que a placa quebrou."),
    ],
    projects: ["Gráfico de sensor", "Desenho por coordenadas", "Medidor de nível"], lessonIds: ["mapa-de-luz-da-sala", "mapa-de-temperatura"], source: "https://makecode.microbit.org/reference/led",
  },
  {
    id: "radio", order: 5, title: "Rádio: placas conversando", menu: "Rádio", level: "Intermediário", version: "V1 e V2; indisponível junto com Bluetooth",
    summary: "Envia números, textos e pares nome–valor entre micro:bits próximos.", mentalModel: "Todas as placas precisam estar no mesmo grupo. Enviar e receber são programas diferentes, ligados por um protocolo combinado.",
    families: [
      f("definir grupo", "Escolhe o canal lógico 0–255.", "Separar turmas e equipes.", "Só mensagens do mesmo grupo são recebidas.", "Grupos diferentes não se escutam."),
      f("enviar número", "Transmite um número.", "Voto, placar e sensor remoto.", "Receptores do grupo recebem o valor.", "Enviar rápido demais causa congestionamento."),
      f("ao receber número", "Dispara quando chega um número.", "Reagir ao dado remoto.", "Variável do evento contém o valor.", "Usar evento de texto para mensagem numérica."),
      f("enviar/receber texto", "Transmite uma cadeia curta.", "Comandos e mensagens.", "O texto chega às placas do grupo.", "Texto grande ocupa mais tempo no rádio."),
      f("enviar/receber nome e valor", "Transmite rótulo e número juntos.", "Distinguir temperatura, luz e placar.", "Evento recebe nome e valor.", "Comparar o nome com grafia diferente."),
      f("potência de transmissão", "Ajusta alcance de 0 a 7.", "Experimento de alcance e redução de interferência.", "Muda a força do sinal.", "Assumir distância exata; paredes e pessoas interferem."),
      f("força do pacote recebido", "Informa intensidade aproximada do sinal.", "Jogo de aproximação.", "Retorna valor negativo em dBm.", "Achar que número mais negativo é sinal mais forte."),
      f("definir número de série/transmitir serial", "Inclui identidade da placa no pacote.", "Identificar estação de medição.", "Receptor pode ler o serial.", "Usar serial como dado pessoal sem necessidade."),
      f("elevar evento", "Envia evento de controle remoto.", "Comandos simples entre placas.", "Receptores tratam o evento.", "IDs de fonte/valor não combinam."),
    ],
    projects: ["Votação sem fio", "Sensor remoto", "Caça ao tesouro por sinal"], lessonIds: ["mensagens-por-radio", "radio-cooperativo-em-sala"], source: "https://makecode.microbit.org/reference/radio",
  },
  {
    id: "repeticoes", order: 6, title: "Repetições", menu: "Laços", level: "Começo", version: "V1 e V2", summary: "Repete ações um número de vezes, para cada valor, enquanto uma condição for verdadeira ou continuamente.", mentalModel: "Laço é uma máquina de repetir: determine o que repete, quantas vezes e o que muda em cada volta.",
    families: [
      f("repetir n vezes", "Repete um conjunto uma quantidade fixa.", "Animações e batidas.", "A sequência executa n vezes.", "Colocar o bloco que deveria mudar fora do laço."),
      f("para índice de 0 até", "Repete e fornece um contador.", "Coordenadas e progressões.", "Índice assume cada valor.", "Limite é inclusivo; contar uma repetição a mais."),
      f("para cada valor de lista", "Percorre todos os itens.", "Notas, nomes e medidas.", "Variável recebe cada item.", "Alterar a lista durante o percurso."),
      f("enquanto", "Repete enquanto a condição for verdadeira.", "Esperar sensor atingir limite.", "Para quando a condição fica falsa.", "Condição nunca muda e cria laço infinito."),
      f("sair/continuar", "Interrompe o laço ou pula para a próxima volta.", "Encerrar busca ao achar resposta.", "Fluxo muda imediatamente.", "Usar fora de um laço."),
    ], projects: ["Animação", "Contagem regressiva", "Varredura da matriz"], lessonIds: ["economize-comandos-com-repeticao", "coreografia-com-repeticoes"], source: "https://makecode.microbit.org/blocks/loops",
  },
  {
    id: "logica", order: 7, title: "Lógica: decisões", menu: "Lógica", level: "Começo", version: "V1 e V2", summary: "Cria condições, comparações e combinações verdadeiro/falso.", mentalModel: "A condição é uma pergunta que só pode responder sim ou não; cada resposta abre um caminho.",
    families: [
      f("se / senão se / senão", "Escolhe um caminho.", "Alertas por faixa e regras de jogo.", "Apenas um ramo compatível executa.", "Ordem de faixas errada torna um ramo inalcançável."),
      f("comparações = ≠ < ≤ > ≥", "Compara dois valores.", "Limites de sensor e placar.", "Retorna verdadeiro ou falso.", "Usar = pensando que altera uma variável."),
      f("e / ou", "Combina condições.", "Exigir duas regras ou aceitar alternativas.", "Retorna um único lógico.", "Trocar e por ou muda completamente a regra."),
      f("não", "Inverte verdadeiro/falso.", "Enquanto botão não estiver pressionado.", "Verdadeiro vira falso.", "Dupla negação confunde leitura."),
      f("verdadeiro/falso", "Valores lógicos literais.", "Estado ligado, terminou, venceu.", "Armazena uma condição.", "Usar texto 'verdadeiro' em vez do valor lógico."),
    ], projects: ["Semáforo por faixas", "Senha de dois botões", "Alarme condicional"], lessonIds: ["semaforo-de-decisoes-na-rotina", "classificando-residuos-com-regras"], source: "https://makecode.microbit.org/blocks/logic/if",
  },
  {
    id: "variaveis", order: 8, title: "Variáveis: memória com nome", menu: "Variáveis", level: "Começo", version: "V1 e V2", summary: "Guarda valores que mudam. Não existe limite pedagógico fixo: o professor cria quantas forem necessárias; nomes claros são essenciais.", mentalModel: "Uma variável é uma caixa etiquetada. O bloco redondo lê a caixa; definir troca o conteúdo; alterar soma ou subtrai.",
    families: [
      f("criar uma variável", "Cria uma caixa nomeada.", "placar, temperaturaAtual, jogador.", "O nome passa a aparecer no menu.", "Criar nomes quase iguais, como ponto e pontos."),
      f("definir variável para", "Substitui o valor guardado.", "Zerar placar ou registrar sensor.", "A caixa recebe o novo valor.", "Usar quando queria somar e perder o valor anterior."),
      f("alterar variável por", "Soma uma quantidade.", "Contador e placar.", "O valor aumenta ou diminui.", "Não inicializar e desconhecer que números começam em 0."),
      f("valor da variável", "Lê o conteúdo atual.", "Mostrar, comparar ou calcular.", "Entrega o valor guardado.", "Arrastar a variável errada para a expressão."),
    ], projects: ["Placar", "Contador de passos", "Maior temperatura medida"], lessonIds: ["contador-de-pontos-com-variavel", "placar-portatil-com-variavel"], source: "https://makecode.microbit.org/blocks/variables",
  },
  {
    id: "matematica", order: 9, title: "Matemática e aleatoriedade", menu: "Matemática", level: "Intermediário", version: "V1 e V2", summary: "Calcula, compara, sorteia e transforma números.", mentalModel: "Blocos ovais devolvem um valor e precisam ser encaixados onde outro bloco espera um número.",
    families: [
      f("+ − × ÷ resto potência", "Realiza operações.", "Pontuação, média e ciclos.", "Retorna o resultado.", "Dividir por zero ou usar resto sem compreender ciclo."),
      f("escolher aleatório", "Sorteia inteiro em um intervalo.", "Dado e seleção justa.", "Retorna um valor inclusive entre limites.", "Achar que o simulador produzirá sequência idêntica."),
      f("mapear", "Converte uma faixa numérica em outra.", "Sensor 0–1023 para brilho 0–255.", "Retorna valor proporcional.", "Inverter mínimo e máximo sem intenção."),
      f("mínimo/máximo/valor absoluto", "Compara ou remove sinal.", "Limitar valores e medir diferença.", "Retorna número transformado.", "Confundir máximo com limite automático."),
      f("arredondar/piso/teto/truncar", "Transforma decimal em inteiro.", "Exibir medidas legíveis.", "Retorna inteiro segundo a regra.", "Esperar que altere a variável original."),
      f("raiz, trigonometria e log", "Executa funções científicas.", "Ângulos e modelos matemáticos.", "Retorna número calculado.", "Graus/radianos ou domínio inválido."),
      f("restringir", "Mantém valor entre mínimo e máximo.", "Servo e brilho seguros.", "Valores externos são cortados no limite.", "Confundir com mapear."),
    ], projects: ["Dado", "Conversor de escala", "Bússola por ângulos"], lessonIds: ["dado-eletronico-para-jogos", "bussola-digital-e-orientacao"], source: "https://makecode.microbit.org/blocks/math",
  },
  {
    id: "funcoes", order: 10, title: "Funções", menu: "Funções", level: "Intermediário", version: "V1 e V2", summary: "Agrupa uma sequência com nome para reutilizar e organizar o programa.", mentalModel: "Função é uma minirreceita: definir escreve a receita; chamar executa; parâmetro é ingrediente; retorno é o resultado.",
    families: [
      f("criar/chamar função", "Nomeia e reutiliza uma sequência.", "mostrarErro, tocarAlarme, medirSala.", "Cada chamada executa a mesma sequência.", "Definir a função mas nunca chamá-la."),
      f("parâmetros", "Entrega valores diferentes à função.", "mostrarNota(aluno) ou mover(velocidade).", "A função usa o argumento recebido.", "Confundir parâmetro local com variável global."),
      f("retornar valor", "Faz a função produzir um resultado.", "calcularMedia e classificarNivel.", "A chamada encaixa como valor.", "Não cobrir todos os caminhos de retorno."),
    ], projects: ["Biblioteca de ícones", "Alarme reutilizável", "Calculadora de média"], lessonIds: ["projeto-integrador-da-escola"], source: "https://makecode.microbit.org/functions",
  },
  {
    id: "listas", order: 11, title: "Listas (arrays)", menu: "Listas", level: "Intermediário", version: "V1 e V2", summary: "Guarda vários valores ordenados numa só estrutura. A primeira posição é 0.", mentalModel: "Lista é uma prateleira numerada começando em 0; índice aponta a posição e item é o conteúdo.",
    families: [
      f("criar lista", "Agrupa valores.", "Notas, leituras e sequência de ícones.", "Uma variável passa a guardar vários itens.", "Misturar tipos torna o programa difícil de prever."),
      f("comprimento", "Conta itens.", "Controlar laço e validar dados.", "Retorna quantidade.", "Usar comprimento como último índice; último é comprimento − 1."),
      f("obter/definir item no índice", "Lê ou troca uma posição.", "Editar uma leitura específica.", "A posição indicada é acessada.", "Índice fora do intervalo."),
      f("adicionar/inserir/remover", "Muda o conteúdo e tamanho.", "Coleta progressiva.", "A lista cresce, encolhe ou se reorganiza.", "Remover enquanto percorre e pular itens."),
      f("índice de/contém", "Procura um valor.", "Checar resposta ou participante.", "Retorna posição ou condição.", "Índice −1 significa não encontrado."),
      f("para cada item", "Percorre a lista inteira.", "Calcular total e exibir sequência.", "Cada item é processado.", "Alterar a lista durante a repetição."),
    ], projects: ["Coletor de temperaturas", "Sequenciador musical", "Histórico de pontuação"], lessonIds: ["mapa-de-temperatura", "investigacao-do-uso-de-energia"], source: "https://makecode.microbit.org/types/array",
  },
  {
    id: "texto", order: 12, title: "Texto (strings)", menu: "Avançado → Texto", level: "Intermediário", version: "V1 e V2", summary: "Cria e transforma sequências de caracteres.", mentalModel: "Texto é uma fila de caracteres. Mesmo '123' é texto até ser convertido em número.",
    families: [
      f("criar/juntar texto", "Forma ou concatena cadeias.", "Mensagens com nomes e valores.", "Retorna um texto novo.", "Esperar soma numérica ao juntar '2' e '3'."),
      f("comprimento", "Conta caracteres.", "Limitar mensagens de rádio.", "Retorna quantidade.", "Espaços também contam."),
      f("caractere/trecho", "Extrai parte pelo índice.", "Comandos e códigos.", "Retorna caractere ou substring.", "Primeiro índice é 0."),
      f("comparar", "Verifica igualdade ou ordem.", "Interpretar comando recebido.", "Retorna verdadeiro/falso.", "Maiúsculas e acentos mudam o texto."),
      f("converter número ↔ texto", "Muda o tipo de dado.", "Exibir medida e depois calcular.", "Retorna valor convertido.", "Texto inválido não vira número útil."),
    ], projects: ["Crachá", "Mensagens de rádio", "Menu por comandos"], lessonIds: ["cracha-animado-com-microbit", "mensagens-por-radio"], source: "https://makecode.microbit.org/types/string",
  },
  {
    id: "jogos", order: 13, title: "Jogo", menu: "Avançado → Jogo", level: "Intermediário", version: "V1 e V2", summary: "Cria sprites, movimento, colisão, placar, vidas e cronômetro na matriz.", mentalModel: "Sprite é um personagem-luz com posição x/y; o motor do jogo cuida de placar, vida e fim.",
    families: [
      f("criar sprite", "Cria ponto controlável.", "Personagem e alvo.", "LED aparece na coordenada.", "Criar outro sprite sem guardar em variável."),
      f("mover/virar/mudar x y", "Altera posição e direção.", "Navegação e labirinto.", "Sprite se desloca.", "Sair da borda sem usar quicar."),
      f("tocando/tocando borda", "Testa colisão.", "Captura e obstáculos.", "Retorna verdadeiro/falso.", "Testar antes de mover e perder a colisão."),
      f("excluir/quicar", "Remove ou rebate sprite.", "Projéteis e bola.", "Sprite some ou muda direção.", "Continuar usando variável de sprite excluído."),
      f("pontuação/adicionar ponto", "Gerencia placar.", "Jogos de reflexo.", "Pontuação é armazenada/exibida.", "Criar variável paralela e mostrar a errada."),
      f("vida/alterar vida", "Gerencia tentativas.", "Erros permitidos.", "Jogo termina ao chegar a zero.", "Diminuir em 1 usando definir 1."),
      f("contagem regressiva", "Inicia temporizador do jogo.", "Desafio por tempo.", "Jogo termina ao zerar.", "Iniciar várias contagens."),
      f("fim/pausar/retomar jogo", "Controla estado global.", "Telas e intervalos.", "Jogo para ou continua.", "Pausar o jogo e não a lógica externa."),
    ], projects: ["Reflexo", "Pega-ponto", "Labirinto de inclinação"], lessonIds: ["jogo-do-reflexo", "placar-portatil-com-variavel"], source: "https://makecode.microbit.org/reference/game",
  },
  {
    id: "imagens", order: 14, title: "Imagens e animação", menu: "Avançado → Imagens", level: "Intermediário", version: "V1 e V2", summary: "Cria imagens reutilizáveis e animações maiores que a tela.", mentalModel: "Imagem é uma matriz guardada numa variável; imagens largas funcionam como uma faixa que pode rolar.",
    families: [
      f("criar imagem/imagem grande", "Guarda desenho 5×5 ou faixa.", "Personagens e letreiros.", "Retorna um objeto imagem.", "Criar imagem mas não chamar mostrar."),
      f("mostrar imagem/quadro", "Exibe imagem inteira ou recorte.", "Animação quadro a quadro.", "A matriz mostra o quadro.", "Índice de deslocamento fora da largura."),
      f("rolar imagem", "Move imagem pela matriz.", "Faixas e histórias.", "Imagem atravessa a tela.", "Intervalo pequeno demais fica ilegível."),
      f("pixel: definir/obter/alternar", "Edita pontos de uma imagem.", "Desenho procedural.", "Objeto imagem muda.", "Editar a matriz da placa em vez do objeto ou vice-versa."),
      f("largura/deslocar", "Mede ou move conteúdo interno.", "Animação e janela móvel.", "Retorna largura ou altera posição.", "Perder conteúdo ao deslocar sem cópia."),
    ], projects: ["Letreiro", "Animação de personagem", "História em quadros"], lessonIds: ["primeiro-icone-na-placa", "cracha-animado-com-microbit"], source: "https://makecode.microbit.org/reference/images/image",
  },
  {
    id: "pinos", order: 15, title: "Pinos: eletrônica e atuadores", menu: "Avançado → Pinos", level: "Avançado", version: "V1 e V2", summary: "Lê e escreve sinais digitais/analógicos, controla servo e conversa com componentes por pulso, I²C e SPI.", mentalModel: "3V alimenta, GND fecha o circuito e o pino de sinal transporta informação. Confira ligação com a placa desligada.",
    families: [
      f("leitura digital", "Lê 0 ou 1.", "Botão externo e sensor com saída digital.", "Retorna 0/1.", "Pino flutuante sem pull-up/pull-down."),
      f("escrita digital", "Coloca pino em 0 ou 1.", "LED externo e sinal de controle.", "Pino vai a nível baixo/alto.", "Ligar carga de alta corrente direto no pino."),
      f("leitura analógica", "Lê intensidade 0–1023.", "Potenciômetro e umidade resistiva.", "Retorna valor proporcional.", "Esperar volts exatos ou não compartilhar GND."),
      f("escrita analógica PWM", "Produz média 0–1023 por pulsos.", "Brilho de LED e velocidade via driver.", "Saída aparente varia.", "Ligar motor direto ao micro:bit."),
      f("período analógico", "Define frequência do PWM.", "Tom e controle específico.", "Muda a temporização do sinal.", "Escolher período incompatível com o atuador."),
      f("mapear", "Converte faixa de sensor para atuador.", "Sensor 0–1023 para servo 0–180.", "Retorna escala proporcional.", "Não restringir valores fora da faixa."),
      f("servo escrever pino", "Posiciona servo em graus.", "Cancela e ponteiro.", "Servo vai ao ângulo solicitado.", "Alimentação insuficiente causa tremor/reset."),
      f("servo pulso/contínuo/parar", "Controla calibração e servo contínuo.", "Rodas e mecanismos.", "Pulso/velocidade muda.", "Confundir servo posicional com contínuo."),
      f("pulso de entrada", "Mede duração de pulso.", "Ultrassônico e sinais digitais.", "Retorna microssegundos.", "Timeout ou divisor incorreto na conversão."),
      f("definir pull", "Liga resistor interno.", "Estabilizar botão/sensor.", "Pino repousa em estado definido.", "Configurar pull oposto à lógica do circuito."),
      f("redirecionar evento do pino", "Configura comportamento de eventos.", "Integração avançada.", "Eventos físicos são encaminhados.", "Usar sem conhecer IDs/eventos."),
      f("I²C ler/escrever", "Conversa com dispositivos endereçados em dois fios.", "Sensores e displays I²C.", "Bytes são enviados/recebidos.", "Endereço, tensão ou registrador errado."),
      f("SPI escrever/formato/frequência/pinos", "Usa barramento serial rápido.", "Displays e módulos SPI.", "Dados circulam por MOSI/MISO/SCK.", "Pinos ou modo SPI não combinam com o módulo."),
    ], projects: ["Luz automática", "Cancela com servo", "Alerta de solo seco", "Radar ultrassônico"], lessonIds: ["alerta-de-solo-seco", "cancela-automatica-com-servo", "radar-de-garagem-em-maquete"], source: "https://makecode.microbit.org/reference/pins",
  },
  {
    id: "serial", order: 16, title: "Serial e dados no computador", menu: "Avançado → Serial", level: "Avançado", version: "V1 e V2", summary: "Envia dados ao computador ou a outro dispositivo e recebe texto/números por UART.", mentalModel: "Serial é uma conversa em linha. Ambos os lados precisam concordar em pinos, velocidade e separador.",
    families: [
      f("escrever número/texto/linha/valor", "Envia dados formatados.", "Monitorar sensores e depurar.", "Dados aparecem no console serial.", "Sem quebra de linha, valores ficam colados."),
      f("escrever números", "Envia vários valores para gráfico.", "Séries de sensores.", "Console pode plotar linhas.", "Amostragem rápida demais congestiona."),
      f("ler até separador/ler linha/número", "Recebe informação.", "Comandos do computador.", "Retorna dado recebido.", "Programa bloqueia esperando separador que não chega."),
      f("ao receber dados", "Dispara quando separador chega.", "Protocolos reativos.", "Evento processa a mensagem.", "Separador configurado diferente do remetente."),
      f("redirecionar USB/pinos", "Escolhe por onde a serial passa.", "UART externa.", "Comunicação muda de canal.", "Cruzar TX/RX incorretamente ou esquecer GND comum."),
      f("definir taxa de transmissão", "Escolhe baud rate.", "Compatibilidade com módulo.", "Bits trafegam na velocidade definida.", "Taxas diferentes geram caracteres ilegíveis."),
      f("buffer/tamanho", "Inspeciona e controla dados pendentes.", "Protocolos avançados.", "Retorna caracteres disponíveis.", "Ler antes de haver dados."),
    ], projects: ["Gráfico ao vivo", "Registrador de luz", "Comando pelo computador"], lessonIds: ["mapa-de-luz-da-sala", "investigacao-do-uso-de-energia"], source: "https://makecode.microbit.org/reference/serial",
  },
  {
    id: "controle", order: 17, title: "Controle: tempo, eventos e execução", menu: "Avançado → Controle", level: "Avançado", version: "V1 e V2", summary: "Controla fluxo de baixo nível, eventos, execução paralela, reinício e versão da placa.", mentalModel: "É a sala de máquinas. Use depois de dominar eventos, laços e variáveis.",
    families: [
      f("esperar microssegundos", "Pausa com precisão curta.", "Protocolos e pulsos.", "Execução aguarda µs.", "Usar para pausas longas e travar resposta."),
      f("executar em paralelo/em segundo plano", "Inicia tarefa concorrente.", "Som enquanto anima.", "Duas sequências avançam intercaladas.", "Ambas alteram a mesma variável e criam disputa."),
      f("ao evento/elevar evento", "Cria comunicação interna por IDs.", "Arquiteturas modulares.", "Manipulador roda ao evento.", "Fonte e valor não combinam."),
      f("reiniciar", "Reinicia programa/placa.", "Recuperação e novo jogo.", "Volta ao início.", "Criar ciclo de reinício."),
      f("número de série", "Lê identificador do dispositivo.", "Distinguir estações.", "Retorna número da placa.", "Expor identidade sem necessidade."),
      f("versão de hardware", "Identifica revisão da placa.", "Adaptar V1/V2.", "Retorna informação de hardware.", "Assumir que substitui teste de recurso."),
      f("RAM/tamanho de evento", "Inspeciona recursos internos.", "Diagnóstico avançado.", "Retorna valores de sistema.", "Otimizar cedo demais em aula iniciante."),
    ], projects: ["Tarefas simultâneas", "Programa compatível V1/V2", "Protocolo por eventos"], lessonIds: ["oficina-de-erros-intencionais", "projeto-integrador-da-escola"], source: "https://makecode.microbit.org/reference/control",
  },
  {
    id: "bluetooth", order: 18, title: "Bluetooth", menu: "Avançado → Bluetooth", level: "Avançado", version: "V1 e V2; exige emparelhamento e substitui o rádio",
    summary: "Expõe serviços da placa para celular/computador: acelerômetro, botões, pinos, LED, magnetômetro, temperatura e UART.", mentalModel: "Bluetooth publica serviços; um aplicativo cliente se conecta e lê/escreve características. Ativar serviços consome memória.",
    families: [
      f("serviço do acelerômetro", "Publica movimento.", "App de movimento.", "Cliente recebe valores.", "App não solicita/autoriza o serviço."),
      f("serviço de botão", "Publica A/B.", "Controle remoto.", "Cliente recebe pressões.", "Emparelhamento antigo/inválido."),
      f("serviço de pinos IO", "Permite ler/escrever pinos.", "Painel remoto.", "App controla pinos configurados.", "Risco elétrico permanece; Bluetooth não protege circuito."),
      f("serviço LED", "Permite controlar matriz.", "Mensagens do celular.", "App atualiza display.", "Formato de matriz incorreto."),
      f("serviço magnetômetro/temperatura", "Publica sensores.", "Coleta remota.", "Cliente recebe medidas.", "Bússola sem calibração."),
      f("serviço UART", "Cria canal de texto bidirecional.", "App personalizado.", "Mensagens trafegam em ambos sentidos.", "Delimitadores e tamanho de mensagem inconsistentes."),
      f("ao conectar/desconectar", "Detecta estado do cliente.", "Mostrar status e recuperar conexão.", "Evento roda na mudança.", "Confundir pareado com conectado."),
      f("potência de transmissão", "Ajusta alcance BLE.", "Gerenciar alcance/energia.", "Sinal muda.", "Esperar distância garantida."),
    ], projects: ["Painel de sensores no celular", "Controle remoto", "Matriz comandada por app"], lessonIds: ["projeto-integrador-da-escola"], source: "https://makecode.microbit.org/reference/bluetooth",
  },
  {
    id: "extensoes", order: 19, title: "Extensões, registro e recursos V2", menu: "Extensões", level: "Avançado", version: "Depende da placa e do kit",
    summary: "Adiciona blocos oficiais ou de fabricantes: registro de dados, gravação de áudio, NeoPixel, motores, sensores e kits. O catálogo de terceiros é aberto e muda; por isso não existe uma lista finita de tudo.", mentalModel: "Extensão é um novo vocabulário. Só instale a extensão indicada pelo fabricante e confirme placa, versão, alimentação e biblioteca.",
    families: [
      f("Data Logger", "Registra colunas e linhas de dados.", "Experimentos de luz, som e temperatura.", "Dados ficam disponíveis para análise/exportação.", "Cabeçalhos mudam no meio da coleta."),
      f("Audio Recording", "Grava e reproduz áudio na V2.", "Paisagens sonoras e mensagem curta.", "Áudio usa memória da placa.", "Recurso V2 ou memória insuficiente."),
      f("NeoPixel", "Controla fita de LEDs endereçáveis.", "Sinalização e arte luminosa.", "Cada LED recebe cor/brilho.", "Alimentação inadequada ou ordem de cores diferente."),
      f("Servo/motores de fabricante", "Controla driver ou shield específico.", "Robôs móveis e mecanismos.", "Atuador responde via biblioteca.", "Escolher extensão de outro modelo de placa/driver."),
      f("sensores de fabricante", "Lê componente externo específico.", "Clima, distância, umidade e qualidade do ar.", "Bloco retorna dados do sensor.", "Endereço, porta, tensão ou extensão incompatível."),
    ], projects: ["Estação de dados", "Arte NeoPixel", "Robô móvel", "Gravador de sons"], lessonIds: ["mini-estufa-inteligente", "radar-de-garagem-em-maquete", "projeto-integrador-da-escola"], source: "https://makecode.microbit.org/extensions",
  },
];

export function makeCodeCategoryById(id: string): MakeCodeCategory | undefined {
  return MAKECODE_CATEGORIES.find((category) => category.id === id);
}

export const MAKECODE_FAMILY_COUNT = MAKECODE_CATEGORIES.reduce((total, category) => total + category.families.length, 0);
