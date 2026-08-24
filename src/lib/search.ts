import { ACTIVITIES } from "@/data/activities";
import { CONCEPTS } from "@/data/concepts";
import { GLOSSARY, normalizar } from "@/data/glossary";
import { LESSON_PLANS } from "@/data/lessonPlans";
import { MICROBIT_PARTS } from "@/data/microbit";
import { QUICK_HELP } from "@/data/quickHelp";
import { PREPARATION_MODULES } from "@/data/preparation";
import { ROBOTICS_CONCEPTS } from "@/data/robotics";
import { ROBOTICS_COMPONENTS } from "@/data/roboticsComponents";

export type SearchKind =
  | "conceito"
  | "atividade"
  | "plano"
  | "peca"
  | "termo"
  | "ajuda"
  | "formacao"
  | "robotica"
  | "componente";

export const NOMES_DOS_RESULTADOS: Record<SearchKind, string> = {
  conceito: "Conceito",
  atividade: "Atividade",
  plano: "Plano de aula",
  peca: "Peça da placa",
  termo: "Glossário",
  ajuda: "Ajuda rápida",
  formacao: "Formação do professor",
  robotica: "Fundamento de robótica",
  componente: "Sensor ou componente",
};

export type SearchResult = {
  chave: string;
  kind: SearchKind;
  title: string;
  href: string;
  trecho: string;
};

type Entrada = SearchResult & {
  /** Tudo que é pesquisável fora do título, já concatenado. */
  corpo: string;
};

/**
 * Comprimento mínimo da consulta.
 *
 * Com uma letra só a busca devolveria quase o catálogo inteiro, o que é pior
 * que não devolver nada: a lista de tudo não responde nada e ainda faz o
 * professor rolar. Duas letras já separam.
 */
export const MINIMO_DA_CONSULTA = 2;

function entrada(
  kind: SearchKind,
  id: string,
  title: string,
  href: string,
  trecho: string,
  corpo: string[],
): Entrada {
  return { chave: `${kind}:${id}`, kind, title, href, trecho, corpo: corpo.join(" ") };
}

/**
 * O índice é montado uma vez, no módulo. São poucas centenas de registros de
 * conteúdo estático: não vale a complexidade de um índice invertido, e varrer
 * a lista mantém o comportamento óbvio de ler no código.
 */
const INDICE: Entrada[] = [
  ...CONCEPTS.map((c) =>
    // `howToExplain` e `everydayExample` entram porque são o que o professor
    // lembra depois: ninguém guarda "decomposição", guarda "aquele do cadarço".
    entrada("conceito", c.id, c.title, `/aprender/${c.id}`, c.summary, [
      c.summary,
      c.willLearn,
      c.everydayExample,
      c.howToExplain,
      c.whyTeacher,
    ]),
  ),
  ...ACTIVITIES.map((a) =>
    entrada("atividade", a.id, a.title, `/praticar/${a.id}`, a.summary, [
      a.summary,
      a.objective,
      a.whyApply,
      a.opening,
    ]),
  ),
  ...LESSON_PLANS.map((p) =>
    entrada("plano", p.id, p.title, `/planejar/${p.id}`, p.objective, [p.objective, p.theme]),
  ),
  ...MICROBIT_PARTS.map((m) =>
    entrada("peca", m.id, m.name, `/microbit#${m.id}`, m.fn, [m.fn, m.example, m.caution]),
  ),
  ...GLOSSARY.map((g) =>
    entrada("termo", g.id, g.term, `/glossario#${g.id}`, g.plain, [g.plain, g.confusion]),
  ),
  ...QUICK_HELP.map((q) =>
    entrada("ajuda", q.id, q.problem, `/ajuda-rapida#${q.area}`, q.now, [q.now, q.later]),
  ),
  ...PREPARATION_MODULES.map((m) =>
    entrada("formacao", m.id, m.title, `/preparar/${m.id}`, m.promise, [
      m.promise,
      m.why,
      m.practice,
      ...m.learn,
    ]),
  ),
  ...ROBOTICS_CONCEPTS.map((conceito) =>
    entrada("robotica", conceito.id, conceito.title, `/robotica#${conceito.id}`, conceito.plain, [
      conceito.plain,
      conceito.teacherNeeds,
      conceito.howToExplain,
      conceito.practice,
      conceito.example,
    ]),
  ),
  ...ROBOTICS_COMPONENTS.map((item) =>
    entrada("componente", item.id, item.name, `/componentes#${item.id}`, item.purpose, [
      item.what,
      item.purpose,
      ...item.recognize,
      ...item.usedIn,
      ...item.safety,
    ]),
  ),
];

/** Só para o teste conseguir afirmar sobre o catálogo inteiro. */
export function tamanhoDoIndice(): number {
  return INDICE.length;
}

/**
 * Título vale mais que corpo.
 *
 * Quem digita "depuração" quer a página que é sobre depuração, não as sete que
 * mencionam a palavra de passagem. Sem esse desempate a página certa aparece no
 * meio da lista, e o professor conclui que a busca não achou.
 */
function pontuar(e: Entrada, consulta: string): number {
  if (normalizar(e.title).includes(consulta)) return 2;
  if (normalizar(e.corpo).includes(consulta)) return 1;
  return 0;
}

export function buscar(texto: string): SearchResult[] {
  const consulta = normalizar(texto);
  if (consulta.length < MINIMO_DA_CONSULTA) return [];

  return INDICE.map((e) => ({ e, p: pontuar(e, consulta) }))
    .filter((x) => x.p > 0)
    .sort((a, b) => b.p - a.p)
    .map(({ e }) => ({
      chave: e.chave,
      kind: e.kind,
      title: e.title,
      href: e.href,
      trecho: e.trecho,
    }));
}
