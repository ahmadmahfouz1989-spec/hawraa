import { Hero } from "@/components/Hero";
import { LoveLetter } from "@/components/LoveLetter";

// الموقع صفحة واحدة بسيطة.
// أقسام إضافية جاهزة إن أردتها لاحقًا (أضفها تحت <Hero />):
//   <Reasons />       من "@/components/Reasons"
//   <DailyMessage />  من "@/components/DailyMessage"
//   <Surprise />      من "@/components/Surprise"
//   <Timeline />      من "@/components/Timeline"

export default function Home() {
  return (
    <main>
      <Hero />
      <LoveLetter />
    </main>
  );
}
