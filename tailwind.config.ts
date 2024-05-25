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
        PurpleImpression: "#888EB0",
        TrueLavender: "#7E88C3",
        RuinedSmores: "#0C0E16",
        KhmerCurry: "#EC5757",
        AmericanPink: "#FF9797",
        ZhēnZhūBáiPearl: "#F8F8FB",
        RiverStyx: "#141625",
        BlueIndigo: "#494E6E",
        CarbonBlue: "#373B53",
        ChillInTheAir: "#d1d4e7",
        Silver: "#bfbfbf",
      },
      screens: {
        lg: "1440px",
      },
    },
  },
  plugins: [],
};
export default config;
