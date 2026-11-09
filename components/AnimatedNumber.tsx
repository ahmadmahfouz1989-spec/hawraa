"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { formatNumber } from "@/lib/format";

interface Props {
  value: number | null;
  /** من أين يبدأ العدّ عند أول ظهور */
  from?: number;
  duration?: number;
  className?: string;
}

/** رقم يعدّ بسلاسة حتى القيمة المطلوبة (يحترم إعداد تقليل الحركة) */
export function AnimatedNumber({ value, from = 0, duration = 2.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const current = useRef(from);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (value === null || !ref.current) return;
    const el = ref.current;
    if (reduce) {
      current.current = value;
      el.textContent = formatNumber(value);
      return;
    }
    const controls = animate(current.current, value, {
      duration: current.current === from ? duration : 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        current.current = v;
        el.textContent = formatNumber(v);
      },
    });
    return () => controls.stop();
  }, [value, reduce, duration, from]);

  return (
    <span ref={ref} dir="ltr" className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {formatNumber(from)}
    </span>
  );
}
