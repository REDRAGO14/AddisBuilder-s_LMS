import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../../contexts/LanguageContext';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  pageSize?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize = 10,
}) => {
  const { t } = useLanguage();
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems || currentPage * pageSize);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-3 px-2 border-t border-neutral-200 dark:border-neutral-800">
      <div className="text-sm text-neutral-500 dark:text-neutral-400">
        {totalItems ? (
          <span>
            {t('common.showing', 'Showing')}{' '}
            <span className="font-medium text-neutral-800 dark:text-neutral-200">{startItem}</span>{' '}
            {t('common.to', 'to')}{' '}
            <span className="font-medium text-neutral-800 dark:text-neutral-200">{endItem}</span>{' '}
            {t('common.of', 'of')}{' '}
            <span className="font-medium text-neutral-800 dark:text-neutral-200">{totalItems}</span>{' '}
            {t('common.results', 'results')}
          </span>
        ) : (
          <span>
            {t('common.page', 'Page')}{' '}
            <span className="font-medium text-neutral-800 dark:text-neutral-200">{currentPage}</span>{' '}
            {t('common.of', 'of')}{' '}
            <span className="font-medium text-neutral-800 dark:text-neutral-200">{totalPages}</span>
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          leftIcon={<ChevronLeft className="w-4 h-4 rtl:rotate-180" />}
        >
          {t('common.previous', 'Previous')}
        </Button>
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 px-2">
          {currentPage} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          rightIcon={<ChevronRight className="w-4 h-4 rtl:rotate-180" />}
        >
          {t('common.next', 'Next')}
        </Button>
      </div>
    </div>
  );
};
