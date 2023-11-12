import { useSearch } from '@/components/contexts/SearchContext'

const Logger: React.FC = () => {
  const { results, typing, loading, initLoading, input, filters, setFilters, setInput } = useSearch()

  let message = 'Enter keywords or select a subject to start searching.'

  if (initLoading) {
    message = 'Initializing search, please wait...'
  } else if (typing) {
    message = 'Typing...'
  } else if (loading) {
    message = 'Searching for your query...'
  } else if (results.query || filters.length) {
    const filterMessage = filters.length ? ` filters: ${filters.join(', ')}` : ''

    message = results.query ? `Results for: "${results.query}"${filterMessage}` : `Showing results${filterMessage}`
  }

  const handleReset = () => {
    setFilters([])
    setInput('')
  }

  return (
    <div className="flex items-center justify-between border-b border-neutral-200 px-3 dark:border-neutral-800">
      <span title={message} className="flex h-7 items-center overflow-hidden text-xs leading-none">
        {message}
      </span>
      {(input || filters.length > 0) && (
        <button className="hoverable-blue ml-3 flex h-5 items-center rounded-full px-2 py-0 text-xs tracking-wide" onClick={handleReset}>
          Reset
        </button>
      )}
    </div>
  )
}

export default Logger
