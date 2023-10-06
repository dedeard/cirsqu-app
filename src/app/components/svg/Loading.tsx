export const Loading: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 50 50" {...props}>
    <circle fill="currentColor" stroke="none" cx="5" cy="25" r="5">
      <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.1" />
    </circle>
    <circle fill="currentColor" stroke="none" cx="25" cy="25" r="5">
      <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.2" />
    </circle>
    <circle fill="currentColor" stroke="none" cx="45" cy="25" r="5">
      <animate attributeName="opacity" dur="1s" values="0;1;0" repeatCount="indefinite" begin="0.3" />
    </circle>
  </svg>
)

export default Loading
