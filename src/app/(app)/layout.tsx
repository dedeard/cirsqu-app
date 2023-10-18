import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Sidebar from './components/Sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex min-h-layout flex-col">
        <div className="container flex flex-col px-3 lg:flex-row lg:items-start">
          <Sidebar />
          <main className="flex-1 py-3">{children}</main>
        </div>
      </main>
      <Footer />
    </>
  )
}
