import { useLayout } from '@/components/contexts/LayoutContext'
import { Button } from '@nextui-org/react'
import { Menu } from 'react-feather'

const MenuToggle: React.FC = () => {
  const layout = useLayout()
  return (
    <Button
      aria-label="Menu toggle"
      isIconOnly
      className="ml-3 lg:hidden"
      variant="flat"
      radius="full"
      onClick={() => layout.toggleSidebar()}
    >
      <Menu size="1em" />
    </Button>
  )
}

export default MenuToggle
