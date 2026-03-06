import { motion } from 'framer-motion'
import { FaInstagram, FaYoutube } from 'react-icons/fa'
import { HiArrowUpRight, HiBriefcase } from 'react-icons/hi2'
import { HiCamera } from 'react-icons/hi'
import { HiSparkles } from 'react-icons/hi2'

const links = [
  {
    label: 'Shot by Seven',
    sub: 'Photography Studio · Charlotte, NC',
    href: 'https://shotbyseven.com',
    icon: HiCamera,
    featured: true,
  },
  {
    label: 'Instagram',
    sub: '@sofar.cam',
    href: 'https://instagram.com/sofar.cam',
    icon: FaInstagram,
  },
  {
    label: 'Photography',
    sub: '@shotbyseven777',
    href: 'https://instagram.com/shotbyseven777',
    icon: FaInstagram,
  },
  {
    label: 'YouTube',
    sub: 'sofarcam',
    href: 'https://youtube.com/sofarcam',
    icon: FaYoutube,
  },
  {
    label: 'Hire Me',
    sub: 'Upwork · Freelance',
    href: 'https://www.upwork.com/freelancers/~01c75936d92f32b5de',
    icon: HiBriefcase,
  },
  {
    label: 'SofarSeven AI',
    sub: 'Discord Community',
    href: 'https://discord.gg/sofarseven',
    icon: HiSparkles,
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 1, 0.5, 1] },
})

function LinkRow({ link, index }) {
  const Icon = link.icon

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      {...fadeUp(0.35 + index * 0.07)}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        borderRadius: '18px',
        background: link.featured
          ? 'linear-gradient(135deg, rgba(0,0,0,0.92) 0%, rgba(30,30,30,0.95) 100%)'
          : 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: link.featured
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid rgba(0,0,0,0.06)',
        boxShadow: link.featured
          ? '0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)'
          : '0 2px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        cursor: 'pointer',
        textDecoration: 'none',
        marginBottom: '10px',
        transition: 'box-shadow 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Icon container */}
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: link.featured
            ? 'rgba(255,255,255,0.1)'
            : 'rgba(0,0,0,0.05)',
          flexShrink: 0,
        }}>
          <Icon
            size={17}
            color={link.featured ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.55)'}
          />
        </div>

        <div>
          <p style={{
            margin: 0,
            fontSize: '15px',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            color: link.featured ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.85)',
            lineHeight: 1.3,
          }}>
            {link.label}
          </p>
          <p style={{
            margin: '2px 0 0',
            fontSize: '12px',
            fontWeight: 400,
            color: link.featured ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.38)',
            letterSpacing: '0.01em',
          }}>
            {link.sub}
          </p>
        </div>
      </div>

      <HiArrowUpRight
        size={14}
        color={link.featured ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.22)'}
      />
    </motion.a>
  )
}

export default function Card() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f7',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
    }}>
      {/* Subtle background gradient */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,125,250,0.07) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{
        width: '100%',
        maxWidth: '390px',
        position: 'relative',
        zIndex: 1,
      }}>

        {/* Avatar + Identity */}
        <motion.div
          {...fadeUp(0)}
          style={{ textAlign: 'center', marginBottom: '36px' }}
        >
          {/* Avatar circle */}
          <motion.div
            {...fadeUp(0.05)}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1d1d1f 0%, #3a3a3c 100%)',
              margin: '0 auto 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
              border: '3px solid rgba(255,255,255,0.9)',
            }}
          >
            <span style={{
              fontSize: '28px',
              fontWeight: 600,
              color: 'white',
              fontFamily: 'Inter, -apple-system, sans-serif',
              letterSpacing: '-0.02em',
            }}>C</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.1)}
            style={{
              margin: '0 0 6px',
              fontSize: '26px',
              fontWeight: 600,
              letterSpacing: '-0.025em',
              color: '#1d1d1f',
              lineHeight: 1.2,
            }}
          >
            Cameron Currence
          </motion.h1>

          {/* Handle */}
          <motion.p
            {...fadeUp(0.17)}
            style={{
              margin: '0 0 10px',
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(0,0,0,0.4)',
              letterSpacing: '0.01em',
            }}
          >
            @sofar.cam
          </motion.p>

          {/* Bio */}
          <motion.p
            {...fadeUp(0.22)}
            style={{
              margin: 0,
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(0,0,0,0.5)',
              lineHeight: 1.6,
              letterSpacing: '-0.005em',
            }}
          >
            Photographer · Creator · Builder
            <br />
            <span style={{ color: 'rgba(0,0,0,0.3)', fontSize: '13px' }}>Charlotte, NC</span>
          </motion.p>
        </motion.div>

        {/* Links */}
        <div>
          {links.map((link, i) => (
            <LinkRow key={link.href} link={link} index={i} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          {...fadeUp(0.9)}
          style={{
            marginTop: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
          }}
        >
          {[
            { href: 'https://instagram.com/sofar.cam', Icon: FaInstagram },
            { href: 'https://youtube.com/sofarcam', Icon: FaYoutube },
          ].map(({ href, Icon }) => (
            <motion.a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: '#1d1d1f' }}
              style={{ color: 'rgba(0,0,0,0.2)', display: 'flex' }}
            >
              <Icon size={14} />
            </motion.a>
          ))}
          <span style={{
            fontSize: '11px',
            color: 'rgba(0,0,0,0.2)',
            fontWeight: 400,
            letterSpacing: '0.02em',
          }}>
            Charlotte, NC · {new Date().getFullYear()}
          </span>
        </motion.div>

      </div>
    </div>
  )
}
