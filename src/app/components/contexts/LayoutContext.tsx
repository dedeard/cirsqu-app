'use client'
import React, { useContext, useState } from 'react'

interface LayoutContextProps {
  sidebarOpen: boolean
  toggleSidebar: (sidebarOpen?: boolean) => void
}

const LayoutContext = React.createContext<LayoutContextProps>({
  sidebarOpen: false,
  toggleSidebar: () => {},
})

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }
  return <LayoutContext.Provider value={{ sidebarOpen, toggleSidebar }}>{children}</LayoutContext.Provider>
}

export const useLayout = () => useContext(LayoutContext)
