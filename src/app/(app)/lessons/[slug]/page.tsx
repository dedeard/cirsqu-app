import LessonCard from './components/LessonCard'
import LessonDetail from './components/LessonDetail'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import LessonEpisodes from './components/LessonEpisodes'

const doc = `
Volt is a functional API for Livewire that allows you to build Livewire components in a single file, alongside Blade templates. Pairing this with automatic route creation using Laravel Folio gives us a serious productivity boost.

So, let’s build a URL shortener while learning how Volt and Folio work!
`
export default async function Page() {
  const file = await unified()
    .use(remarkParse) // Parse markdown content to a syntax tree
    .use(remarkRehype) // Turn markdown syntax tree to HTML syntax tree, ignoring embedded HTML
    .use(rehypeStringify) // Serialize HTML syntax tree
    .process(doc)

  return (
    <>
      <LessonCard className="mb-16" />

      <LessonDetail className="my-16" description={String(file)} />

      <LessonEpisodes className="mb-5 mt-16" />
    </>
  )
}
