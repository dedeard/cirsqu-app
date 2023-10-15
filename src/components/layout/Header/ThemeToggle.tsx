import { useTheme } from 'next-themes'
import { Button } from '@nextui-org/react'
import { Moon, Sun } from 'react-feather'
import { useMounted } from '@/components/contexts/MountContext'

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()
  if (!mounted) return null
  return (
    <Button isIconOnly className="ml-3" variant="flat" radius="full" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Moon size="1em" /> : <Sun size="1em" />}
    </Button>
  )
}

export default ThemeToggle
