import type React from 'react';
import { SearchIcon } from './resources/SearchIcon';
import { Star } from './resources/Star';
import { CalendarIcon } from './resources/CalendarIcon';

export type IconName = 'search' | 'star' | 'calendar';

export interface IconProps extends React.SVGAttributes<SVGAElement> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  switch (name) {
    case 'search': {
      return <SearchIcon {...props} />;
    }
    case 'star': {
      return <Star {...props} />;
    }
    case 'calendar': {
      return <CalendarIcon {...props} />;
    }
  }
}

Icon.displayName = 'Icon';
