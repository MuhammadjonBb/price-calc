/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F8FAFC",
        surface: "#FFFFFF",
        border: "#E2E8F0",
        primary: {
          DEFAULT: "#2563EB",
          hover: "#1D4ED8",
          light: "#EFF6FF",
        },
        text: {
          main: "#0F172A",
          secondary: "#64748B",
        },
        success: "#16A34A",
        danger: "#DC2626",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
      },
      boxShadow: {
        card: "0 10px 25px -5px rgba(0, 0, 0, 0.05)",
        hover: "0 10px 30px -5px rgba(37, 99, 235, 0.15)",
      },

      transitionDuration: {
        DEFAULT: "200ms",
      },
    },
  },
  plugins: [],
};
