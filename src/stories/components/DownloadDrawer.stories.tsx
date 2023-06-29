import type { Meta, StoryObj } from '@storybook/react';
import { DownloadDrawer } from '../../components/DownloadDrawer';

const meta: Meta<typeof DownloadDrawer> = {
  title: 'components/DownloadDrawer',
  component: DownloadDrawer,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof DownloadDrawer>;

export const Example1: Story = {};
