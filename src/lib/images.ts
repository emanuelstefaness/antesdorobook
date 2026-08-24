export type ObjectKey = "robo" | "tabuleiro" | "chave" | "bau" | "microbit" | "placas";

/**
 * Caminho público de uma imagem. Aceita tanto o caminho já absoluto
 * (`/imagens/objetos/robo.png`) quanto o relativo à pasta de imagens
 * (`praticar/robo-humano.jpg`) — os arquivos de conteúdo usam a forma curta.
 */
export function caminhoImagem(src: string): string {
  return src.startsWith("/imagens/") ? src : `/imagens/${src.replace(/^\/+/, "")}`;
}

export const OBJETOS: Record<ObjectKey, { src: string; alt: string }> = {
  robo: { src: "/imagens/objetos/robo.png", alt: "Robô azul do kit sobre o tabuleiro de MDF" },
  tabuleiro: {
    src: "/imagens/objetos/tabuleiro.png",
    alt: "Tabuleiro de MDF 6 por 6 com o robô, o caminho luminoso, a chave e o baú",
  },
  chave: { src: "/imagens/objetos/chave.png", alt: "Chave dourada sobre um disco de madeira" },
  bau: { src: "/imagens/objetos/bau.png", alt: "Baú roxo fechado" },
  microbit: {
    src: "/imagens/objetos/microbit.png",
    alt: "Placa BBC micro:bit com um coração aceso na matriz de LEDs",
  },
  placas: {
    src: "/imagens/objetos/placas.png",
    alt: "Plaquinhas de comando em MDF: início, avance, repita 3x, vire e fim",
  },
};

export const HERO_IMAGE = {
  src: "/imagens/fotoparasite.png",
  alt: "Tabuleiro de MDF com robô azul percorrendo um caminho luminoso até a chave e o baú, ao lado das plaquinhas de comando e de uma placa micro:bit",
};
