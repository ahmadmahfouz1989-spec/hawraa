import { timeline } from "@/data/timeline";
import { Section } from "./Section";

/**
 * حكايتنا الجميلة — البيانات في data/timeline.ts
 * غير معروض حاليًا. لإظهاره أضف <Timeline /> في app/page.tsx
 */
export function Timeline() {
  return (
    <Section id="story" title="حكايتنا الجميلة">
      <ol className="space-y-3">
        {timeline.map((item, i) => (
          <li key={i} className="card px-5 py-4">
            <p className="text-xs text-ink-soft">{item.date}</p>
            <h3 className="mt-1 font-bold text-berry">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
