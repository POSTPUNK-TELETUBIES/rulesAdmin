import type { Meta, StoryObj } from '@storybook/react';
import { StatusIcon } from '../../components/StatusIcon';

const meta: Meta<typeof StatusIcon> = {
  title: 'components/StatusIcon',
  component: StatusIcon,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof StatusIcon>;

export const Example1: Story = {};
