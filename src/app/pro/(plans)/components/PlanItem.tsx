import Link from 'next/link'
import cn from 'classnames'
import { Check } from 'react-feather'
import formatAmount from '@/utils/format-amount'

const PlanItem: React.FC<{ product: IProduct }> = ({ product }) => {
  const light = product.price.lookup_key === 'monthly'
  return (
    <div
      className={cn(
        light && 'text-neutral-200 backdrop-brightness-90',
        !light && 'bg-white text-neutral-800',
        'dark relative w-full max-w-md rounded-lg px-8 py-6 shadow-xl',
      )}
    >
      <div className="flex justify-between">
        <div>
          <div className="text-dark-blue mb-2 text-lg font-medium first-letter:uppercase">{product.price.lookup_key}</div>
          <div className={cn(light ? 'text-neutral-400' : 'text-neutral-600', 'text-sm leading-tight')}>{product.description}</div>
        </div>
        <div className="text-4xl leading-none">
          {formatAmount(product.price.unit_amount)}
          <span className={cn(light ? 'text-neutral-400' : 'text-neutral-600', 'ml-1 text-base')}>
            /{product.price.recurring?.interval[0] || 'once'}
          </span>
        </div>
      </div>

      <div className={cn(light ? 'border-neutral-800' : 'border-neutral-200', 'mb-8 mt-6 w-full border-b')} />

      <ul className="mb-10">
        {product.features.map((feature) => (
          <li key={feature.name} className="text-dark-blue mb-4 flex items-center text-sm font-medium">
            <span className="mr-4 flex h-5 w-5 rounded-full bg-blue-600">
              <Check strokeWidth="4" className=" m-auto block h-3 w-3 text-white" />
            </span>
            <span className="block flex-1">{feature.name}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/pro/checkout/${product.price.lookup_key}`}
        className="hoverable-blue flex h-10 items-center justify-center rounded-lg text-sm font-medium"
      >
        Get started
      </Link>
    </div>
  )
}

export default PlanItem
