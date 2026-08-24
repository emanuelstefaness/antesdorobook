"use client";

import { useJourney } from "@/lib/useProgress";
import { Button } from "@/components/ui/Button";

/**
 * O anel de progresso da navbar só anda quando alguma coisa é marcada. Sem
 * este botão, a área APRENDER seria a única da jornada que o professor
 * percorre inteira sem que nada registre que ele passou por ali.
 *
 * `hydrated` evita o piscar do estado errado: antes da hidratação não há como
 * saber o que já foi lido, e afirmar "não lido" seria informação falsa.
 */
export function MarcarLido({ id, rotulo }: { id: string; rotulo: string }) {
  const { hydrated, isDone, markDone } = useJourney();
  const lido = isDone(id);

  if (!hydrated) {
    return (
      <span className="inline-flex min-h-[44px] items-center font-sans text-[12px] uppercase tracking-[0.06em] text-navy/65">
        Carregando seu progresso…
      </span>
    );
  }

  if (lido) {
    return (
      <span className="inline-flex min-h-[44px] items-center gap-2 font-sans text-[12px] font-bold uppercase tracking-[0.06em] text-navy">
        <span aria-hidden>✓</span> {rotulo}
      </span>
    );
  }

  return (
    <Button variant="secondary" onClick={() => markDone(id)}>
      Marquei como lido
    </Button>
  );
}
