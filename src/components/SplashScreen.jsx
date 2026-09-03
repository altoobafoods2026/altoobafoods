import logoSrc from '../assets/logo.webp';

export default function SplashScreen({ isLoading = true }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF7F2] transition-all duration-700 ease-out ${
        isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none scale-105'
      }`}
    >
      {/* Background Decorative Mandala Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#D4A24C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#0D3B2A]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {/* Logo Container with Gentle Breathing Glow */}
        <div className="relative mb-6">
          <div className="absolute -inset-3 bg-[#D4A24C]/20 rounded-full blur-lg animate-pulse" />
          <img
            src={logoSrc}
            alt="Al-Tooba Prophetic Remedies"
            width="192"
            height="96"
            className="h-20 sm:h-24 w-auto object-contain drop-shadow-md relative z-10 animate-fade-in"
          />
        </div>

        {/* Elegant Spinning Ring */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 mb-4 flex items-center justify-center">
          <div className="w-full h-full border-[2.5px] border-[#0D3B2A]/15 border-t-[#D4A24C] rounded-full animate-spin" />
        </div>

        {/* Loading Text */}
        <p className="text-[11px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#0D3B2A]/85">
          Loading Prophetic Remedies...
        </p>
        <span className="text-[9px] font-sans font-semibold text-[#D4A24C] uppercase tracking-[0.15em] mt-1.5">
          Crafted for Purity • Rooted in Tradition
        </span>
      </div>
    </div>
  );
}
