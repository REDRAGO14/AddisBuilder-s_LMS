import React from 'react';
import {
  Video,
  MonitorPlay,
  FileDown,
  Link2,
  PlayCircle,
  Newspaper,
  FlaskConical,
  FileText,
  HelpCircle,
} from 'lucide-react';
import { cn } from '../../utils';
import { ContentType } from '../../types';
import { LESSON_TYPES, LESSON_TYPE_LEGACY_ALIASES } from '../../constants';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  VIDEO: PlayCircle,
  VIDEO_URL: MonitorPlay,
  ARTICLE: Newspaper,
  LAB: FlaskConical,
  TEXT: FileText,
  PDF_DOWNLOAD: FileDown,
  LINK: Link2,
};

export interface LessonTypeBadgeProps {
  type: ContentType | string;
  /** 'chip' renders icon+label, 'icon' renders a compact icon-only square */
  variant?: 'chip' | 'icon';
  className?: string;
}

/** Normalizes legacy mock values (READING, DOCUMENT) to backend enum keys. */
export function normalizeLessonType(type: ContentType | string): string {
  return LESSON_TYPE_LEGACY_ALIASES[type] ?? type;
}

export const LessonTypeBadge: React.FC<LessonTypeBadgeProps> = ({
  type,
  variant = 'chip',
  className,
}) => {
  const normalized = normalizeLessonType(type);
  const meta = LESSON_TYPES.find((t) => t.value === normalized);
  const Icon = ICONS[normalized] ?? HelpCircle;

  if (variant === 'icon') {
    return (
      <span
        title={meta ? `${meta.label} — ${meta.hint}` : normalized}
        className={cn(
          'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border',
          meta?.badgeClass ?? 'bg-neutral-50 text-neutral-500 border-neutral-200',
          className
        )}
      >
        <Icon className={cn('w-3.5 h-3.5', meta?.iconClass ?? 'text-neutral-400')} />
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
        meta?.badgeClass ?? 'bg-neutral-50 text-neutral-500 border-neutral-200',
        className
      )}
    >
      <Icon className={cn('w-3 h-3', meta?.iconClass ?? 'text-neutral-400')} />
      {meta?.label ?? normalized}
    </span>
  );
};
