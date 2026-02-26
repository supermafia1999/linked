# Linked Pasted Due Management

An ultra-premium consulting firm website with sophisticated scroll-driven animations, dark theme with gold accents, and 13 immersive sections.

## Features

- **13 Unique Sections**: Hero, Built for Teams, Clear Process, Results That Last, Built to Scale, Partners in Change, Systems That Stick, Secure by Default, Advisory That Delivers, Always Improving, Ready When You Are, Built for Impact, and Contact
- **Scroll-Driven Animations**: GSAP ScrollTrigger with pinned sections and smooth scene transitions
- **Premium Design**: Dark theme (#0B0B0D) with gold accents (#D4A03A), editorial typography, and circular visual elements
- **Responsive**: Fully responsive design with mobile-optimized navigation
- **Performance**: Optimized build with Vite, lazy loading, and smooth 60fps animations

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- GSAP (ScrollTrigger)
- shadcn/ui components

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment

### GitHub + Vercel Deployment

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/lpdm-website.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click Deploy

3. **Alternative: Vercel CLI**
   ```bash
   npm i -g vercel
   vercel
   ```

## Project Structure

```
├── public/
│   └── images/          # All section images
├── src/
│   ├── components/      # Navigation, UI components
│   ├── sections/        # All page sections
│   ├── App.tsx          # Main app with scroll logic
│   └── index.css        # Global styles
├── dist/                # Production build
└── index.html           # Entry point
```

## Design System

- **Background**: #0B0B0D (near-black)
- **Accent**: #D4A03A (gold)
- **Text Primary**: #F6F6F6
- **Text Secondary**: #B9B9B9
- **Light Section**: #F4F1EA (warm off-white)

## License

© 2026 Linked Pasted Due Management. All rights reserved.
