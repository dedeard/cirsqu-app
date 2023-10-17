import React from 'react'
import clientFetch from '@/utils/client-fetch'
import { useAsyncList } from '@react-stately/data'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  Button,
  CardBody,
  Chip,
  Skeleton,
} from '@nextui-org/react'
import Card from '../../components/Card'
import formatAmount from '@/utils/format-amount'
import moment from 'moment'
import { ExternalLink } from 'react-feather'

const Invoices: React.FC = () => {
  const [hasMore, setHasMore] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(true)

  const list = useAsyncList({
    async load({ signal, cursor }) {
      const resp = await clientFetch(`invoices${cursor ? '?starting_after=' + cursor : ''}`, { signal })
      const { data, has_more } = await resp.json()

      setHasMore(has_more)
      setIsLoading(false)

      return {
        items: data,
        cursor: has_more ? data.pop().id : undefined,
      }
    },
  })

  const statusColor = (status?: string) => {
    switch (status) {
      case 'draft':
        return 'warning'
      case 'open':
        return 'primary'
      case 'paid':
        return 'success'
      case 'uncollectible':
        return 'danger'
      case 'void':
        return 'secondary'
    }
  }

  return (
    <Card title="Invoice History">
      <CardBody>
        <Table
          removeWrapper
          hideHeader
          isStriped
          bottomContent={
            hasMore && !isLoading ? (
              <div className="flex w-full justify-center">
                <Button isDisabled={list.isLoading} color="primary" className="w-32" onPress={list.loadMore}>
                  {list.isLoading && <Spinner color="white" size="sm" />}
                  {!list.isLoading && 'Load More'}
                </Button>
              </div>
            ) : null
          }
          classNames={{
            table: isLoading ? 'min-h-[250px]' : '',
          }}
        >
          <TableHeader>
            <TableColumn>Created</TableColumn>
            <TableColumn>Amount</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Product</TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            loadingContent={
              <div className="grid w-full grid-cols-1 gap-3">
                {Array.from(Array(5), (_, i) => (
                  <div key={i} className="h-10 py-1">
                    <Skeleton className="flex h-full w-full rounded-medium" />
                  </div>
                ))}
              </div>
            }
            emptyContent={'No invoices to display yet.'}
          >
            {list.items.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.hosted_invoice_url ? (
                    <a className="flex items-center" href={item.hosted_invoice_url} target="_blank">
                      {moment(item.created * 1000).format('MMM DD, YYYY')} <ExternalLink className="ml-1" size="1em" />
                    </a>
                  ) : (
                    <span>{moment(item.created * 1000).format('MMM DD, YYYY')}</span>
                  )}
                </TableCell>
                <TableCell>{formatAmount(item.amount_paid, item.currency, false)}</TableCell>
                <TableCell className="text-center">
                  <Chip size="sm" variant="flat" radius="sm" color={statusColor(item.status)}>
                    <span className="text-xs font-bold uppercase leading-none">{item.status}</span>
                  </Chip>
                </TableCell>
                <TableCell>{item.subscription.plan.product.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  )
}

export default Invoices
