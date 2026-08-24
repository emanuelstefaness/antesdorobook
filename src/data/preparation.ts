export type PreparationModule = {
  id: string;
  order: number;
  title: string;
  duration: number;
  promise: string;
  why: string;
  learn: string[];
  practice: string;
  readyWhen: string[];
  classroom: string;
};

export const PREPARATION_MODULES: PreparationModule[] = [
  {
    id: "pensamento-computacional",
    order: 1,
    title: "Pensamento computacional antes da tecnologia",
    duration: 35,
    promise: "Entender algoritmo, decomposição, padrões, abstração e depuração com situações da sala de aula.",
    why: "O professor precisa reconhecer o raciocínio antes de apresentar o nome técnico. Assim, a tecnologia entra como ferramenta e não como assunto isolado.",
    learn: [
      "Transformar um problema grande em partes menores",
      "Escrever e testar sequências de instruções",
      "Reconhecer padrões e decidir o que pode ser ignorado",
      "Tratar erro como informação para a próxima tentativa",
    ],
    practice: "Vivencie o algoritmo do sanduíche e a dinâmica LEGO: execute instruções literalmente, localize ambiguidades e reescreva apenas o passo defeituoso.",
    readyWhen: [
      "Explica algoritmo sem usar a palavra código",
      "Consegue mediar um erro sem entregar a resposta",
      "Diferencia decomposição de simples divisão de tarefas",
    ],
    classroom: "Use a sequência vivenciar → refletir → nomear → aplicar. O conceito aparece depois da experiência, quando a turma já sentiu o problema.",
  },
  {
    id: "programacao-em-blocos",
    order: 2,
    title: "Lógica de programação em blocos",
    duration: 50,
    promise: "Ler um programa e prever o que ele fará antes de executá-lo.",
    why: "Copiar blocos não prepara o professor para responder perguntas ou corrigir erros. A base é compreender relações, não decorar categorias.",
    learn: [
      "Sequência, eventos e repetição",
      "Condições se/senão e operadores",
      "Variáveis e números aleatórios",
      "Funções e depuração por partes",
    ],
    practice: "Monte no papel uma sequência com evento, decisão e repetição. Depois recrie no simulador e compare sua previsão com o resultado.",
    readyWhen: [
      "Aponta qual bloco inicia o programa",
      "Explica o valor guardado numa variável",
      "Localiza o primeiro bloco que produziu resultado inesperado",
    ],
    classroom: "Peça sempre uma previsão antes de clicar em executar. A diferença entre previsão e resultado é o melhor ponto de partida para a discussão.",
  },
  {
    id: "conhecendo-o-microbit",
    order: 3,
    title: "Conhecendo o BBC micro:bit",
    duration: 40,
    promise: "Reconhecer as partes da placa e classificá-las como entrada, processamento, saída, comunicação ou energia.",
    why: "Quando o professor compreende a função de cada parte, consegue explicar projetos diferentes sem reaprender a placa do zero.",
    learn: [
      "Matriz 5×5, botões A/B e reset",
      "Acelerômetro, luz, temperatura e bússola",
      "Rádio, pinos, 3V e GND",
      "Diferenças importantes entre as versões V1 e V2",
    ],
    practice: "Segure a placa desligada e aponte uma entrada, uma saída, uma forma de comunicação e uma fonte de energia. Depois faça o mesmo no diagrama do portal.",
    readyWhen: [
      "Diferencia botão de reset dos botões programáveis",
      "Sabe quais recursos dependem da versão V2",
      "Explica entrada → processamento → saída usando a placa",
    ],
    classroom: "Distribua as placas desligadas primeiro. Dois minutos de exploração e hipóteses produzem mais atenção do que começar nomeando todos os componentes.",
  },
  {
    id: "makecode-na-pratica",
    order: 4,
    title: "MakeCode do simulador à placa",
    duration: 60,
    promise: "Criar, testar, salvar e transferir um projeto sem depender de improviso durante a aula.",
    why: "Grande parte dos problemas acontece fora do código: cabo sem dados, arquivo no lugar errado, projeto não nomeado ou extensão ausente.",
    learn: [
      "Interface, categorias e encaixe dos blocos",
      "Simulador, desfazer, duplicar e salvar",
      "Download e transferência do arquivo .hex",
      "Compartilhamento, extensões e recuperação de projeto",
    ],
    practice: "Crie uma animação de três quadros, teste no simulador, altere a velocidade, nomeie o projeto e transfira para a placa.",
    readyWhen: [
      "Consegue trabalhar somente no simulador",
      "Distingue cabo de carga de cabo de dados",
      "Recupera um projeto e identifica onde instalar uma extensão",
    ],
    classroom: "Abra o editor antes da turma entrar e mantenha uma placa já programada. O resultado visível no primeiro minuto cria segurança para o restante da aula.",
  },
  {
    id: "eletricidade-e-seguranca",
    order: 5,
    title: "Eletricidade e conexões seguras",
    duration: 55,
    promise: "Montar circuitos simples e reconhecer ligações que podem falhar ou danificar componentes.",
    why: "Projetos físicos deixam de funcionar por contato, polaridade, alimentação e curto-circuito. O professor precisa diagnosticar isso antes de culpar o código.",
    learn: [
      "Circuito aberto e fechado",
      "3V, GND, entrada e saída",
      "Polaridade, condutividade e curto-circuito",
      "Cabos jacaré, buzzer, sensor e servomotor",
    ],
    practice: "Monte um circuito de condutividade com papel-alumínio. Teste aberto, fechado e com materiais diferentes; depois desenhe o caminho da corrente.",
    readyWhen: [
      "Identifica 3V e GND antes de conectar",
      "Verifica contato e alimentação antes de alterar o código",
      "Sabe quando um motor ou servo pode exigir alimentação externa",
    ],
    classroom: "Use uma regra fixa: placa desligada para montar, conferência da ligação e somente depois alimentação. Fotografe a montagem correta como referência.",
  },
  {
    id: "organizacao-da-aula-maker",
    order: 6,
    title: "Como conduzir uma aula maker",
    duration: 45,
    promise: "Organizar grupos, tempo, materiais e mediação sem transformar a aula em demonstração do professor.",
    why: "Uma boa atividade técnica pode fracassar por falta de papéis claros, tempo de teste ou material distribuído de forma confusa.",
    learn: [
      "Papéis rotativos dentro dos grupos",
      "Estações quando há poucas placas",
      "Perguntas de mediação sem dar a solução",
      "Registro, compartilhamento e avaliação do processo",
    ],
    practice: "Planeje uma aula de 50 minutos dividindo abertura, investigação, construção, teste, depuração e fechamento. Reserve pelo menos dez minutos para testar e compartilhar.",
    readyWhen: [
      "Cada aluno tem uma função observável no grupo",
      "Existe plano para quem aguarda a placa",
      "A avaliação considera raciocínio, teste e colaboração",
    ],
    classroom: "Com uma única placa, trabalhe em estações: planejamento em papel, simulador em duplas, montagem física por revezamento e registro do teste.",
  },
  {
    id: "objetivos-e-curriculo",
    order: 7,
    title: "Objetivos, currículo e intencionalidade",
    duration: 40,
    promise: "Escolher tecnologia e projeto porque ajudam uma aprendizagem, não apenas porque produzem algo chamativo.",
    why: "Quando o produto ocupa o lugar do objetivo, a turma pode concluir uma montagem sem compreender a lógica, o fenômeno ou a decisão envolvida.",
    learn: [
      "Diferenciar objetivo, atividade e produto final",
      "Formular evidências observáveis de aprendizagem",
      "Conectar projetos a diferentes áreas sem separar a turma por disciplina",
      "Reduzir o projeto sem perder o conceito central",
    ],
    practice: "Escolha três projetos do portal e escreva para cada um: o aluno aprenderá…, fará… e demonstrará que aprendeu quando…",
    readyWhen: [
      "O objetivo não começa apenas com montar, usar ou conhecer",
      "A avaliação observa raciocínio e não somente acabamento",
      "Consegue justificar por que cada recurso está na atividade",
    ],
    classroom: "Mostre o desafio e o critério de sucesso juntos. Os alunos precisam saber o que devem compreender, não apenas o que devem entregar.",
  },
  {
    id: "diagnostico-de-falhas",
    order: 8,
    title: "Diagnóstico técnico sem pânico",
    duration: 50,
    promise: "Localizar falhas de energia, conexão, código, sensor ou estrutura seguindo uma ordem simples.",
    why: "Mudar vários blocos e fios ao mesmo tempo apaga a evidência do problema. Uma rotina de diagnóstico devolve controle ao professor e autonomia ao aluno.",
    learn: [
      "Separar sintoma, hipótese, teste e correção",
      "Verificar alimentação, conexão, entrada, lógica e saída",
      "Testar sensor e atuador separadamente antes de integrar",
      "Reconhecer quando o defeito é físico e quando é do programa",
    ],
    practice: "Crie três falhas intencionais: cabo sem dados, bloco no evento errado e conexão frouxa. Diagnostique cada uma alterando somente um elemento por teste.",
    readyWhen: [
      "Não apaga o programa diante do primeiro erro",
      "Consegue dizer qual evidência confirmaria sua hipótese",
      "Usa o simulador para separar problema lógico de problema físico",
    ],
    classroom: "Mantenha no quadro a sequência: energia → conexão → entrada → lógica → saída. Peça que o grupo diga onde está antes de chamar o professor.",
  },
  {
    id: "inclusao-e-avaliacao",
    order: 9,
    title: "Inclusão, papéis e avaliação do processo",
    duration: 45,
    promise: "Garantir participação real e reconhecer aprendizagem mesmo quando grupos produzem soluções diferentes.",
    why: "Aula maker sem papéis claros costuma concentrar placa e computador em poucos alunos. Avaliar apenas o produto reforça essa desigualdade.",
    learn: [
      "Criar papéis rotativos e tarefas equivalentes",
      "Oferecer representação por fala, desenho, cartões ou blocos",
      "Avaliar previsão, estratégia, teste, correção e explicação",
      "Adaptar quantidade de passos sem reduzir a expectativa de raciocínio",
    ],
    practice: "Crie uma rubrica com quatro critérios: explicar a ideia, planejar, testar e melhorar. Depois distribua papéis para uma equipe de quatro pessoas.",
    readyWhen: [
      "Todos têm uma ação e uma decisão durante a aula",
      "O aluno pode demonstrar raciocínio por mais de uma forma",
      "O erro corrigido conta como evidência de aprendizagem",
    ],
    classroom: "Alterne a cada etapa quem lê, monta, programa, testa e registra. No fechamento, escolha ao acaso quem explicará a decisão do grupo.",
  },
  {
    id: "aula-de-certificacao",
    order: 10,
    title: "Aula de certificação do professor",
    duration: 100,
    promise: "Planejar, executar, explicar e adaptar uma aula completa antes de aplicá-la com os alunos.",
    why: "A segurança aparece quando o professor consegue tomar decisões diante de um problema, e não apenas quando conclui um tutorial.",
    learn: [
      "Escolher objetivo e atividade coerentes",
      "Preparar materiais e plano alternativo",
      "Explicar conceito, testar e depurar",
      "Adaptar por idade, tempo e quantidade de placas",
    ],
    practice: "Escolha uma aula pronta do portal, execute-a como aluno, registre dois erros possíveis e prepare uma versão para sua realidade de turma.",
    readyWhen: [
      "Consegue responder o que os alunos aprenderão",
      "Sabe o que pode dar errado e como diagnosticar",
      "Tem versão com uma placa e versão sem placa física",
    ],
    classroom: "Antes da primeira aplicação, faça um ensaio de vinte minutos com outro professor. Peça que ele siga somente seu roteiro e marque tudo o que precisou perguntar.",
  },
];

export function preparationModuleById(id: string): PreparationModule | undefined {
  return PREPARATION_MODULES.find((module) => module.id === id);
}
