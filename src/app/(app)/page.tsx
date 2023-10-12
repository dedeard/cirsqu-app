'use client'

import { useAuth } from '@/components/contexts/AuthContext'
import Header from '@/components/layout/Header'

export default function Home() {
  const { profile } = useAuth()
  return (
    <>
      <Header profile={profile} />
    </>
  )
}
