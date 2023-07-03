import type { Meta, StoryObj } from '@storybook/react';
import GenericPopover from '../../layout/GenericPopover';

const meta: Meta<typeof GenericPopover> = {
  title: 'faltantes/layout/GenericPopover',
  component: GenericPopover,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof GenericPopover>;

export const Example1: Story = {};
