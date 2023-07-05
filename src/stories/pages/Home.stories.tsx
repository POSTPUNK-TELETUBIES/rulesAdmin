import type { Meta, StoryObj } from '@storybook/react';
import { Home } from '../../pages/Home';

const meta: Meta<typeof Home> = {
  title: 'pages/Home',
  component: Home,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'El texto que se va a mostrar como titulo',
      control: 'text',
    },
    description: {
      description: 'El texto que se va mostrar como descripcion',
      control: 'text',
    },
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof Home>;

export const Example1: Story = {
  args: {
    title: 'Titulo de Ejemplo',
    description: 'Descripcion de Ejemplo',
    isSingUpAvailable: true,
  },
};
