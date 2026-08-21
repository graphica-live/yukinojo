/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces. Never pure #000 - it kills depth.
        ink: '#08080C',
        'ink-soft': '#0B0C13',
        surface: '#0E0F16',
        'surface-2': '#141721',

        // Accent system. `signal` is the ONLY colour allowed on text, borders
        // and CTAs. `violet` echoes the portrait's lavender hair and is used
        // for ambient light and hover states only.
        signal: '#3DE1FF',
        'signal-deep': '#0EA5C6',
        violet: '#8B6BFF',

        // Legacy aliases kept so nothing referencing the old palette breaks.
        background: '#08080C',
        primary: '#8B6BFF',
        secondary: '#C7B8FF',
        accent: '#3DE1FF',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', '"Zen Kaku Gothic New"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', '"Zen Kaku Gothic New"', 'sans-serif'],
        // System mono. A third webfont family is not worth the transfer cost
        // for what is only small technical labels.
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        // Shape lock: containers 20px, small elements 12px, interactive = full.
        panel: '20px',
      },
      animation: {
        ticker: 'ticker 32s linear infinite',
        'ticker-reverse': 'ticker-reverse 38s linear infinite',
        drift: 'drift 18s ease-in-out infinite',
        'sweep': 'sweep 3.2s ease-in-out infinite',
      },
      keyframes: {
        ticker: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        'ticker-reverse': {
          from: { transform: 'translate3d(-50%, 0, 0)' },
          to: { transform: 'translate3d(0, 0, 0)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)', opacity: '0.55' },
          '50%': { transform: 'translate3d(2%, -3%, 0) scale(1.12)', opacity: '0.8' },
        },
        sweep: {
          '0%, 100%': { opacity: '0.25' },
          '50%': { opacity: '0.9' },
        },
      },
    },
  },
  plugins: [],
}
