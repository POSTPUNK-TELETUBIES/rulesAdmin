import type { Meta, StoryObj } from '@storybook/react';
import { ParticleBg } from '../../../components/Particles';
import { MockLogin } from './MockLogin';

const ParticlesExample = ({
  text,
  withLogin,
}: {
  text: string;
  withLogin?: boolean;
}) => (
  <ParticleBg>
    {/* TODO: Original Login layout is to bin to contexts, should refactor */}
    {/* TODO: Original Login had atoms that wre reusable but were refactor away, that was a bad decision, consider planning seriously */}
    {withLogin && <MockLogin />}
    <h1>{text}</h1>
  </ParticleBg>
);

const meta: Meta<typeof ParticlesExample> = {
  title: 'components/Particles',
  component: ParticlesExample,
  parameters: {
    layout: 'centered',
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export default meta;

type Story = StoryObj<typeof ParticlesExample>;

export const Example1: Story = {
  args: {
    text: 'Hola mundo',
  },
};

export const WithLogin: Story = {
  args: {
    withLogin: true,
  },
};
