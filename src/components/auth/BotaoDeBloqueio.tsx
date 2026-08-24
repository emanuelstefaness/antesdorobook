"use client";

import { trancarAcesso } from "@/lib/auth/gate";

/**
 * Sem isto o acesso seria de mão única: uma vez digitada a senha, não haveria
 * como voltar ao portão a não ser limpando os dados do navegador na mão. Vale
 * para o computador emprestado da escola e para conferir se o portão continua
 * funcionando depois de uma troca de senha.
 */
export function BotaoDeBloqueio() {
  return (
    <button
      type="button"
      onClick={() => {
        trancarAcesso();
        window.location.reload();
      }}
      className="inline-flex min-h-[44px] items-center justify-center font-sans text-[12px] font-semibold text-cream-hi/70 underline underline-offset-4 hover:text-cream-hi"
    >
      Bloquear o acesso
    </button>
  );
}
