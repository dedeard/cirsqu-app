import React from 'react'
import { Lock } from 'react-feather'
import PlanItem from './PlanItem'

type PropTypes = {
  products: IProduct[]
  currentProduct: IProduct
} & React.HTMLAttributes<HTMLDivElement>

const ChosenPlan: React.FC<PropTypes> = ({ products, currentProduct, ...props }) => {
  return (
    <div {...props}>
      <div className="mb-10 text-2xl font-semibold tracking-wide">Chosen Plan</div>

      <ul className="mb-8 grid grid-cols-1 gap-4">
        {products.map((product) => (
          <PlanItem key={product.id} product={product} active={product.price.lookup_key === currentProduct.price.lookup_key} />
        ))}
      </ul>

      <p className="mb-6 font-light text-neutral-400">
        Explore the benefits of each plan and choose the one that best suits your needs. Upgrade or downgrade at any time.
      </p>

      <p className="flex font-light text-neutral-400">
        <span className="mr-3 block py-1 text-neutral-600">
          <Lock className="h-4 w-4" />
        </span>
        <span className="block">Your security is our priority. All transactions are encrypted and securely processed.</span>
      </p>
    </div>
  )
}

export default ChosenPlan
