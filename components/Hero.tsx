import { siteConfig } from "@/config/site";
import { LoveIndex } from "./LoveIndex";
import { TapForLove } from "./TapForLove";

const { him, her } = siteConfig.names;

export function Hero() {
  return (
    <div className="mx-auto flex min-h-[100dvh] max-w-md flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="font-display text-5xl leading-[1.5] text-berry sm:text-6xl">
        {him} <span className="text-rose">♥</span> {her}
      </h1>

      <LoveIndex />
      <TapForLove />
    </div>
  );
}
