"use client";

import { motion } from "motion/react";
import { Music, Pause } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { useToast } from "./Toast";

/**
 * زر الموسيقى — لا تبدأ الموسيقى إلا بعد ضغط المستخدم (احترامًا للمتصفحات وللزائر).
 * الملف يُحدَّد في config/site.ts → music.src
 */
export function MusicToggle() {
  const { src, volume } = siteConfig.music;
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const toast = useToast();

  useEffect(() => () => audio.current?.pause(), []);

  if (!src) return null;

  const toggle = async () => {
    if (!audio.current) {
      const a = new Audio(src);
      a.loop = true;
      a.volume = volume;
      a.preload = "none";
      a.addEventListener("ended", () => setPlaying(false));
      audio.current = a;
    }
    const a = audio.current;
    if (playing) {
      a.pause();
      setPlaying(false);
      return;
    }
    try {
      await a.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
      audio.current = null;
      toast("لم يتم العثور على ملف الموسيقى 🎵");
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className="card fixed top-4 left-4 z-50 grid size-12 place-items-center rounded-full text-berry"
      aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
      aria-pressed={playing}
    >
      {playing ? <Pause className="size-5" /> : <Music className="size-5" />}
      {playing && (
        <span className="absolute inset-0 animate-ping rounded-full ring-2 ring-rose/40 [animation-duration:2s]" aria-hidden />
      )}
    </motion.button>
  );
}
