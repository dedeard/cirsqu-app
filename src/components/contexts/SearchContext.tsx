/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Hit } from '@/types/algolia'
import { lessonIndex, subjectIndex } from '@/utils/algolia'
import React, { useContext, useState, useEffect } from 'react'
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

const SearchContext = React.createContext<SearchContextProps>({
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
    const loadSubjects = async () => {
      const { hits } = await subjectIndex.search<IASubject>('', { hitsPerPage: 100, attributesToRetrieve: ['slug', 'name'] })
      setSubjects(hits.map(({ slug, name }) => ({ slug, name })))
      setInitLoading(false)
      setSubjectLoaded(true)
    }
    if (searchModalOpen && !subjectLoaded) loadSubjects()
  }, [searchModalOpen, subjectLoaded])

  useEffect(() => {
    setTyping(true)
    if (typingTimeout) clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(() => setTyping(false), 1000))
  }, [input])

  useEffect(() => {
    if (initLoading) return

    const handleSearch = async (value: string) => {
      setLoading(true)
      const { hits, facets, query } = await lessonIndex.search<IALesson>(value, {
        facets: ['subjects.slug'],
        facetFilters: filters.map((el) => `subjects.slug:${el}`),
      })
      setResults({ hits, facets: facets?.['subjects.slug'] || {}, query })
      setLoading(false)
      if (input !== query) handleSearch(input)
    }
    if (!typing && !loading) handleSearch(input)
  }, [typing, loading, initLoading, filters])

  return (
    <SearchContext.Provider
      value={{ results, focus, input, filters, loading, subjects, initLoading, typing, setFocus, setInput, setFilters }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext)
