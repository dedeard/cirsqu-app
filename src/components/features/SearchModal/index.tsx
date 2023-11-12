'use client'
import { memo } from 'react'
import cn from 'classnames'
import { useLayout } from '@/components/contexts/LayoutContext'
import SearchInput from './SearchInput'
import Results from './Results'
import Logger from './Logger'

const SearchModal: React.FC = () => {
  const { searchModalOpen: isOpen, toggleSearchModal } = useLayout()

  return (
    <div
      className={cn(
        isOpen && 'opacity-100',
        !isOpen && 'pointer-events-none opacity-0',
        'fixed bottom-0 left-0 right-0 top-0 z-[60] flex bg-white/30 backdrop-blur transition-opacity dark:bg-black/30 md:p-3',
      )}
    >
      <span className="absolute bottom-0 left-0 right-0 top-0 block" onClick={() => toggleSearchModal(false)} />
      <div className="relative z-10 m-auto flex h-screen w-full flex-col overflow-hidden rounded-none border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 md:h-auto md:max-h-[calc(100vh-8rem)] md:max-w-3xl md:rounded-lg md:border">
        <SearchInput />
        <Logger />
        <Results />
      </div>
    </div>
  )
}

export default memo(SearchModal)
