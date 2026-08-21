import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getProducts, getHeroVideo } from '../services/shopify';
import HeroParticles from '../components/HeroParticles';
import About3DCarousel from '../components/About3DCarousel';
import SplashScreen from '../components/SplashScreen';
import NoorCategories from '../components/noor/NoorCategories';
import NoorBestSellers from '../components/noor/NoorBestSellers';
import NoorBundles from '../components/noor/NoorBundles';
import NoorCompleteCollection from '../components/noor/NoorCompleteCollection';
import NoorQuoteDivider from '../components/noor/NoorQuoteDivider';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [products, setProducts] = useState([]);
  const [heroVideoUrl, setHeroVideoUrl] = useState('/Islamic_Altooba_.mp4');
  const [isLoading, setIsLoading] = useState(true);

  const containerRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [fetchedProducts, fetchedHeroVideo] = await Promise.all([
          getProducts(),
          getHeroVideo('hero_section-video')
        ]);
        setProducts(fetchedProducts);
        if (fetchedHeroVideo) {
          setHeroVideoUrl(fetchedHeroVideo);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();

    let ctx = gsap.context(() => {
      // Clean, lightweight fade-in for hero headline
      if (headlineRef.current) {
        gsap.fromTo(headlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' }
        );
      }

      // Subtext and CTA fade-in delay
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 }
        );
      }
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out', delay: 0.5 }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const heroVideoRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    const section = heroSectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleCTAClick = (e) => {
    e.preventDefault();
    document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const regularProducts = products.filter(p => !(p.collections && p.collections.includes('hero-section-3d-images')));

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* 0. Cinematic Splash Screen (Active until all homepage data is fetched) */}
      <SplashScreen isLoading={isLoading} />

      {/* 1. Fullscreen Hero Section */}
      <section ref={heroSectionRef} className="relative w-full min-h-svh flex flex-col items-center justify-start text-center px-0 md:px-6 pt-[90px] md:pt-[100px] pb-4 md:pb-0 overflow-hidden">
         {/* Background Video */}
        <video
          key={heroVideoUrl}
          ref={heroVideoRef}
          className="absolute inset-0 w-full h-full object-cover object-bottom z-0"
          src={heroVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        
        {/* Cinematic Grading Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0D3B2A]/40 via-transparent to-[#0D3B2A]/20 z-0 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent z-0 pointer-events-none md:block hidden" />
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#FAF7F2]/10 to-transparent pointer-events-none hidden md:block mix-blend-overlay" />

        {/* Floating Golden Particles (Luxury effect) */}
        <HeroParticles />

        {/* Hero Content Wrapper */}
        <div className="relative z-10 w-full h-full flex-grow max-w-7xl mx-auto px-4 sm:px-8 flex flex-col xl:flex-row items-center justify-start xl:justify-between pt-[10vh] xl:pt-0 pb-[30vh] xl:pb-0">
          
          {/* Left: Text, CTA & Trust Badges */}
          <div className="w-full xl:w-[60%] flex flex-col items-center xl:items-start justify-center text-center xl:text-left relative z-30 mt-0">
            {/* Small Golden Leaf Icon */}
            <div className="mb-2 lg:mb-3 xl:mb-4 opacity-90">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C12 2 11 6 7 8C11 8 12 12 12 12C12 12 13 8 17 8C13 6 12 2 12 2Z" fill="#D4A24C"/>
                <path d="M12 22C12 22 13.5 17 18 15C13.5 15 12 10 12 10C12 10 10.5 15 6 15C10.5 17 12 22 12 22Z" fill="#D4A24C" opacity="0.7"/>
              </svg>
            </div>
            {/* Premium Headline */}
            <h1
              ref={headlineRef}
              className="text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-7xl tracking-tight font-serif select-none text-white drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
            >
              <div className="flex flex-wrap justify-center xl:justify-start gap-x-3">
                <span>Reviving</span>
                <span className="text-[#F59E0B] italic font-serif font-extrabold drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">Sunnah,</span>
              </div>
              <div className="flex flex-wrap justify-center xl:justify-start gap-x-3 mt-1">
                <span>restoring</span>
                <span className="text-[#F59E0B] italic font-serif font-extrabold drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">purity.</span>
              </div>
            </h1>

            {/* Short Luxury Description */}
            <div className="max-w-[400px] w-full mt-3 md:mt-4 xl:mt-6">
              <p
                ref={subtextRef}
                className="text-sm md:text-base text-white/95 leading-snug font-sans opacity-0 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] font-medium"
              >
                Embrace the healing wisdom of Tibb-e-Nabawi. Premium organic remedies crafted to nourish soul, mind, and body.
              </p>

              {/* Desktop CTA Premium Pill Button */}
              <div ref={ctaRef} className="mt-4 xl:mt-8 hidden xl:flex justify-start opacity-0">
                <button
                  onClick={handleCTAClick}
                  className="group relative overflow-hidden rounded-full px-8 py-3.5 text-xs font-sans font-extrabold uppercase tracking-[0.15em] bg-gradient-to-r from-[#eec373] via-[#D4A24C] to-[#eec373] text-[#0D3B2A] border-none shadow-[0_8px_25px_rgba(212,162,76,0.4)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    EXPLORE COLLECTION
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </span>
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </button>
              </div>

            </div>
          </div>

          {/* Right: 3D Product Centerpiece */}
          <div className="w-full xl:w-[45%] flex justify-center absolute bottom-[8vh] xl:bottom-0 left-0 right-0 xl:left-auto xl:right-[5%] z-20 pointer-events-none xl:pointer-events-auto xl:mb-[17.5vh]">
            <div className="w-full origin-bottom flex justify-center">
               {products.length > 0 && <About3DCarousel products={products} />}
            </div>
          </div>

        </div>

      </section>

      {/* 2. Text Marquee Strip */}
      <div className="w-full bg-[#203D1E] border-y border-parchment/10 py-3.5 sm:py-4 overflow-hidden relative z-10 select-none [contain:paint]">
        <div className="flex w-max will-change-transform transform-gpu animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
          <div className="flex shrink-0 items-center gap-12 sm:gap-16 text-parchment/80 font-serif italic text-base sm:text-lg md:text-xl pr-12 sm:pr-16">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex items-center gap-4 sm:gap-6 shrink-0">
                <span>Nurturing Wellness, Restoring Purity</span>
                <span className="text-gold font-sans font-bold text-[10px] sm:text-xs uppercase tracking-widest">• AL TOOBA</span>
                <span>Prophetic Tibb-e-Nabawi Remedies</span>
                <span className="text-gold font-sans font-bold text-[10px] sm:text-xs uppercase tracking-widest">• 100% ORGANIC</span>
              </span>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-12 sm:gap-16 text-parchment/80 font-serif italic text-base sm:text-lg md:text-xl pr-12 sm:pr-16" aria-hidden="true">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex items-center gap-4 sm:gap-6 shrink-0">
                <span>Nurturing Wellness, Restoring Purity</span>
                <span className="text-gold font-sans font-bold text-[10px] sm:text-xs uppercase tracking-widest">• AL TOOBA</span>
                <span>Prophetic Tibb-e-Nabawi Remedies</span>
                <span className="text-gold font-sans font-bold text-[10px] sm:text-xs uppercase tracking-widest">• 100% ORGANIC</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Shop By Categories (Noor Remedies) */}
      <NoorCategories products={regularProducts} />

      {/* 4. Best Sellers Section */}
      <div id="explore-section">
        <NoorBestSellers products={regularProducts} />
      </div>

      {/* 5. Bundle & Save (Asymmetric Grid Section) */}
      <NoorBundles products={regularProducts} />

      {/* 6. Complete Collection Section */}
      <NoorCompleteCollection products={regularProducts} />

      {/* 7. Brand Value / Hadith Divider */}
      <NoorQuoteDivider />
    </div>
  );
}
