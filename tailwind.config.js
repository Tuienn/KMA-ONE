/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    theme: {
      xs: "375px",
    },
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "'Helvetica Neue'",
          "Arial",
          "'Noto Sans'",
          "sans-serif",
          "'Apple Color Emoji'",
          "'Segoe UI Emoji'",
          "'Segoe UI Symbol'",
          "'Noto Color Emoji'",
        ],
      },
      colors: {
        primary: "#ef4444",
        second: "#4C95FB",
      },
      flex: {
        "0-0-100vw": "0 0 100vw",
        "0-0-200px": "0 0 200px",
        "0-0-50px": "0 0 50px",
        "0-0-0px": "0 0 0px",
      },
    },
  },
  plugins: [],
}
