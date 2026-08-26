import type { Metadata } from "next";
import { BRAND } from "@/config/brand";
import { Button } from "@/components/ui/Button";
import { entrar } from "@/lib/auth/actions";

export const metadata: Metadata = {
  title: `Entrar — ${BRAND.name}`,
};

type Props = {
  searchParams: Promise<{ erro?: string; proximo?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { erro, proximo } = await searchParams;
  const destino = proximo && proximo.startsWith("/") ? proximo : "/";
  const houveErro = erro === "1";

  return (
    <div className="relative grid min-h-dvh place-items-center overflow-hidden bg-navy px-5 py-16">
      {/* Blobs desfocados atrás do cartão: o "turvo" que dá o clima de acesso
          exclusivo. Cores e blur ficam só na camada de fundo — o cartão em si
          usa .glass, a classe de vidro fosco que já existe no design system,
          então nada aqui é um material novo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 -top-28 h-[26rem] w-[26rem] rounded-full bg-cyan/25 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 h-[24rem] w-[24rem] rounded-full bg-purple/30 blur-[110px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/3 h-[22rem] w-[22rem] rounded-full bg-amber/20 blur-[110px]"
      />

      <div className="glass relative w-full max-w-[420px] rounded-card p-8 sm:p-10">
        <p className="label-mono text-navy/50">Área exclusiva</p>

        <p className="mt-3 font-display text-3xl font-extrabold leading-none tracking-display text-navy">
          {BRAND.wordmark.first} {BRAND.wordmark.second}
        </p>

        <p className="mt-5 font-sans text-[15px] leading-relaxed text-navy/75">
          Portal fechado, disponível só para professores convidados. Digite o login e a senha
          combinados para entrar.
        </p>

        <form action={entrar} className="mt-8">
          <input type="hidden" name="proximo" value={destino} />

          <label htmlFor="login-de-acesso" className="label-mono block text-navy/60">
            Login
          </label>

          <input
            id="login-de-acesso"
            name="login"
            type="text"
            autoComplete="username"
            autoFocus
            required
            aria-describedby={houveErro ? "erro-de-acesso" : undefined}
            aria-invalid={houveErro}
            className="mt-2 min-h-[52px] w-full rounded-block border-2 border-navy bg-cream-hi px-4 font-sans text-[16px] text-navy"
          />

          <label htmlFor="senha-de-acesso" className="label-mono mt-5 block text-navy/60">
            Senha
          </label>

          <input
            id="senha-de-acesso"
            name="senha"
            type="password"
            autoComplete="current-password"
            required
            aria-describedby={houveErro ? "erro-de-acesso" : undefined}
            aria-invalid={houveErro}
            className="mt-2 min-h-[52px] w-full rounded-block border-2 border-navy bg-cream-hi px-4 font-sans text-[16px] text-navy"
          />

          <div id="erro-de-acesso" role="status" aria-live="polite" className="mt-3">
            {houveErro ? (
              <p className="rounded-block border-2 border-led bg-led/10 p-3 font-sans text-[13px] font-semibold leading-snug text-navy">
                Login ou senha incorretos. Confira com quem enviou o endereço.
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
  );
}
