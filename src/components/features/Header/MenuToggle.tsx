import { Menu, X } from 'react-feather'
import { useLayout } from '@/components/contexts/LayoutContext'

const MenuToggle: React.FC = () => {
  const layout = useLayout()
  return (
    <button
      aria-label="Menu toggle"
      className="hoverable-default ml-3 flex h-10 w-10 items-center justify-center rounded-full border text-sm lg:hidden"
      onClick={() => layout.toggleSidebar()}
    >
      {layout.sidebarOpen ? <X size="1em" /> : <Menu size="1em" />}
    </button>
  )
}

export default MenuToggle
