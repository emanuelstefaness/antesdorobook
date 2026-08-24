import Link from "next/link";
import { BotaoDeBloqueio } from "@/components/auth/BotaoDeBloqueio";
import { BRAND } from "@/config/brand";
import { NAV_ITEMS, SECONDARY_LINKS } from "@/lib/nav";
import { MotionToggle } from "./MotionToggle";
import { BrandLockup } from "./BrandLockup";

export function Footer() {
  return (
    <footer className="mt-12 bg-navy text-cream-hi md:mt-24">
      <div className="mx-auto grid max-w-[1400px] gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-10 md:py-14">
        <div>
          <BrandLockup />
          <p className="mt-4 max-w-[38ch] font-sans text-[13px] leading-relaxed text-cream-hi/65">
            {BRAND.tagline}
          </p>
          <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-label text-cream-hi/60">
            {BRAND.audience}
          </p>
        </div>

        <nav aria-label="Etapas da jornada">
          <h2 className="label-mono mb-4 text-cyan">A jornada</h2>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="font-sans text-[13px] text-cream-hi/75 hover:text-cream-hi"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Apoio">
          <h2 className="label-mono mb-4 text-cyan">Apoio</h2>
          <ul className="space-y-2">
            {SECONDARY_LINKS.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="font-sans text-[13px] text-cream-hi/75 hover:text-cream-hi"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <MotionToggle />
            </li>
            <li>
              <BotaoDeBloqueio />
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
