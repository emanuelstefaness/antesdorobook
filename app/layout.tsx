import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import { SkipLink } from "@/components/layout/SkipLink";
import { BRAND } from "@/config/brand";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Antes do Robô",
  description: BRAND.heroText,
};

// Script bloqueante que roda antes da hidratação do React. Sem ele, o
// atributo data-animacoes só é escrito dentro de um useEffect (passivo) do
// useReducedAnimations, mas o useGSAP do @gsap/react roda em layout effect —
// que a própria React garante executar ANTES de qualquer effect passivo.
// Se o professor salvou "reduzidas", a animação de entrada pode ler o
// atributo antes dele existir e tocar mesmo assim, uma única vez, de forma
// silenciosa e inconsistente entre máquinas. Este script fixa o atributo
// no <html> ainda no <head>, antes de qualquer effect do React rodar, para
// que toda leitura de animacoesReduzidas() já veja o valor correto desde o
// primeiro layout effect. Não remover: não é código morto.
const SCRIPT_ANIMACOES = `try {
  var v = localStorage.getItem('adr:animacoes');
  var r;
  if (v === '"reduzidas"') { r = true; }
  else if (v === '"completas"') { r = false; }
  else { r = window.matchMedia('(prefers-reduced-motion: reduce)').matches; }
  document.documentElement.dataset.animacoes = r ? 'reduzidas' : 'completas';
} catch (e) {}`;

// Mesma ideia do script acima, e pelo mesmo motivo: rodar antes da primeira
// pintura. Se o estado do acesso só fosse lido depois da hidratação, quem já
// entrou veria a tela de senha piscar em toda visita. Em qualquer falha o
// atributo fica "trancado" — errar para o lado fechado é o certo aqui.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_ANIMACOES }} />
      </head>
      <body>
        <SkipLink />
        <AppShell>
            {/*
              Alvo do skip link: precisa ser um elemento real capaz de receber
              foco (não só um id). Sem tabIndex={-1} o navegador rola a
              viewport até aqui mas o foco do teclado fica preso no topo —
              quem usa teclado "vê" o conteúdo mas continua tabulando pela
              barra lateral.

              O layout é o dono do único landmark main do documento. As
              páginas (arquivos page.tsx dentro de src/app) devem renderizar
              apenas seções (section, div, fragmentos etc.) dentro dele — uma
              página NUNCA deve declarar seu próprio elemento main. Isso evita
              landmarks "main" duplicados ou aninhados (inválido em HTML) agora
              que múltiplas rotas compartilham este layout.
            */}
            <main id="conteudo" tabIndex={-1} className="flex-1">
              {children}
            </main>
          </AppShell>
      </body>
    </html>
  );
}
