import type { Metadata } from "next";
import localFont from "next/font/local";

import { StarWeaveProvider } from "@/components/StarWeaveContext";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/Geist-VariableFont_wght.ttf",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMono-VariableFont_wght.ttf",
  variable: "--font-geist-mono",
  display: "swap",
});

const syne = localFont({
  src: "./fonts/Syne-VariableFont_wght.ttf",
  variable: "--font-syne",
  display: "swap",
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
