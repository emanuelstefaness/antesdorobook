export type TeacherReadinessArea = {
  id: string;
  title: string;
  essential: string;
  quickCheck: string;
  beforeClass: string;
  learnHref: string;
};

export const TEACHER_READINESS: TeacherReadinessArea[] = [
  {
    id: "objetivo",
    title: "Objetivo de aprendizagem",
    essential: "Dizer em uma frase o que o aluno compreenderá ou conseguirá fazer — além de apenas montar um objeto.",
    quickCheck: "Consigo separar o que o aluno vai aprender do produto que ele vai construir?",
    beforeClass: "Escreva no quadro: hoje vamos aprender… e saberemos que conseguimos quando…",
    learnHref: "/preparar/objetivos-e-curriculo",
  },
  {
    id: "pensamento-computacional",
    title: "Pensamento computacional",
    essential: "Reconhecer sequência, decomposição, padrões, abstração e depuração em situações comuns.",
    quickCheck: "Consigo explicar algoritmo usando uma receita ou rotina, sem falar em código?",
    beforeClass: "Escolha um exemplo cotidiano que a turma já conhece e vivencie-o antes de nomear o conceito.",
    learnHref: "/preparar/pensamento-computacional",
  },
  {
    id: "blocos",
    title: "Programação em blocos",
    essential: "Ler eventos, sequência, repetição, condições e variáveis e prever o resultado antes de executar.",
    quickCheck: "Consigo apontar onde o programa começa, o que recebe e o que produz?",
    beforeClass: "Execute o programa no simulador, altere um bloco e confirme que você sabe explicar a diferença.",
    learnHref: "/preparar/programacao-em-blocos",
  },
  {
    id: "placa",
    title: "Partes do micro:bit",
    essential: "Distinguir entradas, saídas, sensores, comunicação, pinos e alimentação da placa.",
    quickCheck: "Consigo dar um exemplo de entrada → processamento → saída usando a placa?",
    beforeClass: "Confira a versão da placa e se o projeto depende de microfone, alto-falante ou logotipo da V2.",
    learnHref: "/preparar/conhecendo-o-microbit",
  },
  {
    id: "makecode",
    title: "Operação do MakeCode",
    essential: "Abrir, nomear, testar, salvar e transferir um projeto, além de trabalhar apenas no simulador.",
    quickCheck: "Consigo recuperar o projeto se a página fechar e transferir o arquivo .hex para a placa?",
    beforeClass: "Deixe o editor aberto, o projeto de demonstração salvo e uma cópia compartilhável preparada.",
    learnHref: "/preparar/makecode-na-pratica",
  },
  {
    id: "seguranca",
    title: "Conexões e segurança",
    essential: "Reconhecer 3V, GND, polaridade, curto-circuito e quando um motor precisa de alimentação adequada.",
    quickCheck: "Confiro a montagem com a placa desligada antes de energizar?",
    beforeClass: "Teste cabos, pilhas, jacarés e componentes; fotografe a ligação correta para usar como referência.",
    learnHref: "/preparar/eletricidade-e-seguranca",
  },
  {
    id: "depuracao",
    title: "Diagnóstico de problemas",
    essential: "Verificar energia, conexão, entrada, lógica e saída nessa ordem, alterando uma coisa por vez.",
    quickCheck: "Consigo investigar sem apagar o programa ou entregar a resposta ao grupo?",
    beforeClass: "Anote dois erros prováveis e a pergunta que ajudará o aluno a localizar cada um.",
    learnHref: "/preparar/diagnostico-de-falhas",
  },
  {
    id: "mediacao",
    title: "Mediação da aprendizagem",
    essential: "Fazer perguntas, aceitar estratégias diferentes e tratar o erro como evidência do raciocínio.",
    quickCheck: "Tenho perguntas para orientar sem dizer qual bloco ou peça usar?",
    beforeClass: "Prepare três perguntas: o que você esperava, o que aconteceu e qual parte pode testar primeiro?",
    learnHref: "/preparar/organizacao-da-aula-maker",
  },
  {
    id: "organizacao",
    title: "Organização da turma",
    essential: "Distribuir papéis, materiais e tempo, mantendo todos ativos mesmo com apenas uma placa.",
    quickCheck: "Quem planeja, programa, testa e registra? Quando os papéis mudam?",
    beforeClass: "Monte estações de papel, simulador, placa física e registro com tempo de revezamento visível.",
    learnHref: "/preparar/organizacao-da-aula-maker",
  },
];

export const TEACHER_DOES_NOT_NEED = [
  "Saber programação em texto ou decorar todos os blocos do MakeCode",
  "Conhecer eletrônica avançada ou consertar componentes danificados",
  "Ter uma placa por aluno ou dominar todos os sensores antes da primeira aula",
  "Ter resposta imediata para todo erro — pode investigar junto com a turma",
];

export const FIRST_CLASS_CHECKLIST = [
  "Objetivo de aprendizagem definido em uma frase",
  "Atividade testada do começo ao fim pelo professor",
  "Materiais separados por grupo e uma montagem de referência pronta",
  "Projeto do MakeCode nomeado, salvo e aberto no simulador",
  "Placa, cabo de dados e pilhas testados",
  "Plano para uma placa e plano alternativo sem hardware",
  "Papéis dos alunos e tempo de revezamento definidos",
  "Dois erros prováveis e perguntas de diagnóstico preparados",
  "Dez minutos reservados para testar, corrigir e compartilhar",
];
