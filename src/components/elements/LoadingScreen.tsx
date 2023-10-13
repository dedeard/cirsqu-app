import { Spinner } from '@nextui-org/react'
import classNames from 'classnames'

const LoadingScreen: React.FC<{ show?: boolean } & React.HTMLAttributes<HTMLDivElement>> = ({ show, className, ...props }) => (
  <div
    {...props}
    className={classNames(
      className,
      show ? 'visible scale-150 opacity-100' : 'invisible scale-100 opacity-0',
      'absolute bottom-0 left-0 right-0 top-0 z-40 flex h-full w-full transform-gpu cursor-wait items-center justify-center bg-white/10 bg-opacity-50 backdrop-blur-[2px] transition-all ease-in-out dark:bg-black/10',
    )}
  >
    <Spinner className="scale-150" />
  </div>
)

export default LoadingScreen