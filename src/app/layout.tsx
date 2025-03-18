'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProvider } from "@/state/ClientProvider";
import { GameOverModal } from "@/components/GameOverModal";
import { ClientPersistGate } from "@/state/ClientPersistGate";
import { GlobalStyles } from "@mui/material";

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
            <GlobalStyles
              styles={{
                body: {
                  backgroundImage: "url('/battleArena.jpg')", // Change to your image path
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  minHeight: "100vh",
                  margin: 0,
                  padding: 0,
                },
              }}
            />
              {children}
            <GameOverModal/>
            </ClientPersistGate>
          </ClientProvider>
      </body>
    </html>
  );
}
