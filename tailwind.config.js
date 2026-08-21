/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces. The page is light; `paper` is the only page background.
        paper: '#F6F9FF',
        'paper-2': '#ECF3FF',

        // Text. `ink` 9.6:1 and `ink-soft` 5.2:1 on paper, both AA.
        //
        // `ink-faint` is 4.48:1 - just under AA, and WCAG does not round up. It
        // is for icons and rules only (the 3:1 non-text threshold); small text
        // that wants to recede uses `ink-soft`.
        ink: '#333F6D',
        'ink-soft': '#5A6894',
        'ink-faint': '#64729F',

        // The ONLY accent that may be used on text. 5.0:1 on white, 4.8:1 on
        // paper - but only 4.5:1 on the tinted plates, which is too close to
        // the line. Text sitting on anything other than white or `paper` uses
        // `grape-deep` (6.0:1 on the same tints).
        grape: '#7350F5',
        'grape-deep': '#5B3FD9',

        // Decorative hues. These come from the illustrated assets and are for
        // fills, rules, gradients and icon plates ONLY - all of them fail
        // contrast as text (rose 2.2:1, aqua 1.6:1, mint 1.5:1 on paper).
        rose: '#FF7FB6',
        aqua: '#56D7EF',
        mint: '#8EE6CF',
        gold: '#FFD97A',

        // Primary CTA. White text on this gradient is 5.0:1 -> 6.7:1, which
        // matters because the button label is 15px bold: too small to count as
        // WCAG "large text", so it needs the full 4.5:1.
        'cta-from': '#8A4BE0',
        'cta-to': '#5B3FD9',

        // Legacy aliases so nothing referencing the old dark palette breaks
        // mid-migration.
        background: '#F6F9FF',
        primary: '#7350F5',
        accent: '#FF7FB6',
      },
      fontFamily: {
        sans: ['"Zen Maru Gothic"', '"Hiragino Maru Gothic ProN"', 'system-ui', 'sans-serif'],
        // Latin-only display face for kickers and numerals.
        display: ['"Bricolage Grotesque"', '"Zen Maru Gothic"', 'sans-serif'],
        // Latin-only script for the handwritten margin notes.
        hand: ['"Caveat"', 'cursive'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        // Shape lock: sticker cards 30px, inner plates 20px, chips/buttons full.
        sticker: '30px',
        plate: '20px',
      },
      boxShadow: {
        // Die-cut sticker: a white keyline, then a soft blue-tinted drop.
        sticker: '0 0 0 7px #fff, 24px 34px 60px -34px rgba(78,100,168,0.55)',
        'sticker-hover': '0 0 0 7px #fff, 32px 44px 70px -34px rgba(78,100,168,0.62)',
        plate: '0 10px 24px -14px rgba(78,100,168,0.6)',
      },
      screens: {
        // Matches the breakpoint the decorative rails switch on.
        wide: '1120px',
      },
    },
  },
  plugins: [],
}
