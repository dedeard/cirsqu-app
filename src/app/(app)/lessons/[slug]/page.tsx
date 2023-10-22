import LessonCard from './components/LessonCard'
import LessonDetail from './components/LessonDetail'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import LessonEpisodes from './components/LessonEpisodes'

export default async function Page({ params }: { params: { slug: string } }) {
  const file = await unified()
    .use(remarkParse) // Parse markdown content to a syntax tree
    .use(remarkRehype) // Turn markdown syntax tree to HTML syntax tree, ignoring embedded HTML
    .use(rehypeStringify) // Serialize HTML syntax tree
    .process(`doc`)

  return (
    <>
      <LessonCard className="mb-16" />

      <LessonDetail className="my-16" description={String(file)} />

      <LessonEpisodes className="mb-5 mt-16" />
    </>
  )
}
