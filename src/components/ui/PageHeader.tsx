import { CORE_STAGES, STAGES, type StageId } from "@/lib/journey";

export function PageHeader({
  stageId,
  children,
}: {
  stageId: StageId;
  children?: React.ReactNode;
}) {
  const etapa = STAGES.find((e) => e.id === stageId)!;
  const indicePrincipal = CORE_STAGES.findIndex((e) => e.id === stageId);
  const titulos: Partial<Record<StageId, string>> = {
    preparar: "Prepare-se para ensinar com segurança",
    aprender: "Aprender pensamento computacional",
    robotica: "Entender os fundamentos da robótica",
    "aulas-microbit": "Aplicar aulas com micro:bit",
    praticar: "Atividades para transformar a sala",
    microbit: "Descubra o BBC micro:bit",
    trilhas: "Trilhas de aprendizagem",
    planejar: "Planeje sua próxima aula",
    comecar: "Comece por aqui",
  };

  return (
    <header className="creative-header relative overflow-hidden border-b border-navy/8 bg-cream-hi">
      <div aria-hidden className="absolute -right-20 -top-28 h-72 w-72 rounded-full bg-cyan/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-7 md:px-8 md:py-10">
        <span className="label-mono text-cyan">
          {indicePrincipal >= 0
            ? `Etapa ${indicePrincipal + 1} de ${CORE_STAGES.length} · ${etapa.verb}`
            : `Conteúdo complementar · ${etapa.verb}`}
        </span>
        <h1 className="mt-2.5 max-w-[22ch] font-display text-[clamp(1.9rem,4.3vw,3.35rem)] font-extrabold leading-[1.02] tracking-display">
          {titulos[stageId] ?? etapa.label}
        </h1>
        {children}
      </div>
    </header>
  );
}
