import Header from '@/components/layout/Header'
import NotFound from '@/components/layout/NotFound'
import SimpleFooter from '@/components/layout/SimpleFooter'

export const dynamic = 'force-static'

export default function Page() {
  return (
    <main className="background-animate flex min-h-screen flex-col dark:bg-gradient-to-br dark:from-black dark:via-gray-950 dark:to-black">
      <Header onlyBrand shouldHideOnScroll={false} position="static" isBordered={false} />

      <NotFound />

      <SimpleFooter />
    </main>
  )
}
