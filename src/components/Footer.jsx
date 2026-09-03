import { Link } from 'react-router-dom';
import { useToastStore } from '../store/toastStore';
import logoSrc from '../assets/logo.webp';

export default function Footer() {
  const showToast = useToastStore((state) => state.showToast);

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      showToast(`Thank you for subscribing, ${email}!`);
      e.target.reset();
    }
  };

  return (
    <footer className="relative bg-forest text-[#90b09a] pt-16 pb-8 overflow-hidden z-10 border-t border-parchment/10">
      {/* Decorative botanical leaf line elements or fade overlays */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-parchment/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Logo */}
          <div className="flex flex-col space-y-6">
            <Link to="/" className="inline-block mr-auto hover:opacity-95 transition-opacity">
              <img src={logoSrc} alt="Al-Tooba Logo" width="192" height="96" loading="lazy" decoding="async" className="h-20 sm:h-24 w-auto object-left brightness-0 invert" />
            </Link>
            <p className="text-sm leading-relaxed text-muted-green">
              Al Tooba® provides premium prophetic remedies and organic wellness solutions crafted with pure natural essence, shared with love.
            </p>
            
            {/* Newsletter form */}
            <form onSubmit={handleSubscribeSubmit} className="relative w-full max-w-sm flex items-center bg-transparent border border-parchment/30 rounded-full px-1 py-1">
              <input
                type="email"
                name="email"
                required
                placeholder="Enter Email Address"
                className="w-full pl-4 pr-3 py-2 bg-transparent text-parchment placeholder-muted-green outline-none border-none text-xs focus:ring-0"
              />
              <button
                type="submit"
                className="rounded-full px-5 py-2 bg-gold hover:bg-[#b09359] text-forest text-[11px] font-sans font-bold uppercase tracking-wider transition-colors cursor-pointer flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Column 2: Shop & Explore */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xs font-sans font-bold uppercase tracking-[0.18em] text-parchment hover:text-gold transition-colors">
              <Link to="/studio">Shop & Explore</Link>
            </h3>
            <ul className="space-y-3 text-sm flex flex-col">
              <li>
                <Link to="/studio" className="hover:text-parchment transition-colors text-muted-green">All Remedies</Link>
              </li>
              <li>
                <Link to="/studio?category=Talbina" onClick={() => window.scrollTo(0, 0)} className="hover:text-parchment transition-colors text-muted-green">Talbina</Link>
              </li>
              <li>
                <Link to="/studio?category=Skin%20Care" onClick={() => window.scrollTo(0, 0)} className="hover:text-parchment transition-colors text-muted-green">Skin Care</Link>
              </li>
              <li>
                <Link to="/studio?category=Hair%20Care" onClick={() => window.scrollTo(0, 0)} className="hover:text-parchment transition-colors text-muted-green">Hair Care</Link>
              </li>
              <li>
                <Link to="/studio?category=Herbal%20Oil" onClick={() => window.scrollTo(0, 0)} className="hover:text-parchment transition-colors text-muted-green">Herbal Oil</Link>
              </li>
              <li>
                <Link to="/studio?category=Herbal%20Tea" onClick={() => window.scrollTo(0, 0)} className="hover:text-parchment transition-colors text-muted-green">Herbal Tea</Link>
              </li>
              <li>
                <Link to="/studio?category=Vinegars" onClick={() => window.scrollTo(0, 0)} className="hover:text-parchment transition-colors text-muted-green">Vinegars</Link>
              </li>
              <li>
                <Link to="/studio?category=Prophetic%20Remedies" onClick={() => window.scrollTo(0, 0)} className="hover:text-parchment transition-colors text-muted-green">Prophetic Remedies</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Heritage */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xs font-sans font-bold uppercase tracking-[0.18em] text-parchment hover:text-gold transition-colors">
              <Link to="/about">Our Heritage</Link>
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="hover:text-parchment transition-colors">
                  The Origin Story
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-parchment transition-colors">
                  Ethical Cultivation
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-parchment transition-colors">
                  Prophetic Science
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-parchment transition-colors">
                  Join Our Journey
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-xs font-sans font-bold uppercase tracking-[0.18em] text-parchment hover:text-gold transition-colors">
              <Link to="/contact-us">Contact Us</Link>
            </h3>
            <ul className="space-y-3 text-sm text-muted-green">
              <li className="flex flex-col">
                <span className="text-parchment/60 text-xs mb-1">Apothecary & HQ</span>
                <span>Bilaspur Gate, Nainital Road, Rampur, UP</span>
                <span>India</span>
              </li>
              <li className="pt-2 flex flex-col">
                <span className="text-parchment/60 text-xs mb-1">Direct Support</span>
                <a href="mailto:altoobafoods2026@gmail.com" className="hover:text-parchment transition-colors">altoobafoods2026@gmail.com</a>
                <a href="tel:+918433284322" className="hover:text-parchment transition-colors mt-1">+91 8433284322</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Policy Links */}
        <div className="py-8 border-t border-parchment/10">
          <ul className="flex flex-wrap items-center justify-center md:justify-between gap-x-6 gap-y-4 text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#90b09a]">
            <li><Link to="/privacy-policy" className="hover:text-gold hover:-translate-y-0.5 inline-block transition-transform duration-300">Privacy Policy</Link></li>
            <li><Link to="/terms-conditions" className="hover:text-gold hover:-translate-y-0.5 inline-block transition-transform duration-300">Terms & Conditions</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-gold hover:-translate-y-0.5 inline-block transition-transform duration-300">Shipping Policy</Link></li>
            <li><Link to="/return-refund" className="hover:text-gold hover:-translate-y-0.5 inline-block transition-transform duration-300">Return & Refund</Link></li>
            <li><Link to="/cancellation-policy" className="hover:text-gold hover:-translate-y-0.5 inline-block transition-transform duration-300">Cancellation Policy</Link></li>
          </ul>
        </div>

        {/* Bottom copyright details */}
        <div className="pt-8 border-t border-parchment/10 flex flex-col md:flex-row items-center justify-start gap-2 text-left">
          <p className="text-[11px] text-[#b4d6be] font-sans font-semibold tracking-wider flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span>© {new Date().getFullYear()} AL-TOOBA®. ALL RIGHTS RESERVED.</span>
            <span className="hidden md:inline">|</span>
           { /*<span>
              DEVELOPED BY <a href="https://sociallyconnect.in" target="_blank" rel="noopener noreferrer" className="text-gold underline font-bold transition-colors">SOCIALLY CONNECT</a>
            </span>*/ }
          </p>
        </div>
      </div>
    </footer>
  );
}
