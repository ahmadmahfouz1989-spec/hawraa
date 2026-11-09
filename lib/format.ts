const nf = new Intl.NumberFormat("en-US");

/** تنسيق الأرقام بفواصل الآلاف: 1,000,000 */
export function formatNumber(n: number) {
  return nf.format(Math.floor(n));
}

/** صيغة "يوم/يومًا/أيام" العربية الصحيحة */
export function pluralDays(n: number) {
  if (n === 1) return "يوم واحد";
  if (n === 2) return "يومان";
  if (n >= 3 && n <= 10) return `${formatNumber(n)} أيام`;
  return `${formatNumber(n)} يومًا`;
}
