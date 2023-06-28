import type { Meta, StoryObj } from '@storybook/react';
import { PopOverDetails } from '../../components/PopOverDetails';

const meta: Meta<typeof PopOverDetails> = {
  title: 'components/PopOverDetails',
  component: PopOverDetails,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof PopOverDetails>;

export const Example1: Story = {};
