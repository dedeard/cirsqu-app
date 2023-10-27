import Footer from '@/components/elements/Footer'
import Header from '@/components/features/Header'

export const dynamic = 'force-static'

export default function MarkdownLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header noSidebar />
      {children}
      <Footer />
    </>
  )
}
