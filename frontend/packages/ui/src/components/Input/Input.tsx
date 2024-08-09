"use client"
import { cn } from '@ui/lib/utils';
import React, { useState } from 'react';
import { Icon } from '../Icon';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClickSearch?: (value: string) => void;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, onClickSearch, ...props }, ref) => {
    const [value, setValue] = useState<string>('');

    if (type === 'search') {
      props.placeholder = '검색어를 입력하세요';
    }

    return (
      <div className="relative" style={{ width: props.width ? `${props.width}px` : '200px' }}>
        <input
          ref={ref}
          type={type}
          className={cn(
            'flex h-[44px] w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 pr-[44px]',
            className,
          )}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          {...props}
        />
        {type === 'search' ? (
          <Icon
            name="search"
            className="absolute top-0 right-0 mr-4 mt-[10px]"
            onClick={() => onClickSearch?.(value)}
          />
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
