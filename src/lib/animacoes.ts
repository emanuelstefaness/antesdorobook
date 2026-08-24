/**
 * Único ponto de decisão sobre movimento na interface.
 *
 * Vive num módulo próprio, separado do gsapConfig, porque quem só precisa
 * saber se pode animar não deveria arrastar a biblioteca inteira de animação
 * para dentro do pacote — o efeito de entrada dos blocos é feito com CSS e não
 * usa GSAP para nada.
 */
export function animacoesReduzidas(): boolean {
  if (typeof window === "undefined") return true;

  // O atributo data-animacoes no <html> já resolve a precedência (escolha
  // salva do professor vence; a preferência do sistema é só o padrão) no
  // script bloqueante do layout e no hook useReducedAnimations. Esta função só
  // lê o atributo — não deve re-derivar a regra. O matchMedia entra apenas
  // como reserva se o atributo estiver genuinamente ausente (o script
  // bloqueante falhou).
  const atributo = document.documentElement.dataset.animacoes;
  if (atributo === "reduzidas") return true;
  if (atributo === "completas") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
