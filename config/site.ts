/**
 * ============================================================
 *  ❤️ إعدادات الموقع الرئيسية — Ahmad & Hawraa Love Index
 * ============================================================
 *
 *  هذا هو الملف الوحيد الذي تحتاج تعديله غالبًا:
 *   - الأسماء              → names
 *   - تاريخ بداية الحب     → love.startDate   (صيغة YYYY-MM-DD)
 *   - المنطقة الزمنية       → love.timeZone
 *   - قيمة البداية والزيادة → love.baseValue / love.dailyIncrease
 *   - رابط الموقع بعد النشر → siteUrl (أو متغير البيئة NEXT_PUBLIC_SITE_URL)
 *   - ملف الموسيقى         → music.src
 *
 *  الرسائل والأسباب والخط الزمني موجودة في مجلد /data
 */

export const siteConfig = {
  /** اسم المشروع (يظهر في البيانات الوصفية) */
  projectName: "Ahmad & Hawraa — Love Index",

  /** ✏️ غيّر الأسماء من هنا */
  names: {
    him: "أحمد",
    her: "حوراء",
  },

  /** ✏️ رابط الموقع بعد النشر على Vercel (يُستخدم في المشاركة وOpen Graph) */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahmad-hawraa.vercel.app",

  love: {
    /**
     * ✏️ تاريخ بداية الحب (اليوم الذي بدأت فيه القصة) بصيغة YYYY-MM-DD.
     * القيمة الحالية تجريبية — ضع تاريخكما الحقيقي هنا.
     */
    startDate: "2024-01-01",

    /** المنطقة الزمنية التي تُحسب بها الأيام (منتصف الليل في تورونتو = يوم جديد) */
    timeZone: "America/Toronto",

    /** قيمة المؤشر في اليوم الأول */
    baseValue: 1_000_000,

    /** الزيادة اليومية */
    dailyIncrease: 1_000,

    /** كل مضاعف لهذا الرقم يُعتبر "رقمًا مميزًا" ويظهر له تصميم احتفالي خاص */
    milestoneStep: 1_000_000,
  },

  music: {
    /**
     * ✏️ ضع ملف موسيقى مرخّصًا في المسار public/music/romantic.mp3
     * (مثل موسيقى من Pixabay Music أو أي مصدر برخصة تسمح بالاستخدام).
     * ثم اكتب هنا: "/music/romantic.mp3" — طالما بقي فارغًا "" فلن يظهر زر الموسيقى.
     */
    src: "",
    volume: 0.35,
  },
} as const;

export type SiteConfig = typeof siteConfig;
