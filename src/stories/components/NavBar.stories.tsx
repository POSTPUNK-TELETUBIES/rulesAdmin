import type { Meta, StoryObj } from '@storybook/react';
import { NavBar } from '../../components/NavBar';

const meta: Meta<typeof NavBar> = {
  title: 'components/NavBar',
  component: NavBar,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof NavBar>;

export const Example1: Story = {};
