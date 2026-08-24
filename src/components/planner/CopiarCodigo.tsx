"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopiarCodigo({ code }: { code: string }) {
  const [copiado, setCopiado] = useState(false);

  async function copiar() {
    await navigator.clipboard.writeText(code);
    setCopiado(true);
    window.setTimeout(() => setCopiado(false), 1800);
  }

  return (
    <button type="button" onClick={copiar} className="no-print inline-flex min-h-[40px] items-center gap-2 rounded-pill bg-navy px-4 text-[12px] font-bold text-white">
      {copiado ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />}
      {copiado ? "Código copiado" : "Copiar TypeScript"}
    </button>
  );
}
