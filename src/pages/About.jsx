import { Link } from 'react-router-dom';
import { Leaf, Droplet, BookOpen, ShieldCheck, ScrollText } from 'lucide-react';

export default function About() {
  const sourcingSteps = [
    {
      title: 'Ethical Cultivation',
      description: 'Rooted in Rampur, Uttar Pradesh, India, we partner directly with trusted family-run farms to cultivate 100% organic ingredients in their native soils.',
      icon: <Leaf className="w-8 h-8 text-[#D4A24C]" strokeWidth={1.5} />
    },
    {
      title: 'Cold-Pressed Purity',
      description: 'Our black seed oils and botanical extracts are cold-pressed below 37°C, preserving 100% of their therapeutic volatile compounds.',
      icon: <Droplet className="w-8 h-8 text-[#D4A24C]" strokeWidth={1.5} />
    },
    {
      title: 'Prophetic Formulations',
      description: 'Every blend is guided by traditional Islamic Tibb-e-Nabawi scriptures, scientifically validated by modern analytical labs.',
      icon: <BookOpen className="w-8 h-8 text-[#D4A24C]" strokeWidth={1.5} />
    }
  ];

  return (
    <div className="bg-parchment min-h-screen pb-20">
      {/* 1. Header Section with Cinematic Background - Full Width Edge to Edge */}
      <section 
        className="relative text-center mb-16 overflow-hidden pt-32 pb-24 px-6 sm:px-12 flex flex-col items-center justify-center min-h-[450px]"
      >
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/studio_bg.png')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B2A]/90 via-[#0D3B2A]/70 to-black/50" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-[#D4A24C] text-xs font-sans font-bold uppercase tracking-[0.25em]">OUR TRADITION</span>
          <h1 className="font-serif font-bold text-4xl sm:text-7xl text-[#FAF7F2] mt-4 leading-tight tracking-tight drop-shadow-md">
            Crafted for Purity,<br />
            <span className="italic font-normal text-[#D4A24C]">Rooted in Tradition.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#FAF7F2]/80 max-w-xl mx-auto mt-6 leading-relaxed font-sans font-medium">
            Discover the heritage of Al-Tooba® and our dedication to restoring genuine Tibb-e-Nabawi remedies for modern healing.
          </p>
        </div>
      </section>

      {/* 2. Visual Story Overlay */}
      <section className="px-6 sm:px-8 max-w-7xl mx-auto mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border border-forest/10 rounded-3xl p-8 sm:p-12 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-forest tracking-tight">The Origin of Al-Tooba®</h2>
            <p className="text-sm text-forest/75 leading-relaxed font-sans">
              Founded on the belief that nature holds the answers to modern ailments, Al-Tooba® began as a small apothecary dedicated to purifying prophetic formulas. Our name, inspired by the blessed 'Tuba' tree of Paradise, represents our commitment to botanical excellence, authenticity, and spiritual wellness.
            </p>
            <p className="text-sm text-forest/75 leading-relaxed font-sans">
              For centuries, the remedies of the Prophet Muhammad (ﷺ)—such as black seed oil (Habbatul Barakah), Sidr honey, and olive leaf extracts—have guided millions in healthy living. We build upon this sacred canon, bridging ancient Tibb-e-Nabawi wisdom with strict scientific verification to create remedies you can trust.
            </p>
            <div className="pt-4">
              <Link
                to="/studio"
                className="inline-block rounded-full px-8 py-3.5 bg-forest text-parchment text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#2b4c29] transition-colors"
              >
                Explore the Remedies
              </Link>
            </div>
          </div>
          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-forest/5 bg-parchment/20">
            <img
              src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200"
              alt="Prophetic apothecary herbs and oils"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Sourcing Pillars Grid */}
      <section className="bg-forest py-24 px-6 sm:px-8 text-parchment border-y border-parchment/10 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gradient-to-bl from-[#D4A24C]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-gradient-to-tr from-[#FAF7F2]/5 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#D4A24C] text-xs font-sans font-bold uppercase tracking-[0.25em]">HOW WE SOURCE</span>
            <h2 className="font-serif font-bold text-3xl sm:text-5xl text-parchment mt-3 tracking-tight">Botanical Quality Pillars</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sourcingSteps.map((step, idx) => (
              <div key={idx} className="bg-white/[0.03] border border-parchment/10 rounded-[2rem] p-8 hover:bg-white/[0.06] hover:border-[#D4A24C]/30 transition-all duration-500 hover:-translate-y-2 shadow-lg">
                <div className="mb-8 w-16 h-16 rounded-2xl bg-[#D4A24C]/10 border border-[#D4A24C]/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[#D4A24C] blur-lg opacity-20 rounded-2xl animate-pulse"></div>
                  <div className="relative z-10">{step.icon}</div>
                </div>
                <h3 className="font-serif font-bold text-2xl text-parchment mb-4">{step.title}</h3>
                <p className="text-sm text-[#FAF7F2]/70 leading-relaxed font-sans">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Value Statements / Callouts */}
      <section className="px-6 sm:px-8 py-24 max-w-4xl mx-auto text-center">
        <h2 className="font-serif font-bold text-2xl sm:text-4xl text-forest tracking-tight">Our Promise of Authenticity</h2>
        <p className="text-sm sm:text-base text-forest/75 mt-6 leading-relaxed max-w-2xl mx-auto">
          Every product under the Al-Tooba® label is certified 100% organic, non-GMO, chemical-free, and formulated without synthetic additives. We trace each ingredient from seed to seal, verifying its origin and purity so you can introduce authentic prophetic remedies into your daily routine.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4 sm:gap-6">
          <span className="flex items-center gap-2.5 text-xs font-sans font-bold uppercase tracking-wider text-forest/70 bg-white border border-forest/10 hover:border-forest/30 hover:bg-forest/5 transition-colors rounded-full px-5 py-2.5 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-[#D4A24C]" strokeWidth={2} />
            100% Lab Verified
          </span>
          <span className="flex items-center gap-2.5 text-xs font-sans font-bold uppercase tracking-wider text-forest/70 bg-white border border-forest/10 hover:border-forest/30 hover:bg-forest/5 transition-colors rounded-full px-5 py-2.5 shadow-sm">
            <Leaf className="w-4 h-4 text-[#D4A24C]" strokeWidth={2} />
            Organic & Wildcrafted
          </span>
          <span className="flex items-center gap-2.5 text-xs font-sans font-bold uppercase tracking-wider text-forest/70 bg-white border border-forest/10 hover:border-forest/30 hover:bg-forest/5 transition-colors rounded-full px-5 py-2.5 shadow-sm">
            <ScrollText className="w-4 h-4 text-[#D4A24C]" strokeWidth={2} />
            Islamic Tibb Guidelines
          </span>
        </div>
      </section>
    </div>
  );
}
