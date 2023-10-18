import Jumbotron from './components/Jumbotron'
import Latest from './components/Latest'
import Subjects from './components/Subjects'

export const dynamic = 'force-static'

export default function Home() {
  return (
    <>
      <Jumbotron className="mb-20" />
      <Latest className="my-20" />
      <Subjects className="my-20" />
    </>
  )
}
