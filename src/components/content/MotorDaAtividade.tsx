"use client";

import { useCallback } from "react";
import { BugHunt } from "@/components/engines/BugHunt";
import { CommandRunner } from "@/components/engines/CommandRunner";
import { LoopOptimizer } from "@/components/engines/LoopOptimizer";
import { SequenceBuilder } from "@/components/engines/SequenceBuilder";
import type { EngineConfig } from "@/data/activities";
import { useJourney } from "@/lib/useProgress";

/**
 * O `switch` é exaustivo de propósito: uma variante nova em `EngineConfig` sem
 * caso aqui vira erro de tipo, em vez de uma aba EXPERIMENTE em branco.
 */
export function MotorDaAtividade({ id, engine }: { id: string; engine: EngineConfig }) {
  const { markDone } = useJourney();

  // `markDone` já é idempotente, mas o motor também garante um aviso por
  // tentativa — as duas proteções são baratas e o custo de errar aqui é um
  // contador de progresso que anda sozinho.
  const concluir = useCallback(() => markDone(`praticar:${id}`), [markDone, id]);

  switch (engine.motor) {
    case "command-runner":
      return (
        // `solucaoMinima` não entra aqui: o CommandRunner não revela gabarito,
        // ela existe nos dados para o teste provar que o desafio é vencível.
        <CommandRunner
          grid={engine.grid}
          minimo={engine.minimo}
          permitidos={engine.permitidos}
          rotulos={engine.rotulos}
          onVitoria={concluir}
        />
      );
    case "loop-optimizer":
      return (
        <LoopOptimizer
          grid={engine.grid}
          minimo={engine.minimo}
          permitidos={engine.permitidos}
          solucaoMinima={engine.solucaoMinima}
          rotulos={engine.rotulos}
          onVitoria={concluir}
        />
      );
    case "sequence-builder":
      return (
        <SequenceBuilder
          passos={engine.passos}
          semente={engine.semente}
          tituloDoPalco={engine.tituloDoPalco}
          onAcerto={concluir}
        />
      );
    case "bug-hunt":
      return <BugHunt algoritmo={engine.algoritmo} onAcerto={concluir} />;
  }
}
