import type { Meta, StoryObj } from '@storybook/react';
import { LoginDrawer } from '../../components/LoginDrawer';

const meta: Meta<typeof LoginDrawer> = {
  title: 'components/LoginDrawer',
  component: LoginDrawer,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'control',
    },
    isOpen: {
      control: 'boolean',
    },
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof LoginDrawer>;

export const Example1: Story = {
  args: {
    content: <h1>Hola mundo</h1>,
    isOpen: true,
  },
};
