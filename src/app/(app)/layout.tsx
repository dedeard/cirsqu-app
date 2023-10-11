import { AuthProvider } from '@/components/contexts/AuthContext'
import { getAuthData } from '@/utils/server-fetch'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const initAuthData = await getAuthData()
  return <AuthProvider init={initAuthData}>{children}</AuthProvider>
}
