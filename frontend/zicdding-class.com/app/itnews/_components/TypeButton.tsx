import { Button } from '@zicdding-web/ui';

const TypeOptions = [
  { label: '전체', value: 'all' },
  { label: '해커톤', value: 'hackathon' },
  { label: '이벤트', value: 'event' },
  { label: '공모전', value: 'competition' },
];

export function TypeButton() {
  return (
    <div className="flex gap-[30px]">
      {TypeOptions.map(({ label, value }) => (
        <Button className="px-0 text-2xl text-gray-400 hover:text-black" key={value} variant="link" size="lg">
          {label}
        </Button>
      ))}
    </div>
  );
}
