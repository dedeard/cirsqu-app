import { redirect } from 'next/navigation'
import { getAuthData } from '@/utils/server-fetch'
import Header from '../components/layout/Header'

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await getAuthData()

  if (user && profile) {
    return redirect('/account')
  }

  return (
    <>
      <Header container onlyBrand />
      <div className="flex min-h-screen flex-col bg-gray-100 pt-16 font-sans text-gray-950">
        <main className="mx-auto w-full max-w-[540px] flex-1 px-3 py-10 md:px-0">
          <div className="relative w-full overflow-hidden border bg-white">{children}</div>
        </main>
        <footer className="pb-10">
          <p className="text-center text-xs text-gray-800">
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
