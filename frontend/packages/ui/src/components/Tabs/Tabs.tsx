import React from "react";
import {
  RadixTabs,
  RadixTabsList,
  RadixTabsTrigger,
  RadixTabsContent,
} from "./RadixTabs";

interface TabsProps {
  items: Array<{ title: string; value: string }>;
  onChange: (value: string) => void;
}

export function Tabs({ items, onChange }: TabsProps) {
  return (
    <RadixTabs onValueChange={onChange}>
      <RadixTabsList>
        {items.map((item) => (
          <RadixTabsTrigger key={item.value} value={item.value}>
            {item.title}
          </RadixTabsTrigger>
        ))}
      </RadixTabsList>
    </RadixTabs>
  );
}
