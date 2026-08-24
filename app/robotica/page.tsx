import { Bot, Lightbulb, Wrench } from "lucide-react";
import { DisclosureBloco } from "@/components/content/DisclosureBloco";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { ROBOTICS_CONCEPTS } from "@/data/robotics";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "robotica",
  "Fundamentos de robótica para professores: sistema, sensores, atuadores, controlador, energia, mecanismos, segurança e depuração.",
);

export default function RoboticaPage() {
  return (
    <>
      <PageHeader stageId="robotica">
        <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-navy/70">
          Faça esta etapa depois de pensamento computacional e antes de estudar o micro:bit.
          Primeiro entenda como qualquer robô percebe, decide e age; depois a placa passa a fazer
          sentido como controlador do sistema.
        </p>
      </PageHeader>

      <section className="mx-auto max-w-[1400px] px-5 py-10 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-5" realce="cyan">
            <Bot size={22} className="text-cyan" aria-hidden />
            <p className="mt-3 label-mono text-navy/55">Ideia central</p>
            <p className="mt-1 font-display text-[21px] font-extrabold">Perceber → decidir → agir</p>
            <p className="mt-2 text-[13px] leading-relaxed text-navy/65">O fluxo que organiza qualquer projeto robótico.</p>
          </Card>
          <Card className="p-5" realce="amber">
            <Wrench size={22} className="text-amber" aria-hidden />
            <p className="mt-3 label-mono text-navy/55">O professor aprende</p>
            <p className="mt-1 font-display text-[21px] font-extrabold">Sistema, não peças soltas</p>
            <p className="mt-2 text-[13px] leading-relaxed text-navy/65">Sensor, programa, atuador, energia e estrutura trabalhando juntos.</p>
          </Card>
          <Card className="p-5" realce="purple">
            <Lightbulb size={22} className="text-purple" aria-hidden />
            <p className="mt-3 label-mono text-navy/55">Pronto para avançar quando</p>
            <p className="mt-1 font-display text-[21px] font-extrabold">Explica antes de montar</p>
            <p className="mt-2 text-[13px] leading-relaxed text-navy/65">Consegue desenhar entrada, regra e saída de um projeto.</p>
          </Card>
        </div>

        <div className="mt-10 grid max-w-[980px] gap-3">
          {ROBOTICS_CONCEPTS.map((conceito) => (
            <DisclosureBloco
              key={conceito.id}
              ancora={conceito.id}
              titulo={`${String(conceito.order).padStart(2, "0")} — ${conceito.title}`}
            >
              <p className="max-w-[66ch] text-[14px] font-semibold leading-relaxed text-navy">{conceito.plain}</p>

              <h3 className="mt-6 label-mono text-navy/55">O que esta aula vai ensinar</h3>
              <p className="mt-2 max-w-[66ch] text-[13.5px] leading-relaxed text-navy/72">{conceito.teacherNeeds}</p>

              <h3 className="mt-6 label-mono text-cyan">Como explicar aos alunos</h3>
              <p className="mt-2 max-w-[66ch] border-l-2 border-cyan pl-3 text-[13.5px] leading-relaxed text-navy/72">{conceito.howToExplain}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-card-sm bg-navy/4 p-4">
                  <h3 className="label-mono text-navy/55">Prática do professor</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-navy/72">{conceito.practice}</p>
                </div>
                <div className="rounded-card-sm bg-amber/10 p-4">
                  <h3 className="label-mono text-navy/55">Exemplo de robótica</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-navy/72">{conceito.example}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Button href={`/robotica/${conceito.id}`}>Aprender passo a passo</Button>
              </div>
            </DisclosureBloco>
          ))}
        </div>
      </section>
    </>
  );
}
