import { Inbox } from 'react-feather'

const NoResults: React.FC<{ query: string }> = ({ query }) => {
  return (
    <div className="py-16 text-center">
      <div className="mb-3 flex animate-pulse">
        <Inbox strokeWidth={0.5} className="m-auto block h-32 w-32 " />
      </div>
      <p className="font-light uppercase tracking-widest">No results for</p>
      <h3 className="mx-3 overflow-hidden text-2xl">"{query}"</h3>
    </div>
  )
}

export default NoResults
