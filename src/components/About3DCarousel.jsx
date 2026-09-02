import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { getCarouselMetaobjectData } from '../services/shopify';
import { optimizeShopifyImage } from '../utils/imageOptimizer';

export default function About3DCarousel() {
  const navigate = useNavigate();
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    getCarouselMetaobjectData().then((data) => {
      if (isMounted && data && data.length > 0) {
        setSlides(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const displayImages = slides.map(s => s.image);

  // Fast product rotation cycle (2.0s)
  useEffect(() => {
    if (displayImages.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [displayImages.length]);

  const handleProductClick = () => {
    const activeSlide = slides[currentIndex];
    if (activeSlide && activeSlide.slug) {
      window.scrollTo(0, 0);
      navigate(`/product/${activeSlide.slug}`);
    } else {
      window.scrollTo(0, 0);
      navigate('/studio');
    }
  };

  return (
    <div className="relative w-full h-[68vh] sm:h-[78vh] lg:h-[90vh] xl:h-[96vh] max-h-[1000px] flex flex-col items-center justify-end pointer-events-none select-none overflow-visible">
      <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
            }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
              exit: { duration: 0.2, ease: 'easeIn' }
            }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end justify-center w-full max-w-[720px] sm:max-w-[820px] lg:max-w-[940px] h-full pointer-events-auto cursor-pointer"
            style={{ transformOrigin: 'bottom center' }}
            onClick={handleProductClick}
          >
            {/* Grounded Micro-motion (Breathing) */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-end justify-center w-full h-full relative"
            >
              
              {/* --- PRODUCT BOTTLE (Extra Large HD Display) --- */}
              <img 
                src={optimizeShopifyImage(displayImages[currentIndex], 800)} 
                alt="Premium Showcase"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                className="relative z-10 w-[135%] sm:w-[125%] lg:w-[730px] xl:w-[810px] object-contain object-bottom h-[64vh] sm:h-[75vh] lg:h-[88vh] xl:h-[94vh] max-h-[960px] mx-auto drop-shadow-[0_25px_45px_rgba(0,0,0,0.4)] translate-y-[15%]"
              />

              {/* --- REFLECTION --- */}
              <img 
                src={optimizeShopifyImage(displayImages[currentIndex], 400)} 
                alt="Reflection"
                loading="lazy"
                decoding="async"
                className="absolute top-[92%] left-1/2 -translate-x-1/2 z-[-4] w-[135%] sm:w-[125%] lg:w-[730px] xl:w-[810px] object-contain object-top h-[64vh] sm:h-[75vh] lg:h-[88vh] xl:h-[94vh] max-h-[960px] opacity-[0.07] pointer-events-none translate-y-[15%]"
                style={{ transform: 'translateX(-50%) scaleY(-1)' }}
              />
              
            </motion.div>
          </motion.div>
      </AnimatePresence>
    </div>
  );
}
