import Link from 'next/link'

type PropTypes = {
  href: string
  children?: React.ReactNode
}

const Action: React.FC<PropTypes> = ({ href, children }) => (
  <div className="text-center">
    <Link href={href} className="text-blue-600 hover:text-blue-700 dark:hover:text-blue-500">
      {children}
    </Link>
  </div>
)

export default Action
