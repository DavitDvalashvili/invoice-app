import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        VenetianNights: "#7C5DFA",
        ForgottenPurple: "#9277FF",
        Kon: "#1E2139",
        RoyalCurtsy: "#252945",
        StoicWhite: "#DFE3FA",
        StoicWhite2: "rgba(223, 227, 250, 0.0571)",
        PurpleImpression: "#888EB0",
        TrueLavender: "#7E88C3",
        RuinedSmores: "#0C0E16",
        KhmerCurry: "#EC5757",
        AmericanPink: "#FF9797",
        ZhēnZhūBáiPearl: "#F8F8FB",
        RiverStyx: "#141625",
        BlueIndigo: "#494E6E",
        CarbonBlue: "#373B53",
        CarbonBlue2: "rgba(55, 59, 83, 0.0571)",
        ChillInTheAir: "#d1d4e7",
        Silver: "#bfbfbf",
        PrincetonOrange: "#FF8F00",
        PrincetonOrange2: "rgba(255, 143, 0, 0.0571)",
        DarkShamrock: "#33D69F",
        DarkShamrock2: "rgba(51, 214, 159, 0.0571)",
        Black2: "rgba(0, 0, 0, 0.4984)",
        StoneWash: "#777F98",
        WashMe: "#f9fafe",
        blackLight: "rgba(0, 0, 0, 0.4984)",
      },
      screens: {
        lg: "1440px",
      },
    },
  },
  plugins: [],
};
export default config;
