import React from 'react'
import Link from 'next/link'
import { Button, CardBody } from '@nextui-org/react'

const NotYet: React.FC = () => {
  return (
    <CardBody className="flex flex-col gap-6 py-10">
      <div className="text-center">
        <div className="mb-3">
          <span className="font-bold uppercase tracking-widest">Subscription Status</span>
        </div>
        <h1 className="text-3xl">No Active Plan Found</h1>
      </div>

      <p className="py-3 text-center font-light opacity-80">
        We noticed that you don't have an active subscription at the moment. By becoming a member, you'll gain exclusive access to premium
        content and additional benefits. Elevate your experience and unlock the full potential of our platform.
      </p>

      <div className="mx-auto flex w-full max-w-xs flex-row justify-center gap-3">
        <Button as={Link} href="/pro" color="primary" fullWidth>
          Discover Our Membership Plans
        </Button>
      </div>
    </CardBody>
  )
}

export default NotYet
