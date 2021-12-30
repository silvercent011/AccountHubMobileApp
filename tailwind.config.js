module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "ah-blue": "#05B3B3",
        "ah-darken-blue": "#1A9191",
        "ah-medium-blue": "#88FCFC",
        "ah-lighten-blue": "#D7FEFE",
        "ah-red": "#E31717"
      },
      fontFamily: {
        'fredoka': 'Fredoka One',
        'roboto': 'Roboto'
    }
    },
  },
  plugins: [],
}
