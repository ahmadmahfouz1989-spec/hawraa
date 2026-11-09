"use client";

import { MotionConfig } from "motion/react";
import { ToastProvider } from "./Toast";
import { HeartConfetti } from "./HeartConfetti";

/** يحترم إعداد "تقليل الحركة" ويضيف القلوب المتطايرة والإشعارات */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        {children}
        <HeartConfetti />
      </ToastProvider>
    </MotionConfig>
  );
}
