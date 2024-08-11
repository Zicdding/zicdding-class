import type { Config } from "tailwindcss";

const config: Config = {
  presets: [
    require("../packages/ui/tailwind.config")
  ],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};
export default config;
