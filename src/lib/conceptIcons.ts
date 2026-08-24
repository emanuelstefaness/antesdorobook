import {
  ArrowRightLeft,
  Filter,
  GitBranch,
  ListOrdered,
  Lightbulb,
  Puzzle,
  RefreshCw,
  Search,
  Sprout,
  Workflow,
  Grid3x3,
  type LucideIcon,
} from "lucide-react";

/**
 * Ícone e cor por conceito, para o quadrado colorido de cada cartão — o
 * mesmo tratamento visual dos mockups (ícone sobre fundo pastel), aplicado
 * aos 11 conceitos reais. Cores cicladas entre os realces que o resto do
 * site já usa (cyan/amber/purple/green/coral), não cores novas inventadas.
 */
export const CONCEPT_ICONS: Record<string, { icon: LucideIcon; cor: string }> = {
  "o-que-e-pensamento-computacional": { icon: Puzzle, cor: "green" },
  "por-que-ensinar-pensamento-computacional": { icon: Lightbulb, cor: "cyan" },
  "sequencia-e-instrucoes": { icon: ListOrdered, cor: "purple" },
  "entrada-processamento-e-saida": { icon: ArrowRightLeft, cor: "coral" },
  decomposicao: { icon: GitBranch, cor: "purple" },
  "reconhecimento-de-padroes": { icon: Grid3x3, cor: "cyan" },
  abstracao: { icon: Filter, cor: "amber" },
  algoritmos: { icon: Workflow, cor: "cyan" },
  repeticao: { icon: RefreshCw, cor: "coral" },
  "teste-e-depuracao": { icon: Search, cor: "amber" },
  "o-erro-como-parte-da-aprendizagem": { icon: Sprout, cor: "green" },
};

export const CORES_DE_FUNDO: Record<string, string> = {
  cyan: "bg-cyan/15 text-cyan",
  amber: "bg-amber/20 text-amber",
  purple: "bg-purple/15 text-purple",
  green: "bg-green/15 text-green",
  coral: "bg-coral/15 text-coral",
};
