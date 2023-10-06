import Link from 'next/link'

const Action: React.FC<{
  disabled?: boolean
  href: string
  children?: React.ReactNode
}> = ({ disabled = false, href, children }) => (
  <Link
    href={href}
    className={`inline-block font-semibold text-primary-600 no-underline transition-all ease-in-out ${
      disabled ? 'opacity-80' : 'hover:text-primary-700'
    }`}
  >
    {children}
  </Link>
)

export default Action
