import React from 'react'
import cn from 'classnames'
import Label from './Label'
import { Input as NInput, Textarea as NTextarea, InputProps, TextAreaProps } from '@nextui-org/react'

type FormElementProps = {
  label: string
}

export const Input: React.FC<InputProps & FormElementProps> = ({ label, required, className, ...props }) => (
  <Label htmlFor={props.name} text={label} required={required}>
    <NInput id={props.name} size="lg" className={cn(className, 'md:w-3/4 lg:w-2/3')} {...props} />
  </Label>
)

export const Textarea: React.FC<TextAreaProps & FormElementProps> = ({ label, required, ...props }) => (
  <Label htmlFor={props.name} text={label} required={required}>
    <NTextarea id={props.name} size="lg" {...props} />
  </Label>
)
