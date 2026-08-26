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
    <div className="grid min-h-[calc(100dvh-4rem)] place-items-center bg-cream px-5 py-16">
      <div className="w-full max-w-[420px]">
        <p className="label-mono text-navy/60">Acesso restrito</p>

        <p className="mt-3 font-display text-3xl font-extrabold leading-none tracking-display text-navy">
          {BRAND.wordmark.first} {BRAND.wordmark.second}
        </p>

        <p className="mt-5 font-sans text-[15px] leading-relaxed text-navy/75">
          Este material ainda está sendo preparado para os professores. Digite a senha combinada
          para entrar.
        </p>

        <form action={entrar} className="mt-8">
          <input type="hidden" name="proximo" value={destino} />

          <label htmlFor="senha-de-acesso" className="label-mono block text-navy/60">
            Senha
          </label>

          <input
            id="senha-de-acesso"
            name="senha"
            type="password"
            autoComplete="current-password"
            autoFocus
            required
            aria-describedby={houveErro ? "erro-de-acesso" : undefined}
            aria-invalid={houveErro}
            className="mt-2 min-h-[52px] w-full rounded-block border-2 border-navy bg-cream-hi px-4 font-sans text-[16px] text-navy"
          />

          <div id="erro-de-acesso" role="status" aria-live="polite" className="mt-3">
            {houveErro ? (
              <p className="rounded-block border-2 border-led bg-led/10 p-3 font-sans text-[13px] font-semibold leading-snug text-navy">
                Senha incorreta. Confira com quem enviou o endereço.
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
