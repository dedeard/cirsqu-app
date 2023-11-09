import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      minHeight: {
        layout: 'calc(100vh - 65px)',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui(), typography],
}

export default config
