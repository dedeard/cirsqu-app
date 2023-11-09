'use client'
import React from 'react'
import Logo from '../svg/Logo'
import { GitHub, Globe, Instagram, Linkedin } from 'react-feather'
import { Button, Card, Divider } from '@nextui-org/react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <Card className="bg-content2 dark:bg-content1 mt-auto" radius="none" as="footer" shadow="none">
      <div className="container max-w-[1140px]">
        <div className="grid grid-cols-1 gap-3 py-14 md:grid-cols-3">
          <div className="flex flex-col p-3 text-center md:text-left">
            <div className="flex flex-col items-center md:flex-row">
              <Logo className="text-primary mb-6 block h-16 w-16 md:mb-0 md:h-10 md:w-10" />
              <span className="block text-3xl uppercase tracking-widest md:ml-3">CirSqu</span>
            </div>
            <p className="py-3 text-sm  leading-none tracking-wider">Practical screencasts for developers</p>
          </div>

          <div className="grid grid-cols-2 gap-1 p-3 px-[20%] text-center md:px-0 md:text-left">
            <div>
              <Link href="/lessons" className="hover:text-primary text-sm">
                Lessons
              </Link>
            </div>
            <div>
              <Link href="/faq" className="hover:text-primary text-sm">
                F . A . Q
              </Link>
            </div>
            <div>
              <Link href="/subjects" className="hover:text-primary text-sm">
                Subjects
              </Link>
            </div>
            <div>
              <Link href="/terms-of-service" className="hover:text-primary text-sm">
                Terms of Service
              </Link>
            </div>
            <div>
              <Link href="/pro" className="hover:text-primary text-sm">
                Premium
              </Link>
            </div>
            <div>
              <Link href="/privacy-policy" className="hover:text-primary text-sm">
                Privacy Policy
              </Link>
            </div>
          </div>

          <div className="flex justify-center gap-3 p-3 md:text-left">
            <Button
              as="a"
              href="https://github.com/dedeard"
              isIconOnly
              variant="flat"
              target="_blank"
              radius="full"
              rel="noopener noreferrer nofollow"
              aria-label="GitHub"
            >
              <GitHub className="h-[1em]" />
            </Button>
            <Button
              as="a"
              href="https://www.instagram.com/dedeard.js"
              isIconOnly
              variant="flat"
              target="_blank"
              radius="full"
              rel="noopener noreferrer nofollow"
              aria-label="Instagram"
            >
              <Instagram className="h-[1em]" />
            </Button>
            <Button
              as="a"
              href="https://www.linkedin.com/in/dedeard"
              isIconOnly
              variant="flat"
              target="_blank"
              radius="full"
              rel="noopener noreferrer nofollow"
              aria-label="Linkedin"
            >
              <Linkedin className="h-[1em]" />
            </Button>
            <Button
              as="a"
              href="https://dedeard.my.id"
              isIconOnly
              variant="flat"
              target="_blank"
              radius="full"
              rel="noopener noreferrer nofollow"
              aria-label="Website"
            >
              <Globe className="h-[1em]" />
            </Button>
          </div>
        </div>
      </div>
      <Divider />
      <p className="py-6 text-center text-xs">
        © {new Date().getFullYear()} CIRSQU - By{' '}
        <a href="https://dedeard.my.id" className="underline" target="_blank" rel="noopener noreferrer nofollow">
          Dede ariansya
        </a>
      </p>
    </Card>
  )
}

export default Footer
