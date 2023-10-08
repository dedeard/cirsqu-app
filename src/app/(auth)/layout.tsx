import { redirect } from 'next/navigation'
import { getAuthData } from '@/utils/server-fetch'
import { AuthProvider } from './components/AuthContext'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { user, profile } = await getAuthData()

  if (!user) {
    return redirect(`/sign-in?next=/account`)
  }

  if (!profile) {
    return redirect(`/complete-profile?next=/account`)
  }

  return (
    <AuthProvider user={user} profile={profile}>
      {children}
    </AuthProvider>
  )
}
