/* =========================================================
   Café Engels – script.js
   ---------------------------------------------------------
   EDIT HERE: opening hours, menu and form settings.
   Everything else further down is site logic.
   ========================================================= */

const CONFIG = {
  timeZone: 'Europe/Berlin',

  /* Opening hours. [hours] Please check against your real hours.
     "Ab 10 Uhr, Mo–So" comes from the chalkboard outside; Monday and
     Friday closing times come from the jazz / Weekend Warmup posters.
     The 19:00 closing on other days is still a guess.
     - One or more [open, close] ranges per day, in 24h "HH:MM".
     - Empty list [] = closed all day.
     - Close past midnight is fine, e.g. ['18:00', '01:00'].
     Keep the JSON-LD block in index.html in sync! */
  hours: {
    mon: [['10:00', '23:30']],
    tue: [['10:00', '19:00']],
    wed: [['10:00', '19:00']],
    thu: [['10:00', '19:00']],
    fri: [['10:00', '22:00']],
    sat: [['10:00', '19:00']],
    sun: [['10:00', '19:00']]
  },

  /* Exceptions for specific dates (YYYY-MM-DD). [] = closed. */
  specialDays: {
    // Check la Lage improv show (2nd Thursday, 20:00). [hours] Show end time 22:30 is a guess
    '2026-10-08': [['10:00', '22:30']],
    '2026-11-12': [['10:00', '22:30']],
    '2026-12-10': [['10:00', '22:30']],
    '2027-01-14': [['10:00', '22:30']],
    '2027-02-11': [['10:00', '22:30']],
    '2027-03-11': [['10:00', '22:30']],
    '2027-04-08': [['10:00', '22:30']],
    '2027-05-13': [['10:00', '22:30']],
    // Holidays (samples, please check)
    '2026-12-24': [['10:00', '14:00']],
    '2026-12-25': [],
    '2026-12-26': [],
    '2026-12-31': [['10:00', '16:00']],
    '2027-01-01': []
  },

  /* How many minutes before closing to show "closing soon" */
  closingSoonMinutes: 30,

  /* Reservation form backend. [form-backend]
     mode: 'demo'      – validates and shows success, sends nothing (default)
           'formspree' – set endpoint to 'https://formspree.io/f/XXXXXXX'
           'netlify'   – deploy on Netlify; form is detected automatically */
  form: {
    mode: 'demo',
    endpoint: ''
  },

  /* Menu. [menu] Sample items – replace with your real menu.
     diet: 'vegan' | 'veg' | 'gf'  (any combination)
     price in euros as a number, e.g. 3.9 */
  menu: [
    {
      id: 'drinks',
      title: { de: 'Kaffee & Getränke', en: 'Coffee & Drinks' },
      items: [
        { name: { de: 'Espresso', en: 'Espresso' }, desc: { de: 'Kurz, kräftig, schokoladig.', en: 'Short, bold, chocolatey.' }, price: 2.4, diet: ['vegan', 'gf'] },
        { name: { de: 'Cappuccino', en: 'Cappuccino' }, desc: { de: 'Der Klassiker mit feinem Milchschaum.', en: 'The classic, with silky milk foam.' }, price: 3.6, diet: ['veg', 'gf'] },
        { name: { de: 'Flat White', en: 'Flat White' }, desc: { de: 'Doppelter Espresso, wenig Milch. Klein, stark, ehrlich.', en: 'Double espresso, a little milk. Small, strong, honest.' }, price: 3.9, diet: ['veg', 'gf'] },
        { name: { de: 'Milchkaffee', en: 'Café au lait' }, desc: { de: 'Große Schale, viel Milch, für lange Gespräche.', en: 'Big bowl, lots of milk, made for long chats.' }, price: 3.9, diet: ['veg', 'gf'] },
        { name: { de: 'Chai Latte', en: 'Chai latte' }, desc: { de: 'Hausgemachter Gewürzsirup, Zimt obendrauf.', en: 'Homemade spice syrup, cinnamon on top.' }, price: 4.2, diet: ['veg', 'gf'] },
        { name: { de: 'Tee', en: 'Tea' }, desc: { de: 'Lose Blätter: Earl Grey, Grüntee, Pfefferminze, Rooibos.', en: 'Loose leaf: Earl Grey, green, peppermint, rooibos.' }, price: 3.2, diet: ['vegan', 'gf'] },
        { name: { de: 'Hauslimonade', en: 'House lemonade' }, desc: { de: 'Je nach Saison: Rhabarber, Holunder oder Ingwer-Zitrone.', en: 'Changes with the season: rhubarb, elderflower or ginger-lemon.' }, price: 4.5, diet: ['vegan', 'gf'] },
        { name: { de: 'Frischer O-Saft', en: 'Fresh orange juice' }, desc: { de: 'Frisch gepresst, 0,3 l.', en: 'Freshly squeezed, 0.3 l.' }, price: 4.8, diet: ['vegan', 'gf'] }
      ]
    },
    {
      id: 'breakfast',
      title: { de: 'Frühstück', en: 'Breakfast' },
      items: [
        { name: { de: 'Engels-Frühstück', en: 'Engels breakfast' }, desc: { de: 'Zwei Brötchen, Käse, Aufschnitt, weiches Ei, Butter und Marmelade.', en: 'Two rolls, cheese, cold cuts, soft-boiled egg, butter and jam.' }, price: 12.9, diet: [] },
        { name: { de: 'Kiez-Frühstück vegan', en: 'Vegan Kiez breakfast' }, desc: { de: 'Hummus, Avocado, Ofengemüse, Oliven und Sauerteigbrot.', en: 'Hummus, avocado, roast veg, olives and sourdough.' }, price: 11.9, diet: ['vegan'] },
        { name: { de: 'Rührei auf Sauerteig', en: 'Scrambled eggs on sourdough' }, desc: { de: 'Cremig, mit Schnittlauch und Bergkäse.', en: 'Creamy, with chives and mountain cheese.' }, price: 8.9, diet: ['veg'] },
        { name: { de: 'Shakshuka', en: 'Shakshuka' }, desc: { de: 'Eier in würziger Tomatensoße, Feta, Koriander, Brot.', en: 'Eggs in spicy tomato sauce, feta, coriander, bread.' }, price: 11.5, diet: ['veg'] },
        { name: { de: 'Porridge', en: 'Porridge' }, desc: { de: 'Mit Hafermilch, Obst der Saison und gerösteten Nüssen.', en: 'With oat milk, seasonal fruit and toasted nuts.' }, price: 7.5, diet: ['vegan'] },
        { name: { de: 'Croissant & Marmelade', en: 'Croissant & jam' }, desc: { de: 'Butterig, knusprig, mit Marmelade vom Nachbarn.', en: 'Buttery, flaky, with jam from our neighbour.' }, price: 4.2, diet: ['veg'] }
      ]
    },
    {
      id: 'cakes',
      title: { de: 'Kuchen & Gebäck', en: 'Cakes & Pastries' },
      items: [
        { name: { de: 'Omas Käsekuchen', en: "Grandma's cheesecake" }, desc: { de: 'Ohne Boden, ohne Schnickschnack. Seit Tag eins auf der Karte.', en: 'No base, no fuss. On the menu since day one.' }, price: 4.2, diet: ['veg'] },
        { name: { de: 'Apfelstreusel', en: 'Apple crumble cake' }, desc: { de: 'Mit dicken Streuseln. Sahne gibt’s für 0,80 € dazu.', en: 'Thick crumble topping. Add cream for €0.80.' }, price: 4.2, diet: ['veg'] },
        { name: { de: 'Schoko-Nuss-Kuchen', en: 'Chocolate nut cake' }, desc: { de: 'Saftig, dunkel, vegan und glutenfrei. Keiner merkt’s.', en: 'Moist, dark, vegan and gluten-free. Nobody can tell.' }, price: 4.5, diet: ['vegan', 'gf'] },
        { name: { de: 'Zimtschnecke', en: 'Cinnamon bun' }, desc: { de: 'Frisch aus dem Ofen, meistens bis mittags weg.', en: 'Fresh from the oven, usually gone by noon.' }, price: 3.5, diet: ['veg'] },
        { name: { de: 'Bananenbrot', en: 'Banana bread' }, desc: { de: 'Mit Walnüssen, auf Wunsch getoastet.', en: 'With walnuts, toasted if you like.' }, price: 3.8, diet: ['vegan'] },
        { name: { de: 'Obstkuchen der Saison', en: 'Seasonal fruit cake' }, desc: { de: 'Was der Markt gerade hergibt. Frag am Tresen.', en: "Whatever the market has right now. Ask at the counter." }, price: 4.2, diet: ['veg'] }
      ]
    },
    {
      id: 'meals',
      title: { de: 'Kleine Gerichte', en: 'Light Meals' },
      items: [
        { name: { de: 'Tagessuppe', en: 'Soup of the day' }, desc: { de: 'Mit Brot. Steht an der Tafel.', en: "With bread. It's on the chalkboard." }, price: 6.5, diet: ['vegan'] },
        { name: { de: 'Quiche des Tages', en: 'Quiche of the day' }, desc: { de: 'Mit kleinem Salat und Senf-Vinaigrette.', en: 'With a side salad and mustard vinaigrette.' }, price: 9.5, diet: ['veg'] },
        { name: { de: 'Ziegenkäse-Stulle', en: 'Goat cheese sandwich' }, desc: { de: 'Ziegenkäse, Honig, Walnuss und Rucola auf Roggenbrot.', en: 'Goat cheese, honey, walnut and rocket on rye.' }, price: 8.5, diet: ['veg'] },
        { name: { de: 'Feld-Bowl', en: 'Feld bowl' }, desc: { de: 'Quinoa, Ofengemüse, Hummus, Kerne. Perfekt fürs Picknick auf dem Feld.', en: 'Quinoa, roast veg, hummus, seeds. Perfect for a picnic on the Feld.' }, price: 11.5, diet: ['vegan', 'gf'] },
        { name: { de: 'Lachs-Bagel', en: 'Salmon bagel' }, desc: { de: 'Räucherlachs, Frischkäse, Kapern, rote Zwiebel.', en: 'Smoked salmon, cream cheese, capers, red onion.' }, price: 9.5, diet: [] }
      ]
    }
  ]
};

/* ---------------------------------------------------------
   UI strings used by the script (both languages)
   --------------------------------------------------------- */
const STRINGS = {
  de: {
    openNow: 'Jetzt geöffnet',
    closedNow: 'Gerade geschlossen',
    until: 'bis {t} Uhr',
    closingSoon: 'schließt bald, um {t} Uhr',
    opensToday: 'öffnet heute um {t} Uhr',
    opensTomorrow: 'öffnet morgen um {t} Uhr',
    opensOn: 'öffnet {d} um {t} Uhr',
    closed: 'Geschlossen',
    today: 'Heute',
    dietLabels: { vegan: 'vegan', veg: 'vegetarisch', gf: 'glutenfrei' },
    menuTabsLabel: 'Kategorien der Speisekarte',
    errors: {
      summary: 'Bitte prüfe die markierten Felder.',
      name: 'Wie heißt du?',
      emailMissing: 'Wir brauchen deine E-Mail, um zu antworten.',
      emailInvalid: 'Diese E-Mail-Adresse sieht nicht ganz richtig aus.',
      date: 'Bitte wähle ein Datum.',
      datePast: 'Das Datum liegt in der Vergangenheit.',
      guests: 'Bitte 1 bis 20 Personen angeben.',
      message: 'Maximal 1000 Zeichen, bitte.',
      send: 'Das Senden hat nicht geklappt. Bitte versuch es nochmal oder ruf uns an.'
    },
    sending: 'Wird gesendet …'
  },
  en: {
    openNow: 'Open now',
    closedNow: 'Closed right now',
    until: 'until {t}',
    closingSoon: 'closing soon, at {t}',
    opensToday: 'opens today at {t}',
    opensTomorrow: 'opens tomorrow at {t}',
    opensOn: 'opens {d} at {t}',
    closed: 'Closed',
    today: 'Today',
    dietLabels: { vegan: 'vegan', veg: 'vegetarian', gf: 'gluten-free' },
    menuTabsLabel: 'Menu categories',
    errors: {
      summary: 'Please check the highlighted fields.',
      name: "What's your name?",
      emailMissing: 'We need your email to reply.',
      emailInvalid: "That email address doesn't look quite right.",
      date: 'Please pick a date.',
      datePast: 'That date is in the past.',
      guests: 'Please enter 1 to 20 guests.',
      message: '1000 characters max, please.',
      send: "Sending didn't work. Please try again or give us a call."
    },
    sending: 'Sending …'
  }
};

/* =========================================================
   Site logic (no need to edit below this line)
   ========================================================= */
(function () {
  'use strict';

  const DAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const DIET_ABBR = { vegan: 'VG', veg: 'V', gf: 'GF' };
  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  let lang = root.lang === 'en' ? 'en' : 'de';
  const t = (key) => STRINGS[lang][key];
  const fill = (str, vars) => str.replace(/\{(\w+)\}/g, (_, k) => vars[k]);
  const locale = () => (lang === 'de' ? 'de-DE' : 'en-GB');

  /* ---------- Language ---------- */
  // Remember the German originals of swappable attributes once
  $$('[data-alt-en]').forEach((el) => { el.dataset.altDe = el.getAttribute('alt'); });
  $$('[data-aria-en]').forEach((el) => { el.dataset.ariaDe = el.getAttribute('aria-label'); });
  const titleEl = $('title');
  const metaDesc = $('meta[name="description"]');
  titleEl.dataset.de = titleEl.textContent;
  metaDesc.dataset.de = metaDesc.getAttribute('content');

  function applyLang(next, save) {
    lang = next;
    root.lang = next;
    $$('[data-alt-en]').forEach((el) => { el.alt = el.dataset[next === 'en' ? 'altEn' : 'altDe']; });
    $$('[data-aria-en]').forEach((el) => { el.setAttribute('aria-label', el.dataset[next === 'en' ? 'ariaEn' : 'ariaDe']); });
    document.title = titleEl.dataset[next];
    metaDesc.setAttribute('content', metaDesc.dataset[next]);
    $$('[data-set-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.setLang === next)));

    if (save) {
      try { localStorage.setItem('engels-lang', next); } catch (e) { /* private mode */ }
      const url = new URL(location.href);
      if (next === 'en') url.searchParams.set('lang', 'en'); else url.searchParams.delete('lang');
      history.replaceState(null, '', url);
    }
    renderMenu();
    renderHours();
    updateStatus();
    clearFormErrors();
  }

  $$('[data-set-lang]').forEach((btn) => {
    btn.addEventListener('click', () => applyLang(btn.dataset.setLang, true));
  });

  /* ---------- Header: mobile nav + scroll shadow ---------- */
  const header = $('.site-header');
  const nav = $('#main-nav');
  const navToggle = $('.nav-toggle');
  const ARIA_NAV = { de: ['Menü öffnen', 'Menü schließen'], en: ['Open menu', 'Close menu'] };

  function setNav(open) {
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    const label = ARIA_NAV[lang][open ? 1 : 0];
    navToggle.setAttribute('aria-label', label);
    navToggle.dataset.ariaDe = ARIA_NAV.de[open ? 1 : 0];
    navToggle.dataset.ariaEn = ARIA_NAV.en[open ? 1 : 0];
  }
  navToggle.addEventListener('click', () => setNav(!nav.classList.contains('is-open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setNav(false); navToggle.focus(); }
  });
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('is-open') && !header.contains(e.target)) setNav(false);
  });

  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Time helpers (always Europe/Berlin) ---------- */
  function berlinNow() {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: CONFIG.timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date());
    const p = {};
    parts.forEach(({ type, value }) => { p[type] = value; });
    // Calendar date as a UTC date, so day arithmetic is timezone-free
    const date = new Date(Date.UTC(+p.year, +p.month - 1, +p.day));
    return { date, minutes: (+p.hour % 24) * 60 + +p.minute };
  }
  const addDays = (d, n) => new Date(d.getTime() + n * 86400000);
  const isoDate = (d) => d.toISOString().slice(0, 10);
  const toMin = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };
  const fmtTime = (hhmm) => hhmm.replace(/^0(\d)/, '$1');
  const weekdayName = (d) => new Intl.DateTimeFormat(locale(), { weekday: 'long', timeZone: 'UTC' }).format(d);

  function rangesFor(date) {
    const iso = isoDate(date);
    if (Object.prototype.hasOwnProperty.call(CONFIG.specialDays, iso)) return CONFIG.specialDays[iso];
    return CONFIG.hours[DAY_KEYS[date.getUTCDay()]] || [];
  }

  /* Returns { open: true, closes } or { open: false, nextDayOffset, opens } */
  function getStatus() {
    const { date, minutes } = berlinNow();

    // Open from today's ranges?
    for (const [o, c] of rangesFor(date)) {
      const start = toMin(o); let end = toMin(c);
      if (end <= start) end += 1440; // past midnight
      if (minutes >= start && minutes < end) return { open: true, closes: c, minsLeft: end - minutes };
    }
    // Still open from yesterday's late range?
    for (const [o, c] of rangesFor(addDays(date, -1))) {
      const start = toMin(o); const end = toMin(c);
      if (end <= start && minutes < end) return { open: true, closes: c, minsLeft: end - minutes };
    }
    // Find the next opening within 14 days
    for (let i = 0; i < 14; i++) {
      const day = addDays(date, i);
      const next = rangesFor(day)
        .map(([o]) => o)
        .filter((o) => i > 0 || toMin(o) > minutes)
        .sort((a, b) => toMin(a) - toMin(b))[0];
      if (next) return { open: false, nextDayOffset: i, nextDate: day, opens: next };
    }
    return { open: false };
  }

  /* ---------- Open now badge ---------- */
  function updateStatus() {
    const s = getStatus();
    let main, detail;
    if (s.open) {
      main = t('openNow');
      detail = fill(t(s.minsLeft <= CONFIG.closingSoonMinutes ? 'closingSoon' : 'until'), { t: fmtTime(s.closes) });
    } else {
      main = t('closedNow');
      if (s.opens) {
        const key = s.nextDayOffset === 0 ? 'opensToday' : s.nextDayOffset === 1 ? 'opensTomorrow' : 'opensOn';
        detail = fill(t(key), { t: fmtTime(s.opens), d: weekdayName(s.nextDate) });
      }
    }
    $$('[data-open-status]').forEach((badge) => {
      badge.classList.toggle('is-open', !!s.open);
      badge.classList.toggle('is-closed', !s.open);
      $('.status-text', badge).textContent = detail ? `${main} · ${detail}` : main;
    });
  }

  /* ---------- Opening hours table ---------- */
  function renderHours() {
    const table = $('[data-hours]');
    if (!table) return;
    const { date } = berlinNow();
    const todayIdx = date.getUTCDay();
    // Monday-first week containing today
    const monday = addDays(date, -((todayIdx + 6) % 7));
    const rows = [];
    for (let i = 0; i < 7; i++) {
      const d = addDays(monday, i);
      const ranges = rangesFor(d);
      const isToday = i === (todayIdx + 6) % 7;
      const hours = ranges.length
        ? ranges.map(([o, c]) => `${fmtTime(o)}–${fmtTime(c)}`).join(', ')
        : `<span class="closed">${t('closed')}</span>`;
      rows.push(
        `<tr${isToday ? ' class="is-today" aria-current="date"' : ''}>` +
        `<th scope="row">${weekdayName(d)}${isToday ? ` <span class="today-tag">${t('today')}</span>` : ''}</th>` +
        `<td>${hours}</td></tr>`
      );
    }
    $('tbody', table).innerHTML = rows.join('');
  }

  /* ---------- Menu (accessible tabs) ---------- */
  const menuRoot = $('[data-menu]');
  let activeTab = 0;
  const priceFmt = () => new Intl.NumberFormat(locale(), { style: 'currency', currency: 'EUR' });
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function renderMenu() {
    if (!menuRoot) return;
    const pf = priceFmt();
    const tabs = CONFIG.menu.map((cat, i) =>
      `<button type="button" role="tab" class="menu-tab" id="tab-${cat.id}" aria-controls="panel-${cat.id}"
        aria-selected="${i === activeTab}" tabindex="${i === activeTab ? 0 : -1}">${esc(cat.title[lang])}</button>`
    ).join('');
    const panels = CONFIG.menu.map((cat, i) => {
      const items = cat.items.map((it) => {
        const diets = (it.diet || []).map((d) =>
          `<span class="diet diet-${d}" title="${t('dietLabels')[d]}"><span aria-hidden="true">${DIET_ABBR[d]}</span><span class="sr-only">${t('dietLabels')[d]}</span></span>`
        ).join('');
        return `<li class="menu-item">
          <div class="menu-item-head">
            <h3 class="menu-item-name">${esc(it.name[lang])}</h3>
            <span class="menu-item-dots" aria-hidden="true"></span>
            <span class="menu-item-price">${pf.format(it.price)}</span>
          </div>
          <p class="menu-item-desc">${esc(it.desc[lang])}</p>
          ${diets ? `<div class="menu-item-diets">${diets}</div>` : ''}
        </li>`;
      }).join('');
      return `<div class="menu-panel" role="tabpanel" id="panel-${cat.id}" aria-labelledby="tab-${cat.id}" tabindex="0"${i === activeTab ? '' : ' hidden'}>
        <ul class="menu-list">${items}</ul></div>`;
    }).join('');
    menuRoot.innerHTML = `<div class="menu-tabs" role="tablist" aria-label="${t('menuTabsLabel')}">${tabs}</div>${panels}`;
  }

  function selectTab(i, focus) {
    activeTab = (i + CONFIG.menu.length) % CONFIG.menu.length;
    $$('[role="tab"]', menuRoot).forEach((tab, idx) => {
      const sel = idx === activeTab;
      tab.setAttribute('aria-selected', String(sel));
      tab.tabIndex = sel ? 0 : -1;
      if (sel && focus) { tab.focus(); tab.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }
    });
    $$('[role="tabpanel"]', menuRoot).forEach((p, idx) => { p.hidden = idx !== activeTab; });
  }

  if (menuRoot) {
    menuRoot.addEventListener('click', (e) => {
      const tab = e.target.closest('[role="tab"]');
      if (tab) selectTab($$('[role="tab"]', menuRoot).indexOf(tab), false);
    });
    menuRoot.addEventListener('keydown', (e) => {
      if (!e.target.matches('[role="tab"]')) return;
      const map = { ArrowRight: activeTab + 1, ArrowLeft: activeTab - 1, Home: 0, End: CONFIG.menu.length - 1 };
      if (e.key in map) { e.preventDefault(); selectTab(map[e.key], true); }
    });
  }

  /* ---------- Lightbox (gallery, event posters) ----------
     Every [data-lb-group] is its own set; prev/next stay inside it. */
  const lightbox = $('[data-lightbox]');
  let links = [];
  let lbIndex = 0;
  let lastFocus = null;

  function showImage(i) {
    lbIndex = (i + links.length) % links.length;
    const img = $('img', links[lbIndex]);
    const lbImg = $('[data-lb-img]', lightbox);
    lbImg.src = links[lbIndex].getAttribute('href');
    lbImg.alt = img.alt;
    const count = links.length > 1 ? ` (${lbIndex + 1}/${links.length})` : '';
    $('[data-lb-caption]', lightbox).textContent = img.alt + count;
  }

  if (lightbox && typeof lightbox.showModal === 'function') {
    const LB_LINKS = '.gallery-link, .event-poster';
    $$(LB_LINKS).forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        lastFocus = link;
        links = $$(LB_LINKS, link.closest('[data-lb-group]'));
        $$('.lightbox-nav', lightbox).forEach((b) => { b.hidden = links.length < 2; });
        showImage(links.indexOf(link));
        lightbox.showModal();
        $('[data-lb-close]', lightbox).focus();
      });
    });
    $('[data-lb-close]', lightbox).addEventListener('click', () => lightbox.close());
    $('[data-lb-prev]', lightbox).addEventListener('click', () => showImage(lbIndex - 1));
    $('[data-lb-next]', lightbox).addEventListener('click', () => showImage(lbIndex + 1));
    lightbox.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') showImage(lbIndex - 1);
      if (e.key === 'ArrowRight') showImage(lbIndex + 1);
    });
    // Click on the dark backdrop closes
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });
    lightbox.addEventListener('close', () => { if (lastFocus) lastFocus.focus(); });

    // Basic swipe support
    let touchX = null;
    lightbox.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) showImage(lbIndex + (dx < 0 ? 1 : -1));
      touchX = null;
    });
  }

  /* ---------- Google Map: load only after consent click ---------- */
  const mapBox = $('[data-map]');
  if (mapBox) {
    $('[data-map-load]', mapBox).addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = mapBox.dataset.src;
      iframe.title = lang === 'de' ? 'Karte: Café Engels, Herrfurthstraße 21' : 'Map: Café Engels, Herrfurthstraße 21';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      iframe.allowFullscreen = true;
      mapBox.replaceChildren(iframe);
      iframe.focus();
    });
  }

  /* ---------- Reservation form ---------- */
  const form = $('[data-reserve-form]');
  const success = $('[data-form-success]');
  const summary = $('[data-form-summary]');

  function setError(input, msg) {
    const err = document.getElementById(`${input.id}-err`);
    if (msg) { input.setAttribute('aria-invalid', 'true'); err.textContent = msg; }
    else { input.removeAttribute('aria-invalid'); err.textContent = ''; }
  }

  function clearFormErrors() {
    if (!form) return;
    $$('input, textarea', form).forEach((el) => { if (el.id) setError(el, ''); });
    summary.hidden = true;
  }

  function todayIso() { return isoDate(berlinNow().date); }

  function validateField(el) {
    const E = t('errors');
    const v = el.value.trim();
    switch (el.name) {
      case 'name': return v ? '' : E.name;
      case 'email':
        if (!v) return E.emailMissing;
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : E.emailInvalid;
      case 'date':
        if (!v) return E.date;
        return v < todayIso() ? E.datePast : '';
      case 'guests': {
        const n = Number(v);
        return Number.isInteger(n) && n >= 1 && n <= 20 ? '' : E.guests;
      }
      case 'message': return v.length > 1000 ? E.message : '';
      default: return '';
    }
  }

  async function submitForm(data) {
    const { mode, endpoint } = CONFIG.form;
    if (mode === 'formspree' && endpoint) {
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('Formspree error');
    } else if (mode === 'netlify') {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      });
      if (!res.ok) throw new Error('Netlify error');
    } else {
      // Demo mode: nothing is sent anywhere
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  if (form) {
    const dateInput = $('#f-date', form);
    dateInput.min = todayIso();

    // Validate a field on blur, and re-validate as the user fixes it
    $$('input[id], textarea[id]', form).forEach((el) => {
      el.addEventListener('blur', () => { if (el.value || el.hasAttribute('aria-invalid')) setError(el, validateField(el)); });
      el.addEventListener('input', () => { if (el.hasAttribute('aria-invalid')) setError(el, validateField(el)); });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (form.elements['bot-field'].value) return; // honeypot

      let firstInvalid = null;
      $$('input[id], textarea[id]', form).forEach((el) => {
        const msg = validateField(el);
        setError(el, msg);
        if (msg && !firstInvalid) firstInvalid = el;
      });
      if (firstInvalid) {
        summary.textContent = t('errors').summary;
        summary.hidden = false;
        firstInvalid.focus();
        return;
      }
      summary.hidden = true;

      const btn = $('button[type="submit"]', form);
      const btnHtml = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = t('sending');
      try {
        await submitForm(new FormData(form));
        form.hidden = true;
        success.hidden = false;
        success.focus();
      } catch (err) {
        summary.textContent = t('errors').send;
        summary.hidden = false;
      } finally {
        btn.disabled = false;
        btn.innerHTML = btnHtml;
      }
    });

    $('[data-form-reset]').addEventListener('click', () => {
      form.reset();
      clearFormErrors();
      success.hidden = true;
      form.hidden = false;
      $('#f-name', form).focus();
    });
  }

  /* ---------- Fade-in on scroll ---------- */
  const reveals = $$('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Footer year ---------- */
  $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  /* ---------- Init ---------- */
  applyLang(lang, false);
  // Refresh "open now" every minute; re-render hours if the day changes
  let lastDay = isoDate(berlinNow().date);
  setInterval(() => {
    updateStatus();
    const day = isoDate(berlinNow().date);
    if (day !== lastDay) { lastDay = day; renderHours(); }
  }, 60000);
})();
