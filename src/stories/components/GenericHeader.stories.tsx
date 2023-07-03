import type { Meta, StoryObj } from '@storybook/react';
import { GenericHeader } from '../../components/GenericHeader';

const meta: Meta<typeof GenericHeader> = {
  title: 'components/GenericHeader',
  component: GenericHeader,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof GenericHeader>;

export const Example1: Story = {
  args: {
    data: [
      {
        label: 'Texto de prueba',
        resource: 'name',
        textAlign: 'left',
        className: 'name',
        sxProps: { width: 150 },
      },
    ],
  },
};
