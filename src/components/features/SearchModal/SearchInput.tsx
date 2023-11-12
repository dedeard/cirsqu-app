import cn from 'classnames'
import { Search, X } from 'react-feather'
import { useLayout } from '@/components/contexts/LayoutContext'
import { useSearch } from '@/components/contexts/SearchContext'
import Spinner from '@/components/svg/Spinner'

const SearchInput: React.FC = () => {
  const { toggleSearchModal } = useLayout()
  const { focus, input, loading, setFocus, setInput } = useSearch()

  return (
    <div
      className={cn(
        focus && 'bg-neutral-200/30 dark:bg-neutral-800/30',
        'flex h-14 min-h-[56px] items-center border-b border-neutral-200 dark:border-neutral-800',
      )}
    >
      <div className="relative flex h-full flex-1">
        <span className="pointer-events-none absolute flex h-full items-center px-3">
          <Search size={18} className={cn(focus ? 'text-blue-600' : ' text-neutral-600 dark:text-neutral-400')} />
        </span>

        <input
          type="text"
          className={cn(loading && 'pr-8', ' block h-full w-full flex-1 bg-transparent pl-10 leading-normal focus:outline-none')}
          placeholder="Enter your keywords here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />

        {loading && (
          <span className="pointer-events-none absolute right-0 top-0 flex h-full items-center justify-center px-1">
            <Spinner className="h-5 w-5 text-blue-600" />
          </span>
        )}
      </div>
      <div className="flex items-center justify-start px-2">
        <button className=" hoverable-default flex h-10 w-10 items-center rounded-full border" onClick={() => toggleSearchModal(false)}>
          <X size={18} className="m-auto text-red-600" />
        </button>
      </div>
    </div>
  )
}

export default SearchInput
