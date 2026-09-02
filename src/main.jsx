import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Lenis Smooth Scroll (standalone, no GSAP dependency)
import Lenis from 'lenis';

// Initialize Lenis with fast, snappy physics
const lenis = new Lenis({
  duration: 0.6,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.0,
  wheelMultiplier: 1.1,
});

// Use standard, independent requestAnimationFrame for Lenis RAF loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Auto-resize Lenis when DOM layout changes
if (typeof window !== 'undefined') {
  const resizeObserver = new ResizeObserver(() => {
    lenis.resize();
  });
  if (document.body) {
    resizeObserver.observe(document.body);
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      resizeObserver.observe(document.body);
    });
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
