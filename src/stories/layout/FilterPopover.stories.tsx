import type { Meta, StoryObj } from '@storybook/react';
import { FilterPopover } from '../../layout/Filters/FilterContent';

const meta: Meta<typeof FilterPopover> = {
  title: 'layout/FilterPopover',
  component: FilterPopover,
  argTypes: {
    filterConfig: { control: 'array' },
    reactiveCallback: { action: 'reactiveCallback' },
    isClosingRecursive: { control: 'boolean' },
  },
};
// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof FilterPopover>;

export const Example1: Story = {
  args: {
    filterConfig: [
      { value: 'value1', label: 'Label 1' },
      { value: 'value2', label: 'Label 2' },
    ],
  },
};
