"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { SidePanel } from "@/components/ui/SidePanel";
import { Button } from "@/components/ui/Button";
import { useJourney, useLastPage } from "@/lib/useProgress";

type Props = { open: boolean; onClose: () => void };

export function JourneyPanel({ open, onClose }: Props) {
  const { hydrated, stages, percent, next } = useJourney();
  const { last } = useLastPage();

  // "Continuar de onde parei" prioriza a última página vista; sem histórico
  // (professor novo, ainda não navegou), cai para a próxima etapa incompleta,
  // que sempre existe enquanto a jornada não estiver 100% concluída. Assim o
  // botão nunca fica sem destino — pior seria mostrar um CTA morto.
  const destino = last ?? (next ? { href: next.href, label: next.label } : null);

  return (
    <SidePanel open={open} onClose={onClose} title="Sua jornada">
      <p className="mb-5 font-sans text-[13px] leading-relaxed text-navy/70">
        {hydrated ? (
          <>
            Você concluiu <strong className="text-navy">{percent}%</strong> da formação. O
            progresso orienta, mas não trava nada — você pode entrar em qualquer etapa quando
            quiser.
          </>
        ) : (
          // Antes da hidratação não sabemos o progresso real: mostrar "0%"
          // seria enganoso (parece dado real, não estado de carregamento).
          "Carregando seu progresso…"
        )}
      </p>

      {destino ? (
        <div className="mb-6">
          <Button href={destino.href} onClick={onClose} variant="primary" className="w-full">
            Continuar de onde parei
          </Button>
          <p className="mt-2 font-sans text-[12px] text-navy/70">Você vai para: {destino.label}</p>
        </div>
      ) : null}

      <ol className="space-y-2">
        {stages.map((etapa) => (
          <li key={etapa.id}>
            <Link
              href={etapa.href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-block border-2 border-navy/15 bg-cream px-3 py-3 transition-colors hover:border-navy/40"
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-block font-mono text-[11px] font-bold ${
                  etapa.complete ? "bg-purple text-navy" : "bg-navy text-cream-hi"
                }`}
              >
                {etapa.complete ? <Check size={14} aria-hidden /> : etapa.order}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-sans text-[13px] font-semibold leading-tight">
                  {etapa.label}
                </span>
                <span className="block font-sans text-[11.5px] text-navy/70">{etapa.verb}</span>
              </span>
              <span className="shrink-0 font-mono text-[10px] font-bold text-navy/65">
                {etapa.done}/{etapa.total}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </SidePanel>
  );
}
