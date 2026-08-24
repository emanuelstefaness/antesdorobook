"use client";

import { useState, type ReactNode } from "react";
import { Sidebar, MobileNavDrawer } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

/**
 * Casco da aplicação: sidebar fixa à esquerda no desktop, gaveta no celular,
 * cabeçalho fixo no topo da coluna da direita. Único dono do estado de
 * recolher/expandir e de abrir/fechar a gaveta — por isso precisa ser client
 * component, diferente do layout raiz (que exporta metadata e por isso
 * continua server component).
 */
export function AppShell({ children }: { children: ReactNode }) {
  const [recolhida, setRecolhida] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <div className="app-frame flex min-h-dvh bg-cream">
      <Sidebar recolhida={recolhida} aoAlternar={() => setRecolhida((v) => !v)} />
      <MobileNavDrawer open={menuAberto} onClose={() => setMenuAberto(false)} />
      <div className="app-content flex min-w-0 flex-1 flex-col overflow-x-hidden">
        <Header aoAbrirMenu={() => setMenuAberto(true)} />
        {children}
      </div>
    </div>
  );
}
