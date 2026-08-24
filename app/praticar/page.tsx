import Link from "next/link";
import { ListaDeAtividades } from "@/components/praticar/ListaDeAtividades";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "praticar",
  "Doze atividades de sala de aula em quatro níveis, cada uma com preparação, condução minuto a minuto, perguntas mediadoras e adaptações.",
);

export default function PraticarPage() {
  return (
    <>
      <PageHeader stageId="praticar">
        <p className="mt-4 max-w-[56ch] font-sans text-[15px] leading-relaxed text-navy/70">
          Doze atividades prontas para a sala, em quatro níveis. Cada uma traz a preparação, a fala
          de abertura, a condução minuto a minuto e como adaptar à sua turma — e um simulador para
          você experimentar antes.
        </p>
        {/* Atalho para quem ainda não sabe o que está escolhendo. Escolher entre
            doze atividades sem nunca ter visto nenhuma funcionar é o que trava
            o professor na primeira visita. */}
        <p className="mt-4 font-sans text-[14px] leading-relaxed text-navy/80">
          Primeira vez aqui?{" "}
          <Link href="/praticar/exemplos" className="font-bold text-navy underline">
            Veja três exemplos resolvidos
          </Link>{" "}
          — um de cada formato, sem compromisso com turma nem material.
        </p>
      </PageHeader>

      <ListaDeAtividades />
    </>
  );
}
