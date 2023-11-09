import React from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Button, Spinner } from '@nextui-org/react'
import Link from 'next/link'
import YouTubePlayer from './YoutubePlayer'
import Controller from './Controller'
import EpisodeList from './EpisodeList'

type PropTypes = {
  episodes: IAEpisode[]
  episode?: IEpisode
  loading: boolean
  error: string
  premiumRequired: boolean
  authRequired: boolean
}

const MainPlaylist: React.FC<PropTypes> = ({ episodes, episode, loading, error, authRequired, premiumRequired }) => {
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()

  const onEnded = React.useCallback(() => {
    if (window.localStorage.getItem('autoplay') === 'true') {
      const index = episodes.findIndex((el) => el.episodeId === params.episode)
      const next = episodes[index + 1]
      if (next) {
        router.push(`/lessons/${params.slug}/${next.episodeId}`)
      }
    }
  }, [episodes, params.episode, params.slug, router])

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner size="lg" />
        </div>
      )
    }

    if (authRequired) {
      return (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 p-3">
          <h3 className="text-3xl md:text-4xl">Authentication Required</h3>
          <p className="text-sm md:text-base">Please sign in to watch this episode.</p>
          <div>
            <Button color="primary" className="w-32" as={Link} href={`/sign-in?next=${pathname}`}>
              Sign In
            </Button>
          </div>
        </div>
      )
    }

    if (premiumRequired) {
      return (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 p-3">
          <h3 className="text-3xl md:text-4xl">Unlock Premium Content</h3>
          <p className="text-sm md:text-base">Join our premium membership to access this exclusive episode and more!</p>
          <div>
            <Button color="primary" as={Link} href="/pro">
              Discover Our Membership Plans
            </Button>
          </div>
        </div>
      )
    }

    if (error || !episode || !episode?.videoId) {
      return (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 p-3">
          <h3 className="text-3xl md:text-4xl">Oops, something went wrong!</h3>
          <p className="text-sm md:text-base">{error ? `Error: ${error}` : 'The requested episode could not be found.'}</p>
          <div>
            <Button color="primary" onClick={() => window.location.reload()}>
              Try reloading the page
            </Button>
          </div>
        </div>
      )
    }

    return <YouTubePlayer episode={episode} onEnded={onEnded} />
  }

  return (
    <div className="border-divider border-b lg:flex">
      <div className="border-divider flex-1 border-b  lg:border-b-0 lg:border-r">
        <div className="aspect-video w-full">{renderContent()}</div>
        <Controller className="border-divider border-t" episode={episode} episodes={episodes} />
      </div>
      <div className="relative w-full lg:w-[500px]">
        <EpisodeList episodes={episodes} />
      </div>
    </div>
  )
}

export default MainPlaylist
