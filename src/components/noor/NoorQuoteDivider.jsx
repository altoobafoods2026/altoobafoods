import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'motion/react';

const wordVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -30 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', damping: 15, stiffness: 100 } },
  exit: { opacity: 0, y: -20, rotateX: 30, transition: { duration: 0.3 } }
};

const AnimatedText = ({ text, className, dir = 'ltr', delay = 0, triggerAnimation }) => {
  const words = text.split(' ');
  return (
    <motion.div 
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: delay } },
        exit: { opacity: 0, transition: { staggerChildren: 0.02, staggerDirection: -1 } }
      }}
      initial="hidden"
      animate={triggerAnimation ? "show" : "hidden"}
      exit="exit"
      className={`flex flex-wrap justify-center gap-x-3 gap-y-2 ${className}`}
      dir={dir}
      style={{ perspective: 1000 }}
    >
      {words.map((word, index) => (
        <div key={index} className="inline-block overflow-hidden py-3 -my-3 px-2 -mx-2">
          <motion.span variants={wordVariants} className="inline-block origin-bottom">
            {word}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
};

// Static version of the text component for precise invisible sizing
const StaticText = ({ text, className, dir = 'ltr' }) => {
  const words = text.split(' ');
  return (
    <div className={`flex flex-wrap justify-center gap-x-3 gap-y-2 ${className}`} dir={dir}>
      {words.map((word, index) => (
        <div key={index} className="inline-block overflow-hidden py-3 -my-3 px-2 -mx-2">
          <span className="inline-block origin-bottom">{word}</span>
        </div>
      ))}
    </div>
  );
};

export default function NoorQuoteDivider() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [lang, setLang] = useState('en');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  useEffect(() => {
    let cycleTimer;
    if (isInView) {
      const initialTimer = setTimeout(() => {
        setLang('hi');
        cycleTimer = setInterval(() => {
          setLang(prev => prev === 'en' ? 'hi' : 'en');
        }, 5000);
      }, 3500);

      return () => {
        clearTimeout(initialTimer);
        clearInterval(cycleTimer);
      };
    }
  }, [isInView]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-8 md:py-12 overflow-hidden bg-[#FAF7F2] flex items-center justify-center text-center px-6 sm:px-8 border-y border-[#D4A24C]/10"
    >
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0 overflow-hidden bg-[#FAF7F2]"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-white/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-transparent to-[#FAF7F2] z-20 opacity-90" />
        <img 
          src="/quote_bg_user.jpg" 
          alt="Islamic Architecture & Herbal Medicine" 
          className="w-full h-[150%] object-cover object-center opacity-80"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white rounded-full blur-[100px] opacity-60 pointer-events-none z-20" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-30 max-w-5xl mx-auto flex flex-col items-center"
      >
        {/* Arabic Text Highlight */}
        <AnimatedText 
          text="مَا أَنْزَلَ اللَّهُ دَاءً إِلَّا أَنْزَلَ لَهُ شِفَاءً"
          className="text-[#D4A24C] text-2xl md:text-4xl font-serif mb-4 md:mb-6 leading-loose tracking-wider drop-shadow-sm"
          dir="rtl"
          triggerAnimation={isInView}
          delay={0}
        />

        {/* Translation Wrapper (Grid stack prevents layout jumps during swap) */}
        {/* Using items-start ensures the top line of text always stays at the exact same Y position */}
        <div className="relative grid items-start justify-center w-full min-h-[140px] sm:min-h-[160px] md:min-h-[180px]">
          
          {/* Invisible sizing block containing both texts to force container height precisely */}
          <div className="col-start-1 row-start-1 invisible opacity-0 pointer-events-none select-none grid w-full">
             <div className="col-start-1 row-start-1 w-full">
               <StaticText 
                 text='"अल्लाह ने कोई ऐसी बीमारी पैदा नहीं की, जिसका इलाज भी पैदा न किया हो।"'
                 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0D3B2A] leading-[1.4] font-medium drop-shadow-sm"
               />
             </div>
             <div className="col-start-1 row-start-1 w-full">
               <StaticText 
                 text='"There is no disease that Allah has created, except that He also has created its treatment."'
                 className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0D3B2A] leading-[1.3] font-normal drop-shadow-sm"
               />
             </div>
          </div>

          {/* Actual visible animated text */}
          <div className="col-start-1 row-start-1 w-full flex items-start justify-center h-full">
            <AnimatePresence mode="wait">
              {lang === 'en' ? (
                <AnimatedText 
                  key="en"
                  text='"There is no disease that Allah has created, except that He also has created its treatment."'
                  className="font-serif italic text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0D3B2A] leading-[1.3] font-normal drop-shadow-sm"
                  triggerAnimation={true}
                  delay={0}
                />
              ) : (
                <AnimatedText 
                  key="hi"
                  text='"अल्लाह ने कोई ऐसी बीमारी पैदा नहीं की, जिसका इलाज भी पैदा न किया हो।"'
                  className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#0D3B2A] leading-[1.4] font-medium drop-shadow-sm"
                  triggerAnimation={true}
                  delay={0}
                />
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Detailed Reference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 1.2, ease: 'easeOut' }}
          className="mt-4 flex flex-col items-center gap-2"
        >
          <div className="w-12 h-[1px] bg-[#0D3B2A]/20" />
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#D4A24C] font-bold font-sans mt-2">
            Narrated by Abu Huraira
          </p>
          <p className="text-xs sm:text-sm tracking-[0.1em] text-[#0D3B2A]/70 font-sans font-medium">
            Sahih al-Bukhari 5678 (Book of Medicine)
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
