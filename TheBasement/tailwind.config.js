/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/**/*.edge',
    "./resources/**/*.{js,ts,jsx,tsx,vue}",
    "./resources/**/*.{html,js}",
  ],
  theme: {
    colors: {
      'rich-black': {
        DEFAULT: '#161b22',
        'dark': '#0d1014',
      },
      'rose': {
        DEFAULT: '#f91880',
        dark: '#de1170',
      },
      'dark-violet': {
        DEFAULT: '#a71aC3',
      },
      'gold': {
        DEFAULT: '#ffd620',
      },
      'timberwolf': {
        DEFAULT: '#d6d3d1',
      },
      'blue-sky': {
        DEFAULT: '#23dafe',
      },
      'persian-indigo': {
        DEFAULT: '#331068',
      },
      'pumpkin': {
        DEFAULT: '#ff6600',
      },
    },
    extend: {},
  },
  plugins: [
    '@tailwindcss/aspect-ratio',
  ],
}

