import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Geo Presisi Survey | Kontraktor Bangunan Sukabumi Terpercaya",
  description: "Jasa Bangun & Renovasi Rumah terbaik dan terpercaya.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable}`}>
        {children}
      </body>
    </html>
  );
}
