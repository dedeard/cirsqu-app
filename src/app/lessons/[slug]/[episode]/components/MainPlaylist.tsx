import { useCallback } from 'react'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from '@/components/contexts/ProgressBarContext'
import YouTubePlayer from './YoutubePlayer'
import Controller from './Controller'
import EpisodeList from './EpisodeList'

type PropTypes = {
  episodes: IAEpisode[]
  episode: IEpisode
  loading: boolean
  error: string
  premiumRequired: boolean
  authRequired: boolean
}

const MainPlaylist: React.FC<PropTypes> = ({ episodes, episode, loading, error, authRequired, premiumRequired }) => {
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()

  const onEnded = useCallback(() => {
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
          <div className="m-auto h-16 w-16 animate-spin rounded-full border-2 border-neutral-200 !border-t-blue-600 dark:border-neutral-800" />
        </div>
      )
    }

    if (authRequired) {
      return (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 p-3">
          <h3 className="text-3xl md:text-4xl">Authentication Required</h3>
          <p className="text-sm md:text-base">Please sign in to watch this episode.</p>
          <div>
            <Link href={`/sign-in?next=${pathname}`} className="hoverable-blue flex h-10 items-center rounded-lg px-6 text-sm">
              Sign In
            </Link>
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
            <Link href="/pro" className="hoverable-blue flex h-10 items-center rounded-lg px-6 text-sm">
              Discover Our Membership Plans
            </Link>
          </div>
        </div>
      )
    }

    if (error || !episode || !episode?.videoId) {
      return (
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-6 p-3">
          <h3 className="text-3xl md:text-4xl">Oops, something went wrong!</h3>
          <p className="text-sm md:text-base">{error ? error : 'The requested episode could not be found.'}</p>
          <div>
            <button
              type="button"
              className="hoverable-blue flex h-10 items-center rounded-lg px-6 text-sm"
              onClick={() => window.location.reload()}
            >
              Try reloading the page
            </button>
          </div>
        </div>
      )
    }

    return <YouTubePlayer episode={episode} onEnded={onEnded} />
  }

  return (
    <div className="border-b border-neutral-800 lg:flex">
      <div className="flex-1 border-b border-neutral-800  lg:border-b-0 lg:border-r">
        <div className="aspect-video w-full">{renderContent()}</div>
        <Controller className="border-t border-neutral-800" episode={episode} episodes={episodes} />
      </div>
      <div className="relative w-full lg:w-[500px]">
        <EpisodeList episodes={episodes} />
      </div>
    </div>
  )
}

export default MainPlaylist
