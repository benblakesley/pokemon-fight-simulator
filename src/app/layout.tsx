'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProvider } from "@/state/ClientProvider";
import { GameOverModal } from "@/components/GameOverModal";
import { ClientPersistGate } from "@/state/ClientPersistGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <ClientProvider>
            <ClientPersistGate>
              {children}
            <GameOverModal/>
            </ClientPersistGate>
          </ClientProvider>
      </body>
    </html>
  );
}
