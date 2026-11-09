/**
 * حسابات الوقت حسب المنطقة الزمنية المحددة في config/site.ts (America/Toronto افتراضيًا).
 *
 * كل الحسابات تعتمد على التاريخ الحالي وتاريخ البداية فقط، لذلك:
 *  - لا حاجة لقاعدة بيانات.
 *  - يرى جميع الزوار القيمة نفسها في اليوم نفسه (بتوقيت تورونتو)، أينما كانوا.
 *  - القيمة لا تنخفض ولا تعود للصفر بعد التحديث.
 */
import { siteConfig } from "@/config/site";

const DAY_MS = 86_400_000;

export interface YMD {
  y: number;
  m: number; // 1-12
  d: number;
}

const formatterCache = new Map<string, Intl.DateTimeFormat>();
function getFormatter(timeZone: string) {
  let f = formatterCache.get(timeZone);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    formatterCache.set(timeZone, f);
  }
  return f;
}

/** الوقت "على الحائط" في المنطقة الزمنية المطلوبة */
function wallClock(ms: number, timeZone: string) {
  const parts = getFormatter(timeZone).formatToParts(new Date(ms));
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return {
    y: get("year"),
    m: get("month"),
    d: get("day"),
    h: get("hour") % 24,
    min: get("minute"),
    s: get("second"),
  };
}

/** فرق التوقيت (بالمللي ثانية) بين المنطقة الزمنية وUTC عند لحظة معيّنة */
function offsetMs(ms: number, timeZone: string) {
  const w = wallClock(ms, timeZone);
  const asUtc = Date.UTC(w.y, w.m - 1, w.d, w.h, w.min, w.s);
  return asUtc - Math.floor(ms / 1000) * 1000;
}

/** اللحظة (UTC ms) التي يبدأ فيها منتصف الليل لتاريخ معيّن في المنطقة الزمنية — تراعي التوقيت الصيفي */
export function zonedMidnight({ y, m, d }: YMD, timeZone: string): number {
  const guess = Date.UTC(y, m - 1, d);
  const off1 = offsetMs(guess, timeZone);
  let t = guess - off1;
  const off2 = offsetMs(t, timeZone);
  if (off2 !== off1) t = guess - off2;
  return t;
}

export function parseYMD(s: string): YMD {
  const [y, m, d] = s.split("-").map(Number);
  return { y, m, d };
}

/** تاريخ اليوم في المنطقة الزمنية */
export function todayIn(nowMs: number, timeZone: string): YMD {
  const w = wallClock(nowMs, timeZone);
  return { y: w.y, m: w.m, d: w.d };
}

/** رقم اليوم التقويمي (أيام منذ 1970-01-01) — للمقارنة بين التواريخ بلا مشاكل التوقيت */
function dayNumber({ y, m, d }: YMD) {
  return Math.round(Date.UTC(y, m - 1, d) / DAY_MS);
}

function addDays(date: YMD, n: number): YMD {
  const t = new Date(Date.UTC(date.y, date.m - 1, date.d + n));
  return { y: t.getUTCFullYear(), m: t.getUTCMonth() + 1, d: t.getUTCDate() };
}

export interface LoveSnapshot {
  /** عدد الأيام الكاملة منذ البداية (لا يكون سالبًا أبدًا) */
  days: number;
  /** قيمة مؤشر الحب اليوم */
  love: number;
  /** قيمة الغد */
  tomorrowLove: number;
  /** نسبة ما مضى من اليوم الحالي (0 → 1) — للشريط الرمزي */
  dayProgress: number;
  /** الوقت المتبقي حتى منتصف الليل (ms) */
  msUntilTomorrow: number;
  /** ساعات/دقائق/ثواني منذ منتصف ليل اليوم — لعدّاد "كم يومًا مرّ" */
  hours: number;
  minutes: number;
  seconds: number;
  /** رقم اليوم التقويمي (لاختيار رسالة اليوم) */
  calendarDay: number;
}

export function getLoveSnapshot(nowMs: number = Date.now()): LoveSnapshot {
  const { timeZone, startDate, baseValue, dailyIncrease } = siteConfig.love;
  const today = todayIn(nowMs, timeZone);
  const start = parseYMD(startDate);

  const days = Math.max(0, dayNumber(today) - dayNumber(start));
  const love = baseValue + days * dailyIncrease;

  const todayStart = zonedMidnight(today, timeZone);
  const tomorrowStart = zonedMidnight(addDays(today, 1), timeZone);
  const sinceMidnight = Math.max(0, nowMs - todayStart);
  const dayLen = tomorrowStart - todayStart; // 23 أو 24 أو 25 ساعة حسب التوقيت الصيفي

  // قبل تاريخ البداية: العداد يبقى على الصفر
  const started = dayNumber(today) >= dayNumber(start);
  const totalSec = started ? Math.floor(sinceMidnight / 1000) : 0;

  return {
    days,
    love,
    tomorrowLove: love + dailyIncrease,
    dayProgress: Math.min(1, sinceMidnight / dayLen),
    msUntilTomorrow: Math.max(0, tomorrowStart - nowMs),
    hours: Math.floor(totalSec / 3600),
    minutes: Math.floor((totalSec % 3600) / 60),
    seconds: totalSec % 60,
    calendarDay: dayNumber(today),
  };
}
