import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { STAGES, type StageId } from "@/lib/journey";

// O título é derivado de STAGES (não digitado à mão) para que um rename de label ali se propague sozinho até a <title>.
export function pageMetadata(stageId: StageId, description: string): Metadata {
  const etapa = STAGES.find((e) => e.id === stageId);
  if (!etapa) {
    throw new Error(`pageMetadata: etapa "${stageId}" não encontrada em STAGES`);
  }
  return {
    title: `${etapa.label} — ${BRAND.name}`,
    description,
  };
}
