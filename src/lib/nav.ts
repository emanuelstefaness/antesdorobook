export type NavItem = { id: string; label: string; href: string; short: string };
export type NavGroup = { id: string; label: string; items: NavItem[] };

/** Poucas decisões principais, com a profundidade organizada dentro delas. */
export const NAV_GROUPS: NavGroup[] = [
  {
    id: "preparacao",
    label: "Preparação do professor",
    items: [
      { id: "preparar", label: "Comece por aqui", href: "/preparar", short: "Começar" },
      { id: "aprender", label: "Pensamento computacional", href: "/aprender", short: "Pensamento" },
      { id: "robotica", label: "Fundamentos de robótica", href: "/robotica", short: "Robótica" },
      { id: "componentes", label: "Sensores e componentes", href: "/componentes", short: "Componentes" },
      { id: "microbit", label: "Conhecendo o micro:bit", href: "/microbit", short: "micro:bit" },
      { id: "makecode", label: "MakeCode completo", href: "/makecode", short: "MakeCode" },
    ],
  },
  {
    id: "recursos",
    label: "Recursos para ensinar",
    items: [
      { id: "todas-aulas", label: "Todas as aulas", href: "/planejar", short: "Todas as aulas" },
      { id: "praticar", label: "Atividades desplugadas", href: "/praticar", short: "Desplugadas" },
      { id: "tabuleiro", label: "Tabuleiro Antes do Robô", href: "/tabuleiro", short: "Tabuleiro" },
    ],
  },
  {
    id: "aulas",
    label: "Aulas",
    items: [
      { id: "aulas", label: "Escolher como começar", href: "/aulas", short: "Aulas" },
      { id: "caminho-aulas", label: "Caminho recomendado", href: "/aulas/caminho", short: "Caminho" },
      { id: "favoritos", label: "Aulas favoritas", href: "/favoritos", short: "Favoritos" },
    ],
  },
  {
    id: "apoio",
    label: "Apoio",
    items: [
      { id: "busca", label: "Busca", href: "/busca", short: "Busca" },
      { id: "ajuda", label: "Ajuda rápida", href: "/ajuda-rapida", short: "Ajuda" },
      { id: "glossario", label: "Glossário", href: "/glossario", short: "Glossário" },
    ],
  },
];

export const NAV_ITEMS = NAV_GROUPS.slice(0, 3).flatMap((group) => group.items);
export const SECONDARY_LINKS = NAV_GROUPS[3].items;

export function rotuloDoMenuSecundario(): string {
  const nomes = SECONDARY_LINKS.map((item) => item.label.toLowerCase());
  const ultimo = nomes[nomes.length - 1];
  return `Apoio: ${nomes.slice(0, -1).join(", ")} e ${ultimo}`;
}
