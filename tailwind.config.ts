import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f5f2ec',
        charcoal: '#1f2328',
        slate: '#516172',
        accent: '#8a4a36'
      }
    }
  },
  plugins: []
};

export default config;
