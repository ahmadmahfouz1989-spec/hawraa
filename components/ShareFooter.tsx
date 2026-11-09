"use client";

import { siteConfig } from "@/config/site";
import { copyText, currentUrl } from "@/lib/share";
import { useToast } from "./Toast";

/** التذييل + زر مشاركة الرابط (ينسخ الرابط إن لم تتوفر المشاركة) */
export function ShareFooter() {
  const { him, her } = siteConfig.names;
  const toast = useToast();

  const share = async () => {
    const url = currentUrl() || siteConfig.siteUrl;
    if (navigator.share) {
      try {
        await navigator.share({ title: `مؤشر حب ${him} و${her}`, url });
      } catch {
        /* أُلغيت المشاركة */
      }
      return;
    }
    toast((await copyText(url)) ? "تم نسخ الرابط" : "لم يتم النسخ");
  };

  return (
    <footer className="mx-auto max-w-md px-4 pt-6 pb-14 text-center">
      <button type="button" onClick={share} className="text-sm text-ink-soft underline underline-offset-4 hover:text-berry">
        مشاركة رابط الموقع
      </button>
      <p className="mt-8 text-sm text-ink-soft">
        {him} ♥ {her}
      </p>
    </footer>
  );
}
