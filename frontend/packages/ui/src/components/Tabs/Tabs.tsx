import { RadixTabs, RadixTabsList, RadixTabsTrigger } from './RadixTabs';

interface TabsProps extends Omit<React.ComponentPropsWithoutRef<typeof RadixTabs>, 'onValueChange' | 'onChange'> {
  items: Array<{ title: string; value: string }>;
  onChange: (value: string) => void;
}

export function Tabs({ items, onChange, ...rest }: TabsProps) {
  return (
    <RadixTabs onValueChange={onChange} {...rest}>
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
