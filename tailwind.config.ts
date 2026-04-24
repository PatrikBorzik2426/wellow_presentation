import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan:   '#00fff5',
          lime:   '#b6ff00',
          pink:   '#ff2d78',
          orange: '#ff6a00',
          violet: '#9d00ff',
          mint:   '#00ffaa',
        },
      },
      fontFamily: {
        sans: ['Termina', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Termina', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
