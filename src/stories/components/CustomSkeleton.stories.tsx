import type { Meta, StoryObj } from '@storybook/react';
import { CustomSkeleton } from '../../components/CustomSkeleton';

const meta: Meta<typeof CustomSkeleton> = {
  title: 'faltantes/components/CustomSkeleton',
  component: CustomSkeleton,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof CustomSkeleton>;

export const Example1: Story = {};
