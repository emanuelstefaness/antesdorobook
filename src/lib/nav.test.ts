import { describe, expect, it } from "vitest";
import { NAV_GROUPS, NAV_ITEMS, SECONDARY_LINKS, rotuloDoMenuSecundario } from "./nav";

describe("nav", () => {
  it("organiza a navegação em quatro decisões principais", () => {
    expect(NAV_GROUPS.map((group) => group.id)).toEqual(["preparacao", "recursos", "aulas", "apoio"]);
    expect(NAV_GROUPS.flatMap((group) => group.items).map((item) => item.href)).not.toContain("/trilhas");
    expect(NAV_GROUPS[0].items.map((item) => item.href)).toEqual(["/preparar", "/aprender", "/robotica", "/componentes", "/microbit", "/makecode"]);
    expect(NAV_GROUPS[1].items[0]).toMatchObject({ label: "Todas as aulas", href: "/planejar" });
  });

  it("o rótulo do menu 'Mais' cita todos os links que ele contém", () => {
    // A versão escrita à mão ficou para trás quando a busca entrou no menu:
    // quem usa leitor de tela continuou ouvindo três itens onde havia quatro.
    const rotulo = rotuloDoMenuSecundario();
    for (const item of SECONDARY_LINKS) {
      expect(rotulo.toLowerCase(), `faltou "${item.label}"`).toContain(item.label.toLowerCase());
    }
  });

  it("os links de apoio têm rota própria e não repetem a navbar", () => {
    const principais = new Set(NAV_ITEMS.map((i) => i.href));
    for (const item of SECONDARY_LINKS) {
      expect(item.href.startsWith("/"), item.id).toBe(true);
      expect(principais.has(item.href), `${item.href} já está na navbar`).toBe(false);
    }
  });
});
