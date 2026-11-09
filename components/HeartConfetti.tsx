"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { onHearts, type HeartBurst } from "@/lib/hearts";

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rot: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
}

const COLORS = ["#E63965", "#B83259", "#D4AF77", "#F28AA8", "#FF5C8A"];
const MAX_PARTICLES = 90; // حد أعلى للحفاظ على الأداء في الهاتف

function HeartShape({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        fill={color}
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );
}

/** يرسم القلوب المتطايرة (Confetti) — يستمع إلى burstHearts() */
export function HeartConfetti() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    return onHearts((b: HeartBurst) => {
      if (reduce) return;
      const count = Math.min(b.count, 40);
      const w = window.innerWidth;
      const h = window.innerHeight;
      const fresh: Particle[] = Array.from({ length: count }, () => {
        const id = ++idRef.current;
        if (b.mode === "rain") {
          return {
            id,
            x: Math.random() * w,
            y: -30,
            dx: (Math.random() - 0.5) * 120,
            dy: h + 60,
            rot: (Math.random() - 0.5) * 360,
            size: 14 + Math.random() * 16,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            delay: Math.random() * 1.6,
            duration: 3 + Math.random() * 2,
          };
        }
        const angle = Math.random() * Math.PI * 2;
        const dist = 80 + Math.random() * 160;
        return {
          id,
          x: b.x,
          y: b.y,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 120,
          rot: (Math.random() - 0.5) * 120,
          size: 12 + Math.random() * 18,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          delay: Math.random() * 0.12,
          duration: 1.2 + Math.random() * 0.6,
        };
      });
      setParticles((p) => [...p, ...fresh].slice(-MAX_PARTICLES));
    });
  }, [reduce]);

  const remove = (id: number) => setParticles((p) => p.filter((x) => x.id !== id));

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden>
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: p.x, top: p.y, marginLeft: -p.size / 2, marginTop: -p.size / 2 }}
            initial={{ x: 0, y: 0, scale: 0.3, opacity: 1, rotate: 0 }}
            animate={{ x: p.dx, y: p.dy, scale: 1, opacity: [1, 1, 0], rotate: p.rot }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
            onAnimationComplete={() => remove(p.id)}
          >
            <HeartShape color={p.color} size={p.size} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
