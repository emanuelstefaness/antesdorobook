import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contarPecas } from "@/lib/board/expand";
import { avancarExecucao, criarExecucao } from "@/lib/board/runner";
import type { CommandType, GridSpec } from "@/lib/board/types";
import { validarAlgoritmo } from "@/lib/engines/bughunt";
import { embaralhar } from "@/lib/engines/sequence";
import { ACTIVITIES, atividadePorId, atividadesDoNivel } from "./activities";

const IDS_ESPERADOS = [
  "algoritmo-do-sanduiche",
  "sequencia-de-movimentos",
  "desenho-por-comandos",
  "programe-o-professor",
  "robo-humano",
  "caca-ao-tesouro",
  "comandos-com-palmas",
  "sequencias-repetidas",
  "economize-comandos",
  "encontre-o-erro",
  "corrija-o-caminho",
  "instrucoes-ambiguas",
];

/** Os 10 ids de conceito da spec. Um `relatedConcept` fora desta lista é 404. */
const IDS_DE_CONCEITO = [
  "o-que-e-pensamento-computacional",
  "por-que-ensinar-pensamento-computacional",
  "sequencia-e-instrucoes",
  "entrada-processamento-e-saida",
  "decomposicao",
  "reconhecimento-de-padroes",
  "abstracao",
  "algoritmos",
  "teste-e-depuracao",
  "o-erro-como-parte-da-aprendizagem",
];

/**
 * Roda a fila pelo motor de verdade até parar, e diz se venceu. Um teste que
 * apenas leia os dados não pega o defeito que mais importa: na Etapa 2 um
 * desafio foi publicado impossível de resolver, e nenhuma revisão de leitura
 * percebeu — só executar percebe.
 */
function venceExecutando(grid: GridSpec, fila: CommandType[]): boolean {
  let exec = criarExecucao(grid, fila);
  // Limite alto o bastante para qualquer solução destes cenários, e finito para
  // que um dado defeituoso falhe o teste em vez de travar a suíte.
  for (let i = 0; i < 500 && exec.estado !== "terminado"; i += 1) {
    exec = avancarExecucao(exec, null);
  }
  return exec.desfecho?.tipo === "vitoria";
}

describe("ACTIVITIES", () => {
  it("tem as 12 atividades da spec, na ordem e nos níveis certos", () => {
    expect(ACTIVITIES.map((a) => a.id)).toEqual(IDS_ESPERADOS);
    expect(ACTIVITIES.map((a) => a.level)).toEqual([1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4]);
    for (const nivel of [1, 2, 3, 4] as const) {
      expect(atividadesDoNivel(nivel), `nível ${nivel}`).toHaveLength(3);
    }
  });

  it("toda solução declarada vence o cenário quando executada pelo motor", () => {
    for (const a of ACTIVITIES) {
      if (a.engine.motor !== "command-runner" && a.engine.motor !== "loop-optimizer") continue;
      expect(
        venceExecutando(a.engine.grid, a.engine.solucaoMinima),
        `${a.id}: a solução declarada não chega ao baú`,
      ).toBe(true);
    }
  });

  it("toda solução declarada tem exatamente o número de peças do mínimo", () => {
    for (const a of ACTIVITIES) {
      if (a.engine.motor !== "command-runner" && a.engine.motor !== "loop-optimizer") continue;
      if (a.engine.minimo === null) continue;
      expect(contarPecas(a.engine.solucaoMinima), `${a.id}`).toBe(a.engine.minimo);
    }
  });

  it("toda solução declarada usa apenas peças permitidas na atividade", () => {
    // Uma solução que use uma peça fora da bandeja é impossível de reproduzir:
    // o professor lê o gabarito e não encontra a peça na tela.
    for (const a of ACTIVITIES) {
      if (a.engine.motor !== "command-runner" && a.engine.motor !== "loop-optimizer") continue;
      for (const peca of a.engine.solucaoMinima) {
        expect(a.engine.permitidos, `${a.id} usa ${peca}`).toContain(peca);
      }
    }
  });

  it("todo algoritmo com defeito é estruturalmente válido", () => {
    for (const a of ACTIVITIES) {
      if (a.engine.motor !== "bug-hunt") continue;
      expect({ id: a.id, erros: validarAlgoritmo(a.engine.algoritmo) }).toEqual({
        id: a.id,
        erros: [],
      });
    }
  });

  it("os algoritmos com defeito usam tipos de erro diferentes entre si", () => {
    // Três atividades com o mesmo tipo de defeito ensinariam a mesma coisa com
    // roupa diferente, e o nível de depuração perderia a progressão.
    const tipos = ACTIVITIES.filter((a) => a.engine.motor === "bug-hunt").map((a) =>
      a.engine.motor === "bug-hunt" ? a.engine.algoritmo.tipo : null,
    );
    expect(new Set(tipos).size).toBe(tipos.length);
  });

  it("nenhuma sequência embaralhada já começa resolvida", () => {
    for (const a of ACTIVITIES) {
      if (a.engine.motor !== "sequence-builder") continue;
      const ordem = embaralhar(a.engine.passos, a.engine.semente);
      const gabarito = a.engine.passos.map((p) => p.id);
      expect(ordem, `${a.id}`).not.toEqual(gabarito);
      expect([...ordem].sort(), `${a.id}: ids diferentes do gabarito`).toEqual(
        [...gabarito].sort(),
      );
    }
  });

  it("todo conceito relacionado e toda continuidade apontam para rota existente", () => {
    for (const a of ACTIVITIES) {
      const idDoConceito = a.relatedConcept.href.replace("/aprender/", "");
      expect(IDS_DE_CONCEITO, `${a.id} → ${a.relatedConcept.href}`).toContain(idDoConceito);

      const destino = a.continuity.href;
      if (destino.startsWith("/praticar/")) {
        expect(atividadePorId(destino.replace("/praticar/", "")), `${a.id} → ${destino}`).toBeDefined();
      } else {
        expect(destino.startsWith("/")).toBe(true);
      }
    }
  });

  it("todo campo de condução de aula está preenchido no mínimo exigido", () => {
    for (const a of ACTIVITIES) {
      for (const campo of [
        "title",
        "summary",
        "objective",
        "whyApply",
        "preparation",
        "opening",
      ] as const) {
        expect(a[campo].trim().length, `${a.id}.${campo} vazio`).toBeGreaterThan(0);
      }
      expect(a.steps.length, `${a.id}.steps`).toBeGreaterThanOrEqual(4);
      expect(a.mediatingQuestions.length, `${a.id}.mediatingQuestions`).toBeGreaterThanOrEqual(2);
      expect(a.difficulties.length, `${a.id}.difficulties`).toBeGreaterThanOrEqual(2);
      expect(a.assessment.length, `${a.id}.assessment`).toBeGreaterThanOrEqual(2);
      expect(a.ageBands.length, `${a.id}.ageBands`).toBeGreaterThan(0);
      expect(a.materials.length, `${a.id}.materials`).toBeGreaterThan(0);
    }
  });

  it("toda atividade traz adaptação para turma nova, turma grande e falta de material", () => {
    // O briefing exige os três casos. Sem eles a atividade só serve à turma
    // ideal, que é justamente a que o professor não tem.
    for (const a of ACTIVITIES) {
      expect(a.adaptations.length, `${a.id}.adaptations`).toBeGreaterThanOrEqual(3);
    }
  });
});

describe("fotos das atividades", () => {
  it("o arquivo de cada foto existe mesmo na pasta pública", () => {
    // É o único defeito de foto que teste pega: um nome errado não quebra o
    // build nem o tipo, só aparece como imagem furada na tela de quem abrir.
    for (const a of ACTIVITIES) {
      expect(a.image, `${a.id} está sem foto`).not.toBeNull();
      const caminho = join(process.cwd(), "public", "imagens", a.image!.src);
      expect(existsSync(caminho), `${a.id} aponta para ${a.image!.src}, que não existe`).toBe(true);
    }
  });

  it("o texto alternativo descreve a cena e não se anuncia como foto", () => {
    // "Foto de..." é ruído: o leitor de tela já avisa que ali existe uma
    // imagem. E um alt de meia dúzia de palavras não substitui a foto para
    // quem não a vê — descreve o suficiente para saber que ela está lá.
    for (const a of ACTIVITIES) {
      const alt = a.image!.alt;
      expect(alt.split(/\s+/).length, `${a.id} tem alt curto demais`).toBeGreaterThanOrEqual(12);
      expect(/^(foto|imagem|fotografia)\b/i.test(alt), `${a.id}: "${alt.slice(0, 30)}…"`).toBe(
        false,
      );
    }
  });
});
