import type { Meta, StoryObj } from '@storybook/react';
import { LogoPacifico } from '../../components/LogoPacifico';

const meta: Meta<typeof LogoPacifico> = {
  title: 'components/LogoPacifico',
  component: LogoPacifico,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof LogoPacifico>;

export const Example1: Story = {};
