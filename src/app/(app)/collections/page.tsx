import type { Metadata } from 'next'
import Main from './components/Main'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Collections - CIRSQU',
  description:
    'Dive into CIRSQU’s curated collections of coding lessons! Explore a rich library of screencasts, tailored to empower developers at all experience levels. Begin your coding adventure with us today!',
}

export default function CollectionsPage() {
  return (
    <div className="py-3">
      <Main />
    </div>
  )
}
