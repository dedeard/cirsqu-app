import Header from '@/components/features/Header'
import NotFound from '@/components/elements/NotFound'
import SimpleFooter from '@/components/elements/SimpleFooter'
import { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

export default function Page() {
  return (
    <main className="background-animate flex min-h-screen flex-col dark:bg-gradient-to-br dark:from-black dark:via-gray-950 dark:to-black">
      <Header onlyBrand shouldHideOnScroll={false} position="static" isBordered={false} />

      <NotFound />

      <SimpleFooter />
    </main>
  )
}
