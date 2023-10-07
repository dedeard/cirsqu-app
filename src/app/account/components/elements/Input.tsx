import React from 'react'
import cn from 'classnames'
import Label from './Label'
import InputError from '@/app/components/elements/InputError'

type FormElementProps = {
  label: string
  error?: string
}

const formElementClasses = (error?: string) =>
  cn(
    error ? 'mb-2 border-red-700' : 'border-gray-200',
    'block w-full focus:rounded border bg-gray-50 outline-none ring-primary-600 transition-all focus:ring-2',
  )

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement> & FormElementProps> = ({ label, required, error, ...props }) => (
  <Label htmlFor={props.name} text={label} required={required}>
    <input id={props.name} className={cn(formElementClasses(error), 'md:w-3/4 lg:w-2/3')} {...props} />
    <InputError error={error} />
  </Label>
)

export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement> & FormElementProps> = ({
  label,
  required,
  error,
  ...props
}) => (
  <Label htmlFor={props.name} text={label} required={required}>
    <textarea id={props.name} className={formElementClasses(error)} {...props} />
    <InputError error={error} />
  </Label>
)
