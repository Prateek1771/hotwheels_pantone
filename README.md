# Hot Wheels × Pantone — Silver Series - 

Demo: Website([https://hotwheels-pantone.vercel.app])
Promo: video[https://youtu.be/CzXD7SorU98] 

An interactive, scroll-driven showcase for the Hot Wheels × Pantone Silver Series collection. Six die-cast vehicles, each paired with a distinct Pantone color, with deep-dive origin stories and full media galleries.

## Features

- **Scroll-snap exhibition** — Smooth sectional scrolling through all 6 cars
- **Car origin modals** — Real car specs, photography, and video for each vehicle
- **Animated intro loader** — Colorful car-strip entrance animation
- **Dynamic progress bar** — Color-coded to the active Pantone swatch
- **Side navigation dots** — Right-side section nav with color preview on hover
- **Remotion video export** — Promo video generation in mobile and desktop formats

## The Collection

| # | Car | Year | Pantone | Color |
|---|-----|------|---------|-------|
| 01 | Nissan Fairlady Z | 1969 | 533 | Deep Navy |
| 02 | Ford Mustang Boss | 1969 | 195 | Burgundy |
| 03 | Twin Mill III | HW Concept | 186 | Hot Wheels Red |
| 04 | VW Panel Bus | 1950 | 021 | Vibrant Orange |
| 05 | Chevrolet Camaro | 1969 | 2013 | Amber Gold |
| 06 | Porsche 911 RWB | 1973 | 123 | Brilliant Yellow |

## Tech Stack

- **React 19** — UI framework
- **Vite 8** — Build tool and dev server
- **Tailwind CSS 4** — Utility styling
- **Remotion 4** — Promotional video generation

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run preview       # Preview production build
npm run lint          # Run ESLint

npm run video:studio  # Open Remotion Studio
npm run video:render  # Render promo videos
```

## Project Structure

```
src/
├── components/
│   ├── App.jsx          # Root app, scroll tracking, section management
│   ├── Intro.jsx        # Hero screen with Pantone swatches
│   ├── Exhibit.jsx      # Individual car showcase section
│   ├── Modal.jsx        # Full-screen origin story modal
│   ├── Finale.jsx       # Closing "Coming Soon" screen
│   ├── Loader.jsx       # Animated page-load strips
│   ├── Nav.jsx          # Fixed header with section counter
│   ├── ProgressBar.jsx  # Scroll progress indicator
│   ├── SideDots.jsx     # Right-side section navigation
│   └── Ticker.jsx       # Animated marquee ticker
├── data/
│   └── cars.js          # Car data, specs, Pantone colors, media paths
└── styles.css           # Animations, layout, custom properties
public/assets/           # Car renders, photos, packaging, videos
video/                   # Remotion composition for promo videos
```

## Video Export

The `/video` directory contains a standalone Remotion project for rendering promotional videos.

```bash
# Desktop (landscape)
npm run video:render -- --composition=HotWheelsPantone-Desktop

# Mobile (portrait)
npm run video:render -- --composition=HotWheelsPantone-Mobile
```

Output: H.264, CRF 18
