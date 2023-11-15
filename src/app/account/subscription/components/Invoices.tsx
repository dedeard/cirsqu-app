import React, { useEffect, useState } from 'react'
import moment from 'moment'
import cn from 'classnames'
import { ExternalLink } from 'react-feather'
import clientFetch from '@/utils/fetch/client-fetch'
import formatAmount from '@/utils/transforms/format-amount'
import Spinner from '@/components/svg/Spinner'
import Panel from '../../components/Panel'

const statusColor = (status?: string) => {
  switch (status) {
    case 'draft':
    case 'void':
      return 'text-neutral-900 bg-yellow-600'
    case 'open':
      return 'text-white bg-blue-600'
    case 'paid':
      return 'text-neutral-900 bg-green-600'
    case 'uncollectible':
      return 'text-white bg-red-600'
  }
}

const Invoices: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [initLoading, setInitLoading] = React.useState(true)
  const [hasMore, setHasMore] = useState(true)
  const [items, setItems] = useState<any[]>([])
  const [cursor, setCursor] = useState<string>()

  const loadMore = async () => {
    setIsLoading(true)
    const resp = await clientFetch(`invoices?limit=5${cursor ? '&starting_after=' + cursor : ''}`)
    if (resp.ok) {
      const { data, has_more } = await resp.json()
      setHasMore(has_more)
      setInitLoading(false)
      setItems([...items, ...data])
      setCursor(data?.pop()?.id || undefined)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    loadMore()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Panel title="Invoice History">
      <div className="relative overflow-x-auto">
        {items.length > 0 && (
          <table className="w-full text-sm">
            <tbody>
              {items.map((item: any) => (
                <tr
                  key={item.id}
                  className="whitespace-nowrap border-b border-neutral-200 px-3 last:border-b-0 even:bg-neutral-200/30 dark:border-neutral-800 even:dark:bg-neutral-800/30 md:px-5"
                >
                  <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                    {item.hosted_invoice_url ? (
                      <a className="flex items-center hover:text-blue-600" href={item.hosted_invoice_url} target="_blank">
                        {moment(item.created * 1000).format('MMM DD, YYYY')} <ExternalLink className="ml-1" size="1em" />
                      </a>
                    ) : (
                      <span>{moment(item.created * 1000).format('MMM DD, YYYY')}</span>
                    )}
                  </th>
                  <td className="px-6 py-4">{formatAmount(item.amount_paid, item.currency, false)}</td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={cn(
                        statusColor(item.status),
                        'inline-flex items-center justify-center rounded-lg px-2 py-1 text-xs font-semibold uppercase tracking-widest',
                      )}
                    >
                      {String(item.status).replaceAll('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">{item.subscription.plan.product.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {initLoading &&
          Array.from(Array(5), (_, i) => (
            <div
              key={i}
              className="border-b border-neutral-200 px-3 py-4 last:border-b-0 even:bg-neutral-200/30 dark:border-neutral-800 even:dark:bg-neutral-800/30 md:px-5"
            >
              <span className="skeleton flex h-full w-full rounded-lg" />
            </div>
          ))}
      </div>

      {hasMore && !initLoading && (
        <div className="flex w-full justify-center border-t border-neutral-200 p-3 dark:border-neutral-800 md:px-5">
          <button
            disabled={isLoading}
            className="hoverable-blue flex h-10 w-32 items-center justify-center rounded-lg text-sm"
            onClick={loadMore}
          >
            {!isLoading && 'Load More'}
            {isLoading && <Spinner className="h-5 w-5" />}
          </button>
        </div>
      )}
    </Panel>
  )
}

export default Invoices
