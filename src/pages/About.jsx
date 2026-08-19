import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Droplet, 
  BookOpen, 
  ShieldCheck, 
  ScrollText, 
  Sparkles, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  UserCheck, 
  Stethoscope, 
  HeartHandshake,
  Star
} from 'lucide-react';

export default function About() {
  const propheticRemedies = [
    {
      title: 'Habbatul Barakah (Black Seed)',
      subtitle: 'Cold-Pressed Oils & Capsules',
      desc: 'The blessed black seed praised in Prophetic Hadith as a remedy for vitality and holistic immunity. Extra virgin and cold-pressed for maximum thymoquinone potency.',
      badge: 'Core Prophetic Remedy',
      link: '/product/black-seed-oil-capsule'
    },
    {
      title: 'Barley Talbina Superfood',
      subtitle: 'Nourishing Healing Porridge',
      desc: 'Authentic stone-ground whole barley porridge recommended in Sunnah for comforting the heart, relieving grief, restoring gut health, and boosting daily energy.',
      badge: 'Sunnah Superfood',
      link: '/product/buy-talbina-500gm-get-talbina-250gm-free'
    },
    {
      title: 'Raw Cider Vinegars with Mother',
      subtitle: 'Dates, Apple & Pomegranate',
      desc: 'Traditional barrel-fermented raw vinegars containing the living mother. A Sunnah food that supports metabolic balance, digestion, and natural detoxification.',
      badge: 'Traditional Fermentation',
      link: '/product/al-tamr-dates-vinegar'
    },
    {
      title: 'Ajwa & Qalbi Herbal Tonics',
      subtitle: 'Cardioprotective Decoctions',
      desc: 'Formulated with authentic Medina Ajwa dates, garlic, ginger, and wild Sidr honey to support cardiovascular wellness and natural vitality.',
      badge: 'Heart & Vitality Care',
      link: '/product/qalbina-nuskha500ml'
    },
    {
      title: 'Pure Himalayan Shilajit',
      subtitle: 'Fulvic Acid & 84+ Minerals',
      desc: 'Pure wildcrafted gold-grade Himalayan Shilajit resin and capsules to restore natural stamina, cellular energy, and physical rejuvenation.',
      badge: 'Vitality & Stamina',
      link: '/product/al-tooba-shilajit-capsules'
    },
    {
      title: 'Therapeutic Herbal Massage Oils',
      subtitle: 'Tibb-e-Nafs & 313 Hair Oil',
      desc: 'Potent botanical macerations with Kalonji, Amla, and essential extracts for scalp rejuvenation, joint comfort, and deep muscular relaxation.',
      badge: '100% Cold Macerated',
      link: '/product/tibb-e-nafs-oil-100-natural'
    }
  ];

  const trustMetrics = [
    { number: '5 Lakhs+', label: 'Healing Journeys', sub: 'Satisfied Customers Across India' },
    { number: '100+', label: 'Authentic Remedies', sub: 'Formulated to Prophetic Standards' },
    { number: '100%', label: 'Pure & Organic', sub: 'Chemical & Sulphate Free' },
    { number: '4.8 ★', label: 'Community Rating', sub: 'Verified Customer Reviews' },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16 sm:pb-20">
      
      {/* 1. Header Section with Cinematic Background */}
      <section className="relative text-center overflow-hidden pt-32 pb-20 sm:pb-24 px-6 sm:px-12 flex flex-col items-center justify-center min-h-[420px]">
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/studio_bg.png')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B2A]/95 via-[#0D3B2A]/80 to-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-[#FAF7F2]/10 border border-[#D4A24C]/30 text-[#D4A24C] text-[9px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.12em] sm:tracking-[0.2em] mb-4 backdrop-blur-sm whitespace-nowrap">
            <span>OUR SACRED TRADITION • TIBB-E-NABAWI</span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-6xl text-[#FAF7F2] leading-tight tracking-tight drop-shadow-md">
            Crafted for Purity,<br />
            <span className="italic font-normal text-[#D4A24C]">Rooted in Tradition.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#FAF7F2]/85 max-w-2xl mx-auto mt-5 leading-relaxed font-sans font-medium">
            Embracing the divine healing wisdom of Tibb-e-Nabawi (Prophetic Medicine) and pure Sunnah herbal formulations for holistic modern living.
          </p>
        </div>
      </section>

      {/* 2. Visual Story Overlay - The Origin of Al-Tooba (Preserved Text & Consultation Image) */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto -mt-8 sm:-mt-10 relative z-20 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white border border-[#D4A24C]/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_10px_40px_rgba(13,59,42,0.06)]">
          
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#0D3B2A]/10 text-[#0D3B2A] text-[10px] font-sans font-bold uppercase tracking-[0.15em]">
              <BookOpen className="w-3.5 h-3.5 text-[#D4A24C]" />
              <span>ESTABLISHED APOTHECARY</span>
            </div>

            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#0D3B2A] tracking-tight">
              The Origin of Al-Tooba®
            </h2>

            {/* Preserved Original Text Requested by User */}
            <p className="text-sm text-[#0D3B2A]/80 leading-relaxed font-sans">
              Founded on the belief that nature holds the answers to modern ailments, Al-Tooba® began as a small apothecary dedicated to purifying prophetic formulas. Our name, inspired by the blessed &apos;Tuba&apos; tree of Paradise, represents our commitment to botanical excellence, authenticity, and spiritual wellness.
            </p>
            
            <p className="text-sm text-[#0D3B2A]/80 leading-relaxed font-sans">
              For centuries, the remedies of the Prophet Muhammad (ﷺ)—such as black seed oil (Habbatul Barakah), Sidr honey, and olive leaf extracts—have guided millions in healthy living. We build upon this sacred canon, bridging ancient Tibb-e-Nabawi wisdom with strict scientific verification to create remedies you can trust.
            </p>

            <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/studio"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 bg-[#0D3B2A] text-[#FAF7F2] text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#1a4a38] transition-all duration-300 shadow-md"
              >
                <span>Explore The Remedies</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 border border-[#D4A24C] text-[#0D3B2A] hover:bg-[#FAF7F2] text-xs font-sans font-bold uppercase tracking-wider transition-colors"
              >
                <span>Book Consultation</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#D4A24C]/25 bg-[#FAF7F2] shadow-lg group">
            <img
              src="/hakeem_consultation.jpg"
              alt="Hakeem Abdul Qadir Attari Consulting Patient"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/65 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 shadow-lg">
              <p className="text-[#FAF7F2] font-serif font-bold text-xs sm:text-sm tracking-wide">
                Hakeem Abdul Qadir Attari
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Sacred Prophetic Remedies & Product Ecosystem */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-[#D4A24C] text-xs font-sans font-bold uppercase tracking-[0.2em]">SACRED INGREDIENTS</span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#0D3B2A] mt-2 tracking-tight">
            Our Prophetic Remedy Formulations
          </h2>
          <div className="w-16 h-[2px] bg-[#D4A24C] mx-auto mt-3 mb-4"></div>
          <p className="text-sm text-gray-600 font-sans max-w-2xl mx-auto">
            Discover the botanical pillars that power Al-Tooba&apos;s natural remedies, formulated according to the authentic Sunnah canon and pure Prophetic herbal traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propheticRemedies.map((remedy, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-[#D4A24C]/15 hover:border-[#D4A24C]/40 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="mb-4">
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider bg-[#FAF7F2] text-[#0D3B2A] border border-[#0D3B2A]/10 px-2.5 py-1 rounded-full">
                    {remedy.badge}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0D3B2A] mb-1">
                  {remedy.title}
                </h3>
                <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#D4A24C] mb-3">
                  {remedy.subtitle}
                </p>
                <p className="text-xs text-gray-600 font-sans leading-relaxed">
                  {remedy.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link 
                  to={remedy.link} 
                  className="text-xs font-sans font-bold text-[#0D3B2A] hover:text-[#D4A24C] flex items-center gap-1.5 transition-colors group/link"
                >
                  <span>View Product</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                </Link>
                <span className="text-[10px] text-gray-400 font-sans">100% Pure</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Meet Hakeem Abdul Qadir Attari & Rampur Apothecary Spotlight */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
        <div className="bg-[#0D3B2A] text-[#FAF7F2] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-[#D4A24C]/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A24C]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FAF7F2]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border-2 border-[#D4A24C]/40 shadow-2xl">
                <img 
                  src="/hakeem_attari.jpg" 
                  alt="Hakeem Abdul Qadir Attari" 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-center">
                  <p className="font-serif font-bold text-sm text-[#FAF7F2]">Hakeem Abdul Qadir Attari</p>
                  <p className="text-[10px] text-[#D4A24C] uppercase tracking-widest font-sans">Chief Herbalist & Founder</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#D4A24C]/30 text-[#D4A24C] text-[10px] font-sans font-bold uppercase tracking-[0.2em]">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>HEALING THROUGH SUNNAH</span>
              </div>

              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#FAF7F2] tracking-tight">
                Authentic Prophetic Medicine & Consultation Guidance
              </h2>

              <p className="text-sm text-[#FAF7F2]/80 leading-relaxed font-sans">
                Operating from our traditional apothecary in Rampur, Uttar Pradesh, Hakeem Abdul Qadir Attari has dedicated his life to reviving authentic Tibb-e-Nabawi (Prophetic Medicine) and pure natural remedies. Every batch of Al-Tooba oils, talbina, and herbal extracts is prepared under strict Sunnah guidelines and traditional purity standards.
              </p>

              <p className="text-sm text-[#FAF7F2]/80 leading-relaxed font-sans">
                We believe healthcare is spiritual and physical. Customers across India can connect directly with Hakeem Saab via Video, Audio, or WhatsApp for personalized, customized prophetic remedy regimens tailored to their unique wellness needs.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/booking"
                  className="inline-flex items-center gap-2 rounded-full px-7 py-3 bg-[#D4A24C] text-[#0D3B2A] text-xs font-sans font-extrabold uppercase tracking-wider hover:bg-[#e6b359] transition-all shadow-md"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Book 1-on-1 Consultation</span>
                </Link>
                <a
                  href="https://wa.me/918591916905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 border border-white/30 text-white hover:bg-white/10 text-xs font-sans font-bold uppercase tracking-wider transition-colors"
                >
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Impact & Community Trust Counter */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
        <div className="bg-[#FAF7F2] border border-[#D4A24C]/20 rounded-3xl p-8 sm:p-12 text-center">
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#0D3B2A] mb-2">
            Trusted by Lakhs Across India
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-sans max-w-xl mx-auto mb-10">
            Real health transformations rooted in the pure prophetic canon and holistic natural care.
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {trustMetrics.map((item, idx) => (
              <div key={idx} className="p-4 sm:p-6 bg-white rounded-2xl border border-[#D4A24C]/15 shadow-sm">
                <p className="font-serif font-extrabold text-2xl sm:text-4xl text-[#0D3B2A] mb-1">
                  {item.number}
                </p>
                <p className="font-sans font-bold text-xs sm:text-sm text-[#D4A24C] uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className="text-[10px] sm:text-xs text-gray-500 font-sans">
                  {item.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Promise & Dual CTA Section */}
      <section className="px-4 sm:px-8 max-w-4xl mx-auto text-center">
        <div className="w-12 h-12 rounded-full bg-[#0D3B2A]/5 border border-[#0D3B2A]/10 mx-auto flex items-center justify-center mb-4 text-[#D4A24C]">
          <Award className="w-6 h-6" />
        </div>

        <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#0D3B2A] tracking-tight">
          Begin Your Natural Healing Journey
        </h2>

        <p className="text-xs sm:text-sm text-gray-600 mt-4 leading-relaxed max-w-xl mx-auto font-sans">
          Whether you are looking to introduce daily Sunnah remedies like pure Barley Talbina and cold-pressed Black Seed Oil into your home, or seek tailored guidance from Hakeem Saab, Al-Tooba® is your trusted partner in prophetic wellness.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/studio"
            className="rounded-full px-8 py-3.5 bg-[#0D3B2A] text-[#FAF7F2] text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#1a4a38] transition-all shadow-md"
          >
            Explore Complete Collection
          </Link>
          <Link
            to="/booking"
            className="rounded-full px-8 py-3.5 bg-[#D4A24C] text-[#0D3B2A] text-xs font-sans font-extrabold uppercase tracking-wider hover:bg-[#e6b359] transition-all shadow-md"
          >
            Book Hakeem Consultation
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 sm:gap-5">
          <span className="flex items-center gap-2 text-[11px] font-sans font-semibold text-[#0D3B2A]/80 bg-white border border-[#0D3B2A]/10 rounded-full px-4 py-2 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4A24C]" />
            100% Lab Verified
          </span>
          <span className="flex items-center gap-2 text-[11px] font-sans font-semibold text-[#0D3B2A]/80 bg-white border border-[#0D3B2A]/10 rounded-full px-4 py-2 shadow-sm">
            <Leaf className="w-3.5 h-3.5 text-[#D4A24C]" />
            Pure Organic & Wildcrafted
          </span>
          <span className="flex items-center gap-2 text-[11px] font-sans font-semibold text-[#0D3B2A]/80 bg-white border border-[#0D3B2A]/10 rounded-full px-4 py-2 shadow-sm">
            <ScrollText className="w-3.5 h-3.5 text-[#D4A24C]" />
            Tibb-e-Nabawi Guidelines
          </span>
        </div>
      </section>

    </div>
  );
}
