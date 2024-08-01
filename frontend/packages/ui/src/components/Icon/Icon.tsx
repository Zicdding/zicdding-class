import type React from 'react';
import { SearchIcon } from './resources/SearchIcon';

type IconName = 'search';

export interface IconProps extends React.SVGAttributes<SVGAElement> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  switch (name) {
    case 'search': {
      return <SearchIcon {...props} />;
    }
  }
}

Icon.displayName = 'Icon';
