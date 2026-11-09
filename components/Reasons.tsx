"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { reasons } from "@/data/reasons";
import { formatNumber } from "@/lib/format";
import { Section } from "./Section";

/** ترتيب عشوائي يضمن ظهور كل الأسباب قبل أن يتكرر أي منها */
function shuffled(n: number) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function Reasons() {
  const { him, her } = siteConfig.names;
  const [order, setOrder] = useState<number[]>(() => reasons.map((_, i) => i));
  const [pos, setPos] = useState(0);

  // يبدأ بالسبب الأول، ثم ترتيب عشوائي للباقي
  useEffect(() => {
    setOrder([0, ...shuffled(reasons.length).filter((i) => i !== 0)]);
  }, []);

  const next = () => {
    if (pos + 1 >= order.length) {
      setOrder(shuffled(reasons.length));
      setPos(0);
    } else {
      setPos(pos + 1);
    }
  };

  const idx = order[pos];

  return (
    <Section id="reasons" title={`${formatNumber(reasons.length)} سبب يجعل ${him} يحب ${her}`}>
      <div className="card px-6 py-8 text-center">
        <div className="flex min-h-24 items-center justify-center" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.p
              key={pos}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-xl leading-relaxed font-bold text-ink"
            >
              {reasons[idx]}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="mt-3 text-xs text-ink-soft" dir="ltr">
          {formatNumber(idx + 1)} / {formatNumber(reasons.length)}
        </p>
        <button type="button" onClick={next} className="btn-soft mt-5">
          اكتشفي سببًا آخر ❤️
        </button>
      </div>
    </Section>
  );
}
