import { useEffect, useRef, useState } from 'react'
import '@fontsource-variable/unbounded'
import '@fontsource-variable/hanken-grotesk'
import './tour.css'
import Photo from '../components/Photo'
import { BIO, JOURNEY, LINKS, PHOTOS, PICKS_CHAT, PROJECTS, ROOMS, SOCIALS, STYLE_QUOTE } from '../content'

const CHAPTERS = [
  { id: 'hello', label: 'Hello', theme: 'dark' },
  ...ROOMS.map((r) => ({ id: r.id, label: r.name, theme: 'light' })),
  { id: 'journey', label: 'My AI journey', theme: 'dark' },
  { id: 'built', label: 'Things I’ve built', theme: 'light' },
  { id: 'picks', label: 'Sports picks chat', theme: 'dark' },
  { id: 'connect', label: 'Let’s connect', theme: 'dark' },
]

const QUICK_LINKS = [
  { label: 'Join SofarSeven AI on Discord', href: LINKS.discord },
  { label: 'Try the free SofarContent tools', href: LINKS.tools },
  { label: 'Read the free Claude guides', href: LINKS.guides },
  { label: 'See my photography', href: LINKS.photography },
  { label: 'Follow @sofar.cam', href: LINKS.instagram },
]

function reducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

// A sideways track (gallery wall, timeline) with previous/next buttons and a counter.
// Items can differ in width, so position comes from the items, not the track width.
function Track({ as, className, label, noun, count, footer, children }) {
  const List = as
  const ref = useRef(null)
  const [index, setIndex] = useState(0)

  function onScroll() {
    const el = ref.current
    if (!el || !el.children.length) return
    if (el.scrollLeft + el.clientWidth >= el.scrollWidth - 4) return setIndex(count - 1)
    const origin = el.children[0].offsetLeft
    let best = 0
    let bestDistance = Infinity
    Array.from(el.children).forEach((child, i) => {
      const distance = Math.abs(child.offsetLeft - origin - el.scrollLeft)
      if (distance < bestDistance) { best = i; bestDistance = distance }
    })
    setIndex(best)
  }

  function show(i) {
    const el = ref.current
    const target = el?.children[Math.max(0, Math.min(count - 1, i))]
    if (!target) return
    el.scrollTo({ left: target.offsetLeft - el.children[0].offsetLeft, behavior: reducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <>
      <List ref={ref} className={className} onScroll={onScroll} data-no-advance aria-label={label}>
        {children}
      </List>
      <div className="t-foot" data-no-advance>
        <div className="t-controls">
          <button type="button" className="t-round" onClick={() => show(index - 1)} disabled={index === 0} aria-label={`Previous ${noun}`}>‹</button>
          <span aria-live="polite">{index + 1} of {count}</span>
          <button type="button" className="t-round" onClick={() => show(index + 1)} disabled={index === count - 1} aria-label={`Next ${noun}`}>›</button>
        </div>
        {footer}
      </div>
    </>
  )
}

function Room({ room, onOpen }) {
  return (
    <>
      <div className="t-head">
        <h2 className="t-title t-title--room">{room.name}</h2>
        <p className="t-note">{room.note} Tap a photo to see it big.</p>
      </div>
      <Track
        as="ul"
        className="t-wall"
        label={`${room.name}, scroll sideways`}
        noun="photo"
        count={room.photos.length}
        footer={<a className="t-link" href={room.more.href}>{room.more.label}</a>}
      >
        {room.photos.map((slug, i) => {
          const p = PHOTOS[slug]
          return (
            <li key={slug} className={p.w > p.h ? 't-work t-work--wide' : 't-work'}>
              <button type="button" className="t-frame" onClick={() => onOpen(room.id, i)} aria-label={`See larger: ${p.title}`}>
                <Photo slug={slug} sizes={p.w > p.h ? '(min-width: 900px) 640px, 86vw' : '(min-width: 900px) 320px, 62vw'} />
              </button>
              <p className="t-label">
                <span className="t-label-title">{p.title}</span>
                {p.exif?.date && <span className="t-label-meta">{p.exif.date}</span>}
              </p>
            </li>
          )
        })}
      </Track>
    </>
  )
}

function Journey() {
  return (
    <>
      <div className="t-head">
        <h2 className="t-title">My AI journey</h2>
        <p className="t-note">From the sales floor to building AI agents.</p>
      </div>
      <Track
        as="ol"
        className="t-timeline"
        label="My AI journey, scroll sideways"
        noun="year"
        count={JOURNEY.length}
        footer={<a className="t-link" href={LINKS.linkedin}>The full story on LinkedIn</a>}
      >
        {JOURNEY.map((j) => (
          <li key={j.title} className="t-moment">
            <span className="t-year">{j.year}</span>
            <h3 className="t-moment-title">{j.title}</h3>
            <p>{j.text}</p>
          </li>
        ))}
      </Track>
    </>
  )
}

function Built() {
  return (
    <>
      <div className="t-head">
        <h2 className="t-title">Things I’ve built</h2>
        <p className="t-note">Agents, tools, and a few free things for anyone.</p>
      </div>
      <ul className="t-grid" data-no-advance>
        {PROJECTS.map((p) => (
          <li key={p.id}>
            {p.href ? (
              <a className="t-tile" href={p.href}>
                <span className="t-tile-name">{p.name}</span>
                <span className="t-tile-text">{p.text}</span>
                <span className="t-tile-cta">{p.cta}</span>
              </a>
            ) : (
              <div className="t-tile">
                <span className="t-tile-name">{p.name}</span>
                <span className="t-tile-text">{p.text}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
      <p className="t-foot t-foot--text" data-no-advance>
        Want something like this built for you? <a className="t-link" href={LINKS.upwork}>Hire me on Upwork</a>
      </p>
    </>
  )
}

function PicksButton({ className = 't-btn' }) {
  return PICKS_CHAT.href
    ? <a className={className} href={PICKS_CHAT.href}>Join the free chat</a>
    : <span className={`${className} t-btn--soon`}>Chat link coming soon</span>
}

function Lightbox({ open, onClose, onStep }) {
  const ref = useRef(null)
  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  const room = open && ROOMS.find((r) => r.id === open.room)
  const slug = room?.photos[open.index]
  const p = slug && PHOTOS[slug]

  return (
    <dialog ref={ref} className="t-lightbox" onClose={onClose} onClick={(e) => { if (e.target === ref.current) onClose() }} aria-label={p ? p.title : 'Photo'}>
      {p && (
        <div className="t-lightbox-inner">
          <Photo slug={slug} sizes="100vw" eager />
          <div className="t-lightbox-info">
            <div>
              <p className="t-label-title">{p.title}</p>
              {p.exif?.date && <p className="t-label-meta">{p.exif.date}</p>}
            </div>
            {p.exif && (
              <dl className="t-exif" aria-label="How I shot it">
                <dt>Camera</dt><dd>{p.exif.camera}</dd>
                <dt>Lens</dt><dd>{p.exif.focal}</dd>
                <dt>Aperture</dt><dd>{p.exif.aperture}</dd>
                <dt>Shutter</dt><dd>{p.exif.shutter} s</dd>
                <dt>ISO</dt><dd>{p.exif.iso}</dd>
              </dl>
            )}
          </div>
          <div className="t-lightbox-nav">
            <button type="button" className="t-round t-round--dark" onClick={() => onStep(-1)} disabled={open.index === 0} aria-label="Previous photo">‹</button>
            <button type="button" className="t-btn t-btn--outline" onClick={onClose}>Close</button>
            <button type="button" className="t-round t-round--dark" onClick={() => onStep(1)} disabled={open.index === room.photos.length - 1} aria-label="Next photo">›</button>
          </div>
        </div>
      )}
    </dialog>
  )
}

function SimplePage({ onTour }) {
  return (
    <main id="main" className="t-simple">
      <button type="button" className="t-btn t-btn--outline" onClick={onTour}>Back to the tour</button>
      <h1>Hey, I’m Cam Currence.</h1>
      <p>Photographer and AI engineer in Charlotte, NC. You might know me as Seven.</p>
      <h2>About me</h2>
      {BIO.map((b) => <p key={b}>{b}</p>)}
      <blockquote>{STYLE_QUOTE}</blockquote>
      <h2>Photography</h2>
      <p>See my work on <a href={LINKS.photography}>shotbyseven.com</a> and <a href={LINKS.photoInstagram}>@shotbyseven777</a>.</p>
      <h2>My AI journey</h2>
      <ol>{JOURNEY.map((j) => <li key={j.title}><strong>{j.year}, {j.title}.</strong> {j.text}</li>)}</ol>
      <h2>Things I’ve built</h2>
      <ul>
        {PROJECTS.map((p) => (
          <li key={p.id}>{p.href ? <a href={p.href}>{p.name}</a> : <strong>{p.name}</strong>}: {p.text}</li>
        ))}
      </ul>
      <h2>Sports picks chat</h2>
      <p>Free on {PICKS_CHAT.where}.</p>
      <ul>{PICKS_CHAT.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
      {PICKS_CHAT.href ? <p><a href={PICKS_CHAT.href}>Join the free chat</a></p> : <p>Chat link coming soon.</p>}
      <p className="t-simple-fine">{PICKS_CHAT.disclaimer}</p>
      <h2>Find me</h2>
      <ul>
        {SOCIALS.map((s) => <li key={s.href}><a href={s.href}>{s.name}</a> ({s.handle})</li>)}
        <li><a href={LINKS.upwork}>Hire me on Upwork</a></li>
        <li><a href={`mailto:${LINKS.email}`}>{LINKS.email}</a></li>
      </ul>
    </main>
  )
}

export default function Tour() {
  const [active, setActive] = useState(0)
  const [topTheme, setTopTheme] = useState('dark')
  const [simple, setSimple] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const sections = useRef([])
  const menuRef = useRef(null)

  useEffect(() => {
    if (simple) return
    // The chapter crossing the middle of the screen is the one you're on;
    // the one under the header decides whether the header is light or dark.
    const middle = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(Number(e.target.dataset.index))
    }, { rootMargin: '-45% 0px -50% 0px' })
    const top = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setTopTheme(e.target.dataset.theme)
    }, { rootMargin: '0px 0px -93% 0px' })
    sections.current.forEach((el) => { if (el) { middle.observe(el); top.observe(el) } })
    return () => { middle.disconnect(); top.disconnect() }
  }, [simple])

  useEffect(() => {
    const d = menuRef.current
    if (!d) return
    if (menuOpen && !d.open) d.showModal()
    if (!menuOpen && d.open) d.close()
  }, [menuOpen])

  function go(i) {
    const el = sections.current[Math.max(0, Math.min(CHAPTERS.length - 1, i))]
    el?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
  }

  function toggleSimple() {
    setMenuOpen(false)
    setSimple((v) => !v)
    setActive(0)
    setTopTheme('dark')
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  // Like Stories: tapping an empty part of a chapter moves to the next one
  function advanceFrom(i) {
    return (e) => {
      if (e.target.closest('a, button, input, label, dialog, [data-no-advance]')) return
      if (i < CHAPTERS.length - 1) go(i + 1)
    }
  }

  function stepLightbox(delta) {
    setLightbox((lb) => {
      const room = ROOMS.find((r) => r.id === lb.room)
      return { ...lb, index: Math.max(0, Math.min(room.photos.length - 1, lb.index + delta)) }
    })
  }

  const sectionProps = (i) => ({
    ref: (el) => { sections.current[i] = el },
    'data-index': i,
    'data-theme': CHAPTERS[i].theme,
    'aria-label': CHAPTERS[i].label,
    onClick: advanceFrom(i),
  })

  const roomOffset = 1
  const journeyIndex = roomOffset + ROOMS.length
  const classes = ['t', simple && 't--simple', !simple && topTheme === 'light' && 't--light-top', !simple && active === CHAPTERS.length - 1 && 't--end']

  return (
    <div className={classes.filter(Boolean).join(' ')}>
      <a className="t-skip" href="#main">Skip to content</a>
      <header className="t-top">
        {!simple && (
          <ol className="t-progress" aria-label="Tour progress">
            {CHAPTERS.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  className={i <= active ? 'is-seen' : undefined}
                  aria-current={i === active ? 'step' : undefined}
                  aria-label={`Go to ${c.label}`}
                  onClick={() => go(i)}
                />
              </li>
            ))}
          </ol>
        )}
        <div className="t-bar">
          <span className="t-avatar"><Photo slug="cam" sizes="40px" alt="" eager /></span>
          <span className="t-who">
            <span className="t-name">Cam Currence</span>
            <span className="t-where">{simple ? 'Everything on one page' : CHAPTERS[active].label}</span>
          </span>
          <button type="button" className="t-menu-btn" onClick={() => setMenuOpen(true)} aria-haspopup="dialog">Menu</button>
        </div>
      </header>

      {simple ? (
        <SimplePage onTour={toggleSimple} />
      ) : (
        <main id="main">
          <section {...sectionProps(0)} className="t-ch t-ch--photo t-ch--hello">
            <Photo slug="cam" sizes="(min-width: 900px) 50vw, 100vw" eager fetchPriority="high" className="t-bg t-bg--cam" />
            <div className="t-scrim" />
            <div className="t-copy">
              <h1 className="t-title t-title--hero">Hey, I’m Cam Currence.</h1>
              <p className="t-text">Photographer and AI engineer in Charlotte, NC. You might know me as Seven.</p>
              <div className="t-actions">
                <button type="button" className="t-btn" onClick={() => go(1)}>Take the tour</button>
                <button type="button" className="t-btn t-btn--ghost" onClick={() => setMenuOpen(true)}>See all links</button>
              </div>
              <p className="t-hint">Tap anywhere or scroll to keep going.</p>
            </div>
          </section>

          {ROOMS.map((room, r) => (
            <section key={room.id} {...sectionProps(roomOffset + r)} className="t-ch t-ch--light">
              <Room room={room} onOpen={(roomId, index) => setLightbox({ room: roomId, index })} />
            </section>
          ))}

          <section {...sectionProps(journeyIndex)} className="t-ch t-ch--dark">
            <Journey />
          </section>

          <section {...sectionProps(journeyIndex + 1)} className="t-ch t-ch--light">
            <Built />
          </section>

          <section {...sectionProps(journeyIndex + 2)} className="t-ch t-ch--photo">
            <Photo slug="athlete" sizes="100vw" className="t-bg" />
            <div className="t-scrim t-scrim--full" />
            <div className="t-copy">
              <h2 className="t-title">My sports picks chat</h2>
              <p className="t-text">Free on {PICKS_CHAT.where}. Come for the picks, stay for the conversation.</p>
              <ul className="t-points">
                {PICKS_CHAT.points.map((pt) => <li key={pt}>{pt}</li>)}
              </ul>
              <div className="t-actions"><PicksButton /></div>
              <p className="t-fine">{PICKS_CHAT.disclaimer}</p>
            </div>
          </section>

          <section {...sectionProps(journeyIndex + 3)} className="t-ch t-ch--cobalt">
            <div className="t-copy t-copy--flow">
              <h2 className="t-title">Let’s connect.</h2>
              <p className="t-text">Say hi, follow along, or bring me in on a project.</p>
              <div className="t-actions t-actions--stack">
                <a className="t-btn t-btn--white" href={LINKS.upwork}>Hire me on Upwork</a>
                <a className="t-btn t-btn--ghost" href={`mailto:${LINKS.email}`}>Email me</a>
              </div>
              <ul className="t-socials">
                {SOCIALS.map((s) => (
                  <li key={s.href}><a href={s.href}>{s.name}<span>{s.handle}</span></a></li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      )}

      <dialog
        ref={menuRef}
        className="t-menu"
        onClose={() => setMenuOpen(false)}
        onClick={(e) => { if (e.target === menuRef.current) setMenuOpen(false) }}
        aria-labelledby="t-menu-title"
      >
        <div className="t-menu-inner">
          <div className="t-menu-head">
            <h2 id="t-menu-title" className="t-menu-title">Jump to a chapter</h2>
            <button type="button" className="t-btn t-btn--outline t-btn--small" onClick={() => setMenuOpen(false)}>Close</button>
          </div>
          {!simple && (
            <ol className="t-menu-chapters">
              {CHAPTERS.map((c, i) => (
                <li key={c.id}>
                  <button type="button" onClick={() => { setMenuOpen(false); go(i) }}>
                    <span className="t-menu-num">{i + 1}</span>{c.label}
                  </button>
                </li>
              ))}
            </ol>
          )}
          <h2 className="t-menu-title t-menu-title--links">Quick links</h2>
          <ul className="t-menu-links">
            {PICKS_CHAT.href && <li><a href={PICKS_CHAT.href}>Join the sports picks chat</a></li>}
            {QUICK_LINKS.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
          </ul>
          <button type="button" className="t-btn t-btn--wide" onClick={toggleSimple}>
            {simple ? 'Back to the tour' : 'Read it as a simple page'}
          </button>
        </div>
      </dialog>

      <Lightbox open={lightbox} onClose={() => setLightbox(null)} onStep={stepLightbox} />
    </div>
  )
}
