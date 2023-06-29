import type { Meta, StoryObj } from '@storybook/react';
import { SingUp } from '../../components/SingUp';

const meta: Meta<typeof SingUp> = {
  title: 'components/SingUp',
  component: SingUp,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof SingUp>;

export const Example1: Story = {};
