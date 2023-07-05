import type { Meta, StoryObj } from '@storybook/react';
import GenericTable from '../../layout/GenericTable';

const meta: Meta<typeof GenericTable> = {
  title: 'layout/GenericTable',
  component: GenericTable,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof GenericTable>;

export const Example1: Story = {
  args: {
    header: <header>Header</header>,
    body: <main>Main</main>,
    footer: <footer>Footer</footer>,
    stickyHeader: true,
    isEmpty: true,
  },
};
