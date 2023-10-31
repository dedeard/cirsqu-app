import type { Metadata } from 'next'
import LessonCard from './components/LessonCard'
import LessonDetail from './components/LessonDetail'
import LessonEpisodes from './components/LessonEpisodes'
import { lessonIndex } from '@/utils/algolia'
import { notFound } from 'next/navigation'
import markdownToDescription from '@/utils/markdown-to-description'

type PropTypes = { params: { slug: string } }

async function getPageData(props: PropTypes) {
  let lesson: IALesson
  try {
    lesson = await lessonIndex.getObject<IALesson>(props.params.slug)
  } catch (error: any) {
    return notFound()
  }

  const episodes = lesson.episodes.sort((a, b) => a.index - b.index)

  return {
    lesson,
    episodes,
  }
}

export async function generateMetadata(pageProps: PropTypes): Promise<Metadata> {
  const { lesson } = await getPageData(pageProps)
  return {
    title: lesson.title,
    description: markdownToDescription(lesson.description),
  }
}

export default async function LessonPage(props: PropTypes) {
  const { lesson, episodes } = await getPageData(props)

  return (
    <>
      <LessonCard className="mb-16" lesson={lesson} />
      <LessonDetail className="my-16" description={lesson.description} />
      <LessonEpisodes className="mb-5 mt-16" episodes={episodes} />
    </>
  )
}
