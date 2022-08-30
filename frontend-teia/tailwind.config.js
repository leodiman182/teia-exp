module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#5C3339',
        'secondary': '#FF9980',
        'tertiary': '#FBD8CA',
      },
      screens: {
        'mac': '1440px',
        'hd': '1228px',
        'uw': '2048px',
      },
      spacing: {
        'more': '110%',
      }
    },
  },
  plugins: [],
}
