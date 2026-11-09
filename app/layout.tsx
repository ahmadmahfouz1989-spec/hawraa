import type { Metadata, Viewport } from "next";
import { Aref_Ruqaa, Tajawal } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Providers } from "@/components/Providers";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "700", "800"],
  variable: "--font-tajawal",
  display: "swap",
});

const ruqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-ruqaa",
  display: "swap",
});

const { him, her } = siteConfig.names;
const title = `مؤشر حب ${him} و${her} ❤️`;
const description = `${him} ❤️ ${her} — حبّ يكبر مع كل نبضة قلب. كل يوم يمرّ، أحبكِ أكثر من اليوم الذي قبله.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title,
  description,
  applicationName: siteConfig.projectName,
  keywords: ["حب", "مؤشر الحب", him, her, "Love Index"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: "/",
    siteName: siteConfig.projectName,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fce7ef",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${ruqaa.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
