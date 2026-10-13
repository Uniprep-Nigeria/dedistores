import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6C2BD9',
        secondary: '#FFFFFF',
        accent: '#FF7A00',
        charcoal: '#222222',
        lavender: '#F3E8FF',
        muted: '#F5F4F8',
      },
      boxShadow: {
        soft: '0 16px 40px rgba(82, 18, 150, 0.12)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
