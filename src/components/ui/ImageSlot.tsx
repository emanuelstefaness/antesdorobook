import Image from "next/image";
import { OBJETOS, caminhoImagem, type ObjectKey } from "@/lib/images";

export type ImageSlotData = { src: string; alt: string } | null;

type Props = {
  slot: ImageSlotData;
  /**
   * Objeto de reserva para quando a foto ainda não existe. É opcional de
   * propósito: sem ele, o slot vazio não desenha nada. Uma foto genérica no
   * lugar da foto certa não informa — só ocupa espaço e faz a página parecer
   * pronta quando não está.
   */
  fallback?: ObjectKey;
  caption?: string;
  priority?: boolean;
  className?: string;
};

export function ImageSlot({ slot, fallback, caption, priority = false, className = "" }: Props) {
  const objeto = slot ?? (fallback ? OBJETOS[fallback] : null);
  if (objeto === null) return null;

  const usandoFoto = slot !== null;
  const imagem = { src: caminhoImagem(objeto.src), alt: objeto.alt };

  return (
    <figure className={className}>
      <div className="relative overflow-hidden rounded-block">
        <Image
          unoptimized
          src={imagem.src}
          alt={imagem.alt}
          width={1600}
          height={1067}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={
            usandoFoto
              ? "h-auto w-full object-cover"
              : "h-auto w-full object-contain drop-shadow-object"
          }
        />
      </div>
      {caption ? (
        <figcaption className="mt-2 font-sans text-[12px] leading-snug text-navy/65">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
