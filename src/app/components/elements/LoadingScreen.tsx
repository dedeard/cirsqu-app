import Loading from '@/app/components/svg/Loading'

const LoadingScreen: React.FC<{
  show: boolean
  size?: number | string
}> = ({ show, size }) => (
  <div
    className={`absolute bottom-0 left-0 right-0 top-0 z-10 flex h-full w-full transform-gpu cursor-wait items-center justify-center bg-white bg-opacity-50 backdrop-blur-[2px] transition-all ease-in-out ${
      show ? 'visible scale-150 opacity-100' : 'invisible scale-100 opacity-0'
    }`}
  >
    <Loading height={size || 65} width={size || 65} />
  </div>
)

export default LoadingScreen
