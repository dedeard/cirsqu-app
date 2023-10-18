'use client'
import React, { useContext, useState } from 'react'

interface LayoutContextProps {
  sidebarOpen: boolean
  headerPosition: number
  toggleSidebar: (sidebarOpen?: boolean) => void
  setHeaderPosition: (position: number) => void
}

const LayoutContext = React.createContext<LayoutContextProps>({
  sidebarOpen: false,
  headerPosition: 66,
  toggleSidebar: () => {},
  setHeaderPosition: () => {},
})

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [headerPosition, setHeaderPosition] = useState(0)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  return (
    <LayoutContext.Provider value={{ sidebarOpen, headerPosition, setHeaderPosition, toggleSidebar }}>{children}</LayoutContext.Provider>
  )
}

export const useLayout = () => useContext(LayoutContext)
