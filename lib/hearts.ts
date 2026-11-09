/**
 * نظام بسيط لإطلاق "قلوب متطايرة" (Confetti على شكل قلوب) من أي مكان في الموقع.
 * أي مكوّن يستدعي burstHearts() ويستمع إليه المكوّن <HeartConfetti />.
 */
export interface HeartBurst {
  x: number;
  y: number;
  count: number;
  /** "burst" = انفجار من نقطة، "rain" = مطر قلوب من الأعلى */
  mode: "burst" | "rain";
}

const EVENT = "love:hearts";

export function burstHearts(opts: Partial<HeartBurst> = {}) {
  if (typeof window === "undefined") return;
  const detail: HeartBurst = {
    x: opts.x ?? window.innerWidth / 2,
    y: opts.y ?? window.innerHeight / 2,
    count: opts.count ?? 18,
    mode: opts.mode ?? "burst",
  };
  window.dispatchEvent(new CustomEvent<HeartBurst>(EVENT, { detail }));
}

/** إطلاق القلوب من منتصف عنصر (زر مثلًا) */
export function burstFromElement(el: Element | null, count = 18) {
  if (!el) return burstHearts({ count });
  const r = el.getBoundingClientRect();
  burstHearts({ x: r.left + r.width / 2, y: r.top + r.height / 2, count });
}

export function onHearts(cb: (b: HeartBurst) => void) {
  const handler = (e: Event) => cb((e as CustomEvent<HeartBurst>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}
