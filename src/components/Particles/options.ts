import type { ISourceOptions } from 'tsparticles-engine';

export const options: ISourceOptions = {
  fullScreen: true,
  particles: {
    number: {
      value: 250,
      density: {
        enable: true,
        value_area: 2000,
      },
    },
    color: {
      value: '#d2be60',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
      },
      polygon: {
        nb_sides: 5,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 8,
      random: true,
      anim: {
        enable: false,
        speed: 139,
        size_min: 0.01,
        sync: false,
      },
    },
    line_linked: {
      enable: false,
      distance: 100,
      color: '#d2c277',
      opacity: 0.4,
    },
    move: {
      enable: true,
      speed: 4,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
      attract: {
        enable: true,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
};
