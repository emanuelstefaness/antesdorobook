import Image from "next/image";
import type { LessonPlan } from "@/data/lessonPlans";
import { lessonCover } from "@/lib/lessonCover";

export function CapaDaAula({ lesson, className = "" }: { lesson: LessonPlan; className?: string }) {
  const cover = lessonCover(lesson);

  return (
    <span className={`relative block aspect-[16/7] overflow-hidden bg-navy/5 ${className}`}>
      <Image
        unoptimized
        fill
        src={cover.src}
        alt={cover.alt}
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
    </span>
  );
}
