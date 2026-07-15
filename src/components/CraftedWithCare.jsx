import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getProducts } from '../services/shopify';

export default function CraftedWithCare({ products: propProducts }) {
  const [fetchedProducts, setFetchedProducts] = useState([]);

  useEffect(() => {
    if (!propProducts || propProducts.length === 0) {
      getProducts().then(setFetchedProducts).catch(console.error);
    }
  }, [propProducts]);

  const products = propProducts?.length > 0 ? propProducts : fetchedProducts;

  // Filter for specific products requested by the user
  const targetProductNames = ['talbina', 'kalonji', 'kajonji', 'nibb e nafs', 'tibb e nafs', 'tibb-e-nafs', 'black seed', 'qalbina'];
  
  const sliderProducts = products.filter(p => {
    if (!p.images || p.images.length === 0) return false;
    // Exclude dummy 3D images to ensure we get the real products
    if (p.collections && p.collections.includes('hero-section-3d-images')) return false;
    const nameLower = p.name.toLowerCase();
    const slugLower = p.slug.toLowerCase();
    return targetProductNames.some(target => nameLower.includes(target) || slugLower.includes(target));
  });
  
  // Duplicate the products array to create a seamless infinite loop
  const marqueeItems = [...sliderProducts, ...sliderProducts];

  if (marqueeItems.length === 0) return null;

  return (
    <section className="bg-white py-16 lg:py-20 border-b border-parchment/10 overflow-hidden">
      <div className="w-full">
        <div className="text-center mb-10 md:mb-14">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-4xl md:text-5xl font-serif text-[#0D3B2A] font-bold mb-4"
          >
            Crafted With Care
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ delay: 0.1 }}
            className="text-[#D4A24C] font-sans font-bold tracking-[0.2em] uppercase text-xs md:text-sm"
          >
            Pure, natural ingredients for your wellbeing
          </motion.p>
        </div>
        
        {/* Infinite Marquee Container */}
        <div className="relative flex overflow-hidden w-full group">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {marqueeItems.map((product, idx) => {
              // User specifically wants the 3rd image (index 2)
              const displayImage = product.images[2] || product.images[0];
              
              return (
                <Link 
                  key={`${product.id}-${idx}`} 
                  to={`/product/${product.slug}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[280px] md:h-[280px] flex-shrink-0 rounded-[24px] overflow-hidden bg-[#edf1ea] p-4 flex items-center justify-center relative transition-transform duration-500 hover:shadow-lg mx-3"
                >
                  <div className="w-full h-full relative rounded-[16px] overflow-hidden mix-blend-multiply">
                    <img 
                      src={displayImage} 
                      alt={product.name} 
                      className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
