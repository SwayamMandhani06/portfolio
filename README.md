# Swayam Mandhani — Personal Portfolio (v4 Awwwards / Luxury Gen-Z Direction)

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Swayam%20Mandhani-FF6B35?style=for-the-badge&logo=react&logoColor=white)
![React 18](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Award](https://img.shields.io/badge/ACM%20India-Outstanding%20Website%202025-fbbf24?style=for-the-badge&logo=acm&logoColor=black)

**Full-Stack & AI/ML Engineer · B.Tech Computer Engineering · PCCoE Pune**

[Email](mailto:swayammandhani01@gmail.com) &nbsp;|&nbsp; [LinkedIn](https://linkedin.com/in/swayam-mandhani) &nbsp;|&nbsp; [GitHub](https://github.com/SwayamMandhani06)

</div>

---

## Overview

A high-end, tactile, editorial developer portfolio built for **Swayam Mandhani** inspired by the visual language of top-tier Awwwards portfolios (such as *noahmiles.framer.website*, *eric-cole.framer.website*, and *curtisdesignr.me*).

Built with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion 12**, **GSAP ScrollTrigger**, and **Lenis** smooth inertia scrolling.

### Key Architectural & Motion Highlights

- **Kinetic Typography Pairing**: Bold display typography (**Clash Display** from Fontshare) paired with classical italic accents (**Instrument Serif** from Google Fonts) and crisp body copy (**Inter**).
- **The "One Luxury Accent"**: Single deliberate luxury gradient `linear-gradient(135deg, #FF6B35 0%, #C8102E 50%, #4A0E4E 100%)` strictly isolated to the primary magnetic CTA button, custom cursor dot, and active states.
- **Interactive Canvas Dot-Grid Field**: Fluid 2D canvas grid with cursor repel/displacement physics and a sweeping radial spotlight mask. Falls back to an ambient wave on mobile.
- **Draggable Floating Info Chips**: Physics-based drag-and-drop info cards with velocity-driven tilt and spring snapback (`dragConstraints`, `dragElastic`).
- **Text-Scramble Decode**: Real-time typographic glyph cycling on page load and hover across the hero headline and accents.
- **Dual Theme Switcher**: Instant switching between **Noir (Deep Dark)** (`#0B0B0C`) and **Luxury Cream (Warm Editorial Paper)** (`#F7F5F0`) with smooth CSS variable transitions and `localStorage` persistence.
- **Sticky-Stacking Cards (Selected Work)**: Layered deck-of-cards effect where cards scale down slightly and stack as you scroll through flagship case studies (*ExamSense AI*, *CampusCare*, *Taskly*).
- **Scroll-Drawn Timeline (Journey)**: SVG vertical line that draws itself in sync with scroll progress, revealing milestones along the path.
- **Tactile Magnetic Cursor**: Lerp mouse tracking that fluidly adapts into contextual pills (`DRAG`, `VIEW`) on interactive targets.
- **Scroll-Linked Marquee**: Opposing tech-stack strips dynamically reacting to scroll offset and velocity.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework & Runtime** | React 18.3, TypeScript 5.7, Vite 6.2 |
| **Styling** | Tailwind CSS 3.4, PostCSS, Custom CSS Variables |
| **Motion & Micro-interactions** | Framer Motion 12, Canvas 2D Physics, Custom Springs |
| **Scroll Animation** | GSAP 3.12, ScrollTrigger |
| **Smooth Scrolling** | Lenis (`lenis` 1.1) |
| **Icons** | Lucide React |
| **Deployment Target** | Vercel |

---

## Project Structure

```
Portfolio/
├── public/
│   ├── favicon.svg               # Sleek monogram favicon
│   └── noise.svg                 # Fixed analog film grain texture
├── src/
│   ├── components/
│   │   ├── core/
│   │   │   ├── CustomCursor.tsx  # Dynamic context-pill cursor
│   │   │   ├── GrainOverlay.tsx  # 3.5% opacity analog film grain
│   │   │   ├── Navbar.tsx        # Glassmorphic nav + Theme toggle
│   │   │   └── SmoothScroll.tsx  # Lenis + GSAP ScrollTrigger sync
│   │   ├── motion/
│   │   │   ├── AnimatedText.tsx  # Character scroll opacity reveal
│   │   │   ├── FadeIn.tsx        # Viewport trigger with calm easing
│   │   │   ├── Magnet.tsx        # Magnetic cursor pull physics
│   │   │   └── ScrambleText.tsx  # Typographic decode scramble
│   │   ├── ui/
│   │   │   ├── ContactButton.tsx # Luxury gradient pill button
│   │   │   └── LiveProjectButton.tsx # Ghost outline button
│   │   └── visual/
│   │       ├── FloatingChips.tsx # Draggable floating info chips
│   │       └── InteractiveDotGrid.tsx # Canvas dot grid with repel physics
│   ├── context/
│   │   └── ThemeContext.tsx      # Noir / Luxury Cream theme state
│   ├── data/
│   │   └── portfolioData.ts      # Structured copy, projects, timeline
│   ├── sections/
│   │   ├── Hero.tsx              # Interactive dot grid + chips + typography
│   │   ├── MarqueeStrip.tsx      # Dual opposing scroll-linked ticker
│   │   ├── About.tsx             # Story, character reveal, credibility
│   │   ├── JourneyTimeline.tsx   # Self-drawing SVG timeline
│   │   ├── WhatIBuild.tsx        # Tab switcher + staggered skill cards
│   │   ├── SelectedWork.tsx      # Flagship sticky-stacking cards
│   │   ├── MoreExperiments.tsx   # Secondary projects archive
│   │   ├── Proof.tsx             # AICCoNS paper, Copyright IP, Awards
│   │   └── Contact.tsx           # Magnetic closing CTA + direct links
│   ├── types/
│   │   └── index.ts              # TypeScript schemas
│   ├── App.tsx                   # Main layout container
│   ├── index.css                 # Theme variables & base rules
│   └── main.tsx                  # React DOM root entry
├── index.html                    # HTML shell + Fontshare & Google Fonts CDNs
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Local Development

### Prerequisites

- Node.js `v18+` or `v20+`
- npm `v9+` or `v10+`

### Setup & Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SwayamMandhani06/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview the production build locally**:
   ```bash
   npm run preview
   ```

---

## Deployment to Vercel

You can deploy this project to Vercel in either of two ways:

### Option 1 — Deploy via Vercel Web Dashboard (Recommended & Easiest)

1. Push your updated code to GitHub:
   ```bash
   git add .
   git commit -m "feat: Awwwards luxury Gen-Z portfolio upgrade"
   git push origin main
   ```
2. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
3. Click **"Add New..."** → **"Project"**.
4. Select your `portfolio` repository from the list and click **"Import"**.
5. Vercel automatically detects Vite:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (or `vite build`)
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **"Deploy"**.
7. In ~30 seconds, your site will be live at `https://portfolio-swayam.vercel.app` (or your custom domain).

### Option 2 — Deploy via Vercel CLI

1. Install the Vercel CLI globally (if not already installed):
   ```bash
   npm install -g vercel
   ```
2. Log in to Vercel from your terminal:
   ```bash
   vercel login
   ```
3. Run the deploy command from the project root:
   ```bash
   vercel
   ```
   - Confirm project settings (defaults detected automatically).
4. For production deployment:
   ```bash
   vercel --prod
   ```

---

## License & Credits

- **Design & Engineering**: [Swayam Mandhani](https://github.com/SwayamMandhani06)
- **License**: MIT
- **Fonts**: [Clash Display](https://www.fontshare.com/fonts/clash-display) by Indian Type Foundry / Fontshare · [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) by Rodrigo Fuenzalida & Jordan Runyon · [Inter](https://fonts.google.com/specimen/Inter) by Rasmus Andersson.
