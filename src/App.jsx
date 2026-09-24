import { useEffect, useRef, useState } from 'react'
import GreaseMark from './components/GreaseMark'

const BOOK_URL = 'https://shotbyseven.com'
const UPWORK_URL = 'https://www.upwork.com/freelancers/~01c75936d92f32b5de'
const EMAIL = 'shotbyseven@gmail.com'

const FRAMES = [
  { src: '/work/frame-01.webp', alt: 'Portrait in red gloves and a black leather jacket' },
  { src: '/work/frame-02.webp', alt: 'Black and white portrait, hand raised to lips' },
  { src: '/work/frame-03.webp', alt: 'Boots covered in flowers on a red stool against yellow' },
  { src: '/work/frame-04.webp', alt: 'Black and white portrait of a man adjusting his cap' },
  { src: '/work/frame-05.webp', alt: 'Black and white portrait of a woman holding a camera' },
  { src: '/work/frame-06.webp', alt: 'Smiling portrait in a green and white jersey against yellow' },
  { src: '/work/frame-07.webp', alt: 'Black and white portrait of a man pointing at the camera' },
  { src: '/work/frame-08.webp', alt: 'Portrait holding a bouquet of red roses' },
  { src: '/work/frame-09.webp', alt: 'Man lining up a shot on a blue pool table' },
  { src: '/work/frame-10.webp', alt: 'Portrait in a fur coat in a wood-paneled room' },
  { src: '/work/frame-11.webp', alt: 'Graduate in a blue suit and cap' },
  { src: '/work/frame-12.webp', alt: 'Close-up of teal running shoes on brick' },
]
const KEEPER = 4

const PROJECTS = [
  {
    name: 'Shot by Seven',
    detail: 'My portrait studio. Graduations, maternity, fashion and editorial sessions.',
    href: BOOK_URL,
  },
  {
    name: 'SofarContent',
    detail: 'Free tools that write hooks, captions and post ideas for creators.',
    href: 'https://sofarcam.vercel.app',
  },
  {
    name: 'Claude guides',
    detail: 'Free, plain-English guides to using Claude in everyday life.',
    href: 'https://sofarcam.vercel.app/guides',
  },
  {
    name: 'SofarSeven AI',
    detail: 'My AI community on Discord.',
    href: 'https://discord.gg/sofarseven',
  },
]

const FOLLOW = [
  { name: 'Instagram', handle: '@sofar.cam', href: 'https://instagram.com/sofar.cam' },
  { name: 'Photography', handle: '@shotbyseven777', href: 'https://instagram.com/shotbyseven777' },
  { name: 'YouTube', handle: 'sofarcam', href: 'https://youtube.com/sofarcam' },
]

function ContactSheet() {
  const strips = [FRAMES.slice(0, 4), FRAMES.slice(4, 8), FRAMES.slice(8, 12)]
  return (
    <div className="contact-paper">
      {strips.map((strip, s) => (
        <div key={s} className="film-strip">
          {strip.map((frame, f) => {
            const n = s * 4 + f
            return (
              <div key={frame.src} className="film-frame">
                <div className={n === KEEPER ? 'relative z-10' : 'relative'}>
                  <img
                    src={frame.src}
                    alt={frame.alt}
                    width="560"
                    height="700"
                    loading="lazy"
                    decoding="async"
                  />
                  {n === KEEPER && <GreaseMark seed={5} />}
                </div>
                <span className="film-number type-frame">{n + 1}</span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function SectionHeading({ id, children }) {
  return (
    <h2 id={id} className="type-display text-[44px] text-silver md:text-[56px]">
      {children}
    </h2>
  )
}

// Show the mobile booking bar once the hero button scrolls away, and hide it
// again when the "Work with me" section (which has its own button) is on screen.
function useBookBar(heroCtaRef, contactRef) {
  const [heroVisible, setHeroVisible] = useState(true)
  const [contactVisible, setContactVisible] = useState(false)

  useEffect(() => {
    const hero = heroCtaRef.current
    const contact = contactRef.current
    if (!hero || !contact) return
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting)
        if (entry.target === contact) setContactVisible(entry.isIntersecting)
      }
    })
    io.observe(hero)
    io.observe(contact)
    return () => io.disconnect()
  }, [heroCtaRef, contactRef])

  return !heroVisible && !contactVisible
}

export default function App() {
  const heroCtaRef = useRef(null)
  const contactRef = useRef(null)
  const showBookBar = useBookBar(heroCtaRef, contactRef)

  return (
    <>
      <main className="container-page grid gap-20 pt-10 pb-28 md:pt-16 lg:grid-cols-12 lg:gap-16 lg:pb-24">
        <header className="hero-col lg:col-span-5 lg:self-start">
          <h1 className="type-display text-[clamp(64px,19vw,112px)] text-silver">
            <span className="block">Cam</span>
            <span className="block">Currence</span>
          </h1>
          <p className="mt-6 max-w-[30ch] text-[19px] leading-[1.5] text-[#c9c9c4]">
            Portrait photographer in Charlotte, NC. You might know me as Seven.
          </p>
          <div ref={heroCtaRef} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href={BOOK_URL} className="btn-gold">Book a session</a>
            <a href="#work" className="link-quiet text-[17px]">See my work</a>
          </div>
          <figure className="print mt-12 max-w-[360px] lg:mt-10 lg:max-w-[300px]">
            <img
              src="/cam.webp"
              alt="Cam Currence sitting on a stool in a red hoodie, holding a camera"
              width="800"
              height="1000"
              fetchPriority="high"
            />
          </figure>
        </header>

        <div className="grid gap-20 lg:col-span-7 lg:pt-3">
          <section aria-labelledby="work">
            <SectionHeading id="work">Recent work</SectionHeading>
            <p className="mt-4 max-w-[46ch] text-[17px] text-[#c9c9c4]">
              Selects from recent portrait sessions. The circled one is my favorite.
            </p>
            <div className="mt-8">
              <ContactSheet />
            </div>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[16px]">
              <a href={BOOK_URL} className="link-quiet">Full portfolio on shotbyseven.com</a>
              <a href="https://instagram.com/shotbyseven777" className="link-quiet">More on Instagram</a>
            </div>
          </section>

          <section aria-labelledby="about">
            <SectionHeading id="about">About me</SectionHeading>
            <div className="mt-6 max-w-[58ch] space-y-4 text-[18px] leading-[1.6] text-[#d6d6d1]">
              <p>
                I’m Cameron Currence. Behind the camera I go by Seven. For more than eight years
                I’ve shot portraits, fashion and creative studio work in Charlotte, from
                graduations and maternity sessions to full editorials.
              </p>
              <p>
                Every session starts the same way: getting you comfortable enough to forget the
                camera is there. The pictures get better from that point on.
              </p>
              <p>
                When I’m not shooting, I build things for creators: free writing tools, plain-English
                guides to AI, and a community for people learning it with me.
              </p>
            </div>
          </section>

          <section aria-labelledby="projects">
            <SectionHeading id="projects">Things I’ve built</SectionHeading>
            <ul className="link-list mt-8">
              {PROJECTS.map((p, i) => (
                <li key={p.href}>
                  <a href={p.href} className="link-row">
                    <span className="link-row-num type-frame">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="link-row-name block">{p.name}</span>
                      <span className="link-row-detail block">{p.detail}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section ref={contactRef} aria-labelledby="hire">
            <SectionHeading id="hire">Work with me</SectionHeading>
            <p className="mt-6 max-w-[48ch] text-[18px] leading-[1.6] text-[#d6d6d1]">
              Portrait sessions book through Shot by Seven. For freelance work, hire me on
              Upwork or send me an email.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={BOOK_URL} className="btn-gold">Book a portrait session</a>
              <a href={UPWORK_URL} className="btn-plain">Hire me on Upwork</a>
            </div>
            <p className="mt-6 text-[16px] text-graphite">
              Email{' '}
              <a href={`mailto:${EMAIL}`} className="link-quiet text-silver">{EMAIL}</a>
            </p>
          </section>

          <section aria-labelledby="follow">
            <SectionHeading id="follow">Follow along</SectionHeading>
            <ul className="link-list mt-8">
              {FOLLOW.map((f) => (
                <li key={f.href}>
                  <a href={f.href} className="link-row link-row--plain">
                    <span className="link-row-name">{f.name}</span>
                    <span className="text-[16px] text-graphite">{f.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <footer className="text-[14px] text-smoke">
            © {new Date().getFullYear()} Cam Currence, Charlotte, NC
          </footer>
        </div>
      </main>

      <div className={showBookBar ? 'book-bar is-shown' : 'book-bar'} aria-hidden={!showBookBar}>
        <a href={BOOK_URL} className="btn-gold w-full" tabIndex={showBookBar ? 0 : -1}>
          Book a session
        </a>
      </div>
    </>
  )
}
