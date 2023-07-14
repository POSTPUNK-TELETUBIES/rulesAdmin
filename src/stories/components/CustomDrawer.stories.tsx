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

export const Example1: Story = {
  args: {
    isDrawerOpen: true,
    result: {
      id: '1',
      name: 'John Doe',
      // email: 'prueba@gmail.com',
      created_at: new Date(),
      updated_at: new Date(),
      isActive: true,
      isActiveOriginal: true,
      isActiveSonar: true,
      key: '1',
      lang_id: '1',
      qualityProfile_id: '1',
      rule_id: '1',
      user_email: 'user@gmail.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      htmlDesc:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
      lastActualization: new Date(),
    },
  },
};
