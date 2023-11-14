import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import markdownToDescription from '@/utils/markdown-to-description'
import getObject from '@/utils/algolia/getObject'
import serverFetch from '@/utils/server-fetch'
import TitleBar from './components/TitleBar'
import MainPlaylist from './components/MainPlaylist'
import EpisodeDetail from './components/EpisodeDetail'
import Comments from './components/Comments'

type PropTypes = {
  params: {
    slug: string
    episode: string
  }
}

export const revalidate = 3600

async function getPageData({ params }: PropTypes) {
  let lesson: IALesson
  try {
    lesson = await getObject<IALesson>({ index: 'lessons', objectID: params.slug })
  } catch (error: any) {
    return notFound()
  }

  const episodes = lesson.episodes.sort((a, b) => a.index - b.index)
  const currentEpisode = episodes.find((el) => el.episodeId === params.episode)

  if (!currentEpisode) return notFound()

  const episodeResponse = await serverFetch(`episodes/${currentEpisode.episodeId}`)

  if (!episodeResponse.ok) return notFound()

  const episode = await episodeResponse.json<IEpisode>()

  const lessonData = {
    title: lesson.title,
    slug: lesson.slug,
    subjects: lesson.subjects,
    description: lesson.description,
  } as IALesson

  return { lesson: lessonData, episodes, episode }
}

export async function generateMetadata(pageProps: PropTypes): Promise<Metadata> {
  const { lesson, episode } = await getPageData(pageProps)
  return {
    title: `${episode.title} - ${lesson.title}`,
    description: markdownToDescription(episode.description),
    openGraph: {
      images: `/images/dynamic-og?title=${episode.title}`,
      title: `${episode.title} - ${lesson.title}`,
      description: markdownToDescription(episode.description),
    },
    alternates: {
      canonical: `/lessons/${lesson.slug}/${episode.episodeId}`,
    },
  }
}

export default async function Page(props: PropTypes) {
  const { lesson, episode, episodes } = await getPageData(props)
  return (
    <>
      <TitleBar title={lesson.title} slug={lesson.slug} />

      <MainPlaylist episodes={episodes} episode={episode} />

      <EpisodeDetail lesson={lesson} episode={episode} />

      <Comments episodeId={episode.episodeId} />
    </>
  )
}
