"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { tapMessages } from "@/data/messages";
import { burstFromElement } from "@/lib/hearts";

/** زر "اضغطي هنا يا حوراء ❤️" — رسالة مختلفة في كل ضغطة */
export function TapForLove() {
  const [index, setIndex] = useState<number | null>(null);
  const btn = useRef<HTMLButtonElement>(null);

  const onTap = () => {
    let next = Math.floor(Math.random() * tapMessages.length);
    if (tapMessages.length > 1) while (next === index) next = Math.floor(Math.random() * tapMessages.length);
    setIndex(next);
    burstFromElement(btn.current, 10);
  };

  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <button ref={btn} type="button" onClick={onTap} className="btn-love">
        اضغطي هنا يا {siteConfig.names.her} ❤️
      </button>

      <div className="mt-5 min-h-16" aria-live="polite">
        <AnimatePresence mode="wait">
          {index !== null && (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-lg leading-relaxed text-berry"
            >
              {tapMessages[index]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
