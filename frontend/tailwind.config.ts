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
        // creative and nurturing
        // primary: "#5C4D7D", // A deep, imaginative purple
        // secondary: "#58A4B0", // A warm, nurturing teal
        // accent: "#FF6B35", // A vibrant, energetic orange
        // background: "#F7F7F2", // An off-white, clean and neutral
        background: "#FFFFFF",
        // new DirectEd colors
        primary: "#395241",
        secondary: "#6b8065",
        accent: "#374756",
        // the other community scheme
        // primary: '#588157', // An earthy green that implies growth
        // secondary: '#3C6997', // A calming, trustworthy blue
        // accent: '#FFD972', // A soft, optimistic yellow
        // background: '#EAE0D5', // A warm, bone-like neutral
      },
    },
  },
  plugins: [],
};
export default config;
