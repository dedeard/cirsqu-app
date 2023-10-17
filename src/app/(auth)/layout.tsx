import LayoutWrapper from './components/LayoutWrapper'

export const dynamic = 'force-static'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>
}
