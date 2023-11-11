import Link from 'next/link'

const NotYet: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 px-3 py-10 md:px-5">
      <div className="text-center">
        <div className="mb-3">
          <span className="uppercase tracking-widest">Subscription Status</span>
        </div>
        <h1 className="text-3xl">No Active Plan Found</h1>
      </div>

      <p className="py-3 text-center font-light opacity-80">
        We noticed that you don't have an active subscription at the moment. By becoming a member, you'll gain exclusive access to premium
        content and additional benefits. Elevate your experience and unlock the full potential of our platform.
      </p>

      <div className="mx-auto flex w-full max-w-xs flex-row justify-center gap-3">
        <Link href="/pro" className="hoverable-blue flex h-10 w-full items-center justify-center rounded-lg px-4 text-sm">
          Discover Our Membership Plans
        </Link>
      </div>
    </div>
  )
}

export default NotYet
