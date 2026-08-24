import { describe, expect, it } from "vitest";
import {
  conceitoDoTipo,
  conferirApontamento,
  conferirCorrecao,
  validarAlgoritmo,
  type AlgoritmoComDefeito,
} from "./bughunt";

const algoritmo: AlgoritmoComDefeito = {
  id: "sanduiche-sem-abrir",
  titulo: "O sanduíche que ninguém consegue montar",
  enunciado: "Este algoritmo parece certo, mas trava na hora de executar. Qual passo está errado?",
  passos: [
    "Pegar duas fatias de pão",
    "Fechar o sanduíche",
    "Passar o recheio",
    "Cortar ao meio",
  ],
  indiceDoDefeito: 1,
  tipo: "ordem",
  correcoes: [
    {
      texto: "Trocar este passo de lugar com o próximo",
      certa: true,
      porque: "O recheio precisa entrar com o sanduíche ainda aberto. Fechar antes inverte a ordem.",
    },
    {
      texto: "Apagar este passo",
      certa: false,
      porque: "Sem fechar, o sanduíche não fica pronto. O passo é necessário — só está no lugar errado.",
    },
    {
      texto: "Repetir este passo duas vezes",
      certa: false,
      porque: "Repetir não resolve uma ordem trocada: o recheio continuaria ficando de fora.",
    },
  ],
};

describe("conferirApontamento", () => {
  it("aceita o passo defeituoso", () => {
    const r = conferirApontamento(algoritmo, 1);
    expect(r.certo).toBe(true);
    expect(r.dica.length).toBeGreaterThan(0);
  });

  it("recusa um passo correto e dá uma dica sem entregar a resposta", () => {
    const r = conferirApontamento(algoritmo, 0);
    expect(r.certo).toBe(false);
    expect(r.dica).not.toContain("Fechar o sanduíche");
  });

  it("recusa um índice fora da lista sem quebrar", () => {
    expect(conferirApontamento(algoritmo, 99).certo).toBe(false);
    expect(conferirApontamento(algoritmo, -1).certo).toBe(false);

    // Um índice inexistente não é "um passo que está correto": a dica precisa
    // dizer que o passo não existe, senão o professor procura um erro num
    // lugar que nem faz parte do algoritmo.
    expect(conferirApontamento(algoritmo, 99).dica).toContain("não existe");
  });
});

describe("conferirCorrecao", () => {
  it("aceita a correção certa e explica por quê", () => {
    const r = conferirCorrecao(algoritmo, 0);
    expect(r.certo).toBe(true);
    expect(r.porque).toContain("aberto");
  });

  it("recusa uma correção errada e explica por que ela não resolve", () => {
    const r = conferirCorrecao(algoritmo, 2);
    expect(r.certo).toBe(false);
    expect(r.porque.length).toBeGreaterThan(0);
    // O porquê tem que ser o da opção escolhida, não uma recusa genérica.
    expect(r.porque).toBe(algoritmo.correcoes[2].porque);
  });

  it("recusa uma escolha fora da lista sem quebrar", () => {
    expect(conferirCorrecao(algoritmo, 99).certo).toBe(false);
  });
});

describe("conceitoDoTipo", () => {
  it("dá um conceito para cada um dos quatro tipos", () => {
    for (const t of ["ordem", "comando-ausente", "comando-ambiguo", "repeticao-errada"] as const) {
      expect(conceitoDoTipo(t).length, t).toBeGreaterThan(0);
    }
  });
});

describe("validarAlgoritmo", () => {
  it("não reclama de um algoritmo bem formado", () => {
    expect(validarAlgoritmo(algoritmo)).toEqual([]);
  });

  it("reclama quando o índice do defeito não existe", () => {
    const ruim = { ...algoritmo, indiceDoDefeito: 9 };
    expect(validarAlgoritmo(ruim).join(" ")).toContain("índice");

    const negativo = { ...algoritmo, indiceDoDefeito: -1 };
    expect(validarAlgoritmo(negativo).join(" ")).toContain("índice");
  });

  it("reclama quando não há exatamente uma correção certa", () => {
    const nenhuma = {
      ...algoritmo,
      correcoes: algoritmo.correcoes.map((c) => ({ ...c, certa: false })),
    };
    expect(validarAlgoritmo(nenhuma).join(" ")).toContain("uma correção certa");

    const duas = {
      ...algoritmo,
      correcoes: algoritmo.correcoes.map((c) => ({ ...c, certa: true })),
    };
    expect(validarAlgoritmo(duas).join(" ")).toContain("uma correção certa");
  });

  it("reclama quando há menos de duas opções de correção", () => {
    const uma = { ...algoritmo, correcoes: [algoritmo.correcoes[0]] };
    expect(validarAlgoritmo(uma).join(" ")).toContain("duas opções");
  });
});
