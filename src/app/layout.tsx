import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ReduxProvider from "@/providers/reduxProvider";
import { Toaster } from "react-hot-toast"; // ✅ import Toaster

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "E-SIM AERO WORLD'S NO.1 E-SIM",
  description: "esim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/faviocn.webp" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons&display=swap"
          rel="stylesheet"
        /> 
      </head>
      <ReduxProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} antialiased`}
        >
          {/* Global toast container */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: { fontFamily: "inherit" },
            }}
          />

          <Navbar />
          {children}
          <Footer />
        </body>
      </ReduxProvider>
    </html>
  );
}
