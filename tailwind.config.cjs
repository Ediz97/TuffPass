/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte}'],
  theme: {
    screens: {
      'xs': '400px',
      'sm': '800px',
      'md': '1200px',
      'lg': '1600px',
      'xl': '2000px',
      '2xl': '2400px',
      '3xl': '2800px',
      '4xl': '3200px',
      '5xl': '3600px',
    },
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
  },
}
