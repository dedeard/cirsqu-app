'use client'
import React from 'react'
import Image from 'next/image'
import { Card, CardBody, CardProps } from '@nextui-org/react'
import hero from '@/assets/keyboard.webp'

const Jumbotron: React.FC<CardProps> = (props) => {
  return (
    <Card {...props}>
      <CardBody className="background-animate relative z-10 bg-gradient-to-br from-black/60 via-primary/70 to-black/80 text-white">
        <div className="flex flex-col items-center justify-center py-14 text-center md:py-16">
          <h1 className="mb-3 text-3xl font-bold lg:text-4xl">Practical screencasts for developers</h1>
          <p className="max-w-lg md:text-lg">Explore our screencasts and enhance your coding skills. Suitable for all skill levels.</p>
        </div>
      </CardBody>
      <Image alt="Card background" className="absolute top-0 z-0 h-full w-full object-cover opacity-70" src={hero} />
    </Card>
  )
}

export default Jumbotron
