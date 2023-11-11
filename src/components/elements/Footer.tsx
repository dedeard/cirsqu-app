import React from 'react'
import Link from 'next/link'
import { GitHub, Globe, Instagram, Linkedin } from 'react-feather'
import Logo from '../svg/Logo'

const socials = [
  { name: 'GitHub', href: 'https://github.com/dedeard', Icon: GitHub },
  { name: 'Instagram', href: 'https://instagram.com/dedeard.js', Icon: Instagram },
  { name: 'Linkedin', href: 'https://linkedin.com/in/dedeard', Icon: Linkedin },
  { name: 'Website', href: 'https://dedeard.my.id', Icon: Globe },
]

const links = [
  { href: '/lessons', label: 'Lessons' },
  { href: '/faq', label: 'F . A . Q' },
  { href: '/subjects', label: 'Subjects' },
  { href: '/terms-of-service', label: 'Terms of Service' },
  { href: '/pro', label: 'Premium' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
]

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50/30 pb-10 dark:border-neutral-800 dark:bg-neutral-950/30">
      <div className="container max-w-[1140px]">
        <div className="grid grid-cols-1 gap-3 py-14 md:grid-cols-3">
          <div className="flex flex-col p-3 text-center md:text-left">
            <div className="flex flex-col items-center md:flex-row">
              <Logo className="mb-6 block h-16 w-16 text-blue-600 md:mb-0 md:h-10 md:w-10" />
              <span className="block text-3xl uppercase tracking-widest md:ml-3">CirSqu</span>
            </div>
            <p className="py-3 text-sm  leading-none tracking-wider">Practical screencasts for developers</p>
          </div>

          <div className="grid grid-cols-2 gap-1 p-3 px-[20%] text-center text-neutral-600 dark:text-neutral-400 md:px-0 md:text-left">
            {links.map((el) => (
              <div key={el.href}>
                <Link href={el.href} className="text-sm hover:text-blue-600 ">
                  {el.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3 p-3 md:text-left">
            {socials.map(({ name, href, Icon }) => (
              <a
                key={name}
                title={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="hoverable-default flex h-10 w-10 rounded-full border"
              >
                <Icon className="m-auto h-[1em] text-neutral-600 dark:text-neutral-300" />
              </a>
            ))}
          </div>
        </div>

        <span className="block h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-800" />
      </div>

      <p className="py-10 text-center text-xs text-neutral-600 dark:text-neutral-400">
        © {new Date().getFullYear()} CIRSQU - By{' '}
        <a href="https://dedeard.my.id" className="hover:text-blue-600" target="_blank" rel="noopener noreferrer nofollow">
          Dede ariansya
        </a>
      </p>
    </footer>
  )
}

export default Footer
