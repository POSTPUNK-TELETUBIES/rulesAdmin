import type { Meta, StoryObj } from '@storybook/react';
import { DownloadButton } from '../../components/ActionButtons';

const meta: Meta<typeof DownloadButton> = {
  title: 'components/DownloadButton',
  component: DownloadButton,
  tags: ['autodocs'],
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof DownloadButton>;

export const Example1: Story = {};
