module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        pocifico: "'Pacifico', cursive",
        archivo: "'Archivo Black', cursive",
      },
      colors: {
        light: "#00ffdf",
        dark: "#009f8b",
        tealLight: "#00b3b3",
        tealDark: "#008080",
        red: "#ff0000",
      },
      transitionTimingFunction: {
        bloop: "cubic-bezier(1,-0.65,0,2.31)",
      },
    },
  },
  variants: {
    extend: {
      scale: ["group-hover"],
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
