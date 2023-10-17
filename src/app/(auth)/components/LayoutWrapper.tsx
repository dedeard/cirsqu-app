'use client'
import { Card, CardBody } from '@nextui-org/react'
import AuthTab from './AuthTab'
import { useAuth } from '@/components/contexts/AuthContext'
import LoadingScreen from '@/components/elements/LoadingScreen'

const LayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, initLoading, profile } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-transparent">
      <main className="mx-auto w-full max-w-[540px] flex-1 px-3 py-10 md:px-0">
        <Card>
          <CardBody className="relative overflow-hidden">
            <LoadingScreen show={loading || initLoading || !!profile} />
            <AuthTab />
            <div className="pb-5 pt-10 md:px-10 md:pb-10 first:md:pt-14">{children}</div>
          </CardBody>
        </Card>
      </main>
      <footer className="pb-10">
        <p className="text-center text-xs opacity-50">
          © {new Date().getFullYear()} All Right Reserved AjarBelajar - By{' '}
          <a href="https://dedeard.my.id" className="text-primary-600" target="_blank" rel="noreferrer">
            Dede ariansya
          </a>
        </p>
      </footer>
    </div>
  )
}

export default LayoutWrapper
