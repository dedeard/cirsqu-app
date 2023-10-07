import { Search } from 'react-feather'

const SearchToggle: React.FC = () => {
  return (
    <button
      aria-label="Search toggle"
      className="flex h-9 w-9 items-center justify-center rounded-full border bg-gray-100 p-0 text-sm text-gray-700 hover:bg-gray-200 md:w-64 md:justify-between md:px-4 lg:ml-0"
    >
      <div className="hidden font-semibold uppercase tracking-wider md:block">Search</div>
      <Search size="0.875rem" />
    </button>
  )
}

export default SearchToggle
