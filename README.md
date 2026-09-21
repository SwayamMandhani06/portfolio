# Swayam Mandhani — Software & AI/ML Engineer | Portfolio

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Swayam%20Mandhani-FF6B35?style=for-the-badge&logo=react&logoColor=white)
![React 18](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Award](https://img.shields.io/badge/ACM%20India-Outstanding%20Website%202025-fbbf24?style=for-the-badge&logo=acm&logoColor=black)

**Systems & AI Engineer · Data Analytics · B.Tech Computer Engineering · PCCoE Pune**

[Live Portfolio](https://swayam-mandhani.vercel.app) &nbsp;|&nbsp; [Email](mailto:swayammandhani.work@gmail.com) &nbsp;|&nbsp; [LinkedIn](https://linkedin.com/in/swayam-mandhani) &nbsp;|&nbsp; [GitHub](https://github.com/SwayamMandhani06)

</div>

---

## Executive Overview

A high-performance, editorial software engineering portfolio designed and engineered for **Swayam Mandhani** (Computer Engineering, PCCoE Pune). The platform highlights full-stack web architectures, retrieval-augmented generation (RAG) agents, distributed state synchronization, and published peer-reviewed research.

Engineered with **React 18**, **TypeScript**, **Vite**, **Tailwind CSS**, **Framer Motion**, **Three.js**, and **Lenis** smooth scroll physics.

---

## Core Engineering Features

### 1. Interactive Canvas Physics & 3D Centerpiece
- **Interactive Dot-Grid Field**: Custom 2D HTML5 canvas dot field with real-time cursor repulsion dynamics, spring-back easing, and radial mouse spotlighting. Smoothly falls back to an ambient sine-wave kinetic on touch devices.
- **Three.js Geodesic Wireframe Sphere**: Mathematically constructed icosahedron wireframe with dual-layer glow core, floating particle constellation, and subtle mouse-tilt parallax, strictly isolated to prevent layout collisions.
- **Interactive Information Nodes**: Draggable cards powered by Framer Motion spring physics with velocity tilt and constraint bounds.

### 2. Kinetic Typography & Thematic Systems
- **Editorial Typography Pairing**: Confident display headers (**Clash Display**) paired with classical italic accents (**Instrument Serif**) and clean technical body copy (**Inter**).
- **Text-Scramble Decoders**: Real-time cryptographic glyph cycling on load and cursor interaction.
- **Dynamic Headline Accent Cycling**: Continuous smooth transitions through specialized engineering domains (*production-grade*, *high-throughput*, *data-driven*, *autonomous*, *resilient*, *intelligent*).
- **Dual Noir & Cream Themes**: Instant switching between **Dark Noir** (`#0B0B0C`) and **Warm Editorial Cream** (`#F7F5F0`) with CSS variable tokens and `localStorage` persistence.

### 3. Case Studies & Flagship Deployments
- **Authentic Browser Viewports**: Projects are presented inside responsive macOS/Chrome frames featuring live URLs, SSL indicators, and high-resolution platform screenshots.
- **Direct Live Deployments**:
  - **ExamSense AI**: Academic intelligence and RAG tutoring platform powered by Groq Llama 3.3 and dense vector search ([Live Demo](https://examsense-ai-project.vercel.app/))
  - **Taskly**: Local-first productivity platform with Dexie.js IndexedDB persistence, Supabase Realtime synchronization, and PWA capabilities ([Live Demo](https://taskly-swayam.vercel.app/))
  - **Habit Tracker**: Offline-first daily accountability and streak analytics platform ([Live Demo](https://habit-tracker-swayam.vercel.app/pin?from=%2F))
  - **Retail Sales Intelligence**: End-to-end data pipeline, predictive modeling, and Power BI executive dashboards ([Live Demo](https://retail-sales-intelligence-ten.vercel.app/))
  - **CampusCare**: Role-based facility operations system provisioned via Terraform and Docker on GCP Compute Engine ([GitHub](https://github.com/SwayamMandhani06/CampusCare))

### 4. Interactive Engineering Trajectory
- **Milestone Timeline**: Step-by-step phases covering ACM Student Chapter leadership (winning the **Outstanding Website Award 2025** among 200+ chapters), published research at **AICCoNS 2025**, national statutory copyright registration (**Cert. No. LD-20250168587**), and Power BI analytics engineering at **Chinar Hospitality**.
- **Self-Drawing SVG Guide**: Synchronized vertical line drawing driven by GSAP ScrollTrigger and scroll progress.

### 5. Multi-Channel Connect Architecture
- **Interactive Direct Connect Modal**: Provides immediate 1-click clipboard email copy with visual toast feedback, direct Gmail web compose launcher, WhatsApp chat link, direct telephone dialing, and LinkedIn messaging.
- **Live Local Time (IST)**: Real-time ticking clock displaying local time in Pune, India (`UTC+5:30`) with an active availability status badge.

### 6. Multi-Device Responsiveness
- **Comprehensive Breakpoint Engineering**: Custom layout clamping, word-break protections, and fluid spacing across mobile (320px–414px), tablet (768px), laptop (1024px), and desktop (1440px+) screens.
- **Touch Device Safety**: Pointer-coarse auto-detection to disable custom cursors on touchscreen hardware, preventing scroll lag or touch trapping.

---

## Technical Stack

| Layer | Technology |
|---|---|
| **Framework & Runtime** | React 18.3, TypeScript 5.7, Vite 6.2 |
| **Styling & Design System** | Tailwind CSS 3.4, PostCSS, Custom CSS Token Variables |
| **3D & Canvas Graphics** | Three.js (r128), HTML5 Canvas 2D Context |
| **Animation & Physics** | Framer Motion 12, Spring Dynamics |
| **Scroll Engine** | Lenis Smooth Scroll (`lenis` 1.1), GSAP 3.12, ScrollTrigger |
| **Icons & Typography** | Lucide React, Clash Display, Instrument Serif, Inter |
| **Deployment Target** | Vercel |

---

## Project Structure

```
Portfolio/
├── public/
│   ├── favicon.svg               # Monogram SVG favicon
│   └── projects/
│       ├── examsense.png         # Real ExamSense AI platform screenshot
│       ├── taskly.png            # Real Taskly productivity platform screenshot
│       └── campuscare.png        # CampusCare facility dashboard screenshot
├── src/
│   ├── components/
│   │   ├── core/
│   │   │   ├── CustomCursor.tsx  # Lerp magnetic cursor (hidden on touch devices)
│   │   │   ├── GrainOverlay.tsx  # Analog film grain overlay
│   │   │   ├── Navbar.tsx        # Fixed navigation with live IST clock & theme toggle
│   │   │   └── SmoothScroll.tsx  # Lenis inertia scroll provider
│   │   ├── motion/
│   │   │   ├── AnimatedText.tsx  # Character-by-character reveal
│   │   │   ├── FadeIn.tsx        # Viewport intersection animation
│   │   │   ├── Magnet.tsx        # Magnetic physics wrapper
│   │   │   └── ScrambleText.tsx  # Decipher text scramble
│   │   ├── ui/
│   │   │   ├── ConnectModal.tsx  # Direct channels connect modal
│   │   │   ├── ContactButton.tsx # Primary CTA button with luxury gradient
│   │   │   └── LiveProjectButton.tsx # Secondary interactive ghost button
│   │   └── visual/
│   │       ├── FloatingChips.tsx # Draggable physics cards
│   │       ├── HeroOrbCanvas.tsx # Three.js geodesic wireframe sphere
│   │       └── InteractiveDotGrid.tsx # Canvas cursor-repel dot field
│   ├── context/
│   │   └── ThemeContext.tsx      # Dark Noir / Luxury Cream theme provider
│   ├── data/
│   │   └── portfolioData.ts      # Complete personal, project, and timeline data
│   ├── sections/
│   │   ├── Hero.tsx              # Hero with dot-grid, 3D orb & cycling accents
│   │   ├── MarqueeStrip.tsx      # Dual-row opposing scroll marquee
│   │   ├── About.tsx             # Core philosophy & metrics counters
│   │   ├── JourneyTimeline.tsx   # Engineering roadmap & milestones
│   │   ├── WhatIBuild.tsx        # Interactive capabilities & skill categories
│   │   ├── SelectedWork.tsx      # Flagship projects with browser mockup frames
│   │   ├── MoreExperiments.tsx   # Archive of labs & production tools
│   │   ├── Proof.tsx             # Research paper, IP, and awards
│   │   └── Contact.tsx           # Closing statement & direct connection actions
│   ├── types/
│   │   └── index.ts              # TypeScript interface definitions
│   ├── App.tsx                   # Root composition
│   ├── index.css                 # Theme tokens, font imports, and utilities
│   └── main.tsx                  # Application entry point
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Local Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SwayamMandhani06/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173/`.

4. **Verify TypeScript & Production Build:**
   ```bash
   npm run build
   ```

---

## Step-by-Step Vercel Deployment

Deploying this portfolio to [Vercel](https://vercel.com) takes under 2 minutes:

### Option A: Via GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "feat: complete portfolio build with real screenshots & responsive layout"
   git push origin main
   ```

2. **Import to Vercel:**
   - Log in to [vercel.com](https://vercel.com).
   - Click **"Add New..."** > **"Project"**.
   - Select your `portfolio` repository.

3. **Configure Build Settings (Auto-detected):**
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Deploy:**
   - Click **"Deploy"**.
   - Vercel builds the project and provides your production URL (`https://your-portfolio.vercel.app`).

---

## License & Credits

Designed & Engineered by **Swayam Mandhani**. All rights reserved.
Code is open-source under the [MIT License](LICENSE).
