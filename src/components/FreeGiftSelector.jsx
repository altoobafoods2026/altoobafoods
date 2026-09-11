import React from 'react';
import { optimizeShopifyImage } from '../utils/imageOptimizer';

export default function FreeGiftSelector({
  offer,
  selectedGift,
  onSelectGift,
  isActiveForVariant,
  onSwitchTo500g
}) {
  if (!offer || !offer.gifts || offer.gifts.length === 0) return null;

  // If the user selected a variant that doesn't qualify (e.g. 250gm), show upgrade incentive teaser
  if (!isActiveForVariant) {
    return (
      <div className="mb-5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#FAF7F2] via-[#f4eee4] to-[#FAF7F2] border border-[#D4A24C]/30 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎁</span>
            <div>
              <p className="text-[12px] sm:text-[13px] font-bold text-[#0D3B2A]">
                Want a <span className="text-[#b45309] underline decoration-[#D4A24C]">FREE Gift</span> worth up to ₹850?
              </p>
              <p className="text-[10px] sm:text-[11px] text-gray-500 font-medium">
                Get a free gift with the 500gm or 1kg pack.
              </p>
            </div>
          </div>
          {onSwitchTo500g && (
            <button
              type="button"
              onClick={onSwitchTo500g}
              className="shrink-0 px-3 py-1.5 rounded-xl bg-[#0D3B2A] text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider hover:bg-[#D4A24C] transition-colors cursor-pointer shadow-sm"
            >
              Switch to 500gm
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5 bg-white p-3.5 sm:p-4 rounded-2xl border-2 border-[#0D3B2A]/20 shadow-[0_4px_16px_rgba(13,59,42,0.06)] relative overflow-hidden">
      {/* Header */}
      <div className="mb-3">
        <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] font-sans font-extrabold uppercase tracking-wide text-[#0D3B2A]">
          <span>{offer.heading || 'CHOOSE YOUR FREE GIFT'}</span>
        </div>
        <p className="text-[11px] text-gray-500 font-medium mt-0.5">
          {offer.subheading || 'Select 1 complimentary item included 100% FREE with 500gm'}
        </p>
      </div>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
        {offer.gifts.map((gift) => {
          const isSelected = selectedGift?.id === gift.id;

          return (
            <div
              key={gift.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectGift(gift)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectGift(gift);
                }
              }}
              className={`flex flex-col justify-between p-2 sm:p-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer relative text-left select-none ${
                isSelected
                  ? 'border-[#0D3B2A] bg-[#FAF7F2] shadow-[0_4px_14px_rgba(13,59,42,0.15)] ring-2 ring-[#0D3B2A]/20 scale-[1.01]'
                  : 'border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50/60 opacity-90 hover:opacity-100'
              }`}
            >
              {/* Top Selection Status Pill */}
              <div className="flex items-center justify-between mb-1.5 gap-1">
                <span className={`text-[7px] sm:text-[8px] font-extrabold uppercase tracking-tight px-1.5 py-0.5 rounded-full truncate ${
                  isSelected ? 'bg-[#0D3B2A] text-white' : 'bg-gray-100 text-gray-600'
                }`}>
                  {gift.badge || 'FREE GIFT'}
                </span>

                {/* Radio indicator */}
                <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 rounded-full flex items-center justify-center border transition-colors ${
                  isSelected ? 'border-[#0D3B2A] bg-[#0D3B2A] text-white' : 'border-gray-300 bg-white'
                }`}>
                  {isSelected && (
                    <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Product Thumbnail Image */}
              <div className="w-full h-16 sm:h-20 mb-1.5 flex items-center justify-center overflow-hidden rounded-lg bg-white p-1 border border-gray-100">
                <img
                  src={optimizeShopifyImage(gift.image, 240)}
                  alt={gift.title}
                  width="120"
                  height="80"
                  className="w-full h-full object-contain mix-blend-multiply transition-transform duration-200 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Product Title */}
              <div className="flex-1 mb-1">
                <h4 className={`text-[10px] sm:text-[11.5px] font-bold font-sans line-clamp-1 leading-snug ${
                  isSelected ? 'text-[#0D3B2A]' : 'text-gray-800'
                }`}>
                  {gift.title}
                </h4>
                {gift.shortDesc && (
                  <p className="text-[8.5px] sm:text-[9px] text-gray-400 line-clamp-1 mt-0.5">{gift.shortDesc}</p>
                )}
              </div>

              {/* Price Row */}
              <div className="flex items-center justify-between pt-1 border-t border-gray-100 mt-auto">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] sm:text-[12px] font-extrabold text-[#15803d]">
                    FREE
                  </span>
                  <span className="text-[9px] text-gray-400 line-through font-medium">
                    ₹{gift.mrp}
                  </span>
                </div>
                <span className={`text-[8px] sm:text-[8.5px] font-bold uppercase tracking-wider ${
                  isSelected ? 'text-[#0D3B2A]' : 'text-gray-400'
                }`}>
                  {isSelected ? '✓' : 'Add'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
