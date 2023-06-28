import type { Meta, StoryObj } from '@storybook/react';
import { BasicInput } from '../../layout/Inputs/BasicInput';

const meta: Meta<typeof BasicInput> = {
  title: 'layout/BasicInput',
  component: BasicInput,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof BasicInput>;

export const Example1: Story = {};
