import React from 'react'
import { CardBody, Skeleton } from '@nextui-org/react'

const Loading: React.FC = () => {
  return (
    <CardBody className="flex flex-col gap-6 py-10">
      <div>
        <Skeleton className="rounded-medium mx-auto mb-3 flex h-4 w-1/4" />
        <Skeleton className="rounded-medium mx-auto flex h-8 w-1/2" />
      </div>

      <div className="flex flex-col items-center justify-center gap-2 py-3">
        <Skeleton className="rounded-medium flex h-4 w-1/2" />
        <Skeleton className="rounded-medium flex h-4 w-full" />
        <Skeleton className="rounded-medium flex h-4 w-4/6" />
      </div>

      <div className="mx-auto flex w-full max-w-xs flex-row justify-center gap-3">
        <Skeleton className="rounded-medium flex h-10 w-full" />
      </div>
    </CardBody>
  )
}

export default Loading
