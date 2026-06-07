/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ray: {
          bg: "#0c0e12",
          surface: "#1c1e26",
          border: "#23252e",
          muted: "#6b6e7b",
          text: "#e4e4e7",
          accent: "#3b82f6",
          "accent-glow": "rgba(59, 130, 246, 0.25)",
          glow: "#8b5cf6",
          "glow-glow": "rgba(139, 92, 246, 0.25)",
          success: "#22c55e",
          danger: "#ef4444",
        },
      },
      boxShadow: {
        panel:
          "0 0 0 1px rgba(35, 37, 46, 0.6), 0 8px 32px rgba(0, 0, 0, 0.45)",
        glow: "0 0 12px rgba(139, 92, 246, 0.35)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
