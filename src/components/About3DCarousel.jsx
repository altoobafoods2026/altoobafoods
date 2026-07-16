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

  // Preload all product images
  useEffect(() => {
    displayImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [displayImages]);

  // Exact 2.5s cycle for fast premium product changes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayImages.length);
    }, 2500);
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
    <div className="relative w-full h-[40vh] lg:h-[65vh] max-h-[600px] flex flex-col items-center justify-end pointer-events-none select-none overflow-visible">
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
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1], // Apple-style premium ease-out
              exit: { duration: 0.4, ease: 'easeIn' }
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
                className={`relative z-10 w-[75%] sm:w-[55%] lg:w-[320px] xl:w-[360px] object-contain object-bottom h-[30vh] sm:h-[35vh] lg:h-[48vh] xl:h-[55vh] max-h-[550px] sepia-[.15] contrast-[1.05] brightness-[0.95] saturate-[1.10] transform-gpu ${
                  displayImages[currentIndex]?.toLowerCase().includes('kalonji') || 
                  displayImages[currentIndex]?.toLowerCase().includes('black-seed') 
                    ? 'translate-y-[27%]' 
                  : displayImages[currentIndex]?.toLowerCase().includes('talbina') 
                    ? 'translate-y-[24%]' 
                  : displayImages[currentIndex]?.toLowerCase().includes('qalbina') 
                    ? 'translate-y-[21%]' 
                  : displayImages[currentIndex]?.toLowerCase().includes('tibb') 
                    ? 'translate-y-[12%]' 
                  : 'translate-y-[22%]'
                }`}
              />

              {/* --- REFLECTION --- */}
              {/* Flipped vertical, highly blurred, low opacity */}
              <img 
                src={displayImages[currentIndex]} 
                alt="Reflection"
                className={`absolute top-[88%] z-[-4] w-[75%] sm:w-[55%] lg:w-[320px] xl:w-[360px] object-contain object-top h-[30vh] sm:h-[35vh] lg:h-[48vh] xl:h-[55vh] max-h-[550px] opacity-[0.06] blur-[4px] pointer-events-none ${
                  displayImages[currentIndex]?.toLowerCase().includes('kalonji') || 
                  displayImages[currentIndex]?.toLowerCase().includes('black-seed') 
                    ? 'translate-y-[27%]' 
                  : displayImages[currentIndex]?.toLowerCase().includes('talbina') 
                    ? 'translate-y-[24%]' 
                  : displayImages[currentIndex]?.toLowerCase().includes('qalbina') 
                    ? 'translate-y-[21%]' 
                  : displayImages[currentIndex]?.toLowerCase().includes('tibb') 
                    ? 'translate-y-[12%]' 
                  : 'translate-y-[22%]'
                }`}
                style={{ transform: 'scaleY(-1)' }}
              />
              
            </motion.div>
          </motion.div>
      </AnimatePresence>
      

    </div>
  );
}
