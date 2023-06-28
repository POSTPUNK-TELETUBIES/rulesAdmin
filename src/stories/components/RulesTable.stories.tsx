import type { Meta, StoryObj } from '@storybook/react';
import { RulesTable } from '../../components/RulesTable';

const meta: Meta<typeof RulesTable> = {
  title: 'components/RulesTable',
  component: RulesTable,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof RulesTable>;

export const Example1: Story = {};
