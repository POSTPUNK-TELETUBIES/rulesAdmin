import type { Meta, StoryObj } from '@storybook/react';
import AdminPanel from '../../pages/AdminPanel';

const meta: Meta<typeof AdminPanel> = {
  title: 'pages/AdminPanel',
  component: AdminPanel,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof AdminPanel>;

export const Example1: Story = {};
