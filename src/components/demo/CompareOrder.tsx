"use client";

// A diretiva acima não é por interação — este renderizador não tem nenhuma. É
// pelo vocabulário das peças: ROTULOS e SIMBOLOS moram em CommandTray, que é um
// módulo "use client". Ler um export desses de um componente de servidor não
// devolve o objeto, devolve uma referência de cliente que estoura ao ser
// acessada. Entre duplicar o nome das oito peças e marcar este arquivo como
// cliente, marcar sai mais barato: o componente continua puro e o vocabulário
// segue com um dono só.

import { Board } from "@/components/engines/CommandRunner/Board";
import { ROTULOS, SIMBOLOS } from "@/components/engines/CommandRunner/CommandTray";
import type { EventoDeFalha } from "@/lib/board/feedback";
import { avancarExecucao, criarExecucao, type Execucao } from "@/lib/board/runner";
import type { CommandType, GridSpec } from "@/lib/board/types";
import type { DemoSpec } from "@/lib/demo/types";

type Spec = Extract<DemoSpec, { kind: "compare-order" }>;

const RESULTADO_DA_FALHA: Record<EventoDeFalha["tipo"], string> = {
  "bateu-obstaculo": "o robô bate no obstáculo e para",
  "saiu-do-tabuleiro": "o robô tenta sair do tabuleiro e para",
  "bau-trancado": "o robô chega ao baú sem a chave e não consegue abrir",
};

/**
 * Roda a fila pelo motor de verdade, do começo ao fim. A demonstração só vale
 * alguma coisa se o tabuleiro final for o que o motor realmente produz — se
 * fosse desenhado à mão, um dia o motor mudaria e a página passaria a mentir
 * para o professor sem ninguém perceber.
 *
 * `minimo: null` porque aqui não há meta de otimização: interessa onde o robô
 * para, não com quantas peças ele chegou.
 */
function executarAteOFim(grid: GridSpec, fila: CommandType[]): Execucao {
  let exec = criarExecucao(grid, fila);

  // `avancarExecucao` consome exatamente uma instrução por chamada e termina
  // sozinha quando a fila acaba; o teto é só um cinto de segurança para o laço
  // nunca poder travar a renderização da página.
  const teto = exec.instrucoes.length + 1;
  for (let i = 0; i < teto && exec.estado !== "terminado"; i++) {
    exec = avancarExecucao(exec, null);
  }

  return exec;
}

/** Uma frase curta, em terceira pessoa, para entrar na descrição do conjunto. */
function descreverResultado(exec: Execucao): string {
  if (exec.erro) return "a montagem é inválida e o robô nem sai do lugar";

  const desfecho = exec.desfecho;
  if (desfecho === null) return "a execução não chegou ao fim";
  if (desfecho.tipo === "vitoria") return "o robô chega ao baú";
  if (desfecho.tipo === "falha") return RESULTADO_DA_FALHA[desfecho.evento.tipo];
  return "o robô para longe do baú";
}

function Fila({ fila }: { fila: CommandType[] }) {
  return (
    <ol className="flex flex-wrap gap-1.5">
      {fila.map((comando, i) => (
        <li
          key={`${comando}-${i}`}
          className="inline-flex items-center gap-1.5 rounded-block border border-navy/20 bg-cream px-2 py-1"
        >
          <span className="font-mono text-[10px] font-bold text-navy/65">{i + 1}</span>
          <span aria-hidden className="text-[13px] leading-none">
            {SIMBOLOS[comando]}
          </span>
          <span className="font-sans text-[11.5px] font-semibold text-navy">
            {ROTULOS[comando]}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Coluna({
  titulo,
  resultado,
  fila,
  grid,
  exec,
  certa,
}: {
  titulo: string;
  resultado: string;
  fila: CommandType[];
  grid: GridSpec;
  exec: Execucao;
  certa: boolean;
}) {
  return (
    <div
      className={[
        "flex flex-col gap-3 rounded-block border-2 bg-cream-hi p-4",
        certa ? "border-cyan" : "border-led",
      ].join(" ")}
    >
      <div className="flex items-center gap-2">
        {/* O ponto colorido leva anel navy porque o ciano puro mede 1,98:1
            sobre o creme, abaixo do piso de 3:1 da WCAG para gráfico
            significativo. O rótulo ao lado fica sempre em navy: o vermelho
            `led` sobre creme mede 3,37:1, o bastante para borda e ícone e
            insuficiente para texto. */}
        <span
          aria-hidden
          className={[
            "h-3 w-3 shrink-0 rounded-full ring-1 ring-navy",
            certa ? "bg-cyan" : "bg-led",
          ].join(" ")}
        />
        <h4 className="font-sans text-[12px] font-bold uppercase tracking-[0.06em] text-navy">
          {titulo}
        </h4>
      </div>

      <Fila fila={fila} />

      <Board grid={grid} robo={exec.robo} rastro={exec.rastro} />

      <p className="font-sans text-[12.5px] leading-snug text-navy/70">
        Resultado: {resultado}.
      </p>
    </div>
  );
}

export function CompareOrder({ spec }: { spec: Spec }) {
  // ATENÇÃO A QUEM AUTORAR DADOS: `validarDemo` garante que as duas filas são
  // diferentes, mas não consegue garantir que elas TERMINAM em lugares
  // diferentes — duas ordens distintas podem levar o robô ao mesmo ponto. Se
  // isso acontecer, os dois tabuleiros ficam idênticos e a demonstração não
  // demonstra nada. Ao escrever um `compare-order`, abra a página e confira
  // que os dois desfechos são visivelmente diferentes.
  const execCerta = executarAteOFim(spec.grid, spec.correct);
  const execErrada = executarAteOFim(spec.grid, spec.wrong);

  const resultadoCerto = descreverResultado(execCerta);
  const resultadoErrado = descreverResultado(execErrada);

  return (
    <div className="flex flex-col gap-4">
      {/* Todo o par de tabuleiros entra num único role="img": quem usa leitor
          de tela precisa receber a conclusão da comparação numa frase, não
          navegar por duas grades de casas e ter de deduzi-la. */}
      <div
        role="img"
        aria-label={`As mesmas peças em duas ordens. Na ordem certa, ${resultadoCerto}; na ordem trocada, ${resultadoErrado}.`}
        className="grid gap-4 md:grid-cols-2"
      >
        <Coluna
          certa
          titulo="Ordem certa"
          resultado={resultadoCerto}
          fila={spec.correct}
          grid={spec.grid}
          exec={execCerta}
        />
        <Coluna
          certa={false}
          titulo="Ordem trocada"
          resultado={resultadoErrado}
          fila={spec.wrong}
          grid={spec.grid}
          exec={execErrada}
        />
      </div>

      <p className="font-sans text-[14px] leading-relaxed text-navy/70">{spec.explain}</p>
    </div>
  );
}
