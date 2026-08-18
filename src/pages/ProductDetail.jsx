import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductBySlug, getProducts } from '../services/shopify';
import { useCartStore } from '../store/cartStore';
import { useToastStore } from '../store/toastStore';
import TrustedBy from '../components/TrustedBy';
import ProductCard from '../components/ProductCard';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ transform: 'scale(1)', transformOrigin: 'center center' });

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      try {
        const fetchedProduct = await getProductBySlug(slug);
        if (!fetchedProduct) {
          navigate('/studio');
          return;
        }
        setProduct(fetchedProduct);
        setActiveImage(0);
        setQuantity(1);
        setShowFullDesc(false);
        
        // Force scroll to top after DOM update
        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }, 10);

        // Load related products
        const allProducts = await getProducts();
        const related = allProducts
          .filter(p => 
            p.category === fetchedProduct.category && 
            p.id !== fetchedProduct.id &&
            !p.name.toLowerCase().includes('al-rayhan') &&
            !p.name.toLowerCase().includes('tulsi')
          )
          .slice(0, 4);
        setRelatedProducts(related);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProduct();
  }, [slug, navigate]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0D3B2A]/20 border-t-[#D4A24C] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return null;

  const currentPrice = product.price;
  const mrpPrice = product.mrp || product.price * 1.25;
  const discountPercent = product.discount || Math.round(((mrpPrice - currentPrice) / mrpPrice) * 100);

  // Ensure maximum 4 images for the gallery without duplication
  const finalImages = product.images.slice(0, 5);

  const handleAddToCart = () => {
    if (!product.inStock) {
      showToast('Product is out of stock', 'error');
      return;
    }
    for (let i = 0; i < quantity; i++) {
      addItem(product, null);
    }
    showToast(`Added ${quantity}x ${product.name} to cart`);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(2.5)'
    });
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
    setZoomStyle({ transform: 'scale(1)', transformOrigin: 'center center' });
  };

  return (
    <div className="bg-[#f6f5ef] min-h-screen pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          
          {/* Left Column: Gallery */}
          <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6 sticky top-28 self-start">
            
            {/* Thumbnails (Horizontal on mobile, vertical on desktop) */}
            <div className="flex flex-row lg:flex-col items-center group/thumbs w-full lg:w-auto gap-2 lg:gap-3">
              
              {/* Mobile Left Scroll Arrow */}
              <button 
                onClick={() => {
                  const el = document.getElementById('thumb-scroll');
                  if(el) el.scrollBy({left: -100, behavior: 'smooth'});
                }}
                className="lg:hidden flex-shrink-0 w-8 h-16 sm:h-20 flex items-center justify-center text-gray-400 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>

              <div 
                id="thumb-scroll"
                className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-visible hide-scrollbar scroll-smooth flex-grow w-full lg:w-auto"
              >
                {finalImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border-[2.5px] transition-all bg-[#e6e6e6] ${
                      activeImage === idx ? 'border-[#0D3B2A]' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>

              {/* Mobile Right Scroll Arrow */}
              <button 
                onClick={() => {
                  const el = document.getElementById('thumb-scroll');
                  if(el) el.scrollBy({left: 100, behavior: 'smooth'});
                }}
                className="lg:hidden flex-shrink-0 w-8 h-16 sm:h-20 flex items-center justify-center text-gray-400 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>

            {/* Main Image */}
            <div 
              className="relative flex-grow bg-[#e6e6e6] rounded-[20px] overflow-hidden flex items-center justify-center cursor-crosshair w-full aspect-square"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Counter */}
              {finalImages.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/70 text-white text-[11px] font-bold px-3 py-1 rounded-full z-10 pointer-events-none">
                  {activeImage + 1} / {finalImages.length}
                </div>
              )}
              
              <img 
                src={finalImages[activeImage]} 
                alt={product.name} 
                className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-300 ${isZooming ? 'ease-out' : 'ease-in-out'}`}
                style={isZooming ? zoomStyle : { transform: 'scale(1)', transformOrigin: 'center center' }}
              />
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col py-2">
            
            {/* Category Line */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#c8a86a]"></div>
              <span className="text-[#c8a86a] text-[10px] font-bold tracking-[0.2em] uppercase">
                {product.category || 'PROPHETIC REMEDY'}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-[34px] font-bold text-gray-900 leading-tight mb-5 font-sans tracking-tight">
              {product.name}
            </h1>

            {/* Price Block */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[28px] font-bold text-[#0D3B2A] font-sans">
                ₹ {currentPrice.toFixed(0)}
              </span>
              <span className="text-lg text-gray-400 line-through font-medium">
                ₹ {mrpPrice.toFixed(0)}
              </span>
              <span className="bg-[#ffe8e8] text-[#d63a3a] text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                Save {discountPercent}%
              </span>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-6">
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#c8a86a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                <span className="text-[12px] font-bold text-gray-800">100% Pure & Natural</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#c8a86a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                <span className="text-[12px] font-bold text-gray-800">Prophetic Sunnah</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#c8a86a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                <span className="text-[12px] font-bold text-gray-800">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-[#c8a86a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                <span className="text-[12px] font-bold text-gray-800">Secure Checkout</span>
              </div>
            </div>

            <hr className="border-t border-gray-200 mb-6" />

            {/* Description */}
            <div className="mb-2">
              <div 
                className={`text-[13px] text-gray-500 font-sans leading-relaxed [&>p]:mb-3 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-1 [&>h2]:font-bold [&>h2]:text-gray-800 [&>h2]:mb-2 [&>h2]:mt-4 [&>h3]:font-bold [&>h3]:text-gray-800 [&>h3]:mb-2 [&>h3]:mt-4 [&>strong]:font-bold [&>strong]:text-gray-800 ${!showFullDesc ? 'line-clamp-3' : ''}`}
                dangerouslySetInnerHTML={{ __html: (product.descriptionHtml || product.description || product.shortDesc || '').replace(/<img[^>]*>/gi, '') }}
              />
            </div>
            
            <button 
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="text-[10px] font-bold text-[#0D3B2A] uppercase tracking-widest flex items-center gap-1 mb-8 hover:text-[#c8a86a] transition-colors w-fit"
            >
              READ {showFullDesc ? 'LESS' : 'MORE'} 
              <svg className={`w-3 h-3 transform transition-transform ${showFullDesc ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            {/* Quantity and Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mb-6">
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-[11px] font-bold tracking-widest text-gray-900 uppercase">QUANTITY:</span>
                <div className="flex items-center justify-between border border-gray-300 rounded-full px-4 py-1.5 bg-white min-w-[100px]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-gray-500 hover:text-black font-bold focus:outline-none w-6 h-6 flex items-center justify-center text-lg"
                  >
                    -
                  </button>
                  <span className="font-sans font-bold text-black px-2 text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-gray-500 hover:text-black font-bold focus:outline-none w-6 h-6 flex items-center justify-center text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full sm:flex-1 bg-[#153423] text-white hover:bg-[#F7EFE0] hover:text-[#153423] transition-colors py-3.5 rounded-[14px] font-sans font-bold text-[12px] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                {product.inStock && (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                  </svg>
                )}
              </button>
            </div>

          </div>
        </div>
      </div>
      
      {/* Visual Description Section */}
      {product.descriptionHtml && (
        <div className="w-full mt-16 flex flex-col items-center">
          {[...product.descriptionHtml.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((match, idx) => (
            <img 
              key={idx} 
              src={match[1]} 
              alt={`${product.name} Description ${idx + 1}`} 
              className="w-full object-cover block" 
            />
          ))}
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-6xl mx-auto px-6 sm:px-8 mt-16 mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-[2px] bg-[#c8a86a]"></div>
            <h2 className="text-2xl font-bold font-serif text-gray-900 uppercase tracking-wide">You May Also Like</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p, idx) => (
              <ProductCard key={p.id} product={p} index={idx} />
            ))}
          </div>
        </div>
      )}

      {/* Product Specific Reviews */}
      <TrustedBy productId={product.id} productName={product.name} />
    </div>
  );
}
