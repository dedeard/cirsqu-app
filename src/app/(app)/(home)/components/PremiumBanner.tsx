'use client'
import React from 'react'
import { Button, Card, CardBody, CardProps } from '@nextui-org/react'
import Link from 'next/link'
import FAQs from '@/app/pro/(plans)/components/FAQs'

const PremiumBanner: React.FC<CardProps> = (props) => {
  return (
    <Card {...props}>
      <CardBody className="background-animate relative z-10 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-foreground dark">
        <div className="flex flex-col items-center justify-center py-10 text-center md:py-12">
          <h2 className="mb-3 text-3xl font-bold lg:text-4xl">Unlimited access with a premium membership.</h2>
          <p className="mb-10 max-w-lg md:text-lg">Join thousands of developers improving their skills every day</p>
          <Button as={Link} href="/pro" color="primary" className="font-semibold">
            Discover Our Membership Plans
          </Button>
        </div>
        <div className="mx-auto w-full max-w-7xl pb-6 md:px-6 lg:px-8">
          <FAQs />
        </div>
      </CardBody>
    </Card>
  )
}

export default PremiumBanner
