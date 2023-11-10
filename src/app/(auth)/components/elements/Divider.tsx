const Divider: React.FC<{ text?: string }> = ({ text }) => (
  <div className="my-6 flex items-center">
    <span className="block h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
    <span className="block px-4 text-neutral-500">{text}</span>
    <span className="block h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
  </div>
)

export default Divider
