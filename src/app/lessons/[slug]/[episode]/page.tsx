import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import markdownToDescription from '@/utils/markdown-to-description'
import getObject from '@/utils/algolia/getObject'
import Main from './components/Main'
import serverFetch from '@/utils/server-fetch'

type PropTypes = {
  params: {
    slug: string
    episode: string
  }
}

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

  return { lesson: lessonData, episodes, currentEpisode: episode }
}

export async function generateMetadata(pageProps: PropTypes): Promise<Metadata> {
  const { lesson, currentEpisode } = await getPageData(pageProps)
  return {
    title: `${currentEpisode.title} - ${lesson.title}`,
    description: markdownToDescription(lesson.description),
    openGraph: {
      images: `/images/dynamic-og?title=${currentEpisode.title}`,
      title: `${currentEpisode.title} - ${lesson.title}`,
      description: markdownToDescription(lesson.description),
    },
    alternates: {
      canonical: `/lessons/${lesson.slug}/${currentEpisode.episodeId}`,
    },
    robots: 'noindex',
  }
}

export default async function Page(props: PropTypes) {
  const data = await getPageData(props)

  return <Main {...data} />
}
