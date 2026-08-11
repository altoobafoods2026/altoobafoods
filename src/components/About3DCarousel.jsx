import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const FALLBACK_IMAGES = [
  '/products/carousel_1.png',
  '/products/carousel_2.png',
  '/products/carousel_3.png',
  '/products/carousel_4.png',
  '/products/carousel_5.png',
];

export default function About3DCarousel({ products = [] }) {
  const navigate = useNavigate();
  const heroProducts = products.filter(p => p.collections && p.collections.includes('hero-section-3d-images'));
  const dynamicImages = heroProducts.map(p => p.images[0]).filter(Boolean);
  const displayImages = dynamicImages.length > 0 ? dynamicImages : FALLBACK_IMAGES;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Removed aggressive preloading to improve initial page load speed

  // Fast product rotation cycle (2.0s)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [displayImages.length]);

  const handleProductClick = () => {
    const dummyProduct = heroProducts[currentIndex];
    if (dummyProduct) {
      const dummyName = dummyProduct.name.toLowerCase().replace(/-/g, ' ');
      
      let searchKeyword = dummyName.split(' ')[0];
      if (dummyName.includes('black seed')) searchKeyword = 'black seed';
      else if (dummyName.includes('kalonji')) searchKeyword = 'kalonji';
      else if (dummyName.includes('qalbina')) searchKeyword = 'qalbina';
      else if (dummyName.includes('talbina')) searchKeyword = 'talbina';
      else if (dummyName.includes('tibb')) searchKeyword = 'tibb';

      const realProduct = products.find(p => 
        (!p.collections || !p.collections.includes('hero-section-3d-images')) && 
        p.name.toLowerCase().includes(searchKeyword)
      );
      
      const targetSlug = realProduct ? realProduct.slug : dummyProduct.slug;
      window.scrollTo(0, 0);
      navigate(`/product/${targetSlug}`);
    }
  };

  return (
    <div className="relative w-full h-[40vh] lg:h-[60vh] max-h-[620px] flex flex-col items-center justify-end pointer-events-none select-none overflow-visible">
      <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
            }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1], // Apple-style fast ease-out
              exit: { duration: 0.2, ease: 'easeIn' }
            }}
            className="relative flex items-end justify-center w-full h-full pb-0 pointer-events-auto cursor-pointer"
            style={{ transformOrigin: 'bottom center' }}
            onClick={handleProductClick}
          >
            {/* Subtle Grounded Micro-motion (Breathing) */}
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex items-end justify-center w-full h-full relative"
            >
              
              {/* --- PRODUCT BOTTLE --- */}
              {/* Mobile: 90% width. Desktop: auto width/tall, viewport relative to prevent cutoff */}
              <img 
                src={displayImages[currentIndex]} 
                alt="Premium Showcase"
                className="relative z-10 w-[70%] sm:w-[55%] lg:w-[340px] xl:w-[380px] object-contain object-bottom h-[30vh] sm:h-[38vh] lg:h-[52vh] xl:h-[58vh] max-h-[580px] sepia-[.15] contrast-[1.05] brightness-[0.95] saturate-[1.10] transform-gpu translate-y-[10%]"
              />

              {/* --- REFLECTION --- */}
              {/* Flipped vertical, highly blurred, low opacity */}
              <img 
                src={displayImages[currentIndex]} 
                alt="Reflection"
                className="absolute top-[88%] z-[-4] w-[70%] sm:w-[55%] lg:w-[340px] xl:w-[380px] object-contain object-top h-[30vh] sm:h-[38vh] lg:h-[52vh] xl:h-[58vh] max-h-[580px] opacity-[0.06] blur-[4px] pointer-events-none translate-y-[10%]"
                style={{ transform: 'scaleY(-1)' }}
              />
              
            </motion.div>
          </motion.div>
      </AnimatePresence>
      

    </div>
  );
}
