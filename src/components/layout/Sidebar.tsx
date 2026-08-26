"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  BookOpenCheck,
  Blocks,
  Bot,
  Calendar,
  ClipboardList,
  Cable,
  Cpu,
  Flag,
  Grid3x3,
  GraduationCap,
  HelpCircle,
  Home,
  Menu,
  type LucideIcon,
  Puzzle,
  Route,
  ShieldCheck,
  Search,
  Star,
} from "lucide-react";
import { NAV_GROUPS, type NavItem } from "@/lib/nav";
import { SidePanel } from "@/components/ui/SidePanel";
import { BrandLockup } from "@/components/layout/BrandLockup";

// Um ícone por rota, escolhido pelo que a professora vai encontrar lá dentro
// — não decoração aleatória. Mapeado por id porque NAV_ITEMS/SECONDARY_LINKS
// já são a fonte única de verdade da navegação (src/lib/nav.ts): este mapa
// só soma o ícone, nunca duplica rótulo ou href.
const ICONES: Record<string, LucideIcon> = {
  comecar: Flag,
  preparar: ShieldCheck,
  aprender: BookOpen,
  robotica: Bot,
  "aulas-microbit": ClipboardList,
  praticar: Puzzle,
  tabuleiro: Grid3x3,
  "todas-aulas": Calendar,
  microbit: Cpu,
  trilhas: Route,
  makecode: Blocks,
  componentes: Cable,
  busca: Search,
  ajuda: HelpCircle,
  glossario: BookOpen,
  favoritos: Star,
  aulas: Calendar,
  "caminho-aulas": BookOpenCheck,
  "tabuleiro-areas": GraduationCap,
};

function Item({
  item,
  ativo,
  recolhida,
  aoNavegar,
}: {
  item: NavItem;
  ativo: boolean;
  recolhida: boolean;
  aoNavegar?: () => void;
}) {
  const Icone = ICONES[item.id] ?? Home;
  return (
    <li>
      <Link
        href={item.href}
        onClick={aoNavegar}
        aria-current={ativo ? "page" : undefined}
        title={recolhida ? item.label : undefined}
        className={[
          "flex min-h-[44px] items-center gap-3 rounded-card-sm px-3 py-2 font-sans text-[13.5px] font-semibold transition-colors",
          recolhida ? "justify-center px-0" : "",
          ativo
            ? "bg-cyan/15 text-white"
            : "text-white/68 hover:bg-white/8 hover:text-white",
        ].join(" ")}
      >
        <Icone
          size={19}
          aria-hidden
          className={ativo ? "shrink-0 text-cyan" : "shrink-0 text-white/45"}
        />
        {recolhida ? (
          <span className="sr-only">{item.label}</span>
        ) : (
          <span className="min-w-0 flex-1 whitespace-normal leading-[1.25]">{item.label}</span>
        )}
        {ativo ? (
          <span
            aria-hidden
            className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-cyan"
          />
        ) : null}
      </Link>
    </li>
  );
}

/**
 * Conteúdo da navegação, compartilhado entre a barra fixa do desktop e a
 * gaveta do celular (MobileNavDrawer), para as duas nunca divergirem.
 */
export function ConteudoDaNavegacao({ recolhida = false, aoNavegar }: { recolhida?: boolean; aoNavegar?: () => void }) {
  const pathname = usePathname();
  const ativo = (href: string) => pathname === href || (href !== "/aulas" && pathname.startsWith(`${href}/`));

  return (
    <nav aria-label="Navegação principal" className="scrollbar-hidden flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain pr-1">
      <ul className="flex flex-col gap-1">
        <Item
          item={{ id: "inicio", label: "Início", href: "/", short: "Início" }}
          ativo={pathname === "/"}
          recolhida={recolhida}
          aoNavegar={aoNavegar}
        />
      </ul>
      {NAV_GROUPS.map((group) => (
        <div key={group.id} className="mt-5 border-t border-white/10 pt-4">
          {!recolhida ? <p className="px-3 pb-2 font-mono text-[9px] font-bold uppercase tracking-label text-cyan/70">{group.label}</p> : null}
          <ul className="flex flex-col gap-1">
            {group.items.map((item) => <Item key={item.id} item={item} ativo={ativo(item.href)} recolhida={recolhida} aoNavegar={aoNavegar}/>) }
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function Sidebar({
  recolhida,
  aoAlternar,
}: {
  recolhida: boolean;
  aoAlternar: () => void;
}) {
  return (
    <aside
      className={`no-print sticky top-0 z-40 hidden h-dvh shrink-0 flex-col border-r border-white/10 bg-navy py-5 text-white shadow-panel transition-[width] duration-200 ease-out md:flex ${
        recolhida ? "w-[72px] px-3" : "w-[288px] px-4"
      }`}
    >
      <div className={`mb-5 flex min-h-[44px] items-center gap-3 ${recolhida ? "justify-center" : "justify-between border-b border-white/10 pb-4"}`}>
        {recolhida ? null : (
          <Link href="/" className="min-w-0 flex-1">
            <BrandLockup compact />
          </Link>
        )}
        <button
          type="button"
          onClick={aoAlternar}
          aria-pressed={!recolhida}
          aria-label={recolhida ? "Abrir menu" : "Recolher menu"}
          title={recolhida ? "Abrir menu" : "Recolher menu"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card-sm border border-white/15 text-cyan transition-colors hover:bg-white/10 hover:text-white"
        >
          <Menu size={21} aria-hidden />
        </button>
      </div>

      <ConteudoDaNavegacao recolhida={recolhida} />
    </aside>
  );
}

/**
 * Mesma navegação, em gaveta, para telas abaixo de md. Usa o SidePanel que
 * já existe (travinha de foco, Esc, devolve o foco ao fechar) em vez de
 * reinventar um diálogo modal do zero.
 */
export function MobileNavDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <SidePanel open={open} onClose={onClose} title="Menu" variant="navigation">
      <div className="mb-4 rounded-card-sm border border-white/10 bg-white/5 p-3">
        <BrandLockup compact />
      </div>
      <ConteudoDaNavegacao aoNavegar={onClose} />
    </SidePanel>
  );
}
