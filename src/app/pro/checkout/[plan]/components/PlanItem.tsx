import Link from 'next/link'
import cn from 'classnames'
import { Check } from 'react-feather'
import formatAmount from '@/utils/format-amount'

type PropTypes = {
  product: IProduct
  active: boolean
}

const PlanItem: React.FC<PropTypes> = ({ product, active }) => {
  return (
    <li>
      <Link className="flex items-center rounded-lg bg-white px-6 py-5 text-slate-800" href={`/pro/checkout/${product.price.lookup_key}`}>
        <span className={cn(active ? 'bg-blue-600' : 'border bg-gray-200', 'mr-3 flex h-5 w-5 rounded-full')}>
          {active && <Check strokeWidth="4" className="m-auto block h-3 w-3 text-white" />}
        </span>
        <span className="block flex-1 text-lg first-letter:uppercase">{product.price.lookup_key}</span>
        <span className="block items-end">
          <span className="text-lg font-semibold">{formatAmount(product.price.unit_amount)}</span>
          <span className="text-sm text-gray-500"> / {product.price.recurring?.interval || 'once'}</span>
        </span>
      </Link>
    </li>
  )
}

export default PlanItem
