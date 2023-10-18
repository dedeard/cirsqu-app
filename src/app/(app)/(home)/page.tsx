import Jumbotron from './components/Jumbotron'
import Latest from './components/Latest'
import Subjects from './components/Subjects'

export const dynamic = 'force-static'

export default function Home() {
  return (
    <>
      <Jumbotron className="mb-10" />
      <Latest className="my-10" />
      <Subjects className="my-10" />
    </>
  )
}
