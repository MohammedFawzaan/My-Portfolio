import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammed Fawzaan — Software Engineer",
  description: "Software engineer building thoughtful full-stack, mobile, and AI-powered products.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interFont.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="min-h-full flex flex-col relative overflow-x-hidden">{children}</body>
    </html>
  );
}
