import Photo from './components/Photo'

const OPTIONS = [
  {
    href: '/a',
    name: 'A. Say hi',
    photo: 'cam',
    text: 'Opens with a welcome and asks what brought you here: photos, content, AI, or just saying hi. Each answer lays out its own short path.',
  },
  {
    href: '/b',
    name: 'B. The tour',
    photo: 'arch',
    text: 'Full-screen chapters that tap and scroll like Instagram Stories, with a progress bar up top and a plain list view for anyone who prefers it.',
  },
  {
    href: '/c',
    name: 'C. The gallery walk',
    photo: 'velvet',
    text: 'A small exhibition of your work. Swipe along each wall, tap a photo to see it big, and open “How I shot it” for the real camera settings.',
  },
]

export default function Chooser() {
  return (
    <main className="chooser">
      <h1>Bio page drafts</h1>
      <p className="chooser-lede">Three directions for sofarcam-hub. Open each one on your phone and pick the one that feels like you.</p>
      <ul>
        {OPTIONS.map((o) => (
          <li key={o.href}>
            <a href={o.href} className="chooser-card">
              <Photo slug={o.photo} sizes="120px" alt="" />
              <span>
                <strong>{o.name}</strong>
                <span>{o.text}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
