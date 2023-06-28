import type { Meta, StoryObj } from '@storybook/react';
import { CommentHistory } from '../../components/CommentHistory/CommentHistory';

const meta: Meta<typeof CommentHistory> = {
  title: 'components/CommentHistory',
  component: CommentHistory,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof CommentHistory>;

export const Example1: Story = {};
