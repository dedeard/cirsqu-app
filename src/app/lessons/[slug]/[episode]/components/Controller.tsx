import React from 'react'
import cn from 'classnames'
import { useParams, useRouter } from 'next/navigation'
import { Button, Spacer, Switch } from '@nextui-org/react'
import { ArrowLeftCircle, ArrowRightCircle, Download } from 'react-feather'

type PropTypes = {
  episode?: IEpisode
  episodes: IAEpisode[]
} & React.HTMLAttributes<HTMLDivElement>

const Controller: React.FC<PropTypes> = ({ episode, episodes, className, ...props }) => {
  const router = useRouter()
  const params = useParams()
  const [isAutoplay, setIsAutoplay] = React.useState(false)

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

  React.useEffect(() => {
    setIsAutoplay(window.localStorage.getItem('autoplay') === 'true')
  }, [])

  return (
    <div className={cn(className, 'flex items-center justify-between px-3 py-1')} {...props}>
      <div className="flex">
        <Button isIconOnly variant="light" radius="full" isDisabled={!episode?.downloadUrl} onClick={handleDownload}>
          <Download size={18} />
        </Button>
        <Spacer x={3} />
        <Button isIconOnly variant="light" radius="full" isDisabled={!prevEpisode} onClick={handlePrev}>
          <ArrowLeftCircle size={18} />
        </Button>
        <Button isIconOnly variant="light" radius="full" isDisabled={!nextEpisode} onClick={handleNext}>
          <ArrowRightCircle size={18} />
        </Button>
      </div>
      <Switch size="sm" isSelected={isAutoplay} onValueChange={toggleAutoPlay}>
        Autoplay
      </Switch>
    </div>
  )
}

export default Controller
