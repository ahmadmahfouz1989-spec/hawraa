"use client";

import { useMemo } from "react";
import { siteConfig } from "@/config/site";
import { getAllDailyMessages } from "@/data/dailyMessages";
import { getLoveSnapshot } from "@/lib/time";
import { useNow } from "@/lib/useNow";
import { copyText, currentUrl, whatsappUrl } from "@/lib/share";
import { useToast } from "./Toast";
import { Section } from "./Section";

const messages = getAllDailyMessages();

/** رسالة اليوم — نفس الرسالة لكل الزوار طوال اليوم (حسب توقيت الموقع) */
export function DailyMessage() {
  const now = useNow(60_000);
  const toast = useToast();

  const message = useMemo(() => {
    if (now === null) return null;
    const day = getLoveSnapshot(now).calendarDay;
    return messages[((day % messages.length) + messages.length) % messages.length];
  }, [now]);

  const onCopy = async () => {
    if (!message) return;
    toast((await copyText(message)) ? "تم النسخ ❤️" : "لم يتم النسخ");
  };

  return (
    <Section id="daily" title={`رسالة اليوم إلى ${siteConfig.names.her}`}>
      <div className="card px-6 py-8 text-center">
        <p className="min-h-20 text-xl leading-loose text-ink">{message ?? "…"}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={onCopy} className="btn-soft">
            نسخ
          </button>
          <a
            href={whatsappUrl(`${message ?? ""}\n\n${currentUrl()}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-soft"
          >
            إرسال عبر واتساب
          </a>
        </div>
      </div>
    </Section>
  );
}
