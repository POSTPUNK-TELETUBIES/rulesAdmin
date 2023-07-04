import type { Meta, StoryObj } from '@storybook/react';
import { FilterPopover } from '../../layout/FilterPopover';

const meta: Meta<typeof FilterPopover> = {
  title: 'faltantes/layout/FilterPopover',
  component: FilterPopover,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof FilterPopover>;

export const Example1: Story = {
  args: {
    // reactiveCallback: (value: unknown) => void,
    // filterConfig: FilterConfig[],
    isClosingRecursive: true,
  },
};
