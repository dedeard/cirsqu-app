import cn from 'classnames'

const HR: React.FC<React.HTMLAttributes<HTMLHRElement>> = ({ className, ...props }) => {
  return <hr className={cn(className, 'border-neutral-200 dark:border-neutral-800')} {...props} />
}

export default HR
