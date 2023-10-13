'use client'
import Link from 'next/link'
import cn from 'classnames'
import { Check } from 'react-feather'
import formatAmount from '@/utils/format-amount'
import { Button } from '@nextui-org/react'

const PlanItem: React.FC<{ product: IProduct }> = ({ product }) => {
  const light = product.price.lookup_key === 'monthly'
  return (
    <div
      className={cn(
        light && 'text-gray-200 backdrop-brightness-90',
        !light && 'bg-white text-gray-800',
        'relative w-full max-w-md rounded-medium px-8 py-6 shadow-xl dark',
      )}
    >
      <div className="flex justify-between">
        <div>
          <div className="text-dark-blue mb-2 text-lg font-medium first-letter:uppercase">{product.price.lookup_key}</div>
          <div className="text-sm leading-tight text-gray-500">{product.description}</div>
        </div>
        <div className="text-4xl leading-none">
          {formatAmount(product.price.unit_amount)}
          <span className="ml-1 text-base text-gray-500">/{product.price.recurring?.interval[0] || 'once'}</span>
        </div>
      </div>
      <div className={cn(light && 'border-slate-800', 'mb-8 mt-6 w-full border-b')}></div>
      <ul className="mb-10">
        {product.features.map((feature) => (
          <li key={feature.name} className="text-dark-blue mb-4 flex items-center text-sm font-medium">
            <span className="mr-4 flex h-5 w-5 rounded-full bg-primary">
              <Check strokeWidth="4" className=" m-auto block h-3 w-3 text-white" />
            </span>
            <span className="block flex-1">{feature.name}</span>
          </li>
        ))}
      </ul>
      <Button as={Link} href={`/pro/checkout?plan=${product.price.lookup_key}`} fullWidth color="primary" className="font-medium">
        Get started
      </Button>
    </div>
  )
}

export default PlanItem
