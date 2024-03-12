import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lato } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";


const lato = Lato({ subsets: ["latin"], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: "E-Comm",
  description: "Avataar.ai Assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
