import React from 'react'
import { Card, CardBody, Spinner } from '@nextui-org/react'

const AuthLoading: React.FC = () => {
  return (
    <div className="container flex min-h-layout items-center justify-center">
      <div className="w-full max-w-sm ">
        <Card>
          <CardBody className="overflow-hidden py-24">
            <Spinner size="lg" className="scale-150" />
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default AuthLoading
