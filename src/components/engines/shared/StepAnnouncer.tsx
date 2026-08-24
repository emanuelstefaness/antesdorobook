/**
 * Anuncia um passo por vez durante a execução. É só para leitor de tela:
 * quem enxerga acompanha pelo palco, quem não enxerga ouviria silêncio até
 * o desfecho — o oposto do "ver um comando de cada vez" que o produto ensina.
 */
export function StepAnnouncer({ texto }: { texto: string | null }) {
  return (
    <div aria-live="polite" className="sr-only">
      {texto ?? ""}
    </div>
  );
}
