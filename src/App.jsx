import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OrderSuccessModal from './components/OrderSuccessModal';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home';

// Lazy load secondary page components & below-the-fold global sections
const TestimonialSection = lazy(() => import('./components/TestimonialSection'));
const InstagramReels = lazy(() => import('./components/InstagramReels'));
const CraftedWithCare = lazy(() => import('./components/CraftedWithCare'));

const Studio = lazy(() => import('./pages/Studio'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Booking = lazy(() => import('./pages/Booking'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const Journal = lazy(() => import('./pages/Journal'));
const JournalPost = lazy(() => import('./pages/JournalPost'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const PolicyPage = lazy(() => import('./pages/PolicyPage'));

import SplashScreen from './components/SplashScreen';

// Loading screen fallback for lazy loading
const LoadingFallback = () => <SplashScreen isLoading={true} />;

// Global sections that should be hidden on specific pages
const GlobalSections = () => {
  const location = useLocation();
  
  // Hide these promotional sections on Contact Us, Studio, About, and Product Detail pages
  if (
    location.pathname === '/contact-us' || 
    location.pathname === '/studio' ||
    location.pathname === '/about' ||
    location.pathname === '/login' ||
    location.pathname === '/account' ||
    location.pathname === '/cart' ||
    location.pathname.startsWith('/product/') ||
    location.pathname === '/privacy-policy' ||
    location.pathname === '/terms-conditions' ||
    location.pathname === '/shipping-policy' ||
    location.pathname === '/return-refund' ||
    location.pathname === '/cancellation-policy'
  ) {
    return null;
  }
  
  return (
    <Suspense fallback={null}>
      <TestimonialSection />
      <InstagramReels />
      <CraftedWithCare />
    </Suspense>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-parchment text-forest selection:bg-forest selection:text-parchment overflow-x-hidden font-sans">
        
        {/* Global sticky navigation bar */}
        <Navbar />

        {/* Global on-screen GoKwik order confirmation modal */}
        <OrderSuccessModal />

        {/* Main Routed Area */}
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/consultation" element={<Journal />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/journal/:slug" element={<JournalPost />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/wishlist" element={<Navigate to="/" replace />} />
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/account" element={<Navigate to="/" replace />} />
              
              {/* Policy Pages */}
              <Route path="/privacy-policy" element={<PolicyPage title="Privacy Policy" />} />
              <Route path="/terms-conditions" element={<PolicyPage title="Terms & Conditions" />} />
              <Route path="/shipping-policy" element={<PolicyPage title="Shipping Policy" />} />
              <Route path="/return-refund" element={<PolicyPage title="Return & Refund" />} />
              <Route path="/cancellation-policy" element={<PolicyPage title="Cancellation Policy" />} />
              
              {/* Fallback to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>

        {/* Promotional Global Sections (Hidden on Contact Us) */}
        <GlobalSections />

        {/* Global editorial brand footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
