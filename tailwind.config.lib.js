/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */

import { isolateInsideOfContainer, scopedPreflightStyles } from 'tailwindcss-scoped-preflight'

export const sharedConfig = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#a801ff',
        'secondary-color': '#4f46e5',
      },
      backgroundImage: () => ({
        'linear-color': 'linear-gradient(45deg, #4f46e5, #a801ff);',
      }),
      animation: {
        'sound-wave': 'sound-wave 1.2s linear infinite;',
        caret: 'caret 500ms steps(44) infinite;',
      },
      keyframes: {
        'sound-wave': {
          '50%': { height: '20%' },
          '100%': { height: '100%' },
        },
        caret: {
          '50%': {
            borderColor: 'transparent',
          },
        },
      },
    },
  },
}

export default {
  ...sharedConfig,
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
    scopedPreflightStyles({
      isolationStrategy: isolateInsideOfContainer('#react-chatgpt'),
    }),
  ],
  important: '#react-chatgpt',
  corePlugins: {
    preflight: false,
  },
}
