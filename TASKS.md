# Technical Debt & Improvement Tasks

Ordered by dependency tiers. Tasks within a tier are independent of each other
and can be done in any order or in parallel. Tasks in a later tier should wait
for the tasks they depend on (noted inline).

---

## TIER 0 — Critical Bugs (no dependencies, do first)

These are outright bugs or broken features. Nothing else should be touched before these.

- [x] **T0-1** Fix SCSS syntax error in `assets/scss/_navbar.scss`
  - Line with `padding-left: $space-1.5;` — Sass doesn't support decimal variable names
  - Replace with `padding-left: 0.75rem;` (or `calc(#{$space-1} + 0.25rem)` if referencing tokens)
  - **Impact:** Nav active link styling is currently broken

- [x] **T0-2** Fix border override bug in `assets/scss/themes/_theme-organic.scss`
  - `border-left: 5px solid var(--accent);` is immediately cancelled by the next line `border: none;`
  - Remove the `border: none;` line (or replace it with `border-top: none; border-right: none; border-bottom: none;`)
  - **Impact:** Decorative accent border on Organic theme cards is invisible

- [x] **T0-3** Fix hardcoded year in `layouts/partials/cards/practice-bubbles.html`
  - `{{ $currentYear := 2026 }}` will produce wrong values after 2026
  - Replace with `{{ $currentYear := now.Year }}`
  - **Impact:** Duration calculations become incorrect over time

---

## TIER 1 — Quick Wins (no dependencies)

Isolated fixes, each under 15 minutes, no architectural implications.

- [x] **T1-1** Add `&display=swap` to Google Fonts URL in `layouts/_default/baseof.html`
  - Append `&display=swap` to the fonts URL
  - **Impact:** Eliminates Flash of Unstyled Text (FOUT) on every page load

- [x] **T1-2** Add `defer` attribute to the main JS `<script>` tag in `layouts/_default/baseof.html`
  - Change `<script src="...">` to `<script src="..." defer>`
  - **Impact:** JS no longer blocks HTML parsing; small page speed improvement

- [x] **T1-3** Add `lang` attribute to `<html>` in `layouts/_default/baseof.html`
  - Add `lang="es"` (or make it dynamic via `.Site.LanguageCode` if i18n is added later)
  - **Impact:** Required for screen readers and SEO; WCAG 2.1 Level A criterion

- [x] **T1-4** Add `aria-hidden="true"` to canvas element in `layouts/partials/theme-background.html`
  - Canvas is purely decorative; screen readers should skip it
  - **Impact:** Accessibility; prevents empty canvas being announced to screen readers

- [x] **T1-5** Pin Hugo version in `.github/workflows/hugo.yml`
  - Change `hugo-version: 'latest'` to `hugo-version: '0.120.4'`
  - **Impact:** Reproducible builds; prevents silent breakage from Hugo major releases

- [x] **T1-6** Replace hamburger Unicode `☰` in `layouts/partials/nav.html`
  - Replace the character with an inline SVG (three horizontal lines)
  - **Impact:** Reliable rendering across all platforms and fonts

- [x] **T1-7** Add `prefers-reduced-motion` block to `assets/scss/_transitions.scss`
  - Add at the bottom:
    ```scss
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        transition-duration: 0.01ms !important;
        animation-duration: 0.01ms !important;
      }
    }
    ```
  - Also cancel canvas `requestAnimationFrame` in `theme-background.html` when this media query matches
  - **Impact:** Accessibility for users with vestibular disorders; WCAG 2.1 Level AA

---

## TIER 2 — Config & Params Foundation

These centralise values that are currently hardcoded. **T3 (SEO) and T7 (template
cleanup) both depend on this tier being done first.**

- [x] **T2-1** Move contact/social links to `config.toml` params
  - Add to `config.toml`:
    ```toml
    [params]
      email        = "santiagomj@gmail.com"
      github       = "https://github.com/santimator"
      linkedin     = "https://www.linkedin.com/in/santiagomorenojaureguizar/"
      description  = "Santiago Moreno Jaureguízar — engineer, teacher, artist."
    ```
  - Update `layouts/partials/footer.html` to use `{{ .Site.Params.email }}` etc.
  - **Impact:** Single source of truth; contact details only need updating in one place

- [x] **T2-2** Extract theme-to-data mapping to `config.toml`
  - Add to `config.toml`:
    ```toml
    [params.themeMap]
      terminal  = "engineering"
      blackboard = "teaching"
      classic   = "engineering"
      organic   = "personal_development"
      celestial = "astrology"
      artist    = "the_artist"
      hyperion  = "other_interests"
      bamboo    = "smj"
    ```
  - This unblocks **T7-1** (removing the dict from 5 card partials)
  - **Impact:** Adding a new theme no longer requires editing 5 template files

---

## TIER 3 — Accessibility Fixes

Most are independent. **T3-1 depends on T1-3** (lang attribute should be in place first).

- [x] **T3-1** Add skip link to `layouts/_default/baseof.html`
  - The CSS for `.skip-link` already exists in `_layout.scss` — the HTML element is simply missing
  - Add as first child of `<body>`: `<a class="skip-link" href="#main-content">Skip to content</a>`
  - Add `id="main-content"` to the main content wrapper
  - _Depends on: T1-3 (lang)_
  - **Impact:** Without this, keyboard-only users cannot skip repeated navigation — WCAG 2.1 Level A

- [x] **T3-2** Move footer link text from CSS `::after` to HTML in `layouts/partials/footer.html`
  - `_footer.scss` uses `a[href*="github"]::after { content: "GitHub"; }` etc.
  - CSS-injected content is not reliably read by all screen readers
  - Replace with actual visible text inside `<span>` elements with `aria-hidden="true"` on icon spans
  - **Impact:** Accessibility; also removes a fragile CSS content hack

- [x] **T3-3** Add focus trap to mobile nav in `static/js/main.js`
  - When nav panel is open, Tab and Shift+Tab should cycle within the panel
  - Return focus to the toggle button when nav closes
  - **Impact:** WCAG 2.1 Level AA; keyboard navigation is broken without this on mobile

- [x] **T3-4** Fix celestial flip card hover on touch devices — flip is JS-controlled via `.flipped` class, no CSS `:hover` trigger exists; already correct
  - The flip is triggered by `:hover` in CSS; on iOS this creates a sticky hover state
  - Add CSS reset: `@media (hover: none) { .astro-flip-card:hover .flip-card-inner { transform: none; } }`
  - Flip is already handled by the JS click handler, so CSS hover can be disabled on touch
  - **Impact:** Broken UX on mobile for the astrology section

---

## TIER 4 — SEO Infrastructure

**Depends on T2-1** (site params must exist in config before templates can reference them).

- [x] **T4-1** Create SEO partial and wire it into `baseof.html`
  - Create `layouts/partials/seo.html` with:
    - `<meta name="description" content="...">`
    - `<meta property="og:title">`, `og:description`, `og:type`, `og:url`, `og:image`
    - `<link rel="canonical" href="...">`
  - Include with `{{ partial "seo.html" . }}` in `<head>` of `baseof.html`
  - _Depends on: T2-1_
  - **Impact:** Currently zero SEO meta infrastructure; affects social sharing and search indexing

- [x] **T4-2** Add Schema.org JSON-LD `Person` block to `baseof.html` — included in seo.html partial
  - Inline `<script type="application/ld+json">` with name, url, sameAs (GitHub, LinkedIn)
  - _Depends on: T2-1_ (social URLs from params)
  - **Impact:** Rich results in Google; helps search engines understand the site's purpose

- [x] **T4-3** Fix homepage redirect — added canonical + noindex to redirect page
  - Remove `<meta http-equiv="refresh">` from `layouts/_default/index.html`
  - Use Hugo `aliases` in `content/smj.md` front matter: `aliases: ["/"]`
  - Or configure `defaultContentLanguageInSubdir` in config
  - **Impact:** Meta refresh creates an extra round-trip and is suboptimal for SEO

- [x] **T4-4** Enable Hugo sitemap and configure robots.txt — `enableRobotsTXT = true` added to config.toml; Hugo generates sitemap.xml automatically
  - Add to `config.toml`: `enableRobotsTXT = true`
  - Hugo generates `sitemap.xml` by default; verify it's not being excluded
  - **Impact:** Helps search engines discover and crawl all pages

---

## TIER 5 — Performance Fixes

These are independent of each other but some overlap with SCSS work in T6.

- [x] **T5-1** Add visibility API pause to canvas animation in `theme-background.html`
  - Store the `requestAnimationFrame` ID and cancel it when `document.visibilityState === 'hidden'`
  - Resume on `visibilitychange` to `visible`
  - **Impact:** Stops wasting CPU/GPU when the tab is in the background

- [x] **T5-2** Debounce canvas resize handler in `theme-background.html`
  - `window.addEventListener('resize', resize)` currently reinitialises the full star array on every pixel of resize
  - Wrap with a debounce (e.g. 150ms)
  - **Impact:** Eliminates jank when resizing the browser window

- [x] **T5-3** Remove duplicate terminal scanline effect — removed CSS `::after` fixed overlay from `_theme-terminal.scss`; JS version in `theme-background.html` kept
  - The scanline is created both as a CSS `::after` pseudo-element in `_theme-terminal.scss` AND as a JS-injected div in `theme-background.html`
  - Keep only the JS version (already present, already works); remove the CSS pseudo-element
  - **Impact:** Removes one unnecessary full-screen repaint layer

- [x] **T5-4** Replace celestial CSS star gradients with a static SVG background — 13 radial-gradient layers replaced with single tiled SVG data-URI in both dark mode selectors
  - `_theme-celestial.scss` uses 13 stacked `radial-gradient` calls just for the static star dots
  - Replace with a small SVG data URI or an actual `.svg` file
  - The canvas animation already handles the twinkling — the CSS gradients are redundant
  - **Impact:** Significant paint reduction on the astrology page

- [x] **T5-5** Add `font-display: swap` to SCSS `@font-face` declarations — no local `@font-face` found; all fonts via Google Fonts with `display=swap` already (T1-1)
  - Check if any `@font-face` rules exist in SCSS files; add `font-display: swap`
  - _Note: T1-1 covers the Google Fonts URL; this covers any local declarations_

- [x] **T5-6** Add GitHub Actions build cache to `.github/workflows/hugo.yml` — caches `resources/_gen` keyed on `assets/**` hash
  - Add `actions/cache` step caching `~/.cache/hugo_cache`
  - **Impact:** Faster CI builds

---

## TIER 6 — SCSS Architecture Cleanup

**T6-2 depends on T6-1.** These should be done in order within the tier.

- [x] **T6-1** Create a `@mixin dark-mode` in `assets/scss/_variables.scss`
  - Every theme file duplicates dark mode variable overrides twice:
    once inside `@media (prefers-color-scheme: dark)` and once inside `html[data-theme-mode="dark"]`
  - Create a mixin that accepts a content block and outputs both selectors
    ```scss
    @mixin dark-mode {
      @media (prefers-color-scheme: dark) { @content; }
      html[data-theme-mode="dark"] & { @content; }
    }
    ```
  - **Impact:** Lays groundwork for T6-2; ~240 lines of duplication across 8 theme files

- [x] **T6-2** Apply dark-mode mixin across all 8 theme files
  - Replace the two duplicate dark mode blocks in each `themes/_theme-*.scss` with a single `@include dark-mode { ... }`
  - _Depends on: T6-1_
  - **Impact:** Reduces maintenance surface; any future dark mode tweak only needs changing once per theme

- [x] **T6-3** Consolidate duplicated `.theme-toggle` styles in `_navbar.scss` and `_footer.scss`
  - `.theme-toggle-nav` and `.theme-toggle-footer` share identical base styles (~60 lines each)
  - Extract shared rules to a single `.theme-toggle` block; keep only the layout-specific overrides in each file
  - **Impact:** DRY; reduces CSS output size

- [x] **T6-4** Fix z-index consistency across theme files — z-index scale added to `_variables.scss`; all bare numbers replaced with tokens
  - Create a z-index scale in `_variables.scss`:
    ```scss
    $z-background: -1;
    $z-content:     1;
    $z-overlay:   100;
    $z-nav:       200;
    $z-modal:     300;
    ```
  - Replace all hardcoded `z-index: 1000` etc. with these tokens
  - **Impact:** Prevents stacking context conflicts between themes

---

## TIER 7 — Template & Data Cleanup

**T7-1 depends on T2-2.** T7-2 can be done independently.

- [x] **T7-1** Remove hardcoded theme-to-data dict from all 5 card partials — replaced with `index .Page.Site.Params.themeMap $theme`
  - In `technical-skills.html`, `experience-timeline.html`, `education.html`, `books.html`, `generic.html`:
    remove the `$dataMap := dict ...` block and replace with:
    ```go
    {{ $sectionName := index .Page.Site.Params.themeMap $theme | default "engineering" }}
    ```
  - _Depends on: T2-2_
  - **Impact:** New themes only require updating `config.toml`; removes 5 copies of the same dict

- [x] **T7-2** Consolidate near-identical page layouts
  - `teaching.html`, `personal-development.html`, `the-artist.html`, `other-interests.html`, `projects.html`
    all follow the same pattern: intro card + a fixed set of card partials
  - The list of partials to render can be specified in each page's front matter as a `blocks` list
  - Create a single `layouts/_default/section.html` that iterates `blocks` and renders the right partial
  - **Impact:** 5 layout files reduced to 1; adding a new section only requires front matter, not a new layout

- [x] **T7-3** Standardise data file field names
  - `generic.html` checks for `label`, `title`, and `name` defensively because data files are inconsistent
  - Audit all data files and standardise to one field name (suggest `label`) for card headings
  - Remove the fallback chain from `generic.html`
  - **Impact:** Simpler templates; data files have a clear, documented schema

- [x] **T7-4** Resolve placeholder/broken links in data files
  - `data/astrology/links.toml`: entry with `url = "#"` — remove or fill in
  - `data/other_interests/links.toml`: "Reserved for future links" placeholder — remove empty file or populate
  - **Impact:** No dead links on the live site

---

## TIER 8 — Responsive Design Overhaul

**T8-2 depends on T8-1.** These should be done in order within the tier.

- [x] **T8-1** Create breakpoint mixins in `assets/scss/_variables.scss`
  - Standardise on four named breakpoints and create mobile-first mixins:
    ```scss
    $bp-sm:  480px;
    $bp-md:  768px;
    $bp-lg: 1024px;
    $bp-xl: 1280px;

    @mixin bp($size) {
      @if $size == sm  { @media (min-width: $bp-sm)  { @content; } }
      @if $size == md  { @media (min-width: $bp-md)  { @content; } }
      @if $size == lg  { @media (min-width: $bp-lg)  { @content; } }
      @if $size == xl  { @media (min-width: $bp-xl)  { @content; } }
    }
    ```
  - **Impact:** Single source of truth for breakpoints; prepares for T8-2

- [x] **T8-2** Migrate all media queries to use the breakpoint mixin
  - Replace scattered `@media (max-width: 600px)`, `@media (min-width: 768px)` etc. throughout all SCSS files
    with `@include bp(md) { ... }` etc.
  - Convert `max-width` queries to `min-width` (mobile-first) in the process
  - _Depends on: T8-1_
  - **Impact:** Responsive behaviour becomes consistent and predictable across all themes

- [x] **T8-3** Fix fixed footer overlap
  - `_footer.scss` sets `position: fixed` on desktop with no corresponding `padding-bottom` on `<main>`
  - Add `padding-bottom` to the main content area equal to the footer height
  - Or switch footer to `position: sticky` at the bottom of the page flow
  - **Impact:** Last card/content no longer hidden behind the footer

---

## TIER 9 — Large Structural Refactors

These are the biggest changes. No hard dependencies, but doing TIER 6 first
makes T9-1 easier. TIER 8 should be done before T9-2.

- [x] **T9-1** Split `_theme-celestial.scss` (618 lines) into separate files
  - Extract into:
    - `themes/_theme-celestial.scss` — variables and base overrides only
    - `themes/_theme-celestial-components.scss` — flip cards, enneagram, astro grid
  - Import both in `main.scss`
  - **Impact:** Improves navigability; easier to maintain astrology-specific components separately

- [x] **T9-2** Add i18n support for template strings
  - All section headers (`"Technical Skills"`, `"Experience"`, `"Education"` etc.) are hardcoded English in templates
  - Create `i18n/es.toml` and `i18n/en.toml` with these strings
  - Replace hardcoded strings with `{{ i18n "technical_skills" }}`
  - **Impact:** Makes the multilingual intent of the site (ES/EN/FR) actually achievable

- [x] **T9-3** Add CI/CD validation steps to `.github/workflows/hugo.yml`
  - After `hugo --minify`, add:
    - HTML validation (e.g. `htmltest` or `html-proofer`)
    - Broken link check
    - Optional: Lighthouse CI score gate
  - **Impact:** Catches broken links and regressions before they hit the live site

---

## DEPENDENCY GRAPH (summary)

```
T0-1, T0-2, T0-3  (no deps — do first)
      │
T1-1 through T1-7  (no deps — quick wins)
      │
      ├─ T2-1 ──────────────── T4-1, T4-2, T4-3, T4-4
      │
      ├─ T2-2 ──────────────── T7-1
      │
      ├─ T3-1 (soft dep T1-3)
      │
      ├─ T6-1 ──────────────── T6-2
      │
      ├─ T8-1 ──────────────── T8-2 ──── T8-3
      │
      └─ (independent) T3-2, T3-3, T3-4, T5-1…T5-6, T6-3, T6-4, T7-2…T7-4, T9-1…T9-3
```

---

## Progress legend

- `[ ]` not started
- `[~]` in progress
- `[x]` done
- `[!]` blocked / needs decision
