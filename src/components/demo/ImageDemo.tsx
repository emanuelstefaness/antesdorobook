import Image from "next/image";
import type { DemoSpec } from "@/lib/demo/types";
import { caminhoImagem } from "@/lib/images";

type Spec = Extract<DemoSpec, { kind: "image" }>;

/**
 * A imagem aparece grande e no fluxo da página, deliberadamente FORA de card:
 * é exigência do briefing, e um enquadramento pesado em volta de uma foto
 * instrucional só rouba atenção do que ela mostra.
 */
export function ImageDemo({ spec }: { spec: Spec }) {
  return (
    <figure>
      <Image
        unoptimized
        src={caminhoImagem(spec.slot.src)}
        alt={spec.slot.alt}
        width={1400}
        height={900}
        className="h-auto w-full rounded-block object-cover"
      />
      <figcaption className="mt-3 font-sans text-[13px] leading-relaxed text-navy/70">
        {spec.caption}
      </figcaption>
    </figure>
  );
}
