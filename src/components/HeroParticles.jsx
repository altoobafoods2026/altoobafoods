import { useEffect, useRef } from 'react';

export default function HeroParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 8 : 30; // Ultra-lightweight on mobile to prevent frame drops

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: isMobile ? Math.random() * 2 + 1.5 : Math.random() * 3 + 2,
        speedY: -(Math.random() * 0.3 + 0.1),
        speedX: Math.random() * 0.2 - 0.1,
        opacity: Math.random() * 0.35 + 0.15,
      });
    }

    const animate = () => {
      // Pause particle rendering if scrolled past hero to save 100% CPU/GPU for page scrolling
      if (window.scrollY < window.innerHeight * 1.2) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 168, 106, ${p.opacity})`;
          ctx.fill();

          p.y += p.speedY;
          p.x += p.speedX;

          if (p.y < -10) {
            p.y = canvas.height + 10;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < -10 || p.x > canvas.width + 10) {
            p.x = Math.random() * canvas.width;
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-1 overflow-hidden opacity-80"
    />
  );
}
