import type { Meta, StoryObj } from '@storybook/react';
import { Search } from '../components/Search';

const meta: Meta<typeof Search> = {
  title: 'components/Search',
  component: Search,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof Search>;

export const Example1: Story = {};
