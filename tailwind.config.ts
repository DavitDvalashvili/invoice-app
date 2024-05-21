import type { Config } from "tailwindcss";

const config: Config = {
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
        "light-headerBackground": "#373B53",
        "dark-headerBackground": "#1E2139",
        "light-background": "#F8F8FB",
        "dark-background": "#141625",
        "light-mainText": "#0C0E16",
        "dark-mainText": "#ffffff",
        trueLavender: "#7E88C3",
        "light-clientName": "#858BB2",
        "dark-clientName": "#FFFFFF",
        paid: "#33D69F",
        pending: "#FF8F00",
        "light-draft": "#373B53",
        "dark-draft": "#373B53",
        "light-invoiceBackground": "#ffffff",
        "dark-invoiceBackground": "#1E2139",
        buttonBg: "#7C5DFA",
        buttonBgHover: "#9277FF",
        deleteButtonBg: "#EC5757",
        deleteButtonBgHover: "#9277FF",
        blueIndigo: "#494E6E",
      },
      screens: {
        lg: "1440px",
      },
    },
  },
  plugins: [],
};
export default config;
