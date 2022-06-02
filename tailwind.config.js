module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'base', // only generate global styles
      // strategy: 'class', // only generate classes
    }),require('flowbite/plugin')
  ],
}
