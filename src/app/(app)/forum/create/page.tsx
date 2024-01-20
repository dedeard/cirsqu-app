import Link from 'next/link'
import FormCreate from './components/FormCreate'

export default function CreateForumPage() {
  return (
    <div className="py-3">
      <div className="w-full rounded-lg border border-neutral-200 bg-neutral-200/30 dark:border-neutral-800 dark:bg-neutral-800/30 md:max-w-2xl">
        <div className="flex h-[74px] items-center justify-between border-b border-neutral-200 px-3 dark:border-neutral-800 md:px-5">
          <h1 className="flex-1 text-lg uppercase  md:text-xl md:tracking-widest">Write questions</h1>
          <Link href="/forum" className="hoverable-red flex h-8 items-center rounded-lg px-3 text-sm font-semibold">
            Cancel
          </Link>
        </div>
        <div className="p-3 md:px-5">
          <p className="my-3 text-center">
            Make sure to follow the{' '}
            <Link href="/forum/rules" className="text-blue-600">
              community rules
            </Link>{' '}
            so that your question is not deleted
          </p>
        </div>
        <FormCreate />
      </div>
    </div>
  )
}
