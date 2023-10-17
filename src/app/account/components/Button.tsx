import React from 'react'
import { Button as NButton, ButtonProps } from '@nextui-org/react'

export const Button: React.FC<ButtonProps> = ({ color, children, ...props }) => (
  <div className="w-full py-3 lg:grid lg:grid-cols-3 lg:gap-3">
    <span className="block" />
    <div className="lg:col-span-2">
      <NButton color={color || 'primary'} {...props}>
        {children}
      </NButton>
    </div>
  </div>
)

export default Button
