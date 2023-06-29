import type { Meta, StoryObj } from '@storybook/react';
import { CustomDrawer } from '../../components/CustomDrawer';

const meta: Meta<typeof CustomDrawer> = {
  title: 'components/CustomDrawer',
  component: CustomDrawer,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof CustomDrawer>;

export const Example1: Story = {};
