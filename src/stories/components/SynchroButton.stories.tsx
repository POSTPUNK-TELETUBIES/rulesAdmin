import type { Meta, StoryObj } from '@storybook/react';
import { SynchroButton } from '../../components/SynchroButton';

const meta: Meta<typeof SynchroButton> = {
  title: 'components/SynchroButton',
  component: SynchroButton,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof SynchroButton>;

export const Example1: Story = {};
