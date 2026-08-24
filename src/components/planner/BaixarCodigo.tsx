"use client";

import { Download } from "lucide-react";

export function BaixarCodigo({ code, filename }: { code: string; filename: string }) {
  function download() {
    const url = URL.createObjectURL(new Blob([code], { type: "text/typescript;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filename}.ts`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return <button type="button" onClick={download} className="no-print inline-flex min-h-[40px] items-center gap-2 rounded-pill border border-white/25 px-4 text-[12px] font-bold text-white"><Download size={14} />Baixar .ts</button>;
}
