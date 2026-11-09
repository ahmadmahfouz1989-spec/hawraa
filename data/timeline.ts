/**
 * ✏️ الخط الزمني "حكايتنا الجميلة"
 *
 * المحتوى الحالي تجريبي — غيّر العناوين والتواريخ والنصوص لتحكي قصتكما الحقيقية.
 * - date: نص حر يظهر كما هو (مثال: "١٤ فبراير ٢٠٢٤" أو "صيف ٢٠٢٤")
 * - icon: اسم أيقونة من القائمة: "sparkles" | "heart" | "coffee" | "star" | "infinity" | "camera" | "gift" | "moon"
 */

export type TimelineIcon =
  | "sparkles"
  | "heart"
  | "coffee"
  | "star"
  | "infinity"
  | "camera"
  | "gift"
  | "moon";

export interface TimelineItem {
  date: string;
  title: string;
  text: string;
  icon: TimelineIcon;
}

export const timeline: TimelineItem[] = [
  {
    date: "[ضع التاريخ هنا]",
    title: "يوم بدأت قصتنا",
    text: "[اكتب هنا كيف بدأت الحكاية… اللحظة التي عرف فيها القلب طريقه.]",
    icon: "sparkles",
  },
  {
    date: "[ضع التاريخ هنا]",
    title: "أول لقاء",
    text: "[اكتب هنا تفاصيل أول لقاء: المكان، الشعور، أول كلمة.]",
    icon: "coffee",
  },
  {
    date: "[ضع التاريخ هنا]",
    title: "أول ذكرى جميلة",
    text: "[اكتب هنا أول ذكرى جميلة جمعتكما.]",
    icon: "camera",
  },
  {
    date: "[ضع التاريخ هنا]",
    title: "أجمل لحظة عشناها",
    text: "[اكتب هنا اللحظة التي لا تُنسى.]",
    icon: "star",
  },
  {
    date: "اليوم، وغدًا، وإلى الأبد",
    title: "وما زالت الحكاية تُكتب",
    text: "كل يوم نضيف إلى قصتنا صفحة جديدة، وكل صفحة أجمل من التي قبلها.",
    icon: "infinity",
  },
];
