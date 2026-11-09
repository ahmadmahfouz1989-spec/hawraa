"use client";

import { useEffect, useState } from "react";

/**
 * يعيد الوقت الحالي ويحدّثه كل ثانية.
 * يكون null أثناء العرض على الخادم لتجنّب اختلاف القيم (hydration mismatch).
 */
export function useNow(intervalMs = 1000): number | null {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
