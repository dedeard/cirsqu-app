const Divider: React.FC<{ text?: string }> = ({ text }) => (
  <div className="my-6 flex items-center">
    <div className="h-px flex-1 bg-gray-200"></div>
    <span className="px-4 text-gray-700">{text}</span>
    <div className="h-px flex-1 bg-gray-200"></div>
  </div>
)

export default Divider
