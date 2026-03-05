import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BAF - 시각장애인의 베스트 프렌드 | AI 기반 3D 촉각 교구 변환 플랫폼",
  description:
    "단 한 장의 이미지로 세상의 모든 사물을 만져볼 수 있는 3D 촉각 교구로 변환합니다. Barrier-free AI Factory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
