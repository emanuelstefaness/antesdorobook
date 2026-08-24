import Image from "next/image";

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5 text-left">
      <Image
        unoptimized
        priority
        src="/antes-do-robo-simbolo.png"
        width={603}
        height={493}
        alt=""
        className={compact ? "h-11 w-14 shrink-0 object-contain" : "h-16 w-20 shrink-0 object-contain"}
      />
      <span className="min-w-0 leading-none">
        <span className={`block whitespace-nowrap font-display font-extrabold tracking-[-.04em] text-white ${compact ? "text-[14px]" : "text-[20px]"}`}>
          ANTES DO <span className="text-cyan">ROBÔ</span>
        </span>
        <span className={`mt-1.5 block whitespace-nowrap font-sans font-medium tracking-[.06em] text-white/72 ${compact ? "text-[7.5px]" : "text-[9px]"}`}>
          CILLA <strong className="font-bold text-cyan">TECH</strong> PARK
        </span>
      </span>
    </span>
  );
}
