import type { Meta, StoryObj } from '@storybook/react';
import { ITCard } from './ITCard';

const meta = {
  title: 'Zicdding-UI/ITCard',
  component: ITCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ITCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
