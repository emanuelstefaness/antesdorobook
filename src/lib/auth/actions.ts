"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { HASH_DA_SENHA, senhaCorreta } from "./gate";

/**
 * Nome do cookie de sessão. O valor guardado é o hash da senha aceita, não um
 * `true` — o mesmo motivo do portão antigo em localStorage: se a senha for
 * trocada, quem já tinha entrado com a senha antiga volta a ver o login,
 * porque o cookie não bate mais com HASH_DA_SENHA.
 */
const NOME_DO_COOKIE = "adr_sessao";
const TRINTA_DIAS = 60 * 60 * 24 * 30;

export async function entrar(formData: FormData): Promise<void> {
  const senha = String(formData.get("senha") ?? "");
  const proximo = String(formData.get("proximo") ?? "/");
  const destino = proximo.startsWith("/") ? proximo : "/";

  if (!senhaCorreta(senha)) {
    redirect(`/login?erro=1&proximo=${encodeURIComponent(destino)}`);
  }

  const store = await cookies();
  store.set(NOME_DO_COOKIE, HASH_DA_SENHA, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TRINTA_DIAS,
  });

  redirect(destino);
}

export async function sair(): Promise<void> {
  const store = await cookies();
  store.delete(NOME_DO_COOKIE);
  redirect("/login");
}
