import cn from 'classnames'

type PropTypes = {
  title: string
} & React.HTMLAttributes<HTMLDivElement>

const Panel: React.FC<PropTypes> = ({ title, className, children, ...props }) => {
  return (
    <div
      className={cn(className, 'rounded-lg border border-neutral-200 bg-neutral-200/30 dark:border-neutral-800 dark:bg-neutral-800/30')}
      {...props}
    >
      <h1 className="border-b border-neutral-200 px-3 py-5 text-lg uppercase dark:border-neutral-800 md:px-5 md:text-xl md:tracking-widest">
        {title}
      </h1>
      {children}
    </div>
  )
}

export default Panel
