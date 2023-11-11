import Header from '@/components/features/Header'
import Script from 'next/script'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script src="https://www.youtube.com/iframe_api" async />
      <main className="dark flex min-h-screen flex-col bg-neutral-900 text-neutral-200">
        <Header isStatic hideTheme noSidebar />
        {children}
      </main>
    </>
  )
}
