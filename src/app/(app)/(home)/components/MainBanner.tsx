import React from 'react'
import Image from 'next/image'
import cn from 'classnames'
import hero from '@/assets/keyboard.webp'

const MainBanner: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  return (
    <section className={cn(className, 'relative overflow-hidden rounded-lg')} {...props}>
      <div className="background-animate relative z-10 bg-gradient-to-br from-black/60 via-blue-600/70 to-black/80 p-4 text-white">
        <div className="flex flex-col items-center justify-center py-14 text-center md:py-16">
          <h1 className="mb-3 text-4xl lg:text-5xl">Practical screencasts for developers</h1>
          <p className="max-w-lg font-light md:text-lg">
            Explore our screencasts and enhance your coding skills. Suitable for all skill levels.
          </p>
        </div>
      </div>
      <Image alt="Card background" className="absolute top-0 z-0 h-full w-full object-cover opacity-70" src={hero} />
    </section>
  )
}

export default MainBanner
