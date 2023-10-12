import { Button } from '@nextui-org/react'
import { Menu } from 'react-feather'

const MenuToggle: React.FC<{ toggleSidebar?: (open?: boolean) => void }> = ({ toggleSidebar }) => {
  return (
    <Button isIconOnly className="ml-3" variant="flat" radius="full" onClick={() => toggleSidebar?.()}>
      <Menu size="1em" />
    </Button>
  )
}

export default MenuToggle
