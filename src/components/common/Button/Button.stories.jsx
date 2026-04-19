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
    children: 'Дія',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Візуальний варіант кнопки.',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Розмір кнопки.',
    },
    disabled: {
      control: 'boolean',
      description: 'Блокує кліки та змінює стиль.',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

/** Основна дія на сторінці. */
export const Primary = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Почати гру',
  },
};

/** Другорядна дія (скасування, назад). */
export const Secondary = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'Назад',
  },
};

/** Великий розмір для акценту на мобільних екранах. */
export const LargePrimary = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Продовжити',
  },
};
