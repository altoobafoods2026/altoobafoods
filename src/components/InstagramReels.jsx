import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { getCollectionVideos } from '../services/shopify';

export default function InstagramReels() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [shorts, setShorts] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  
  // Touch swipe state
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  
  // Mobile responsiveness for 3D Math
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;
    
    if (distance > minSwipeDistance && currentIndex < shorts.length - 1) {
      // Swiped left
      setCurrentIndex(prev => prev + 1);
    }
    
    if (distance < -minSwipeDistance && currentIndex > 0) {
      // Swiped right
      setCurrentIndex(prev => prev - 1);
    }
    
    setTouchStartX(0);
    setTouchEndX(0);
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const videos = await getCollectionVideos('videos_instagram');
      setShorts(videos);
      if (videos.length > 0) {
        // Set the center video based on how many we got
        setCurrentIndex(Math.floor(videos.length / 2));
      }
    };
    fetchVideos();
  }, []);

  if (shorts.length === 0) {
    return null; // Or a loading spinner
  }

  return (
    <section className="bg-[#FAF7F2] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#FAF7F2] to-[#FAF7F2] pt-10 pb-4 border-t border-[#D4A24C]/20 relative overflow-hidden flex flex-col items-center">
      
      {/* Header Area */}
      <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-8 mb-12 text-center z-10 relative">

        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-serif font-bold text-[#0D3B2A] mb-4"
        >
          Witness the Purity
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#0D3B2A]/70 max-w-2xl mx-auto font-sans text-sm md:text-base leading-relaxed"
        >
          Explore the authentic essence of Al-Tooba. Watch our videos to discover the rich ingredients, traditional preparation, and real benefits of our Prophetic remedies.
        </motion.p>
      </div>

      {/* Navigation Buttons and Carousel Container */}
      <div className="relative w-full max-w-[1400px] flex items-center justify-center mb-0 sm:mb-2">
        
        {/* Left Button */}
        <button 
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="absolute left-2 sm:left-4 md:left-12 z-50 p-4 rounded-full bg-transparent md:bg-white text-white md:text-[#0D3B2A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:drop-shadow-none hover:bg-[#D4A24C] hover:text-white transition-colors border border-transparent md:border-[#0D3B2A]/10 shadow-none md:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg className="w-8 h-8 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>

        {/* 3D Carousel */}
        <div 
          className="relative w-full h-[650px] flex items-center justify-center perspective-[1000px] touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {shorts.map((short, index) => {
            const diff = index - currentIndex;
            const absDiff = Math.abs(diff);
            const isCenter = absDiff === 0;
            const isAdjacent = absDiff === 1;
            const isOuter = absDiff > 1;

            const shift = isMobile ? 200 : 300;
            const doubleShift = isMobile ? 320 : 500;

            let x = 0;
            if (diff === -2) x = -doubleShift;
            if (diff === -1) x = -shift;
            if (diff === 0) x = 0;
            if (diff === 1) x = shift;
            if (diff === 2) x = doubleShift;

            if (absDiff > 2) return null;

            return (
              <motion.div
                key={short.id}
                onClick={() => !isCenter && setCurrentIndex(index)}
                animate={{
                  x,
                  scale: isCenter ? 1 : isAdjacent ? 0.8 : 0.65,
                  opacity: isCenter ? 1 : isAdjacent ? 0.9 : 0.6,
                  zIndex: 10 - absDiff,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`absolute rounded-[24px] overflow-hidden shadow-2xl bg-white ${
                  isMobile ? 'w-[260px] h-[460px]' : 'w-[340px] h-[600px]'
                }`}
              >
                {/* Native video tag */}
                <video 
                  key={`${short.id}-${isCenter}`}
                  src={short.videoSrc}
                  autoPlay={isCenter}
                  preload="metadata"
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-contain bg-black"
                ></video>

                {/* Mute/Unmute Button for Center Video */}
                {isCenter && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsMuted(!isMuted);
                    }}
                    className="absolute bottom-4 right-4 z-50 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
                  >
                    {isMuted ? (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      </svg>
                    )}
                  </button>
                )}

                {/* Invisible overlay for non-center cards to capture click for rotation and block iframe interaction */}
                {!isCenter && (
                  <div className="absolute inset-0 z-10 cursor-pointer bg-black/5 hover:bg-black/0 transition-colors" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Right Button */}
        <button 
          onClick={() => setCurrentIndex(prev => Math.min(shorts.length - 1, prev + 1))}
          disabled={currentIndex === shorts.length - 1}
          className="absolute right-2 sm:right-4 md:right-12 z-50 p-4 rounded-full bg-transparent md:bg-white text-white md:text-[#0D3B2A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:drop-shadow-none hover:bg-[#D4A24C] hover:text-white transition-colors border border-transparent md:border-[#0D3B2A]/10 shadow-none md:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg className="w-8 h-8 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}
