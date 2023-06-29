import type { Meta, StoryObj } from '@storybook/react';
import { MenuItemReactive } from '../../components/MenuItemReactive';

const meta: Meta<typeof MenuItemReactive> = {
  title: 'components/MenuItemReactive',
  component: MenuItemReactive,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof MenuItemReactive>;

export const Example1: Story = {};
