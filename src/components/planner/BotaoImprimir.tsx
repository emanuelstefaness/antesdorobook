"use client";

import { Button } from "@/components/ui/Button";

/**
 * `window.print()` só existe no navegador, então o botão precisa ser cliente —
 * mas o plano inteiro continua sendo renderizado no servidor. Só este botão
 * atravessa a fronteira.
 */
export function BotaoImprimir({ rotulo = "Imprimir este plano" }: { rotulo?: string }) {
  return <Button variant="secondary" onClick={() => window.print()}>{rotulo}</Button>;
}
