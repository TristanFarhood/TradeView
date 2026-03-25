export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "white",
        none: "none",
      },
      borderWidth: {
        1: "1px",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      gridTemplateRows : {
        7: "repeat(7, minmax(0, 1fr))", // 7 equally sizes rows   
        8: "repeat(8, minmax(0, 1fr))", // 8 equally sizes rows 
      }
    },
  },
  plugins: [],
};