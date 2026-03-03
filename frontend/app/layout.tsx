import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paddock Horse Racing",
  description:
    "Turn complex race data into clear, confident decisions with real-time AI insights built for modern bettors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden font-sans bg-black text-white">{children}</body>
    </html>
  );
}
