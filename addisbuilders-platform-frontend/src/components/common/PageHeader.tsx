import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  actions?: React.ReactNode;
  badge?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  breadcrumbs,
  actions,
  badge,
}) => {
  return (
    <div className="mb-6 sm:mb-8 pb-5 border-b border-neutral-200/80 dark:border-neutral-800">
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-1.5 rtl:space-x-reverse text-xs text-neutral-500 dark:text-neutral-400 mb-2">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 rtl:rotate-180" />}
                {item.href && !isLast ? (
                  <Link to={item.href} className="hover:text-brand-800 dark:hover:text-emerald-400 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'font-medium text-neutral-800 dark:text-neutral-200' : ''}>
                    {item.label}
                  </span>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
              {title}
            </h1>
            {badge}
          </div>
          {description && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 max-w-2xl">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2.5 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};
