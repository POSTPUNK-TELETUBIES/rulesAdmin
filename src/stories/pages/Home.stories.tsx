import type { Meta, StoryObj } from '@storybook/react';
import { Home } from '../../pages/Home';

const meta: Meta<typeof Home> = {
  title: 'pages/Home',
  component: Home,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof Home>;

export const Example1: Story = {};
