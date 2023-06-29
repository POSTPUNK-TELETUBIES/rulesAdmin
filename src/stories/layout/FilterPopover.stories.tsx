import type { Meta, StoryObj } from '@storybook/react';
import { FilterPopover } from '../../layout/FilterPopover';

const meta: Meta<typeof FilterPopover> = {
  title: 'layout/FilterPopover',
  component: FilterPopover,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof FilterPopover>;

export const Example1: Story = {};
