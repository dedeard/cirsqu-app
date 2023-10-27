import Header from '@/components/features/Header'
import Script from 'next/script'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script src="https://www.youtube.com/iframe_api" async />
      <main className="background-animate flex min-h-screen flex-col bg-gradient-to-br from-black via-slate-950 to-black text-foreground dark">
        <Header shouldHideOnScroll={false} position="static" hideTheme noSidebar isBlurred={false} className="bg-transparent" />
        {children}
      </main>
    </>
  )
}
