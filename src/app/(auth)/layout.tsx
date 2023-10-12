'use client'
import Header from '@/components/layout/Header'
import { Card, CardBody } from '@nextui-org/react'
import AuthTab from './components/AuthTab'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header container onlyBrand />
      <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-transparent">
        <main className="mx-auto w-full max-w-[540px] flex-1 px-3 py-10 md:px-0">
          <Card>
            <CardBody className="relative overflow-hidden">
              <AuthTab />
              <div className="p-10 first:pt-14">{children}</div>
            </CardBody>
          </Card>
        </main>
        <footer className="pb-10">
          <p className="text-center text-xs opacity-50">
            © {new Date().getFullYear()} All Right Reserved AjarBelajar - By{' '}
            <a href="https://dedeard.my.id" className="text-primary-600" target="_blank" rel="noreferrer">
              Dede ariansya
            </a>
          </p>
        </footer>
      </div>
    </>
  )
}
