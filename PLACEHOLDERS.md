# Placeholder checklist

Search the project for `[` to find any leftovers. Items marked **(verify)** are pre-filled with my best guess. Please confirm them.

## Business facts
- [x] **Address**: `Herrfurthstraße 21, 12049 Berlin` (from the event posters and the street sign in the exterior photo). Already updated everywhere
- [x] **Phone**: 030 279 761 07 (from Google Maps)
- [ ] **Email**: `hallo@cafe-engels.example`. In `index.html`: contact list, JSON-LD `email`; `impressum.html`, `datenschutz.html`
- [ ] **Opening hours** (partly verified): opens 10:00 daily (chalkboard outside). Mon until 23:30 and Fri until 22:00 come from the event posters. **The 19:00 closing on other days is a guess.** Change it in `script.js` → `CONFIG.hours`, **and** JSON-LD `openingHoursSpecification` and the no-JS fallback table in `index.html`
- [ ] **Holiday hours**: `script.js` → `CONFIG.specialDays` (samples for Christmas/New Year)
- [ ] **Price range**: JSON-LD `priceRange` (`€`)
- [x] **Instagram**: `@engelsberlin`

## Content
- [ ] **About story** (optional): text now uses 1987 and "Café Restaurant Bar". Add owners' names or history if you like
- [x] **Founding year**: 1987 (about text, facts, stamp, JSON-LD `foundingDate`)
- [ ] **Menu**: `script.js` → `CONFIG.menu` (all items, descriptions, prices, diet tags). Then delete the `placeholder-note` line in the menu section
- [ ] **Allergen info**: confirm "Oat or soy milk at no extra charge" and the allergen line
- [x] **Reviews**: shows the Google rating (4.4 from 865, as of Oct 2026) and the most-mentioned topics. Update the numbers now and then. To show actual quotes, get the reviewers' OK first (template is commented out in the reviews section)
- [ ] **Events**: Blue Moonday Jazz (Mon 20:00–23:30), Check la Lage improv (2nd Thu, 20:00, dates through 13.5.2027) and Weekend Warmup (Fri 18–22), taken from the posters. Check they're still running and that it's OK to name Charlotte Joerges. Update the improv dates in `index.html` and `CONFIG.specialDays` when the next season is announced. **The 22:30 show end is a guess**
- [ ] **Public transport** (verify): U8 Boddinstraße / Leinestraße, S+U Hermannstraße, walking times, **bus line** `[Linie / line]`
- [ ] **Accessibility**: step-free entrance? prams? dogs? Wi-Fi? (each marked `[prüfen]`/`[check]`)
- [x] **Payment**: cash and card. Optionally add which cards / Apple Pay
- [ ] **Bike racks** claim in the transport card

## Photos (`images/`)
- [x] Logo: traced to crisp SVGs (`logo-engels.svg` header, `logo-engels-full*.svg` footer/Google) and a matching favicon. If you have the original vector logo (SVG/AI/EPS), swap it in for a perfect result
- [x] Real photos are in: hero, about, 12 gallery photos, 2 event posters, exterior and `og-image.jpg`
- [ ] **Image rights**: make sure you may use every photo. Most come from Instagram. `exterior-corner-herrfurthstrasse`, `counter-daytime-menu-boards`, `breakfast-plate`, `muesli-bowl` and `dining-room-panorama` look like they come from press, blog or review sites. Ask the photographer or replace them
- [ ] **People in photos**: guests are recognisable in `terrace-summer`, `window-bar-seats` and the exterior shot. Under German law (Recht am eigenen Bild / GDPR) you should have their OK or use other shots
- [ ] **About photo**: currently the shop window. A photo of the owners/team would be warmer
- [ ] Higher resolution photos would help. The Instagram screenshots are only about 560px wide, which is fine in the grid but soft in the lightbox

## Technical
- [ ] **Domain**: the café already has **engelsberlin.de**. If this site replaces it, replace `https://cafe-engels.example` in `index.html` (canonical, hreflang, og:url, og:image, JSON-LD url/image/menu), `robots.txt`, `sitemap.xml`
- [ ] **Form backend**: `script.js` → `CONFIG.form` (Formspree endpoint or `mode: 'netlify'`)
- [ ] **Fonts**: optionally self-host (see README, GDPR)

## Legal (required in Germany)
- [ ] **Impressum** (`impressum.html`): owner/company name, legal form, representative, register entry, USt-IdNr., dispute-resolution notice
- [ ] **Datenschutz** (`datenschutz.html`): responsible party, hosting provider, form provider, fonts, rights section. Have it checked
