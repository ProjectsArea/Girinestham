import React from "react";

const size = 24;
const stroke = 2;

export function IconTrophy({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 21h8M12 17v4M7 4h10M6 4v2a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4V4" />
      <path d="M6 8h2a2 2 0 0 1 2 2v2H4V10a2 2 0 0 1 2-2Z" />
      <path d="M18 8h2a2 2 0 0 1 2 2v2h-6v-2a2 2 0 0 1 2-2Z" />
      <path d="M6 14v2a4 4 0 0 0 4 4h4a4 4 0 0 0 4-4v-2" />
    </svg>
  );
}

export function IconUsers({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function IconTarget({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function IconRocket({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export function IconBook({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M8 7h8" />
      <path d="M8 11h8" />
    </svg>
  );
}

export function IconMedal({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.21 15 2 12l5.21-3 2.79 1.62L12.79 9 7.21 15z" />
      <path d="M16.79 9 22 12l-5.21 3-2.79-1.62L11.21 15 16.79 9z" />
      <path d="m12 10 2.79 1.62L17.58 9 12 6l-5.58 3L10 10l2.79-1.62L12 10z" />
      <path d="M12 14l-2.79 1.62L6 12l5.21-3L12 10l.79.46L18 12l-5.21 3L12 14z" />
    </svg>
  );
}

export function IconHeart({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export function IconMail({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function IconPhone({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function IconMapPin({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function IconGlobe({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

export function IconBank({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 21 9-9" />
      <path d="m12 12 9 9" />
      <path d="M3 12h18" />
      <path d="M3 3v18" />
      <path d="M21 3v18" />
    </svg>
  );
}

export function IconCopy({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

export function IconCheck({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function IconSearch({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function IconCalendar({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export function IconClock({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export function IconDiamond({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
    </svg>
  );
}

export function IconClipboard({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
    </svg>
  );
}

export function IconMessageCircle({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

export function IconStar({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function IconHandshake({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d="m11 14 2 2 5-5" />
      <path d="m2 12 5-5 2 2" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
    </svg>
  );
}

export function IconTrendingUp({ className = "", w = size, h = size }) {
  return (
    <svg className={className} width={w} height={h} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

export default {
  IconTrophy,
  IconUsers,
  IconTarget,
  IconRocket,
  IconBook,
  IconMedal,
  IconHeart,
  IconMail,
  IconPhone,
  IconMapPin,
  IconGlobe,
  IconBank,
  IconCopy,
  IconCheck,
  IconSearch,
  IconCalendar,
  IconClock,
  IconDiamond,
  IconClipboard,
  IconMessageCircle,
  IconStar,
  IconHandshake,
  IconTrendingUp,
};
