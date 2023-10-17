'use client'
import { Card, CardBody } from '@nextui-org/react'
import AuthTab from './AuthTab'
import { useAuth } from '@/components/contexts/AuthContext'
import LoadingScreen from '@/components/elements/LoadingScreen'

const LayoutCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading, initLoading, profile } = useAuth()

  return (
    <Card className="dark:bg-opacity-50">
      <CardBody className="relative overflow-hidden">
        <LoadingScreen show={loading || initLoading || !!profile} />
        <AuthTab />
        <div className="pb-5 pt-10 md:px-10 md:pb-10 first:md:pt-14">{children}</div>
      </CardBody>
    </Card>
  )
}

export default LayoutCard
