/** Anos do Fundamental, agrupados em duplas — é como o professor pensa a turma. */
export type AgeBand = "2-3" | "4-5" | "6-7" | "8-9";

/** Minutos. 100 = duas aulas geminadas. */
export type Duration = 15 | 30 | 50 | 100;

export type Material =
  | "nenhum"
  | "papel-e-lapis"
  | "cartoes"
  | "fita-crepe"
  | "tabuleiro"
  | "microbit"
  | "computador"
  | "reciclaveis";

/**
 * As fotos instrucionais ainda não existem — serão produzidas depois. Por isso
 * todo campo de imagem é `ImageSlot | null`: com `null` o componente cai no
 * objeto 3D de reserva com legenda, e nenhuma página quebra enquanto isso.
 */
export type ImageSlot = { src: string; alt: string };

export type Ref = { label: string; href: string };
