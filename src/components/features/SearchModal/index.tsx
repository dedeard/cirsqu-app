'use client'
import React from 'react'
import { Modal, ModalContent } from '@nextui-org/react'
import { useLayout } from '@/components/contexts/LayoutContext'
import SearchInput from './SearchInput'
import Results from './Results'
import Logger from './Logger'

const SearchModal: React.FC = () => {
  const { searchModalOpen, toggleSearchModal } = useLayout()

  return (
    <Modal
      classNames={{ wrapper: 'md:px-3 md:container' }}
      hideCloseButton
      isOpen={searchModalOpen}
      backdrop="blur"
      size="3xl"
      placement="top"
      onClose={() => toggleSearchModal(false)}
    >
      <ModalContent className="md:rounded-medium m-0 flex h-screen flex-col rounded-none p-0 sm:m-0 md:my-16 md:h-auto md:max-h-[calc(100vh-8rem)]">
        <SearchInput />
        <Logger />
        <Results />
      </ModalContent>
    </Modal>
  )
}

export default SearchModal
