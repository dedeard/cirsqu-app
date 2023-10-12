import { AuthRequiredProvider } from '@/components/contexts/AuthRequiredContext'
import { getAuthData } from '@/utils/server-fetch'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await getAuthData()
  const pathname = headers().get('x-pathname')

  if (!user || !profile) {
    return redirect(`/sign-in?next=${pathname}`)
  }

  return <AuthRequiredProvider init={{ user, profile }}>{children}</AuthRequiredProvider>
}
