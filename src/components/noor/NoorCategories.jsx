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

  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#FAF7F2] py-10 sm:py-14 md:py-20 overflow-hidden z-10 border-t border-[#0D3B2A]/5">
      {/* ClipPath Definition for Mehrab (Islamic Arch) shape */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="mehrab-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.267 C 0,0.133 0.2,0.067 0.5,0 C 0.8,0.067 1,0.133 1,0.267 L 1,0.96 C 1,0.98 0.97,1 0.94,1 L 0.06,1 C 0.03,1 0,0.98 0,0.96 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-[#0D3B2A] font-bold mb-2 sm:mb-4">
            Shop by Categories
          </h2>
          <p className="text-[#D4A24C] font-sans font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[10px] sm:text-xs md:text-sm">
            Explore our wide range of Islamic remedies
          </p>
        </div>

        {/* Horizontal scroll container on mobile, 6-column grid on desktop */}
        <div className="relative group/slider flex flex-col">
          
          {/* Slider Controls — hidden on mobile, visible on hover on desktop */}
          <div className="hidden lg:flex justify-end gap-3 mb-4 z-40 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300">
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

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar scroll-smooth"
          >
            {categories.map((cat, idx) => (
              <div 
                key={idx}
                className="relative min-w-[130px] sm:min-w-[160px] md:min-w-[200px] lg:min-w-0 aspect-[3/4] sm:aspect-[3/4.3] lg:aspect-[3/4.7] cursor-pointer group snap-center filter drop-shadow-[0_8px_12px_rgba(13,59,42,0.10)] sm:drop-shadow-[0_12px_16px_rgba(13,59,42,0.12)] block"
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
                      loading="lazy"
                      className="w-[100%] h-[85%] object-contain object-bottom group-hover:scale-110 transition-transform duration-[1.5s] ease-out opacity-100 drop-shadow-[0_10px_10px_rgba(0,0,0,0.12)] sm:drop-shadow-[0_15px_15px_rgba(0,0,0,0.15)] pb-6 sm:pb-8"
                    />
                    {/* Subtle warm gradient overlay at bottom for depth */}
                    <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#E8E1D5] via-[#FAF7F2]/80 to-transparent opacity-90 transition-opacity duration-500" />
                  </div>

                  {/* Elegant Text Overlay */}
                  <div className="absolute inset-x-0 bottom-2 sm:bottom-3 md:bottom-4 flex flex-col items-center justify-end text-center z-20 pointer-events-none px-1 sm:px-2">
                    <h3 className="text-[11px] sm:text-sm md:text-lg lg:text-xl font-serif font-bold text-[#0D3B2A] tracking-wide leading-tight drop-shadow-sm">{cat.name}</h3>
                    
                    {/* Expandable gold line */}
                    <div className="w-0 h-[1.5px] sm:h-[2px] bg-[#D4A24C] mt-1.5 sm:mt-2 opacity-0 group-hover:opacity-100 group-hover:w-6 sm:group-hover:w-8 md:group-hover:w-16 transition-all duration-700 ease-out" />
                  </div>
                </div>

                {/* Premium gold outline following Mehrab shape exactly */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-30" viewBox="0 0 100 150" preserveAspectRatio="none">
                  <path
                    d="M 1.5,40 C 1.5,21.5 21.5,11.5 50,1.5 C 78.5,11.5 98.5,21.5 98.5,40 L 98.5,142.5 C 98.5,145.5 95.5,148.5 92.5,148.5 L 7.5,148.5 C 4.5,148.5 1.5,145.5 1.5,142.5 Z"
                    fill="none"
                    stroke="#D4A24C"
                    strokeWidth="2"
                    />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
