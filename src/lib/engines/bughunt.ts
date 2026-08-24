export type TipoDeErro = "ordem" | "comando-ausente" | "comando-ambiguo" | "repeticao-errada";

export type Correcao = {
  texto: string;
  certa: boolean;
  /** Por que esta correção resolve — ou por que não resolve. As duas coisas ensinam. */
  porque: string;
};

export type AlgoritmoComDefeito = {
  id: string;
  titulo: string;
  enunciado: string;
  passos: string[];
  indiceDoDefeito: number;
  tipo: TipoDeErro;
  correcoes: Correcao[];
};

const CONCEITOS: Record<TipoDeErro, string> = {
  ordem: "Sequência",
  "comando-ausente": "Algoritmo completo",
  "comando-ambiguo": "Instrução precisa",
  "repeticao-errada": "Repetição",
};

export function conceitoDoTipo(tipo: TipoDeErro): string {
  return CONCEITOS[tipo];
}

/**
 * A dica de um apontamento errado nunca nomeia o passo defeituoso: entregar a
 * resposta na primeira tentativa transforma depuração em adivinhação sortuda.
 */
export function conferirApontamento(
  a: AlgoritmoComDefeito,
  indice: number,
): { certo: boolean; dica: string } {
  if (indice === a.indiceDoDefeito) {
    return {
      certo: true,
      dica: "É este mesmo. Agora escolha o que fazer com ele.",
    };
  }

  if (indice < 0 || indice >= a.passos.length) {
    return { certo: false, dica: "Esse passo não existe neste algoritmo." };
  }

  return {
    certo: false,
    dica: "Este passo está correto. Leia a sequência inteira em voz alta e veja em que ponto ela deixa de fazer sentido.",
  };
}

export function conferirCorrecao(
  a: AlgoritmoComDefeito,
  escolha: number,
): { certo: boolean; porque: string } {
  // O tipo promete uma correção em qualquer índice, mas a escolha vem da tela
  // e pode apontar para fora da lista.
  const c = a.correcoes[escolha];
  if (!c) return { certo: false, porque: "Essa opção não existe." };
  return { certo: c.certa, porque: c.porque };
}

/** Problemas de dados que quebrariam a atividade em silêncio. */
export function validarAlgoritmo(a: AlgoritmoComDefeito): string[] {
  const problemas: string[] = [];

  if (a.indiceDoDefeito < 0 || a.indiceDoDefeito >= a.passos.length) {
    problemas.push(`O índice do defeito (${a.indiceDoDefeito}) não existe na lista de passos.`);
  }

  if (a.correcoes.length < 2) {
    problemas.push("É preciso ter pelo menos duas opções de correção para haver escolha.");
  }

  const certas = a.correcoes.filter((c) => c.certa).length;
  if (certas !== 1) {
    problemas.push(`É preciso haver exatamente uma correção certa; foram encontradas ${certas}.`);
  }

  return problemas;
}
