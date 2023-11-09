import { Search } from 'react-feather'
import { useLayout } from '@/components/contexts/LayoutContext'

const SearchToggle: React.FC = () => {
  const { toggleSearchModal } = useLayout()
  return (
    <button
      aria-label="Search toggle"
      className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-200 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-100 md:w-64 md:justify-between md:rounded-lg md:px-4"
      onClick={() => toggleSearchModal(true)}
    >
      <div className="hidden uppercase tracking-widest md:block">Search...</div>
      <Search size="1em" />
    </button>
  )
}

export default SearchToggle
