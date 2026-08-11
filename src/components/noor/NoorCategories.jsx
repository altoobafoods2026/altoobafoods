import { useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
export default function NoorCategories({ products = [] }) {
  // Extract unique categories dynamically and map them to category objects
  const uniqueCategories = [...new Set(products.map(p => p.category))];

  const categories = uniqueCategories.map(cat => {
    const firstProduct = products.find(p => p.category === cat);
    return {
      name: cat,
      bg: firstProduct.cardImage || firstProduct.images[0]
    };
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } }
  };

  return (
    <section className="relative bg-[#FAF7F2] py-16 md:py-20 overflow-hidden z-10 border-t border-[#0D3B2A]/5">
      {/* ClipPath Definition for Mehrab (Islamic Arch) shape */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="mehrab-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.267 C 0,0.133 0.2,0.067 0.5,0 C 0.8,0.067 1,0.133 1,0.267 L 1,0.96 C 1,0.98 0.97,1 0.94,1 L 0.06,1 C 0.03,1 0,0.98 0,0.96 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Floating Golden Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1.5 h-1.5 bg-[#D4A24C] rounded-full blur-[1px] opacity-40"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-4xl md:text-5xl font-serif text-[#0D3B2A] font-bold mb-4"
          >
            Shop by Categories
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-[#D4A24C] font-sans font-bold tracking-[0.2em] uppercase text-xs md:text-sm"
          >
            Explore our wide range of Islamic remedies
          </motion.p>
        </div>

        {/* Horizontal scroll container on mobile, 7-column grid on desktop */}
        <div className="relative group/slider flex flex-col">
          
          {/* Slider Controls (Top Right) */}
          <div className="flex justify-end gap-3 mb-4 z-40 lg:opacity-0 lg:group-hover/slider:opacity-100 transition-opacity duration-300 px-6 lg:px-0">
            {/* Left Scroll Button */}
            <button 
              onClick={() => scroll('left')}
              className="bg-white/90 backdrop-blur border border-[#D4A24C]/30 text-[#0D3B2A] w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:bg-[#D4A24C] hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>

            {/* Right Scroll Button */}
            <button 
              onClick={() => scroll('right')}
              className="bg-white/90 backdrop-blur border border-[#D4A24C]/30 text-[#0D3B2A] w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:bg-[#D4A24C] hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          <motion.div 
            ref={scrollContainerRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
            className="flex overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-6 gap-4 sm:gap-6 snap-x snap-mandatory hide-scrollbar scroll-smooth justify-center"
          >
            {categories.map((cat, idx) => (
              <motion.div 
                key={idx}
                variants={itemVariants}
                className="relative min-w-[calc(50%-8px)] md:min-w-[260px] lg:min-w-0 aspect-[3/4.6] lg:aspect-[3/4.7] cursor-pointer group snap-center filter drop-shadow-[0_12px_16px_rgba(13,59,42,0.12)] block"
              >
                <Link to={`/studio?category=${encodeURIComponent(cat.name)}`} className="absolute inset-0 z-50 rounded-xl"></Link>
                
                {/* Clipped Card Body */}
                <div 
                  className="relative w-full h-full overflow-hidden bg-[#FAF7F2]"
                  style={{ clipPath: 'url(#mehrab-clip)' }}
                >
                  {/* Cinematic Image Area */}
                  <div className="absolute inset-0 bg-transparent flex items-center justify-center pt-2">
                    <img 
                      src={cat.bg} 
                      alt={cat.name}
                      className="w-[100%] h-[85%] object-contain object-bottom group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-100 drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)] pb-8"
                    />
                    {/* Subtle warm gradient overlay at bottom for depth */}
                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#E8E1D5] via-[#FAF7F2]/80 to-transparent opacity-90 transition-opacity duration-500" />
                  </div>

                  {/* Elegant Text Overlay */}
                  <div className="absolute inset-x-0 bottom-3 sm:bottom-4 flex flex-col items-center justify-end text-center z-20 pointer-events-none px-2">
                    <h3 className="text-sm sm:text-lg md:text-xl font-serif font-bold text-[#0D3B2A] tracking-wide leading-tight drop-shadow-sm">{cat.name}</h3>
                    
                    {/* Expandable gold line */}
                    <div className="w-0 h-[2px] bg-[#D4A24C] mt-2 opacity-0 group-hover:opacity-100 group-hover:w-8 sm:group-hover:w-16 transition-all duration-700 ease-out" />
                  </div>
                </div>

                {/* Premium gold outline following Mehrab shape exactly */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" viewBox="0 0 100 150" preserveAspectRatio="none">
                  <path
                    d="M 1.5,40 C 1.5,21.5 21.5,11.5 50,1.5 C 78.5,11.5 98.5,21.5 98.5,40 L 98.5,142.5 C 98.5,145.5 95.5,148.5 92.5,148.5 L 7.5,148.5 C 4.5,148.5 1.5,145.5 1.5,142.5 Z"
                    fill="none"
                    stroke="#D4A24C"
                    strokeWidth="2"
                    className="opacity-30 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </svg>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
