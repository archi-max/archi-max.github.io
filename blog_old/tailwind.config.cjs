const preset = require("../tailwind.preset.cjs");

module.exports = {
  presets: [preset],
  content: ["./pages/**/*.{mdx,md}", "./src/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
};
