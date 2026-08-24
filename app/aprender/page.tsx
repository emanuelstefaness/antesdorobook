import { ListaDeConceitos } from "@/components/aprender/ListaDeConceitos";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "aprender",
  "Percorra os onze fundamentos do pensamento computacional, cada um com exemplo do cotidiano, roteiro para explicar à turma e uma atividade rápida para aplicar.",
);

export default function AprenderPage() {
  return (
    <>
      <PageHeader stageId="aprender">
        <p className="mt-4 max-w-[54ch] font-sans text-[15px] leading-relaxed text-navy/70">
          Os onze fundamentos do pensamento computacional, em ordem. Nenhum deles precisa de
          computador para ser entendido — e todos vêm com um roteiro de três minutos para explicar
          à turma.
        </p>
      </PageHeader>

      <ListaDeConceitos />
    </>
  );
}
