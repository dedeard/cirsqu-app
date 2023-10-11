export const Spinner: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" viewBox="0 0 200 200" {...props}>
    <defs>
      <linearGradient id="spinner-secondHalf">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0"></stop>
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.5"></stop>
      </linearGradient>
      <linearGradient id="spinner-firstHalf">
        <stop offset="0%" stopColor="currentColor"></stop>
        <stop offset="100%" stopColor="currentColor" stopOpacity="0.5"></stop>
      </linearGradient>
    </defs>
    <g strokeWidth="8">
      <path stroke="url(#spinner-secondHalf)" d="M4 100a96 96 0 01192 0"></path>
      <path stroke="url(#spinner-firstHalf)" d="M196 100a96 96 0 01-192 0"></path>
      <path stroke="currentColor" strokeLinecap="round" d="M4 100a96 96 0 010-2"></path>
    </g>
    <animateTransform
      attributeName="transform"
      dur="1300ms"
      from="0 0 0"
      repeatCount="indefinite"
      to="360 0 0"
      type="rotate"
    ></animateTransform>
  </svg>
)

export default Spinner
