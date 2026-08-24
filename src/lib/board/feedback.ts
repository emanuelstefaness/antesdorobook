import type { Evento } from "./types";

/** Só estes três eventos interrompem a execução — os outros são passos normais. */
export type EventoDeFalha = Extract<
  Evento,
  { tipo: "bateu-obstaculo" | "saiu-do-tabuleiro" | "bau-trancado" }
>;

export function ehFalha(evento: Evento): evento is EventoDeFalha {
  return (
    evento.tipo === "bateu-obstaculo" ||
    evento.tipo === "saiu-do-tabuleiro" ||
    evento.tipo === "bau-trancado"
  );
}

export type Desfecho =
  | { tipo: "vitoria"; pecas: number; minimo: number | null }
  | { tipo: "falha"; evento: EventoDeFalha }
  | { tipo: "terminou-sem-chegar" };

export type Mensagem = {
  titulo: string;
  texto: string;
  conceito: string;
  tom: "acerto" | "erro" | "atencao";
};

/**
 * Toda mensagem nomeia o conceito em jogo. "Errou" não ensina nada; "o robô
 * chegou ao baú antes da chave, e ordem importa" ensina sequência.
 */
export function mensagemDe(desfecho: Desfecho): Mensagem {
  if (desfecho.tipo === "vitoria") {
    // Nem toda atividade tem uma meta de otimização — o editor de desafios
    // do professor, por exemplo, não sabe de antemão qual é o menor caminho
    // do cenário que ele acabou de montar. `minimo: null` sinaliza isso: a
    // vitória é celebrada sem nenhuma comparação de contagem de peças.
    if (desfecho.minimo === null) {
      return {
        titulo: "Baú aberto!",
        texto: "O robô seguiu exatamente a sequência que você montou. Um algoritmo é isso: uma sequência de passos que resolve o problema.",
        conceito: "Algoritmo",
        tom: "acerto",
      };
    }
    if (desfecho.pecas <= desfecho.minimo) {
      return {
        titulo: "Baú aberto, e no menor caminho.",
        texto: `Você resolveu com ${desfecho.pecas} peças — o mínimo possível para este desafio. Um algoritmo é isso: a sequência mais curta que resolve o problema.`,
        conceito: "Algoritmo",
        tom: "acerto",
      };
    }
    return {
      titulo: "Baú aberto!",
      texto: `Funcionou com ${desfecho.pecas} peças. Dá para chegar lá com ${desfecho.minimo}. Procure trechos iguais repetidos: é neles que a peça REPITA economiza comandos.`,
      conceito: "Repetição",
      tom: "atencao",
    };
  }

  if (desfecho.tipo === "terminou-sem-chegar") {
    return {
      titulo: "A fila acabou antes do baú.",
      texto: "O robô executou tudo o que você montou e parou. Rode passo a passo para ver em que ponto o caminho se perdeu.",
      conceito: "Teste e depuração",
      tom: "atencao",
    };
  }

  switch (desfecho.evento.tipo) {
    case "bateu-obstaculo":
      return {
        titulo: "O robô bateu no obstáculo.",
        texto: "Ele fez exatamente o que você mandou — o problema está na instrução, não no robô. Volte um passo e veja onde faltou virar.",
        conceito: "Depuração",
        tom: "erro",
      };
    case "saiu-do-tabuleiro":
      return {
        titulo: "O robô tentou sair do tabuleiro.",
        texto: "Um AVANCE a mais e ele cai para fora. Computadores não param sozinhos no limite: a instrução precisa ser precisa.",
        conceito: "Instrução precisa",
        tom: "erro",
      };
    case "bau-trancado":
      return {
        titulo: "O baú está trancado.",
        texto: "O robô chegou ao baú, mas sem a chave. Passe pela chave antes: a ordem dos passos muda o resultado.",
        conceito: "Sequência",
        tom: "erro",
      };
  }
}
