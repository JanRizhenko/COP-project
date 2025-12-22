import React from 'react';
import Rod from '../Rod/Rod';
import './GameBoard.css';

const GameBoard = ({ 
  rods = [[], [], []],
  onRodClick,
  selectedDisk
}) => {
  return (
    <div className="game-board">
      <div className="game-board__rods">
        <Rod
          rodId={0}
          label="Rod A"
          disks={rods[0]}
          onRodClick={onRodClick}
          selectedDisk={selectedDisk}
        />
        <Rod
          rodId={1}
          label="Rod B"
          disks={rods[1]}
          onRodClick={onRodClick}
          selectedDisk={selectedDisk}
        />
        <Rod
          rodId={2}
          label="Rod C"
          disks={rods[2]}
          onRodClick={onRodClick}
          selectedDisk={selectedDisk}
        />
      </div>
    </div>
  );
};

export default GameBoard;
