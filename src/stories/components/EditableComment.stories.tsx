import type { Meta, StoryObj } from '@storybook/react';
import { EditableComment } from '../../components/EditableComment';

const meta: Meta<typeof EditableComment> = {
  title: 'components/EditableComment',
  component: EditableComment,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof EditableComment>;

export const Example1: Story = {};
