import { ListaDeTrilhas } from "@/components/trilhas/ListaDeTrilhas";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "trilhas",
  "Seis trilhas de projetos com micro:bit, quatro assuntos cada, do primeiro ícone na matriz até uma feira de projetos.",
);

export default function TrilhasPage() {
  return (
    <>
      <PageHeader stageId="trilhas">
        <p className="mt-4 max-w-[56ch] font-sans text-[15px] leading-relaxed text-navy/70">
          Seis trilhas, quatro assuntos cada. Cada trilha termina com algo pronto que a turma leva
          embora — uma animação, um crachá, um jogo, um protótipo. As dependências estão ditas em
          cada uma: você pode pular, mas vai faltar base.
        </p>
      </PageHeader>

      <ListaDeTrilhas />
    </>
  );
}
