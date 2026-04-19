import React from 'react';
import { fn } from 'storybook/test';
import GameBoard from './GameBoard';
import './GameBoard.css';
import '../Rod/Rod.css';
import '../Disk/Disk.css';

const meta = {
  title: 'Game/GameBoard',
  component: GameBoard,
  tags: ['autodocs'],
  args: {
    onRodClick: fn(),
    selectedRod: null,
  },
  argTypes: {
    rods: {
      control: 'object',
      description: 'Три масиви дисків (розміри знизу вгору на кожному стрижні).',
    },
    selectedRod: {
      control: 'select',
      options: [null, 0, 1, 2],
      description: 'Індекс обраного стрижня для переміщення.',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: '#e8eaf6' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;

/** Початкова позиція для 3 дисків. */
export const InitialThreeDisks = {
  args: {
    rods: [[3, 2, 1], [], []],
    selectedRod: null,
  },
};

/** Середина партії з виділеним стрижнем. */
export const MidGameSelection = {
  args: {
    rods: [[3], [2], [1]],
    selectedRod: 1,
  },
};

/** Майже вирішена головоломка. */
export const NearlySolved = {
  args: {
    rods: [[], [], [3, 2, 1]],
    selectedRod: 2,
  },
};
