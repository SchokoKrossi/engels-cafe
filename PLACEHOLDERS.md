# Placeholder checklist

Search the project for `[` to find any leftovers. Items marked **(verify)** are pre-filled with my best guess. Please confirm them.

## Business facts
- [x] **Address**: `Herrfurthstraße 21, 12049 Berlin` (from the event posters and the street sign in the exterior photo). Already updated everywhere
- [x] **Phone**: 030 279 761 07 (from Google Maps)
- [x] **Email**: info@engelsberlin.de (general), events@engelsberlin.de (private events pop-up)
- [x] **Opening hours** (from the café, Oct 2026): Mon 10–20 (+ jazz 20–23:30), Tue 11–17, Wed closed. Thu/Sat/Sun 10–19 and Fri 10–22 match Google Maps
- [ ] **Holiday hours**: `script.js` → `CONFIG.specialDays` (samples for Christmas/New Year)
- [ ] **Price range**: JSON-LD `priceRange` (`€`)
- [x] **Instagram**: `@engelsberlin`

## Content
- [x] **About text**: "Kaffee, Brunch & Events" (from the café, Oct 2026)
- [x] **Founding year**: removed from the site on request
- [ ] **Menu**: hidden for now (`hidden` on the menu section). To show it: fill `CONFIG.menu` with the real menu, remove `hidden`, point nav + hero button back to `#menu`
- [ ] **Allergen info**: confirm "Oat or soy milk at no extra charge" and the allergen line
- [x] **Reviews**: shows the Google rating (4.4 from 865, as of Oct 2026) and the most-mentioned topics. Update the numbers now and then. To show actual quotes, get the reviewers' OK first (template is commented out in the reviews section)
- [ ] **Events**: Blue Moonday Jazz (Mon 20:00–23:30), Check la Lage improv (2nd Thu, 20:00, dates through 13.5.2027) and Weekend Warmup (Fri 18–22), taken from the posters. Check they're still running and that it's OK to name Charlotte Joerges. Update the improv dates in `index.html` and `CONFIG.specialDays` when the next season is announced. **The 22:30 show end is a guess**
- [x] **Good to know / accessibility**: one step with a ramp, cellar events not wheelchair accessible, prams, dogs, self-service with table service at weekend brunch, outdoor seating, Wi-Fi
- [x] **Payment**: cash and card. Optionally add which cards / Apple Pay

- [ ] **Jam Session**: last Thursday, 20:00, poster "Jam of Hearts" (29.10.). Swap poster + "Nächste:" line for each edition. End time 22:30 is still a guess
- [ ] **Private events** (optional): capacity, which rooms (café / cellar), catering, prices

## Photos (`images/`)
- [x] Logo: traced to crisp SVGs (`logo-engels.svg` header, `logo-engels-full*.svg` footer/Google) and a matching favicon. If you have the original vector logo (SVG/AI/EPS), swap it in for a perfect result
- [x] Real photos are in: hero, about, 12 gallery photos, 2 event posters, exterior and `og-image.jpg`
- [ ] **Image rights**: make sure you may use every photo. Most come from Instagram. `exterior-corner-herrfurthstrasse`, `counter-daytime-menu-boards`, `breakfast-plate`, `muesli-bowl` and `dining-room-panorama` look like they come from press, blog or review sites. Ask the photographer or replace them
- [ ] **People in photos**: guests are recognisable in `terrace-summer`, `window-bar-seats` and the exterior shot. Under German law (Recht am eigenen Bild / GDPR) you should have their OK or use other shots
- [ ] **About photo**: currently the shop window. A photo of the owners/team would be warmer
- [ ] Higher resolution photos would help. The Instagram screenshots are only about 560px wide, which is fine in the grid but soft in the lightbox

## Technical
- [ ] **Domain**: the café already has **engelsberlin.de**. If this site replaces it, replace `https://cafe-engels.example` in `index.html` (canonical, hreflang, og:url, og:image, JSON-LD url/image/menu), `robots.txt`, `sitemap.xml`
- [x] **Reservations**: Lightspeed widget embedded. ⚠️ Lightspeed profile shows postcode 10249 instead of 12049, fix it in Lightspeed
- [ ] **Fonts**: optionally self-host (see README, GDPR)

## Legal (required in Germany)
- [ ] **Impressum** (`impressum.html`): owner name / company + legal form, representative, register entry and USt-IdNr. if any, person responsible under § 18 MStV
- [ ] **Datenschutz** (`datenschutz.html`): owner name, Lightspeed contract partner, check whether the Lightspeed widget sets cookies. Have it checked
