import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToastStore } from '../store/toastStore';
import ConsultationForm from '../components/ConsultationForm';

export default function Journal() {
  const navigate = useNavigate();
  const [heroLang, setHeroLang] = useState('EN');

  const handleBooking = (type) => {
    navigate(`/booking?type=${encodeURIComponent(type)}`);
  };

  const consultationTypes = [
    {
      id: 'video',
      title: 'Video Consultation',
      description: 'Face-to-face consultation with Hakeem Saab',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
      ),
      features: ['Live Video Call', 'Personalized Advice', 'Treatment Plan'],
      cta: 'BOOK VIDEO CALL',
    },
    {
      id: 'audio',
      title: 'Audio Consultation',
      description: 'Connect via audio call from anywhere',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
      ),
      features: ['Audio Call', 'Private & Secure', 'Easy & Convenient'],
      cta: 'BOOK AUDIO CALL',
    },

  ];

  const steps = [
    {
      num: 1,
      title: 'Book Appointment',
      desc: 'Choose your preferred date, time & mode.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      ),
    },
    {
      num: 2,
      title: 'Share Details',
      desc: 'Fill in your health details & medical history.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
    },
    {
      num: 3,
      title: 'Consult Hakeem Saab',
      desc: 'Get expert guidance & personalized advice.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      ),
    },
    {
      num: 4,
      title: 'Follow Treatment',
      desc: 'Follow the prescribed treatment & guidelines.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296a3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043A3.745 3.745 0 0 1 21 12Z" />
        </svg>
      ),
    },
  ];

  const specializations = [
    { title: 'Digestive Disorders', icon: '🫁' },
    { title: 'Skin & Hair Problems', icon: '🌿' },
    { title: 'Joint & Muscle Pain', icon: '🦴' },
    { title: 'Stress & Sleep Issues', icon: '🧠' },
    { title: 'Immunity Boosting', icon: '🛡️' },
    { title: "Men's & Women's Health", icon: '❤️' },
  ];

  return (
    <div className="pt-20 bg-[#FAF7F2] min-h-screen">

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 1: HERO */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden transition-all duration-500">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-12 sm:pt-20 pb-8 sm:pb-12 relative">
          
          {/* Language Toggle */}
          <div className="absolute top-4 right-6 sm:top-8 sm:right-8 flex items-center bg-white/60 backdrop-blur-md rounded-full border border-[#D4A24C]/40 p-1 shadow-sm z-20 transition-all duration-300">
            <button 
              onClick={() => setHeroLang('EN')}
              className={`px-3 py-1 text-[10px] sm:text-xs font-bold font-sans rounded-full transition-all duration-300 ${heroLang === 'EN' ? 'bg-[#0D3B2A] text-[#FAF7F2] shadow-sm' : 'text-[#0D3B2A] hover:bg-[#D4A24C]/20'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setHeroLang('HI')}
              className={`px-3 py-1 text-[10px] sm:text-xs font-bold font-sans rounded-full transition-all duration-300 ${heroLang === 'HI' ? 'bg-[#0D3B2A] text-[#FAF7F2] shadow-sm' : 'text-[#0D3B2A] hover:bg-[#D4A24C]/20'}`}
            >
              हिंदी
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left: Text */}
            <div className="space-y-6">
              <span className={`inline-block text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#0D3B2A] border border-[#0D3B2A]/20 rounded-full px-5 py-2 transition-opacity duration-300 ${heroLang === 'HI' ? 'tracking-wider' : ''}`}>
                {heroLang === 'EN' ? 'Expert Care, Rooted In Sunnah' : 'सुन्नत की रौशनी में बेहतरीन इलाज'}
              </span>

              <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#0D3B2A] leading-tight tracking-tight transition-opacity duration-300">
                {heroLang === 'EN' ? (
                  <>Consult Hakeem<br />Abdul Qadir Attari</>
                ) : (
                  <>हकीम अब्दुल कादिर अत्तारी<br />से मशवरा लें</>
                )}
              </h1>

              <p className={`text-[10px] sm:text-xs font-sans font-bold uppercase tracking-[0.18em] text-[#D4A24C] transition-opacity duration-300 ${heroLang === 'HI' ? 'tracking-wider' : ''}`}>
                {heroLang === 'EN' ? 'Personalized Consultation For Your Well-Being' : 'आपकी सेहत और तंदुरुस्ती के लिए खास मशवरा'}
              </p>

              <p className="text-sm sm:text-base text-[#0D3B2A]/70 font-sans leading-relaxed max-w-md transition-opacity duration-300">
                {heroLang === 'EN' 
                  ? 'Get guidance from our experienced Hakeem Saab with personalized herbal & lifestyle solutions based entirely on the divine wisdom of Tibb-e-Nabawi (Prophetic Medicine).' 
                  : 'हमारे तजुर्बेकार हकीम साहब से अपनी सेहत के लिए खास हर्बल और लाइफस्टाइल रहनुमाई (guidance) हासिल करें, जो पूरी तरह तिब्ब-ए-नबवी के मुक़द्दस तरीकों पर मबनी है।'}
              </p>

              {/* Feature Badges */}
              <div className="flex flex-wrap gap-4 sm:gap-6 pt-2 transition-opacity duration-300">
                {[
                  { 
                    en: 'Sunnah Based Treatments', 
                    hi: 'सुन्नत के मुताबीक इलाज',
                    icon: '🌙' 
                  },
                  { 
                    en: '100% Natural & Safe', 
                    hi: '100% कुदरती और महफ़ूज़',
                    icon: '🌿' 
                  },
                  { 
                    en: 'Private & Confidential', 
                    hi: 'निजी और राज़दारी',
                    icon: '🔒' 
                  },
                ].map((f) => {
                  const label = heroLang === 'EN' ? f.en : f.hi;
                  const words = label.split(' ');
                  const firstPart = words.length > 2 ? words.slice(0, 2).join(' ') : words[0];
                  const secondPart = words.length > 2 ? words.slice(2).join(' ') : words.slice(1).join(' ');

                  return (
                    <div key={f.en} className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-[#0D3B2A]/5 border border-[#0D3B2A]/10 flex items-center justify-center text-sm">
                        {f.icon}
                      </div>
                      <span className="text-[10px] sm:text-xs font-sans font-bold text-[#0D3B2A]/80 leading-tight">
                        {firstPart}<br />
                        <span className="text-[#0D3B2A]/50 font-semibold">{secondPart}</span>
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  document.getElementById('consultation-types')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="mt-4 inline-flex items-center gap-2 bg-[#0D3B2A] text-[#FAF7F2] text-[11px] font-sans font-bold uppercase tracking-widest px-7 py-4 rounded-full hover:bg-[#D4A24C] hover:text-[#0D3B2A] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                {heroLang === 'EN' ? 'Book Your Consultation' : 'अपना अपॉइंटमेंट बुक करें'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(13,59,42,0.12)] border border-[#0D3B2A]/5">
                <img
                  src="/hakeem_consultation.png"
                  alt="Hakeem Abdul Qadir Attari consulting a patient"
                  className="w-full h-[350px] sm:h-[450px] lg:h-[500px] object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/90 backdrop-blur-lg border border-[#D4A24C]/20 rounded-2xl px-5 py-3 shadow-xl flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-[#D4A24C] flex items-center justify-center text-white text-xs font-bold border-2 border-white">A</div>
                  <div className="w-8 h-8 rounded-full bg-[#0D3B2A] flex items-center justify-center text-white text-xs font-bold border-2 border-white">K</div>
                  <div className="w-8 h-8 rounded-full bg-[#D4A24C]/70 flex items-center justify-center text-white text-xs font-bold border-2 border-white">+</div>
                </div>
                <div>
                  <p className="text-sm font-serif font-bold text-[#0D3B2A]">5000+</p>
                  <p className="text-[10px] font-sans text-[#0D3B2A]/60 font-semibold">Patients Consulted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 2: CHOOSE CONSULTATION TYPE */}
      {/* ═══════════════════════════════════════════════ */}
      <section id="consultation-types" className="pt-12 sm:pt-16 pb-10 sm:pb-16 border-t border-[#D4A24C]/30 shadow-[inset_0_10px_30px_-10px_rgba(212,162,76,0.15)] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-white via-[#FAF7F2] to-[#E3D4B6]/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Section Header */}
          <div className="text-center mb-14 transition-opacity duration-300">
            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#0D3B2A] tracking-tight">
              {heroLang === 'EN' ? 'Schedule Your Consultation' : 'अपना अपॉइंटमेंट शेड्यूल करें'}
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-12 bg-[#D4A24C]/40" />
              <span className="text-[#D4A24C] text-lg">✦</span>
              <div className="h-px w-12 bg-[#D4A24C]/40" />
            </div>
          </div>

          {/* New 2-Column Layout for Booking */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            {/* Left Column: Descriptive Text */}
            <div className="flex flex-col justify-center order-2 lg:order-1 pr-0 lg:pr-8 transition-opacity duration-300">
              <div className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-[#D4A24C]/20 w-fit mb-8 shadow-sm ${heroLang === 'HI' ? 'tracking-wider' : ''}`}>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4A24C] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4A24C]"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0D3B2A]">
                  {heroLang === 'EN' ? 'Appointments Open' : 'बुकिंग जारी है'}
                </span>
              </div>
              
              <h3 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#0D3B2A] mb-6 leading-[1.1] tracking-tight">
                {heroLang === 'EN' ? (
                  <>
                    Begin Your Healing <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A24C] to-[#B08638] italic pr-2">Journey Today.</span>
                  </>
                ) : (
                  <>
                    आज ही अपनी <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A24C] to-[#B08638] italic pr-2">शिफ़ा का सफर शुरू करें।</span>
                  </>
                )}
              </h3>
              
              <p className="font-sans text-base sm:text-lg text-[#0D3B2A]/70 mb-10 leading-relaxed max-w-lg">
                {heroLang === 'EN' 
                  ? "Connect directly with Hakeem Saab for personalized, sunnah-based medical advice tailored specifically to your body's unique needs. Experience the purity of traditional healing methods that have stood the test of time."
                  : "हकीम साहब से सीधे राब्ता करें और अपने जिस्म की खास ज़रूरतों के मुताबीक सुन्नत पर मबनी तिब्बी मशवरा हासिल करें। सदियों से आज़माए हुए रिवायती (traditional) तिब्बी तरीकों की शिफ़ा का तजुर्बा करें।"}
              </p>
              
              <div className="h-px w-full max-w-md bg-gradient-to-r from-[#D4A24C]/30 to-transparent mb-10"></div>
              
              <ul className="space-y-8 mb-10 max-w-md">
                <li className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-[0_8px_20px_rgba(13,59,42,0.06)] border border-[#0D3B2A]/5 flex items-center justify-center flex-shrink-0 text-[#D4A24C] group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                  </div>
                  <div>
                    <h4 className={`font-bold font-sans text-[#0D3B2A] text-sm mb-1.5 uppercase tracking-wider ${heroLang === 'HI' ? 'tracking-widest' : ''}`}>
                      {heroLang === 'EN' ? 'Video Consultation' : 'वीडियो मशवरा'}
                    </h4>
                    <p className="text-sm text-[#0D3B2A]/60 leading-relaxed">
                      {heroLang === 'EN' 
                        ? 'Face-to-face interaction for a thorough diagnosis and a tailored holistic treatment plan.'
                        : 'मुकम्मल तशखीस (thorough diagnosis) और एक खास तिब्बी मंसूबे के लिए आमने-सामने गुफ्तगू करें।'}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-[0_8px_20px_rgba(13,59,42,0.06)] border border-[#0D3B2A]/5 flex items-center justify-center flex-shrink-0 text-[#0D3B2A] group-hover:scale-110 transition-transform duration-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" /></svg>
                  </div>
                  <div>
                    <h4 className={`font-bold font-sans text-[#0D3B2A] text-sm mb-1.5 uppercase tracking-wider ${heroLang === 'HI' ? 'tracking-widest' : ''}`}>
                      {heroLang === 'EN' ? 'Audio & WhatsApp' : 'ऑडियो और व्हाट्सएप'}
                    </h4>
                    <p className="text-sm text-[#0D3B2A]/60 leading-relaxed">
                      {heroLang === 'EN'
                        ? 'Convenient options for follow-ups and quick, accessible guidance from anywhere in the world.'
                        : 'दुनिया में कहीं से भी फॉलो-अप और फौरी रहनुमाई (guidance) के लिए बेहतरीन सहूलत।'}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Column: The Form */}
            <div className="order-1 lg:order-2 w-full max-w-xl mx-auto lg:max-w-none">
              <ConsultationForm initialType="Video Consultation" redirectAfterSuccess={false} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 3: HOW IT WORKS */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="pt-8 sm:pt-12 pb-16 sm:pb-24 bg-[#FAF7F2] border-y border-[#D4A24C]/30 relative z-10 shadow-[0_10px_30px_-10px_rgba(212,162,76,0.1)]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Section Header */}
          <div className="text-center mb-14">
            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#0D3B2A] tracking-tight">
              How It Works
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-12 bg-[#D4A24C]/40" />
              <span className="text-[#D4A24C] text-lg">✦</span>
              <div className="h-px w-12 bg-[#D4A24C]/40" />
            </div>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center flex flex-col items-center">
                {/* Dotted line connector (hidden on mobile and last item) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-80px)] border-t-2 border-dashed border-[#D4A24C]/30 z-0" />
                )}

                {/* Icon Container */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-white border-2 border-[#0D3B2A]/10 flex items-center justify-center text-[#0D3B2A] mb-4 shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
                  {step.icon}
                  {/* Number Badge */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#0D3B2A] text-[#FAF7F2] text-xs font-sans font-bold flex items-center justify-center border-2 border-white">
                    {step.num}
                  </div>
                </div>

                <h4 className="font-serif font-bold text-sm sm:text-base text-[#0D3B2A] mb-2">{step.title}</h4>
                <p className="text-xs text-[#0D3B2A]/55 font-sans max-w-[180px] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ═══════════════════════════════════════════════ */}
      {/* SECTION 5: PRIVACY BANNER */}
      {/* ═══════════════════════════════════════════════ */}
      <section className="py-10 sm:py-14 bg-[#0D3B2A] relative overflow-hidden group">
        
        {/* Background Glows (Moved to section) */}
        <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-gradient-to-bl from-[#D4A24C]/10 to-transparent rounded-full blur-[100px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-gradient-to-tr from-[#FAF7F2]/5 to-transparent rounded-full blur-[100px] pointer-events-none transition-transform duration-700 group-hover:scale-110" />

        {/* Golden animated border highlight on top */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#D4A24C]/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            
            {/* Left Content */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 sm:gap-8">
              
              {/* Icon */}
              <div className="w-20 h-20 rounded-3xl bg-[#D4A24C]/10 border border-[#D4A24C]/20 flex items-center justify-center flex-shrink-0 relative">
                <div className="absolute inset-0 bg-[#D4A24C] blur-xl opacity-20 rounded-3xl animate-pulse"></div>
                <svg className="w-10 h-10 text-[#D4A24C] relative z-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>

              {/* Text */}
              <div>
                <span className="inline-block text-[11px] font-sans font-bold uppercase tracking-widest text-[#D4A24C] mb-3">100% Secure & Confidential</span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#FAF7F2] mb-3 leading-tight">
                  Your health is completely <br className="hidden lg:block" /> private with us.
                </h3>
                <p className="text-sm sm:text-base text-[#FAF7F2]/60 font-sans leading-relaxed max-w-xl">
                  Your privacy is our highest priority. Rest assured, all your health records and consultations are strictly confidential and we are here to guide you safely on your journey to complete wellness.
                </p>
              </div>
            </div>

            {/* Right Side: Lock Icon */}
            <div className="hidden md:flex flex-col items-center gap-4 opacity-20 group-hover:opacity-50 transition-opacity duration-700 md:mr-16 lg:mr-32">
              <svg className="w-24 h-24 text-[#D4A24C]" fill="none" stroke="currentColor" strokeWidth="0.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <div className="w-16 h-1 bg-[#D4A24C] rounded-full blur-[3px]"></div>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
}
