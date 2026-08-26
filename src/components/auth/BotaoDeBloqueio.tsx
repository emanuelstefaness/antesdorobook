import { sair } from "@/lib/auth/actions";

/**
 * Sem isto o acesso seria de mão única: uma vez logado, não haveria como
 * voltar à tela de login a não ser limpando os dados do navegador na mão.
 * Vale para o computador emprestado da escola e para conferir se o login
 * continua funcionando depois de uma troca de senha.
 */
export function BotaoDeBloqueio() {
  return (
    <form action={sair}>
      <button
        type="submit"
        className="inline-flex min-h-[44px] items-center justify-center font-sans text-[12px] font-semibold text-cream-hi/70 underline underline-offset-4 hover:text-cream-hi"
      >
        Sair
      </button>
    </form>
  );
}
