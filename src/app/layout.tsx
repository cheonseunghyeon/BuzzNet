import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../utils/providers";
import Header from "@/components/commons/Header";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <Providers>
          {children} {modal}
        </Providers>

        <div id="modal-root" className="relative z-50" />
      </body>
    </html>
  );
}
