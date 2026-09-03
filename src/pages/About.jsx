import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function About() {

  const pillars = [
    { id: '01', title: 'AUTHENTICITY', desc: 'Jahan kisi ingredient ya practice ko directly Tibb-e-Nabawi se associate kiya jata hai, wahan hamari koshish hoti hai ke uski Islamic attribution ko responsible tareeqe se samjha aur present kiya jaye. Har traditional ingredient ko bina daleel "Prophetic Medicine" keh dena hamari approach nahi hai.' },
    { id: '02', title: 'QUALITY', desc: 'Natural products ki effectiveness aur consumer experience mein raw material ki quality ek important factor hoti hai. Isliye sourcing se lekar processing, formulation, packaging aur storage tak quality-focused approach develop karna hamare mission ka hissa hai.' },
    { id: '03', title: 'RESEARCH', desc: 'Traditional knowledge valuable hai, lekin modern audience ke liye scientific understanding bhi important hai. Isliye hamari educational approach mein available scientific literature, pharmacological research aur relevant clinical evidence ko bhi samajhne ki koshish ki jati hai.' },
    { id: '04', title: 'RESPONSIBILITY', desc: 'Hum miraculous cures, guaranteed results ya unrealistic medical promises ko responsible healthcare communication nahi samajhte. Har individual ki medical condition different ho sakti hai.' },
  ];




  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16 sm:pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative text-center overflow-hidden pt-32 pb-20 sm:pb-24 px-6 sm:px-12 flex flex-col items-center justify-center min-h-[420px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/studio_bg.png')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B2A]/95 via-[#0D3B2A]/80 to-black/60" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#FAF7F2]/10 border border-[#D4A24C]/30 text-[#D4A24C] text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-[0.2em] mb-4 backdrop-blur-sm">
            AL TOOBA PROPHETIC REMEDIES PRIVATE LIMITED
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F2] leading-tight tracking-tight drop-shadow-md">
            Reviving Prophetic Wisdom,<br />
            <span className="italic font-normal text-[#D4A24C]">Dedicated to Humanity.</span>
          </h1>
          <p className="text-sm sm:text-base text-[#FAF7F2]/85 max-w-2xl mx-auto mt-5 leading-relaxed font-sans font-medium">
            Guided by Knowledge • Inspired by Research • Committed to Quality • From India, With a Vision to Serve the World.
          </p>
        </div>
      </section>

      {/* 2. Introduction & Origin */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto -mt-8 sm:-mt-10 relative z-20 mb-16 sm:mb-20">
        <div className="bg-white border border-[#D4A24C]/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_10px_40px_rgba(13,59,42,0.06)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[#D4A24C] text-xs font-sans font-bold uppercase tracking-[0.2em]">ABOUT AL TOOBA</span>
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#0D3B2A] tracking-tight">
                More Than a Wellness Company
              </h2>
              <p className="text-sm text-[#0D3B2A]/80 leading-relaxed font-sans">
                Al Tooba Prophetic Remedies Private Limited is not merely a wellness company. It is an initiative born from a personal journey of hardship, healing, learning and a deep commitment to revive and responsibly present the timeless wellness traditions associated with Tibb-e-Nabawi — Prophetic Medicine.
              </p>
              <div className="border-l-[3px] border-[#D4A24C] bg-[#FAF7F2]/60 rounded-r-2xl pl-5 pr-4 py-3">
                <p className="text-[#0D3B2A] text-sm sm:text-base font-serif font-bold leading-relaxed">
                  "Tradition ko sirf preserve nahi karna, balki use authentic references, responsible research, quality-focused sourcing aur modern standards ke saath duniya ke saamne pesh karna."
                </p>
              </div>
              <p className="text-sm text-[#0D3B2A]/80 leading-relaxed font-sans">
                Aaj Al Tooba ka mission sirf natural wellness products tak mehdood nahi hai. Hum Tibb-e-Nabawi Education, Prophetic Wellness, Hijama Awareness, Research & Documentation, Natural Product Development aur Community Health Awareness jaise multiple areas mein kaam karne ki koshish kar rahe hain.
              </p>
            </div>
            <div className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#D4A24C]/25 bg-[#FAF7F2] shadow-lg group">
              <img src="/hakeem_attari.webp" alt="Hakeem Abdul Qadir Attari" width="520" height="643" loading="lazy" decoding="async" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-black/65 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <p className="text-[#FAF7F2] font-serif font-bold text-sm">Hakeem Abdul Qadir Attari</p>
                <p className="text-[#D4A24C] text-[10px] uppercase tracking-widest font-sans font-bold">Founder</p>
              </div>
            </div>
          </div>

          {/* Origin Story */}
          <div className="border-t border-gray-100 pt-10">
            <span className="text-[#D4A24C] text-xs font-sans font-bold uppercase tracking-[0.2em]">OUR ORIGIN</span>
            <h3 className="font-serif font-bold text-xl sm:text-3xl text-[#0D3B2A] tracking-tight mt-2 mb-5">
              A Personal Journey That Became a Purpose
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-[#0D3B2A]/80 leading-relaxed font-sans">
              <div className="space-y-4">
                <p>Al Tooba ki kahani iske Founder, Hakeem Abdul Qadir Attari, ke zaati safar se shuru hoti hai. Islam qubool karne ke baad unki zindagi mein ek mushkil daur aaya. Mukhalifat aur sakht halaat ke darmiyan unhein ek serious head injury ka saamna karna pada. Iske baad sehat se mutalliq complications ne ek lambi medical journey ki shakal ikhtiyar ki.</p>
                <p>Isi talaash ke dauran unka ta'aruf Tibb-e-Nabawi (Prophetic Medicine) aur Islamic medical heritage se hua. Kalonji, Zaitoon, Shahad, Hijama aur dusri natural wellness traditions ke bare mein padhna shuru hua.</p>
              </div>
              <div className="space-y-4">
                <p>Sirf istemal nahi, balki ye samajhne ki koshish shuru hui ke in cheezon ka zikr Islamic sources mein kis context mein milta hai, classical scholars ne inke bare mein kya likha aur modern scientific literature inke constituents aur possible health effects ke bare mein kya discuss karta hai.</p>
                <div className="border-l-[3px] border-[#D4A24C] bg-[#FAF7F2]/60 rounded-r-2xl pl-5 pr-4 py-3">
                  <p className="text-[#0D3B2A] font-serif font-bold leading-relaxed">
                    "Agar ye ilm hamare paas maujood hai, to ise authentic, responsible aur accessible form mein aam insaan tak kyun na pahunchaya jaye?"
                  </p>
                </div>
                <p>Yahin se Al Tooba Prophetic Remedies ke safar ki buniyad padi.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. From Study to Framework — Modern Luxury Redesign */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-[#D4A24C] text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.25em] bg-[#FAF7F2] border border-[#D4A24C]/25 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            OUR PHILOSOPHY
          </span>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0D3B2A] tracking-tight leading-tight">
            From Personal Experience to Responsible Study
          </h2>
          <div className="w-16 h-[2px] bg-[#D4A24C] mx-auto mt-4 mb-4"></div>
          <p className="text-sm sm:text-base text-gray-600 font-sans max-w-2xl mx-auto leading-relaxed">
            Al Tooba ki philosophy sirf personal experiences par mabni nahi hai. Hamari koshish Tibb-e-Nabawi se mutalliq subjects ko mukhtalif levels par samajhne ki hai.
          </p>
        </div>

        {/* 5-Step Process Flow Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-10">
          {[
            {
              num: '01',
              title: "Qur'an & Traditions",
              subtitle: 'Authentic Sunnah',
              desc: 'Primary sacred foundation and authentic narrations.',
            },
            {
              num: '02',
              title: 'Classical Literature',
              subtitle: 'Islamic Heritage',
              desc: 'Centuries of classical scholars\' documented works.',
            },
            {
              num: '03',
              title: 'Traditional Knowledge',
              subtitle: 'Historical Usage',
              desc: 'Generational wisdom and empirical traditional practice.',
            },
            {
              num: '04',
              title: 'Modern Science',
              subtitle: 'Clinical Research',
              desc: 'Pharmacological studies and contemporary evidence.',
            },
            {
              num: '05',
              title: 'Responsible Output',
              subtitle: 'Public Education',
              desc: 'Quality formulations and transparent awareness.',
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="group relative bg-white rounded-2xl p-5 border border-[#D4A24C]/20 hover:border-[#D4A24C] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4A24C] to-[#0D3B2A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div>
                {/* Number Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-serif font-extrabold text-2xl sm:text-3xl text-[#0D3B2A]/20 group-hover:text-[#D4A24C] transition-colors duration-300">
                    {step.num}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#D4A24C]/30 group-hover:bg-[#D4A24C] transition-colors"></span>
                </div>

                {/* Subtitle tag */}
                <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#D4A24C] mb-1.5">
                  {step.subtitle}
                </p>

                {/* Title */}
                <h3 className="font-serif font-bold text-[#0D3B2A] text-base leading-snug mb-2 group-hover:text-[#0D3B2A] transition-colors">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-gray-500 font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Distinction & Responsibility Callout Box */}
        <div className="bg-gradient-to-br from-white to-[#FAF7F2] border border-[#D4A24C]/30 rounded-3xl p-6 sm:p-9 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4A24C]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-5 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#0D3B2A] text-[#D4A24C] flex items-center justify-center shrink-0 shadow-md">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div className="space-y-1.5 flex-1">
              <h4 className="font-serif font-bold text-[#0D3B2A] text-base sm:text-lg">
                Religious Evidence vs. Scientific Evidence
              </h4>
              <p className="text-xs sm:text-[13px] text-gray-600 font-sans leading-relaxed">
                Hum samajhte hain ke religious evidence aur scientific evidence do mukhtalif categories hain. Kisi cheez ka Qur'an ya Hadith mein zikr hona uski Islamic significance ko establish karta hai, jabki medical effects ke liye modern scientific research aur clinical evaluation ki apni methodology hoti hai. Isi distinction ko maintain karna hamare liye <strong className="text-[#0D3B2A] font-semibold">Responsible Tibb-e-Nabawi Education</strong> ka buniyadi hissa hai.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* 4. Our Approach — 4 Pillars */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
        <div className="text-center mb-10">
          <span className="text-[#D4A24C] text-xs font-sans font-bold uppercase tracking-[0.2em]">OUR APPROACH</span>
          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#0D3B2A] mt-2 tracking-tight">
            Tradition Meets Responsibility
          </h2>
          <div className="w-16 h-[2px] bg-[#D4A24C] mx-auto mt-3 mb-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((p) => (
            <div key={p.id} className="group bg-white rounded-2xl p-5 sm:p-6 border border-[#0D3B2A]/10 hover:border-[#D4A24C] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4A24C] to-[#0D3B2A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="text-[10px] font-sans font-bold tracking-wider text-[#D4A24C] bg-[#0D3B2A]/5 px-2.5 py-1 rounded-md">
                {p.id}
              </span>
              <h3 className="font-serif font-bold text-[#0D3B2A] text-lg mt-3 mb-2">{p.title}</h3>
              <p className="text-[12px] text-gray-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-block bg-[#0D3B2A] text-white px-6 py-3 rounded-2xl">
            <p className="font-serif font-bold text-sm sm:text-base text-[#D4A24C]">
              "Faith with Responsibility. Tradition with Research. Wellness with Wisdom."
            </p>
          </div>
        </div>
      </section>

      {/* 5. Research & Publications — Books Section */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-16 sm:mb-20">
        <div className="bg-[#0D3B2A] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-[#D4A24C]/20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4A24C]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FAF7F2]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <span className="text-[#D4A24C] text-xs font-sans font-bold uppercase tracking-[0.2em]">RESEARCH & PUBLICATIONS</span>
              <h2 className="font-serif font-bold text-2xl sm:text-4xl text-white mt-2 tracking-tight">
                Books by Hakeem Abdul Qadir Attari
              </h2>
              <div className="w-16 h-[2px] bg-[#D4A24C] mx-auto mt-3 mb-4"></div>
              <p className="text-sm text-white/70 font-sans max-w-2xl mx-auto">
                Tibb-e-Nabawi aur related wellness subjects ko structured literature ki shakl mein document karne ki taraf kaam kiya gaya.
              </p>
            </div>

            {/* Book 1: Hijama Encyclopedia */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-12">
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative max-w-[280px] sm:max-w-[320px] rounded-2xl overflow-hidden shadow-2xl border border-[#D4A24C]/30 group">
                  <img src="/book_hijama_encyclopedia.png" alt="The Ultimate Hijama Encyclopedia" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[10px] font-sans font-bold tracking-wider text-[#D4A24C] bg-white/10 px-3 py-1 rounded-full">BOOK 01</span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  The Ultimate Hijama Encyclopedia
                </h3>
                <p className="text-sm text-white/75 leading-relaxed font-sans">
                  Hijama par ek comprehensive reference work develop karne ka mission shuru kiya gaya jisme Hijama ko sirf traditional practice ke taur par nahi, balki multiple perspectives se samajhne ki koshish ki gayi.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Islamic Literature', 'Historical Context', 'Anatomy', 'Physiology', 'Scientific Research', 'Safety & Practice'].map((tag, i) => (
                    <span key={i} className="text-[10px] font-sans font-bold text-[#D4A24C] bg-[#D4A24C]/10 border border-[#D4A24C]/20 px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-sans italic">
                  Maqsad Hijama ke bare mein exaggerated claims karna nahi, balki traditional knowledge aur available contemporary understanding ko ek structured educational framework mein document karna hai.
                </p>
              </div>
            </div>

            {/* Book 2: Khamosh Tabahi */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center border-t border-white/10 pt-10">
              <div className="lg:col-span-7 space-y-4 order-2 lg:order-1">
                <span className="text-[10px] font-sans font-bold tracking-wider text-[#D4A24C] bg-white/10 px-3 py-1 rounded-full">BOOK 02</span>
                <h3 className="font-serif font-bold text-xl sm:text-2xl text-white">
                  Khamosh Tabahi — The Silent Killer
                </h3>
                <p className="text-sm text-white/75 leading-relaxed font-sans">
                  Counselling aur support calls ke dauran teenagers aur young adults ki taraf se pornography exposure, compulsive masturbation, digital addiction, self-control aur related emotional difficulties ke bare mein queries badhne lagi.
                </p>
                <p className="text-sm text-white/75 leading-relaxed font-sans">
                  Is educational initiative mein pornography aur compulsive sexual behaviour ko Islamic values, digital discipline, behavioural understanding, parental responsibility, prevention aur recovery-oriented lifestyle ke perspectives se discuss karne ki koshish ki gayi.
                </p>
                <p className="text-xs text-white/60 leading-relaxed font-sans italic">
                  Maqsad sirf problem ko highlight karna nahi — Parents ko educate karna, young generation ko aware karna aur prevention ki taraf ek responsible conversation shuru karna hai.
                </p>
              </div>
              <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
                <div className="relative max-w-[280px] sm:max-w-[320px] rounded-2xl overflow-hidden shadow-2xl border border-[#D4A24C]/30 group">
                  <img src="/book_khamosh_tabahi.jpg" alt="Khamosh Tabahi - The Silent Killer" className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 9. Promise & CTA — Editorial Light Design */}
      <section className="px-4 sm:px-8 max-w-7xl mx-auto">
        
        {/* Large Typographic Quote — Hero style */}
        <div className="text-center mb-12">
          <span className="text-[#D4A24C] text-xs font-sans font-bold uppercase tracking-[0.25em] mb-6 block">OUR PROMISE</span>
          
          {/* Giant editorial quote */}
          <div className="max-w-4xl mx-auto mb-10">
            <p className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-[#0D3B2A] leading-tight tracking-tight">
              <span className="text-[#D4A24C] text-5xl sm:text-7xl leading-none">"</span>
              Takleef ne Talaash paida ki.
              <br className="hidden sm:block" />
              Talaash ne <span className="text-[#D4A24C] italic">Ilm</span> diya.
              <br className="hidden sm:block" />
              Ilm ne Khidmat ka raasta dikhaya.
              <br className="hidden sm:block" />
              Aur Khidmat ne Al Tooba ko ek
              <br className="hidden sm:block" />
              <span className="text-[#D4A24C] italic">Mission</span> bana diya.
              <span className="text-[#D4A24C] text-5xl sm:text-7xl leading-none">"</span>
            </p>
          </div>

          {/* Founder strip */}
          <div className="inline-flex items-center gap-4 bg-white border border-[#D4A24C]/20 rounded-full px-5 py-2.5 shadow-sm mb-12">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4A24C]/40 shrink-0">
              <img src="/hakeem_attari.webp" alt="Hakeem Abdul Qadir Attari" width="40" height="40" loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
            </div>
            <div className="text-left">
              <p className="font-serif font-bold text-[#0D3B2A] text-sm leading-tight">Hakeem Abdul Qadir Attari</p>
              <p className="text-[9px] text-[#D4A24C] uppercase tracking-wider font-sans font-bold">Founder • Researcher • Author</p>
            </div>
          </div>
        </div>

        {/* Promise Strip — Horizontal with golden separators */}
        <div className="bg-white border border-[#D4A24C]/15 rounded-2xl shadow-sm overflow-hidden mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D4A24C]/15">
            {[
              { keyword: 'Authenticity', line: 'without exaggeration' },
              { keyword: 'Tradition', line: 'without misinformation' },
              { keyword: 'Research', line: 'without false promises' },
              { keyword: 'Business', line: 'without forgetting humanity' },
            ].map((p, idx) => (
              <div key={idx} className="px-6 py-6 text-center relative group">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#D4A24C] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <h4 className="font-serif font-bold text-[#0D3B2A] text-xl sm:text-2xl mb-1 group-hover:text-[#D4A24C] transition-colors">{p.keyword}</h4>
                <p className="text-xs text-gray-400 font-sans">{p.line}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link to="/studio" className="w-full sm:w-auto rounded-full px-10 py-4 bg-[#0D3B2A] text-[#FAF7F2] text-xs font-sans font-bold uppercase tracking-wider hover:bg-[#1a4a38] transition-all shadow-lg inline-flex items-center justify-center gap-2">
            Explore Products <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/booking" className="w-full sm:w-auto rounded-full px-10 py-4 bg-[#D4A24C] text-[#0D3B2A] text-xs font-sans font-extrabold uppercase tracking-wider hover:bg-[#e6b359] transition-all shadow-lg text-center">
            Book Consultation
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 font-sans italic">
          Our Journey Continues — From India, With a Vision to Serve the World.
        </p>
      </section>

    </div>
  );
}
