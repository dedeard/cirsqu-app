import React from 'react'
import Logo from '../svg/Logo'
import { Facebook, Instagram, Youtube } from 'react-feather'

const Footer: React.FC = () => {
  return (
    <div className="mt-auto border-t border-gray-200 bg-white">
      <div className="container max-w-[1140px]">
        <div className="grid grid-cols-1 gap-3 py-14 md:grid-cols-3">
          <div className="flex flex-col p-3 text-center md:text-left">
            <div className="flex flex-col items-center md:flex-row">
              <Logo className="mb-6 block h-16 w-16 text-primary-600 md:mb-0 md:h-10 md:w-10" />
              <span className="block text-3xl uppercase tracking-widest text-gray-700 md:ml-3">CirSqu</span>
            </div>
            <p className="py-3 text-sm  leading-none tracking-wider">Practical screencasts for developers</p>
          </div>

          <div className="grid grid-cols-2 gap-1 p-3 px-[20%] text-center md:px-0 md:text-left">
            <div>
              <a href="#" className="text-sm hover:text-primary-600">
                Link
              </a>
            </div>
            <div>
              <a href="#" className="text-sm hover:text-primary-600">
                Link
              </a>
            </div>
            <div>
              <a href="#" className="text-sm hover:text-primary-600">
                Link
              </a>
            </div>
            <div>
              <a href="#" className="text-sm hover:text-primary-600">
                Link
              </a>
            </div>
            <div>
              <a href="#" className="text-sm hover:text-primary-600">
                Link
              </a>
            </div>
            <div>
              <a href="#" className="text-sm hover:text-primary-600">
                Link
              </a>
            </div>
          </div>

          <div className="p-3 text-center">
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border bg-gray-100 p-0 text-sm hover:bg-gray-200"
            >
              <Facebook className="h-[0.875rem]" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-full border bg-gray-100 p-0 text-sm hover:bg-gray-200"
            >
              <Instagram className="h-[0.875rem]" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="ml-3 inline-flex h-9 w-9 items-center justify-center rounded-full border bg-gray-100 p-0 text-sm hover:bg-gray-200"
            >
              <Youtube className="h-[0.875rem]" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t bg-gray-100 py-6">
        <p className="text-center text-xs">
          © {new Date().getFullYear()} All Right Reserved AjarBelajar - By{' '}
          <a href="https://dedeard.my.id" className="text-primary-600" target="_blank" rel="noreferrer">
            Dede ariansya
          </a>
        </p>
      </div>
    </div>
  )
}

export default Footer
