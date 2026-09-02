import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import CartDrawer from './CartDrawer';
import logoSrc from '../assets/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const location = useLocation();
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const linksRef = useRef([]);
  const lastScrollY = useRef(0);

  const isHome = location.pathname === '/';
  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const wishlistCount = useWishlistStore((state) => state.items.length);

  const productCategories = [
    { name: 'All Products', path: '/studio' },
    { name: 'Talbina', path: '/studio?category=Talbina' },
    { name: 'Hair Care', path: '/studio?category=Hair%20Care' },
    { name: 'Herbal Oil', path: '/studio?category=Herbal%20Oil' },
    { name: 'Vinegars', path: '/studio?category=Vinegars' },
    { name: 'Prophetic Remedies', path: '/studio?category=Prophetic%20Remedies' },
    { name: 'Wellness Kit', path: '/studio?category=Wellness%20Kit' },
    { name: 'Herbal Tea', path: '/studio?category=Herbal%20Tea' },
    { name: 'Skin Care', path: '/studio?category=Skin%20Care' },
  ];

  // Monitor scroll for header background toggle and smart hide
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check immediately on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // CSS-based animation for mobile menu overlay opening/closing & background scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMobileMenuOpen]);

  // Close menus on page transitions
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
  }, [location.pathname]);

  // Determine navbar styles
  const isTransparent = isHome && !isScrolled;
  const navbarClasses = isTransparent
    ? 'bg-gradient-to-b from-black/70 via-black/20 to-transparent border-transparent'
    : 'bg-[#FAF7F2]/80 backdrop-blur-xl border-b border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.04)]';

  const menuItems = [
    { name: 'HOME', path: '/' },
    { name: 'PRODUCTS', path: '/studio' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONSULTATION', path: '/consultation' },
    { name: 'CONTACT US', path: '/contact-us' }
  ];

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-in-out ${navbarClasses} ${isHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
          {/* Logo Area */}
          <a href="/" className="flex items-center w-auto transition-opacity hover:opacity-90">
            <img src={logoSrc} alt="Al-Tooba Logo" className={`h-[58px] sm:h-[70px] w-auto transition-all duration-500 ${isTransparent ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.85)] brightness-[1.2]' : 'drop-shadow-sm'}`} />
          </a>

          {/* Nav Links Center */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-[12px] xl:text-[14px] font-sans font-extrabold tracking-wider xl:tracking-widest transition-colors relative py-1.5 ${
                    isTransparent ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] hover:text-gold' : 'text-forest/80 hover:text-forest'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <div className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full ${isTransparent ? 'bg-gold' : 'bg-forest'}`} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Area Controls */}
          <div className={`flex items-center space-x-2 sm:space-x-4 ${isTransparent ? 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]' : 'text-forest'}`}>
            
            {/* Login */}
            <Link
              to="/login"
              className={`p-2 rounded-full transition-colors relative ${isTransparent ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-forest/5 hover:text-forest/80'}`}
              aria-label="Login"
            >
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </Link>

            {/* Shopping Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`p-2 rounded-full transition-colors relative cursor-pointer ${isTransparent ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-forest/5 hover:text-forest/80'}`}
              aria-label="Shopping Cart"
            >
              <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                <span className={`absolute top-0 right-0 w-4 h-4 text-[9px] font-bold rounded-full flex items-center justify-center ${isTransparent ? 'bg-white text-black' : 'bg-forest text-parchment'}`}>
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-1.5 rounded-full focus:outline-none cursor-pointer ${isTransparent ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-forest/5 hover:text-forest/80'}`}
              aria-label="Toggle navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className={`fixed inset-0 z-35 bg-[#0D3B2A]/98 backdrop-blur-2xl text-parchment flex flex-col items-center p-6 overflow-y-auto overscroll-contain transition-all duration-400 ease-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-5 pointer-events-none'
        }`}
        style={{ touchAction: 'pan-y' }}
      >
        <div className="w-full max-w-sm flex flex-col items-center justify-center gap-7 my-auto pt-24 pb-12">
          {menuItems.map((item, idx) => {
            if (item.name === 'PRODUCTS') {
              return (
                <div 
                  key={item.name} 
                  ref={(el) => (linksRef.current[idx] = el)}
                  className={`w-full flex flex-col items-center transition-all duration-350 ease-out ${
                    isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: isMobileMenuOpen ? `${150 + idx * 80}ms` : '0ms' }}
                >
                  <button
                    onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                    className="flex items-center justify-center gap-2.5 text-2xl sm:text-3xl font-serif font-bold italic tracking-wide text-white hover:text-[#D4A24C] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] cursor-pointer"
                  >
                    <span>PRODUCTS</span>
                    <svg
                      className={`w-5 h-5 text-[#D4A24C] transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>

                  {/* Dropdown Categories Accordion */}
                  <div
                    className={`w-full max-w-xs transition-all duration-300 overflow-hidden ${
                      isMobileProductsOpen ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                    }`}
                  >
                    <div className="bg-black/35 backdrop-blur-md rounded-2xl p-3 border border-white/15 flex flex-col gap-1 shadow-xl">
                      {productCategories.map((cat) => (
                        <Link
                          key={cat.name}
                          to={cat.path}
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsMobileProductsOpen(false);
                          }}
                          className="text-center py-2 px-3 text-sm sm:text-base font-sans font-medium text-[#FAF7F2]/90 hover:text-[#D4A24C] hover:bg-white/10 rounded-xl transition-all"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.name}
                ref={(el) => (linksRef.current[idx] = el)}
                to={item.path}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMobileProductsOpen(false);
                }}
                className={`text-2xl sm:text-3xl font-serif font-bold italic tracking-wide text-white hover:text-[#D4A24C] hover:scale-105 transition-all duration-350 ease-out drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                  isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${150 + idx * 80}ms` : '0ms' }}
              >
                {item.name}
              </Link>
            );
          })}

          <Link
            ref={(el) => (linksRef.current[menuItems.length] = el)}
            to="/login"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsMobileProductsOpen(false);
            }}
            className="liquid mt-2 rounded-full px-10 py-3 bg-[#D4A24C] text-[#0D3B2A] text-sm font-sans font-bold uppercase tracking-widest transition-all duration-300 shadow-lg border-none"
            style={{ '--liquid-bg': '#FAF7F2', '--liquid-text': '#0D3B2A' }}
          >
            LOGIN
          </Link>
        </div>
      </div>

      {/* Cart Slider Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
