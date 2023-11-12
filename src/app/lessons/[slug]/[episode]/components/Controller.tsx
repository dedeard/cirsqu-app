import { useState, useEffect } from 'react'
import cn from 'classnames'
import { useParams } from 'next/navigation'
import { ArrowLeftCircle, ArrowRightCircle, Download } from 'react-feather'
import { useRouter } from '@/components/contexts/ProgressBarContext'

type PropTypes = {
  episode?: IEpisode
  episodes: IAEpisode[]
} & React.HTMLAttributes<HTMLDivElement>

const Controller: React.FC<PropTypes> = ({ episode, episodes, className, ...props }) => {
  const router = useRouter()
  const params = useParams()
  const [isAutoplay, setIsAutoplay] = useState(false)

  const currentEpisodeIndex = episodes.findIndex((el) => el.episodeId === params.episode)
  const nextEpisode = episodes[currentEpisodeIndex + 1]
  const prevEpisode = episodes[currentEpisodeIndex - 1]

  const handleNext = () => {
    if (nextEpisode) {
      router.push(`/lessons/${params.slug}/${nextEpisode.episodeId}`)
    }
  }

  const handlePrev = () => {
    if (prevEpisode) {
      router.push(`/lessons/${params.slug}/${prevEpisode.episodeId}`)
    }
  }

  const handleDownload = () => {
    const anchor = document.createElement('a')
    anchor.href = episode?.downloadUrl || ''
    anchor.target = '_blank'
    anchor.click()
  }

  const toggleAutoPlay = (value: boolean) => {
    setIsAutoplay(value)
    window.localStorage.setItem('autoplay', String(value))
  }

  useEffect(() => {
    setIsAutoplay(window.localStorage.getItem('autoplay') === 'true')
  }, [])

  return (
    <div className={cn(className, 'flex items-center justify-between px-3 py-1')} {...props}>
      <div className="flex">
        <button
          type="button"
          disabled={!episode?.downloadUrl}
          className="block rounded-full p-2 hover:enabled:bg-neutral-800 disabled:opacity-50"
          onClick={handleDownload}
        >
          <Download className="m-auto h-5 w-5" />
        </button>
        <button
          type="button"
          disabled={!prevEpisode}
          className="ml-4 block rounded-full p-2 hover:enabled:bg-neutral-800 disabled:opacity-50"
          onClick={handlePrev}
        >
          <ArrowLeftCircle className="m-auto h-5 w-5" />
        </button>
        <button
          type="button"
          disabled={!nextEpisode}
          className="block rounded-full p-2 hover:enabled:bg-neutral-800 disabled:opacity-50"
          onClick={handleNext}
        >
          <ArrowRightCircle className="m-auto h-5 w-5" />
        </button>
      </div>
      <label className="relative flex cursor-pointer items-center">
        <input type="checkbox" className="peer sr-only" checked={isAutoplay} onChange={() => toggleAutoPlay(!isAutoplay)} />
        <div className="peer h-6 w-11 rounded-full bg-neutral-700 transition-colors after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-neutral-300 after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-focus:outline-none" />
        <span className="ms-3 text-sm">Autoplay</span>
      </label>
    </div>
  )
}

export default Controller
