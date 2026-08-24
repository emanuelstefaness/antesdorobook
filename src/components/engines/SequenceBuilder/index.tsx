"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ActivityShell } from "@/components/engines/shared/ActivityShell";
import { FeedbackPanel } from "@/components/engines/shared/FeedbackPanel";
import { StepAnnouncer } from "@/components/engines/shared/StepAnnouncer";
import { Button } from "@/components/ui/Button";
import type { Mensagem } from "@/lib/board/feedback";
import { conferirOrdem, embaralhar, type PassoOrdenavel } from "@/lib/engines/sequence";

type Direcao = "cima" | "baixo";

/** Movimento que acabou de ser pedido, pendente de foco e de anúncio. */
type MovimentoPendente = { id: string; direcao: Direcao };

/**
 * Motor de reordenar passos. A operação é por botões de subir e descer, nunca
 * por arrastar-e-soltar: teclado, toque e mouse percorrem exatamente o mesmo
 * caminho, e não sobra uma segunda implementação para manter em sincronia.
 */
export function SequenceBuilder({
  passos,
  semente,
  tituloDoPalco,
  onAcerto,
}: {
  passos: PassoOrdenavel[];
  semente: number;
  tituloDoPalco: string;
  onAcerto?: () => void;
}) {
  const [ordem, setOrdem] = useState<string[]>(() => embaralhar(passos, semente));
  const [mensagem, setMensagem] = useState<Mensagem | null>(null);
  const [posicaoErrada, setPosicaoErrada] = useState<number | null>(null);
  const [anuncio, setAnuncio] = useState<string | null>(null);

  // Botões de mover indexados por `${idDoPasso}-cima` / `${idDoPasso}-baixo`.
  // A chave é o id do passo, não a posição: o foco precisa acompanhar o passo
  // que o professor moveu, e a posição dele já mudou quando o foco é devolvido.
  const botoes = useRef(new Map<string, HTMLButtonElement | null>());
  const movimentoPendente = useRef<MovimentoPendente | null>(null);

  // Quantas vezes o professor pediu para embaralhar de novo. Fica em ref porque
  // não é lido durante o render — só serve para andar a semente adiante.
  const rodada = useRef(0);

  // `onAcerto` marca progresso, então precisa valer uma vez por tentativa e não
  // uma por clique: com a ordem já certa, cada novo "Conferir" chamaria de novo.
  // Mover um passo ou embaralhar recomeça a tentativa e libera o aviso. É o
  // mesmo contrato do BugHunt — dois motores irmãos não podem divergir nisso.
  const jaAvisou = useRef(false);

  // A posição final e o botão que deve receber o foco só existem depois que a
  // lista reordenada foi para o DOM: quem clica informa só o passo e a direção,
  // e é aqui que isso vira "posição 3 de 4". Roda antes da pintura, então o
  // foco nunca chega a piscar no lugar errado.
  useLayoutEffect(() => {
    const pendente = movimentoPendente.current;
    movimentoPendente.current = null;
    if (!pendente) return;

    const posicao = ordem.indexOf(pendente.id);
    if (posicao === -1) return;

    const texto = passos.find((p) => p.id === pendente.id)?.texto ?? pendente.id;
    setAnuncio(`${texto} agora está na posição ${posicao + 1} de ${ordem.length}.`);

    // Se o passo chegou a uma ponta da lista, o botão daquela direção fica
    // desabilitado — então o foco vai para o outro botão da mesma linha. Sem
    // esse desvio, mover um passo para o topo joga o teclado no <body>.
    const oposta: Direcao = pendente.direcao === "cima" ? "baixo" : "cima";
    const preferido = botoes.current.get(`${pendente.id}-${pendente.direcao}`);
    const reserva = botoes.current.get(`${pendente.id}-${oposta}`);

    if (preferido && !preferido.disabled) preferido.focus();
    else if (reserva && !reserva.disabled) reserva.focus();
  }, [ordem, passos]);

  const textoDe = useCallback(
    (id: string) => passos.find((p) => p.id === id)?.texto ?? id,
    [passos],
  );

  // Move pelo id do passo, e calcula a posição de origem dentro do updater, a
  // partir da ordem que o React já tem. Ler `ordem` do closure aqui repetiria
  // o pior defeito da Etapa 2: dois cliques rápidos no mesmo botão caem antes
  // do primeiro re-render, ambos partem da mesma lista velha e um dos
  // movimentos se perde sem deixar rastro.
  const mover = useCallback((id: string, direcao: Direcao) => {
    movimentoPendente.current = { id, direcao };
    jaAvisou.current = false;
    setMensagem(null);
    setPosicaoErrada(null);
    setOrdem((atual) => {
      const de = atual.indexOf(id);
      if (de === -1) return atual;
      const para = direcao === "cima" ? de - 1 : de + 1;
      if (para < 0 || para >= atual.length) return atual;
      const copia = [...atual];
      copia.splice(de, 1);
      copia.splice(para, 0, id);
      return copia;
    });
  }, []);

  const conferir = useCallback(() => {
    const r = conferirOrdem(ordem, passos);
    // O desfecho não passa pelo StepAnnouncer: o FeedbackPanel já é uma região
    // live montada o tempo todo, e duas regiões falando ao mesmo tempo fazem o
    // leitor de tela empilhar a mesma informação duas vezes. Mesma divisão de
    // trabalho que o CommandRunner usa — anúncio para o passo, painel para o
    // desfecho.
    setAnuncio(null);

    if (r.ok) {
      setPosicaoErrada(null);
      setMensagem({
        titulo: "Sequência correta.",
        texto:
          "Cada passo depende do anterior. Foi isso que você acabou de montar: um algoritmo é uma ordem que não pode ser trocada sem mudar o resultado.",
        conceito: "Sequência",
        tom: "acerto",
      });
      if (!jaAvisou.current) {
        jaAvisou.current = true;
        onAcerto?.();
      }
      return;
    }

    setPosicaoErrada(r.posicao);
    setMensagem({
      titulo: `O passo ${r.posicao + 1} ainda não é este.`,
      texto: `Aqui deveria vir "${textoDe(r.idEsperado)}". ${r.motivo}`,
      conceito: "Sequência",
      tom: "erro",
    });
  }, [ordem, passos, textoDe, onAcerto]);

  const embaralharDeNovo = useCallback(() => {
    // A semente recebida por prop fica reservada para a primeira montagem —
    // recarregar a página precisa devolver o mesmo exercício. Cada pedido de
    // novo embaralhamento anda uma semente adiante; reusar a mesma devolveria
    // exatamente a ordem que já está na tela e o botão não faria nada.
    rodada.current += 1;
    let nova = embaralhar(passos, semente + rodada.current);

    // `embaralhar` já garante que a ordem nunca é a do gabarito, mas nada
    // impede que ela caia igual à que está na tela agora. O limite de tentativas
    // existe porque com dois passos só há uma ordem errada possível: aí não há
    // o que variar e insistir seria laço infinito.
    let tentativas = 0;
    while (tentativas < 8 && nova.every((id, i) => id === ordem[i])) {
      rodada.current += 1;
      tentativas += 1;
      nova = embaralhar(passos, semente + rodada.current);
    }

    jaAvisou.current = false;
    setOrdem(nova);
    setMensagem(null);
    setPosicaoErrada(null);
    setAnuncio("Sequência embaralhada de novo.");
  }, [passos, semente, ordem]);

  const palco = (
    <>
      <div className="rounded-block border-2 border-navy/15 bg-cream-hi p-5">
        <span className="label-mono text-navy/65">Coloque em ordem</span>
        <h3 className="mt-2 font-display text-[20px] font-extrabold tracking-display text-navy">
          {tituloDoPalco}
        </h3>
        <p className="mt-2 font-sans text-[13.5px] leading-relaxed text-navy/70">
          Use as setas de cada passo para subir e descer. Quando achar que está certo, confira.
        </p>
      </div>
      <FeedbackPanel mensagem={mensagem} erro={null} />
      <StepAnnouncer texto={anuncio} />
    </>
  );

  const montagem = (
    <>
      <ol className="flex flex-col gap-2">
        {ordem.map((id, i) => {
          const erroAqui = i === posicaoErrada;
          const texto = textoDe(id);
          return (
            <li
              key={id}
              className={[
                "flex items-center gap-2 rounded-block border-2 bg-cream-hi p-2.5",
                erroAqui ? "border-led border-dashed" : "border-navy/15",
              ].join(" ")}
            >
              <span className="w-6 shrink-0 text-center font-mono text-[11px] font-bold text-navy/65">
                {i + 1}
              </span>
              <span className="flex-1 font-sans text-[12.5px] font-semibold text-navy">
                {texto}
                {erroAqui ? <span className="sr-only"> — este passo está fora de lugar</span> : null}
              </span>
              {erroAqui ? (
                <span aria-hidden className="font-mono text-[13px] font-bold text-led">
                  !
                </span>
              ) : null}

              {/* Os dois botões abaixo ficam nativos de propósito: são alvos
                  quadrados de 44×44 só com ícone, e dependem de guardar uma ref
                  por botão para devolver o foco depois de reordenar. O
                  componente Button não é forwardRef — anexar essa ref por ele
                  exigiria mudar sua assinatura para todos os chamadores. É a
                  mesma decisão já tomada na fila do CommandRunner. */}
              <button
                type="button"
                ref={(el) => {
                  botoes.current.set(`${id}-cima`, el);
                }}
                onClick={() => mover(id, "cima")}
                disabled={i === 0}
                aria-label={`Mover "${texto}" para cima`}
                className="h-11 w-11 rounded-block font-mono text-[13px] text-navy disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                ref={(el) => {
                  botoes.current.set(`${id}-baixo`, el);
                }}
                onClick={() => mover(id, "baixo")}
                disabled={i === ordem.length - 1}
                aria-label={`Mover "${texto}" para baixo`}
                className="h-11 w-11 rounded-block font-mono text-[13px] text-navy disabled:opacity-30"
              >
                ↓
              </button>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-wrap gap-2">
        <Button onClick={conferir}>Conferir a ordem</Button>
        <Button onClick={embaralharDeNovo} variant="secondary">
          Embaralhar de novo
        </Button>
      </div>
    </>
  );

  return <ActivityShell palco={palco} montagem={montagem} />;
}
