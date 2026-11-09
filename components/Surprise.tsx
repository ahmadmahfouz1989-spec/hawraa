"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { surpriseMessage, surpriseSignature } from "@/data/messages";
import { burstHearts } from "@/lib/hearts";

const HEART_PATH =
  "M50 88 C20 66 2 50 2 28 C2 13 14 2 28 2 C38 2 46 8 50 16 C54 8 62 2 72 2 C86 2 98 13 98 28 C98 50 80 66 50 88Z";

/** 🎁 مفاجأة لحوراء — نافذة بقلب يُرسم ورسالة حب */
export function Surprise() {
  const { her } = siteConfig.names;
  const [open, setOpen] = useState(false);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    burstHearts({ mode: "rain", count: 16 });
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  return (
    <section className="mx-auto flex max-w-md flex-col items-center px-4 py-14">
      <button ref={trigger} type="button" onClick={() => setOpen(true)} className="btn-love" aria-haspopup="dialog">
        🎁 مفاجأة لـ{her}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/30 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="surprise-title"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative max-h-[90dvh] w-full max-w-sm overflow-y-auto rounded-3xl bg-cream px-6 pt-8 pb-8 text-center shadow-xl"
            >
              <button
                ref={closeBtn}
                type="button"
                onClick={close}
                className="absolute top-3 left-3 grid size-9 place-items-center rounded-full text-ink-soft hover:bg-blush"
                aria-label="إغلاق"
              >
                <X className="size-5" />
              </button>

              <svg viewBox="-4 -4 108 100" className="mx-auto w-24" aria-hidden>
                <motion.path
                  d={HEART_PATH}
                  fill="#E63965"
                  initial={{ fillOpacity: 0 }}
                  animate={{ fillOpacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                />
                <motion.path
                  d={HEART_PATH}
                  fill="none"
                  stroke="#E63965"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </svg>

              <h2 id="surprise-title" className="sr-only">
                رسالة إلى {her}
              </h2>
              <p className="mt-6 text-lg leading-loose text-ink">{surpriseMessage}</p>
              <p className="mt-4 font-bold text-rose">{surpriseSignature}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
