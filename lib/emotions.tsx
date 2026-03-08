import type { ReactNode } from 'react';

export interface Emotion {
  id: number;
  label: Record<'en' | 'hy' | 'ru', string>;
  /** Hex color for selected state */
  color: string;
  icon: 'leaf' | 'flame' | 'heart' | 'mask' | 'lightbulb' | 'briefcase' | 'crown';
}

export const EMOTIONS: Emotion[] = [
  {
    id: 1,
    label: { en: 'Calm, cozy, comfortable', hy: 'Հանգիստ, հարմար', ru: 'Спокойствие, уют' },
    color: '#22c55e',
    icon: 'leaf',
  },
  {
    id: 2,
    label: { en: 'Drive, adrenaline', hy: 'Ուժ, ադրենալին', ru: 'Драйв, адреналин' },
    color: '#ef4444',
    icon: 'flame',
  },
  {
    id: 3,
    label: { en: 'Romance, love', hy: 'Ռոմանտիկա, սեր', ru: 'Романтика, любовь' },
    color: '#ec4899',
    icon: 'heart',
  },
  {
    id: 4,
    label: { en: 'Fun, happy', hy: 'Զվարճանք, երջանկություն', ru: 'Веселье, радость' },
    color: '#f59e0b',
    icon: 'mask',
  },
  {
    id: 5,
    label: { en: 'Discovery, Learning', hy: 'Բացահայտում, ուսուցում', ru: 'Открытия, учёба' },
    color: '#8b5cf6',
    icon: 'lightbulb',
  },
  {
    id: 6,
    label: { en: 'Working, Business', hy: 'Աշխատանք, բիզնես', ru: 'Работа, бизнес' },
    color: '#3b82f6',
    icon: 'briefcase',
  },
  {
    id: 7,
    label: { en: 'Status, rating, respect', hy: 'Կարգավիճակ, վարկանիշ', ru: 'Статус, рейтинг' },
    color: '#eab308',
    icon: 'crown',
  },
];

const iconClass = 'shrink-0';

function LeafIcon({ className, color }: { className?: string; color: string }) {
  return (
    <svg className={className} width={24} height={24} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.09-13 3.08C3 8.5 2 15 2 15c3-3 6-5 8-6 2-1 5-2 7-7z" />
    </svg>
  );
}

function FlameIcon({ className, color }: { className?: string; color: string }) {
  return (
    <svg className={className} width={24} height={24} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
      <path d="M12 23c-3.87 0-7-3.13-7-7 0-1.5.47-2.89 1.27-4.03-.43.25-.85.53-1.27.83V15l-2-2v-2c0-2.5 1.5-5 3-6.5.5 1.5 1 3 1.5 4.5L12 11l2.5-2.5c.5 1.5 1 3 1.5 4.5 1.5 1.5 3 4 3 6.5v2l-2 2v1.8c-.42-.3-.84-.58-1.27-.83.8 1.14 1.27 2.53 1.27 4.03 0 3.87-3.13 7-7 7z" />
    </svg>
  );
}

function HeartIcon({ className, color }: { className?: string; color: string }) {
  return (
    <svg className={className} width={24} height={24} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function MaskIcon({ className, color }: { className?: string; color: string }) {
  return (
    <svg className={className} width={24} height={24} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.85.63-3.55 1.69-4.9L7.59 5.5h.91c.56 0 1.1.24 1.47.65l1.2 1.37 1.27-2.19c.18-.31.52-.5.88-.5h.36c.36 0 .7.19.88.5l1.27 2.19 1.2-1.37c.37-.41.91-.65 1.47-.65h.91l-2.1 1.11C17.37 8.45 18 10.15 18 12c0 4.41-3.59 8-8 8zm-2-9.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm4 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
    </svg>
  );
}

function LightbulbIcon({ className, color }: { className?: string; color: string }) {
  return (
    <svg className={className} width={24} height={24} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z" />
    </svg>
  );
}

function BriefcaseIcon({ className, color }: { className?: string; color: string }) {
  return (
    <svg className={className} width={24} height={24} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
    </svg>
  );
}

function CrownIcon({ className, color }: { className?: string; color: string }) {
  return (
    <svg className={className} width={24} height={24} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
      <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z" />
    </svg>
  );
}

const ICON_MAP: Record<Emotion['icon'], (props: { className?: string; color: string }) => ReactNode> = {
  leaf: LeafIcon,
  flame: FlameIcon,
  heart: HeartIcon,
  mask: MaskIcon,
  lightbulb: LightbulbIcon,
  briefcase: BriefcaseIcon,
  crown: CrownIcon,
};

export function EmotionIcon({ emotion, selected }: { emotion: Emotion; selected: boolean }) {
  const Icon = ICON_MAP[emotion.icon];
  const color = selected ? '#ffffff' : 'var(--color-muted)';
  return <Icon className={iconClass} color={color} />;
}
