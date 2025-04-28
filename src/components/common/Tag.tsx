
import React from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  label: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

const Tag: React.FC<TagProps> = ({ label, className, onClick, active = false }) => {
  const isClickable = typeof onClick === 'function';
  
  return (
    <div
      className={cn(
        'inline-block px-3 py-1 rounded-full text-sm font-medium',
        active 
          ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' 
          : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-100',
        isClickable && 'cursor-pointer hover:opacity-80',
        className
      )}
      onClick={isClickable ? onClick : undefined}
    >
      {label}
    </div>
  );
};

export default Tag;
