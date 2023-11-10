import Header from '@/components/features/Header'
import LayoutCard from './components/LayoutCard'
import SimpleFooter from '@/components/elements/SimpleFooter'

export const dynamic = 'force-static'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header onlyBrand />

      <main className="flex min-h-screen flex-col pt-16">
        <div className="mx-auto w-full max-w-[540px] flex-1 px-3 py-10 md:px-0">
          <LayoutCard>{children}</LayoutCard>
        </div>
      </main>

      <div className="container px-3">
        <span className="mb-6 block h-px w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-800" />
        <SimpleFooter />
      </div>
    </>
  )
}
