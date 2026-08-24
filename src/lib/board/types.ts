/** As oito peças físicas do kit. INICIO e FIM são marcadores, não movimento. */
export type CommandType =
  | "INICIO"
  | "AVANCE"
  | "VIRE_DIREITA"
  | "VIRE_ESQUERDA"
  | "REPITA_2X"
  | "REPITA_3X"
  | "REPITA_4X"
  | "FIM";

/** O que sobra depois de expandir as repetições: só movimento. */
export type Instrucao = "AVANCE" | "VIRE_DIREITA" | "VIRE_ESQUERDA";

export type Direcao = "norte" | "leste" | "sul" | "oeste";

export type Posicao = { linha: number; coluna: number };

export type GridSpec = {
  linhas: number;
  colunas: number;
  robo: Posicao;
  direcaoInicial: Direcao;
  chave: Posicao | null;
  bau: Posicao | null;
  obstaculos: Posicao[];
};

export type EstadoRobo = {
  posicao: Posicao;
  direcao: Direcao;
  temChave: boolean;
};

export type Evento =
  | { tipo: "andou" }
  | { tipo: "girou" }
  | { tipo: "pegou-chave" }
  | { tipo: "abriu-bau" }
  | { tipo: "bateu-obstaculo" }
  | { tipo: "saiu-do-tabuleiro" }
  | { tipo: "bau-trancado" };

export type ErroMontagem = { indice: number; mensagem: string };
