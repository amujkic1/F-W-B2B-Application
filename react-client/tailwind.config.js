/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Existing project colors
        dark: "#111928",
        "dark-2": "#1f2a37",
        "body-color": "#637381",
        "body-secondary": "#8899a8",
        stroke: "#dfe4ea",
        'brand-primary': "#3758f9",
        'brand-secondary': "#13c296",
        // shadcn semantic tokens from src/index.css
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: 'var(--primary)',
        'primary-foreground': 'var(--primary-foreground)',
        secondary: 'var(--secondary)',
        'secondary-foreground': 'var(--secondary-foreground)',
        muted: 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        accent: 'var(--accent)',
        'accent-foreground': 'var(--accent-foreground)',
        destructive: 'var(--destructive)',
      },
      boxShadow: {
        '1': '0px 1px 3px 0px rgba(166, 175, 195, 0.4)',
        '2': '0px 5px 12px 0px rgba(0, 0, 0, 0.1)',
        'testimonial': '0px 10px 20px 0px rgba(92, 115, 160, 0.07)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

