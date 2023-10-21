import Jumbotron from './components/Jumbotron'
import Latest from './components/Latest'
import PremiumBanner from './components/PremiumBanner'
import Subjects from './components/Subjects'

export const dynamic = 'force-static'

export default async function Home() {
  return (
    <>
      <Jumbotron className="mb-20" />
      <Latest className="my-20" />
      <Subjects className="my-20" />
      <PremiumBanner className="mt-20" />
    </>
  )
}
