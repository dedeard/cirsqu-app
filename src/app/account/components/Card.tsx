import cn from 'classnames'

type CardPropTypes = {
  title: string
} & React.ButtonHTMLAttributes<HTMLDivElement>

const Card: React.FC<CardPropTypes> = ({ title, children, className, ...props }) => {
  return (
    <div className={cn('border bg-white', className)} {...props}>
      <div className="border-b p-3">
        <h1 className="text-lg  md:text-xl">
          <span className="uppercase leading-loose tracking-widest">{title}</span>
        </h1>
      </div>
      {children}
    </div>
  )
}

export default Card
