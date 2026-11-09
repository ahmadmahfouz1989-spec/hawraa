import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  const { him, her } = siteConfig.names;
  return {
    name: `مؤشر حب ${him} و${her}`,
    short_name: `${him} ❤️ ${her}`,
    lang: "ar",
    dir: "rtl",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF9F7",
    theme_color: "#FCE7EF",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
