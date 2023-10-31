import type { Metadata } from 'next'
import Password from './components/Password'

export const metadata: Metadata = {
  title: 'Change Your Password - CIRSQU',
  description:
    'Security is paramount. Update your password to ensure your CIRSQU account remains secure. Remember, a strong password is your first line of defense!',
}

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <Password />
    </div>
  )
}
