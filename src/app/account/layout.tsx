import LayoutWrapper from './components/LayoutWrapper'

export const dynamic = 'force-static'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>
}
