# ADHD-Friendly Design System

## Overview
A professional Astro-based design system implementing ADHD-friendly web design principles with Tailwind CSS. Built with accessibility, cognitive load reduction, and mobile-first responsive design in mind.

**Created:** October 22, 2025
**Framework:** Astro v5.14.8 + Tailwind CSS v4
**Port:** 5000

## Core Features

### ADHD-Friendly Design Principles
- **Minimum 18px body text** across all breakpoints
- **56px minimum touch targets** for all interactive elements
- **High contrast (7:1 ratio)** for optimal readability
- **1.6+ line height** for improved text scanning
- **45-70 character line length** limits to prevent eye fatigue
- **Maximum 3 font sizes per page** to reduce cognitive load

### Responsive Breakpoints
- **Mobile (320-767px):** 18px body, 56px buttons, 45ch max width
- **Tablet (768-1023px):** 20px body, 2-column grids, 60ch max width  
- **Desktop (1024px+):** 22px body, 3-column grids, 70ch max width

## Project Structure
```
src/
├── components/       # Reusable UI components
│   ├── Button.astro  # ADHD-friendly button with size variants
│   ├── Card.astro    # Content card with consistent spacing
│   └── Header.astro  # Sticky navigation header
├── layouts/          # Page layouts
│   └── BaseLayout.astro  # Base HTML structure
├── pages/            # Route pages
│   └── index.astro   # Homepage with design system showcase
└── styles/           # Global styles
    └── global.css    # Tailwind + ADHD design tokens
```

## Design Tokens
Defined in `src/styles/global.css` using CSS custom properties:
- Typography scales for mobile/tablet/desktop
- Touch target sizes (56px, 44px)
- Spacing system (16px, 24px, 20px margins)
- High-contrast color palette
- Line height presets (1.4, 1.6, 1.8)

## Development

### Commands
- `npm run dev` - Start development server on port 5000
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Configuration
- **astro.config.mjs** - Astro settings, port 5000, host 0.0.0.0
- **src/styles/global.css** - Design system tokens and base styles
- Server configured for Replit environment with proper host settings

## Components

### Button
Accessible buttons with variants (primary, secondary, outline) and sizes (sm, md, lg).
All sizes meet minimum 44px touch target on mobile, 56px for medium/large.

### Card  
Consistent content container with optional title, generous padding (24px), and hover effects.

### Header
Sticky navigation with large touch targets (44px minimum) and clear visual hierarchy.

## Deployment
Configured for Replit autoscale deployment:
- Build: `npm run build`
- Preview command configured
- Optimized for serverless deployment

## User Preferences
- Mobile-first approach
- ADHD-friendly sizing and spacing
- Professional, accessible design
- Component-based architecture

## Recent Changes
- **Oct 22, 2025:** Initial setup with Astro + Tailwind
- **Oct 22, 2025:** Implemented complete ADHD design system
- **Oct 22, 2025:** Created Button, Card, Header components
- **Oct 22, 2025:** Built showcase homepage with all principles
- **Oct 22, 2025:** Configured for Replit deployment
