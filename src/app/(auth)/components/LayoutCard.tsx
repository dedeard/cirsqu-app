'use client'
import { useAuth } from '@/components/contexts/AuthContext'
import AuthTab from './AuthTab'
import LoadingScreen from './LoadingScreen'

const LayoutCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, initLoading, profile } = useAuth()

  return (
    <div className="relative overflow-hidden rounded-lg border border-neutral-200 bg-neutral-200/30 dark:border-neutral-800 dark:bg-neutral-800/30">
      <LoadingScreen show={loading || initLoading || !!profile} />
      <AuthTab />
      <div className="pb-5 pt-10 md:px-10 md:pb-10 first:md:pt-14">{children}</div>
    </div>
  )
}

export default LayoutCard
