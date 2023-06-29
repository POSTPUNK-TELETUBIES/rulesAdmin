import type { Meta, StoryObj } from '@storybook/react';
import { Login } from '../../components/Login';

const meta: Meta<typeof Login> = {
  title: 'components/Login',
  component: Login,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof Login>;

export const Example1: Story = {};
