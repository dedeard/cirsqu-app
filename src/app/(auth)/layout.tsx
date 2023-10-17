import Header from '@/components/layout/Header'
import LayoutCard from './components/LayoutCard'
import SimpleFooter from '@/components/layout/SimpleFooter'

export const dynamic = 'force-static'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="background-animate flex min-h-screen flex-col dark:bg-gradient-to-br dark:from-black dark:via-gray-950 dark:to-black">
      <Header isBlurred onlyBrand shouldHideOnScroll={false} position="static" isBordered={false} className="shadow-medium" />
      <div className="mx-auto w-full max-w-[540px] flex-1 px-3 py-10 md:px-0">
        <LayoutCard>{children}</LayoutCard>
      </div>
      <SimpleFooter />
    </main>
  )
}
