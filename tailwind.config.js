module.exports = {
  content: ["./public/index.html","./src/**/*.{js,jsx,ts,tsx}",'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require("@tailwindcss/forms")({
      // strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
    require("@tailwindcss/forms"),
    require('flowbite/plugin')
  ],
}
