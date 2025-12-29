# Santiago Moreno - Personal Portfolio Site

For any Hugo-related command or build, check `.github/workflows/*.yml` for the canonical setup and reuse it.

## Project Vision

A personal portfolio website where **each section has its own visual identity** while maintaining cohesive navigation and user-friendliness. The site blends professional CV content with personal expression, giving visitors insight into who Santiago is beyond a traditional résumé.

### Core Principle
Each tab is a **themed experience** — distinct in look and feel, yet unified by consistent navigation and interaction patterns.

---

## Theme Specifications

| Tab | Route | Theme | Visual Concept |
|-----|-------|-------|----------------|
| **Home** | `/` | Classic XVIII | Cream/green/red, elegant serifs, 18th-century refinement |
| **Engineering** | `/engineering/` | Terminal/TUI | Dark greys over blues, monospace, modern CLI aesthetic |
| **Teaching** | `/teaching/` | Blackboard | White chalk on black, handwritten warmth, chalk dust textures |
| **Personal Development** | `/personal-development/` | Organic/Zen | Earthy tones, flowing shapes, calm and growth-oriented |
| **The Artist** | `/the-artist/` | Expressive Classy | Colorful but refined, dynamic yet elegant |
| **My Sky** | `/astrology/` | Celestial | Deep space dark, stars, constellation lines, cosmic calculations |
| **Other Interests** | `/other-interests/` | Hyperion | Golds, bronze, deep reds, epic literary sci-fi aesthetic |

---

## Theme Details

### 1. Home — Classic XVIII
- **Palette**: Cream (`#f5f0e6`), forest green (`#2d5a3d`), burgundy red accents (`#8b2942`)
- **Typography**: Serif headings (e.g., `Georgia`, `Playfair Display`), readable body
- **Elements**: Subtle paper texture, elegant borders, perhaps a wax-seal motif
- **Feel**: Welcoming, warm, like an invitation letter

### 2. Engineering — Terminal/TUI
- **Palette**: Dark charcoal (`#1a1b26`), steel blue (`#7aa2f7`), cyan highlights (`#7dcfff`), grey text (`#a9b1d6`)
- **Typography**: Monospace (`JetBrains Mono`, `Fira Code`, or system mono)
- **Elements**: Box-drawing characters for cards, blinking cursor, scanlines (subtle), command prompt styling
- **Feel**: Modern developer terminal, clean TUI (like `lazygit` or `btop`)
- **Special**: Cards styled as terminal windows with title bars

### 3. Teaching — Blackboard
- **Palette**: Deep black (`#1a1a1a`), chalk white (`#e8e8e8`), muted chalk colors (yellow, pink, blue)
- **Typography**: Handwritten/chalk-style font for headings (e.g., `Architects Daughter`, `Caveat`), clean sans for body
- **Elements**: Chalkboard texture background, chalk dust particles (CSS), slightly imperfect lines
- **Feel**: Classroom warmth, approachable teaching environment

### 4. Personal Development — Organic/Zen
- **Palette**: Sand (`#d4c4a8`), sage green (`#87a878`), warm brown (`#6b5344`), soft cream
- **Typography**: Soft rounded sans-serif, generous spacing
- **Elements**: Flowing organic shapes, perhaps subtle watercolor textures, bamboo/leaf motifs
- **Feel**: Calm, mindful, growth-oriented

### 5. The Artist — Expressive Classy
- **Palette**: Rich but harmonious — deep teal (`#1a4a5e`), coral (`#e07a5f`), gold (`#d4a373`), cream
- **Typography**: Elegant display font for headings, clean body
- **Elements**: Dynamic diagonal lines, color blocks, perhaps paint stroke textures, gallery-style layouts
- **Feel**: Creative, bold but refined, like a well-curated exhibition

### 6. My Sky — Celestial
- **Palette**: Deep space (`#0a0a1a`), star white (`#ffffff`), nebula purples (`#6b4c9a`), cosmic gold (`#ffd700`)
- **Typography**: Clean sans with slight sci-fi feel
- **Elements**: Star field background (CSS/canvas), constellation line drawings, planetary glyphs, subtle glow effects
- **Feel**: Mysterious, cosmic, contemplative

### 7. Other Interests — Hyperion
- **Palette**: Aged gold (`#c9a227`), bronze (`#cd7f32`), deep crimson (`#722f37`), cosmic dark (`#0d1117`)
- **Typography**: Classic serif with subtle futuristic touches
- **Elements**: Geometric patterns (Time Tombs inspired), subtle metallic sheen, pilgrimage/journey motifs
- **Feel**: Epic, literary, timeless yet otherworldly

---

## File Structure

```
assets/scss/
├── main.scss                 # Master entry - imports all
├── _variables.scss           # Base CSS custom properties
├── _base.scss                # Reset, typography, core elements
├── _layout.scss              # Page structure, content-shell, grids
├── _navbar.scss              # Navigation (with theme adaptation hooks)
├── _footer.scss              # Footer (with theme adaptation hooks)
├── _cards.scss               # Reusable card components
├── _transitions.scss         # Page transition effects
└── themes/
    ├── _theme-classic.scss       # Home
    ├── _theme-terminal.scss      # Engineering
    ├── _theme-blackboard.scss    # Teaching
    ├── _theme-organic.scss       # Personal Development
    ├── _theme-celestial.scss     # My Sky
    ├── _theme-artist.scss        # The Artist
    └── _theme-hyperion.scss      # Other Interests

content/
├── _index.md                 # Home page
├── engineering.md            # Engineering tab
├── teaching.md               # Teaching tab
├── personal-development.md   # Personal Development tab
├── astrology.md              # My Sky tab
├── the-artist.md             # The Artist tab
└── other-interests.md        # Other Interests tab

data/
├── engineering/
│   ├── experience.toml       # Engineering work experience
│   └── education.toml        # Engineering-related education
├── teaching/
│   ├── experience.toml       # Teaching work experience
│   └── education.toml        # Teaching-related education/training
├── personal_development/
│   └── practices.toml        # Practices, trainings, certifications
├── astrology/
│   └── content.toml          # Chart info, readings (optional)
├── the_artist/
│   ├── projects.toml         # Theatre, music, dance projects
│   └── media.toml            # Links to videos, performances
└── other_interests/
    ├── languages.toml        # Language skills
    ├── certifications.toml   # Other certifications
    └── hobbies.toml          # Hobbies, misc interests

layouts/
├── _default/
│   ├── baseof.html           # Base template - applies theme class to <body>
│   ├── single.html           # Generic single page (fallback)
│   ├── engineering.html      # Engineering layout (terminal cards)
│   ├── teaching.html         # Teaching layout (blackboard cards)
│   ├── personal-development.html
│   ├── astrology.html        # Celestial layout
│   ├── the-artist.html       # Artist layout (gallery-style)
│   └── other-interests.html  # Hyperion layout
├── partials/
│   ├── nav.html              # Navigation (theme-aware)
│   ├── footer.html           # Footer (theme-aware)
│   ├── head.html             # <head> content (fonts, meta)
│   ├── theme-background.html # Theme-specific background elements
│   └── cards/
│       ├── experience.html   # Experience card partial
│       ├── education.html    # Education card partial
│       ├── project.html      # Project card (artist)
│       └── generic.html      # Generic content card
└── index.html                # Home page layout

static/
├── js/
│   ├── main.js               # Menu toggle, core interactions
│   └── theme-effects.js      # Theme-specific effects (stars, etc.)
├── fonts/                    # Custom fonts if needed
└── images/
    └── textures/             # Background textures (paper, chalk, etc.)
```

---

## Architecture: Theme System

### How Themes Work

1. **Content declares theme** in frontmatter:
   ```yaml
   ---
   title: "Engineering"
   layout: "engineering"
   theme: "terminal"
   ---
   ```

2. **baseof.html** reads theme and applies class:
   ```html
   <body class="theme-{{ .Params.theme | default "classic" }}">
   ```

3. **CSS themes** override base variables:
   ```scss
   .theme-terminal {
     --bg: #1a1b26;
     --text-main: #a9b1d6;
     --accent: #7aa2f7;
     --font-body: 'JetBrains Mono', monospace;
     // ... etc
   }
   ```

4. **Nav/Footer adapt** using theme variables (color changes, not structure)

5. **Theme-specific partials** can be conditionally loaded:
   ```go
   {{ if eq .Params.theme "celestial" }}
     {{ partial "backgrounds/stars.html" . }}
   {{ end }}
   ```

### Page Transitions

Lightweight CSS transitions on `<main>`:
```scss
main {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## Content Migration Plan

### Current → New Data Structure

**From `cv_experience.toml`:**

| Role | Destination |
|------|-------------|
| PMO (Eviden) | `engineering/experience.toml` |
| Agent Credit Control | `engineering/experience.toml` |
| Global Coordination (FOSC) | `engineering/experience.toml` |
| Music Teacher (French Govt) | `teaching/experience.toml` |
| Cellular Modelling (FIAS) | `engineering/experience.toml` |
| PhD Student | `engineering/experience.toml` |
| EEG Data Analysis | `engineering/experience.toml` |
| Quality Testing Intern | `engineering/experience.toml` |
| Neural Modelling Intern | `engineering/experience.toml` |
| Manual Worker (Airbus) | `engineering/experience.toml` |

**From `cv_education.toml`:**
| Item | Destination |
|------|-------------|
| INSA Engineering Degree | `engineering/education.toml` |

**From `cv_links.toml`:**
- Experience links → `engineering/` or remove if placeholder
- Artist links → `the_artist/media.toml`
- Others → respective theme folders or remove placeholders

---

## Implementation Phases

### Phase 1: Foundation (Theme System)
1. Update `baseof.html` to apply theme classes
2. Create `_transitions.scss` for page animations
3. Refactor `_variables.scss` to support theme overrides
4. Create empty theme SCSS files with structure
5. Test with one theme (terminal) as proof of concept

### Phase 2: Data Restructuring
1. Create new `data/` folder structure
2. Migrate existing data to new files
3. Update partials to read from new locations
4. Create reusable card partials

### Phase 3: Theme Implementation
1. **Terminal theme** (Engineering) - full implementation
2. **Blackboard theme** (Teaching) - full implementation
3. **Classic theme** (Home) - refine existing
4. Remaining themes one by one

### Phase 4: Layouts & Content
1. Create custom layouts per theme
2. Add theme-specific background elements
3. Add decorative elements (textures, effects)
4. Polish responsive behavior per theme

### Phase 5: Polish & Effects
1. Add canvas/JS effects where appropriate (stars, etc.)
2. Fine-tune transitions
3. Cross-browser testing
4. Performance optimization

---

## Navigation Structure

```toml
[[menu.main]]
  name = "Engineering"
  url = "/engineering/"
  weight = 10

[[menu.main]]
  name = "Teaching"
  url = "/teaching/"
  weight = 20

[[menu.main]]
  name = "Personal Development"
  url = "/personal-development/"
  weight = 30

[[menu.main]]
  name = "The Artist"
  url = "/the-artist/"
  weight = 40

[[menu.main]]
  name = "My Sky"
  url = "/astrology/"
  weight = 50

[[menu.main]]
  name = "Other Interests"
  url = "/other-interests/"
  weight = 60
```

---

## Testing Checklist

- [ ] Each theme loads correct colors/fonts
- [ ] Navigation remains usable across all themes
- [ ] Footer adapts without breaking
- [ ] Transitions feel smooth (no flash of unstyled content)
- [ ] Mobile responsive on all themes
- [ ] Data displays correctly from new file structure
- [ ] Accessibility: contrast ratios pass WCAG AA
- [ ] Hugo build succeeds without errors
- [ ] GitHub Actions deployment works

---

## Resources & Inspiration

- **Terminal UI**: [Tokyo Night theme](https://github.com/enkia/tokyo-night-vscode-theme), `lazygit`, `btop`
- **Blackboard**: Real classroom aesthetics, chalk lettering
- **Hyperion**: Dan Simmons book covers, Time Tombs art, Shrike imagery
- **Classic XVIII**: 18th-century invitation cards, wax seals, aged paper

---

## Open Questions / Future Considerations

1. **Fonts**: Self-host vs Google Fonts? (Performance vs convenience)
2. **Dark mode toggle**: Should users override system preference?
3. **Print styles**: Needed for CV printing?
4. **i18n**: Future multi-language support?

---

## Build Reference

For Hugo commands, always reference `.github/workflows/hugo.yml`:
```bash
hugo server -D          # Local development
hugo --minify           # Production build
```
