import Link from 'next/link'
import Logo from '../components/svg/Logo'
import { redirect } from 'next/navigation'
import serverFetch from '@/utils/server-fetch'

async function redirectIfAutenticated() {
  const response = await serverFetch(`auth/user-data`, {
    cache: 'no-store',
  })
  if (response.ok) {
    redirect('/')
  }
}

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  await redirectIfAutenticated()

  return (
    <div className="flex min-h-screen flex-col bg-gray-100 font-sans text-gray-950">
      <header className="flex w-full bg-white py-5 shadow">
        <div className="container flex px-3">
          <Link href="/" className="flex cursor-pointer items-center justify-center text-primary-600">
            <Logo className="block h-8 w-8" />
            {/* <span className="ml-3 block text-2xl font-bold text-gray-700">CirSqu</span> */}
            <span className="ml-4 block text-xl uppercase leading-none tracking-widest text-gray-950">CirSqu</span>
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-[540px] flex-1 px-3 py-10 md:px-0">
        <div className="relative w-full overflow-hidden border bg-white">{children}</div>
      </main>
      <footer className="pb-10 text-center">
        <span className="text-xs text-gray-800">© {new Date().getFullYear()} CirSqu. all rights reserved.</span>
      </footer>
    </div>
  )
}
