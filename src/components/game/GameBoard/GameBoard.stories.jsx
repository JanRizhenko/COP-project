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
      description: 'Three rod arrays with disk sizes.',
    },
    selectedRod: {
      control: 'select',
      options: [null, 0, 1, 2],
      description: 'Selected rod index for move actions.',
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

/** Initial position for 3 disks. */
export const InitialThreeDisks = {
  args: {
    rods: [[3, 2, 1], [], []],
    selectedRod: null,
  },
};

/** Mid-game state with selected rod. */
export const MidGameSelection = {
  args: {
    rods: [[3], [2], [1]],
    selectedRod: 1,
  },
};

/** Nearly solved puzzle. */
export const NearlySolved = {
  args: {
    rods: [[], [], [3, 2, 1]],
    selectedRod: 2,
  },
};
