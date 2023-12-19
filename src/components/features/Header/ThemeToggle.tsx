import { Moon, Sun } from 'react-feather'
import { useMounted } from '@/components/contexts/MountContext'
import { useTheme } from '@/components/contexts/ThemeContext'

const ThemeToggle: React.FC = () => {
  const { dark, toggle } = useTheme()
  const mounted = useMounted()
  if (!mounted) return null
  return (
    <button
      aria-label="Theme toggle"
      className="hoverable-default ml-3 flex h-10 w-10 items-center justify-center rounded-full border text-sm"
      onClick={toggle}
    >
      {dark ? <Moon size="1em" /> : <Sun size="1em" />}
    </button>
  )
}

export default ThemeToggle
