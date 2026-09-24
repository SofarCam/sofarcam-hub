import { useEffect, useRef, useState } from 'react'
import '@fontsource/lexend-giga/600.css'
import '@fontsource/lexend-giga/700.css'
import '@fontsource-variable/lexend'
import './sayhi.css'
import Photo from '../components/Photo'
import { BIO, LINKS, PHOTOS, PROJECTS, SESSIONS, SOCIALS, STEPS, STYLE_QUOTE } from '../content'

const PATHS = [
  { id: 'photos', label: 'I want photos', hint: 'Portraits, big days, headshots', photo: 'flowers', title: 'Photos it is. Here’s how it works.' },
  { id: 'content', label: 'I make content', hint: 'Free tools, brand shoots', photo: 'bookshelf', title: 'A fellow creator. Here’s what I’ve got for you.' },
  { id: 'ai', label: 'I’m curious about AI', hint: 'Guides and a community', photo: 'wall', title: 'Let’s get you started with AI.' },
  { id: 'hi', label: 'Just saying hi', hint: 'Get to know me', photo: 'cam', title: 'Hi back. Here’s a little about me.' },
]

const GROUPS = [
  { id: 'portraits', label: 'Portraits', photos: ['redhair', 'flowers', 'bookshelf', 'purple', 'bw-couch'] },
  { id: 'bigdays', label: 'Big days', photos: ['proposal', 'ring', 'couple-gold', 'grad', 'maternity'] },
  { id: 'color', label: 'Color', photos: ['velvet', 'blue-bday', 'car-red'] },
  { id: 'street', label: 'Out and about', photos: ['wall', 'arch', 'bw-men', 'camaro'] },
]

const STORE_KEY = 'sayhi-path'

function readPath() {
  try {
    const v = localStorage.getItem(STORE_KEY)
    return PATHS.some((p) => p.id === v) ? v : null
  } catch {
    return null
  }
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

function Gallery() {
  const [group, setGroup] = useState(GROUPS[0].id)
  const current = GROUPS.find((g) => g.id === group)
  return (
    <div>
      <div className="hi-chips" role="group" aria-label="Show photos of">
        {GROUPS.map((g) => (
          <button key={g.id} type="button" className="hi-chip" aria-pressed={g.id === group} onClick={() => setGroup(g.id)}>
            {g.label}
          </button>
        ))}
      </div>
      <ul className="hi-strip" aria-label={`${current.label} photos`}>
        {current.photos.map((slug) => (
          <li key={slug} className="hi-strip-item">
            <Photo slug={slug} sizes="(min-width: 900px) 320px, 70vw" />
            <span className="hi-strip-caption">{PHOTOS[slug].title}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SessionPicker() {
  const [picked, setPicked] = useState('portrait')
  const session = SESSIONS.find((s) => s.id === picked)
  return (
    <div>
      <fieldset className="hi-sessions">
        <legend className="hi-sr">Pick a session</legend>
        {SESSIONS.map((s) => (
          <label key={s.id} className="hi-session">
            <input type="radio" name="session" value={s.id} checked={s.id === picked} onChange={() => setPicked(s.id)} />
            <span className="hi-session-text">
              <span className="hi-session-top">
                <span className="hi-session-name">{s.name}</span>
                <span className="hi-session-price">{s.price}</span>
              </span>
              <span className="hi-session-detail">{s.detail}</span>
            </span>
          </label>
        ))}
      </fieldset>
      <a className="hi-button hi-button--wide" href={LINKS.book}>{session.cta}</a>
    </div>
  )
}

function Step({ title, children }) {
  return (
    <li className="hi-step">
      <h3 className="hi-step-title">{title}</h3>
      <div className="hi-step-body">{children}</div>
    </li>
  )
}

function LinkRow({ href, name, text }) {
  return (
    <a className="hi-linkrow" href={href}>
      <span className="hi-linkrow-name">{name}</span>
      {text && <span className="hi-linkrow-text">{text}</span>}
    </a>
  )
}

function Journey({ id }) {
  if (id === 'photos') {
    return (
      <ol className="hi-steps">
        <Step title="See my work">
          <Gallery />
        </Step>
        <Step title="Pick a session">
          <SessionPicker />
        </Step>
        <Step title="Here’s how it goes">
          <ul className="hi-howto">
            {STEPS.map((s) => (
              <li key={s.title}><strong>{s.title}.</strong> {s.text}</li>
            ))}
          </ul>
        </Step>
      </ol>
    )
  }
  if (id === 'content') {
    return (
      <ol className="hi-steps">
        <Step title="Try my free tools">
          <p>SofarContent writes ten hooks, captions, and post ideas for you to pick from. No sign-up.</p>
          <a className="hi-button" href={LINKS.tools}>Open the free tools</a>
        </Step>
        <Step title="Photos for your brand">
          <p>Personal branding sessions start at $350. Creators who post every week can take four sessions a month for $350.</p>
          <a className="hi-textlink" href={LINKS.book}>See brand sessions on Shot by Seven</a>
        </Step>
        <Step title="Watch how I work">
          <LinkRow href={LINKS.youtube} name="YouTube" text="sofarcam" />
          <LinkRow href={LINKS.instagram} name="Instagram" text="@sofar.cam" />
        </Step>
      </ol>
    )
  }
  if (id === 'ai') {
    return (
      <ol className="hi-steps">
        <Step title="Start with a guide">
          <p>Free, plain-English guides to using Claude for everyday things. Pick one, follow along, done.</p>
          <a className="hi-button" href={LINKS.guides}>Read the free guides</a>
        </Step>
        <Step title="Learn with other people">
          <p>SofarSeven AI is my community on Discord. Ask questions, share what you made.</p>
          <a className="hi-textlink" href={LINKS.discord}>Join on Discord</a>
        </Step>
        <Step title="Put it to work">
          <p>If you post online, my free tools write hooks and captions for you.</p>
          <a className="hi-textlink" href={LINKS.tools}>Try SofarContent</a>
        </Step>
      </ol>
    )
  }
  return (
    <ol className="hi-steps">
      <Step title="A little about me">
        {BIO.map((p) => <p key={p}>{p}</p>)}
      </Step>
      <Step title="Say hi back">
        <LinkRow href={LINKS.instagram} name="Instagram" text="@sofar.cam" />
        <LinkRow href={`mailto:${LINKS.email}`} name="Email" text={LINKS.email} />
      </Step>
      <Step title="Stick around">
        <LinkRow href={LINKS.photoInstagram} name="My photography" text="@shotbyseven777" />
        <LinkRow href={LINKS.youtube} name="YouTube" text="sofarcam" />
      </Step>
    </ol>
  )
}

export default function SayHi() {
  const [path, setPath] = useState(readPath)
  const journeyRef = useRef(null)

  useEffect(() => {
    document.title = 'Cam Currence: say hi'
  }, [])

  function choose(id) {
    setPath(id)
    try { localStorage.setItem(STORE_KEY, id) } catch { /* private mode */ }
    requestAnimationFrame(() => {
      journeyRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
      journeyRef.current?.focus({ preventScroll: true })
    })
  }

  const chosen = PATHS.find((p) => p.id === path)

  return (
    <div className="hi">
      <a className="hi-skip" href="#hi-links">Skip to all links</a>
      <header className="hi-top">
        <span className="hi-top-name">Cam Currence</span>
        <a className="hi-top-book" href={LINKS.book}>Book a session</a>
      </header>

      <main>
        <section className="hi-hello">
          <div className="hi-door">
            <Photo slug="cam" eager sizes="(min-width: 900px) 380px, 76vw" />
          </div>
          <h1 className="hi-display">Hey, I’m Cam.</h1>
          <p className="hi-lede">
            I take portraits in Charlotte, NC, and build free tools for creators. Glad you stopped by.
          </p>
        </section>

        <section className="hi-ask" aria-labelledby="hi-ask-title">
          <h2 id="hi-ask-title" className="hi-h2">What brings you here?</h2>
          <div className="hi-paths" role="group" aria-labelledby="hi-ask-title">
            {PATHS.map((p) => (
              <button key={p.id} type="button" className="hi-path" aria-pressed={p.id === path} onClick={() => choose(p.id)}>
                <span className="hi-path-photo"><Photo slug={p.photo} sizes="64px" alt="" /></span>
                <span className="hi-path-label">{p.label}</span>
                <span className="hi-path-hint">{p.hint}</span>
              </button>
            ))}
          </div>
        </section>

        <section ref={journeyRef} tabIndex={-1} className="hi-journey" aria-live="polite" aria-labelledby="hi-journey-title">
          {chosen ? (
            <div key={chosen.id} className="hi-journey-inner">
              <h2 id="hi-journey-title" className="hi-journey-title">{chosen.title}</h2>
              <Journey id={chosen.id} />
            </div>
          ) : (
            <p id="hi-journey-title" className="hi-journey-empty">Tap one of the four above and I’ll show you around.</p>
          )}
        </section>

        <section className="hi-about" aria-labelledby="hi-about-title">
          <h2 id="hi-about-title" className="hi-h2">How I shoot</h2>
          <blockquote className="hi-quote"><p>{STYLE_QUOTE}</p></blockquote>
          <div className="hi-about-photos">
            <Photo slug="velvet" sizes="(min-width: 900px) 440px, 92vw" />
            <Photo slug="proposal" sizes="(min-width: 900px) 220px, 45vw" />
          </div>
        </section>

        <section id="hi-links" className="hi-links" aria-labelledby="hi-links-title">
          <h2 id="hi-links-title" className="hi-h2">All my links</h2>
          <a className="hi-button hi-button--wide" href={LINKS.book}>Book a session on Shot by Seven</a>
          <div className="hi-linklist">
            {PROJECTS.filter((p) => p.id !== 'studio').map((p) => (
              <LinkRow key={p.id} href={p.href} name={p.name} text={p.text} />
            ))}
            <LinkRow href={LINKS.upwork} name="Hire me on Upwork" text="Freelance projects" />
            {SOCIALS.map((s) => <LinkRow key={s.href} href={s.href} name={s.name} text={s.handle} />)}
            <LinkRow href={`mailto:${LINKS.email}`} name="Email me" text={LINKS.email} />
          </div>
        </section>
      </main>

      <footer className="hi-footer">
        <p>Cam Currence, Charlotte, NC</p>
        <a href="/" className="hi-textlink">See the other drafts</a>
      </footer>
    </div>
  )
}
