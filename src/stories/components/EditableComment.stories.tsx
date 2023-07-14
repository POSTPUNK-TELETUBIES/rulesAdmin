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

export const Example1: Story = {
  args: {
    title: 'Titulo de prueba',
    result: {
      id: '1',
      name: 'John Doe',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
      created_at: new Date(),
      isActive: true,
      isActiveSonar: true,
      key: '1',
      lang_id: '1',
      qualityProfile_id: '1',
      rule_id: '1',
      updated_at: new Date(),
      user_email: 'user@gmail.com',
      lastActualization: new Date(),
      htmlDesc:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    },
  },
};
