import { PHOTOS } from '../content'

// Responsive image from /public/photos, sized with the dimensions recorded in content.js.
export default function Photo({ slug, sizes = '100vw', eager = false, alt, ...rest }) {
  const p = PHOTOS[slug]
  return (
    <img
      src={`/photos/${slug}-1400.webp`}
      srcSet={`/photos/${slug}-720.webp 720w, /photos/${slug}-1400.webp 1400w`}
      sizes={sizes}
      width={p.w}
      height={p.h}
      alt={alt ?? p.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      {...rest}
    />
  )
}
