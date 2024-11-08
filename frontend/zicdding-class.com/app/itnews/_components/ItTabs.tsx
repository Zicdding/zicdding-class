'use client';

import { Tabs } from '@zicdding-web/ui/Tabs';

type TabItem = {
  title: string;
  value: string;
};

interface ItTabsProps {
  item: TabItem[];
}

export function ItTabs({ item }: ItTabsProps) {
  return <Tabs items={item} defaultValue="recent" onChange={(e) => console.log(e)} />;
}
