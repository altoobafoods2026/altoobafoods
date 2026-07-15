import Footer from './Footer';

export default function HeroSection({ onBeginJourney, isMuted, toggleMute, videoRef, currentOpacity, onVideoEnded }) {
  return (
    <main
      id="hero-content"
      className="relative z-10 flex-grow flex flex-col items-center px-6"
      style={{
        paddingTop: 'calc(8rem - 75px)'
      }}
    >
      {/* Background Video Layer */}
      <div 
        id="video-layer-container" 
        className="absolute w-full select-none bg-brand-green"
        style={{
          top: '300px',
          inset: 'auto 0 0 0',
          height: 'calc(100% - 300px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <video
          id="bg-video-element"
          ref={videoRef}
          src="src\assets\Islamic_Altooba_.mp4"
          onEnded={onVideoEnded}
          autoPlay
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover transition-opacity duration-150 ease-out"
          style={{
            opacity: currentOpacity,
          }}
        />

        {/* Gradient overlays positioned over the video */}
        <div
          id="bg-video-overlay"
          className="absolute inset-0 bg-gradient-to-b from-brand-cream via-transparent to-brand-cream pointer-events-none"
          style={{ mixBlendMode: 'normal' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center justify-center text-center pb-24">

        {/* Headline */}
        <h1
          id="hero-headline"
          className="font-serif font-normal text-5xl sm:text-7xl md:text-8xl text-brand-green tracking-[-0.03em] leading-[0.95] max-w-7xl animate-fade-rise"
          style={{ letterSpacing: '-2.46px' }}
        >
          Reviving <span className="italic text-brand-green/70">Sunnah,</span> restoring <span className="italic text-brand-green/70">purity.</span>
        </h1>

        {/* Description */}
        <p
          id="hero-description"
          className="text-base sm:text-lg text-brand-green/80 max-w-2xl mt-8 leading-relaxed font-normal animate-fade-rise-delay"
        >
          Embrace the healing wisdom of Tibb-e-Nabawi. We curate organic, Sunnah-inspired botanical remedies crafted from pure, halal ingredients to nourish your soul, mind, and body.
        </p>

        {/* Hero CTA Button */}
        <div className="relative mt-8">
          <button
            id="hero-cta"
            onClick={onBeginJourney}
            className="rounded-full px-14 py-5 text-base font-bold bg-brand-green text-brand-cream transition-all duration-300 hover:scale-[1.03] active:scale-95 animate-fade-rise-delay-2 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green cursor-pointer"
          >
            Explore Now 
          </button>
        </div>
      </div>

      {/* Floating Glassmorphic Footer Component */}
      <Footer onBeginJourney={onBeginJourney} />

      {/* Ambient Video Sound Control Badge - Fixed in screen layout */}
      <div id="video-sound-control" className="fixed bottom-6 right-6 sm:bottom-10 sm:right-10 z-50 flex items-center space-x-4">
        <button
          onClick={toggleMute}
          className="backdrop-blur-md bg-brand-cream/80 border border-brand-green/20 hover:bg-brand-cream text-brand-green p-2.5 rounded-full transition-all shadow-sm flex items-center justify-center cursor-pointer focus:outline-none"
          title={isMuted ? "Enable volume" : "Mute volume"}
        >
          {isMuted ? (
            <svg className="w-5 h-5 text-brand-green/65 hover:text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-brand-green" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>
      </div>
    </main>
  );
}
  