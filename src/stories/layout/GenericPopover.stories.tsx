import type { Meta, StoryObj } from '@storybook/react';
import GenericPopover from '../../layout/DescriptionContent/GenericContent';

const meta: Meta<typeof GenericPopover> = {
  title: 'Layout/GenericPopOver',
  component: GenericPopover,
  argTypes: {
    popoverBody: { control: 'text' },
    icon: { control: 'text' },
    sxProps: { control: 'object' },
    isLeft: { control: 'boolean' },
    textButton: { control: 'text' },
    buttonProps: { control: 'object' },
  },
};
// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof GenericPopover>;

export const Example1: Story = {
  args: {
    popoverBody: <div>Popover Body</div>,
    icon: <div>Icon</div>,
  },
};
