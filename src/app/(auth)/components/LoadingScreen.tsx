import classNames from 'classnames'

const LoadingScreen: React.FC<{ show?: boolean } & React.HTMLAttributes<HTMLDivElement>> = ({ show, className, ...props }) => (
  <div
    {...props}
    className={classNames(
      className,
      show ? 'visible scale-150 opacity-100' : 'invisible scale-100 opacity-0',
      'absolute bottom-0 left-0 right-0 top-0 z-30 flex h-full w-full transform-gpu cursor-wait items-center justify-center bg-white/10 bg-opacity-50 backdrop-blur-[2px] transition-all ease-in-out dark:bg-black/10',
    )}
  >
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-neutral-200 !border-t-blue-600 dark:border-neutral-800" />
  </div>
)

export default LoadingScreen
