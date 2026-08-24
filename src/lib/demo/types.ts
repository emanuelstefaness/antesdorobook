import type { ImageSlot } from "@/data/types";
import type { CommandType, GridSpec } from "@/lib/board/types";

/**
 * Todo conceito e todo assunto tem uma demonstração no palco central. A
 * variante `image` existe justamente para não haver escapatória: quando não
 * cabe demonstração interativa, ainda assim é obrigatório mostrar algo, e
 * nenhuma página termina sendo só texto.
 */
export type DemoSpec =
  | {
      kind: "compare-order";
      correct: CommandType[];
      wrong: CommandType[];
      grid: GridSpec;
      explain: string;
    }
  | {
      kind: "io-flow";
      input: string;
      process: string;
      output: string;
      ledPattern: number[][];
    }
  | { kind: "decompose"; whole: string; parts: string[] }
  /**
   * Duas filas que fazem exatamente a mesma coisa, uma escrita comando por
   * comando e a outra com repetição. É a demonstração do conceito de repetição,
   * e é diferente de `pattern`: aquela mostra reconhecer o que se repete, esta
   * mostra o que se ganha ao dizer isso uma vez só.
   */
  | { kind: "loop-compress"; longa: CommandType[]; curta: CommandType[]; explain: string }
  | { kind: "pattern"; items: string[]; patternIndexes: number[] }
  | { kind: "led-matrix"; frames: number[][][]; caption: string }
  | { kind: "image"; slot: ImageSlot; caption: string };
