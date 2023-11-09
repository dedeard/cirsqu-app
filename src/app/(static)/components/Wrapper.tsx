import Heading from './Heading'

const Wrapper: React.FC<{ children: React.ReactNode; title: string; content: React.ReactNode }> = ({ children, ...props }) => {
  return (
    <main>
      <Heading {...props} />
      <div className="container relative z-20 max-w-5xl px-3 pb-10">
        <div className="rounded-medium border-divider bg-content1 -mt-10 border px-3 py-6 dark:border-transparent md:-mt-14 md:px-6 md:py-10 lg:px-8">
          <div className="prose prose-sm w-full max-w-none dark:prose-invert md:prose-base">{children}</div>
        </div>
      </div>
    </main>
  )
}

export default Wrapper
