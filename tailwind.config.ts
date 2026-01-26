import type { Config } from "tailwindcss";
import preset from "./tailwind.preset.cjs";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  presets: [preset],
} satisfies Config;
