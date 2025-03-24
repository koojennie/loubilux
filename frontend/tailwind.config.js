/** @type {import('tailwindcss').Config} */
module.exports = {
    corePlugins: {
      preflight: true,
    },
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          brown: "#8d6649",
        },
        textColor: {
          brown: "#493628",
        },
      },
    },
    plugins: [],
  };  