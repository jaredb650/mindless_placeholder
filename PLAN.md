# MINDLESS.PR — Coming Soon → Full Website

## Context

`mindless.pr` is currently a single-screen "Coming Soon" teaser deployed on Vercel. It's a Next.js 16 / React 19 / Tailwind v4 app whose entire output is one `Preloader` component — a glitch/Matrix-rain animation of the MINDLESS.PR logo with a looping `> COMING SOON_` typewriter line. There is no real content, no routes, no navigation, and `globals.css` sets `overflow: hidden` so the page can't scroll.

MINDLESS.PR is a **DJ / music collective** (electronic, Puerto Rico). We're turning the teaser into a real multi-section website. Decisions already made:
- **Content lives in code files** (data files + MDX articles) — no CMS.
- **Fresh "dark & electronic" design** — retire the glitch gimmick, reuse the brand logo + brand blue (`#2563EB` / `#3B82F6`).
- Sections required: About, Upcoming Events (→ external ticket links), **Resident Artists** (bios), Blog (articles), Video Archive (embedded YouTube), Socials, Contact/Book.
- **Resident Artists**, not just DJs — the roster is a mix of electronic DJs *and* alternative/punk acts, so the section, route, and data model are artist-type-aware (each artist has a `type`/`role`, e.g. "DJ", "Punk", "Alternative").

## Brand research (gathered from the web — seed real content, not filler)

Instagram itself is login-walled (couldn't read the live bio/follower count/feed directly), but cross-referencing Threads, the public IG post pages, Facebook, YouTube and search surfaced solid facts. Seed the data files with these; I'll flag the few things you should confirm.

**Confirmed (corrected by the owner):**
- **Mindless Entertainment** ("ME"), handle **@mindlessentertainmenttv** (verified IG), domain **mindless.pr**. Founded **2023**. Based in **San Juan, Puerto Rico**.
- Two lanes: **hard techno raves** *and* **alternative / punk / nu-metal** live events — an underground PR music + nightlife collective that also **documents the scene island-wide on video** (they film/cover events all over Puerto Rico, not just their own).
- Flagship hard-techno event series: **Dimensions** (`@dimensions.pr`).
- Runs a **YouTube channel** publishing event recaps / aftermovies (the "HARD TECHNO RAVE EN PUERTO RICO" series).
- Plays/produces at **many venues across the island** — do NOT pin the brand to a single venue (El Nie was just one).
- **Real resident artists confirmed so far: `MEKA`** (all caps — the `x.meka.x` IG handle is misleading) **and `GIIIOOO`** (spelled G + three I's + three O's — "Gio Music" / `@giomusic.pr` was just the handle). Owner says there are **~5 residents total**; the rest (names/bios) come later.
- Original tracks debut at their events (e.g. "GUAYOTEO" by MEKA × GIIIOOO).
- Socials to link: **Instagram (primary audience/contact channel)**, **YouTube**, **Facebook** (`mestandsformindlessentertainment`), **Threads**, **TikTok**.

**NOT affiliated / removed (don't put these on the site):** Deadmau5 (just an unrelated event the videographer covered — not notable for us), **DJ FCKUPS** (not a real DJ), **DJ Goth Queen** (invited guest, not a resident), **Ozzie Forbes** / radio coverage folks (not officially affiliated).

**To get from you later (seeded as clearly-marked placeholders):** the remaining ~3 resident artists, exact IG follower count, real upcoming event dates/venues/ticket URLs, the real YouTube video IDs, and final bio copy. I'll scaffold `artists.js` with MEKA + GIIIOOO as real entries and ~3 placeholder resident slots, and leave prose for you to approve rather than inventing it.

## Goals

A scrollable, responsive, SEO-friendly site where visitors can: learn what MINDLESS is, see upcoming events and click through to buy tickets, read resident artist bios (DJs and live/punk acts), browse articles, watch the YouTube archive, find the socials, and get in touch / book.

## Architecture overview

Keep the existing stack (Next.js 16 App Router, React 19, Tailwind v4, Framer Motion). Add **MDX** for blog articles. All editable content lives in `src/data/*` and `src/content/blog/*.mdx` so updates are simple file edits + redeploy.

### Routes (App Router, under `src/app/`)
- `/` — Home: hero, about teaser, next 2–3 events, resident DJ strip, latest videos, latest articles, socials CTA.
- `/about` — who MINDLESS is.
- `/events` — all upcoming events; each card links out to its ticket URL.
- `/artists` — resident artist grid (DJs + punk/alternative acts, filterable by type) → `/artists/[slug]` individual bio pages.
- `/videos` — YouTube embed archive (grid of lite-loaded embeds).
- `/blog` — article index → `/blog/[slug]` article pages (rendered from MDX).
- `/contact` — contact/booking form + socials.

### Data files (new — `src/data/`)
- `site.js` — brand name ("Mindless Entertainment" / mindless.pr), tagline (PR underground: hard techno + alt/punk, est. 2023), nav items, real social links (IG @mindlessentertainmenttv, YouTube, Facebook mestandsformindlessentertainment, Threads, TikTok), contact email. Instagram flagged as the primary audience/contact channel.
- `events.js` — `[{ id, title, date, venue, city, lineup[], ticketUrl, image, status }]`.
- `artists.js` — `[{ slug, name, alias, type, bio, image, genres[], socials{} }]` where `type` distinguishes DJ vs Punk/Alternative acts. Seeded with the two confirmed residents **MEKA** and **GIIIOOO** plus ~3 clearly-marked placeholder resident slots (owner says ~5 total). No guest/non-affiliated names.
- `videos.js` — `[{ id, title, youtubeId, date, description }]`. Seeded from the real YouTube recap series (the "HARD TECHNO RAVE EN PUERTO RICO" aftermovies + island-wide event coverage) — you'll paste the actual YouTube IDs.
- `events.js` seeded with the **Dimensions** techno series + alt/punk nights (venue-agnostic — owner plays many venues); real dates/venues/ticket URLs supplied by you.
- Blog articles: one MDX file per article in `src/content/blog/<slug>.mdx` with frontmatter (`title, date, excerpt, cover, author`). A small `src/lib/blog.js` helper reads/sorts them.

### Components (new — `src/components/`)
- `Header.js` — sticky top nav, MINDLESS.PR logo, mobile hamburger menu.
- `Footer.js` — socials, nav, copyright.
- `Hero.js` — brand hero (logo + tagline + CTAs), glitch-evolved WebGL/canvas texture, grain/scanline DNA from `Preloader.js` matured.
- `NextEventBanner.js` — the funnel: prominent animated banner pinned below the hero showing the next upcoming event (date/venue/lineup) with a red TICKETS CTA → external ticket URL. Pulls the soonest `status: "upcoming"` entry from `events.js`; hides gracefully when none.
- `GlitchImage.js` — reusable WebGL/canvas displacement treatment for photos (artist portraits tear/distort on hover).
- `SectionHeading.js`, `EventCard.js`, `ArtistCard.js`, `VideoCard.js` (lazy YouTube facade for performance), `ArticleCard.js`, `SocialLinks.js`, `ContactForm.js`.
- Reveal-on-scroll wrapper using Framer Motion for tasteful section entrances.

### Files modified
- `src/app/page.js` — replace single `<Preloader>` with the composed Home page sections.
- `src/app/layout.js` — add `<Header>`/`<Footer>` shell, real metadata + Open Graph, keep font preloads.
- `src/app/globals.css` — **remove `overflow: hidden`** (critical — currently blocks scrolling), add dark-electronic design tokens (colors, spacing), base typography (Bricolage Grotesque display + Space Mono accents), keep tasteful grain/scanline texture utilities.
- `next.config.mjs` — add `@next/mdx` config; add `images` config if any remote image hosts are used.
- `src/components/Preloader.js` — retire from the main flow. Keep the file (or salvage its grain/scanline canvas logic into the hero); not rendered on `/` by default.

### Design language (dark & electronic — owner-refined)
- **Palette**: black + blue are THE brand colors (`#2563EB` / `#3B82F6` on near-black), white text, **red as a scarce "danger signal"** — it only appears where adrenaline lives: TICKETS CTAs, LIVE NOW, SOLD OUT, hot hover states. Blue owns the site; red spikes it.
- **Signature animation: CRT-glitch evolved.** WebGL/canvas displacement and distortion — not the old Matrix-rain teaser, but its DNA matured: artist photos that tear/displace on hover, headings that glitch on reveal, scanline/grain as a quiet constant texture. Framer Motion handles layout/scroll choreography; a lightweight WebGL layer (custom shaders, or OGL — stay lean, avoid full three.js if possible) handles distortion effects.
- Bold oversized display headings (Bricolage Grotesque 800), mono labels/metadata (Space Mono) for the terminal DNA — event dates, "RESIDENT" / artist-type tags. Artist type (DJ / Punk / Alternative) surfaces as a mono tag on cards and bios.
- **Photo-driven**: owner will supply event photos/aftermovie stills, artist portraits, flyers, and hi-res logo assets. Design leans on real photography with glitch treatments. Placeholders until assets drop into `/public`.
- Think Resident Advisor / Boiler Room energy, but with **lore** — see purpose hierarchy below.

### Purpose hierarchy (owner-stated)
1. **Link-in-bio funnel (primary)**: this URL lives permanently in the IG bio. Homepage = brand hero **+ a prominent event banner pinned immediately below** announcing the next upcoming event → tap → ticket link. Owner just updates `events.js`; the bio link never changes. All ticket links consolidated here so they stop posting links to stories.
2. **Lore hub / world-building (secondary)**: resident artist pages are character pages — story, style, what they've done, photos. Blog = the archive: interviews with residents, recaps of past events. Videos = proof. The site is the central point of the Mindless world.

### Open items (sensible defaults, easy to change)
- **Tickets**: each event's `ticketUrl` opens the external platform (Eventbrite/DICE/etc.) in a new tab — no in-app checkout.
- **Contact form**: posts to a form service endpoint (e.g. Formspree) set via env var, with a `mailto:` fallback to the brand email. No backend/database is added. I'll wire the form and leave the endpoint configurable.
- **Images**: I'll use placeholder images + the existing logo assets; real event/DJ photos drop into `/public` later. Content in all data files starts as realistic placeholders for you to edit.

## Implementation steps
1. Foundation: update `globals.css` (remove overflow lock, add tokens/utilities), `layout.js` (Header/Footer shell, metadata), create `src/data/site.js`.
2. Shared components: `Header`, `Footer`, `SectionHeading`, `SocialLinks`, reveal wrapper.
3. Home page (`page.js`) with `Hero` + section composition pulling from data.
4. Events: `events.js` data, `EventCard`, `/events` page.
5. Artists: `artists.js` data (DJs + punk/alternative, type-tagged), `ArtistCard`, `/artists` (filter by type) + `/artists/[slug]`.
6. Videos: `videos.js` data, `VideoCard` (lazy embed), `/videos` page.
7. Blog: MDX setup in `next.config.mjs`, `src/lib/blog.js`, sample articles, `/blog` + `/blog/[slug]`.
8. About + Contact pages, `ContactForm`.
9. Polish: responsive passes, motion, SEO metadata per route, favicon/OG.

## Verification
- `npm run dev` and manually walk every route at desktop + mobile widths: nav works, page scrolls (regression check on the old overflow lock), event cards open ticket URLs in a new tab, artist grid filters by type and bio routes resolve, YouTube embeds play, blog index → article renders MDX, contact form validates and submits/falls back to mailto.
- `npm run build` to confirm a clean production build (catches MDX/route/static-gen issues).
- `npm run lint`.
- Optionally drive key pages with Playwright MCP to screenshot desktop + mobile and confirm the dark-electronic layout renders correctly.
