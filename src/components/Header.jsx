import { motion } from 'motion/react';

function Logo({ className = "h-16 w-auto", showSubtitle = true, ...props }) {
  return (
    <svg
      viewBox="0 0 950 250"
      className={className}
      id="al-tooba-logo-svg"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        {/* Gradients for the leaves to match the beautiful bright green-to-dark transition */}
        <linearGradient id="leafGradLeft" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#123511" />
          <stop offset="40%" stopColor="#1f4c1c" />
          <stop offset="85%" stopColor="#4f9a3c" />
          <stop offset="100%" stopColor="#76c84f" />
        </linearGradient>

        <linearGradient id="leafGradRight" x1="0.2" y1="0.8" x2="0.8" y2="0.2">
          <stop offset="0%" stopColor="#1f3a1d" />
          <stop offset="60%" stopColor="#3d7835" />
          <stop offset="100%" stopColor="#8be25e" />
        </linearGradient>

        <linearGradient id="stemGrad" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#0d240d" />
          <stop offset="50%" stopColor="#1e441c" />
          <stop offset="100%" stopColor="#4b913a" />
        </linearGradient>
      </defs>

      {/* --- Swooping Leaf Branch Graphic (Left) --- */}
      <g id="branch-graphic" className="transition-all duration-300">
        {/* Main curved stems */}
        <path
          d="M 125,215 C 135,165 175,100 232,71"
          stroke="url(#stemGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 115,222 C 145,210 190,140 215,90"
          stroke="url(#stemGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 105,225 C 120,225 155,200 170,175"
          stroke="url(#stemGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Top-most large leaf */}
        <path
          d="M 233,71 C 235,46 258,35 285,42 C 283,62 260,82 233,71"
          fill="url(#leafGradRight)"
        />

        {/* Small brand-wise secondary leaves sprouted along the stem */}
        {/* Leaf 2: pointed up-left */}
        <path
          d="M 215,90 C 205,70 212,50 228,58 C 230,73 222,85 215,90"
          fill="url(#leafGradLeft)"
        />

        {/* Leaf 3: Pointed top-right */}
        <path
          d="M 230,95 C 248,80 286,95 315,108 C 285,122 250,115 230,95"
          fill="url(#leafGradLeft)"
        />

        {/* Leaf 4: Pointed left */}
        <path
          d="M 185,105 C 150,110 115,125 120,165 C 140,195 175,155 185,105"
          fill="url(#leafGradRight)"
        />

        {/* Leaf 5: Pointed far-left lower */}
        <path
          d="M 165,140 C 120,150 90,200 120,235 C 138,240 155,195 165,140"
          fill="url(#leafGradRight)"
        />

        {/* Leaf 6: Bottom tiny leaf pointing down-left */}
        <path
          d="M 148,220 C 122,225 110,235 118,252 C 130,256 148,242 148,220"
          fill="url(#leafGradLeft)"
        />

        {/* Leaf 7: Internal right-side leaf */}
        <path
          d="M 205,135 C 218,125 248,145 262,160 C 240,185 212,165 205,135"
          fill="url(#leafGradLeft)"
        />
      </g>

      {/* --- BRAND NAME TEXT "AL TOOBA" (Forest Green) --- */}
      <g id="brand-letters" fill="currentColor">
        {/* A L */}
        <text
          x="270"
          y="152"
          fontSize="112"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="4"
        >
          AL
        </text>

        {/* T (adjusted for spacing around our interlinked O's) */}
        <text
          x="440"
          y="152"
          fontSize="112"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          T
        </text>

        {/* Interlinked Rings for "OO" */}
        {/* Left Ring */}
        <circle
          cx="568"
          cy="114"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="19"
        />

        {/* Right Ring */}
        <circle
          cx="644"
          cy="114"
          r="48"
          fill="none"
          stroke="currentColor"
          strokeWidth="19"
        />

        {/* Overlapping Arc of the Left Ring to make them interlock seamlessly */}
        <path
          d="M 605,85 A 48,48 0 0,1 616,114"
          fill="none"
          stroke="currentColor"
          strokeWidth="19"
          strokeLinecap="round"
        />

        {/* Tiny twin green leaves sprouting from the lower ring overlap intersection */}
        <path
          d="M 606,134 C 601,123 598,114 602,106 C 607,113 609,122 606,134"
          fill="#4f9a3c"
        />
        <path
          d="M 606,134 C 611,125 617,120 619,111 C 615,118 610,126 606,134"
          fill="#76c84f"
        />

        {/* B A */}
        <text
          x="712"
          y="152"
          fontSize="112"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="4"
        >
          BA
        </text>

        {/* ® Registered Trademark Symbol */}
        <text
          x="875"
          y="78"
          fontSize="24"
          fontWeight="bold"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          TM
        </text>
      </g>

      {/* --- SUBTITLE "PROPHETIC REMEDIES PVT. LTD." (Forest Green) --- */}
      {showSubtitle && (
        <text
          id="brand-subtitle"
          x="278"
          y="202"
          fill="currentColor"
          fontSize="20.5"
          fontWeight="800"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="5.8"
        >
          PROPHETIC REMEDIES PVT.LTD.
        </text>
      )}
    </svg>
  );
}

export default function Header({ activeMenu, onMenuClick, onBeginJourney }) {
  const menuList = [
    { name: 'Home' },
    { name: 'Studio' },
    { name: 'About' },
    { name: 'Journal' },
    { name: 'Reach Us' },
  ];

  return (
    <header
      id="nav-bar"
      className="relative z-20 w-full transition-all duration-300 backdrop-blur-md bg-white/75 border-b border-brand-green/10 shadow-[0_4px_20px_rgba(31,58,29,0.03)]"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-2 flex items-center justify-between">
        {/* Logo */}
        <button
          id="logo-link"
          onClick={() => window.location.href = '/'}
          className="focus:outline-none transition-transform active:scale-95 cursor-pointer max-w-[190px] sm:max-w-[230px] md:max-w-[250px] flex items-center text-[#1f3a1d] hover:opacity-90 transition-opacity duration-250"
        >
          <Logo className="h-9 sm:h-11 w-auto" />
        </button>

        {/* Menu items */}
        <nav id="nav-menu" className="hidden md:flex items-center space-x-10">
          {menuList.map((item) => {
            const isActive = activeMenu === item.name;
            return (
              <button
                key={item.name}
                id={`nav-item-${item.name.toLowerCase().replace(' ', '-')}`}
                onClick={() => onMenuClick(item.name)}
                className={`text-[13.5px] uppercase tracking-widest font-medium transition-colors duration-300 relative py-2 focus:outline-none cursor-pointer ${
                  isActive ? 'text-[#1f3a1d] font-semibold' : 'text-[#1f3a1d]/65 hover:text-[#1f3a1d]'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-line"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#4f9a3c]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* CTA Button */}
        <button
          id="nav-cta"
          onClick={onBeginJourney}
          className="rounded-full px-5.5 py-2 text-[12.5px] uppercase tracking-wider font-bold bg-[#1f3a1d] text-[#f8edd6] transition-all duration-300 hover:bg-[#2e592b] hover:text-white hover:shadow-[0_4px_15px_rgba(31,58,29,0.15)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1f3a1d] cursor-pointer"
        >
          Explore Now
        </button>
      </div>
    </header>
  );
}
