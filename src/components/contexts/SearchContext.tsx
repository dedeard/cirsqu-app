/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useContext, useState, useEffect, createContext } from 'react'
import { Hit } from '@/types/algolia'
import search from '@/utils/algolia/search'
import { useLayout } from './LayoutContext'

interface Results {
  query: string
  facets: Record<string, number>
  hits: Hit<IALesson>[]
}

interface SearchContextProps {
  results: Results
  subjects: { slug: string; name: string }[]
  focus: boolean
  input: string
  filters: string[]
  loading: boolean
  initLoading: boolean
  typing: boolean
  setFocus: React.Dispatch<React.SetStateAction<boolean>>
  setInput: React.Dispatch<React.SetStateAction<string>>
  setFilters: React.Dispatch<React.SetStateAction<string[]>>
}

const SearchContext = createContext<SearchContextProps>({
  results: {
    facets: {},
    hits: [],
    query: '',
  },
  subjects: [],
  focus: false,
  input: '',
  filters: [],
  loading: false,
  initLoading: false,
  typing: false,
  setFocus: () => {},
  setInput: () => {},
  setFilters: () => {},
})

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { searchModalOpen } = useLayout()
  const [subjects, setSubjects] = useState<{ slug: string; name: string }[]>([])
  const [initLoading, setInitLoading] = useState(true)
  const [subjectLoaded, setSubjectLoaded] = useState(false)

  const [results, setResults] = useState<Results>({ facets: {}, hits: [], query: '' })
  const [focus, setFocus] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [filters, setFilters] = useState<string[]>([])
  const [typing, setTyping] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setTyping(true)
    if (typingTimeout) clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(() => setTyping(false), 1000))
  }, [input])

  useEffect(() => {
    const loadSubjects = async () => {
      const { hits } = await search<IASubject>({ index: 'subjects', hitsPerPage: 100, attributesToRetrieve: ['slug', 'name'] })
      setSubjects(hits.map(({ slug, name }) => ({ slug, name })))
      setInitLoading(false)
      setSubjectLoaded(true)
    }
    if (searchModalOpen && !subjectLoaded) loadSubjects()
  }, [searchModalOpen, subjectLoaded])

  useEffect(() => {
    const handleSearch = async (value: string) => {
      const { hits, facets, query } = await search<IALesson>({
        index: 'lessons',
        query: value,
        facets: ['subjects.slug'],
        facetFilters: filters.map((el) => `subjects.slug:${el}`),
      })
      setResults({ hits, facets: facets?.['subjects.slug'] || {}, query })
      if (input !== query) {
        handleSearch(input)
      } else {
        setLoading(false)
      }
    }

    if (!initLoading && !typing) {
      setLoading(true)
      handleSearch(input)
    }
  }, [typing, initLoading, filters])

  return (
    <SearchContext.Provider
      value={{ results, focus, input, filters, loading, subjects, initLoading, typing, setFocus, setInput, setFilters }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext)
