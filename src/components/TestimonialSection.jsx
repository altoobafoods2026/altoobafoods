import React from 'react';
import { Link } from 'react-router-dom';

export default function TestimonialSection() {
  const cards = [
    {
      id: "01",
      tag: "Core Research",
      title: "Tibb-e-Nabawi",
      subtitle: "The Prophetic Way of Healing",
      desc: "Qur’an, Sunnat aur Islami tibbi riwayat ki roshni mein Prophetic Wellness ko samajhne ki ek koshish. Authentic references aur responsible understanding ke saath aam logon tak pahunchana."
    },
    {
      id: "02",
      tag: "Hijama Reference",
      title: "Hijama Encyclopedia",
      subtitle: "The Ultimate Guide",
      desc: "Hijama ki Islami riwayat se lekar anatomy, physiology, safety aur available scientific research tak comprehensive work. Contemporary understanding ke saath ek jagah document karna."
    },
    {
      id: "03",
      tag: "Youth Mission",
      title: "Khamosh Tabahi",
      subtitle: "The Silent Killer",
      desc: "Naujawan nasal ko digital fitnon se bachane ke liye awareness mission. Islamic rehnumai, parental responsibility aur recovery-oriented lifestyle ko structured framework mein samjhana."
    }
  ];

  return (
    <section className="w-full bg-[#FAF7F2] pt-8 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[85rem] mx-auto">
        
        {/* Main Bento Grid */}
        <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_390px] gap-5">
          
          {/* Left Content Card */}
          <div className="bg-white rounded-3xl p-5 lg:p-7 xl:p-8 shadow-sm border border-[#D4A24C]/25 flex flex-col justify-between h-full">
            
            {/* Top Section: Header & Quote */}
            <div>
              {/* Meaningful Section Heading */}
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center text-[#8A5E12] text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.2em] bg-[#0D3B2A]/5 px-3 py-1 rounded-full">
                  OUR FOUNDER'S JOURNEY
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[2.1rem] font-serif font-bold text-[#1a1a1a] leading-tight tracking-tight mb-3.5">
                Prophetic Healing & Modern Research
              </h2>
              
              {/* Quote Block */}
              <div className="relative border-l-[3px] border-[#D4A24C] bg-[#FAF7F2]/60 rounded-r-2xl pl-4 sm:pl-5 pr-4 py-2.5 mb-3.5">
                <p className="text-[#0D3B2A] text-sm sm:text-base lg:text-[1.05rem] font-serif font-bold leading-relaxed">
                  “Qur’an-o-Sunnat se milne wali rehnumai ko samajhna, Tibb-e-Nabawi ke ilm ko zinda rakhna aur ise zimmedari ke saath insaniyat tak pahunchana — yahi hamare safar ka maqsad hai.”
                </p>
              </div>
              
              {/* Story Intro */}
              <p className="text-xs sm:text-[13px] text-gray-600 leading-relaxed font-normal mb-5">
                Islam qubool karne ke baad ek zaati health struggle ne mujhe Tibb-e-Nabawi ki taraf mutawajjah kiya. Wahi talaash dheere-dheere research, taleem, books, Hijama awareness, counselling aur Al Tooba Prophetic Remedies ke mission mein tabdeel ho gayi.
              </p>
            </div>

            {/* Middle Section: 3 High-End Designed Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-4">
              {cards.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-gradient-to-b from-[#FAF7F2] to-white rounded-2xl p-3.5 sm:p-4 border border-[#0D3B2A]/10 hover:border-[#D4A24C] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top golden accent bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4A24C] to-[#0D3B2A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div>
                    {/* Header: Number / Tag */}
                    <div className="flex items-center mb-2.5">
                      <span className="text-[10px] font-sans font-bold tracking-wider text-[#D4A24C] bg-[#0D3B2A]/5 px-2.5 py-1 rounded-md uppercase">
                        {item.id} • {item.tag}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="font-serif font-bold text-[#1a1a1a] text-[15px] leading-snug group-hover:text-[#0D3B2A] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[11px] font-bold text-[#D4A24C] uppercase tracking-wider mb-2">
                      {item.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-[12px] text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Section: Compact Mission Footer */}
            <div className="border-t border-gray-100 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-gray-600 font-sans">
                <span className="w-2 h-2 rounded-full bg-[#D4A24C]"></span>
                <span>Alhamdulillah, <strong className="text-[#0D3B2A]">12–13 lakh+</strong> logon tak educational outreach.</span>
              </div>
              <p className="font-serif italic text-xs text-[#0D3B2A] font-semibold">
                “Ilm-e-Nabawi se Rehnumai • Research se Samajh”
              </p>
            </div>
            
          </div>

          {/* Right Image Card */}
          <div className="relative w-full h-[470px] lg:h-[550px] xl:h-auto rounded-3xl overflow-hidden shadow-sm group border border-[#D4A24C]/25">
            <img 
              src="/hakeem_attari.webp" 
              alt="Hakeem Abdul Qadir Attari" 
              width="520"
              height="643"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B2A] via-[#0D3B2A]/30 to-transparent opacity-95"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
              <span className="inline-block bg-[#D4A24C]/20 text-[#D4A24C] border border-[#D4A24C]/30 text-[9.5px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2 backdrop-blur-sm">
                Prophetic Medicine
              </span>
              <h3 className="text-white font-serif font-bold text-2xl sm:text-3xl mb-1.5 leading-tight">
                Hakeem Abdul<br/>Qadir Attari
              </h3>
              <p className="text-[#D4A24C] text-[10.5px] font-bold uppercase tracking-wider mb-2">
                Founder — Al Tooba Prophetic Remedies
              </p>
              <div className="w-10 h-0.5 bg-[#D4A24C] mb-2 rounded-full"></div>
              <p className="text-white/80 text-xs leading-relaxed font-medium">
                Tibb-e-Nabawi Researcher • Author • Hijama Practitioner
              </p>
            </div>
          </div>

        </div>

        {/* Consultation CTA Banner */}
        <div className="mt-4.5 w-full">
          <div className="relative bg-[#0D3B2A] rounded-3xl p-5 sm:p-7 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm border border-[#D4A24C]/20">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4A24C]/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Left: Text */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#D4A24C]/10 border border-[#D4A24C]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#D4A24C]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg sm:text-xl text-white mb-1">
                  Book Your Personal Consultation
                </h3>
                <p className="text-xs text-white/75 font-sans max-w-xl leading-relaxed">
                  Get personalized guidance from Hakeem Saab via Video, Audio, or WhatsApp. Sunnah-based healing, tailored to your needs.
                </p>
              </div>
            </div>

            {/* Right: CTA Button */}
            <Link
              to="/consultation#consultation-types"
              className="relative z-10 inline-flex items-center justify-center gap-2.5 bg-[#D4A24C] text-[#0D3B2A] text-[11px] sm:text-xs font-sans font-bold uppercase tracking-widest px-7 py-3 rounded-full hover:bg-white transition-all duration-300 shadow-xl hover:shadow-2xl flex-shrink-0 group w-full md:w-auto"
            >
              Book Appointment
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  );
}
