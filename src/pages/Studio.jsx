import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { getProducts } from '../services/shopify';
import ProductCard from '../components/ProductCard';
import ShimmerCard from '../components/ShimmerCard';
import ContactSection from '../components/ContactSection';
import { useToastStore } from '../store/toastStore';

export default function Studio() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' }
  ];

  const showToast = useToastStore((state) => state.showToast);

  // Fetch products from Shopify
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        const fetchedProducts = await getProducts();
        const regularProducts = fetchedProducts.filter(p => !(p.collections && p.collections.includes('hero-section-3d-images')));
        setProducts(regularProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadProducts();
  }, []);

  // Set category from URL after products load (or in general)

  const categories = ['All', 'Talbina', 'Skin Care', 'Hair Care', 'Herbal Oil', 'Herbal Tea', 'Vinegars', 'Prophetic Remedies'];

  // Sync category from URL parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat && categories.includes(cat)) {
      setSelectedCategory(cat);
    } else if (cat) {
      setSelectedCategory(cat); // Even if it's not in the predefined list, it might be dynamically generated
    } else {
      setSelectedCategory('All');
    }
  }, [location.search]);

  // Handle category pill click
  const handleCategoryClick = (cat) => {
    if (cat === 'All') {
      navigate('/studio');
    } else {
      navigate(`/studio?category=${encodeURIComponent(cat)}`);
    }
  };

  // Filter products by Category AND Search Query
  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

    if (!q) return matchesCategory;

    const nameMatch = (p.name && p.name.toLowerCase().includes(q)) || (p.title && p.title.toLowerCase().includes(q));
    const slugMatch = p.slug && p.slug.toLowerCase().includes(q);
    const categoryMatch = p.category && p.category.toLowerCase().includes(q);
    const descMatch = p.description && p.description.toLowerCase().includes(q);

    return matchesCategory && (nameMatch || slugMatch || categoryMatch || descMatch);
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // Featured
  });

  return (
    <div className="bg-parchment min-h-screen">
      
      {/* Page Title with Cinematic Banner - Full Width Edge to Edge */}
      <div className="w-full pt-[72px] sm:pt-[88px] lg:pt-[100px] mb-8 md:mb-12 bg-parchment">
        <img 
          src="/products_banner.jpg" 
          alt="Products Banner" 
          className="w-full h-auto block"
        />
      </div>

      <div className="pb-20 px-6 sm:px-8 max-w-7xl mx-auto">
        
        {/* Search Bar */}
        <div className="mb-8 md:mb-10 max-w-2xl mx-auto">
          <div className="relative flex items-center bg-white rounded-full border border-[#0D3B2A]/10 shadow-[0_4px_20px_rgba(13,59,42,0.04)] focus-within:border-[#D4A24C] focus-within:ring-2 focus-within:ring-[#D4A24C]/30 transition-all duration-300 px-5 py-3.5">
            <Search className="w-5 h-5 text-[#D4A24C] shrink-0 mr-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search remedies by name, category, or ingredient..."
              className="w-full bg-transparent text-sm md:text-base text-[#0D3B2A] placeholder:text-[#0D3B2A]/40 focus:outline-none font-medium"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="p-1 rounded-full text-gray-400 hover:text-[#0D3B2A] hover:bg-gray-100 transition-colors ml-2 cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="flex items-center justify-between text-xs text-[#0D3B2A]/70 font-sans font-medium px-4 mt-2.5">
              <span>Found <strong className="text-[#0D3B2A] font-bold">{sortedProducts.length}</strong> {sortedProducts.length === 1 ? 'remedy' : 'remedies'} for "<span className="text-[#D4A24C] font-semibold">{searchQuery}</span>"</span>
              <button 
                onClick={() => setSearchQuery('')} 
                className="text-[#D4A24C] hover:underline font-semibold cursor-pointer"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Filter & Sort Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-forest/10 pb-8 mb-12">
          {/* Categories Filter Pills */}
          <div className="flex flex-wrap gap-2.5 pb-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`shrink-0 rounded-full px-5 py-2 text-xs font-sans font-bold uppercase tracking-wider transition-colors border cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-forest border-forest text-parchment'
                    : 'border-forest/15 text-forest/80 hover:bg-forest/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Custom Sort Dropdown */}
          <div className="flex items-center gap-3 md:gap-4 relative shrink-0 z-30">
            <span className="text-[10px] md:text-[11px] font-sans font-bold uppercase tracking-widest text-[#0D3B2A]/70 whitespace-nowrap hidden sm:inline-block">Sort By</span>
            
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-white border border-[#0D3B2A]/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-full pl-5 pr-12 py-2.5 text-[13px] md:text-[14px] font-sans font-semibold text-[#0D3B2A] focus:outline-none focus:ring-2 focus:ring-[#D4A24C]/40 cursor-pointer min-w-[150px] md:min-w-[180px] transition-all duration-300 text-left flex justify-between items-center"
              >
                <span>{sortOptions.find(opt => opt.value === sortBy)?.label || 'Featured'}</span>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#0D3B2A] flex items-center justify-center">
                  <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                  <div className="absolute top-[calc(100%+8px)] right-0 w-[190px] bg-white rounded-[20px] border border-[#0D3B2A]/10 shadow-[0_12px_40px_rgba(13,59,42,0.15)] py-2 z-50 overflow-hidden transform origin-top transition-all duration-200">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-5 py-3 text-[13px] font-sans transition-all duration-200 hover:bg-[#FAF7F2] flex items-center justify-between group ${sortBy === option.value ? 'text-[#D4A24C] font-bold bg-[#FAF7F2]/50' : 'text-[#0D3B2A]/80 font-medium'}`}
                      >
                        {option.label}
                        {sortBy === option.value && (
                          <svg className="w-4 h-4 text-[#D4A24C]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(10)].map((_, i) => (
              <ShimmerCard key={i} />
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white/60 border border-forest/10 rounded-3xl backdrop-blur-sm px-6 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#D4A24C]/20 flex items-center justify-center mx-auto mb-4 text-[#D4A24C]">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-xl font-bold text-forest mb-2">
              {searchQuery ? `No remedies found for "${searchQuery}"` : 'No remedies found'}
            </h3>
            <p className="text-sm text-forest/60 mb-6">
              {searchQuery 
                ? 'Check your spelling or try searching for another category or ingredient.' 
                : 'Try selecting another category or check back later.'}
            </p>
            {(searchQuery || selectedCategory !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  navigate('/studio');
                }}
                className="inline-flex items-center gap-2 bg-[#0D3B2A] text-white px-6 py-2.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest hover:bg-[#D4A24C] transition-colors cursor-pointer"
              >
                Clear Filters & Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {sortedProducts.map((product, idx) => (
              <div key={product.id} className="w-full">
                <ProductCard product={product} index={idx} />
              </div>
            ))}
          </div>
        )}


      </div>
    </div>
  );
}
