import { lazy, Suspense } from 'react'
import Chooser from './Chooser'

// Each draft is its own chunk, so it only loads its own fonts and styles.
const DRAFTS = {
  '/a': lazy(() => import('./options/SayHi')),
  '/b': lazy(() => import('./options/Chapters')),
  '/c': lazy(() => import('./options/GalleryWalk')),
}

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  const Draft = DRAFTS[path]
  if (!Draft) return <Chooser />
  return (
    <Suspense fallback={null}>
      <Draft />
    </Suspense>
  )
}
