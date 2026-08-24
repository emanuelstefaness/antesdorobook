import { describe, expect, it } from "vitest";
import { contarPecas } from "@/lib/board/expand";
import { avancarExecucao, criarExecucao } from "@/lib/board/runner";
import { conferirApontamento, conferirCorrecao, validarAlgoritmo } from "@/lib/engines/bughunt";
import { conferirOrdem, embaralhar } from "@/lib/engines/sequence";
import {
  DEFEITO_DEMO,
  GRID_DEMO,
  MINIMO_DEMO,
  PERMITIDOS_DEMO,
  PONTES_DEMO,
  SANDUICHE,
  SEMENTE_SANDUICHE,
  SOLUCAO_MINIMA_DEMO,
} from "./demoMotores";

describe("exemplo do SequenceBuilder", () => {
  it("a ordem embaralhada com a semente da página não entrega o gabarito", () => {
    const gabarito = SANDUICHE.map((p) => p.id);
    const inicial = embaralhar(SANDUICHE, SEMENTE_SANDUICHE);

    expect(inicial).not.toEqual(gabarito);
    // Mesmos ids, só que fora de ordem: um embaralhamento que perdesse ou
    // duplicasse um passo tornaria a atividade impossível de acertar.
    expect([...inicial].sort()).toEqual([...gabarito].sort());
  });

  it("a ordem declarada é a que o motor aceita como correta", () => {
    expect(conferirOrdem(SANDUICHE.map((p) => p.id), SANDUICHE)).toEqual({ ok: true });
  });

  it("cada passo explica por que vem onde vem", () => {
    for (const p of SANDUICHE) {
      expect(p.texto.length, p.id).toBeGreaterThan(0);
      expect(p.porque.length, p.id).toBeGreaterThan(0);
    }
    // Ids repetidos quebrariam o foco por teclado, que é indexado pelo id.
    expect(new Set(SANDUICHE.map((p) => p.id)).size).toBe(SANDUICHE.length);
  });
});

describe("exemplo do BugHunt", () => {
  it("passa pelo validador do motor", () => {
    expect(validarAlgoritmo(DEFEITO_DEMO)).toEqual([]);
  });

  it("apontar o índice declarado é o acerto, e qualquer outro passo não é", () => {
    expect(conferirApontamento(DEFEITO_DEMO, DEFEITO_DEMO.indiceDoDefeito).certo).toBe(true);

    for (let i = 0; i < DEFEITO_DEMO.passos.length; i++) {
      if (i === DEFEITO_DEMO.indiceDoDefeito) continue;
      expect(conferirApontamento(DEFEITO_DEMO, i).certo, `passo ${i}`).toBe(false);
    }
  });

  it("exatamente uma correção resolve, e toda opção explica o porquê", () => {
    const certas = DEFEITO_DEMO.correcoes.filter((_, i) => conferirCorrecao(DEFEITO_DEMO, i).certo);
    expect(certas).toHaveLength(1);

    for (const c of DEFEITO_DEMO.correcoes) {
      expect(c.texto.length).toBeGreaterThan(0);
      expect(c.porque.length).toBeGreaterThan(0);
    }
  });
});

describe("exemplo do LoopOptimizer", () => {
  const rodarAteOFim = () => {
    let e = criarExecucao(GRID_DEMO, SOLUCAO_MINIMA_DEMO);
    let voltas = 0;
    while (e.estado !== "terminado" && voltas < 200) {
      e = avancarExecucao(e, MINIMO_DEMO);
      voltas++;
    }
    return e;
  };

  it("a solução revelada vence de fato o cenário", () => {
    expect(rodarAteOFim().desfecho?.tipo).toBe("vitoria");
  });

  it("a solução revelada tem o mesmo tamanho que a meta anunciada", () => {
    // Se divergisse, a atividade prometeria “chegue com 5 peças” e mostraria
    // um gabarito de outro tamanho.
    expect(contarPecas(SOLUCAO_MINIMA_DEMO)).toBe(MINIMO_DEMO);
  });

  it("a solução revelada só usa peças que a bandeja oferece", () => {
    for (const comando of SOLUCAO_MINIMA_DEMO) {
      expect(PERMITIDOS_DEMO, comando).toContain(comando);
    }
  });
});

describe("pontes para a sala de aula", () => {
  it("todo exemplo diz o que fazer com a turma", () => {
    for (const [chave, texto] of Object.entries(PONTES_DEMO)) {
      expect(texto.length, chave).toBeGreaterThan(0);
    }
  });
});
