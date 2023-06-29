import type { Meta, StoryObj } from '@storybook/react';
import { Info } from '../../layout/Info';

const meta: Meta<typeof Info> = {
  title: 'layout/Info',
  component: Info,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof Info>;

export const Example1: Story = {};
