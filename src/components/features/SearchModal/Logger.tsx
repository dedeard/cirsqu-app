import React from 'react'
import { useSearch } from '@/components/contexts/SearchContext'
import { Chip } from '@nextui-org/react'

const Logger: React.FC = () => {
  const { results, typing, loading, initLoading, input, filters, setFilters, setInput } = useSearch()

  let message = 'Enter keywords or select a subject to start searching.'

  if (initLoading) {
    message = 'Initializing search, please wait...'
  } else if (typing) {
    message = 'You are typing...'
  } else if (loading) {
    message = 'Searching for your query...'
  } else if (results.query || filters.length) {
    const filterMessage = filters.length ? ` with filters: ${filters.join(', ')}` : ''

    message = results.query ? `Results for your search query: "${results.query}"${filterMessage}` : `Showing results${filterMessage}`
  }

  const handleReset = () => {
    setFilters([])
    setInput('')
  }

  return (
    <div className="border-divider bg-content2 dark:bg-content3 flex items-center justify-between border-b px-3 dark:border-transparent">
      <span className="flex h-7 items-center pr-3 text-xs leading-none">{message}</span>
      {(input || filters.length > 0) && (
        <Chip
          size="sm"
          color="primary"
          className="h-5 cursor-pointer py-0"
          classNames={{ content: 'text-xs tracking-wide' }}
          onClick={handleReset}
        >
          Reset
        </Chip>
      )}
    </div>
  )
}

export default Logger
