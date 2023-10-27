import { Search } from 'react-feather'
import { Button } from '@nextui-org/react'

const SearchToggle: React.FC = () => {
  return (
    <Button
      aria-label="Search toggle"
      variant="flat"
      isIconOnly
      className="rounded-full md:flex md:w-64 md:items-center md:justify-between md:rounded-medium md:px-4"
    >
      <div className="hidden uppercase tracking-widest md:block">Search...</div>
      <Search size="1em" />
    </Button>
  )
}

export default SearchToggle
