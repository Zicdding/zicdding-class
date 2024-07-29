import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Typography } from './Typography';

const meta = {
  title: 'Zicdding-UI/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'body', 'caption1', 'caption2'],
    },
  },
  args: {
    children: '타이포그라피',
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    variant: 'h1',
  },
};

export const H2: Story = {
  args: {
    variant: 'h2',
  },
};

export const H3: Story = {
  args: {
    variant: 'h3',
  },
};

export const H4: Story = {
  args: {
    variant: 'h4',
  },
};

export const Body: Story = {
  args: {
    variant: 'body',
  },
};

export const Caption1: Story = {
  args: {
    variant: 'caption1',
  },
};

export const Caption2: Story = {
  args: {
    variant: 'caption2',
  },
};
