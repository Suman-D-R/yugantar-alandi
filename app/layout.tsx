import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "आलंदी नगरपरिषद",
  description: "Survey of Water Connections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="p-4 bg-gray-800 text-white">
          <Link href="/" className="mr-4">
            Home
          </Link>
          <Link href="/admin" className="mr-4">
            Admin
          </Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
