import type { DemoSpec } from "@/lib/demo/types";

type Spec = Extract<DemoSpec, { kind: "pattern" }>;

/**
 * Os itens em sequência, com os que formam o padrão destacados. Usa <mark>
 * porque o destaque aqui é semântico — quem lê com leitor de tela precisa
 * saber quais itens se repetem, e cor sozinha não transmite isso.
 */
export function PatternDemo({ spec }: { spec: Spec }) {
  const destacados = new Set(spec.patternIndexes);

  return (
    <figure className="rounded-block border-2 border-navy bg-cream-hi p-5 sm:p-7">
      <ol className="flex flex-wrap gap-2">
        {spec.items.map((item, i) => {
          const noPadrao = destacados.has(i);
          return (
            <li key={`${item}-${i}`}>
              {noPadrao ? (
                <mark className="block rounded-[3px] border-2 border-navy bg-amber/25 px-3 py-2 font-sans text-[13.5px] text-navy">
                  {item}
                </mark>
              ) : (
                <span className="block rounded-[3px] border-2 border-navy/20 px-3 py-2 font-sans text-[13.5px] text-navy/70">
                  {item}
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-4 font-sans text-[13px] leading-relaxed text-navy/70">
        {spec.patternIndexes.length} dos {spec.items.length} itens formam o padrão. Reconhecer o que
        se repete é o que permite resolver de uma vez o que parecia ser vários problemas.
      </figcaption>
    </figure>
  );
}
