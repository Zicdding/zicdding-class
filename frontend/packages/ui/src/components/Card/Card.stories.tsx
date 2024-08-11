import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';


const meta = {
    title: 'Zicdding-UI/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {},
    args: {},
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};