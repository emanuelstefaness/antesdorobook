"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { BRAND } from "@/config/brand";
import { acessoLiberado, liberarAcesso, senhaCorreta } from "@/lib/auth/gate";

/**
 * Quem decide o que aparece é o CSS, a partir do atributo data-acesso que o
 * script bloqueante do layout escreve no <html> antes da primeira pintura.
 * Fazer isso pelo estado do React deixaria a tela em branco por um quadro em
 * toda visita de quem já entrou, porque o efeito que lê o localStorage só roda
 * depois da pintura. Sem atributo nenhum — JavaScript desligado, script com
 * erro — o CSS mantém o portão fechado, que é o lado seguro para errar.
 */
export function PortaoDeAcesso({ children }: { children: ReactNode }) {
  const [digitada, setDigitada] = useState("");
  const [erro, setErro] = useState("");

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (!senhaCorreta(digitada)) {
      setErro("Senha incorreta. Confira com quem enviou o endereço.");
      setDigitada("");
      return;
    }

    liberarAcesso();

    // Modo privado e navegadores com armazenamento bloqueado aceitam a
    // escrita sem gravar nada. Sem esta conferência, a pessoa digitaria a
    // senha certa, veria a página recarregar e cairia no portão de novo, sem
    // nenhuma pista do motivo.
    if (!acessoLiberado()) {
      setErro(
        "Seu navegador está bloqueando o armazenamento local, então o acesso não pode ser guardado. Saia do modo privado e tente de novo.",
      );
      return;
    }

    // Recarregar em vez de simplesmente revelar o conteúdo: as animações de
    // entrada medem posição e tamanho dos elementos, e elas já teriam rodado
    // com tudo escondido, medindo zero. A página volta limpa, com o acesso
    // liberado desde o primeiro quadro.
    window.location.reload();
  }

  return (
    <>
      <div className="portao-de-acesso grid min-h-screen place-items-center bg-cream px-5 py-16">
        <div className="w-full max-w-[420px]">
          <p className="label-mono text-navy/60">Material em preparação</p>

          <p className="mt-3 font-display text-3xl font-extrabold leading-none tracking-display text-navy">
            {BRAND.wordmark.first} {BRAND.wordmark.second}
          </p>

          <p className="mt-5 font-sans text-[15px] leading-relaxed text-navy/75">
            Este material ainda está sendo preparado para os professores. Digite a senha combinada
            para entrar.
          </p>

          <form onSubmit={enviar} className="mt-8">
            <label htmlFor="senha-de-acesso" className="label-mono block text-navy/60">
              Senha
            </label>

            <input
              id="senha-de-acesso"
              name="senha"
              type="password"
              autoComplete="current-password"
              autoFocus
              value={digitada}
              onChange={(evento) => {
                setDigitada(evento.target.value);
                if (erro) setErro("");
              }}
              aria-describedby="erro-de-acesso"
              aria-invalid={erro.length > 0}
              // 16px no campo não é escolha estética: abaixo disso o Safari do
              // iPhone dá zoom sozinho ao focar, e a tela salta na cara de quem
              // está digitando no celular.
              className="mt-2 min-h-[52px] w-full rounded-block border-2 border-navy bg-cream-hi px-4 font-sans text-[16px] text-navy"
            />

            {/*
              A região viva fica montada desde sempre, mesmo vazia. Um
              aria-live criado junto com o texto não é anunciado: o leitor de
              tela precisa já estar observando o elemento quando o conteúdo
              muda. Sem isto, quem não enxerga a tela erra a senha e não
              recebe aviso nenhum.

              O vermelho fica na borda e no fundo, e o texto continua navy —
              o mesmo tratamento de erro do resto do site. Vermelho sobre o
              cream mede 3,1:1, abaixo do piso de 4,5:1 para texto corrido.
            */}
            <div id="erro-de-acesso" role="status" aria-live="polite" className="mt-3">
              {erro ? (
                <p className="rounded-block border-2 border-led bg-led/10 p-3 font-sans text-[13px] font-semibold leading-snug text-navy">
                  {erro}
                </p>
              ) : null}
            </div>

            <Button type="submit" className="mt-4 w-full">
              Entrar
            </Button>
          </form>

          <p className="mt-10 font-sans text-[13px] leading-relaxed text-navy/60">
            {BRAND.audience}
          </p>
        </div>
      </div>

      <div className="conteudo-protegido">{children}</div>
    </>
  );
}
