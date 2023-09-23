import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      mono: ['monospace'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      extend: {
        width: {
          '20ch': '20ch',
          '40ch': '40ch',
          '60ch': '60ch',
        },
        height: {
          '20ch': '20ch',
          '40ch': '40ch',
          '60ch': '60ch',
        },
      },
    },
  },
  plugins: [],
};

export default config;
