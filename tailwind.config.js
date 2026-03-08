/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-lato)'],
        lato: ['var(--font-lato)'],
      },
      boxShadow: {
        'md': '0px 8px 24px -6px rgba(32, 32, 32, 0.08)',
        'special': '0px -3px 34px -4px rgba(20, 20, 20, 0.10)',
        'glow': '0 6px 36px -10px rgba(255, 0, 131, 0.56)',
        'glow-sm': '0 4px 24px -8px rgba(255, 0, 131, 0.4)',
        'glow-lg': '0 8px 48px -12px rgba(255, 0, 131, 0.7)',
      },
    },
  },
  plugins: [],
}
