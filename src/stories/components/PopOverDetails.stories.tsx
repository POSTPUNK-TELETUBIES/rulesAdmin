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

export const Example1: Story = {
  args: {
    isActive: true,
    tags: ['tag1', 'tag2', 'tag3'],
    ruleTitle: 'Rule Title',
    ruleDescription: 'Rule Description',
    dateSonar: '2021-09-01T00:00:00+0000',
  },
};
