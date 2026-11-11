import { loveLetter } from "@/data/loveLetter";
import { siteConfig } from "@/config/site";
import { Section } from "./Section";

/** رسالة حب قصيرة تظهر تحت القسم الرئيسي */
export function LoveLetter() {
  return (
    <Section id="letter" title={<>إلى {siteConfig.names.her} <span className="text-rose">♥</span></>}>
      <article className="card space-y-5 px-6 py-8 text-lg leading-loose text-ink">
        {loveLetter.map((paragraph, i) => (
          <p key={i} className={i === loveLetter.length - 1 ? "font-bold text-berry" : undefined}>
            {paragraph}
          </p>
        ))}
        <p className="pt-2 text-left font-display text-2xl text-berry">— {siteConfig.names.him}</p>
      </article>
    </Section>
  );
}
