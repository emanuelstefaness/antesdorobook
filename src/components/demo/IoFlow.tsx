import type { ReactNode } from "react";
import type { DemoSpec } from "@/lib/demo/types";

type Spec = Extract<DemoSpec, { kind: "io-flow" }>;

function Seta() {
  return (
    <div aria-hidden className="flex items-center justify-center sm:w-8">
      {/* Em telas estreitas os três blocos empilham, então a seta gira 90° e
          continua apontando para o próximo bloco — uma seta para a direita
          numa pilha vertical indicaria a leitura errada do fluxo. */}
      <span className="rotate-90 text-[20px] leading-none text-navy/65 sm:rotate-0">→</span>
    </div>
  );
}

function Bloco({
  etapa,
  texto,
  children,
}: {
  etapa: string;
  texto: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col gap-2 rounded-block border-2 border-navy/15 bg-cream-hi p-4">
      <p className="label-mono text-navy/65">{etapa}</p>
      <p className="font-sans text-[14px] font-semibold leading-snug text-navy">{texto}</p>
      {children}
    </div>
  );
}

function MatrizDeLeds({ padrao, descricao }: { padrao: number[][]; descricao: string }) {
  const acesos = padrao.reduce(
    (total, linha) => total + linha.filter((led) => led === 1).length,
    0,
  );

  return (
    <div
      role="img"
      aria-label={`Matriz de 5 por 5 LEDs com ${acesos} ${acesos === 1 ? "luz acesa" : "luzes acesas"}, mostrando a saída: ${descricao}.`}
      className="mt-1 grid w-full max-w-[150px] grid-cols-5 gap-1 rounded-block bg-cream p-2"
    >
      {padrao.flatMap((linha, l) =>
        linha.map((led, c) => (
          <span
            key={`${l}-${c}`}
            aria-hidden
            className={[
              "aspect-square rounded-[2px]",
              led === 1 ? "bg-led" : "bg-navy/15",
            ].join(" ")}
          />
        )),
      )}
    </div>
  );
}

/**
 * Entrada → processamento → saída, com a saída mostrada na matriz de LEDs do
 * micro:bit. Os três textos ficam como texto de verdade (e não dentro de um
 * role="img") porque cada um é conteúdo que o professor lê; só a matriz, que
 * como árvore de elementos não diz nada, vira uma imagem com descrição.
 */
export function IoFlow({ spec }: { spec: Spec }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
      <Bloco etapa="Entrada" texto={spec.input} />
      <Seta />
      <Bloco etapa="Processamento" texto={spec.process} />
      <Seta />
      <Bloco etapa="Saída" texto={spec.output}>
        <MatrizDeLeds padrao={spec.ledPattern} descricao={spec.output} />
      </Bloco>
    </div>
  );
}
