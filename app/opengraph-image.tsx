import { ImageResponse } from "next/og";

// صورة المشاركة (Open Graph) التي تظهر عند إرسال الرابط في واتساب وغيره.
// النص لاتيني لأن مولّد الصور لا يدعم تشكيل الحروف العربية بشكل كامل.
export const alt = "Ahmad & Hawraa — Love Index";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FFF9F7 0%, #FCE7EF 55%, #F7C9D7 100%)",
          color: "#4a1a2c",
          fontFamily: "serif",
        }}
      >
        <svg width="150" height="138" viewBox="0 0 100 92">
          <path
            d="M50 88 C20 66 2 50 2 28 C2 13 14 2 28 2 C38 2 46 8 50 16 C54 8 62 2 72 2 C86 2 98 13 98 28 C98 50 80 66 50 88Z"
            fill="#E63965"
          />
        </svg>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24, color: "#B83259" }}>Ahmad &amp; Hawraa</div>
        <div style={{ fontSize: 40, marginTop: 8, color: "#D4AF77", letterSpacing: 6 }}>LOVE INDEX</div>
        <div style={{ fontSize: 30, marginTop: 28, color: "#7d4a5c" }}>A love that grows with every heartbeat</div>
      </div>
    ),
    size,
  );
}
