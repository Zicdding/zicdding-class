import { Button } from '@zicdding-web/ui';
import { useState } from 'react';

const TypeOptions = [
  { label: '전체', value: 'all' },
  { label: '해커톤', value: 'hackathon' },
  { label: '이벤트', value: 'event' },
  { label: '공모전', value: 'competition' },
];

export function TypeButton() {
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
    console.log(`선택된 타입: ${type}`);
  };

  return (
    <div className="flex gap-[30px]">
      {TypeOptions.map(({ label, value }) => (
        <Button
          className={`px-0 text-2xl ${value === selectedType ? 'text-black' : 'text-gray-400'} hover:text-black`}
          key={value}
          variant="link"
          size="lg"
          onClick={() => handleTypeClick(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
