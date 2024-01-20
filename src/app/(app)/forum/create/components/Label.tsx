import cn from 'classnames'
import React from 'react'

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = ({ className, ...props }) => (
  <label className={cn(className, 'mb-1 block text-xs tracking-widest')} {...props} />
)

export default Label
