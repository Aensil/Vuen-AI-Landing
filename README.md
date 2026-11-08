# Vuen AI – Mirror Mirror and Visual Data Agent

One website for two products, with a product switch above each header:

- `/` — Mirror Mirror, the default landing page. Its static source and original assets live in `mirror-mirror/`.
- `/visual-data-agent/` — Visual Data Agent. Its React source remains in `src/`.

Each product keeps its existing copy, colors, fonts, translations, and interactions. The build keeps the two designs in separate documents so their styles do not conflict.

Visual Data Agent is a voice-first product that turns spoken questions into live charts, flows, and dashboards from your own data in seconds.

## What is Vuen AI?

Vuen AI is a business intelligence product that replaces traditional dashboards with a conversational, voice-driven interface. Users speak to a 3D orb and receive real-time visual data responses — bar charts, flow diagrams, metrics cards, and AI-generated insights — drawn live from their connected data sources.

**Core product capabilities:**

- **Voice-First Interface** — Ask questions by speaking; the AI agent listens, understands context, and responds visually
- **Real-Time Visualization** — Charts, graphs, and dashboards are generated on the fly, not pre-built
- **Smart Data Connection** — Connects to SQL databases, file uploads, and API integrations
- **AI-Powered Insights** — Surfaces patterns, anomalies, and recommendations automatically
- **Enterprise Security** — SSO/SAML, on-premise deployment options, SLA guarantees

**Target audience:** Founders/CEOs, Operations teams, Finance & BI analysts, and Real Estate professionals.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 (SWC plugin) |
| Styling | Tailwind CSS 3 + custom design system |
| Routing | React Router v6 |
| SEO | react-helmet-async |
| Icons | Lucide React |
| Font | Inter (Google Fonts) |
| Deployment | GitHub Pages (GitHub Actions CI/CD) |
| Domain | [vuen.ai](https://vuen.ai) |

## Project Structure

```
src/
├── App.tsx                     # Root component with routing
├── main.tsx                    # Entry point
├── components/
│   ├── Header.tsx              # Fixed navigation header
│   ├── CTAButton.tsx           # Reusable call-to-action button
│   ├── CustomCursor.tsx        # Custom cursor effect
│   ├── LanguageSwitcher.tsx    # Language selection dropdown
│   ├── ParticleBackground.tsx  # Animated particle background
│   ├── SEO.tsx                 # Per-page SEO meta tags
│   ├── WaitlistModal.tsx       # Waitlist signup modal
│   └── sections/
│       ├── HeroSection.tsx     # Hero with interactive dashboard mock
│       ├── SocialProofSection.tsx
│       ├── FeaturesSection.tsx # Product features grid
│       ├── TestimonialsSection.tsx
│       ├── PricingSection.tsx  # Free / Pro / Enterprise plans
│       ├── CTASection.tsx      # Final call-to-action
│       ├── Footer.tsx
│       └── ...                 # Additional sections
├── pages/
│   ├── Index.tsx               # Main landing page
│   ├── ComingSoon.tsx          # Placeholder for unbuilt pages
│   └── legal/
│       ├── Privacy.tsx
│       ├── Terms.tsx
│       └── Security.tsx
├── config/
│   └── site.ts                 # Centralized config: domains, SEO, navigation, social links
├── hooks/
│   ├── useLanguage.tsx         # Language context provider
│   ├── useTranslation.ts      # Translation hook (i18n)
│   └── useTheme.tsx            # Dark/light mode with system preference detection
├── i18n/
│   ├── index.ts                # Translation loader with English fallback
│   └── translations/
│       ├── en.json             # English (default)
│       ├── es.json             # Spanish
│       ├── fr.json             # French
│       ├── zh.json             # Mandarin Chinese
│       ├── hi.json             # Hindi
│       └── ar.json             # Arabic
└── lib/
    ├── languageDetection.ts    # Auto-detect language via IP geolocation
    └── supabaseclient.ts       # Supabase client (legacy, login redirects to app.vuen.ai)
```

## Design System

The site uses a custom **"Serious Future"** design language built on Tailwind CSS:

- **Color palette:** Deep blue-black void (`#05070F`) backgrounds with a teal (`#00E5C8`) + violet (`#D946EF`) + indigo (`#7C5CFA`) accent triad
- **Glass morphism:** Frosted glass panels with subtle borders and backdrop blur
- **Orb animations:** Breathing, listening, thinking, and speaking states for the product's signature 3D orb
- **Glow effects:** Layered radial gradients and box shadows for depth
- **Dark/Light mode:** Automatic system preference detection with manual override, FOUC prevention via inline script

## Internationalization

The site supports 6 languages with automatic detection:

1. **English** (default)
2. **Spanish** — full LATAM + Spain coverage
3. **French** — France, Canada, West/Central Africa
4. **Mandarin Chinese** — China, Taiwan, Hong Kong, Singapore
5. **Hindi** — India
6. **Arabic** — MENA region

Language is auto-detected via IP geolocation (ipapi.co) and browser preferences, with localStorage persistence.

## Getting Started

### Prerequisites

- Node.js >= 18
- npm

### Development

```bash
# Install dependencies
npm ci

# Build both products, then serve the combined site (port 4173)
npm run build
npm run dev

# Edit Visual Data Agent with Vite live reload (port 8082)
npm run dev:visual-data-agent

# Type-check
npm run type-check

# Lint
npm run lint

# Production build
npm run build

# Preview the latest combined build (rebuild after source changes)
npm run preview
```

### Environment

No environment variables are required for the landing page. The app redirects authentication to `app.vuen.ai`.

## Deployment

The site deploys automatically to GitHub Pages on every push to `main` via the `.github/workflows/deploy.yml` workflow:

1. Checks out code
2. Installs dependencies (`npm ci`)
3. Builds Visual Data Agent under `dist/visual-data-agent/`, copies Mirror Mirror to `dist/`, and emits HTML files for Visual Data Agent deep links
4. Copies the Mirror Mirror entry to the root `404.html` fallback
5. Deploys the `dist/` directory to GitHub Pages

The custom domain `vuen.ai` is configured via the root `CNAME` file, which the combined build copies to `dist/CNAME`. Visual Data Agent legal and placeholder routes have their own `index.html` files so direct navigation and refresh work on GitHub Pages.

## Build Optimizations

- **Code splitting:** Vendor chunks for `react`, `react-dom`, `react-router-dom`, and `react-helmet-async`
- **Lazy loading:** Legal pages and placeholder pages are lazy-loaded with `React.lazy` + `Suspense`
- **Minification:** Terser with console/debugger stripping in production
- **SWC:** Uses `@vitejs/plugin-react-swc` for faster compilation than Babel

## License

UNLICENSED — Proprietary software. All rights reserved.
