const Alert: React.FC<{
  color?: 'primary' | 'danger' | 'default'
  children?: React.ReactNode
}> = ({ color, children }) => {
  let bgColorClass

  switch (color) {
    case 'danger':
      bgColorClass = 'bg-danger-100'
      break
    case 'default':
      bgColorClass = 'bg-default-100'
      break
    default:
      bgColorClass = 'bg-primary-100'
  }

  return <div className={`my-4 rounded-medium px-6 py-5 text-center  ${bgColorClass}`}>{children}</div>
}

export default Alert
