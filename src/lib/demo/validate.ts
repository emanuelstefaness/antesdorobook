import { contarPecas, expandir } from "@/lib/board/expand";
import type { DemoSpec } from "./types";

/** O micro:bit tem 5x5 LEDs; qualquer outro tamanho não é representável nele. */
const LADO_DA_MATRIZ = 5;

/**
 * Devolve a lista de problemas encontrados — vazia quer dizer válido. Os testes
 * de conteúdo rodam isto em todos os registros, então um dado malformado falha
 * na suíte e não na cara do professor.
 */
export function validarDemo(d: DemoSpec): string[] {
  const erros: string[] = [];

  switch (d.kind) {
    case "compare-order": {
      if (d.correct.length === 0) erros.push("compare-order: a fila certa está vazia");
      if (d.wrong.length === 0) erros.push("compare-order: a fila errada está vazia");
      // Sem esta guarda a demonstração se contradiz: ela promete mostrar que a
      // ordem muda o resultado, e mostra duas filas idênticas.
      const iguais =
        d.correct.length === d.wrong.length && d.correct.every((c, i) => c === d.wrong[i]);
      if (iguais) erros.push("compare-order: a fila errada é igual à certa");
      if (d.explain.trim().length === 0) erros.push("compare-order: explain é obrigatório");
      break;
    }
    case "io-flow": {
      if (!d.input.trim() || !d.process.trim() || !d.output.trim()) {
        erros.push("io-flow: input, process e output não podem ser vazios");
      }
      erros.push(...problemasDaMatriz(d.ledPattern, "io-flow", 0));
      break;
    }
    case "decompose": {
      if (!d.whole.trim()) erros.push("decompose: whole é obrigatório");
      if (d.parts.length < 2) erros.push("decompose: precisa de pelo menos 2 partes");
      break;
    }
    case "pattern": {
      if (d.items.length < 3) erros.push("pattern: precisa de pelo menos 3 itens");
      if (d.patternIndexes.length === 0) erros.push("pattern: nenhum índice destacado");
      for (const i of d.patternIndexes) {
        if (i < 0 || i >= d.items.length) {
          erros.push(`pattern: índice ${i} não existe em items`);
        }
      }
      break;
    }
    case "loop-compress": {
      // A demonstração inteira afirma que as duas filas fazem a mesma coisa.
      // Se não fizerem, ela ensina uma mentira — e é uma mentira que ninguém
      // percebe no navegador, porque as duas filas só ficam paradas na tela.
      // Por isso a conferência roda o expansor de verdade, o mesmo do kit.
      const longa = expandir(d.longa);
      const curta = expandir(d.curta);

      if (!longa.ok) erros.push("loop-compress: a fila longa não expande");
      if (!curta.ok) erros.push("loop-compress: a fila curta não expande");

      if (longa.ok && curta.ok) {
        const iguais =
          longa.instrucoes.length === curta.instrucoes.length &&
          longa.instrucoes.every((c, i) => c === curta.instrucoes[i]);
        if (!iguais) erros.push("loop-compress: as duas filas não fazem a mesma coisa");
      }

      // Sem isto a "compressão" pode não comprimir nada — e em trecho de um
      // comando só o REPITA chega a aumentar a fila, que é a confusão comum
      // registrada no glossário.
      if (contarPecas(d.curta) >= contarPecas(d.longa)) {
        erros.push("loop-compress: a fila curta não é menor que a longa");
      }

      if (!d.curta.some((c) => c.startsWith("REPITA"))) {
        erros.push("loop-compress: a fila curta não usa repetição");
      }

      if (!d.explain.trim()) erros.push("loop-compress: explain é obrigatório");
      break;
    }
    case "led-matrix": {
      if (d.frames.length === 0) erros.push("led-matrix: nenhum quadro");
      d.frames.forEach((frame, i) => erros.push(...problemasDaMatriz(frame, "led-matrix", i)));
      if (!d.caption.trim()) erros.push("led-matrix: caption é obrigatório");
      break;
    }
    case "image": {
      if (!d.slot.alt.trim()) erros.push("image: alt é obrigatório");
      if (!d.slot.src.trim()) erros.push("image: src é obrigatório");
      if (!d.caption.trim()) erros.push("image: caption é obrigatório");
      break;
    }
  }

  return erros;
}

function problemasDaMatriz(matriz: number[][], origem: string, indice: number): string[] {
  const quadrada =
    matriz.length === LADO_DA_MATRIZ && matriz.every((linha) => linha.length === LADO_DA_MATRIZ);
  if (!quadrada) return [`${origem}: quadro ${indice} não é 5x5`];

  const soZeroEUm = matriz.every((linha) => linha.every((v) => v === 0 || v === 1));
  return soZeroEUm ? [] : [`${origem}: quadro ${indice} tem valor fora de 0/1`];
}
