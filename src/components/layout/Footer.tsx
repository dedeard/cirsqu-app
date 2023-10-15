'use client'
import React from 'react'
import Logo from '../svg/Logo'
import { Facebook, Instagram, Youtube } from 'react-feather'
import { Button, Card, Divider } from '@nextui-org/react'

const Footer: React.FC = () => {
  return (
    <Card className="mt-auto bg-content2 dark:bg-content1" radius="none" as="footer" shadow="none">
      <div className="container max-w-[1140px]">
        <div className="grid grid-cols-1 gap-3 py-14 md:grid-cols-3">
          <div className="flex flex-col p-3 text-center md:text-left">
            <div className="flex flex-col items-center md:flex-row">
              <Logo className="mb-6 block h-16 w-16 text-primary md:mb-0 md:h-10 md:w-10" />
              <span className="block text-3xl uppercase tracking-widest md:ml-3">CirSqu</span>
            </div>
            <p className="py-3 text-sm  leading-none tracking-wider">Practical screencasts for developers</p>
          </div>

          <div className="grid grid-cols-2 gap-1 p-3 px-[20%] text-center md:px-0 md:text-left">
            <div>
              <a href="#" className="text-sm hover:text-primary">
                Link
              </a>
            </div>
            <div>
              <a href="#" className="text-sm hover:text-primary">
                Link
              </a>
            </div>
            <div>
              <a href="#" className="text-sm hover:text-primary">
                Link
              </a>
            </div>
            <div>
              <a href="#" className="text-sm hover:text-primary">
                Link
              </a>
            </div>
            <div>
              <a href="#" className="text-sm hover:text-primary">
                Link
              </a>
            </div>
            <div>
              <a href="#" className="text-sm hover:text-primary">
                Link
              </a>
            </div>
          </div>

          <div className="flex justify-center gap-3 p-3 md:text-left">
            <Button as="a" href="#" isIconOnly variant="flat" target="_blank" radius="full" rel="noreferrer" aria-label="Facebook">
              <Facebook className="h-[1em]" />
            </Button>
            <Button as="a" href="#" isIconOnly variant="flat" target="_blank" radius="full" rel="noreferrer" aria-label="Instagram">
              <Instagram className="h-[1em]" />
            </Button>
            <Button as="a" href="#" isIconOnly variant="flat" target="_blank" radius="full" rel="noreferrer" aria-label="YouTube">
              <Youtube className="h-[1em]" />
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      <p className="py-6 text-center text-xs">
        © {new Date().getFullYear()} All Right Reserved AjarBelajar - By{' '}
        <a href="https://dedeard.my.id" className="text-primary" target="_blank" rel="noreferrer">
          Dede ariansya
        </a>
      </p>
    </Card>
  )
}

export default Footer
