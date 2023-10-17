'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@nextui-org/react'

const NotFound: React.FC = () => {
  return (
    <div className="m-auto py-10 text-center">
      <h1 className="mb-6 text-8xl font-black">404</h1>
      <h2 className="mb-4 text-xl">Page Not Found.</h2>
      <p className="mb-4 opacity-80">Could not find requested resource</p>
      <Button as={Link} href="/" color="primary" className="px-5">
        Back to Home
      </Button>
    </div>
  )
}

export default NotFound
