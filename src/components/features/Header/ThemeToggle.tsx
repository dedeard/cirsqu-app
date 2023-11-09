import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/react'
import { Moon, Sun } from 'react-feather'
import { useMounted } from '@/components/contexts/MountContext'

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()
  if (!mounted) return null
  return (
    <button
      aria-label="Theme toggle"
      className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? <Moon size="1em" /> : <Sun size="1em" />}
    </button>
  )
}

export default ThemeToggle
