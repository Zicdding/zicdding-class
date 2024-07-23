import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Tabs } from './Tabs';

const ITEMS = [
  {
    title: '최신순',
    value: 'latest',
  },
  {
    title: '조회순',
    value: 'view',
  },
  {
    title: '추천순',
    value: 'recommended',
  },
];

const meta = {
  title: 'Zicdding-UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: {
      description: '탭 메뉴가 변경되었을 때 적용되는 함수입니다.',
      table: {
        type: { summary: 'function' },
      },
    },
    items: {
      description: '탭 메뉴 title, value를 받아올 수 있습니다.',
    },
  },
  args: {
    onChange: fn(),
    items: ITEMS,
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
