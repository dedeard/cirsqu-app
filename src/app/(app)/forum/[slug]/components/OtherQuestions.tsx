import Link from 'next/link'

const OtherQuestions: React.FC<{ tags: string[] }> = ({ tags }) => {
  return (
    <div className="w-full rounded-lg border border-neutral-200 bg-neutral-200/30 p-3 dark:border-neutral-800 dark:bg-neutral-800/30">
      <p className="mb-3 text-lg font-semibold uppercase">Other Questions</p>
      <ul className="mb-3 list-inside list-disc overflow-hidden">
        {tags.slice(0, 12).map((tag) => (
          <li key={tag} className="truncate whitespace-nowrap">
            <Link href={`/forum?tag=${tag}`} className="opacity-70 hover:opacity-100">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, autem vero. Nisi, dicta aliquid.
            </Link>
          </li>
        ))}
      </ul>
      <a className="hoverable-default block w-full rounded-lg border p-2 text-center text-sm uppercase">Browse all questions</a>
    </div>
  )
}

export default OtherQuestions
