import React from 'react'
import Image from 'next/image'
import hero from '@/assets/keyboard.webp'

const Heading: React.FC<{ title: string; content: React.ReactNode }> = ({ title, content }) => {
  return (
    <div className="dark relative overflow-hidden">
      <div className="background-animate relative z-10 bg-gradient-to-br from-black/60 via-blue-600/70 to-black/80 pt-16 text-neutral-200">
        <div className="flex flex-col items-center justify-center py-16 text-center md:py-24">
          <h1 className="mb-3 text-3xl font-bold lg:text-5xl">{title}</h1>
          <p className="max-w-lg md:text-lg">{content}</p>
        </div>
      </div>
      <Image alt="Card background" className="absolute top-0 z-0 h-full w-full object-cover opacity-70" src={hero} />
    </div>
  )
}

export default Heading
