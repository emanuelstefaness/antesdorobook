import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

// useGSAP não toca o DOM ao ser registrado — é só um hook que se apoia no
// gsap.context por baixo dos panos — então registrá-lo aqui, fora de
// qualquer função, é seguro tanto no servidor quanto no cliente e evita o
// aviso do próprio plugin quando um componente chama useGSAP antes de
// qualquer outra coisa neste módulo ter rodado.
gsap.registerPlugin(useGSAP);

let registrado = false;

export function registerGsap(): void {
  if (registrado || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
  registrado = true;
}

// A regra mora em @/lib/animacoes, sem dependência de GSAP, para que os
// componentes que só animam com CSS possam consultá-la sem puxar a
// biblioteca. Reexportado aqui para não quebrar quem já importava daqui.
export { animacoesReduzidas } from "./animacoes";

export { gsap };
