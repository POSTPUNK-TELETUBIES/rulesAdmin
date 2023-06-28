import type { Meta, StoryObj } from '@storybook/react';
import { DraggableMenu } from '../../components/DraggableMenu';

const meta: Meta<typeof DraggableMenu> = {
  title: 'components/DraggableMenu',
  component: DraggableMenu,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof DraggableMenu>;

export const Example1: Story = {};
