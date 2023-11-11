const Loading: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 px-3 py-10 md:px-5">
      <div>
        <span className="skeleton mx-auto mb-3 flex h-4 w-1/4 rounded-lg" />
        <span className="skeleton mx-auto flex h-8 w-1/2 rounded-lg" />
      </div>

      <div className="flex flex-col items-center justify-center gap-2 py-3">
        <span className="skeleton flex h-4 w-1/2 rounded-lg" />
        <span className="skeleton flex h-4 w-full rounded-lg" />
        <span className="skeleton flex h-4 w-4/6 rounded-lg" />
      </div>

      <div className="mx-auto flex w-full max-w-xs flex-row justify-center gap-3">
        <span className="skeleton flex h-10 w-full rounded-lg" />
      </div>
    </div>
  )
}

export default Loading
