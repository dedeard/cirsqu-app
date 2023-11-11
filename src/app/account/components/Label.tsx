type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  text: string
  required?: boolean
}

export const Label: React.FC<LabelProps> = ({ text, required, children, ...props }) => (
  <div className="my-3 lg:grid lg:grid-cols-3 lg:gap-3">
    <label className="mb-[2px] flex items-center text-sm lg:h-12 lg:leading-loose" {...props}>
      {text} {required && <span className="text-red-600">*</span>}
    </label>
    <div className="relative lg:col-span-2">{children}</div>
  </div>
)

export default Label
