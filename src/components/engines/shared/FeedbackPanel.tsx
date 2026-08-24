import type { Mensagem } from "@/lib/board/feedback";
import type { ErroMontagem } from "@/lib/board/types";

const TOM: Record<Mensagem["tom"], string> = {
  // green = acerto/verificação dentro da atividade; purple fica reservado
  // para destino/fim de etapa, que é o que a jornada usa.
  acerto: "border-green bg-green/10",
  erro: "border-led bg-led/10",
  atencao: "border-amber bg-amber/10",
};

export function FeedbackPanel({
  mensagem,
  erro,
}: {
  mensagem: Mensagem | null;
  erro: ErroMontagem | null;
}) {
  // A região é montada sempre: uma região live criada junto com seu conteúdo
  // não é anunciada de forma confiável pelos leitores de tela.
  return (
    <div aria-live="polite" className="min-h-[1px]">
      {erro ? (
        <div className="rounded-block border-2 border-led bg-led/10 p-4">
          <p className="font-display text-[15px] font-bold tracking-display text-navy">
            A sequência não pode rodar assim.
          </p>
          <p className="mt-1 font-sans text-[13px] leading-relaxed text-navy/70">{erro.mensagem}</p>
        </div>
      ) : null}

      {mensagem ? (
        <div className={`rounded-block border-2 p-4 ${TOM[mensagem.tom]}`}>
          <span className="label-mono text-navy/65">Conceito: {mensagem.conceito}</span>
          <p className="mt-2 font-display text-[16px] font-bold tracking-display text-navy">
            {mensagem.titulo}
          </p>
          <p className="mt-1 font-sans text-[13px] leading-relaxed text-navy/70">{mensagem.texto}</p>
        </div>
      ) : null}
    </div>
  );
}
