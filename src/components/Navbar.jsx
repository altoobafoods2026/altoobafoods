import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useCartStore } from '../store/cartStore';
import { useWishlistStore } from '../store/wishlistStore';
import CartDrawer from './CartDrawer';
import { formatPrice } from '../utils/formatPrice';
import logoSrc from '../assets/logo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const location = useLocation();
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const linksRef = useRef([]);
  const lastScrollY = useRef(0);

  const isHome = location.pathname === '/';
  const cartCount = useCartStore((state) => state.items.reduce((sum, item) => sum + item.quantity, 0));
  const wishlistCount = useWishlistStore((state) => state.items.length);

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

  // GSAP animation for mobile menu overlay opening/closing
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Fade in overlay
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        y: 0,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: 'power3.out'
      });
      // Stagger link reveal
      gsap.fromTo(
        linksRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.4, delay: 0.2, ease: 'power2.out' }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -20,
        pointerEvents: 'none',
        duration: 0.4,
        ease: 'power3.in'
      });
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menus on page transitions
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Determine navbar styles
  const isTransparent = isHome && !isScrolled;
  const navbarClasses = isTransparent
    ? 'bg-transparent text-forest border-transparent'
    : 'bg-parchment text-forest border-b border-[#d6cdb8] shadow-[0_4px_20px_rgba(31,58,29,0.03)]';

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
            <img src={logoSrc} alt="Al-Tooba Logo" className={`h-[58px] sm:h-[70px] w-auto transition-all duration-300 ${isTransparent ? 'drop-shadow-[0_2px_4px_rgba(255,255,255,0.4)]' : ''}`} />
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
        className="fixed inset-0 z-35 bg-black/10 backdrop-blur-md text-parchment flex flex-col items-center justify-center gap-8 pointer-events-none opacity-0 transform -translate-y-6 overflow-hidden"
      >
        {menuItems.map((item, idx) => (
          <Link
            key={item.name}
            ref={(el) => (linksRef.current[idx] = el)}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl sm:text-3xl font-serif font-bold italic tracking-wide text-white hover:scale-105 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
          >
            {item.name}
          </Link>
        ))}
        <Link
          ref={(el) => (linksRef.current[menuItems.length] = el)}
          to="/login"
          onClick={() => setIsMobileMenuOpen(false)}
          className="liquid mt-8 rounded-full px-10 py-3 bg-forest text-parchment text-sm font-sans font-bold uppercase tracking-widest transition-all duration-300 border-none"
          style={{ '--liquid-bg': '#F5EBD8', '--liquid-text': '#0D3B2A' }}
        >
          LOGIN
        </Link>
      </div>

      {/* Cart Slider Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
