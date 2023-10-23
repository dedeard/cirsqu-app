import LessonCard from './components/LessonCard'
import LessonDetail from './components/LessonDetail'
import LessonEpisodes from './components/LessonEpisodes'
import { lessonIndex } from '@/utils/algolia'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { slug: string } }) {
  let lesson: IALesson
  try {
    lesson = await lessonIndex.getObject<IALesson>(params.slug)
  } catch (error: any) {
    return notFound()
  }

  const episodes = lesson.episodes.sort((a, b) => a.index - b.index)

  return (
    <>
      <LessonCard className="mb-16" lesson={lesson} />
      <LessonDetail className="my-16" description={lesson.description} />
      <LessonEpisodes className="mb-5 mt-16" episodes={episodes} />
    </>
  )
}
