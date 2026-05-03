import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.{js,vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    // Nuxt 4 app/ directory
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        // Natural scent palette — mirrors label colours
        scent: {
          peach:   '#f47923',  // Broskyňa / Golden Peach
          coconut: '#c8cac8',  // Kokos / Coconut Blanc (toned for visibility)
          platinum:'#b8bcc3',  // Platinum / Pure Platinum
          melon:   '#f0517b',  // Melón / Watermellow
          vanilla: '#efd35a',  // Vanilka / Vanilla Candy
          citrus:  '#89c540',  // Verbena / Citrus Garden
        },
      },
      fontFamily: {
        sans:    ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Termina', 'sans-serif'],
      },
    },
  },
  plugins: [
     require('tailwindcss-animated'),
  ],
} satisfies Config
