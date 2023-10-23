import Main from './components/Main'
import { lessonIndex } from '@/utils/algolia'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { slug: string; episode: string } }) {
  let lesson: IALesson
  try {
    lesson = await lessonIndex.getObject<IALesson>(params.slug)
  } catch (error: any) {
    return notFound()
  }

  const episodes = lesson.episodes.sort((a, b) => a.index - b.index)
  const currentEpisode = episodes.find((el) => el.episodeId === params.episode)

  if (!currentEpisode) return notFound()

  const lessonData = {
    title: lesson.title,
    slug: lesson.slug,
    subjects: lesson.subjects,
  } as IALesson

  return (
    <>
      <Main lesson={lessonData} currentEpisode={currentEpisode} episodes={episodes} />
    </>
  )
}
