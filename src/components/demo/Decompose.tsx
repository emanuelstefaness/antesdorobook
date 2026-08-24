import type { DemoSpec } from "@/lib/demo/types";

type Spec = Extract<DemoSpec, { kind: "decompose" }>;

/**
 * O todo em cima, as partes numeradas embaixo. A numeração não é enfeite: é o
 * que mostra que decompor produz uma ordem, não só uma pilha de pedaços.
 */
export function Decompose({ spec }: { spec: Spec }) {
  return (
    <figure
      className="rounded-block border-2 border-navy bg-cream-hi p-5 sm:p-7"
      role="img"
      aria-label={`${spec.whole}, dividido em ${spec.parts.length} partes: ${spec.parts.join("; ")}.`}
    >
      <div aria-hidden>
        <span className="label-mono text-navy/65">O todo</span>
        <p className="mt-1 font-display text-[clamp(1.1rem,2.4vw,1.5rem)] font-extrabold leading-tight tracking-display">
          {spec.whole}
        </p>

        <span className="mt-6 block label-mono text-navy/65">As partes</span>
        <ol className="mt-2 grid gap-2 sm:grid-cols-2">
          {spec.parts.map((parte, i) => (
            <li
              key={parte}
              className="flex gap-3 rounded-[3px] border-l-2 border-cyan bg-cream px-3 py-2.5 font-sans text-[13.5px] leading-snug text-navy"
            >
              <span className="label-mono text-navy/65">{String(i + 1).padStart(2, "0")}</span>
              {parte}
            </li>
          ))}
        </ol>
      </div>
    </figure>
  );
}
