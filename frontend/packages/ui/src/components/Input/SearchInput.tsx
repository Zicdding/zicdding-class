'use client';

import { cn } from '@ui/lib/utils';
import React, { useState } from 'react';
import { Icon } from '../Icon';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClickSearch?: (value: string) => void;
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onClickSearch, ...props }, ref) => {
    const [value, setValue] = useState<string>('');

    return (
      <div className="relative" style={{ width: props.width ? `${props.width}px` : '200px' }}>
        <input
          ref={ref}
          type="search"
          className={cn(
            'flex h-[44px] w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-[44px]',
            className,
          )}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="검색어를 입력하세요"
          {...props}
        />
        <Icon name="search" className="absolute top-0 right-0 mr-4 mt-[10px]" onClick={() => onClickSearch?.(value)} />
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';
