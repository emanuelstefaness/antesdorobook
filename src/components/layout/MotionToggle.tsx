"use client";

import { useReducedAnimations } from "@/lib/useProgress";

export function MotionToggle() {
  const { reduced, toggle } = useReducedAnimations();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={reduced}
      className="inline-flex min-h-[44px] items-center justify-center font-sans text-[12px] font-semibold text-cream-hi/70 underline underline-offset-4 hover:text-cream-hi"
    >
      Reduzir animações
    </button>
  );
}
