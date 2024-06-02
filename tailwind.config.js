module.exports = {
  mode: "jit",
  content: ["./src/**/**/*.{js,ts,jsx,tsx,html,mdx}", "./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        white: { A700: "#ffffff" },
        gray: { 100: "#f6f6f6", 200: "#e7e7e9" },
        blue_gray: { 400: "#898989", 900: "#2f2f2f" },
        red: { 300: "#eb7060" },
        deep_orange_A700: "#d72600",
      },
      boxShadow: {},
      fontFamily: { inter: "Inter", aclonica: "Aclonica" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
