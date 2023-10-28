import React from 'react'
import cn from 'classnames'
import { Search, X } from 'react-feather'
import { Button, Spinner } from '@nextui-org/react'
import { useLayout } from '@/components/contexts/LayoutContext'
import { useSearch } from '@/components/contexts/SearchContext'

const SearchInput: React.FC = () => {
  const { toggleSearchModal } = useLayout()
  const { focus, input, loading, setFocus, setInput } = useSearch()

  return (
    <div className="flex h-14 items-center border-b border-divider bg-content2 dark:border-transparent">
      <div className="relative flex h-full flex-1">
        <span className="pointer-events-none absolute flex h-full items-center px-3">
          <Search size={18} className={cn(focus ? 'text-primary' : ' text-content1-foreground/50')} />
        </span>

        <input
          type="text"
          className={cn(loading && 'pr-8', ' block h-full w-full flex-1 bg-transparent pl-10 leading-normal !outline-none')}
          placeholder="Enter your keywords here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />

        {loading && (
          <span className="pointer-events-none absolute right-0 top-0 flex h-full items-center justify-center px-1">
            <Spinner size="sm" color="primary" />
          </span>
        )}
      </div>
      <div className="flex items-center justify-start p-2">
        <Button isIconOnly color="danger" variant="ghost" radius="full" className="border-divider" onClick={() => toggleSearchModal(false)}>
          <X size={18} />
        </Button>
      </div>
    </div>
  )
}

export default SearchInput
