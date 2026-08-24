import type { DemoSpec } from "@/lib/demo/types";
import { CompareOrder } from "./CompareOrder";
import { Decompose } from "./Decompose";
import { ImageDemo } from "./ImageDemo";
import { IoFlow } from "./IoFlow";
import { LedMatrix } from "./LedMatrix";
import { LoopCompress } from "./LoopCompress";
import { PatternDemo } from "./PatternDemo";

/**
 * O `switch` é exaustivo de propósito: se um dia entrar uma variante nova em
 * `DemoSpec` sem renderizador, o TypeScript acusa aqui em vez de a página
 * renderizar um buraco silencioso.
 */
export function Demo({ spec }: { spec: DemoSpec }) {
  switch (spec.kind) {
    case "compare-order":
      return <CompareOrder spec={spec} />;
    case "io-flow":
      return <IoFlow spec={spec} />;
    case "decompose":
      return <Decompose spec={spec} />;
    case "pattern":
      return <PatternDemo spec={spec} />;
    case "loop-compress":
      return <LoopCompress spec={spec} />;
    case "led-matrix":
      return <LedMatrix spec={spec} />;
    case "image":
      return <ImageDemo spec={spec} />;
  }
}
