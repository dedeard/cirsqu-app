import { Search } from 'react-feather'
import { Button } from '@nextui-org/react'
import { useLayout } from '@/components/contexts/LayoutContext'

const SearchToggle: React.FC = () => {
  const { toggleSearchModal } = useLayout()
  return (
    <Button
      aria-label="Search toggle"
      variant="flat"
      isIconOnly
      className="rounded-full md:flex md:w-64 md:items-center md:justify-between md:rounded-medium md:px-4"
      onClick={() => toggleSearchModal(true)}
    >
      <div className="hidden uppercase tracking-widest md:block">Search...</div>
      <Search size="1em" />
    </Button>
  )
}

export default SearchToggle
