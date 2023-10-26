'use client'
import React from 'react'
import { useAuth } from '@/components/contexts/AuthContext'
import MainLoading from './components/MainLoading'
import Main from './components/Main'

export default function Page() {
  const { initLoading } = useAuth({
    whenNotAuthed: '/sign-in?next=/collections',
    whenAuthedProfileNotExists: '/complete-profile?next=/collections',
  })

  return initLoading ? <MainLoading /> : <Main />
}
