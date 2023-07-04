import type { Meta, StoryObj } from '@storybook/react';
import { TimeAgo } from '../../components/TimeAgo';

const meta: Meta<typeof TimeAgo> = {
  title: 'components/TimeAgo',
  component: TimeAgo,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof TimeAgo>;

export const Example1: Story = {
  args: {
    date: new Date(),
  },
};
