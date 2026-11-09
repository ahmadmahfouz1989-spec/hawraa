"use client";

import { useMemo } from "react";
import { getLoveSnapshot } from "@/lib/time";
import { useNow } from "@/lib/useNow";
import { AnimatedNumber } from "./AnimatedNumber";

/**
 * مؤشر الحب = 1,000,000 + (عدد الأيام منذ البداية × 1,000)
 * التاريخ والأرقام في config/site.ts
 */
export function LoveIndex() {
  const now = useNow(60_000);
  const love = useMemo(() => (now === null ? null : getLoveSnapshot(now).love), [now]);

  return (
    <div className="mt-12">
      <AnimatedNumber value={love} className="block text-6xl font-extrabold tracking-tight text-rose sm:text-7xl" />
      <p className="mt-3 text-ink-soft">نقطة حب</p>
      <p className="mt-10 text-lg leading-relaxed text-ink">كل يوم يمرّ، أحبكِ أكثر من اليوم الذي قبله.</p>
    </div>
  );
}
