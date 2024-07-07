import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Tabs } from './Tabs';

const meta = {
  title: 'Zicdding-UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    onChange: (value) => {
      console.log(`value 는 ${value}입니다.`);
    },
    headers: [
      {
        name: '최신순',
        value: 'latest',
      }, 
      {
        name: '조회순',
        value: 'view'
      },
      {
        name: '추천순',
        value: 'recommended'
      }
    ]
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // args: {
  //   onChange: (value) => {
  //     console.log(`value 는 ${value}입니다.`);
  //   }
  // }
};
