import type React from 'react';
import { SearchIcon } from './resources/SearchIcon';
// import { JSIcon } from './resources/JSIcon';
import { Star } from './resources/Star';

type IconName = 'search' | "star";

export interface IconProps extends React.SVGAttributes<SVGAElement> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  switch (name) {
    case 'search': {
      return <SearchIcon {...props} />;
    }
    case "star":
      return <Star {...props} />;
  }
}

Icon.displayName = 'Icon';
