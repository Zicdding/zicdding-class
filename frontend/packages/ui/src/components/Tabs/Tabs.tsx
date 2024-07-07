import React from "react";
import { RadixTabs, RadixTabsList, RadixTabsTrigger } from './RadixTabs';

interface TabsProps {
  headers: Array<{ name: string; value: string }>
  onChange: (value: string) => void;
}

Tabs.displayName = 'Tabs';

export function Tabs({ headers, onChange }: TabsProps) {
  return (
    <RadixTabs onValueChange={onChange}>
      <RadixTabsList>
        {
          headers.map(header => (
            <RadixTabsTrigger
              key={`name-${header.name}-value-${header.value}`}
              value={header.value}
            >
              {header.name}
            </RadixTabsTrigger>
          ))
        }
      </RadixTabsList>
    </RadixTabs>
  )
}
