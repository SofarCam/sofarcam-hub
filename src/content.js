// Everything the bio page says about Cam, in one place. Facts come from Cam's resume, the
// SofarSeven sports picks plan, shotbyseven.com, and the existing bio links.

export const LINKS = {
  photography: 'https://shotbyseven.com',
  upwork: 'https://www.upwork.com/freelancers/~01c75936d92f32b5de',
  email: 'shotbyseven@gmail.com',
  tools: 'https://sofarcam.vercel.app',
  guides: 'https://sofarcam.vercel.app/guides',
  discord: 'https://discord.gg/sofarseven',
  instagram: 'https://instagram.com/sofar.cam',
  photoInstagram: 'https://instagram.com/shotbyseven777',
  youtube: 'https://youtube.com/sofarcam',
  linkedin: 'https://www.linkedin.com/in/cameroncurrence',
  github: 'https://github.com/sofarcam',
  frontdesklife: 'https://frontdesklife.com',
  // Telegram invite for the sports picks chat. Until it's set, the page says the link is coming soon.
  picksChat: null,
}

// Cam's own words from the shotbyseven.com FAQ
export const STYLE_QUOTE =
  'Bold, warm, and editorial. I love golden hour light, real moments, and shots that feel like a movie still.'

export const BIO = [
  'I’m Cameron Currence, and behind the camera I go by Seven. I’ve photographed people in Charlotte for more than eight years: portraits, fashion, and creative studio work.',
  'I’m also an AI engineer. I build AI agents and tools on Claude, and I share what I learn in free guides and a community on Discord.',
]

// Gallery rooms. When the new photo folder is in, swap the slugs here.
export const ROOMS = [
  {
    id: 'portraits', name: 'Portraits', note: 'People on a good day, as themselves.',
    photos: ['redhair', 'bookshelf', 'velvet', 'flowers', 'purple', 'bw-couch'],
    more: { label: 'More on shotbyseven.com', href: LINKS.photography },
  },
  {
    id: 'moments', name: 'Moments', note: 'Proposals, graduations, and the days you want to keep.',
    photos: ['proposal', 'ring', 'couple-gold', 'grad', 'maternity', 'camaro'],
    more: { label: 'Follow @shotbyseven777', href: LINKS.photoInstagram },
  },
]

// From Cam's resume. It's a real sequence, so the page shows it in order.
export const JOURNEY = [
  { year: '2016', title: 'On the sales floor', text: 'Sold at Adidas and started my first online store, Y EverStop, running all of its marketing myself.' },
  { year: '2022', title: 'Business degree', text: 'Graduated from North Carolina A&T with a B.S. in Business, Entrepreneurship.' },
  { year: '2023', title: 'FrontDeskLife', text: 'Started fitting AI tools into how small businesses already work, and automating the repetitive parts.' },
  { year: '2025', title: 'clawdis', text: 'Built an AI agent on Claude that runs day-to-day business work from a Telegram chat, with a daily spending cap so it can run on its own.' },
  { year: '2025', title: 'CreatorGrowthAI', text: 'Built a tool that audits social media profiles, scores them, and says what to fix.' },
  { year: '2026', title: 'Free for everyone', text: 'Launched SofarContent’s free writing tools and plain-English guides to Claude.' },
  { year: '2026', title: 'Sports picks', text: 'Opened a free sports picks chat on Telegram.' },
]

export const PROJECTS = [
  { id: 'clawdis', name: 'clawdis', text: 'An AI agent that runs day-to-day business work from Telegram.', href: LINKS.github, cta: 'My GitHub' },
  { id: 'creatorgrowth', name: 'CreatorGrowthAI', text: 'Audits a social media profile, scores it, and says what to fix.', href: null },
  { id: 'genius', name: 'Genius Curriculum', text: 'Learn AI with a live Claude playground, quizzes, and an AI tutor.', href: null },
  { id: 'tools', name: 'SofarContent', text: 'Free tools that write hooks, captions, and post ideas.', href: LINKS.tools, cta: 'Try it free' },
  { id: 'guides', name: 'Claude guides', text: 'Free, plain-English guides to using AI every day.', href: LINKS.guides, cta: 'Read them' },
  { id: 'discord', name: 'SofarSeven AI', text: 'My AI community on Discord.', href: LINKS.discord, cta: 'Join' },
  { id: 'frontdesk', name: 'FrontDeskLife', text: 'AI set up inside small businesses.', href: LINKS.frontdesklife, cta: 'Visit' },
]

// From the SofarSeven sports picks plan, including its responsible-gambling note.
export const PICKS_CHAT = {
  where: 'Telegram',
  href: LINKS.picksChat,
  points: ['Daily picks with the reasoning behind them', 'A running record of every pick', 'Answers to your betting questions'],
  disclaimer: '21+ and only where sports betting is legal. Picks are for entertainment, not financial advice. If gambling stops being fun, call 1-800-GAMBLER.',
}

export const SOCIALS = [
  { name: 'Instagram', handle: '@sofar.cam', href: LINKS.instagram },
  { name: 'Photography', handle: '@shotbyseven777', href: LINKS.photoInstagram },
  { name: 'YouTube', handle: 'sofarcam', href: LINKS.youtube },
  { name: 'LinkedIn', handle: 'cameroncurrence', href: LINKS.linkedin },
  { name: 'GitHub', handle: 'sofarcam', href: LINKS.github },
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
  athlete: {
    w: 1400, h: 933, title: 'Warm-up',
    alt: 'Athlete stretching low on a track at night',
    exif: null,
  },
  'brown-suit': {
    w: 933, h: 1400, title: 'Shoreline',
    alt: 'Man in a brown suit with a camera strap standing on a beach',
    exif: { camera: 'Canon EOS 5D Mark IV', focal: '125mm', aperture: 'f/8', shutter: '1/200', iso: 100, date: 'September 2025' },
  },
}
