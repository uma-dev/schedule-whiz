/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-grey": "#F5F5F7",
        "my-blue": "#0C356A",
      },
    },
  },
  plugins: [],
};
