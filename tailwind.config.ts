import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

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
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}

export default config
