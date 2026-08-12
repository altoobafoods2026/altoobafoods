import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Lenis Smooth Scroll & GSAP ScrollTrigger Integration
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis with fast, snappy physics
const lenis = new Lenis({
  duration: 0.6,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  touchMultiplier: 1.0,
  wheelMultiplier: 1.1,
});

// Update ScrollTrigger on Lenis scroll cleanly
lenis.on('scroll', () => {
  ScrollTrigger.update();
});

// Use standard, independent requestAnimationFrame for Lenis RAF loop
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Auto-resize Lenis when DOM layout changes without heavy ScrollTrigger refreshes
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
