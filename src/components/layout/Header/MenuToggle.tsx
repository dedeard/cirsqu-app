import { Menu } from 'react-feather'

const MenuToggle: React.FC<{ toggleSidebar?: (open?: boolean) => void }> = ({ toggleSidebar }) => {
  return (
    <button
      aria-label="Menu"
      className={`ml-3 flex h-9 w-9 items-center justify-center rounded-full border bg-gray-100 p-0 text-sm text-gray-700 hover:bg-gray-200 lg:hidden`}
      onClick={() => toggleSidebar?.()}
    >
      <Menu size="0.875rem" />
    </button>
  )
}

export default MenuToggle
