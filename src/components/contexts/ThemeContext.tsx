import React from 'react'

type ThemeContextProps = {
  dark: boolean
  toggle: () => void
}

type ThemeProviderProps = React.PropsWithChildren<{
  defaultDark?: boolean
}>

export const ThemeContext = React.createContext<ThemeContextProps>({
  dark: true,
  toggle: () => {},
})

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, defaultDark }) => {
  const [dark, setDark] = React.useState<boolean>(!!defaultDark)

  React.useEffect(() => {
    const el = document.getElementsByTagName('html')[0]
    if (dark) {
      el.classList.add('dark')
      el.style.colorScheme = 'dark'
    } else {
      el.classList.remove('dark')
      el.style.colorScheme = 'light'
    }
  }, [dark])

  const toggle = () => {
    setDark((prev) => {
      const expires = 'expires=Thu, 01 Jan 2038 00:00:00 GMT'
      document.cookie = `darkMode=${(!prev).toString()};${expires};path=/`
      return !prev
    })
  }

  return <ThemeContext.Provider value={{ dark, toggle }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextProps => React.useContext(ThemeContext)
