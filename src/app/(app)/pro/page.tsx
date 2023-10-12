import BackToggle from './components/BackToggle'
import PlanItem from './components/PlanItem'
import FAQItem from './components/FAQItem'
import serverFetch from '@/utils/server-fetch'

export default async function PlansPage() {
  const response = await serverFetch('products', { cache: 'no-cache' })
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message)
  }
  const products: IProduct[] = await response.json()
  return (
    <div className="background-animate min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-gray-200">
      <BackToggle />
      <div className="container max-w-6xl px-3">
        <section className="flex flex-col items-center justify-center pb-12 pt-28 md:pb-28 md:pt-36">
          <div className="container flex flex-col items-center justify-center">
            <h1 className="text-center text-4xl font-bold md:w-8/12 md:text-5xl">Unlimited access with a premium membership.</h1>
            <p className="mt-4 text-center text-lg font-light text-gray-300 md:mt-8">
              Join thousands of developers improving their skills every day
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 py-12 md:py-16 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.id} className="flex items-center justify-center">
              <PlanItem product={product} />
            </div>
          ))}
        </section>

        <section className="mx-auto max-w-7xl px-8 py-12 md:py-20">
          <div className="mx-auto max-w-3xl divide-y divide-slate-800">
            <h2 className="mb-8 text-center text-2xl tracking-wider text-white md:text-3xl">Frequently asked questions</h2>
            <FAQItem defaultOpen question="What does a premium membership give me?">
              Completely unlimited access to everything! Once you're signed up, you'll be able to watch the entire library of content, and
              all future content.
              <br />
              Oh, and you also get access to course resources, full source code, high quality episode video downloads and the ability to
              participate in course discussions.
            </FAQItem>
            <FAQItem question="Can I cancel?">
              Yes! If you no longer want your membership to renew, you can cancel it directly from your account area. We don't make it
              difficult, by design.
            </FAQItem>
          </div>
        </section>
      </div>
    </div>
  )
}
