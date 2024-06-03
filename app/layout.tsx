"use client";

import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "@/style/globals.css";
import Header from "@/components/Header";
const LeagueSpartan = League_Spartan({
  subsets: ["latin"],
});
import { createContext } from "react";
import { ThemeContextProps } from "@/types/types";

import { useState } from "react";

const metadata: Metadata = {
  title: "Invoice app",
  description: "Invoice App created with next.js tailwind.css mongoDB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<string>("light");
  return (
    <html lang="en" className={LeagueSpartan.className}>
      <body className="lg:flex lg:flex-row bg-ZhēnZhūBáiPearl dark:bg-RiverStyx ">
        <Header />
        <main className="grow">{children}</main>
      </body>
    </html>
  );
}
