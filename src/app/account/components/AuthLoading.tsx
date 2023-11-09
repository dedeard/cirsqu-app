import React from 'react'
import { Spinner } from '@nextui-org/react'
import Card from '@/app/(app)/components/Card'

const AuthLoading: React.FC = () => {
  return (
    <div className="min-h-layout container flex items-center justify-center">
      <div className="w-full max-w-sm ">
        <Card forceBodyClassName="overflow-hidden py-24">
          <Spinner size="lg" className="scale-150" />
        </Card>
      </div>
    </div>
  )
}

export default AuthLoading
