import React from 'react';
import { fn } from 'storybook/test';
import Button from './Button';
import './Button.css';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    onClick: fn(),
    children: 'Action',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Button visual variant.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables clicks and updates style.',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

/** Primary action on a page. */
export const Primary = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Start Game',
  },
};

/** Secondary action (cancel/back). */
export const Secondary = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'Back',
  },
};

/** Larger size for stronger emphasis. */
export const LargePrimary = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Continue',
  },
};
