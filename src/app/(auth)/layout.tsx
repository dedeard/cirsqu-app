import { redirect } from 'next/navigation'
import { getAuthData } from '@/utils/server-fetch'
import { AuthProvider } from './components/AuthContext'
import { headers } from 'next/headers'
import { encodeToBase64 } from '@/utils/base64'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const headersList = headers()
  const fullUrl = headersList.get('x-url') || ''

  const { user, profile } = await getAuthData()
  if (!user) {
    return redirect(`/sign-in?next=${encodeToBase64(fullUrl)}`)
  }

  if (!profile) {
    return redirect(`/complete-profile?next=${encodeToBase64(fullUrl)}`)
  }

  return (
    <AuthProvider user={user} profile={profile}>
      {children}
    </AuthProvider>
  )
}
