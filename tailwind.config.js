/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'steel-silver': 'var(--steel-silver)',
        'mint-patina': 'var(--mint-patina)',
        'obsidian-black': 'var(--obsidian-black)',
        'obsidian-deep': 'var(--obsidian-deep)',
        'obsidian-raised': 'var(--obsidian-raised)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'text-faint': 'var(--text-faint)',
        'border-subtle': 'var(--border-subtle)',
        'border-accent': 'var(--border-accent)',
      },
      fontFamily: {
        display: ['var(--font-inter)', 'var(--font-albert-sans)', 'system-ui', 'sans-serif'],
        headline: ['var(--font-inter)', 'var(--font-albert-sans)', 'system-ui', 'sans-serif'],
        title: ['var(--font-albert-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        body: ['var(--font-albert-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'none': '0',
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'pill': '999px',
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        '2xl': '80px',
      },
      fontSize: {
        display: ['clamp(2.5rem, 5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        headline: ['clamp(1.8rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        title: ['1.1rem', { lineHeight: '1.4' }],
        body: ['0.98rem', { lineHeight: '1.65' }],
        mono: ['0.75rem', { letterSpacing: '0.05em' }],
      },
    },
  },
  plugins: [],
};