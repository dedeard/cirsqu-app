import Header from '@/components/features/Header'
import Footer from '@/components/elements/Footer'
import LayoutWrapper from './components/LayoutWrapper'

export const dynamic = 'force-static'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header noSidebar />
      <div className="flex min-h-screen flex-col pt-16">
        <LayoutWrapper>{children}</LayoutWrapper>
      </div>
      <Footer />
    </>
  )
}
