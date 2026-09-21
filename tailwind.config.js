/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bgDark: "#0B0B0C",
        bgCream: "#F7F5F0",
        surface: "var(--surface)",
        'surface-hover': "var(--surface-hover)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        accent: {
          ember: "#FF6B35",
          wine: "#C8102E",
          plum: "#4A0E4E",
        },
      },
      fontFamily: {
        display: ['"Clash Display"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(135deg, #FF6B35 0%, #C8102E 50%, #4A0E4E 100%)',
      },
      boxShadow: {
        'luxury-btn': '0px 4px 14px rgba(0,0,0,0.25), inset 0px 0px 14px rgba(255, 107, 53, 0.6)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
    },
  },
  plugins: [],
}
