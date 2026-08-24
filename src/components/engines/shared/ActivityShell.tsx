import type { ReactNode } from "react";

/** Palco à esquerda, montagem à direita; empilhados abaixo de lg. */
export function ActivityShell({ palco, montagem }: { palco: ReactNode; montagem: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
      <div className="flex flex-col gap-4">{palco}</div>
      <div className="flex flex-col gap-5">{montagem}</div>
    </div>
  );
}
