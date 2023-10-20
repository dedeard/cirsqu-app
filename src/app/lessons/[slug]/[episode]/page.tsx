import TitleBar from './components/TitleBar'
import Main from './components/Main'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'

const doc = `
Volt is a functional API for Livewire that allows you to build Livewire components in a single file, alongside Blade templates. Pairing this with automatic route creation using Laravel Folio gives us a serious productivity boost.

So, let’s build a URL shortener while learning how Volt and Folio work!
`

export default async function Page({ params }: { params: { episode: string } }) {
  const file = await unified()
    .use(remarkParse) // Parse markdown content to a syntax tree
    .use(remarkRehype) // Turn markdown syntax tree to HTML syntax tree, ignoring embedded HTML
    .use(rehypeStringify) // Serialize HTML syntax tree
    .process(doc)
  return (
    <>
      <TitleBar title="Lorem ipsum" slug="slug" />
      <Main episode={params.episode} about={String(file)} />
    </>
  )
}
