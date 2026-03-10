import React from "react";

const size = 40;
const viewBox = "0 0 48 48";
const className = "card-logo card-logo-3d";

function useIconId() {
  return React.useId().replace(/:/g, "");
}

/* 3D gradient icon set — each icon has a unique gradient and depth, relevant to the card */

export function LogoUsers({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`users-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>
        <filter id={`users-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.25" />
        </filter>
      </defs>
      <circle cx="24" cy="18" r="10" fill={`url(#users-grad-${id})`} filter={`url(#users-shadow-${id})`} />
      <ellipse cx="24" cy="42" rx="14" ry="6" fill={`url(#users-grad-${id})`} opacity="0.9" />
      <circle cx="12" cy="16" r="5" fill={`url(#users-grad-${id})`} opacity="0.85" />
      <circle cx="36" cy="16" r="5" fill={`url(#users-grad-${id})`} opacity="0.85" />
    </svg>
  );
}

export function LogoTrophy({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`trophy-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id={`trophy-cup-${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#92400E" />
          <stop offset="100%" stopColor="#FCD34D" />
        </linearGradient>
        <filter id={`trophy-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.3" />
        </filter>
      </defs>
      <path d="M14 12h20v8a8 8 0 01-16 0v-8z" fill={`url(#trophy-cup-${id})`} filter={`url(#trophy-shadow-${id})`} />
      <path d="M18 20h12v2H18z" fill="rgba(0,0,0,0.2)" />
      <path d="M20 36h8l2-8H18z" fill={`url(#trophy-grad-${id})`} />
      <rect x="22" y="38" width="4" height="4" rx="1" fill={`url(#trophy-grad-${id})`} />
      <ellipse cx="24" cy="12" rx="8" ry="2" fill={`url(#trophy-grad-${id})`} opacity="0.9" />
    </svg>
  );
}

export function LogoHandshake({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`hand-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
        <filter id={`hand-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1" floodOpacity="0.2" />
        </filter>
      </defs>
      <path d="M12 28c-2 0-4-1.5-4-4v-6c0-2 2-4 4-4h4l2 4 2-4h4c2 0 4 2 4 4v6c0 2.5-2 4-4 4h-2l-2-3-2 3h-6z" fill={`url(#hand-grad-${id})`} filter={`url(#hand-shadow-${id})`} opacity="0.9" />
      <path d="M36 28c2 0 4-1.5 4-4v-6c0-2-2-4-4-4h-4l-2 4-2-4h-4c-2 0-4 2-4 4v6c0 2.5 2 4 4 4h2l2-3 2 3h6z" fill={`url(#hand-grad-${id})`} filter={`url(#hand-shadow-${id})`} opacity="0.9" />
      <path d="M20 24h8v4h-8z" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

export function LogoCalendar({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`cal-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id={`cal-top-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <filter id={`cal-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.25" />
        </filter>
      </defs>
      <rect x="8" y="14" width="32" height="26" rx="4" fill={`url(#cal-grad-${id})`} filter={`url(#cal-shadow-${id})`} />
      <rect x="8" y="8" width="32" height="10" rx="4" fill={`url(#cal-top-${id})`} />
      <rect x="18" y="20" width="4" height="4" rx="1" fill="rgba(255,255,255,0.9)" />
      <rect x="26" y="20" width="4" height="4" rx="1" fill="rgba(255,255,255,0.9)" />
      <rect x="18" y="28" width="4" height="4" rx="1" fill="rgba(255,255,255,0.9)" />
      <rect x="26" y="28" width="4" height="4" rx="1" fill="rgba(255,255,255,0.9)" />
    </svg>
  );
}

export function LogoTarget({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`target-outer-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>
        <linearGradient id={`target-mid-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <radialGradient id={`target-center-${id}`}>
          <stop offset="0%" stopColor="#F0FDFA" />
          <stop offset="100%" stopColor="#0D9488" />
        </radialGradient>
        <filter id={`target-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1" floodOpacity="0.2" />
        </filter>
      </defs>
      <circle cx="24" cy="24" r="20" fill={`url(#target-outer-${id})`} opacity="0.3" filter={`url(#target-shadow-${id})`} />
      <circle cx="24" cy="24" r="14" fill="white" stroke={`url(#target-outer-${id})`} strokeWidth="3" />
      <circle cx="24" cy="24" r="8" fill={`url(#target-mid-${id})`} />
      <circle cx="24" cy="24" r="4" fill={`url(#target-center-${id})`} />
    </svg>
  );
}

export function LogoRocket({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`rocket-grad-${id}`} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient id={`rocket-flame-${id}`} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FCD34D" />
        </linearGradient>
        <filter id={`rocket-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.3" />
        </filter>
      </defs>
      <path d="M24 8l-6 12h4v12h4V20h4L24 8z" fill={`url(#rocket-grad-${id})`} filter={`url(#rocket-shadow-${id})`} />
      <ellipse cx="24" cy="20" rx="6" ry="2" fill={`url(#rocket-grad-${id})`} opacity="0.8" />
      <path d="M22 36v4h4v-4c-1 0-2-.5-2.5-1-.5.5-1.5 1-2.5 1z" fill={`url(#rocket-grad-${id})`} opacity="0.9" />
      <path d="M20 38l2 4 2-4-2-2-2 2z" fill={`url(#rocket-flame-${id})`} opacity="0.9" />
    </svg>
  );
}

export function LogoBook({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`book-cover-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#134E4A" />
        </linearGradient>
        <linearGradient id={`book-pages-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F0FDFA" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
        <filter id={`book-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>
      <path d="M12 8v32c0 2 2 4 6 4h18V8H12z" fill={`url(#book-pages-${id})`} filter={`url(#book-shadow-${id})`} />
      <path d="M30 8h6v32h-6z" fill={`url(#book-cover-${id})`} />
      <path d="M30 12h4v2h-4zM30 18h4v2h-4zM30 24h4v2h-4z" fill="rgba(255,255,255,0.3)" />
      <path d="M16 14h10v1H16zM16 18h10v1H16zM16 22h8v1h-8z" fill="#94A3B8" opacity="0.8" />
    </svg>
  );
}

export function LogoMedal({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`medal-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={`medal-ribbon-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>
        <filter id={`medal-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.3" />
        </filter>
      </defs>
      <circle cx="24" cy="20" r="12" fill={`url(#medal-grad-${id})`} filter={`url(#medal-shadow-${id})`} />
      <circle cx="24" cy="20" r="8" fill="none" stroke="white" strokeWidth="2" opacity="0.9" />
      <path d="M18 32l6 8 6-8v-4H18v4z" fill={`url(#medal-ribbon-${id})`} />
      <path d="M22 34h4v4l-2 2-2-6z" fill="rgba(0,0,0,0.15)" />
    </svg>
  );
}

export function LogoMail({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`mail-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
        <filter id={`mail-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.25" />
        </filter>
      </defs>
      <path d="M8 14l16 10 16-10v18a2 2 0 01-2 2H10a2 2 0 01-2-2V14z" fill={`url(#mail-grad-${id})`} filter={`url(#mail-shadow-${id})`} />
      <path d="M44 14L24 24 4 14l20 10 20-10z" fill={`url(#mail-grad-${id})`} opacity="0.85" />
      <path d="M12 16l12 8 12-8" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
    </svg>
  );
}

export function LogoHeart({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`heart-grad-${id}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
        <filter id={`heart-shadow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.35" />
        </filter>
      </defs>
      <path d="M24 38c-8-6-16-12-16-20a8 8 0 0116 0 8 8 0 0116 0c0 8-8 14-16 20z" fill={`url(#heart-grad-${id})`} filter={`url(#heart-shadow-${id})`} />
      <path d="M24 32c6-4 12-9 12-14a4 4 0 00-8 0c0 5 6 10 12 14z" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

export function LogoMapPin({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`pin-grad-${id}`} x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <filter id={`pin-shadow-${id}`} x="-40%" y="-20%" width="180%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      <path d="M24 42c-8-6-14-14-14-22a14 14 0 0128 0c0 8-6 16-14 22z" fill={`url(#pin-grad-${id})`} filter={`url(#pin-shadow-${id})`} />
      <circle cx="24" cy="20" r="6" fill="white" opacity="0.95" />
      <circle cx="24" cy="20" r="3" fill={`url(#pin-grad-${id})`} />
    </svg>
  );
}

export function LogoPhone({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`phone-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#134E4A" />
        </linearGradient>
        <filter id={`phone-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1" floodOpacity="0.25" />
        </filter>
      </defs>
      <path d="M18 8h12a2 2 0 012 2v24a2 2 0 01-2 2H18a2 2 0 01-2-2V10a2 2 0 012-2z" fill={`url(#phone-grad-${id})`} filter={`url(#phone-shadow-${id})`} />
      <rect x="20" y="12" width="8" height="14" rx="2" fill="rgba(255,255,255,0.2)" />
      <circle cx="24" cy="30" r="2" fill={`url(#phone-grad-${id})`} />
    </svg>
  );
}

export function LogoClock({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`clock-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <filter id={`clock-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.25" />
        </filter>
      </defs>
      <circle cx="24" cy="24" r="18" fill={`url(#clock-grad-${id})`} filter={`url(#clock-shadow-${id})`} />
      <circle cx="24" cy="24" r="16" fill="none" stroke="white" strokeWidth="2" opacity="0.3" />
      <path d="M24 14v10l6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="2" fill="white" />
    </svg>
  );
}

export function LogoMessageCircle({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`msg-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id={`msg-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1" floodOpacity="0.25" />
        </filter>
      </defs>
      <path d="M8 12c0-4 4-8 16-8s16 4 16 8c0 4-4 8-16 8H12l-4 4V12z" fill={`url(#msg-grad-${id})`} filter={`url(#msg-shadow-${id})`} />
      <ellipse cx="20" cy="12" rx="3" ry="2" fill="rgba(255,255,255,0.5)" />
      <ellipse cx="28" cy="12" rx="3" ry="2" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
}

export function LogoBuilding({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`building-grad-${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0F766E" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <filter id={`building-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.25" />
        </filter>
      </defs>
      <path d="M8 42V18l14-8 14 8v24H8z" fill={`url(#building-grad-${id})`} filter={`url(#building-shadow-${id})`} />
      <rect x="12" y="22" width="6" height="6" rx="1" fill="rgba(255,255,255,0.4)" />
      <rect x="22" y="22" width="6" height="6" rx="1" fill="rgba(255,255,255,0.4)" />
      <rect x="32" y="22" width="6" height="6" rx="1" fill="rgba(255,255,255,0.4)" />
      <rect x="12" y="32" width="6" height="6" rx="1" fill="rgba(255,255,255,0.3)" />
      <rect x="22" y="32" width="6" height="6" rx="1" fill="rgba(255,255,255,0.3)" />
      <rect x="32" y="32" width="6" height="6" rx="1" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
}

export function LogoSearch({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`search-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#134E4A" />
        </linearGradient>
        <filter id={`search-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1" floodOpacity="0.2" />
        </filter>
      </defs>
      <circle cx="20" cy="20" r="12" fill="none" stroke={`url(#search-grad-${id})`} strokeWidth="4" filter={`url(#search-shadow-${id})`} />
      <path d="M28 28l10 10" stroke={`url(#search-grad-${id})`} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function LogoShare({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`share-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
        <filter id={`share-shadow-${id}`} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.2" />
        </filter>
      </defs>
      <circle cx="24" cy="14" r="8" fill={`url(#share-grad-${id})`} filter={`url(#share-shadow-${id})`} />
      <circle cx="12" cy="34" r="6" fill={`url(#share-grad-${id})`} opacity="0.9" filter={`url(#share-shadow-${id})`} />
      <circle cx="36" cy="34" r="6" fill={`url(#share-grad-${id})`} opacity="0.9" filter={`url(#share-shadow-${id})`} />
      <path d="M20 18l-8 12M28 18l8 12" stroke={`url(#share-grad-${id})`} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

export function LogoQuote({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`quote-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>
        <filter id={`quote-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.2" />
        </filter>
      </defs>
      <path d="M14 22c2 0 6-4 6-10V8h-6v4c0 4 0 10 0 10z" fill={`url(#quote-grad-${id})`} filter={`url(#quote-shadow-${id})`} opacity="0.95" />
      <path d="M28 22c2 0 6-4 6-10V8h-6v4c0 4 0 10 0 10z" fill={`url(#quote-grad-${id})`} filter={`url(#quote-shadow-${id})`} opacity="0.95" />
    </svg>
  );
}

export function LogoSparkles({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`spark-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <path d="M24 6l2 8 8 2-8 2-2 8-2-8-8-2 8-2 2-8z" fill={`url(#spark-grad-${id})`} opacity="0.95" />
      <path d="M14 28l1 4 4 1-4 1-1 4-1-4-4-1 4-1 1-4z" fill={`url(#spark-grad-${id})`} opacity="0.8" />
      <path d="M34 28l1 4 4 1-4 1-1 4-1-4-4-1 4-1 1-4z" fill={`url(#spark-grad-${id})`} opacity="0.8" />
    </svg>
  );
}

export function LogoDollar({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`dollar-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <filter id={`dollar-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1" floodOpacity="0.25" />
        </filter>
      </defs>
      <path d="M24 8v32M28 14a4 4 0 00-8 0c0 2 2 3 4 4s4 2 4 4a4 4 0 01-8 0M28 26a4 4 0 01-8 0c0-2 2-3 4-4s4-2 4-4a4 4 0 008 0" stroke={`url(#dollar-grad-${id})`} strokeWidth="3" strokeLinecap="round" fill="none" filter={`url(#dollar-shadow-${id})`} />
    </svg>
  );
}

export function LogoList({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`list-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#14B8A6" />
        </linearGradient>
        <filter id={`list-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodOpacity="0.2" />
        </filter>
      </defs>
      <rect x="8" y="10" width="28" height="6" rx="2" fill={`url(#list-grad-${id})`} filter={`url(#list-shadow-${id})`} opacity="0.9" />
      <rect x="8" y="20" width="28" height="6" rx="2" fill={`url(#list-grad-${id})`} filter={`url(#list-shadow-${id})`} opacity="0.85" />
      <rect x="8" y="30" width="22" height="6" rx="2" fill={`url(#list-grad-${id})`} filter={`url(#list-shadow-${id})`} opacity="0.8" />
      <circle cx="12" cy="13" r="1" fill="white" opacity="0.8" />
      <circle cx="12" cy="23" r="1" fill="white" opacity="0.8" />
      <circle cx="12" cy="33" r="1" fill="white" opacity="0.8" />
    </svg>
  );
}

export function LogoUser({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`user-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>
        <filter id={`user-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodOpacity="0.25" />
        </filter>
      </defs>
      <circle cx="24" cy="18" r="10" fill={`url(#user-grad-${id})`} filter={`url(#user-shadow-${id})`} />
      <ellipse cx="24" cy="42" rx="14" ry="8" fill={`url(#user-grad-${id})`} opacity="0.9" />
      <circle cx="24" cy="17" r="4" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

export function LogoActivity({ w = size, h = size, ...props }) {
  const id = useIconId();
  return (
    <svg width={w} height={h} viewBox={viewBox} fill="none" className={className} aria-hidden {...props}>
      <defs>
        <linearGradient id={`activity-grad-${id}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#5EEAD4" />
        </linearGradient>
        <filter id={`activity-shadow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="0.5" floodOpacity="0.2" />
        </filter>
      </defs>
      <path d="M8 32l6-12 6 6 8-18 4 10" stroke={`url(#activity-grad-${id})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" filter={`url(#activity-shadow-${id})`} />
      <path d="M8 32l6-12 6 6 8-18" fill="none" stroke={`url(#activity-grad-${id})`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );
}

export default {
  LogoUsers,
  LogoTrophy,
  LogoHandshake,
  LogoCalendar,
  LogoTarget,
  LogoRocket,
  LogoBook,
  LogoMedal,
  LogoMail,
  LogoHeart,
  LogoMapPin,
  LogoPhone,
  LogoClock,
  LogoMessageCircle,
  LogoBuilding,
  LogoSearch,
  LogoShare,
  LogoQuote,
  LogoSparkles,
  LogoDollar,
  LogoList,
  LogoUser,
  LogoActivity,
};
