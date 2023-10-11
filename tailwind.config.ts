import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}

export default config
