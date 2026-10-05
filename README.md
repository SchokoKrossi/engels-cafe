# Café Engels – Website

A single-page, bilingual (DE/EN) site for Café Engels, Herrfurthstraße 21, Berlin-Neukölln.
Plain HTML, CSS and JavaScript: no build step, no frameworks, no tracking.

```
index.html        page content (all text, both languages)
styles.css        design (colours, fonts, layout)
script.js         CONFIG (hours, menu, form) at the top, logic below
impressum.html    legal notice (template)
datenschutz.html  privacy policy (template)
images/           optimised WebP photos used by the page
images/originals/ full-size originals with descriptive names (not loaded by the page)
favicon.svg, robots.txt, sitemap.xml
```

**Why plain HTML instead of Next.js?** It's a single page that rarely changes. Plain files mean zero dependencies, nothing to update, instant loads (Lighthouse 90+ is easy), and anyone can edit the text in a browser on GitHub. Next.js would only be worth it with a CMS, a blog, or many pages.

## Preview locally

Open `index.html` directly in a browser, or run a tiny server (recommended, so `?lang=en` and the form work properly):

```bash
python -m http.server 8080
```

Then open http://localhost:8080.

## Editing

### Text (both languages)
All text lives in `index.html`. Every sentence appears twice, side by side:

```html
<span data-lang="de">Komm vorbei</span>
<span data-lang="en">Come on over</span>
```

Edit both. The DE/EN toggle simply shows one and hides the other.
For image descriptions, edit `alt="…"` (German) and `data-alt-en="…"` (English).
The page title and Google description are at the top of `index.html` (German in the tag, English in `data-en`).

### Opening hours
Edit `CONFIG.hours` at the top of `script.js`:

```js
mon: [['09:00', '19:00']],          // one range
sat: [['10:00', '14:00'], ['18:00', '23:00']], // two ranges
tue: [],                             // closed
fri: [['18:00', '01:00']],           // past midnight works
```

Holidays and one-off changes go in `CONFIG.specialDays` (`'2026-12-24': [['10:00','14:00']]`, or `[]` for closed).
The "Open now" badge, the hours table and the highlighted "today" row update automatically, always in Berlin time.

⚠️ Also update `openingHoursSpecification` in the JSON-LD block in `index.html`. That's what Google reads.

### Menu
Edit `CONFIG.menu` in `script.js`. Each item looks like this:

```js
{ name: { de: 'Flat White', en: 'Flat White' },
  desc: { de: 'Doppelter Espresso, wenig Milch.', en: 'Double espresso, a little milk.' },
  price: 3.9, diet: ['veg', 'gf'] }
```

`diet` can contain `'vegan'`, `'veg'` (vegetarian) and `'gf'` (gluten-free). Prices are formatted automatically (3,90 € / €3.90).
To add a category, copy a whole `{ id, title, items }` block. The `id` must be unique and contain no spaces.
When the menu is real, delete the `<p class="placeholder-note">` line in the menu section of `index.html`.

### Images
Photos used on the page are optimised WebP files in `images/`. The untouched full-size originals, renamed by content (e.g. `cinnamon-rolls.png`, `poster-blue-moonday-jazz.png`), live in `images/originals/`. That folder isn't loaded by the page, so you can leave it out of the deploy to save space. It also has about 20 unused shots (egg bagel, matcha latte, beetroot salad, dining room…) to swap in.

To add or replace a photo:
1. Convert it to WebP, about 1600px on the long side, ideally under 200 KB (use [squoosh.app](https://squoosh.app)). Crop out any Instagram arrows or dots.
2. Put it in `images/` with a descriptive name, e.g. `images/egg-bagel.webp`.
3. In `index.html`, copy one gallery `<li>` and change `href` and `src` to the new file. Set `width`/`height` to the photo's real pixel size and write both alt texts (`alt` German, `data-alt-en` English).
4. The hero uses two sizes (`hero-counter-evening.webp` and `hero-counter-evening-800.webp`). If you change it, update the `<img>` and the `<link rel="preload">` in the `<head>`.
5. `images/og-image.jpg` (1200×630) is the preview when the link is shared on WhatsApp and elsewhere.

Event posters live in the Events section. Each card has the poster image plus a text description, so the info is also readable for Google and screen readers.

### Colours and fonts
At the top of `styles.css` in `:root`. Change `--accent` to switch terracotta for something else, but check contrast with [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/). It needs 4.5:1 against `#FAF6EF` and against white.

### Reservation form
It runs in **demo mode** by default: it validates and shows a success message, but sends nothing. To receive requests:

- **Formspree:** create a form at formspree.io, then in `script.js` set
  `form: { mode: 'formspree', endpoint: 'https://formspree.io/f/abcdwxyz' }`.
- **Netlify Forms:** deploy on Netlify and set `form: { mode: 'netlify' }`. The form already has `data-netlify="true"`. Enable form detection in the Netlify dashboard under *Forms*. Submissions appear there and can be emailed to you.

Name the provider in `datenschutz.html`.

## Deploying

**Netlify (easiest):** go to app.netlify.com → *Add new site* → *Deploy manually* → drag the whole folder in. Then connect your domain under *Domain settings*. You can also connect a GitHub repo so every change goes live automatically.

**GitHub Pages:** push the folder to a GitHub repo → *Settings → Pages* → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`. To use your own domain, add it under *Custom domain*.

**After deploying:** replace `https://cafe-engels.example` with your real domain in `index.html` (canonical, hreflang, Open Graph, JSON-LD), `robots.txt` and `sitemap.xml`. Then submit the sitemap in Google Search Console. Also add the website link to your Google Business profile.

The `.claude/` folder is only for local previewing and can be deleted.

## Privacy (GDPR) notes
- No cookies and no analytics. The language choice is stored only in the visitor's browser (localStorage).
- Google Maps loads only after a click on "Karte laden".
- **Google Fonts:** as requested, fonts load from Google's servers, which sends visitors' IP addresses to Google. German courts have issued warnings over this (LG München, 2022). For a fully clean setup, self-host the fonts:
  1. Download Fraunces and DM Sans (woff2) via [gwfh.mranftl.com](https://gwfh.mranftl.com/fonts).
  2. Put them in a `fonts/` folder and paste the generated `@font-face` CSS at the top of `styles.css`.
  3. Delete the three `fonts.googleapis.com` / `fonts.gstatic.com` lines from the `<head>` of all three HTML files.
  4. Remove section 5 from `datenschutz.html`.
- Impressum and Datenschutz are **templates only**. Complete them with a generator (e-recht24.de, datenschutz-generator.de) or a lawyer.

## Accessibility and performance (built in)
Semantic landmarks, skip link, keyboard-operable nav, tabs (arrow keys), lightbox (arrows, Esc, focus return) and form with inline errors. Visible focus rings, AA contrast, `prefers-reduced-motion` respected, lazy-loaded images with fixed dimensions (no layout shift), and no JS libraries.
