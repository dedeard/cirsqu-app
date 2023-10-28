'use client'
import React, { useContext, useState } from 'react'
import { usePathname } from 'next/navigation'

interface LayoutContextProps {
  sidebarOpen: boolean
  searchModalOpen: boolean
  headerPosition: number
  toggleSidebar: (sidebarOpen?: boolean) => void
  setHeaderPosition: (position: number) => void
  toggleSearchModal: (searchModalOpen?: boolean) => void
}

const LayoutContext = React.createContext<LayoutContextProps>({
  sidebarOpen: false,
  searchModalOpen: false,
  headerPosition: 66,
  toggleSidebar: () => {},
  setHeaderPosition: () => {},
  toggleSearchModal: () => {},
})

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [headerPosition, setHeaderPosition] = useState(0)

  const toggleSidebar = (isOpen?: boolean) => {
    if (typeof isOpen === 'boolean') {
      setSidebarOpen(isOpen)
    } else {
      setSidebarOpen(!sidebarOpen)
    }
  }

  const toggleSearchModal = (isOpen?: boolean) => {
    if (typeof isOpen === 'boolean') {
      setSearchModalOpen(isOpen)
    } else {
      setSearchModalOpen(!sidebarOpen)
    }
  }

  React.useEffect(() => {
    setSearchModalOpen(false)
    setSidebarOpen(false)
  }, [pathname])

  React.useEffect(() => {
    if (searchModalOpen) {
      document.getElementsByTagName('body')[0].classList.add('!overflow-y-hidden')
    } else {
      document.getElementsByTagName('body')[0].classList.remove('!overflow-y-hidden')
    }
  }, [searchModalOpen])

  return (
    <LayoutContext.Provider value={{ sidebarOpen, searchModalOpen, headerPosition, setHeaderPosition, toggleSidebar, toggleSearchModal }}>
      {children}
    </LayoutContext.Provider>
  )
}

export const useLayout = () => useContext(LayoutContext)
