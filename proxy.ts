import { NextResponse, type NextRequest } from "next/server";
import { HASH_DA_SENHA } from "@/lib/auth/gate";

const NOME_DO_COOKIE = "adr_sessao";

/**
 * Guarda o site inteiro atrás do login. O cookie guarda o hash da senha
 * aceita (não um `true`): se a senha for trocada em @/lib/auth/gate, todo
 * mundo que já tinha entrado volta a ver a tela de login, sem precisar
 * invalidar sessão nenhuma na mão.
 */
export function proxy(request: NextRequest) {
  const cookie = request.cookies.get(NOME_DO_COOKIE)?.value;
  if (cookie === HASH_DA_SENHA) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = `?proximo=${encodeURIComponent(request.nextUrl.pathname)}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!login|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|assets|imagens|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json|woff2?)$).*)",
  ],
};
