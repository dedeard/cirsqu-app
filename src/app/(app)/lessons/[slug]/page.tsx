import type { Metadata } from 'next'
import LessonCard from './components/LessonCard'
import LessonDetail from './components/LessonDetail'
import LessonEpisodes from './components/LessonEpisodes'
import { notFound } from 'next/navigation'
import mdToDescription from '@/utils/transforms/md-to-description'
import getObject from '@/utils/algolia/getObject'

type PropTypes = { params: { slug: string } }

export const runtime = 'edge'

async function getPageData(props: PropTypes) {
  let lesson: IALesson
  try {
    lesson = await getObject<IALesson>({
      index: 'lessons',
      objectID: props.params.slug,
      next: { revalidate: 3600, tags: [`lesson-${props.params.slug}`] },
    })
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
    description: mdToDescription(lesson.description),
    openGraph: {
      images: `/images/dynamic-og?title=${lesson.title}`,
      title: lesson.title,
      description: mdToDescription(lesson.description),
      url: `/lessons/${lesson.slug}`,
    },
    alternates: {
      canonical: `/lessons/${lesson.slug}`,
    },
  }
}

export default async function LessonPage(props: PropTypes) {
  const { lesson, episodes } = await getPageData(props)

  return (
    <div className="py-3">
      <LessonCard className="mb-16" lesson={lesson} />
      <LessonDetail className="my-16" description={lesson.description} />
      <LessonEpisodes className="mb-5 mt-16" episodes={episodes} />
    </div>
  )
}
