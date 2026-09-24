# Handoff: Cam's bio page

Pick-up notes for the next session. Delete this file once the page is live and the open items are done.

## Where things are

- **Bio page (this repo):** branch `claude/bio-page-rebuild`, not merged. `main` is still the old page. Don't merge until Cam says to go live.
- **Preview:** each push makes a Vercel preview for project `sofarcam-hub`. Previews sit behind Vercel login, so share them with a `_vercel_share` link (Vercel MCP `get_access_to_vercel_url`, expires in 23h).
- **Address:** `sofarcam-hub.vercel.app`. Cam chose to keep it for now. If a custom domain is added later, update the canonical URL, `og:url`/`og:image` and JSON-LD in `index.html`, plus `public/sitemap.xml`, `public/robots.txt` and `public/llms.txt`.
- **SofarCam/sofarcam (tools site):** the OpenRouter fixes are on `main` (`c118ebd`, `4fedc78`, `d249462`). Nothing open in code.

## How the page works

- `src/content.js`: every word, link and photo on the page. Most edits happen here.
- `src/tour/Tour.jsx` and `tour.css`: the Stories-style tour. Chapters are full-screen sections, each with its own link (`/#portraits`, `/#moments`, `/#journey`, `/#built`, `/#picks`, `/#connect`). The address updates as you scroll. There's also a "simple page" mode, a menu sheet and a photo lightbox.
- **Prerendering:** `npm run build` renders the page to HTML (`src/entry-server.jsx` + `scripts/prerender.mjs`), and `src/main.jsx` hydrates it. That's what lets crawlers and AI bots read the page. Keep first render free of `window` reads, or hydration breaks.
- **Photos:** `public/photos/{slug}-720.webp` and `-1400.webp`, registered in `PHOTOS` in `content.js` with size, alt text and camera data.
- **Brand:** `brand/`. The board (`brand-board.png`, source `board.html`) and the 7-blade aperture mark as SVGs. It's a proposal: the site's favicon is still the "C" square until Cam picks the aperture.

## Checks before pushing

- `npm run lint`, then `npm run build` (must print `prerender: wrote dist/index.html`).
- With `npx vite preview`, run a Playwright check (Chromium at `/opt/pw-browsers/chromium`). Look for no console or hydration errors, the header label changing per chapter, the lightbox and menu opening, no sideways scrolling at 390px, and nothing clipped at 150% text size.

## Waiting on Cam

1. Telegram invite link for the sports picks chat. Set `LINKS.picksChat`; the page says "coming soon" until then.
2. Links for CreatorGrowthAI and Genius Curriculum (`href: null` in `PROJECTS`).
3. New photos in `photo-inbox/`. For each one: make webp at 720 and 1400, read the camera data, write title and alt text, and swap the slugs in `ROOMS`. Cam wants photos not used on shotbyseven.com.
4. Video clips from the Google Drive content folder. The Drive tool couldn't download them, so Cam needs to share them another way.
5. Confirm the AI journey wording, and that naming "clawdis" publicly is OK.
6. Whether the brand board's aperture mark should replace the favicon and OG image.
7. The go-ahead to merge to `main` (go live).

## Cam's side (not code)

- Add OpenRouter credit, or the writing tools on the tools site stop working.
- Resend: recreate `RESEND_API_KEY` as Sensitive (rotate it) and add `RESEND_AUDIENCE_ID` in Vercel.
- Use the same line in the IG, LinkedIn, YouTube and GitHub bios ("Cam Currence, photographer and AI engineer in Charlotte, NC") and link to the page. This helps AI search more than anything on the page itself.

## Decisions already made

- Look: the merged B+C tour. Ink, cobalt and white, Unbounded + Hanken Grotesk, first-person voice, sentence case. minimalist-ui was skipped because it conflicts with this.
- No photography pricing on the page.
- Main button stays "Take the tour". "See all links" sits next to it.
- Picks chat keeps the 21+ and 1-800-GAMBLER note.
- Cam asked for short, compressed replies ("caveman" mode).

## Suggested skills for the next session

- `run`: launch the page and check a change in a real browser.
- `code-review`: review before merging to `main`.
- Vercel's web-design-guidelines, plus the critique, seo-audit and ai-seo skills, for another pass once the new photos and links are in. They were cloned from GitHub last time; clone them again, since the container resets.
