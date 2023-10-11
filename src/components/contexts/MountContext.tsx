'use client'
import React, { useContext, useState, useEffect } from 'react'

interface MountContextProps {
  mounted: boolean
}

const MountContext = React.createContext<MountContextProps>({
  mounted: false,
})

export const MountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  return <MountContext.Provider value={{ mounted }}>{children}</MountContext.Provider>
}

export const useMounted = () => useContext(MountContext).mounted
