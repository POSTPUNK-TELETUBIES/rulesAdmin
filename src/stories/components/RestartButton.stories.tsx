import type { Meta, StoryObj } from '@storybook/react';
import { RestartButton } from '../../components/RestartButton';

const meta: Meta<typeof RestartButton> = {
  title: 'components/RestartButton',
  component: RestartButton,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof RestartButton>;

export const Example1: Story = {};
