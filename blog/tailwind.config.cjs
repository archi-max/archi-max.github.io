const preset = require("../tailwind.preset.cjs");

module.exports = {
  presets: [preset],
  content: [
    "./pages/**/*.{mdx,md,tsx,jsx,ts,js}",
    "./src/**/*.{mdx,md,tsx,jsx,ts,js}",
  ],
};
