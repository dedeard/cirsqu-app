const Alert: React.FC<{
  color?: 'primary' | 'red' | 'gray'
  children?: React.ReactNode
}> = ({ color, children }) => {
  let bgColorClass

  switch (color) {
    case 'red':
      bgColorClass = 'bg-red-200'
      break
    case 'gray':
      bgColorClass = 'bg-gray-200'
      break
    default:
      bgColorClass = 'bg-primary-200'
  }

  return <div className={`my-4 rounded px-6 py-5 text-center font-normal text-gray-900 ${bgColorClass}`}>{children}</div>
}

export default Alert
