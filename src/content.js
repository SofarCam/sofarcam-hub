// Everything the drafts say about Cam, in one place. Facts come from shotbyseven.com
// (session prices, turnaround, style) and the existing bio links.

export const LINKS = {
  book: 'https://shotbyseven.com',
  upwork: 'https://www.upwork.com/freelancers/~01c75936d92f32b5de',
  email: 'shotbyseven@gmail.com',
  tools: 'https://sofarcam.vercel.app',
  guides: 'https://sofarcam.vercel.app/guides',
  discord: 'https://discord.gg/sofarseven',
  instagram: 'https://instagram.com/sofar.cam',
  photoInstagram: 'https://instagram.com/shotbyseven777',
  youtube: 'https://youtube.com/sofarcam',
}

// Cam's own words from the shotbyseven.com FAQ
export const STYLE_QUOTE =
  'Bold, warm, and editorial. I love golden hour light, real moments, and shots that feel like a movie still.'

export const BIO = [
  'I’m Cameron Currence, and behind the camera I go by Seven. For more than eight years I’ve photographed people in Charlotte: portraits, fashion, and creative studio work, from graduations and maternity sessions to proposals and full editorials.',
  'When I’m not shooting, I build free tools for creators and write plain-English guides to AI.',
]

export const SESSIONS = [
  { id: 'mini', name: 'Mini session', detail: 'One focused hour', price: 'from $75', cta: 'Book a mini session' },
  { id: 'portrait', name: 'Portraits', detail: 'Couples, lifestyle, just you', price: 'from $100', cta: 'Book a portrait session' },
  { id: 'headshot', name: 'Headshots', detail: 'Delivered within 24 hours', price: 'from $150', cta: 'Book headshots' },
  { id: 'graduation', name: 'Graduation', detail: 'Cap, gown, and the creative ones', price: 'from $250', cta: 'Book graduation photos' },
  { id: 'maternity', name: 'Maternity and family', detail: 'Studio or outdoors', price: 'from $250', cta: 'Book maternity photos' },
  { id: '777', name: 'The 777 Package', detail: '90 minutes, 77 images, 7 retouched', price: '$777', cta: 'Book The 777 Package' },
]

export const STEPS = [
  { title: 'Tell me your idea', text: 'Pick a session and share your dates and the vibe you want.' },
  { title: 'We shoot', text: 'Bring a friend or partner if you like. Plus-ones are free.' },
  { title: 'Get your photos', text: 'A sneak peek in 48 to 72 hours, your full gallery within a week.' },
]

export const PROJECTS = [
  { id: 'studio', name: 'Shot by Seven', text: 'My portrait studio in Charlotte.', href: LINKS.book },
  { id: 'tools', name: 'SofarContent', text: 'Free tools that write hooks, captions, and post ideas.', href: LINKS.tools },
  { id: 'guides', name: 'Claude guides', text: 'Free, plain-English guides to using AI every day.', href: LINKS.guides },
  { id: 'discord', name: 'SofarSeven AI', text: 'My AI community on Discord.', href: LINKS.discord },
]

export const SOCIALS = [
  { name: 'Instagram', handle: '@sofar.cam', href: LINKS.instagram },
  { name: 'Photography on Instagram', handle: '@shotbyseven777', href: LINKS.photoInstagram },
  { name: 'YouTube', handle: 'sofarcam', href: LINKS.youtube },
]

// Camera data comes from each file's EXIF. Photos without it have exif: null.
export const PHOTOS = {
  cam: {
    w: 933, h: 1400, title: 'Cam Currence',
    alt: 'Cam Currence in a red hoodie, sitting on a stool and holding a camera',
    exif: { camera: 'Canon EOS 850D', focal: '26mm', aperture: 'f/4.5', shutter: '1/125', iso: 800, date: 'January 2025' },
  },
  velvet: {
    w: 1400, h: 933, title: 'Red velvet',
    alt: 'Woman in black lounging on a red velvet sofa in front of red curtains',
    exif: { camera: 'Canon EOS 5D Mark IV', focal: '125mm', aperture: 'f/7.1', shutter: '1/100', iso: 12800, date: 'February 2026' },
  },
  proposal: {
    w: 933, h: 1400, title: 'The question',
    alt: 'Man down on one knee proposing inside a glass dome',
    exif: { camera: 'Canon EOS 5D Mark IV', focal: '63mm', aperture: 'f/5', shutter: '1/50', iso: 320, date: 'February 2026' },
  },
  ring: {
    w: 933, h: 1400, title: 'She said yes',
    alt: 'Newly engaged woman smiling and holding her ring up to the camera',
    exif: { camera: 'Canon EOS 5D Mark IV', focal: '107mm', aperture: 'f/5.6', shutter: '1/100', iso: 2500, date: 'February 2026' },
  },
  'couple-gold': {
    w: 1400, h: 933, title: 'Together',
    alt: 'Couple in matching gray sitting close together on a white and gold set',
    exif: { camera: 'Canon EOS 5D Mark IV', focal: '100mm', aperture: 'f/5.6', shutter: '1/80', iso: 2000, date: 'February 2026' },
  },
  'bw-couch': {
    w: 1400, h: 933, title: 'Parlor',
    alt: 'Black and white portrait of a woman seated on a vintage sofa',
    exif: { camera: 'Canon EOS 5D Mark IV', focal: '102mm', aperture: 'f/6.3', shutter: '1/100', iso: 8000, date: 'July 2025' },
  },
  'bw-men': {
    w: 1400, h: 933, title: 'Table talk',
    alt: 'Black and white photo of two men talking across a table',
    exif: { camera: 'Canon EOS 5D Mark IV', focal: '87mm', aperture: 'f/7.1', shutter: '1/100', iso: 6400, date: 'July 2025' },
  },
  bookshelf: {
    w: 1400, h: 933, title: 'Between the shelves',
    alt: 'Woman peeking through a gap in a bookshelf',
    exif: { camera: 'Canon EOS 5D Mark IV', focal: '76mm', aperture: 'f/5.6', shutter: '1/60', iso: 1600, date: 'April 2025' },
  },
  wall: {
    w: 933, h: 1400, title: 'On the wall',
    alt: 'Black and white photo of a lone figure sitting on top of a tall white wall',
    exif: { camera: 'Canon EOS 5D Mark IV', focal: '200mm', aperture: 'f/7.1', shutter: '1/250', iso: 100, date: 'October 2025' },
  },
  'car-red': {
    w: 933, h: 1400, title: 'Rosso',
    alt: 'Close-up of the curved red body of a Ferrari',
    exif: { camera: 'Canon EOS 5D Mark IV', focal: '67mm', aperture: 'f/5', shutter: '1/60', iso: 1600, date: 'April 2025' },
  },
  camaro: {
    w: 1400, h: 933, title: 'Golden hour',
    alt: 'Person leaning on a blue Camaro in a parking lot at sunset',
    exif: { camera: 'Canon EOS 5D Mark IV', focal: '200mm', aperture: 'f/6.3', shutter: '1/2000', iso: 6400, date: 'September 2025' },
  },
  redhair: {
    w: 933, h: 1400, title: 'Over the shoulder',
    alt: 'Woman with long red hair and shoulder tattoos looking back over her shoulder',
    exif: null,
  },
  flowers: {
    w: 933, h: 1400, title: 'Purple roses',
    alt: 'Smiling woman holding a bouquet of purple roses',
    exif: null,
  },
  'blue-bday': {
    w: 1400, h: 933, title: 'Birthday blue',
    alt: 'Woman sitting on a bright blue backdrop next to a birthday cake',
    exif: null,
  },
  maternity: {
    w: 933, h: 1400, title: 'Expecting',
    alt: 'Pregnant woman in a white dress standing beside a wooden stool',
    exif: null,
  },
  grad: {
    w: 1400, h: 933, title: 'Graduate',
    alt: 'Graduate in a suit and stole standing beside the Craig Hall sign',
    exif: null,
  },
  purple: {
    w: 934, h: 1400, title: 'Violet',
    alt: 'Woman in a white dress holding out her skirt against a purple backdrop',
    exif: null,
  },
  arch: {
    w: 1400, h: 945, title: 'Leap',
    alt: 'Black and white silhouette of a person leaping through a stone archway',
    exif: null,
  },
  'brown-suit': {
    w: 933, h: 1400, title: 'Shoreline',
    alt: 'Man in a brown suit with a camera strap standing on a beach',
    exif: { camera: 'Canon EOS 5D Mark IV', focal: '125mm', aperture: 'f/8', shutter: '1/200', iso: 100, date: 'September 2025' },
  },
}
