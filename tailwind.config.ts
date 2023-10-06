import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import { fontFamily } from 'tailwindcss/defaultTheme'

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    container: {
      center: true,
    },
    colors: {
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: colors.black,
      white: colors.white,
      primary: colors.indigo,
      red: colors.red,
      gray: colors.gray,
    },
    extend: {
      transitionProperty: {
        spacing: 'margin, padding',
      },
      fontFamily: {
        sans: ['var(--font-roboto)', ...fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
      borderWidth: ['first'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

export default config
