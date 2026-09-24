import { useCallback, useEffect, useRef, useState } from 'react'
import '@fontsource-variable/unbounded'
import '@fontsource-variable/hanken-grotesk'
import './chapters.css'
import Photo from '../components/Photo'
import { BIO, LINKS, PHOTOS, PROJECTS, SESSIONS, SOCIALS, STEPS, STYLE_QUOTE } from '../content'

const CHAPTERS = [
  { id: 'hello', label: 'Hello' },
  { id: 'eight', label: 'Eight years in' },
  { id: 'portraits', label: 'Portraits' },
  { id: 'bigdays', label: 'Big days' },
  { id: 'session', label: 'A session with me' },
  { id: 'built', label: 'Things I built' },
  { id: 'book', label: 'Your turn' },
]

const PORTRAITS = ['redhair', 'flowers', 'purple', 'brown-suit']
const BUILT = PROJECTS.filter((p) => p.id !== 'studio')

function reducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

function PortraitCarousel() {
  const ref = useRef(null)
  const [index, setIndex] = useState(0)

  // One slide fills a phone; wider screens show several, so measure a slide rather than the strip
  const slideWidth = (el) => el.querySelector('.ch-slide')?.offsetWidth || el.clientWidth

  function onScroll() {
    const el = ref.current
    if (el) setIndex(Math.min(PORTRAITS.length - 1, Math.round(el.scrollLeft / slideWidth(el))))
  }
  function show(i) {
    const el = ref.current
    if (!el) return
    const next = Math.max(0, Math.min(PORTRAITS.length - 1, i))
    el.scrollTo({ left: next * slideWidth(el), behavior: reducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <>
      <div ref={ref} className="ch-carousel" onScroll={onScroll} aria-label="Portraits, swipe sideways">
        {PORTRAITS.map((slug) => (
          <figure key={slug} className="ch-slide">
            <Photo slug={slug} sizes="100vw" />
          </figure>
        ))}
      </div>
      <div className="ch-carousel-bar" data-no-advance>
        <span className="ch-carousel-caption">{PHOTOS[PORTRAITS[index]].title}</span>
        <div className="ch-carousel-controls">
          <button type="button" className="ch-round" onClick={() => show(index - 1)} disabled={index === 0} aria-label="Previous photo">‹</button>
          <span aria-live="polite">{index + 1} of {PORTRAITS.length}</span>
          <button type="button" className="ch-round" onClick={() => show(index + 1)} disabled={index === PORTRAITS.length - 1} aria-label="Next photo">›</button>
        </div>
      </div>
    </>
  )
}

// The same story as a plain page, for anyone who'd rather just read
function ListView({ onTour }) {
  return (
    <main className="ch-list">
      <button type="button" className="ch-btn ch-btn--ghost-dark" onClick={onTour}>Back to the tour</button>
      <h1 className="ch-list-title">Hey, I’m Cam.</h1>
      <p>Portrait photographer in Charlotte, NC. You might know me as Seven.</p>
      <a className="ch-btn" href={LINKS.book}>Book a session</a>
      <h2>About me</h2>
      {BIO.map((p) => <p key={p}>{p}</p>)}
      <blockquote>{STYLE_QUOTE}</blockquote>
      <h2>How a session goes</h2>
      <ol>{STEPS.map((s) => <li key={s.title}><strong>{s.title}.</strong> {s.text}</li>)}</ol>
      <h2>Sessions</h2>
      <ul>{SESSIONS.map((s) => <li key={s.id}>{s.name}, {s.price}</li>)}</ul>
      <h2>Things I built</h2>
      <ul>{BUILT.map((p) => <li key={p.id}><a href={p.href}>{p.name}</a>: {p.text}</li>)}</ul>
      <h2>Find me</h2>
      <ul>
        {SOCIALS.map((s) => <li key={s.href}><a href={s.href}>{s.name}</a> ({s.handle})</li>)}
        <li><a href={LINKS.upwork}>Hire me on Upwork</a></li>
        <li><a href={`mailto:${LINKS.email}`}>{LINKS.email}</a></li>
      </ul>
    </main>
  )
}

export default function Chapters() {
  const [active, setActive] = useState(0)
  const [listView, setListView] = useState(false)
  const sections = useRef([])

  useEffect(() => {
    document.title = 'Cam Currence: the tour'
  }, [])

  useEffect(() => {
    if (listView) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number(e.target.dataset.index))
      },
      { threshold: 0.55 },
    )
    sections.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [listView])

  const go = useCallback((i) => {
    const el = sections.current[Math.max(0, Math.min(CHAPTERS.length - 1, i))]
    el?.scrollIntoView({ behavior: reducedMotion() ? 'auto' : 'smooth', block: 'start' })
  }, [])

  useEffect(() => {
    if (listView) return
    function onKey(e) {
      if (['ArrowDown', 'PageDown'].includes(e.key)) { e.preventDefault(); go(active + 1) }
      if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(active - 1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, go, listView])

  // Like Stories: tapping an empty part of a chapter moves to the next one
  function advanceFrom(i) {
    return (e) => {
      if (e.target.closest('a, button, input, label, [data-no-advance]')) return
      if (i < CHAPTERS.length - 1) go(i + 1)
    }
  }

  const refFor = (i) => (el) => { sections.current[i] = el }

  function toggleView() {
    setListView((v) => !v)
    setActive(0)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  const atEnd = !listView && active === CHAPTERS.length - 1

  return (
    <div className={['ch', listView && 'ch--list', atEnd && 'ch--end'].filter(Boolean).join(' ')}>
      <header className="ch-top">
        {!listView && (
          <ol className="ch-progress" aria-label="Tour progress">
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
        <div className="ch-bar">
          <span className="ch-avatar"><Photo slug="cam" sizes="40px" alt="" eager /></span>
          <span className="ch-who">
            <span className="ch-name">Cam Currence</span>
            <span className="ch-where">{listView ? 'All of it, on one page' : CHAPTERS[active].label}</span>
          </span>
          <button type="button" className="ch-mode" onClick={toggleView}>
            {listView ? 'Tour view' : 'List view'}
          </button>
          <a className="ch-book" href={LINKS.book}>Book</a>
        </div>
      </header>

      {listView ? (
        <ListView onTour={toggleView} />
      ) : (
        <main>
          <section ref={refFor(0)} data-index="0" className="ch-ch ch-ch--split" onClick={advanceFrom(0)}>
            <Photo slug="cam" sizes="100vw" eager className="ch-bg ch-bg--cam" />
            <div className="ch-scrim" />
            <div className="ch-copy">
              <h1 className="ch-title">Hey, I’m Cam.</h1>
              <p className="ch-text">Portrait photographer in Charlotte, NC. You might know me as Seven.</p>
              <div className="ch-actions">
                <a className="ch-btn" href={LINKS.book}>Book a session</a>
                <button type="button" className="ch-btn ch-btn--ghost" onClick={() => go(1)}>Take the tour</button>
              </div>
              <p className="ch-hint">Tap anywhere or scroll to keep going.</p>
            </div>
          </section>

          <section ref={refFor(1)} data-index="1" className="ch-ch" onClick={advanceFrom(1)}>
            <Photo slug="arch" sizes="100vw" className="ch-bg" />
            <div className="ch-scrim" />
            <div className="ch-copy">
              <h2 className="ch-title">Eight years behind the camera.</h2>
              <blockquote className="ch-quote">“{STYLE_QUOTE}”</blockquote>
            </div>
          </section>

          <section ref={refFor(2)} data-index="2" className="ch-ch ch-ch--gallery" onClick={advanceFrom(2)}>
            <PortraitCarousel />
            <div className="ch-copy ch-copy--top">
              <h2 className="ch-title ch-title--small">Portraits</h2>
              <p className="ch-text">Swipe sideways for a few favorites.</p>
            </div>
          </section>

          <section ref={refFor(3)} data-index="3" className="ch-ch ch-ch--collage" onClick={advanceFrom(3)}>
            <div className="ch-copy ch-copy--inline">
              <h2 className="ch-title ch-title--small">Big days</h2>
              <p className="ch-text">Proposals, engagements, graduations, maternity. The days you’ll want to see again.</p>
            </div>
            <div className="ch-collage">
              <Photo slug="proposal" sizes="60vw" />
              <Photo slug="ring" sizes="40vw" />
              <Photo slug="couple-gold" sizes="40vw" />
            </div>
          </section>

          <section ref={refFor(4)} data-index="4" className="ch-ch" onClick={advanceFrom(4)}>
            <Photo slug="bw-couch" sizes="100vw" className="ch-bg" />
            <div className="ch-scrim ch-scrim--full" />
            <div className="ch-copy">
              <h2 className="ch-title ch-title--small">How a session goes</h2>
              <ol className="ch-steps">
                {STEPS.map((s) => (
                  <li key={s.title}><strong>{s.title}.</strong> {s.text}</li>
                ))}
              </ol>
              <p className="ch-text">Sessions start at $75. <a className="ch-link" href={LINKS.book}>See every session</a></p>
            </div>
          </section>

          <section ref={refFor(5)} data-index="5" className="ch-ch" onClick={advanceFrom(5)}>
            <Photo slug="bookshelf" sizes="100vw" className="ch-bg" />
            <div className="ch-scrim ch-scrim--full" />
            <div className="ch-copy">
              <h2 className="ch-title ch-title--small">I build things too</h2>
              <ul className="ch-projects">
                {BUILT.map((p) => (
                  <li key={p.id}>
                    <a href={p.href}>
                      <span className="ch-project-name">{p.name}</span>
                      <span className="ch-project-text">{p.text}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section ref={refFor(6)} data-index="6" className="ch-ch ch-ch--book">
            <div className="ch-copy">
              <h2 className="ch-title">Your turn.</h2>
              <p className="ch-text">Tell me what you have in mind and I’ll take it from there.</p>
              <div className="ch-actions ch-actions--stack">
                <a className="ch-btn ch-btn--white" href={LINKS.book}>Book a session</a>
                <a className="ch-btn ch-btn--ghost" href={LINKS.upwork}>Hire me on Upwork</a>
              </div>
              <ul className="ch-socials">
                {SOCIALS.map((s) => (
                  <li key={s.href}><a href={s.href}>{s.name}<span>{s.handle}</span></a></li>
                ))}
                <li><a href={`mailto:${LINKS.email}`}>Email<span>{LINKS.email}</span></a></li>
              </ul>
              <p className="ch-foot"><a className="ch-link" href="/">See the other drafts</a></p>
            </div>
          </section>
        </main>
      )}
    </div>
  )
}
