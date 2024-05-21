"use client";

import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
//const inter = Inter({ subsets: ["latin"] });
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

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  setTheme: () => {},
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<string>("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <html lang="en" className={LeagueSpartan.className}>
        <body>
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </ThemeContext.Provider>
  );
}
