import { useEffect, useRef, useState } from 'react'
import '@fontsource/libre-caslon-display'
import '@fontsource-variable/public-sans'
import './gallery.css'
import Photo from '../components/Photo'
import { BIO, LINKS, PHOTOS, PROJECTS, SESSIONS, SOCIALS, STEPS, STYLE_QUOTE } from '../content'

const WALLS = [
  { id: 'portraits', name: 'Portraits', note: 'People on a good day, as themselves.', photos: ['redhair', 'bookshelf', 'flowers', 'bw-couch', 'purple'] },
  { id: 'bigdays', name: 'Big days', note: 'Proposals, engagements, graduations, and babies on the way.', photos: ['proposal', 'ring', 'couple-gold', 'grad', 'maternity'] },
  { id: 'color', name: 'Color', note: 'Studio sets and backdrops that go all the way.', photos: ['velvet', 'blue-bday', 'car-red'] },
  { id: 'outside', name: 'Out in the world', note: 'Streets, cars, and the quiet moments in between.', photos: ['wall', 'arch', 'bw-men', 'camaro'] },
]

const ROOMS = [
  ...WALLS.map(({ id, name }) => ({ id, name })),
  { id: 'artist', name: 'The photographer' },
  { id: 'made', name: 'Also by Cam' },
  { id: 'visit', name: 'Book a session' },
]

function HowIShotIt({ exif }) {
  return (
    <details className="gw-how">
      <summary>How I shot it</summary>
      <dl>
        <dt>Camera</dt><dd>{exif.camera}</dd>
        <dt>Focal length</dt><dd>{exif.focal}</dd>
        <dt>Aperture</dt><dd>{exif.aperture}</dd>
        <dt>Shutter</dt><dd>{exif.shutter} s</dd>
        <dt>ISO</dt><dd>{exif.iso}</dd>
      </dl>
    </details>
  )
}

function Work({ slug, onOpen }) {
  const p = PHOTOS[slug]
  const landscape = p.w > p.h
  return (
    <figure className={landscape ? 'gw-work gw-work--wide' : 'gw-work'}>
      <button type="button" className="gw-frame" onClick={() => onOpen(slug)} aria-label={`See larger: ${p.title}`}>
        <Photo slug={slug} sizes={landscape ? '(min-width: 900px) 560px, 86vw' : '(min-width: 900px) 360px, 70vw'} />
      </button>
      <figcaption className="gw-label">
        <span className="gw-label-title">{p.title}</span>
        {p.exif?.date && <span className="gw-label-meta">{p.exif.date}</span>}
        {p.exif && <HowIShotIt exif={p.exif} />}
      </figcaption>
    </figure>
  )
}

function RoomHeading({ index, name, note }) {
  return (
    <div className="gw-room-head">
      <p className="gw-room-num">Room {index + 1} of {ROOMS.length}</p>
      <h2 className="gw-room-name">{name}</h2>
      {note && <p className="gw-room-note">{note}</p>}
    </div>
  )
}

export default function GalleryWalk() {
  const [current, setCurrent] = useState(null)
  const [open, setOpen] = useState(null)
  const dialogRef = useRef(null)
  const roomRefs = useRef({})

  useEffect(() => {
    document.title = 'Cam Currence: a gallery walk'
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.id.replace('room-', ''))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    Object.values(roomRefs.current).forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  const refFor = (id) => (el) => { roomRefs.current[id] = el }
  const roomIndex = ROOMS.findIndex((r) => r.id === current)
  const openPhoto = open ? PHOTOS[open] : null

  return (
    <div className="gw">
      <div className="gw-bar">
        <a className="gw-bar-name" href="#top">Cam Currence</a>
        <details className="gw-plan">
          <summary>{roomIndex >= 0 ? `Room ${roomIndex + 1}: ${ROOMS[roomIndex].name}` : 'Floor plan'}</summary>
          <ol>
            {ROOMS.map((r, i) => (
              <li key={r.id}>
                <a href={`#room-${r.id}`} onClick={(e) => e.currentTarget.closest('details')?.removeAttribute('open')}>
                  <span>{i + 1}</span> {r.name}
                </a>
              </li>
            ))}
          </ol>
        </details>
        <a className="gw-bar-book" href={LINKS.book}><span className="gw-dot" aria-hidden="true" />Book</a>
      </div>

      <header id="top" className="gw-entrance">
        <h1 className="gw-title">Cam Currence</h1>
        <p className="gw-subtitle">Portraits and big days in Charlotte, North Carolina</p>
        <div className="gw-entrance-grid">
          <figure className="gw-poster">
            <Photo slug="cam" eager sizes="(min-width: 900px) 420px, 88vw" />
            <figcaption>The photographer, January 2025</figcaption>
          </figure>
          <div className="gw-intro">
            <p>Welcome in. This is a small show of my recent work.</p>
            <p>Take your time. Swipe along each wall, tap any photo to see it bigger, and look for “How I shot it” if you’re curious about the camera settings.</p>
            <div className="gw-actions">
              <a className="gw-btn" href="#room-portraits">Start the walk</a>
              <a className="gw-btn gw-btn--quiet" href={LINKS.book}><span className="gw-dot" aria-hidden="true" />Book a session</a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {WALLS.map((w, i) => (
          <section key={w.id} id={`room-${w.id}`} ref={refFor(w.id)} className="gw-room" aria-label={`Room ${i + 1}: ${w.name}`}>
            <RoomHeading index={i} name={w.name} note={w.note} />
            <div className="gw-wall" tabIndex={0} aria-label={`${w.name} wall, scroll sideways`}>
              {w.photos.map((slug) => <Work key={slug} slug={slug} onOpen={setOpen} />)}
            </div>
            <p className="gw-walk-hint" aria-hidden="true">Swipe along the wall</p>
          </section>
        ))}

        <section id="room-artist" ref={refFor('artist')} className="gw-room" aria-label="Room 5: The photographer">
          <RoomHeading index={4} name="The photographer" />
          <div className="gw-statement">
            {BIO.map((p) => <p key={p}>{p}</p>)}
            <blockquote>
              <p>“{STYLE_QUOTE}”</p>
            </blockquote>
          </div>
        </section>

        <section id="room-made" ref={refFor('made')} className="gw-room" aria-label="Room 6: Also by Cam">
          <RoomHeading index={5} name="Also by Cam" note="Things I make when I’m not behind the camera." />
          <div className="gw-placards">
            {PROJECTS.filter((p) => p.id !== 'studio').map((p) => (
              <a key={p.id} className="gw-placard" href={p.href}>
                <span className="gw-placard-name">{p.name}</span>
                <span className="gw-placard-text">{p.text}</span>
                <span className="gw-placard-go">Visit</span>
              </a>
            ))}
          </div>
        </section>

        <section id="room-visit" ref={refFor('visit')} className="gw-room gw-room--visit" aria-label="Room 7: Book a session">
          <RoomHeading index={6} name="Book a session" note="A red dot in a gallery means a piece is spoken for. Here it means the next one could be yours." />
          <ul className="gw-prices">
            {SESSIONS.map((s) => (
              <li key={s.id}>
                <span className="gw-price-name">{s.name}<small>{s.detail}</small></span>
                <span className="gw-price">{s.price}</span>
              </li>
            ))}
          </ul>
          <ol className="gw-steps">
            {STEPS.map((s) => <li key={s.title}><strong>{s.title}.</strong> {s.text}</li>)}
          </ol>
          <a className="gw-btn gw-btn--big" href={LINKS.book}><span className="gw-dot" aria-hidden="true" />Book a session</a>
          <ul className="gw-contacts">
            <li><a href={LINKS.upwork}>Hire me on Upwork</a></li>
            <li><a href={`mailto:${LINKS.email}`}>{LINKS.email}</a></li>
            {SOCIALS.map((s) => <li key={s.href}><a href={s.href}>{s.name}, {s.handle}</a></li>)}
          </ul>
        </section>
      </main>

      <footer className="gw-exit">
        <p>Thanks for walking through.</p>
        <a href="/">See the other drafts</a>
      </footer>

      <dialog
        ref={dialogRef}
        className="gw-lightbox"
        onClose={() => setOpen(null)}
        onClick={(e) => { if (e.target === dialogRef.current) setOpen(null) }}
        aria-label={openPhoto ? openPhoto.title : 'Photo'}
      >
        {openPhoto && (
          <div className="gw-lightbox-inner">
            <Photo slug={open} sizes="100vw" eager />
            <div className="gw-lightbox-label">
              <span className="gw-label-title">{openPhoto.title}</span>
              <button type="button" className="gw-close" onClick={() => setOpen(null)}>Close</button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  )
}
