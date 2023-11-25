/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-grey": "#F5F5F7",
        "my-blue": "#0C356A",
        "yellow-alert": "#FFF0CE",
        "yellow-schedulewhiz": "#EBB200",
        "black-stone": "#0C0B0B",
      },
    },
  },
  plugins: [],
  safelist: [
    {
      pattern:
        /(bg|text|border)-(my-grey|my-blue|yellow-alert|black-stone|yellow-schedulewhiz)/,
    },
  ],
};
