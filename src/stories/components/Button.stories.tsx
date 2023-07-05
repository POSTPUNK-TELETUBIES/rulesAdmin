import type { Meta, StoryObj } from '@storybook/react';
import Button from '../../components/Button/Button';

const meta: Meta<typeof Button> = {
  title: 'components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    iconType: {
      description: 'El icono que acompañara el texto',
    },
    text: {
      description: 'El texto que va a mostrar',
    },
    onClik: {
      description:
        'La funcion de la que se va a encargar cuando se le haga click',
    },
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof Button>;

export const Example1: Story = {
  args: {
    iconType: 'download',
    text: 'Descargar',
  },
};

export const Example2: Story = {
  args: {
    iconType: 'trash',
    text: 'Borrar',
  },
};

export const Example3: Story = {
  args: {
    iconType: 'update',
    text: 'Actualizar',
  },
};
