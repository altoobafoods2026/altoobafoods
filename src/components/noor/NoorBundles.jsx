import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import { useToastStore } from '../../store/toastStore';
import { optimizeShopifyImage } from '../../utils/imageOptimizer';

export default function NoorBundles({ products = [] }) {
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  // Filter real Wellness Kits and Combos from Shopify products
  const kits = products.filter(p => 
    p.category === 'Wellness Kit' ||
    p.collections?.some(c => c.toLowerCase().includes('wellness')) ||
    p.name.toLowerCase().includes('kit') ||
    p.name.toLowerCase().includes('hamper') ||
    p.slug.includes('wellness') ||
    p.slug.includes('kit')
  );

  // Fallbacks from top store remedies if fewer than 3 kits are in catalog
  const otherCombos = products.filter(p => 
    !kits.some(k => k.id === p.id) && (p.slug.includes('talbina') || p.slug.includes('ajwa') || p.slug.includes('shilajit'))
  );

  const heroProduct = kits[0] || products[0];
  const stackedProduct1 = kits[1] || otherCombos[0] || products[1];
  const stackedProduct2 = kits[2] || otherCombos[1] || products[2];

  if (!heroProduct) return null;

  const heroBundle = {
    id: heroProduct.id,
    productRef: heroProduct,
    name: heroProduct.name,
    slug: heroProduct.slug,
    badge: 'WELLNESS KIT',
    discountBadge: heroProduct.discount > 0 ? `SAVE ${heroProduct.discount}%` : (heroProduct.mrp > heroProduct.price ? `SAVE ${Math.round(((heroProduct.mrp - heroProduct.price) / heroProduct.mrp) * 100)}%` : 'BEST VALUE'),
    itemsCount: 'Complete Care Bundle',
    itemsList: heroProduct.shortDesc || heroProduct.description?.substring(0, 95) || 'Authentic Prophetic Wellness Kit with Complete Nutrition & Pure Herbal Care',
    price: heroProduct.price,
    mrp: heroProduct.mrp > heroProduct.price ? heroProduct.mrp : heroProduct.price * 1.2,
    image: (heroProduct.descriptionImages && heroProduct.descriptionImages[0]) || heroProduct.cardImage || heroProduct.images?.[0] || '',
    inStock: heroProduct.inStock
  };

  const rawStacked = [stackedProduct1, stackedProduct2].filter(Boolean);
  const stackedBundles = rawStacked.map((prod, idx) => {
    let cleanDesc = prod.shortDesc || prod.description || '';
    if (cleanDesc.startsWith(prod.name)) {
      cleanDesc = cleanDesc.replace(prod.name, '').trim();
    }
    cleanDesc = cleanDesc.replace(/^[•\s\-\:]+/, '').trim();
    if (!cleanDesc) {
      cleanDesc = 'Authentic prophetic formula for holistic daily vitality and natural wellness';
    }

    return {
      id: prod.id,
      productRef: prod,
      name: prod.name,
      slug: prod.slug,
      badge: prod.category === 'Wellness Kit' ? 'WELLNESS KIT' : 'SPECIAL VALUE',
      itemsCount: 'HOLISTIC SUNNAH REMEDY',
      itemsList: cleanDesc.substring(0, 85),
      price: prod.price,
      mrp: prod.mrp > prod.price ? prod.mrp : prod.price * 1.2,
      image: prod.cardImage || prod.images?.[0] || '',
      inStock: prod.inStock
    };
  });

  const handleAddBundle = (e, bundle) => {
    e.preventDefault();
    e.stopPropagation();

    if (bundle.productRef) {
      if (!bundle.inStock) {
        showToast('This product is currently out of stock', 'error');
        return;
      }
      addItem(bundle.productRef);
    } else {
      addItem({
        id: bundle.id,
        name: bundle.name,
        price: bundle.price,
        mrp: bundle.mrp,
        image: bundle.image,
        quantity: 1,
        variantId: `${bundle.id}-default`,
      });
    }

    showToast(`Added "${bundle.name}" to your cart! 🛍️`, 'success');
  };

  return (
    <section className="relative bg-[#FAF7F2] py-8 sm:py-10 md:py-14 overflow-hidden border-t border-[#D4A24C]/15">
      {/* Decorative Subtle Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A24C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0D3B2A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Header Area with Top Right Action Button */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#0D3B2A]/5 border border-[#0D3B2A]/10 text-[#0D3B2A] text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-2 sm:mb-3"
            >
              <span>Curated Collections & Hampers</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-serif text-[#0D3B2A] font-bold mb-2 sm:mb-3 tracking-tight"
            >
              Wellness Kits & Hampers
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-[#0D3B2A]/70 font-sans text-sm md:text-base max-w-xl font-medium leading-relaxed"
            >
              Thoughtfully crafted all-in-one wellness kits & gift hampers tailored for daily health and holistic Sunnah healing.
            </motion.p>
          </div>
          
          {/* Top Right Corner Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="shrink-0"
          >
            <Link
              to="/studio?category=Wellness%20Kit"
              className="inline-flex items-center gap-2 bg-transparent border border-[#D4A24C] text-[#0D3B2A] hover:bg-[#0D3B2A] hover:text-[#FAF7F2] hover:border-transparent px-5 sm:px-8 py-2 sm:py-3.5 rounded-full font-sans font-bold text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group/btn"
            >
              <span>Explore All Wellness Kits</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover/btn:translate-x-1 transition-transform text-[#D4A24C]" />
            </Link>
          </motion.div>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT: Large Featured Hero Card (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col h-full"
          >
            <div className="group relative bg-white rounded-[16px] sm:rounded-[28px] overflow-hidden border border-[#D4A24C]/20 shadow-[0_6px_25px_rgba(13,59,42,0.06)] hover:shadow-[0_20px_50px_rgba(13,59,42,0.12)] transition-all duration-500 flex flex-col justify-between h-full">
              
              {/* Clickable Image Container */}
              <div className="relative w-full flex-1 min-h-[180px] sm:min-h-[260px] overflow-hidden bg-[#FAF7F2] flex items-center justify-center block">
                <Link to={`/product/${heroBundle.slug}`} className="w-full h-full flex items-center justify-center">
                  <img 
                    src={optimizeShopifyImage(heroBundle.image, 600)} 
                    alt={heroBundle.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full max-h-[240px] sm:max-h-[330px] md:max-h-[350px] object-cover sm:object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </Link>
              </div>

              {/* Bottom Info Bar */}
              <div className="p-4 sm:p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-gray-100 bg-white">
                <Link to={`/product/${heroBundle.slug}`} className="flex-1 hover:no-underline min-w-0">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-[#0D3B2A] group-hover:text-[#8A5E12] transition-colors leading-snug truncate">
                    {heroBundle.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0D3B2A]/70 font-sans line-clamp-2 mt-1 leading-relaxed">
                    {heroBundle.itemsList}
                  </p>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mt-2 sm:mt-3">
                    <span className="text-xl sm:text-2xl font-sans font-extrabold text-[#0D3B2A] tracking-tight">
                      ₹{heroBundle.price.toLocaleString('en-IN')}
                    </span>
                    {heroBundle.mrp > heroBundle.price && (
                      <span className="text-xs sm:text-sm font-sans font-medium text-gray-500 line-through">
                        ₹{heroBundle.mrp.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </Link>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={(e) => handleAddBundle(e, heroBundle)}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#0D3B2A] text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg sm:rounded-2xl font-sans font-bold text-[10px] sm:text-xs uppercase tracking-widest hover:bg-[#8A5E12] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer group/btn ${!heroBundle.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{heroBundle.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                    {heroBundle.inStock && (
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    )}
                  </button>
                </div>
              </div>

            </div>
          </motion.div>

          {/* RIGHT: Two Stacked Horizontal Cards (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4 sm:gap-6">
            {stackedBundles.map((bundle, idx) => (
              <motion.div
                key={bundle.id}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex-1"
              >
                <div className="group bg-white rounded-[18px] sm:rounded-[24px] p-3.5 sm:p-5 md:p-6 border border-[#D4A24C]/15 shadow-[0_6px_25px_rgba(13,59,42,0.04)] hover:shadow-[0_16px_35px_rgba(13,59,42,0.09)] hover:border-[#D4A24C]/40 transition-all duration-400 flex flex-row items-stretch gap-3.5 sm:gap-5 md:gap-6 h-full overflow-hidden">
                  
                  {/* Left: Thumbnail Image */}
                  <Link to={`/product/${bundle.slug}`} className="relative w-24 sm:w-36 md:w-40 aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF7F2] shrink-0 border border-gray-100 shadow-inner flex items-center justify-center p-2 sm:p-3.5">
                    <img 
                      src={optimizeShopifyImage(bundle.image, 350)} 
                      alt={bundle.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Right: Info, Price, Button — all stacked vertically */}
                  <div className="flex flex-col justify-between flex-1 min-w-0 overflow-hidden">
                    <Link to={`/product/${bundle.slug}`} className="hover:no-underline min-w-0 block">
                      <span className="text-[8px] sm:text-[9px] font-sans font-bold uppercase tracking-widest text-[#8A5E12] block truncate mb-0.5">
                        {bundle.badge} • {bundle.itemsCount}
                      </span>
                      <h4 className="font-serif font-bold text-[13px] sm:text-base md:text-lg text-[#0D3B2A] group-hover:text-[#D4A24C] transition-colors leading-snug truncate">
                        {bundle.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs text-[#0D3B2A]/70 font-sans line-clamp-2 mt-0.5 sm:mt-1 leading-relaxed">
                        {bundle.itemsList}
                      </p>
                    </Link>

                    {/* Price */}
                    <div className="flex items-baseline gap-1.5 mt-2">
                      <span className="text-base sm:text-lg md:text-xl font-sans font-extrabold text-[#0D3B2A] tracking-tight">
                        ₹{bundle.price.toLocaleString('en-IN')}
                      </span>
                      {bundle.mrp && bundle.mrp > bundle.price && (
                        <span className="text-[10px] sm:text-xs font-sans font-medium text-gray-400 line-through">
                          ₹{bundle.mrp.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button — always full width, never overflows */}
                    <button
                      onClick={(e) => handleAddBundle(e, bundle)}
                      className={`w-full mt-2 inline-flex items-center justify-center gap-1.5 bg-[#0D3B2A] text-white px-3 py-2.5 rounded-lg sm:rounded-xl font-sans font-bold text-[10px] sm:text-xs hover:bg-[#D4A24C] transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group/btn ${!bundle.inStock ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5 shrink-0" />
                      <span className="uppercase tracking-wider font-bold">{bundle.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                      {bundle.inStock && (
                        <ArrowRight className="w-3.5 h-3.5 shrink-0 transform group-hover/btn:translate-x-0.5 transition-transform" />
                      )}
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
