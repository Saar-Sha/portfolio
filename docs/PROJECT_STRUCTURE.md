# Project Structure

```
portfolio/
├── index.html                  ← Homepage
├── css/style.css               ← Full design system + all styles
├── js/main.js                  ← All JavaScript modules
├── data/projects.json          ← ALL project data (edit this to add projects)
├── pages/
│   ├── projects.html           ← Projects browser (Tools + Research tabs)
│   └── about.html              ← Detailed profile page
├── assets/
│   └── saar-sharir-cv.pdf      ← Your resume (replace this file)
├── images/projects/            ← Optional project screenshots
└── docs/                       ← Documentation (this folder)
```

## Architecture

**Design System** — css/style.css contains all CSS variables. Theme switching
sets `data-theme="light"` on `<html>` and variables auto-remap.

**JavaScript Modules** — js/main.js has self-contained modules:
- ThemeManager: dark/light toggle + persistence
- NavManager: sticky nav, mobile menu, active link tracking
- RevealManager: IntersectionObserver scroll animations
- SkillBars: animated skill bar widths
- ProjectsManager: loads projects.json, renders cards, filters, modals
- FeaturedProjects: homepage featured cards
- ContactForm: form submission
- Analytics: pageview + project view logging

**Data Layer** — data/projects.json is the single source of truth for all projects.
No code changes needed to add projects — only edit the JSON.

## Component Classes

| Class | Purpose |
|-------|---------|
| .card | Base card with border and background |
| .card-accent | Card with amber glow on hover |
| .tag | Technology/filter pill |
| .tag.active | Highlighted active filter |
| .btn-primary | Amber filled button |
| .btn-outline | Ghost border button |
| .reveal | Scroll-triggered fade-up animation |
| .reveal-delay-1/2/3 | Stagger animation timing |
| .section-label | Mono uppercase label with accent line |

## Typography

| Font | Use |
|------|-----|
| DM Serif Display | All headings, hero text |
| IBM Plex Mono | Labels, tags, nav, code |
| DM Sans | Body text, descriptions |
