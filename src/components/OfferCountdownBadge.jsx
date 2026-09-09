import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

/**
 * Parses timer information from Shopify product tags.
 * Supported tag formats:
 * - timer:7d or timer:7days (Relative duration in days)
 * - timer:3d or offer:7d
 * - sale_ends:2026-09-16 or offer_ends:2026-09-16 (Exact target date)
 * - timer:2026-09-16T23:59:59
 * - 7days-offer or 7-days-offer
 */
export function getOfferTargetTime(tags = [], productId = '') {
  if (!Array.isArray(tags) || tags.length === 0) return null;

  for (const rawTag of tags) {
    const tag = String(rawTag).trim().toLowerCase();

    // 1. Exact Date/Time: sale_ends:YYYY-MM-DD or timer:YYYY-MM-DD
    const dateMatch = tag.match(/^(?:sale_ends|offer_ends|timer):(\d{4}-\d{2}-\d{2}(?:t[\d:]+)?)/i);
    if (dateMatch) {
      const dateStr = dateMatch[1].includes('t') ? dateMatch[1] : `${dateMatch[1]}T23:59:59`;
      const targetTime = new Date(dateStr).getTime();
      if (!isNaN(targetTime)) {
        return targetTime;
      }
    }

    // 2. Relative Days: timer:7d, timer:7days, offer:7d, 7-days-offer
    const daysMatch = tag.match(/^(?:timer|offer|sale):(\d+)(?:d|days)?$/i) || tag.match(/^(\d+)(?:-|\s)?(?:d|days)?-offer$/i);
    if (daysMatch) {
      const days = parseInt(daysMatch[1], 10);
      if (days > 0) {
        // Persist initial start time in localStorage so countdown counts down smoothly for visitors
        const storageKey = `altooba_timer_${productId || tag}_${days}d`;
        let startTime = Date.now();
        try {
          if (typeof window !== 'undefined' && window.localStorage) {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
              const parsed = parseInt(stored, 10);
              const maxDuration = days * 24 * 60 * 60 * 1000;
              if (!isNaN(parsed) && parsed > 0 && Date.now() - parsed < maxDuration) {
                startTime = parsed;
              } else if (!isNaN(parsed) && Date.now() - parsed >= maxDuration) {
                // Expired
                return null;
              } else {
                localStorage.setItem(storageKey, String(startTime));
              }
            } else {
              localStorage.setItem(storageKey, String(startTime));
            }
          }
        } catch (e) {}

        return startTime + days * 24 * 60 * 60 * 1000;
      }
    }
  }

  return null;
}

export default function OfferCountdownBadge({ tags = [], productId = '', className = '' }) {
  const targetTime = getOfferTargetTime(tags, productId);

  const calculateTimeLeft = () => {
    if (!targetTime) return null;
    const diff = targetTime - Date.now();
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds, diff };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    if (!targetTime) return;

    // Tick every second
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      if (!remaining) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  if (!timeLeft) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#0D3B2A]/90 backdrop-blur-md text-[#FAF7F2] border border-[#D4A24C]/45 shadow-[0_4px_16px_rgba(13,59,42,0.25)] select-none transition-all duration-300 ${className}`}
      style={{ willChange: 'transform' }}
    >
      {/* Pulsing Alert Dot */}
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF4444] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#EF4444]"></span>
      </span>

      {/* Label */}
      <div className="flex items-center gap-1">
        <Clock className="w-3 h-3 text-[#D4A24C] shrink-0" />
        <span className="text-[9px] sm:text-[10px] font-sans font-bold uppercase tracking-wider text-[#D4A24C]">
          Ends In:
        </span>
      </div>

      {/* Live Digits */}
      <div className="flex items-center gap-1 font-mono font-bold text-[10px] sm:text-[11px] text-white tracking-tight">
        {timeLeft.days > 0 && (
          <span className="bg-black/30 px-1 py-0.5 rounded text-white font-extrabold">
            {timeLeft.days}<span className="text-[#D4A24C] font-normal text-[9px] ml-0.5">d</span>
          </span>
        )}
        <span className="bg-black/30 px-1 py-0.5 rounded text-white font-extrabold">
          {String(timeLeft.hours).padStart(2, '0')}<span className="text-[#D4A24C] font-normal text-[9px] ml-0.5">h</span>
        </span>
        <span className="text-[#D4A24C] font-black">:</span>
        <span className="bg-black/30 px-1 py-0.5 rounded text-white font-extrabold">
          {String(timeLeft.minutes).padStart(2, '0')}<span className="text-[#D4A24C] font-normal text-[9px] ml-0.5">m</span>
        </span>
        <span className="text-[#D4A24C] font-black">:</span>
        <span className="bg-black/30 px-1 py-0.5 rounded text-white font-extrabold">
          {String(timeLeft.seconds).padStart(2, '0')}<span className="text-[#D4A24C] font-normal text-[9px] ml-0.5">s</span>
        </span>
      </div>
    </div>
  );
}
