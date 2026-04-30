/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        nox: {
          bg: "#0A0A0F",
          panel: "#10101A",
          panel2: "#151525",
          primary: "#7B2CFF",
          secondary: "#5F9CFF",
          line: "rgba(255,255,255,0.12)",
        },
      },
      boxShadow: {
        glow: "0 0 36px rgba(123, 44, 255, 0.35)",
        blueGlow: "0 0 42px rgba(95, 156, 255, 0.28)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "nox-gradient": "linear-gradient(135deg, #7B2CFF 0%, #5F9CFF 100%)",
      },
    },
  },
  plugins: [],
};
