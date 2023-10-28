import React from 'react'
import { useSearch } from '@/components/contexts/SearchContext'

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
    <div className="flex items-center justify-between border-b border-divider bg-content2 dark:border-transparent dark:bg-content3">
      <span className="flex h-7 items-center px-3 text-xs leading-none">{message}</span>
      {(input || filters.length > 0) && (
        <button className="h-7 min-w-0 px-3 text-xs text-primary-700" onClick={handleReset}>
          RESET
        </button>
      )}
    </div>
  )
}

export default Logger
