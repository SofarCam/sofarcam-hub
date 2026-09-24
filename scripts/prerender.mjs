// Runs after `vite build`: renders the page to HTML and writes it into dist/index.html,
// so search engines and AI crawlers that don't run JavaScript still see the content.
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const { render } = await import(`${root}dist-ssr/entry-server.js`)

const indexPath = `${root}dist/index.html`
const template = await readFile(indexPath, 'utf8')
const marker = '<div id="root"></div>'
if (!template.includes(marker)) throw new Error('prerender: #root placeholder not found in dist/index.html')

await writeFile(indexPath, template.replace(marker, `<div id="root">${render()}</div>`))
await rm(`${root}dist-ssr`, { recursive: true, force: true })
console.log('prerender: wrote dist/index.html')
