'use client'
import { Divider as Line } from '@nextui-org/react'

const Divider: React.FC<{ text?: string }> = ({ text }) => (
  <div className="my-6 flex items-center">
    <Line className="flex-1" />
    <span className="block px-4 opacity-80">{text}</span>
    <Line className="flex-1" />
  </div>
)

export default Divider
