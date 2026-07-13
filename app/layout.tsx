import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";

import { StarWeaveProvider } from "@/components/StarWeaveContext";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StarWeave",
  description: "Weaving through the cosmos one celestial object at a time!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StarWeaveProvider>{children}</StarWeaveProvider>
      </body>
    </html>
  );
}
